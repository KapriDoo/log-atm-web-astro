// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
// Identidad del sitio sin imports: carga en el entorno de construcción (fuente única del host canónico).
import { SITE } from './src/lib/site.ts';

/**
 * Integration mínima que valida la paridad de claves i18n antes de cada build.
 * No bloquea el dev server; sólo se ejecuta en `astro build`.
 *
 * Nota: se invoca el validador `.ts` via `tsx` en subproceso para soportar
 * entornos sin loader TS en runtime (p. ej. el build alojado de Cloudflare Workers Builds), donde
 * un `import()` directo del `.ts` falla con "Unknown file extension".
 *
 * @returns {import('astro').AstroIntegration}
 */
function i18nValidator() {
  return {
    name: 'log-atm:i18n-validator',
    hooks: {
      'astro:build:start': ({ logger }) => {
        logger.info('[i18n] Validando paridad de claves...');
        const result = spawnSync('npx', ['tsx', 'scripts/validate-i18n.ts'], {
          stdio: 'inherit',
          shell: true,
        });
        if (result.status !== 0) {
          throw new Error(
            `[i18n] Paridad de claves rota entre traducciones (exit ${result.status}). Ver detalles arriba.`
          );
        }
      },
    },
  };
}

/**
 * Guarda post-build: falla el build si una página prerenderizada esperada no existe en
 * `dist/client`, pesa 0 bytes o no contiene `<html`. Ver ADR-0012.
 *
 * El prerender de `@astrojs/cloudflare` corre en workerd y devuelve los errores de render como
 * respuesta sin lanzar: `astro build` termina con exit 0 y la página queda ausente o vacía.
 *
 * «Esperada» no sale de lo escrito en disco:
 * - `pages` de `astro:build:done` lista cada path que entregó `getStaticPaths` (o el path fijo
 *   de una ruta estática); Astro lo registra antes de renderizar, así que incluye los que fallan.
 * - Las rutas de página prerenderizadas del proyecto (`astro:routes:resolved`) deben tener al
 *   menos un path en esa lista: cubre una ruta cuyo `getStaticPaths` no entrega ninguno.
 *
 * @returns {import('astro').AstroIntegration}
 */
function prerenderOutputGuard() {
  /** @type {import('astro').IntegrationResolvedRoute[]} */
  let prerenderedPageRoutes = [];
  return {
    name: 'log-atm:prerender-output-guard',
    hooks: {
      'astro:routes:resolved': ({ routes }) => {
        prerenderedPageRoutes = routes.filter(
          (route) => route.type === 'page' && route.isPrerendered && route.origin === 'project'
        );
      },
      'astro:build:done': ({ pages, dir, logger }) => {
        const failures = [];
        const expectedPaths = pages.map(({ pathname }) => `/${pathname}`);
        for (const route of prerenderedPageRoutes) {
          if (!expectedPaths.some((path) => route.patternRegex.test(path))) {
            failures.push(`${route.pattern} (${route.entrypoint}): sin paths de getStaticPaths`);
          }
        }
        for (const path of expectedPaths) {
          // build.format 'directory' (por defecto): cada página se escribe como `<path>/index.html`.
          const file = fileURLToPath(new URL(`.${path.replace(/\/?$/, '/')}index.html`, dir));
          if (!existsSync(file)) {
            failures.push(`${path}: no existe ${file}`);
          } else if (statSync(file).size === 0) {
            failures.push(`${path}: ${file} pesa 0 bytes`);
          } else if (!readFileSync(file, 'utf8').includes('<html')) {
            failures.push(`${path}: ${file} no contiene <html`);
          }
        }
        if (failures.length > 0) {
          throw new Error(
            `[prerender] ${failures.length} página(s) prerenderizada(s) sin HTML válido:\n  - ${failures.join('\n  - ')}`
          );
        }
        logger.info(`[prerender] ${expectedPaths.length} páginas prerenderizadas con HTML válido`);
      },
    },
  };
}

export default defineConfig({
  site: SITE.url,
  output: 'static',
  image: {
    // Servicio Sharp explícito (ya en deps). Opciones de codec por formato. Ver ADR-0006.
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        jpeg: { mozjpeg: true },
        webp: { effort: 4 },
      },
    },
  },
  adapter: cloudflare({
    // 'compile' pre-optimiza las imágenes en build-time (emite AVIF/WebP/JPEG
    // estáticos en _astro/) en vez del servicio workerd on-demand por defecto.
    // Honra el diseño (optimización build-time, coste runtime cero). Ver ADR-0006.
    imageService: 'compile',
  }),
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'pt'],
    routing: {
      prefixDefaultLocale: false,
    },
    // Nota: i18n.fallback se omite intencionalmente para evitar colisiones
    // con `src/pages/[lang]/*.astro`. El fallback de contenido se aplica a
    // nivel de claves en `t()` (ver src/i18n/utils.ts).
  },
  integrations: [
    react(),
    i18nValidator(),
    prerenderOutputGuard(),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-CL',
          en: 'en-US',
          pt: 'pt-BR',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      // worker-mailer ships dual CJS+ESM sin campo `exports`. Forzar bundling
      // ESM para que no se cargue el index.js (CJS) en el runtime de Workers.
      noExternal: ['worker-mailer'],
      resolve: {
        conditions: ['workerd', 'worker', 'import', 'module', 'default'],
      },
    },
  },
});
