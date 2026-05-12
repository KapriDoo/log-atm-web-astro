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
  },
});
