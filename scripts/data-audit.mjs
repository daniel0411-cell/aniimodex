import { readFileSync } from 'node:fs';

const sources = readFileSync(new URL('../data/sources.ts', import.meta.url), 'utf8');
const verification = readFileSync(new URL('../data/verification.ts', import.meta.url), 'utf8');
const aniimos = readFileSync(new URL('../data/aniimos.ts', import.meta.url), 'utf8');
const guides = readFileSync(new URL('../data/guides.ts', import.meta.url), 'utf8');
const errors = [];

if (!/dataSource:\s*'unknown',[\s\S]*?sourceIds:\s*\[\]/.test(aniimos)) {
  errors.push('Aniimo constructor does not enforce unknown data status');
}

for (const claim of verification.matchAll(
  /\{\s*id:\s*'[^']+'[\s\S]*?sourceIds:\s*\[([^\]]*)\][\s\S]*?\}/g
)) {
  if (/status:\s*'official'/.test(claim[0]) && !/'[^']+'/.test(claim[1])) {
    errors.push('Official claim has no source');
  }
}

for (const id of [...verification.matchAll(/sourceIds:\s*\[([^\]]*)\]/g)].flatMap((match) =>
  [...match[1].matchAll(/'([^']+)'/g)].map((item) => item[1])
)) {
  if (!sources.includes(`id: '${id}'`)) errors.push(`Unknown source ID: ${id}`);
}

for (const guide of guides.matchAll(/\{\s*slug:\s*'[^']+'[\s\S]*?\n\s*\},/g)) {
  if (!/published:\s*false/.test(guide[0]) && !/sourceIds:\s*\[[^\]]*'[^']+'/.test(guide[0])) {
    errors.push('Published guide has no source');
  }
  const sourceIds = guide[0].match(/sourceIds:\s*\[([^\]]*)\]/)?.[1] ?? '';
  for (const id of [...sourceIds.matchAll(/'([^']+)'/g)].map((match) => match[1])) {
    if (!sources.includes(`id: '${id}'`)) errors.push(`Unknown guide source ID: ${id}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Data evidence audit passed.');
