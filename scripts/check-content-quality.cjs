const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const ts = require('typescript');
const root = resolve(__dirname, '..');
const cache = new Map();
function load(path) {
  if (cache.has(path)) return cache.get(path);
  if (path.endsWith('.json')) return JSON.parse(readFileSync(resolve(root, path), 'utf8'));
  const module = { exports: {} };
  const { outputText } = ts.transpileModule(readFileSync(resolve(root, path), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019, esModuleInterop: true },
  });
  new Function('require', 'module', 'exports', outputText)((id) => {
    assert.ok(id.startsWith('@/'), `Unexpected dependency: ${id}`);
    return load(`${id.slice(2)}${id.endsWith('.json') ? '' : '.ts'}`);
  }, module, module.exports);
  cache.set(path, module.exports);
  return module.exports;
}

const { getAllAniimos, getAllRouteAniimos, getAniimoByNumber, searchAniimos } = load('lib/aniimo.ts');
const { getDexComparisons } = load('lib/dex-comparison.ts');
const { isSuspiciousOfficialDescription } = load('data/aniimo-details.ts');
assert(isSuspiciousOfficialDescription('Deals {0}% extra damage.'));
assert(isSuspiciousOfficialDescription('Increases BREAK by 0.'));
assert(!isSuspiciousOfficialDescription('Triggers every 0.5s for 15s.'));
const { habitatGroups, mobilityGroups, evolutionFamilies, flattenEvolution } = load('data/aniimo-collections.ts');
const entries = getAllAniimos();
const detailRecords = load('data/current-wiki-details.json').details;
const comparisons = getDexComparisons(getAniimoByNumber('004'));
assert.ok(comparisons[0].sameRole && comparisons[0].sharedElements.length, 'Inferlupa should prioritize a shared-role, shared-element candidate');
assert.ok(comparisons.every((item) => item.entry.number !== '004'));
assert.equal(new Set(comparisons.map((item) => item.entry.number)).size, comparisons.length);
assert.deepEqual(getDexComparisons({ ...getAniimoByNumber('001'), officialRole: undefined, officialElements: [] }), [], 'Missing labels must not match every other missing label');
const legacy = load('data/official-wiki-snapshot.json').entries;
const currentIndex = load('data/wiki-current-index.ts').currentWikiIndex;
assert.equal(entries.length, 86);
assert.equal(getAllRouteAniimos().length, 98);
assert.equal(new Set(getAllRouteAniimos().map(e => e.number)).size, 98);
for (const [number, name] of currentIndex) {
  const entry = entries.find(e => e.enName === name);
  assert.equal(entry?.officialNumber, number, `${name}: wrong current number`);
  const previous = legacy.find(e => e.name === name);
  if (previous) assert.equal(entry.number, previous.number, `${name}: changed stable URL`);
  assert(searchAniimos(number).some(e => e.enName === name));
}
for (const archived of getAllRouteAniimos().filter(e => e.archived)) {
  assert.deepEqual(getDexComparisons(archived), []);
  assert(!entries.some(e => e.number === archived.number));
}

for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
  const messages = load(`messages/${locale}.json`);
  const read = (path) => readFileSync(resolve(root, 'out', locale, path, 'index.html'), 'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  for (const archived of getAllRouteAniimos().filter(e => e.archived)) {
    const html = read(`dex/${archived.number}`);
    assert(html.includes('2026-08-30'));
    assert(!html.includes(messages.dexDetail.comparisonTitle));
    assert(!html.includes(messages.dexDetail.attributesTitle));
  }
  for (const entry of entries) {
    const html = read(`dex/${entry.number}`);
    assert.ok(html.includes(messages.dexDetail.comparisonTitle), `${locale}/${entry.number}: missing comparison`);
    for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) {
      assert.ok(html.includes(`id="${target}"`), `${locale}/${entry.number}: broken #${target}`);
    }
    const detail = detailRecords.find((item) => item.number === entry.number);
    assert.equal(detail.attributes.length, 6);
    assert(html.includes(messages.dexDetail.attributesTitle));
    if (!detail.evolutionPublished) assert(html.includes(messages.dexDetail.evolutionUnresolved));
    assert(html.includes('2026-10-23'));
    assert(html.includes(`https://wiki.aniimo.com/item/${entry.officialNumber}/basic-form`));
    if ([...detail.skills, ...detail.traits].some(skill => isSuspiciousOfficialDescription(skill.description))) assert(html.includes(messages.dexDetail.descriptionIncomplete));
    if (!detail.habitats.length) assert.ok(html.includes(messages.dexDetail.habitatsUnlisted));
    if (!detail.mobility.length) assert.ok(html.includes(messages.dexDetail.mobilityUnlisted));
    assert.ok(html.includes(`?aniimo=${entry.number}`), `${locale}/${entry.number}: lost lookup context`);
    assert.ok(!html.includes('Also searched as'));
  }

  const topics = [
    ['roles', 'aniimo-roles-explained'], ['evolution', 'aniimo-evolution-system'],
    ['habitats', 'aniimo-habitats-locations'], ['mobility', 'aniimo-mobility-abilities'],
  ];
  for (const [topic, slug] of topics) {
    const html = read(`guide/${slug}`);
    assert.ok(html.includes(messages.publishedDataGuide[`${topic}Title`]));
    assert.ok(html.includes(messages.publishedDataGuide.snapshotNote));
    const table = html.match(/<table[\s\S]*?<\/table>/)?.[0];
    assert.ok(table, `${locale}/${slug}: missing usable data table`);
    assert.ok(table.includes(`/${locale}/dex/`));
    if (topic === 'roles') {
      for (const role of ['DPS', 'Heal', 'Support', 'Break', 'Regen']) {
        const row = [...table.matchAll(/<tr[\s\S]*?<\/tr>/g)].find(([text]) => text.includes(messages.roles[role]))?.[0];
        const count = entries.filter((entry) => entry.officialRole === role).length;
        assert.ok(row?.includes(`>${count}</td>`), `${locale}: wrong ${role} count`);
      }
    }
    if (topic === 'habitats') assert.ok(table.includes(habitatGroups[0][0]));
    if (topic === 'mobility') assert.ok(table.includes(mobilityGroups[0][0]));
    if (topic === 'evolution') {
      const branches = (node) => node.children.length > 1 || node.children.some(branches);
      for (const family of evolutionFamilies.filter(branches)) {
        for (const name of flattenEvolution(family)) {
          const entry = entries.find((item) => item.enName === name);
          if (entry) assert.ok(table.includes(`/dex/${entry.number}/`));
        }
      }
    }
  }
}
console.log('Content quality checks passed: 86 current identities, 98 stable routes, 258 current Dex pages, guide tables, attributes, missing data and comparisons.');
