import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse } from 'yaml';

const listUnder = (key: string) => (text: string) =>
  ((parse(text)?.[key] ?? []) as object[]).map((item, i) => ({ id: String(i + 1), ...item }));

const optionalDate = z.preprocess((v) => (v === '' || v == null ? undefined : v), z.coerce.date().optional());
const text = z.union([z.string(), z.number()]).transform(String);

const papers = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/papers' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['working-paper', 'publication']),
    order: z.number().default(99),
    jmp: z.boolean().default(false),
    coauthors: z.string().optional(),
    status: z.string().optional(),
    updated: optionalDate,
    venue: z.string().optional(),
    venueDate: text.optional(),
    pdf: z.string().optional(),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
  }),
});

const teaching = defineCollection({
  loader: file('src/content/teaching.yaml', { parser: listUnder('courses') }),
  schema: z.object({
    course: z.string(),
    level: z.string().optional(),
    role: z.string(),
    instructor: z.string(),
    term: text,
  }),
});

const awards = defineCollection({
  loader: file('src/content/awards.yaml', { parser: listUnder('awards') }),
  schema: z.object({
    name: z.string(),
    detail: z.string().optional(),
    year: text,
  }),
});

const prose = defineCollection({
  loader: glob({ pattern: ['bio.md', 'languages.md'], base: './src/content' }),
  schema: z.object({}),
});

const site = defineCollection({
  loader: file('src/content/site.yaml', { parser: (t) => [{ id: 'site', ...parse(t) }] }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      title: z.string(),
      affiliation: z.string(),
      email: z.string(),
      cv: z.string(),
      fields: z.array(z.string()).default([]),
      photo: image(),
      photoAlt: z.string(),
      description: z.string(),
      ogDescription: z.string(),
      topics: z.array(z.string()).default([]),
      thanks: z.array(z.object({ lang: z.string(), text: z.string() })).min(1),
    }),
});

export const collections = { papers, teaching, awards, prose, site };
