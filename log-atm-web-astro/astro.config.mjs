// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import cloudflare from '@astrojs/cloudflare';
import { spawnSync } from 'node:child_process';

/**
 * Integration mínima que valida la paridad de claves i18n antes de cada build.
 * No bloquea el dev server; sólo se ejecuta en `astro build`.
 *
 * Nota: se invoca el validador `.ts` via `tsx` en subproceso para soportar
 * entornos sin loader TS en runtime (p. ej. Cloudflare Pages build), donde
 * un `import()` directo del `.ts` falla con "Unknown file extension".
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

export default defineConfig({
  site: 'https://logatm.com',
  output: 'static',
  adapter: cloudflare({
    platformProxy: { enabled: true },
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
    icon({
      include: {
        lucide: [
          'ship', 'plane', 'award', 'globe', 'package', 'sparkles',
          'arrow-right', 'arrow-up-right', 'truck', 'file-check', 'file', 'warehouse', 'route',
          'trending-up', 'landmark', 'shopping-bag', 'wheat', 'pill',
          'package-open', 'hard-hat', 'plane-takeoff', 'compass',
          'user', 'user-round-check', 'user-check', 'globe-2', 'map-pin', 'shield', 'shield-check',
          'pickaxe', 'shopping-cart', 'phone', 'mail', 'mailbox', 'message-circle',
          'users', 'tag', 'clock', 'headphones', 'send',
          'package-check', 'container', 'handshake',
          'hammer', 'lightbulb', 'car', 'briefcase', 'settings', 'wrench',
          'scissors', 'layout', 'languages', 'check', 'chevron-down'
        ]
      }
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
