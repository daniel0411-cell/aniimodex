const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const snapshot = require('../data/current-wiki-snapshot.json');
const details = require('../data/current-wiki-details.json').details;
const read = (locale, path) => readFileSync(`out/${locale}/${path}/index.html`, 'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
const targets = [['022', 'Royalby', 524], ['008', 'Pouchwisp', 520], ['028', 'Jeburst', 542], ['010', 'Glameep', 530]];
const ts = require('typescript');
const scheduleModule = { exports: {} };
new Function('exports', ts.transpileModule(readFileSync('data/prismana-schedule.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText)(scheduleModule.exports);
const { prismanaServers, prismanaWindows, prismanaWindowStatus } = scheduleModule.exports;
for (const server of prismanaServers) {
  const boundary = Date.parse('2026-11-16T04:00:00Z') - server.offset * 3600000;
  assert.equal(prismanaWindowStatus('2026-11-09', '2026-11-16', server.offset, boundary - 1), 'active');
  assert.equal(prismanaWindowStatus('2026-11-09', '2026-11-16', server.offset, boundary), 'ended');
  assert.equal(prismanaWindowStatus('2026-11-16', '2026-11-23', server.offset, boundary), 'active');
  assert.equal(prismanaWindowStatus('2026-11-16', '2026-11-23', server.offset, NaN), 'unknown');
  assert(prismanaWindows.every(w => prismanaWindowStatus(w.start, w.end, server.offset, Date.parse('2026-12-08')) === 'ended'));
  assert(prismanaWindows.every(w => prismanaWindowStatus(w.start, w.end, server.offset, Date.parse('2026-11-01')) === 'upcoming'));
}
for (const number of ['032', '033']) {
  const detail = details.find(d => d.number === number);
  assert.deepEqual(detail.habitats, ['Cloudreach Falls', 'Forest of Falling Stars']);
  assert.equal(detail.checkedAt, '2026-10-23');
  assert.equal(detail.habitatsCheckedAt, '2026-11-12');
  assert.equal(detail.evolutionPublished, false);
  for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
    const html = read(locale, `dex/${number}`);
    assert(html.includes('2026-11-12'));
    assert(html.includes(`https://wiki.aniimo.com/item/${detail.wikiId}`));
    assert(html.includes('Cloudreach Falls'));
    assert(read(locale, 'guide/aniimo-prismana-event-tracker').includes('data-testid="prismana-summary"'));
  }
}
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
const jaguaraun = details.find(d => d.number === 'wiki-1000-10007');
assert.equal(jaguaraun.checkedAt, '2026-11-09');
assert.equal(jaguaraun.attributes.reduce((sum, a) => sum + a.value, 0), 540);
assert.equal(jaguaraun.evolutionPublished, false);
assert.deepEqual(jaguaraun.habitats, []);
assert.deepEqual(jaguaraun.mobility, []);
assert.equal(jaguaraun.skills.length, 5);
assert(jaguaraun.traits[0].description.includes('consume 3 Energy'));
for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
  const html = read(locale, 'dex/wiki-1000-10007');
  assert(html.includes('https://wiki.aniimo.com/item/10007/basic-form/1000'));
  assert(html.includes('2026-11-09'));
  for (const stale of ['This Basic Form record was checked October 23', '本基础形态记录核验于2026年10月23日', '本基礎形態記錄核驗於2026年10月23日']) assert(!html.includes(stale));
  assert(html.includes('id="reading-notes-title"'));
  assert(html.includes('Fantasy Resonance'));
  assert(read(locale, 'dex').includes(`/${locale}/dex/wiki-1000-10007/`));
  assert(read(locale, 'guide/aniimo-prismana-event-tracker').includes(`/${locale}/dex/wiki-1000-10007/`));
  const home = readFileSync(`out/${locale}/index.html`, 'utf8');
  assert(home.includes(require(`../messages/${locale}.json`).home.latestUpdateTitle.replaceAll('&', '&amp;')));
  assert(home.includes(`/${locale}/dex/wiki-300301-022/`));
  const issues = read(locale, 'guide/aniimo-launch-checklist-known-issues');
  for (const term of ['Whirlbite', 'Marching Flask', 'Training Reset', '100275']) assert(issues.includes(term));
  const egg = read(locale, 'guide/aniimo-egg-heist');
  for (const term of ['Blink Chip', 'Lost Sanctum', 'Supreme Elixir', '100275']) assert(egg.includes(term));
}
assert([...sitemap.matchAll(/<url>(.*?)<\/url>/gs)].some(([, block]) => block.includes('<loc>https://aniimodex.com/en/dex/wiki-1000-10007/</loc>') && block.includes('<lastmod>2026-11-09</lastmod>')));
for (const [officialNumber, name] of targets) {
  const number = name === 'Glameep' ? '089' : `wiki-300301-${officialNumber}`;
  const block = [...sitemap.matchAll(/<url>(.*?)<\/url>/gs)].find(match => match[1].includes(`<loc>https://aniimodex.com/en/dex/${number}/</loc>`))?.[1];
  assert(block?.includes('<lastmod>2026-11-08</lastmod>'));
}
console.log('Event Dex update passed: five identities, collision preservation, dated evidence, missing data, skill groups, localized event links, Royalby navigation and November 2 symptom checks.');
