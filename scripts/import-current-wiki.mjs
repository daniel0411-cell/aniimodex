import { readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

// Input is structured, rendered DOM evidence collected through the browser.
// Never apply the old numeric IDs to the new official directory.
const input = JSON.parse(await readFile(process.argv[2], 'utf8'));
const old = JSON.parse(await readFile('data/official-wiki-snapshot.json', 'utf8'));
const expectedText = await readFile('data/wiki-current-index.ts', 'utf8');
const expected = [...expectedText.matchAll(/\['(\d+)', '([^']+)'\]/g)];
assert.equal(input.entries.length, expected.length);
assert.equal(new Set(input.entries.map(e => e.name)).size, expected.length);
for (const [, number, name] of expected) assert(input.entries.some(e => e.number === number && e.name === name));
const legacyByName = new Map(old.entries.map(e => [e.name, e.number]));
const imageKey = url => new URL(url).pathname.split('/').at(-1).replace(/^Wiki_(?:Aniimo|PetHead)_/, '');
const byImage = new Map(input.entries.map(e => [imageKey(e.imageUrl), e]));
assert.equal(byImage.size, input.entries.length, 'Artwork identities must be unique');
const stage = label => ({ 'Lumin Stage': 1, 'Gamma Stage': 2, 'Nova Stage': 3 }[label] ?? 0);
const elements = { holy: 'Light', fire: 'Fire', ice: 'Ice', dark: 'Dark', electric: 'Lightning', grass: 'Grass', water: 'Water', rock: 'Earth', wind: 'Wind' };
const roles = { DPS: 'DPS', Heal: 'Heal', Support: 'Support', BREAK: 'Break', REGEN: 'Regen' };
const route = e => legacyByName.get(e.name) ?? `wiki-${e.number}`;
function evolution(node) {
  if (!node) return undefined;
  const entry = node.imageUrl && byImage.get(imageKey(node.imageUrl));
  if (!entry) return undefined;
  const children = node.children.map(evolution);
  if (children.some(e => !e)) return undefined;
  return { name: entry.name, stage: stage(node.stage), children };
}
function ownStage(node, name) {
  if (!node) return 0;
  if (node.name === name) return node.stage;
  return node.children.map(n => ownStage(n, name)).find(Boolean) ?? 0;
}
const entries = [], details = [];
for (const e of input.entries) {
  assert(e.description && e.imageUrl && e.roles.length === 1 && roles[e.roles[0]], e.name);
  assert.deepEqual(e.attributes.map(a => a.name).sort(), ['HP', 'BREAK', 'ATK', 'M.DEF', 'P.DEF', 'REGEN'].sort(), e.name);
  assert(e.attributes.every(a => Number.isFinite(a.value) && a.value >= 0), e.name);
  assert.equal(e.url, `https://wiki.aniimo.com/item/${e.number}/basic-form`);
  assert(e.forms.some(f => f.url === e.url && f.name === 'Basic Form'), e.name);
  assert(e.sectionTitles.includes('Resonance Training'), `Incomplete page: ${e.name}`);
  assert(e.sectionTitles.includes('Skill Details') && e.skills.length && e.traits.length, e.name);
  assert(e.elements.length && e.elements.every(a => elements[a]), e.name);
  for (const s of [...e.skills, ...e.mobility, ...e.traits]) assert(s.name && s.description, e.name);
  const tree = evolution(e.evolution);
  const level = ownStage(tree, e.name);
  entries.push({ number: route(e), officialNumber: e.number, officialId: imageKey(e.imageUrl).replace(/\.png$/, ''), name: e.name, imageUrl: e.imageUrl, description: e.description, stage: ['Unknown', 'Lumin', 'Gamma', 'Nova'][level], role: roles[e.roles[0]], elements: e.elements.map(a => elements[a]), wikiPageId: `${e.number}/basic-form` });
  details.push({ number: route(e), wikiId: `${e.number}/basic-form`, checkedAt: input.checkedAt, habitats: e.habitats, evolution: tree ?? { name: e.name, stage: 0, children: [] }, evolutionPublished: !!tree, mobility: e.mobility, traits: e.traits, skills: e.skills, attributes: e.attributes, morphologyList: e.forms.map(f => ({ wikiId: new URL(f.url).pathname.split('/').slice(2).join('/'), name: f.name, url: f.url })) });
}
const meta = { source: 'https://wiki.aniimo.com/', checkedAt: input.checkedAt, scope: 'English basic-form pages; form links are indexed, alternate-form values are not imported.' };
await writeFile('data/current-wiki-snapshot.json', JSON.stringify({ ...meta, entries }, null, 2) + '\n');
await writeFile('data/current-wiki-details.json', JSON.stringify({ ...meta, details, failures: [] }, null, 2) + '\n');
console.log(JSON.stringify({ entries: entries.length, preservedRoutes: entries.filter(e => legacyByName.has(e.name)).length, newRoutes: entries.filter(e => !legacyByName.has(e.name)).length, unresolvedEvolution: details.filter(e => !e.evolutionPublished).map(e => e.number), habitats: details.filter(e => e.habitats.length).length, mobility: details.filter(e => e.mobility.length).length }));
