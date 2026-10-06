/**
 * Auditoría de accesibilidad del sitio compilado en un navegador real.
 *
 * Uso: `npm run build` y luego `npm run a11y` (opcional: `CHROME_PATH=/ruta/a/chrome`).
 *
 * - Sirve `dist/` con un `astro preview` propio (workerd, el mismo runtime de producción), de
 *   modo que las páginas de «no encontrado», que el Worker renderiza bajo demanda, se auditan
 *   tal como las ve el visitante. Ver ADR-0010.
 * - La lista de URLs se deriva del contenido compilado: todo `*.html` de `dist/client` (debe
 *   responder 200) y una sonda inexistente por prefijo de idioma declarado en los `hreflang`
 *   de la portada (debe responder 404). Una página nueva entra sin tocar este script.
 * - Cada URL se audita en escritorio (1280×800) y en móvil (390×844) con axe-core y las reglas
 *   WCAG 2.x A/AA.
 * - Ambos contextos fijan `reducedMotion: 'reduce'`: se audita el estado final de cada página.
 *   Las animaciones de entrada parten de textos casi transparentes y medir el contraste en un
 *   estado intermedio produce falsos positivos que el visitante nunca ve en reposo; el
 *   contraste relevante es el del estado final.
 *
 * Salida: una línea por elemento con violación, `[tamaño] url regla (impacto) ayuda → selector`,
 * y un resumen con totales. Exit 0 sin hallazgos · 1 con violaciones o estados HTTP
 * inesperados · 2 por precondición o entorno (sin build, sin navegador, servidor caído).
 */
import { spawn } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { createServer } from 'node:net';
import { join, relative, resolve, sep } from 'node:path';
import { chromium } from 'playwright-core';

const ROOT = resolve(import.meta.dirname, '..');
const CLIENT_DIR = join(ROOT, 'dist', 'client');
const INSTALL_HINT = 'npx @puppeteer/browsers install chrome@stable';
const PROBE_SEGMENT = '__a11y-404__/';
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const POLL_INTERVAL_MS = 250;
const STARTUP_TIMEOUT_MS = 30_000;

// Los dos tamaños de pantalla; ambos con movimiento reducido (estado final de la página).
const VIEWPORTS = [
  { label: 'escritorio', options: { viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' } },
  {
    label: 'móvil',
    options: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' },
  },
];

/** Termina con un error de precondición o de entorno (exit 2). */
function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(2);
}

// --- Precondición de build -------------------------------------------------------------------

function assertBuild() {
  const required = [join(CLIENT_DIR, 'index.html'), join(ROOT, '.wrangler', 'deploy', 'config.json')];
  if (required.some((file) => !existsSync(file))) {
    fail('no hay contenido compilado del sitio. Compilá el sitio primero: npm run build');
  }
}

// --- Navegador -------------------------------------------------------------------------------

/** Compara versiones `148.0.7778.167` por segmentos numéricos. */
function compareVersions(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

/** `CHROME_PATH` si está definida; si no, el Chrome de versión mayor bajo `./chrome`. */
function resolveBrowser() {
  const fromEnv = process.env.CHROME_PATH;
  if (fromEnv) {
    if (!existsSync(fromEnv) || !statSync(fromEnv).isFile()) {
      fail(`CHROME_PATH apunta a un archivo inexistente: ${fromEnv}`);
    }
    return fromEnv;
  }
  // Layout que crea `npx @puppeteer/browsers install chrome@stable`: chrome/linux-<versión>/chrome-linux64/chrome
  const chromeDir = join(ROOT, 'chrome');
  const candidates = existsSync(chromeDir)
    ? readdirSync(chromeDir)
        .map((name) => ({ version: name.replace(/^[^\d]*/, ''), path: join(chromeDir, name, 'chrome-linux64', 'chrome') }))
        .filter((c) => c.version && existsSync(c.path))
        .sort((a, b) => compareVersions(b.version, a.version))
    : [];
  if (candidates.length === 0) {
    fail(
      'no se encontró un navegador para la auditoría. Indicá su ruta con la variable de entorno ' +
        `CHROME_PATH o instalá Chrome en ./chrome con: ${INSTALL_HINT}`,
    );
  }
  return candidates[0].path;
}

// --- URLs a auditar --------------------------------------------------------------------------

/** Todo `*.html` de `dist/client` como URL (`en/servicios/index.html` → `/en/servicios/`). */
function listPages(dir = CLIENT_DIR) {
  const pages = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) pages.push(...listPages(full));
    else if (entry.name.endsWith('.html')) {
      const rel = relative(CLIENT_DIR, full).split(sep).join('/');
      pages.push('/' + rel.replace(/(^|\/)index\.html$/, '$1'));
    }
  }
  return pages.sort();
}

