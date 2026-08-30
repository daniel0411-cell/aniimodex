import { readFile, writeFile } from 'node:fs/promises';

const SOURCE_URL = 'https://wiki.aniimo.com/';
const OUTPUT_URL = new URL('../data/official-wiki-snapshot.json', import.meta.url);
const NUXT_DATA_PATTERN = /<script[^>]+id="__NUXT_DATA__"[^>]*>([\s\S]*?)<\/script>/;

const STAGES = { '1': 'Lumin', '2': 'Gamma', '3': 'Nova', '0': 'Unknown' };
const POSITIONS = {
  'position-dps': 'DPS',
  'position-heal': 'Heal',
  'position-sup': 'Support',
  'position-break': 'Break',
  'position-energy': 'Regen',
};
const ATTRIBUTES = {
  'attributes-holy': 'Light',
  'attributes-fire': 'Fire',
  'attributes-ice': 'Ice',
  'attributes-dark': 'Dark',
  'attributes-electric': 'Lightning',
  'attributes-grass': 'Grass',
  'attributes-water': 'Water',
  'attributes-rock': 'Earth',
  'attributes-wind': 'Wind',
};

function resolve(payload, value) {
  if (typeof value === 'number') return payload[value];
  if (Array.isArray(value)) return value.map((item) => resolve(payload, item));
  return value;
}

function field(payload, record, key) {
  const ref = record[key];
  return resolve(payload, ref);
}

const inputPath = process.argv[2];
const html = inputPath
  ? await readFile(inputPath, 'utf8')
  : await fetch(SOURCE_URL, { signal: AbortSignal.timeout(30000) }).then(async (response) => {
      if (!response.ok) throw new Error(`Official Wiki request failed: ${response.status}`);
      return response.text();
    });
const nuxtMatch = html.match(NUXT_DATA_PATTERN);
if (!nuxtMatch) throw new Error('Official Wiki Nuxt payload was not found');
const payload = JSON.parse(nuxtMatch[1]);
const listRef = payload[3]['aniimo-wiki-list-en'];
const entryRefs = payload[listRef];
const entries = entryRefs
  .map((entryRef) => {
    const wrapper = payload[entryRef];
    const record = payload[wrapper.searchKey];
    const get = (key) => field(payload, record, key);
    return {
      number: get('entryId'),
      officialId: String(get('sortOrder')),
      name: get('name'),
      imageUrl: get('imageUrl'),
      description: get('description'),
      stage: STAGES[get('currentStage')] ?? 'Unknown',
      role: POSITIONS[resolve(payload, get('position'))] ?? 'Unknown',
      elements: get('attributes')
        .map((attribute) => ATTRIBUTES[resolve(payload, attribute)])
        .filter(Boolean),
    };
  })
  .filter((entry) => /^\d{3}$/.test(entry.number));

const pageIds = new Map(
  [...html.matchAll(/href="\/item\/(\d+)"[\s\S]*?NO\.(\d{3})/g)].map((match) => [
    match[2],
    match[1],
  ])
);
for (const entry of entries) entry.wikiPageId = pageIds.get(entry.number);

if (entries.length < 80) {
  throw new Error(`Official Wiki parse returned only ${entries.length} entries`);
}

const uniqueNumbers = new Set(entries.map((entry) => entry.number));
if (uniqueNumbers.size !== entries.length) throw new Error('Official Wiki contains duplicate numbers');

const snapshot = {
  source: SOURCE_URL,
  checkedAt: new Date().toISOString().slice(0, 10),
  fieldScope: ['number', 'officialId', 'name', 'imageUrl', 'description', 'stage', 'role', 'elements'],
  entries,
};

await writeFile(OUTPUT_URL, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`Saved ${entries.length} official Wiki entries.`);
