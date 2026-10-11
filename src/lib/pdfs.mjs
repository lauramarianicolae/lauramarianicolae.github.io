import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, join } from 'node:path';
import { parse } from 'yaml';

export const cvUrl = '/Nicolae_Laura_CV.pdf';
export const jmpUrl = '/Nicolae_JMP.pdf';

const committedAt = (path) => {
  try {
    return Number(execFileSync('git', ['log', '-1', '--format=%ct', '--', path], { encoding: 'utf8' }).trim()) || 0;
  } catch {
    return 0;
  }
};

const frontmatter = (path) => parse(readFileSync(path, 'utf8').split(/^---\s*$/m)[1] ?? '') ?? {};

const cmsSource = (url) => {
  if (url === cvUrl) {
    const { cv } = parse(readFileSync('src/content/site.yaml', 'utf8'));
    return cv && join('src/content/cv', basename(cv));
  }
  const dir = 'src/content/papers';
  const jmp = readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => frontmatter(join(dir, f)))
    .find((p) => p.jmp && p.pdf);
  return jmp && join('public/papers', basename(jmp.pdf));
};

export const pdfSource = (url) =>
  [cmsSource(url), join('public', url)]
    .filter((p) => p && existsSync(p))
    .sort((a, b) => committedAt(b) - committedAt(a))[0];
