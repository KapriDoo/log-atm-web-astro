// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://logatm.com',
  output: 'static',
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),
  integrations: [
    react(),
    sitemap(),
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
          'scissors', 'layout'
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
