const assert = require('node:assert/strict');
const { readFileSync, existsSync } = require('node:fs');
const ts = require('typescript');
function load(path) {
  const state = { exports: {} };
  new Function('module', 'exports', ts.transpileModule(readFileSync(path, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText)(state, state.exports);
  return state.exports;
}
const { getPublishedGuidePosts } = load('data/guides.ts');
const { sourceById } = load('data/sources.ts');
const { calculateCatchRate } = load('data/catch-formula.ts');
const read = (locale, slug) => readFileSync(`out/${locale}/guide/${slug}/index.html`, 'utf8')
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
const posts = getPublishedGuidePosts();
const snapshotEntries = require('../data/current-wiki-snapshot.json').entries;
const snapshotDetails = require('../data/current-wiki-details.json').details;
const sitemap = readFileSync('out/sitemap.xml', 'utf8');
for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
  const messages = JSON.parse(readFileSync(`messages/${locale}.json`, 'utf8'));
  for (const post of posts) {
    assert(!post.sourceIds.includes('aniimo-official-probabilities-2026-09-16'), `${post.slug}: historical catch source reused`);
    const html = read(locale, post.slug);
    assert(!/BREAK state adds a x1\.5|break catch bonus reaches x3/.test(html), `${locale}/${post.slug}: obsolete capture coefficient`);
    for (const id of post.sourceIds) {
      const source = sourceById.get(id);
      assert(source, id);
      assert(html.includes(`href="${source.url.replaceAll('&', '&amp;')}"`), `${locale}/${post.slug}: missing source`);
      assert(html.includes(messages.guide.sourceChecked.replace('{date}', source.accessedAt)), `${locale}/${post.slug}: missing per-source date`);
      assert(!html.includes(source.evidence), `${locale}/${post.slug}: repeated registry evidence`);
    }
  }
  for (const slug of ['getting-started', 'aniimo-catching-guide']) {
    const html = read(locale, slug);
    const guide = messages.guide.posts[slug];
    assert(html.includes(guide.title));
    assert(html.includes('2026-10-27'));
    assert(!html.includes('noindex'));
    for (const block of guide.body.filter((b) => b.t === 'link')) {
      assert(block.href.startsWith('/') && !block.href.startsWith('//'));
      assert(existsSync(`out/${locale}${block.href}/index.html`), block.href);
      assert(html.includes(`href="/${locale}${block.href}/"`), `${locale}/${slug}: missing task link ${block.href}`);
    }
  }
  const beginner = read(locale, 'getting-started');
  assert(!beginner.includes('/images/guides/getting-started.jpg'));
  assert.equal(messages.guide.posts['getting-started'].body.filter((b) => b.t === 'h').length, 5);
  for (const href of ['/abilities/', '/dex/', '/evolutions/', '/guide/how-to-download-aniimo/', '/guide/aniimo-progress-account-safety/']) {
    assert(beginner.includes(`href="/${locale}${href}"`));
  }
  const catching = read(locale, 'aniimo-catching-guide');
  assert(catching.includes('role="region"') && catching.includes('tabindex="0"'));
  for (const term of ['42%', '63%', '33.6%', '46.2%', '9%', '12.6']) assert(catching.includes(term));
  assert(catching.indexOf('id="section-0"') < catching.indexOf('Cannot catch the Alpha in the current state'));
  assert(!/defeated targets|BREAK at ×1.5|ordinary sleep.*×2|目标死亡时|目標死亡時|普通睡眠.*×2/.test(catching));
  const team = read(locale, 'aniimo-team-composition');
  for (const role of ['DPS', 'Break', 'Support', 'Regen', 'Heal']) {
    const count = snapshotEntries.filter(entry => entry.role === role).length;
    assert(new RegExp(`<td[^>]*>${role}</td>\\s*<td[^>]*>${count}</td>`).test(team), `${locale}: stale role count ${role}`);
  }
  for (const element of ['Light', 'Fire', 'Ice', 'Dark', 'Lightning', 'Grass', 'Water', 'Earth', 'Wind']) {
    const count = snapshotEntries.filter(entry => entry.elements.includes(element)).length;
    assert(new RegExp(`<td[^>]*>${element}</td>\\s*<td[^>]*>${count}</td>`).test(team), `${locale}: stale element count ${element}`);
  }
  const abilities = readFileSync(`out/${locale}/abilities/index.html`, 'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  for (const [field, key] of [['traits', 'traitsDescription'], ['skills', 'skillsDescription']]) {
    const count = new Set(snapshotDetails.flatMap(detail => detail[field].map(skill => skill.name))).size;
    assert(abilities.includes(messages.collections.abilities[key].replace('{count}', count)), `${locale}: inconsistent directory count`);
  }
  for (const path of ['', 'tools/team-builder/', 'abilities/', 'guide/how-we-verify/']) {
    const block = sitemap.split('<url>').find(block => block.includes(`<loc>https://aniimodex.com/${locale}/${path}</loc>`));
    assert(block?.includes('<lastmod>2026-11-02</lastmod>'), `${locale}/${path}: edit date overridden`);
  }
  const multiplayer = read(locale, 'aniimo-multiplayer');
  for (const term of ['Rising Egg Scout', 'Chaos Ticket', 'Holo-Battle', 'Trailblazer I']) assert(multiplayer.includes(term));
  const requirements = read(locale, 'aniimo-system-requirements');
  for (const term of ['30 GB', '40 GB', '2026-09-16', '2026-10-23']) assert(requirements.includes(term));
  for (const slug of ['aniimo-mobile', 'aniimo-progress-account-safety', 'aniimo-dev-dispatch-roadmap']) {
    assert(!/Last official-source check: October 4|官方[来來]源最后核[验驗]：2026 年 10 月 4 日|官方來源最後核驗：2026 年 10 月 4 日/.test(read(locale, slug)), `${locale}/${slug}: historical date presented as page check`);
  }
}
const input = { scenario: 'field', regionId: 'standard', targetStage: 3, useRegionRate: true,
  playerLevel: 1, aniimoLevel: 1, playerBonus: 0, cubeId: 'advanced', hpPercent: 100,
  backstrike: false, statusMode: 'none', eligible: true };
for (const [change, expected] of [[{}, .42], [{ backstrike: true }, .63],
  [{ scenario: 'battle' }, .336], [{ scenario: 'battle', hpPercent: 50 }, .462],
  [{ scenario: 'boss' }, .09]]) {
  assert(Math.abs(calculateCatchRate({ ...input, ...change }).finalRate - expected) < 1e-10);
}
assert(Math.abs((.462 - .336) * 100 - 12.6) < 1e-10);
assert(sourceById.get('aniimo-official-probabilities-2026-09-16').title.includes('historical'));
console.log('Guide task checks passed: three-locale actions, source dates, current references and calculator-parity examples.');
