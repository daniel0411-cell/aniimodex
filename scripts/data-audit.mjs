import { readFileSync } from 'node:fs';

const sources = readFileSync(new URL('../data/sources.ts', import.meta.url), 'utf8');
const verification = readFileSync(new URL('../data/verification.ts', import.meta.url), 'utf8');
const aniimos = readFileSync(new URL('../data/aniimos.ts', import.meta.url), 'utf8');
const guides = readFileSync(new URL('../data/guides.ts', import.meta.url), 'utf8');
const detailPage = readFileSync(new URL('../app/[locale]/dex/[number]/page.tsx', import.meta.url), 'utf8');
const wikiSnapshot = JSON.parse(
  readFileSync(new URL('../data/official-wiki-snapshot.json', import.meta.url), 'utf8')
);
const wikiDetails = JSON.parse(
  readFileSync(new URL('../data/official-wiki-details.json', import.meta.url), 'utf8')
);
const errors = [];

if (wikiSnapshot.source !== 'https://wiki.aniimo.com/' || wikiSnapshot.entries.length < 80) {
  errors.push('Official Wiki snapshot source or entry count is invalid');
}
if (new Set(wikiSnapshot.entries.map((entry) => entry.number)).size !== wikiSnapshot.entries.length) {
  errors.push('Official Wiki snapshot contains duplicate numbers');
}
if (wikiDetails.details.length !== wikiSnapshot.entries.length || wikiDetails.failures.length) {
  errors.push('Official Wiki detail snapshot is incomplete');
}
for (const detail of wikiDetails.details) {
  if (!/^\d{3}$/.test(detail.number) || !detail.wikiId || !detail.evolution || !detail.traits.length || !detail.skills.length) {
    errors.push(`Invalid official Wiki detail: ${detail.number}`);
  }
  for (const skill of [...detail.mobility, ...detail.traits, ...detail.skills]) {
    if (!skill.name || (!skill.description && !skill.iconUrl) || (skill.iconUrl && !skill.iconUrl.startsWith('https://worldx-website-cdn.aniimo.com/'))) {
      errors.push(`Invalid official skill: ${detail.number}`);
    }
    if ((/\b(?:every|for)\s+[3-9]\d{2,}\s*s\b/i.test(skill.description ?? '') || /\b(?:total of|costs?|gains?)\s+(?:EP|HP)\b/i.test(skill.description ?? '')) && !detailPage.includes('isSuspiciousOfficialDescription(skill.description)')) errors.push(`Unfiltered suspicious skill: ${detail.number} ${skill.name}`);
  }
  const skillKeys = [...detail.mobility, ...detail.traits, ...detail.skills].map((skill) => `${skill.group ?? ''}:${skill.name}:${skill.description ?? ''}`);
  if (new Set(skillKeys).size !== skillKeys.length) errors.push(`Duplicate official skill: ${detail.number}`);
}
for (const entry of wikiSnapshot.entries) {
  if (!/^\d{3}$/.test(entry.number) || !entry.name || !entry.description || !/^\d+$/.test(entry.wikiPageId)) {
    errors.push(`Invalid official Wiki entry: ${entry.number}`);
  }
  if (!entry.imageUrl.startsWith('https://worldx-website-cdn.aniimo.com/')) {
    errors.push(`Unofficial image host: ${entry.number}`);
  }
  if (!['Lumin', 'Gamma', 'Nova', 'Unknown'].includes(entry.stage)) {
    errors.push(`Invalid official stage: ${entry.number}`);
  }
  if (!['DPS', 'Heal', 'Support', 'Break', 'Regen'].includes(entry.role)) {
    errors.push(`Invalid official role: ${entry.number}`);
  }
  if (!entry.elements.length || entry.elements.some((element) => !['Light', 'Fire', 'Ice', 'Dark', 'Lightning', 'Grass', 'Water', 'Earth', 'Wind'].includes(element))) {
    errors.push(`Invalid official elements: ${entry.number}`);
  }
}
if (!aniimos.includes("dataSource: 'official'") || !aniimos.includes('aniimo-official-wiki-index-2026-08-30')) {
  errors.push('Aniimo data layer is not bound to the official Wiki source');
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
