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

const { getAllAniimos, getAniimoByNumber } = load('lib/aniimo.ts');
const { getDexComparisons } = load('lib/dex-comparison.ts');
const { habitatGroups, mobilityGroups, evolutionFamilies, flattenEvolution } = load('data/aniimo-collections.ts');
const entries = getAllAniimos();
const detailRecords = load('data/official-wiki-details.json').details;
const comparisons = getDexComparisons(getAniimoByNumber('004'));
assert.equal(comparisons[0].entry.number, '062', 'Inferlupa should prioritize a shared-role, shared-element candidate');
assert.ok(comparisons.every((item) => item.entry.number !== '004'));
assert.equal(new Set(comparisons.map((item) => item.entry.number)).size, comparisons.length);
assert.deepEqual(getDexComparisons({ ...getAniimoByNumber('001'), officialRole: undefined, officialElements: [] }), [], 'Missing labels must not match every other missing label');

for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
  const messages = load(`messages/${locale}.json`);
  const read = (path) => readFileSync(resolve(root, 'out', locale, path, 'index.html'), 'utf8');
  for (const entry of entries) {
    const html = read(`dex/${entry.number}`);
    assert.ok(html.includes(messages.dexDetail.comparisonTitle), `${locale}/${entry.number}: missing comparison`);
    for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) {
      assert.ok(html.includes(`id="${target}"`), `${locale}/${entry.number}: broken #${target}`);
    }
    const detail = detailRecords.find((item) => item.number === entry.number);
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
console.log('Content quality checks passed: 276 Dex pages, 12 guide tables, missing data, deep links, comparisons and derived counts.');
