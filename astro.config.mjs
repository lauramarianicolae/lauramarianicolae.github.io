import { defineConfig } from 'astro/config';
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pdfSource, servedUrls } from './src/lib/pdfs.mjs';

export default defineConfig({
  site: 'https://lauranicolae.com',
  integrations: [
    {
      name: 'pdfs',
      hooks: {
        'astro:build:done': ({ dir }) => {
          for (const url of servedUrls()) {
            const source = pdfSource(url);
            if (!source) continue;
            const target = fileURLToPath(new URL(url.slice(1), dir));
            mkdirSync(dirname(target), { recursive: true });
            copyFileSync(source, target);
          }
        },
      },
    },
  ],
});
