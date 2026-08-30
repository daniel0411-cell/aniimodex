import { readFile, writeFile } from 'node:fs/promises';

const INDEX_URL = new URL('../data/official-wiki-snapshot.json', import.meta.url);
const OUTPUT_URL = new URL('../data/official-wiki-details.json', import.meta.url);
const BASE_URL = 'https://wiki.aniimo.com';
const NUXT_DATA_PATTERN = /<script[^>]+id="__NUXT_DATA__"[^>]*>([\s\S]*?)<\/script>/;

function value(payload, ref) {
  return typeof ref === 'number' ? payload[ref] : ref;
}

function props(payload, componentRef) {
  const component = payload[componentRef];
  return value(payload, component.props);
}

function children(payload, componentRef) {
  const refs = value(payload, payload[componentRef].children) ?? [];
  return refs.map((ref) => ({ ref, type: value(payload, payload[ref].type), props: props(payload, ref) }));
}

function parseSkill(payload, skillRef) {
  const skill = props(payload, skillRef);
  return {
    name: value(payload, skill.descTitle),
    description: value(payload, skill.descContent),
    iconUrl: value(payload, skill.icon),
  };
}

function parseEvolution(payload, nodeRef) {
  const node = value(payload, nodeRef);
  return {
    name: value(payload, node.name),
    stage: value(payload, node.stage),
    children: (value(payload, node.children) ?? []).map((childRef) => parseEvolution(payload, childRef)),
  };
}

function parseDetail(html, wikiId) {
  const match = html.match(NUXT_DATA_PATTERN);
  if (!match) throw new Error(`Nuxt payload missing for ${wikiId}`);
  const payload = JSON.parse(match[1]);
  const key = `aniimo-detail-${wikiId}-en`;
  const root = value(payload, payload[3][key]);
  if (!root) throw new Error(`Detail payload missing for ${wikiId}`);
  const directories = value(payload, root.directories);
  const sections = new Map();
  const sectionHeaders = new Map();

  for (const directoryRef of directories) {
    const directory = value(payload, directoryRef);
    for (const componentRef of value(payload, directory.components)) {
      const component = value(payload, componentRef);
      if (value(payload, component.type) !== 'crumbTitle') continue;
      const header = props(payload, componentRef);
      const title = value(payload, header.title);
      sections.set(title, value(payload, component.children) ?? []);
      sectionHeaders.set(title, header);
    }
  }

  const habitats = (sections.get('Habitats') ?? []).map((ref) => value(payload, props(payload, ref).title));
  const evolutionComponents = sections.get('Evolution') ?? [];
  const evolution = evolutionComponents.length
    ? parseEvolution(payload, props(payload, evolutionComponents[0]).data)
    : undefined;
  const mobility = (sections.get('Mobility') ?? []).map((ref) => parseSkill(payload, ref));
  const traits = (sections.get('Trait') ?? []).map((ref) => parseSkill(payload, ref));
  const skills = [];
  const skillTabs = value(payload, sectionHeaders.get('Skill Details')?.tabs) ?? [];
  for (const tabRef of skillTabs) {
    const tab = value(payload, tabRef);
    const group = value(payload, tab.title);
    for (const skillRef of value(payload, tab.children) ?? []) {
      skills.push({ group, ...parseSkill(payload, skillRef) });
    }
  }

  const morphologyList = (value(payload, root.morphologyList) ?? []).map((ref) => {
    const item = value(payload, ref);
    return {
      wikiId: value(payload, item.id),
      name: value(payload, item.currentMorphology),
    };
  });

  return { wikiId, habitats, evolution, mobility, traits, skills, morphologyList };
}

async function fetchDetail(entry) {
  const inputDirectory = process.argv[2];
  if (inputDirectory) {
    const html = await readFile(`${inputDirectory}/${entry.number}.html`, 'utf8');
    return { number: entry.number, ...parseDetail(html, entry.wikiPageId) };
  }
  const url = `${BASE_URL}/item/${entry.wikiPageId}`;
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return { number: entry.number, ...parseDetail(await response.text(), entry.wikiPageId) };
}

const index = JSON.parse(await readFile(INDEX_URL, 'utf8'));
const queue = [...index.entries];
const details = [];
const failures = [];

async function worker() {
  while (queue.length) {
    const entry = queue.shift();
    try {
      details.push(await fetchDetail(entry));
      console.log(`Synced ${entry.number} ${entry.name}`);
    } catch (error) {
      failures.push({ number: entry.number, error: error.message });
      console.error(`Failed ${entry.number}: ${error.message}`);
    }
  }
}

await Promise.all(Array.from({ length: 4 }, () => worker()));
details.sort((a, b) => Number(a.number) - Number(b.number));
if (details.length < 80) throw new Error(`Only ${details.length} detail pages succeeded`);

await writeFile(
  OUTPUT_URL,
  `${JSON.stringify({ source: BASE_URL, checkedAt: new Date().toISOString().slice(0, 10), details, failures }, null, 2)}\n`
);
console.log(`Saved ${details.length} official detail records; ${failures.length} failures.`);
