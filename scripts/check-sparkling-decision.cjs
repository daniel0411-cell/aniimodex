const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const ts = require('typescript');
const state = { exports: {} };
new Function('module', 'exports', ts.transpileModule(readFileSync('data/sparkling-decision.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText)(state, state.exports);
const { sparklingDecision: decide, sparklingDecisionCopy: titles, sparklingDecisionDetail: details } = state.exports;

// Known exclusions and unchanged Potential must hold even with incomplete inputs.
for (const sparkling of ['unknown', 'yes', 'no']) {
  for (const species of ['unknown', 'other', 'Irisalis', 'Helion', 'Lunara']) {
    assert.equal(decide('potential', sparkling, 'unknown', species), 'potential');
    if (['Irisalis', 'Helion', 'Lunara'].includes(species)) assert.equal(decide('pod', sparkling, 'unknown', species), 'excluded');
  }
}
assert.equal(decide('', 'unknown', 'unknown', 'unknown'), 'choose');
for (const goal of ['swap', 'original', 'reroll', 'pod']) {
  for (const sparkling of ['unknown', 'no']) assert.equal(decide(goal, sparkling, 'yes', 'other'), 'checkSparkling');
}
assert.equal(decide('swap', 'yes', 'unknown', 'other'), 'checkHue');
assert.equal(decide('swap', 'yes', 'no', 'other'), 'locked');
assert.equal(decide('swap', 'yes', 'yes', 'other'), 'swap');
assert.equal(decide('original', 'yes', 'unknown', 'unknown'), 'original');
assert.equal(decide('reroll', 'yes', 'no', 'unknown'), 'reroll');
assert.equal(decide('pod', 'yes', 'unknown', 'unknown'), 'checkSpecies');
assert.equal(decide('pod', 'yes', 'unknown', 'other'), 'pod');
for (const key of Object.keys(titles)) {
  assert.equal(titles[key].length, 3);
  assert.equal(details[key].length, 3);
  for (const text of [...titles[key], ...details[key]]) assert(text.trim().length > 0);
}
assert(details.reroll[0].includes('2 Sparkling Sigil') && details.reroll[0].includes('not a Pigment refund'));
assert(details.pod[0].includes('does not change Acquired Potential'));
assert(details.locked[0].includes('not shared'));
const slug = 'aniimo-prismana-potential-breeding-guide';
for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
  const html = readFileSync(`out/${locale}/guide/${slug}/index.html`, 'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  assert.equal((html.match(/data-testid="sparkling-decision"/g) || []).length, 1);
  assert(html.includes('data-result="choose"') && html.includes('aria-live="polite"'));
  assert(html.includes('2026-11-03') && html.includes('687520329382238609'));
  assert(html.indexOf('data-testid="sparkling-decision"') < html.indexOf('<table'));
  assert(html.includes('<table') && html.includes('Acquired Potential') && html.includes('Sparkling Sigil'));
  assert(!html.includes('noindex'));
  const sitemap = readFileSync('out/sitemap.xml', 'utf8');
  const entry = [...sitemap.matchAll(/<url>(.*?)<\/url>/gs)].find((m) => m[1].includes(`<loc>https://aniimodex.com/${locale}/guide/${slug}/</loc>`));
  assert(entry?.[1].includes('<lastmod>2026-11-03</lastmod>'));
}
console.log('Sparkling operation checks passed: unknown inputs, exclusions, individual unlocks, preserved Potential and three-locale static fallback.');
