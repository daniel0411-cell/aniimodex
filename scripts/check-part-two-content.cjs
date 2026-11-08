const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const ts = require('typescript');
const moduleState = { exports: {} };
new Function('module', 'exports', ts.transpileModule(readFileSync('data/prismana-schedule.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText)(moduleState, moduleState.exports);
const { prismanaServers, prismanaWindows, prismanaWindowStatus } = moduleState.exports;
assert.equal(prismanaWindows.length, 5);
assert.deepEqual(prismanaServers.map((item) => item.offset), [8, 0, -4]);
const first = prismanaWindows[0];
for (const server of prismanaServers) {
  const start = Date.parse(`${first.start}T04:00:00Z`) - server.offset * 3600000;
  const end = Date.parse(`${first.end}T04:00:00Z`) - server.offset * 3600000;
  assert.equal(prismanaWindowStatus(first.start, first.end, server.offset, start - 1), 'upcoming');
  assert.equal(prismanaWindowStatus(first.start, first.end, server.offset, start), 'active');
  assert.equal(prismanaWindowStatus(first.start, first.end, server.offset, end - 1), 'active');
  assert.equal(prismanaWindowStatus(first.start, first.end, server.offset, end), 'ended');
  for (let i = 1; i < prismanaWindows.length; i++) assert.equal(prismanaWindows[i - 1].end, prismanaWindows[i].start);
  const last = prismanaWindows.at(-1);
  assert.equal(prismanaWindowStatus(last.start, last.end, server.offset, Date.parse('2026-12-08T00:00:00Z')), 'ended');
}
assert.equal(prismanaWindowStatus(first.start, first.end, 8, NaN), 'unknown');
// Same absolute time must not start all three servers simultaneously.
const apacStart = Date.parse('2026-11-01T20:00:00Z');
assert.deepEqual(prismanaServers.map((server) => prismanaWindowStatus(first.start, first.end, server.offset, apacStart)), ['active', 'upcoming', 'upcoming']);
const read = (locale, path) => readFileSync(`out/${locale}/${path}/index.html`, 'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
  const events = read(locale, 'guide/aniimo-prismana-event-tracker');
  for (const term of ['Pouchwisp', 'Royalby', 'Jeburst', 'Glameep', '2026-11-02', '2026-12-07', 'Student II', 'UTC+8', 'UTC+0', 'UTC-4', '2026-11-01', '687520329382238609', '686395063661496366']) assert(events.includes(term), `${locale}: ${term}`);
  assert(events.includes('data-testid="prismana-schedule"'));
  assert.equal((events.match(/data-status="unknown"/g) ?? []).length, 5);
  assert(!events.includes('No replacement event has been verified here'));
  assert(!events.includes('noindex'));
  const issues = read(locale, 'guide/aniimo-launch-checklist-known-issues');
  for (const term of ['v1.1.3857679.0', 'Waterfall Climb', 'Touch the mysterious mechanism', 'Dewple', 'Gachapus', 'Variable Rate Shading', 'aniimo_support@aniimo.com', '562546073917327130', '2026-11-01', 'Steam Input', 'error107', 'Outpost']) assert(issues.includes(term), `${locale}: missing ${term}`);
  assert(issues.indexOf('Waterfall Climb') < issues.indexOf('Outpost'), `${locale}: current issue must precede historical recovery`);
  assert(!issues.includes('noindex'));
  const twine = read(locale, 'guide/aniimo-twine-explained');
  const homeGuide = read(locale, 'guide/aniimo-rv-homeland-guide');
  const interlink = read(locale, 'guide/aniimo-holo-battle-interlink');
  const coverage = read(locale, 'guide/official-aniimo-dex-status');
  for (const [page, terms] of [
    [twine, ['Hustle', 'Take Off', 'Cloudwalk', 'Floaty Bubble', 'Star Glide', '2026-10-23']],
    [homeGuide, ['Magical Wonder Night', 'Act Seven: Festivals of Astra', 'Moonbeam Wheat', 'Home Coin', 'Wonder Sugar Crystal', 'Magic Pumpkin', 'Memory Lanternfruit', 'Glow Scooter']],
    [interlink, ['Trailblazer I', 'AI', '687520329382238609']],
    [coverage, ['90', '86', '11', 'Royalby', 'S1']],
  ]) {
    for (const term of terms) assert(page.includes(term), `${locale}: missing refreshed answer ${term}`);
    assert(page.includes(page === coverage ? '2026-11-08' : [homeGuide, interlink].includes(page) ? '2026-11-06' : '2026-11-02'));
    assert(!page.includes('noindex'));
    for (const [, href] of page.matchAll(/href="(\/(?:en|zh-Hans|zh-Hant)\/[^"#?]+)"/g)) {
      assert(require('node:fs').existsSync(`out${href}index.html`), `broken refreshed guide link ${href}`);
    }
  }
  for (const term of ['any selected ability', '任意一项', '任意一項']) {
    if (locale === (term === 'any selected ability' ? 'en' : term === '任意一项' ? 'zh-Hans' : 'zh-Hant')) assert(twine.includes(term));
  }
  assert(!twine.includes('Community dex mappings remain under review'));
  assert(homeGuide.indexOf('Magical Wonder Night') < homeGuide.indexOf('1.0.3732728.0'));
  assert(interlink.includes(locale === 'en' ? 'claimed manually' : locale === 'zh-Hans' ? '手动领取' : '手動領取'));
  assert(!interlink.includes('Confirm Trailblazer I is unlocked and the UTC+8 weekly window is open'));
  const home = read(locale, '');
  const messagesForHome = require(`../messages/${locale}.json`);
  assert(home.includes(messagesForHome.home.dataUpdatedDate));
  assert(!/Checked September 14, 2026|2026 年 9 月 14 日核验|2026 年 9 月 14 日核驗/.test(home));
  for (const slug of ['aniimo-version-1-1-update', 'aniimo-egg-heist', 'aniimo-prismana-potential-breeding-guide']) {
    assert(home.indexOf(`href="/${locale}/guide/${slug}/"`) < home.indexOf('href="/' + locale + '/guide/aniimo-release-date/"'), `${locale}: current task hidden below launch navigation`);
  }
  assert(home.includes(messagesForHome.home.latestUpdateTitle));
  const growth = read(locale, 'guide/aniimo-version-1-1-update');
  const harvest = read(locale, 'guide/aniimo-harvest-gathering-farm-guide');
  const branchHeadings = {
    en: ['Start here: which goal is blocked?', 'Start here: entry missing, activity locked or old items gone?', 'Looking for the current Home season?', 'Historical October schedule and crop notice'],
    'zh-Hans': ['先定位：你卡在哪个目标？', '先定位：没有入口、活动锁定，还是旧物品不见了？', '在找当前家园活动？', '10月历史排期与作物公告'],
    'zh-Hant': ['先定位：你卡在哪個目標？', '先定位：沒有入口、活動鎖定，還是舊物品不見了？', '在找目前家園活動？', '10月歷史排期與作物公告'],
  }[locale];
  assert(growth.includes(branchHeadings[0]) && homeGuide.includes(branchHeadings[1]));
  const harvestLink = harvest.indexOf(`href="/${locale}/guide/aniimo-rv-homeland-guide/"`, harvest.indexOf(branchHeadings[2]));
  assert(harvestLink > 0 && harvestLink < harvest.lastIndexOf(branchHeadings[3]), `${locale}: current Home link must precede historical schedule`);
  for (const page of [growth, homeGuide, harvest]) {
    assert(page.includes('687520329382238609'));
    assert(page.includes(page === homeGuide ? '2026-11-06' : '2026-11-03'));
  }
  for (const slug of ['aniimo-version-1-1-update', 'aniimo-rv-homeland-guide', 'aniimo-harvest-gathering-farm-guide']) {
    const raw = readFileSync(`out/${locale}/guide/${slug}/index.html`, 'utf8');
    const article = [...raw.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .flatMap(match => JSON.parse(match[1])['@graph'] ?? []).find(item => item['@type'] === 'Article');
    assert.equal(article?.dateModified, slug === 'aniimo-rv-homeland-guide' ? '2026-11-06' : '2026-11-03');
  }
  const egg = read(locale, 'guide/aniimo-egg-heist');
  const items = read(locale, 'guide/aniimo-prismana-potential-breeding-guide');
  const forms = read(locale, 'guide/aniimo-forms-explained');
  for (const [page, terms] of [
    [growth, ['Crescent Bay', 'Rosy Mirelands', 'Wildwater Gorge', 'Cloudreach Falls', 'A Tale of Tide and Song', 'Trailblazer II', 'Trailblazer III', 'Potential Reset Card', 'Stellar Tier 6']],
    [egg, ['Rising Egg Scout', 'Giga-Egg', 'Twine', '100%', 'Elite Egg Seeker Tier IV', 'Chaos Ticket', 'Umbral Bubbeep', 'Umbral Baleetle', 'Inventory Warehouse', 'Erlath']],
    [items, ['Hue Swap', 'Credits', 'Sparkling Pigment', 'Sparkling Sigil', 'Acquired Potential', 'Irisalis', 'Helion', 'Lunara', 'Season Tag', 'Sparkling Original']],
    [forms, ['Hue Swap', 'Sparkling Original', 'Giga-Egg']],
  ]) {
    for (const term of terms) assert(page.includes(term), `${locale}: missing decision fact ${term}`);
    assert(page.includes('687520329382238609'), `${locale}: missing Part Two evidence`);
    assert(!page.includes('noindex'));
  }
  assert(egg.indexOf('Giga-Egg') < egg.indexOf('Erlath'), `${locale}: current mode before historical advice`);
  for (const page of [growth, egg, items, forms]) {
    for (const [, href] of page.matchAll(/href="(\/(?:en|zh-Hans|zh-Hant)\/[^"#?]+)"/g)) {
      assert(require('node:fs').existsSync(`out${href}index.html`), `broken decision link ${href}`);
    }
  }
  for (const page of [events, issues]) {
    for (const [, target] of page.matchAll(/href="#([^"]+)"/g)) assert(page.includes(`id="${target}"`));
    for (const slug of ['aniimo-prismana-event-tracker', 'aniimo-launch-checklist-known-issues']) {
      assert(read(locale, 'guide').includes(slug));
    }
  }
  const messages = require(`../messages/${locale}.json`);
  const dex = read(locale, 'dex');
  assert(dex.includes(messages.dex.title));
  assert(dex.includes('2026') && dex.includes('86') && dex.includes('90') && dex.includes('Royalby'));
  assert(!dex.includes('All 86 Creatures'));
  assert(!messages.tools.browseDex.includes('all') && !messages.tools.browseDex.includes('全部'));
  assert(read(locale, 'dex/001').includes('S1'));
}
console.log('S1 Part 2 checks passed: server offsets, time boundaries, current fixes, linked sources, scope and three-locale output.');
