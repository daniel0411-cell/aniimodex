const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const ts = require('typescript');
const state = { exports: {} };
new Function('module', 'exports', ts.transpileModule(readFileSync('data/dex-reading-notes.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText)(state, state.exports);
const { dexReadingNotes } = state.exports;
const details = require('../data/current-wiki-details.json').details;
const text = (number) => JSON.stringify(details.find((entry) => entry.number === number));
// Fail when the snapshot facts behind the editorial interpretations change.
for (const term of ['Scorching Flames', '25%', 'Fire Kick', '20% for 20s', 'Pebble Kick', '8s', 'Hustle']) assert(text('001').includes(term), term);
for (const term of ['8 basic attacks', 'next skill', 'basic attack damage', 'up to 9 hits', '45%', '5 times', '7 times']) assert(text('004').includes(term), term);
for (const term of ['Grand Sorcerer', 'For 5s', '6 Might', 'same target 3 times', '10% for 10s']) assert(text('005').includes(term), term);
for (const term of ['Take Off', 'more DMG while airborne', '20 EP', 'Chirpi family', 'every 20s', 'puddles', 'deducts 4 Energy']) assert(text('008').includes(term), term);
for (const term of ['4 basic attacks', 'consumes this state', 'Cloudwalk', 'Cloud Shield', '15% max HP', '18% max HP', '30s']) assert(text('019').includes(term), term);
for (const term of ['Counting Sheep', 'Every 10s', '3 stacks', '20s', 'for 3s', 'removes the control effect', 'Restores 5% HP', 'by 2%', 'up to 3 stacks']) assert(text('020').includes(term), term);
assert.equal(details.find((entry) => entry.number === '020').mobility.length, 0);
assert.equal(details.find((entry) => entry.number === '020').habitats.length, 0);
assert.equal(details.find((entry) => entry.number === '004').habitats.length, 0);
assert.equal(details.find((entry) => entry.number === '005').mobility.length, 0);
assert.equal(details.length, 90);
assert(details.every((entry) => entry.attributes.length === 6));
const read = (path) => readFileSync(`out/${path}/index.html`, 'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
  const messages = require(`../messages/${locale}.json`);
  for (const [number, notesByLocale] of Object.entries(dexReadingNotes)) {
    const html = read(`${locale}/dex/${number}`);
    const notes = notesByLocale[locale];
    assert.equal(notes.length, 3);
    assert(html.includes(messages.dexDetail.readingNotesTitle));
    assert(html.includes(details.find(entry => entry.number === number).checkedAt));
    assert(!html.includes('noindex'));
    assert(html.indexOf('id="reading-notes-title"') < html.indexOf('id="attributes-title"'));
    for (const note of notes) {
      assert(html.includes(note.question));
      assert(html.includes(note.answer));
      assert(html.includes(`href="#${note.section}"`));
      assert(html.includes(`id="${note.section}"`));
      assert(messages.dexDetail[`official${note.section[0].toUpperCase()}${note.section.slice(1)}`]);
    }
  }
  assert(!read(`${locale}/dex/002`).includes('id="reading-notes-title"'));
  const overview = read(`${locale}/guide/what-is-aniimo`);
  assert(overview.includes('2026-11-02'));
  assert(overview.includes('86'));
  for (const block of messages.guide.posts['what-is-aniimo'].body.filter((block) => block.t === 'link')) {
    assert(overview.includes(`href="/${locale}${block.href}/"`));
  }
  assert(!/base templates still require mapping|尚未公布具体概率公式|基礎機率模板仍需逐項映射|stats.*remain under review|图鉴数值、元素倍率/.test(overview));
}
console.log('Dex reading notes passed: evidence tripwires, three locales, anchors, scope and overview corrections.');
