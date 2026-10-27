const assert = require('node:assert/strict');
const { readFileSync, existsSync, readdirSync } = require('node:fs');
const ts = require('typescript');
const moduleState = { exports: {} };
new Function(
  'module',
  'exports',
  ts.transpileModule(readFileSync('data/wiki-current-index.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText
)(moduleState, moduleState.exports);
const { getCurrentWikiEntry, currentWikiIndex } = moduleState.exports;
assert.equal(currentWikiIndex.length, 86);
assert.equal(new Set(currentWikiIndex.map(([number]) => number)).size, 86);
assert.equal(new Set(currentWikiIndex.map(([, name]) => name)).size, 86);
assert.equal(getCurrentWikiEntry('Iris').number, '011');
assert.equal(getCurrentWikiEntry('Helmut').number, '061');
assert.equal(getCurrentWikiEntry('Dazmand').number, '10002');
assert.equal(getCurrentWikiEntry('Somniwing'), undefined);

const redirects = readFileSync('out/_redirects', 'utf8')
  .split('\n')
  .filter((s) => s && !s.startsWith('#'))
  .map((s) => s.trim().split(/\s+/));
const sitemap = readFileSync('out/sitemap.xml', 'utf8');
const merged = {
  'aniimo-ps5': 'aniimo-platforms',
  'aniimo-nintendo-switch': 'aniimo-platforms',
  'aniimo-launch-time-preload': 'aniimo-release-date',
  'aniimo-face-data-import': 'getting-started',
  'aniimo-currencies-and-shops': 'is-aniimo-free-to-play',
  'aniimo-controller-steam-deck-optimization': 'aniimo-language-controller-support',
};
for (const [old, destination] of Object.entries(merged)) {
  for (const slash of ['', '/']) assert(redirects.some(([from, to, status]) =>
    from === `/guide/${old}${slash}` && to === `/en/guide/${destination}/` && status === '301'
  ), `Missing unlocalized redirect: ${old}${slash}`);
}
for (const path of readdirSync('out', { recursive: true }).filter((path) => path.endsWith('.html'))) {
  const html = readFileSync(`out/${path}`, 'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  for (const old of Object.keys(merged)) assert(!new RegExp(`href="/[^" ]*/guide/${old}/?"`).test(html), `${path}: internal link still uses retired guide ${old}`);
}
for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
  const read = (path) =>
    readFileSync(`out/${locale}/${path}/index.html`, 'utf8').replace(
      /<script\b[^>]*>[\s\S]*?<\/script>/g,
      ''
    );
  for (const [old, destination] of Object.entries(merged)) {
    assert(
      !existsSync(`out/${locale}/guide/${old}/index.html`),
      `${locale}: retired article still generated`
    );
    assert(!sitemap.includes(`/${locale}/guide/${old}/`));
    for (const slash of ['', '/'])
      assert(
        redirects.some(
          ([from, to, status]) =>
            from === `/${locale}/guide/${old}${slash}` &&
            to === `/${locale}/guide/${destination}/` &&
            status === '301'
        )
      );
  }
  for (const slug of ['aniimo-platforms', 'how-to-download-aniimo']) {
    const html = read(`guide/${slug}`);
    for (const href of [
      'https://www.aniimo.com/',
      'https://store.steampowered.com/app/4126040/Aniimo/',
      'https://play.google.com/store/apps/details?id=com.x.aniimos',
    ])
      assert(html.includes(`href="${href}"`));
    assert(html.includes('2026-10-23'));
  }
  const release = read('guide/aniimo-release-date');
  assert(read('guide/getting-started').includes('Import/Share/Preset'));
  const spending = read('guide/is-aniimo-free-to-play');
  for (const term of ['100 Glimmers', 'Harvest Moon Points', '99%']) assert(spending.includes(term));
  const headingZero = spending.indexOf('id="section-0"');
  assert(headingZero >= 0 && headingZero < spending.indexOf('100 Glimmers'), 'Answer the price question before historical rewards');
  const controller = read('guide/aniimo-language-controller-support');
  for (const term of ['Steam Input', 'Proton 10.0.0-4', '40/45 FPS']) assert(controller.includes(term));
  for (const slug of ['getting-started', 'is-aniimo-free-to-play', 'aniimo-language-controller-support', 'aniimo-harvest-gathering-farm-guide']) {
    assert(read(`guide/${slug}`).includes('2026-10-27'), `${locale}/${slug}: missing substantive update date`);
  }
  const home = read('');
  assert(home.includes(locale === 'en' ? 'Patch archive: October 15' : locale === 'zh-Hant' ? '歷史補丁：10 月 15 日' : '历史补丁：10 月 15 日'));
  assert(release.includes('2026-09-15 19:00'));
  assert(!release.includes('wait for the listed mobile release'));
  const dex = read('dex/062');
  assert(
    dex.includes('https://wiki.aniimo.com/item/061/basic-form'),
    'Name mapping must not use the legacy number'
  );
  assert(dex.includes('2026-10-23'));
  assert(read('dex/092').includes('2026-08-30'), 'Archived entry must retain its historical date');
  for (const slug of ['aniimo-roles-explained', 'aniimo-evolution-system'])
    assert(read(`guide/${slug}`).includes('10') && read(`guide/${slug}`).includes('23'));
}
console.log(
  'Guide consolidation checks passed: retired output/sitemap, permanent redirects, official actions, release conversions and Wiki identity mapping.'
);
