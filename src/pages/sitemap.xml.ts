import type { APIRoute } from 'astro';
import { pdfSource, servedUrls } from '../lib/pdfs.mjs';

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://lauranicolae.com');
  const urls = ['/', ...servedUrls().filter((url) => pdfSource(url))].map((path) => new URL(path, origin).href);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
