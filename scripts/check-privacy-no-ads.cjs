const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'out');
assert(fs.existsSync(output), 'Run npm run build before this check.');

let pages = 0;
function checkPages(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) checkPages(file);
    else if (entry.name.endsWith('.html')) {
      const html = fs.readFileSync(file, 'utf8');
      assert(!/pagead2\.googlesyndication\.com|fundingchoicesmessages\.google\.com|google-analytics\.com|googletagmanager\.com/.test(html), `Optional third-party integration in ${file}`);
      assert(!/data-ad-slot=|data-ad-preview/.test(html), `Ad unit or development placeholder in ${file}`);
      pages++;
    }
  }
}
checkPages(output);

for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
  const messages = JSON.parse(fs.readFileSync(path.join(root, 'messages', locale + '.json'), 'utf8'));
  const privacy = messages.legal.privacy;
  assert(privacy.updated.includes('2026'));
  assert.equal(privacy.sections.filter(section => section.id === 'privacy-choices').length, 1);
  const html = fs.readFileSync(path.join(output, locale, 'privacy', 'index.html'), 'utf8');
  assert(html.includes('id="privacy-choices"'));
  assert(html.includes(`href="/${locale}/privacy/#privacy-choices"`));
  assert(html.includes('https://myadcenter.google.com/'));
  assert(html.includes('https://www.cloudflare.com/privacypolicy/'));
  assert(html.includes('https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/'));
  assert(html.includes('mailto:privacy@aniimodex.com'));
  assert(html.includes('google-adsense-account'), 'Keep publisher ownership metadata.');
  for (const section of privacy.sections) {
    for (const link of section.links ?? []) {
      const parsed = new URL(link.href);
      assert(['https:', 'mailto:'].includes(parsed.protocol));
    }
  }
}
console.log(`Privacy/no-ad check passed: ${pages} exported HTML files, three localized policies.`);
