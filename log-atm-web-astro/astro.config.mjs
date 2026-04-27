// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://logatm.com',
  integrations: [
    react(),
    sitemap(),
    icon({
      include: {
        lucide: [
          'ship', 'plane', 'award', 'globe', 'package', 'sparkles',
          'arrow-right', 'arrow-up-right', 'truck', 'file-check', 'warehouse', 'route',
          'trending-up', 'landmark', 'shopping-bag', 'wheat', 'pill',
          'package-open', 'hard-hat', 'plane-takeoff', 'compass',
          'user-round-check', 'globe-2', 'map-pin', 'shield-check',
          'pickaxe', 'shopping-cart', 'phone', 'mail', 'map-pin', 'message-circle',
          'users', 'tag', 'clock', 'shield-check', 'headphones', 'send'
        ]
      }
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
