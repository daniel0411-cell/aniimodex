import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const slugs = ['aniimo-egg-heist', 'aniimo-choose-by-mobility-role', 'aniimo-dev-dispatch-roadmap', 'aniimo-launch-checklist-known-issues'];
for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
  for (const slug of slugs) {
    const html = readFileSync(`out/${locale}/guide/${slug}/index.html`, 'utf8');
    assert(html.includes('Dev Feedback | Oct 13'), `${locale}/${slug}: missing dated feedback`);
    assert(html.includes('1846018067943039'), `${locale}/${slug}: missing source link`);
    assert(html.includes('2026-10-13'), `${locale}/${slug}: missing update date`);
    if (['aniimo-choose-by-mobility-role', 'aniimo-dev-dispatch-roadmap'].includes(slug)) {
      assert(html.includes('BREAK'), `${locale}/${slug}: missing damage safeguard explanation`);
    }
  }
  const home = readFileSync(`out/${locale}/index.html`, 'utf8');
  assert(home.includes('guide/aniimo-egg-heist'), `${locale}: missing home task entry`);
  const events = readFileSync(`out/${locale}/guide/aniimo-prismana-event-tracker/index.html`, 'utf8');
  assert(events.includes(locale === 'en' ? 'windows have both ended' : locale === 'zh-Hant' ? '公告窗口均已結束' : '公告窗口均已结束'), `${locale}: stale event lead`);
}
console.log('October feedback checks passed for all three locales.');
