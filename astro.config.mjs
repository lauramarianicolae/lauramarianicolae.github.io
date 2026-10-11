import { defineConfig } from 'astro/config';
import { copyFileSync } from 'node:fs';
import { cvUrl, jmpUrl, pdfSource } from './src/lib/pdfs.mjs';

export default defineConfig({
  site: 'https://lauranicolae.com',
  integrations: [
    {
      name: 'pdfs',
      hooks: {
        'astro:build:done': ({ dir }) => {
          for (const url of [cvUrl, jmpUrl]) {
            const source = pdfSource(url);
            if (source) copyFileSync(source, new URL(url.slice(1), dir));
          }
        },
      },
    },
  ],
});
