const assert = require('node:assert/strict');
const {readFileSync, existsSync} = require('node:fs');
const slugs = ['aniimo-launch-checklist-known-issues', 'aniimo-crossplay-cross-save', 'aniimo-progress-account-safety', 'aniimo-dev-dispatch-roadmap', 'aniimo-prismana-event-tracker', 'aniimo-rv-homeland-guide', 'aniimo-egg-heist', 'aniimo-holo-battle-interlink'];
const patch = '1848664643339992';
for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
  const read = slug => readFileSync(`out/${locale}/guide/${slug}/index.html`, 'utf8');
  const text = slug => read(slug).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  for (const slug of slugs) {
    const html = read(slug);
    const article = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .flatMap(match => JSON.parse(match[1])['@graph'] ?? []).find(item => item['@type'] === 'Article');
    const updated = ['aniimo-launch-checklist-known-issues', 'aniimo-prismana-event-tracker'].includes(slug) ? '2026-11-13' : ['aniimo-egg-heist', 'aniimo-rv-homeland-guide', 'aniimo-holo-battle-interlink'].includes(slug) ? '2026-11-12' : '2026-11-06';
    assert.equal(article?.dateModified, updated, `${locale}/${slug} stale modified date`);
    if (slug !== 'aniimo-prismana-event-tracker') assert(text(slug).includes(patch), `${slug}: missing patch citation`);
    for (const [, href] of text(slug).matchAll(/href="(\/(?:en|zh-Hans|zh-Hant)\/[^"#?]+)"/g)) assert(existsSync(`out${href}index.html`), `broken link ${href}`);
  }
  const issues = text(slugs[0]);
  for (const term of ['v1.1.3880756.0', 'PS5', 'Storage Box', 'Holo Training Ace', 'Windchaser Stamps', 'Gravity Pull', 'Bloom', 'Branch', 'Hydro Roll', 'v1.1.3857679.0']) assert(issues.includes(term));
  assert(issues.indexOf(patch) < issues.indexOf('686395063661496366'), 'new patch must precede October fix citation');
  for (const slug of slugs.slice(1,4)) {
    const account = text(slug);
    for (const term of ['Epic', 'Settings &gt; Account Settings', 'UID', 'PSN', 'Xbox']) assert(account.includes(term), `${locale}/${slug}: ${term}`);
    assert(account.indexOf('Settings &gt; Account Settings') < account.indexOf('Quick Support Links'), 'current unlink must precede historical relink');
    assert(!account.includes('Do not self-unlink, overwrite a character or create replacement progress first.'));
  }
  const events = text(slugs[4]);
  for (const term of ['Glamour Star', '2026-11-13', '2026-11-20', '2026-11-27', '2026-12-04', '2026-12-11', '2026-11-12', '2026-11-16', '2026-11-23', '2026-11-30', 'UTC+8', 'UTC+0', 'UTC-4', 'Dazzling Sparkling', 'Shadow Sparkling', 'Student II']) assert(events.includes(term), `${locale}: ${term}`);
  assert(events.includes('data-testid="prismana-schedule"'));
  const homes = text(slugs[5]);
  for (const term of ['Season Recipes', 'v1.1.3880756.0', 'Act Seven: Festivals of Astra', 'Home Coin']) assert(homes.includes(term));
  assert(text(slugs[6]).includes('v1.1.3880756.0'));
  assert(text(slugs[7]).includes('Holo Training Ace'));
  assert(text(slugs[7]).includes('100298'));
}
console.log('November content checks passed: current before historical, linked evidence, eight modified guides, three-language schedules and stable internal routes.');
