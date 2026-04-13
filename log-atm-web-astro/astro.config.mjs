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
    icon({ include: { lucide: ['*'] } }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