/** Una sonda inexistente por prefijo de idioma de los `hreflang` de la portada, más `/`. */
function listNotFoundProbes() {
  const html = readFileSync(join(CLIENT_DIR, 'index.html'), 'utf8');
  const prefixes = new Set(['/']);
  for (const [tag] of html.matchAll(/<link\b[^>]*>/g)) {
    const attr = (name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
    const hreflang = attr('hreflang');
    const href = attr('href');
    if (attr('rel') !== 'alternate' || !hreflang || !href || hreflang === 'x-default') continue;
    const pathname = new URL(href, 'http://localhost').pathname;
    prefixes.add(pathname.endsWith('/') ? pathname : `${pathname}/`);
  }
  return [...prefixes].sort().map((prefix) => `${prefix}${PROBE_SEGMENT}`);
}

// --- Servidor propio -------------------------------------------------------------------------

function freePort() {
  return new Promise((resolvePort, reject) => {
    const server = createServer();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      server.close(() => resolvePort(port));
    });
  });
}

let server = null;

/** Termina el grupo de procesos del servidor (astro + workerd) para no dejar huérfanos. */
function stopServer() {
  if (!server || server.exitCode !== null || server.signalCode !== null) return;
  try {
    process.kill(-server.pid, 'SIGTERM');
  } catch {
    // El grupo ya terminó.
  }
}

process.on('exit', stopServer);
process.on('SIGINT', () => {
  stopServer();
  process.exit(130);
});

async function startServer() {
  const port = await freePort();
  const output = [];
  server = spawn(join(ROOT, 'node_modules', '.bin', 'astro'), ['preview', '--host', '127.0.0.1', '--port', String(port)], {
    cwd: ROOT,
    detached: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  server.stdout.on('data', (chunk) => output.push(chunk));
  server.stderr.on('data', (chunk) => output.push(chunk));

  const baseUrl = `http://127.0.0.1:${port}`;
  const deadline = Date.now() + STARTUP_TIMEOUT_MS;
  while (Date.now() < deadline) {
    if (server.exitCode !== null || server.signalCode !== null) break;
    try {
      const res = await fetch(`${baseUrl}/`);
      if (res.status === 200) return baseUrl;
    } catch {
      // Aún no escucha.
    }
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
  }
  console.error(Buffer.concat(output).toString());
  fail('el servidor de vista previa (astro preview) no respondió 200 en / dentro de 30 s; ver su salida arriba.');
}

// --- Auditoría -------------------------------------------------------------------------------

/** Selector legible de un nodo de axe (los arrays anidados son iframes o shadow DOM). */
function selectorOf(target) {
  return target.map((part) => (Array.isArray(part) ? part.join(' >>> ') : part)).join(' ');
}

async function auditPage(context, url, axePath) {
  const page = await context.newPage();
  try {
    const response = await page.goto(url, { waitUntil: 'load' });
    await page.addScriptTag({ path: axePath });
    const violations = await page.evaluate(async (tags) => {
      const result = await window.axe.run(document, {
        runOnly: { type: 'tag', values: tags },
        resultTypes: ['violations'],
      });
      return result.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        targets: v.nodes.map((n) => n.target),
      }));
    }, WCAG_TAGS);
    return { status: response?.status() ?? null, violations };
  } finally {
    await page.close();
  }
}

async function main() {
  assertBuild();
  const executablePath = resolveBrowser();
  const pages = listPages();
  const probes = listNotFoundProbes();
  const targets = [...pages.map((path) => ({ path, expected: 200 })), ...probes.map((path) => ({ path, expected: 404 }))];
  const axePath = createRequire(import.meta.url).resolve('axe-core/axe.min.js');

  console.log(
    `Auditando ${targets.length} URLs (${pages.length} páginas, ${probes.length} sondas 404) en escritorio y móvil…`,
  );
  const baseUrl = await startServer();
  const browser = await chromium.launch({ executablePath });

  let audits = 0;
  let violationNodes = 0;
  let unexpectedStatus = 0;
  const rules = new Set();
  try {
    for (const { label, options } of VIEWPORTS) {
      const context = await browser.newContext(options);
      for (const { path, expected } of targets) {
        const { status, violations } = await auditPage(context, `${baseUrl}${path}`, axePath);
        audits++;
        if (status !== expected) {
          unexpectedStatus++;
          console.log(`[${label}] ${path} estado-http — se esperaba ${expected} y respondió ${status}`);
        }
        for (const v of violations) {
          rules.add(v.id);
          for (const target of v.targets) {
            violationNodes++;
            console.log(`[${label}] ${path} ${v.id} (${v.impact}) ${v.help} → ${selectorOf(target)}`);
          }
        }
      }
      await context.close();
    }
  } finally {
    await browser.close();
    stopServer();
  }

  console.log(
    `\nResumen: ${audits} auditorías (${targets.length} URLs × ${VIEWPORTS.length} tamaños: ` +
      `${pages.length} páginas, ${probes.length} sondas 404) · ${violationNodes} violaciones ` +
      `en ${rules.size} reglas · ${unexpectedStatus} estados HTTP inesperados`,
  );
  process.exit(violationNodes > 0 || unexpectedStatus > 0 ? 1 : 0);
}

main().catch((error) => {
  stopServer();
  console.error(error);
  process.exit(2);
});
