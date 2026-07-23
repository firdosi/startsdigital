// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { siteOrigin, basePath } from './site.config.mjs';

export default defineConfig({
  site: siteOrigin,
  base: basePath,
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/style-guide') &&
        !page.includes('/404')
    })
  ]
});