// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

/**
 * Integration mínima que valida la paridad de claves i18n antes de cada build.
 * No bloquea el dev server; sólo se ejecuta en `astro build`.
 */
function i18nValidator() {
  return {
    name: 'log-atm:i18n-validator',
    hooks: {
      'astro:build:start': async ({ logger }) => {
        const { validate } = await import('./scripts/validate-i18n.ts');
        const { ok, report } = validate();
        logger.info(report.join('\n'));
        if (!ok) {
          throw new Error(
            '[i18n] Paridad de claves rota entre traducciones. Ver detalles arriba.'
          );
        }
      },
    },
  };
}

export default defineConfig({
  site: 'https://logatm.com',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'zh', 'hi', 'ar', 'pt'],
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
          zh: 'zh-CN',
          hi: 'hi-IN',
          ar: 'ar',
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
  },
});
