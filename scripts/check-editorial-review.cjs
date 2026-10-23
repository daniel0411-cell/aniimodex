const assert = require('node:assert/strict');
const fs = require('node:fs');

for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
  const messages = JSON.parse(fs.readFileSync(`messages/${locale}.json`, 'utf8'));
  const html = (path) => fs.readFileSync(`out/${locale}/${path}/index.html`, 'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  const catchPage = html('tools/catch');
  const firstDisclosure = catchPage.match(/<details\b([^>]*)>/);
  assert(firstDisclosure, `${locale}: missing historical model disclosure`);
  assert(!/\bopen\b/.test(firstDisclosure[1]), `${locale}: historical calculator is expanded by default`);
  assert(catchPage.includes(messages.catchTool.historicalModel));
  assert(catchPage.includes(messages.catchTool.sourceNote));
  assert(catchPage.includes('2026-10-24'));
  for (const result of ['33.6%', '46.2%']) assert(catchPage.includes(result));

  const contact = html('contact');
  for (const email of ['privacy@aniimodex.com', 'copyright@aniimodex.com']) {
    assert(contact.includes(`href="mailto:${email}"`));
  }
  assert(!/(?:editorial|corrections|contact)@aniimodex\.com/.test(contact));
  assert(contact.includes(messages.footer.contact));
  assert(html('guide/aniimo-catching-guide').includes(messages.guide.authorTitle));
  assert(!/guarantee reliability|所有内容均经人工交叉核验与实机验证|所有內容均經人工交叉核驗與實機驗證/.test(html('guide/aniimo-catching-guide')));
}
assert(Math.abs(0.28 * 1.5 * 0.8 * 100 - 33.6) < 1e-10);
assert(Math.abs(0.28 * 1.5 * 1.1 * 100 - 46.2) < 1e-10);
console.log('Editorial review checks passed: historical disclosure, contact links, guide notes and conditional examples in three locales.');
