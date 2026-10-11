import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';
import { readFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

export async function getStaticPaths() {
  const site = (await getEntry('site', 'site'))!.data;
  const jmp = (await getCollection('papers')).find((p) => p.data.jmp && p.data.pdf);
  return [
    { params: { file: 'Nicolae_Laura_CV' }, props: { source: join('src/content/cv', basename(site.cv)) } },
    ...(jmp ? [{ params: { file: 'Nicolae_JMP' }, props: { source: join('public/papers', basename(jmp.data.pdf!)) } }] : []),
  ];
}

export const GET: APIRoute = async ({ props }) => {
  const pdf = await readFile(join(process.cwd(), props.source));
  return new Response(pdf, { headers: { 'Content-Type': 'application/pdf' } });
};
