const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const snapshot = require('../data/current-wiki-snapshot.json');
const details = require('../data/current-wiki-details.json').details;
const read = (locale, path) => readFileSync(`out/${locale}/${path}/index.html`, 'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
const targets = [['022', 'Royalby', 524], ['008', 'Pouchwisp', 520], ['028', 'Jeburst', 542], ['010', 'Glameep', 530]];
assert.equal(snapshot.checkedAt, '2026-10-23', 'Do not refresh the original batch date');
assert.equal(details.filter(d => d.checkedAt === '2026-10-23').length, 86);
for (const [officialNumber, name, sum] of targets) {
  const number = name === 'Glameep' ? '089' : `wiki-300301-${officialNumber}`;
  const entry = snapshot.entries.find(e => e.number === number);
  const detail = details.find(d => d.number === number);
  assert.equal(entry.name, name);
  assert.equal(entry.officialNumber, officialNumber);
  assert.equal(entry.checkedAt, '2026-11-08');
  assert.equal(detail.checkedAt, entry.checkedAt);
  assert.equal(detail.attributes.reduce((total, attr) => total + attr.value, 0), sum);
  assert.equal(detail.evolutionPublished, false, 'Incomplete families must stay out of family comparisons');
  assert(detail.skills.some(s => s.group === 'Combat Skills'));
  assert(detail.skills.some(s => s.group === 'Innate Skills'));
  assert(snapshot.entries.some(e => e.number !== number && e.officialNumber === officialNumber), 'Keep colliding older identities');
  for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
    const html = read(locale, `dex/${number}`);
    const messages = require(`../messages/${locale}.json`);
    assert(html.includes(name));
    assert(html.includes(`https://wiki.aniimo.com/item/${officialNumber}/basic-form/300301`));
    assert(html.includes('2026-11-08'));
    assert(html.includes(messages.dexDetail.evolutionUnresolved));
    assert(html.includes('id="reading-notes-title"'));
    assert(html.includes(`/${locale}/guide/aniimo-prismana-event-tracker/#prismana-schedule`) || html.includes(`/${locale}/guide/aniimo-prismana-event-tracker#prismana-schedule`));
    assert(read(locale, 'guide/aniimo-prismana-event-tracker').includes(`/${locale}/dex/${number}/`));
    assert(read(locale, 'locations').includes(`/${locale}/dex/${number}/`));
    assert(read(locale, 'dex').includes(`/${locale}/dex/${number}/`));
    assert(!html.includes('noindex'));
  }
}
const glameep = details.find(d => d.number === '089');
const healing = glameep.skills.find(s => s.name === 'Ripples of Floating Duckweed');
assert(healing.description.includes('over 6.'));
assert(!healing.description.includes('over 6s'), 'Missing time unit must not be invented');
for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
  assert(read(locale, 'dex/089').includes(require(`../messages/${locale}.json`).dexDetail.descriptionIncomplete));
  const eventHtml = read(locale, 'guide/aniimo-prismana-event-tracker');
  for (const stale of ['historical record only', 'Glameep 仅有8月历史记录', 'Glameep 僅有8月歷史紀錄']) assert(!eventHtml.includes(stale), 'Event copy must reflect refreshed Glameep');
}
const sitemap = readFileSync('out/sitemap.xml', 'utf8');
for (const [officialNumber, name] of targets) {
  const number = name === 'Glameep' ? '089' : `wiki-300301-${officialNumber}`;
  const block = [...sitemap.matchAll(/<url>(.*?)<\/url>/gs)].find(match => match[1].includes(`<loc>https://aniimodex.com/en/dex/${number}/</loc>`))?.[1];
  assert(block?.includes('<lastmod>2026-11-08</lastmod>'));
}
console.log('Event Dex update passed: four identities, collision preservation, source dates, attributes, both skill groups, missing duration and localized event/directory links.');
