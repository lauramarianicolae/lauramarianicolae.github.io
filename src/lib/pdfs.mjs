import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, join } from 'node:path';
import { parse } from 'yaml';

export const cvUrl = '/Nicolae_Laura_CV.pdf';
export const jmpUrl = '/Nicolae_JMP.pdf';

const papersDir = 'src/content/papers';
const cvDir = 'src/content/cv';
const paperPdfsDir = 'src/content/paper-pdfs';

const committedAt = (path) => {
  try {
    const blob = execFileSync('git', ['hash-object', path], { encoding: 'utf8' }).trim();
    const times = execFileSync('git', ['log', '--format=%ct', `--find-object=${blob}`], { encoding: 'utf8' })
      .split('\n')
      .map(Number)
      .filter(Boolean);
    return times.length ? Math.min(...times) : 0;
  } catch {
    return 0;
  }
};

const changedAt = (file, key) => {
  try {
    return Number(execFileSync('git', ['log', '-1', '--format=%ct', `-G^${key}:`, '--', file], { encoding: 'utf8' }).trim()) || 0;
  } catch {
    return 0;
  }
};

const picked = (path, file, key) => path && { path, at: changedAt(file, key) };

const pdfsIn = (dir) =>
  existsSync(dir) ? readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.pdf')).sort().map((f) => join(dir, f)) : [];

const folderFor = (name) => {
  if (!existsSync(paperPdfsDir)) return undefined;
  const dir = readdirSync(paperPdfsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort()
    .find((d) => cleanName(d).toLowerCase() === name.toLowerCase());
  return dir && join(paperPdfsDir, dir);
};

const fieldFile = (pdf) => {
  if (!pdf) return undefined;
  const value = String(pdf).replace(/^\/+/, '');
  return value.startsWith('paper-pdfs/') ? join('src/content', value) : join('public/papers', basename(value));
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
    const field = picked(fieldFile(data.pdf), join(papersDir, file), 'pdf');
    if (data.jmp && i === 0) {
      const folder = folderFor('JMP');
      return { file, url: jmpUrl, candidates: [field, ...(folder ? pdfsIn(folder) : [])] };
    }
    const names = [data.shortName, basename(file, '.md')].filter(Boolean).map(cleanName).filter(Boolean);
    let name = names.find((n) => !taken.has(`/papers/Nicolae_${n}.pdf`));
    for (let n = 2; !name; n++) {
      if (!taken.has(`/papers/Nicolae_${names.at(-1)}_${n}.pdf`)) name = `${names.at(-1)}_${n}`;
    }
    const url = `/papers/Nicolae_${name}.pdf`;
    taken.add(url);
    const folder = folderFor(name);
    return { file, url, candidates: [field, ...(folder ? pdfsIn(folder) : [])] };
  });
  return [{ url: cvUrl, candidates: [picked(cv && join(cvDir, basename(cv)), 'src/content/site.yaml', 'cv'), ...pdfsIn(cvDir)] }, ...paperEntries];
};

export const pdfSource = (url) =>
  [...(served().find((s) => s.url === url)?.candidates ?? []), join('public', url)]
    .filter(Boolean)
    .map((c) => (typeof c === 'string' ? { path: c, at: 0 } : c))
    .filter((c) => existsSync(c.path))
    .map((c) => ({ ...c, at: Math.max(c.at, committedAt(c.path)) }))
    .sort((a, b) => b.at - a.at)[0]?.path;

export const servedUrls = () => [...new Set(served().map((s) => s.url))];

export const paperPdfUrl = (file) => {
  const url = served().find((s) => s.file === file)?.url;
  return url && pdfSource(url) ? url : undefined;
};
