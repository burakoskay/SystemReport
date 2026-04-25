// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.systemreport.net',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/stories/') &&
        !page.includes('/cms-'),
    }),
    pagefind(),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});