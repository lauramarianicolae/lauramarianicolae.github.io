import type { APIRoute } from 'astro';
import { pageUpdated, pdfSource, pdfUpdated, servedUrls } from '../lib/pdfs.mjs';

const day = (seconds: number) => (seconds ? new Date(seconds * 1000).toISOString().slice(0, 10) : '');

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://lauranicolae.com');
  const entries = [
    { path: '/', updated: day(pageUpdated()) },
    ...servedUrls().filter((url) => pdfSource(url)).map((url) => ({ path: url, updated: day(pdfUpdated(url)) })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(({ path, updated }) => `  <url><loc>${new URL(path, origin).href}</loc>${updated ? `<lastmod>${updated}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
