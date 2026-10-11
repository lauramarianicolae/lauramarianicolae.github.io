import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, join } from 'node:path';
import { parse } from 'yaml';

export const cvUrl = '/Nicolae_Laura_CV.pdf';
export const jmpUrl = '/Nicolae_JMP.pdf';

const papersDir = 'src/content/papers';

const committedAt = (path) => {
  try {
    return Number(execFileSync('git', ['log', '-1', '--format=%ct', '--', path], { encoding: 'utf8' }).trim()) || 0;
  } catch {
    return 0;
  }
};

const frontmatter = (path) => parse(readFileSync(path, 'utf8').split(/^---\s*$/m)[1] ?? '') ?? {};

const cleanName = (name) =>
  String(name)
    .trim()
    .replace(/\.pdf$/i, '')
    .replace(/^Nicolae_/i, '')
    .replace(/[^A-Za-z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '');

const served = () => {
  const { cv } = parse(readFileSync('src/content/site.yaml', 'utf8'));
  const taken = new Set([cvUrl, jmpUrl]);
  const papers = readdirSync(papersDir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((file) => ({ file, data: frontmatter(join(papersDir, file)) }))
    .sort((a, b) => Number(Boolean(b.data.jmp)) - Number(Boolean(a.data.jmp)));
  const paperEntries = papers.map(({ file, data }, i) => {
    const cms = data.pdf && join('public/papers', basename(data.pdf));
    if (data.jmp && i === 0) return { file, url: jmpUrl, cms };
    const names = [data.shortName, basename(file, '.md')].filter(Boolean).map(cleanName).filter(Boolean);
    let url = names.map((n) => `/papers/Nicolae_${n}.pdf`).find((u) => !taken.has(u));
    for (let n = 2; !url; n++) {
      const candidate = `/papers/Nicolae_${names.at(-1)}_${n}.pdf`;
      if (!taken.has(candidate)) url = candidate;
    }
    taken.add(url);
    return { file, url, cms };
  });
  return [{ url: cvUrl, cms: cv && join('src/content/cv', basename(cv)) }, ...paperEntries];
};

export const pdfSource = (url) =>
  [served().find((s) => s.url === url)?.cms, join('public', url)]
    .filter((p) => p && existsSync(p))
    .sort((a, b) => committedAt(b) - committedAt(a))[0];

export const servedUrls = () => [...new Set(served().map((s) => s.url))];

export const paperPdfUrl = (file) => {
  const url = served().find((s) => s.file === file)?.url;
  return url && pdfSource(url) ? url : undefined;
};
