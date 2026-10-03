/**
 * LOG ATM — Barrido de enlaces internos por idioma sobre el build estático.
 *
 * Recorre todas las páginas `**\/*.html` de `dist/client` y, para cada enlace
 * interno `<a href>` del `<body>`, verifica dos reglas:
 *   1. El idioma del href coincide con el idioma de la página (el español no
 *      lleva prefijo; `en` y `pt` sí).
 *   2. El path termina en `/`, para llegar al destino sin redirección intermedia.
 *
 * Se excluyen los enlaces del selector de idioma (atributo `hreflang`), las
 * anclas `#…`, los hrefs con esquema (`https:`, `mailto:`, `tel:`, …) o que
 * empiezan con `//`, los paths bajo `/_astro/` o `/api/` y los archivos con
 * extensión (`/logo.png`).
 *
 * Uso (después de `npm run build`):
 *   npm run check-i18n-links
 *   o: npx tsx scripts/check-i18n-links.ts
 *
 * Exit codes: 0 sin violaciones · 1 con violaciones · 2 sin `dist/client`.
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { LOCALES, DEFAULT_LOCALE, NON_DEFAULT_LOCALES, type Locale } from '../src/i18n/config.ts';

const HERE = dirname(fileURLToPath(import.meta.url));
const DIST = join(HERE, '..', 'dist', 'client');

/** Base ficticia para resolver hrefs relativos; solo interesa el pathname. */
const BASE_ORIGIN = 'https://check.invalid';

interface Violation {
  file: string;
  href: string;
  rule: string;
}

/** Lista recursivamente los `.html` bajo `dir`. */
function listHtml(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) listHtml(full, acc);
    else if (entry.isFile() && entry.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

/** Idioma de un path: primer segmento si es un locale con prefijo; si no, el default. */
function localeOfPath(pathname: string): Locale {
  const first = pathname.split('/').filter(Boolean)[0];
  return (NON_DEFAULT_LOCALES as readonly string[]).includes(first ?? '')
    ? (first as Locale)
    : DEFAULT_LOCALE;
}

/** Path público de la página a partir de su archivo (`en/servicios/index.html` → `/en/servicios/`). */
function pagePathOf(relFile: string): string {
  const posix = relFile.split(sep).join('/');
  if (posix === 'index.html') return '/';
  if (posix.endsWith('/index.html')) return `/${posix.slice(0, -'index.html'.length)}`;
  return `/${posix}`;
}

/** Contenido del `<body>` sin `<script>` ni `<style>`, cuyo texto no es markup. */
function bodyMarkup(html: string): string {
  const start = html.search(/<body[\s>]/i);
  const end = html.search(/<\/body>/i);
  const body = html.slice(start === -1 ? 0 : start, end === -1 ? html.length : end);
  return body.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, '');
}

/** Atributos de una etiqueta de apertura (`<a …>`), con nombres en minúsculas. */
function parseAttributes(tag: string): Map<string, string> {
  const attrs = new Map<string, string>();
  const inner = tag.replace(/^<a\b/i, '').replace(/\/?>$/, '');
  const re = /([^\s"'=<>\/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const m of inner.matchAll(re)) {
    attrs.set(m[1].toLowerCase(), m[2] ?? m[3] ?? m[4] ?? '');
  }
  return attrs;
}

/** Decodifica las entidades HTML que Astro emite en atributos. */
function decodeEntities(value: string): string {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

/** Indica si el href queda fuera del barrido. Recibe el href crudo y su pathname resuelto. */
function isExcluded(href: string, pathname: string): boolean {
  if (href === '' || href.startsWith('#')) return true;
  if (href.startsWith('//')) return true;
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return true;
  if (pathname.startsWith('/_astro/') || pathname.startsWith('/api/')) return true;
  const lastSegment = pathname.split('/').pop() ?? '';
  return /\.[a-z0-9]+$/i.test(lastSegment);
}

export function check(distDir: string = DIST): {
  violations: Violation[];
  pages: number;
  links: number;
  pagesByLocale: Record<Locale, number>;
} {
  const violations: Violation[] = [];
  const pagesByLocale = Object.fromEntries(LOCALES.map((l) => [l, 0])) as Record<Locale, number>;
  let links = 0;
  const files = listHtml(distDir).sort();

  for (const file of files) {
    const rel = relative(distDir, file);
    const relPosix = rel.split(sep).join('/');
    const pagePath = pagePathOf(rel);
    const pageLocale = localeOfPath(pagePath);
    pagesByLocale[pageLocale] += 1;

    for (const [tag] of bodyMarkup(readFileSync(file, 'utf-8')).matchAll(/<a\b[^>]*>/gi)) {
      const attrs = parseAttributes(tag);
      if (!attrs.has('href') || attrs.has('hreflang')) continue;
      const href = decodeEntities(attrs.get('href') ?? '').trim();
      // Se resuelve contra la página para cubrir hrefs relativos; se descartan query y hash.
      const pathname = new URL(href || '#', `${BASE_ORIGIN}${pagePath}`).pathname;
      if (isExcluded(href, pathname)) continue;
      links += 1;

      const hrefLocale = localeOfPath(pathname);
      if (hrefLocale !== pageLocale) {
        violations.push({
          file: relPosix,
          href,
          rule: `idioma del enlace (${hrefLocale}) distinto al de la página (${pageLocale})`,
        });
      }
      if (!pathname.endsWith('/')) {
        violations.push({ file: relPosix, href, rule: 'path sin barra final (redirección intermedia)' });
      }
    }
  }

  return { violations, pages: files.length, links, pagesByLocale };
}

const isMain = fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  if (!existsSync(DIST)) {
    // eslint-disable-next-line no-console
    console.error(`[i18n-links] No existe ${relative(process.cwd(), DIST) || DIST}: ejecutá \`npm run build\` primero.`);
    process.exit(2);
  }
  const { violations, pages, links, pagesByLocale } = check();
  const lines = violations.map((v) => `${v.file}: ${v.href} — ${v.rule}`);
  const perLocale = LOCALES.map((l) => `${l}=${pagesByLocale[l]}`).join(', ');
  lines.push(
    `[i18n-links] ${pages} páginas (${perLocale}), ${links} enlaces internos evaluados, ${violations.length} violaciones`,
  );
  // eslint-disable-next-line no-console
  console.log(lines.join('\n'));
  process.exit(violations.length > 0 ? 1 : 0);
}
