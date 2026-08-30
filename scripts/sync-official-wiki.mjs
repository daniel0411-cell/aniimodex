import { writeFile } from 'node:fs/promises';

const SOURCE_URL = 'https://wiki.aniimo.com/';
const OUTPUT_URL = new URL('../data/official-wiki-snapshot.json', import.meta.url);
const RECORD_PATTERN =
  /"(\d{3})",(\d+),"([^"]+)","(https:\/\/worldx-website-cdn\.aniimo\.com\/[^"]+)","((?:[^"\\]|\\.)*)"/g;

const response = await fetch(SOURCE_URL);
if (!response.ok) throw new Error(`Official Wiki request failed: ${response.status}`);

const html = await response.text();
const entries = [...html.matchAll(RECORD_PATTERN)].map((match) => ({
  number: match[1],
  officialId: match[2],
  name: match[3],
  imageUrl: match[4],
  description: JSON.parse(`"${match[5]}"`),
}));

if (entries.length < 80) {
  throw new Error(`Official Wiki parse returned only ${entries.length} entries`);
}

const uniqueNumbers = new Set(entries.map((entry) => entry.number));
if (uniqueNumbers.size !== entries.length) throw new Error('Official Wiki contains duplicate numbers');

const snapshot = {
  source: SOURCE_URL,
  checkedAt: new Date().toISOString().slice(0, 10),
  fieldScope: ['number', 'officialId', 'name', 'imageUrl', 'description'],
  entries,
};

await writeFile(OUTPUT_URL, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`Saved ${entries.length} official Wiki entries.`);
