// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://erwingsolorzano.github.io',
base:'/',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: true,
    }),
    sitemap()
  ],
  image: {
    domains: ['images.unsplash.com', 'via.placeholder.com']
  },
  output: 'static'
});