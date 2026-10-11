import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';
import { readFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

export const GET: APIRoute = async () => {
  const site = (await getEntry('site', 'site'))!.data;
  const pdf = await readFile(join(process.cwd(), 'src/content/cv', basename(site.cv)));
  return new Response(pdf, { headers: { 'Content-Type': 'application/pdf' } });
};
