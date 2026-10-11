import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const readPage = (locale, slug = '') => readFileSync(
  new URL(`../out/${locale}/${slug ? `guide/${slug}/` : ''}index.html`, import.meta.url),
  'utf8'
);
const visible = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');

for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
  const issues = visible(readPage(locale, 'aniimo-launch-checklist-known-issues'));
  assert.ok(issues.includes('<article class="min-w-0">'), `${locale}: tables must not widen the article grid`);
  for (const term of ['Steam Input', 'F10', 'error107', '1.0.3551601.0', 'Player.log']) {
    assert.ok(issues.includes(term), `${locale}: missing FAQ instruction ${term}`);
  }
  assert.ok(issues.includes('563668168527106976'), `${locale}: missing official FAQ source`);

  const controller = visible(readPage(locale, 'aniimo-language-controller-support'));
  assert.ok(controller.includes('Proton 10.0.0-4'), `${locale}: missing community workaround`);
  assert.ok(controller.includes(locale === 'en' ? 'planned' : '計畫') || controller.includes('计划'), `${locale}: Deck plan must not be presented as complete`);

  const account = visible(readPage(locale, 'aniimo-progress-account-safety'));
  assert.ok(account.includes('Aniimo Beta Test Reward Steam Account Linking Survey'), `${locale}: distinguish beta linking survey`);
  assert.ok(account.includes('aniimo_support@aniimo.com'), `${locale}: missing support contact`);

  const forms = visible(readPage(locale, 'aniimo-forms-explained'));
  assert.ok(forms.includes('Prismana Hue'), `${locale}: missing announced Hue plan`);
  assert.ok(forms.includes('aniimo-dev-dispatch-roadmap'), `${locale}: missing roadmap link`);

  const events = visible(readPage(locale, 'aniimo-prismana-event-tracker'));
  assert.ok(events.includes('Journey Chronicles'), `${locale}: missing login event`);
  assert.ok(events.includes(locale === 'en' ? 'Ended: Sep 28' : locale === 'zh-Hans' ? '已结束：9/28' : '已結束：9/28'), `${locale}: Melloblum must be ended`);
  assert.ok(!events.includes('Current: Sep 28') && !events.includes('下一期：10/5'), `${locale}: stale event label`);

  const home = visible(readPage(locale));
  for (const slug of ['aniimo-prismana-event-tracker', 'aniimo-language-controller-support', 'aniimo-progress-account-safety']) {
    assert.ok(home.includes(`/guide/${slug}`), `${locale}: missing home task link ${slug}`);
  }
}
console.log('Support content checks passed across all three locales.');
