import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (locale, path) => readFileSync(`out/${locale}/${path}/index.html`, 'utf8');
const visible = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');

for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
  const tools = visible(read(locale, 'tools'));
  assert(tools.includes(locale === 'en' ? 'Aniimo Tools: Type Chart, Twine &amp; Catch Calculator' : 'Aniimo 伊莫工具'), `${locale}: weak tools title`);
  for (const path of ['/dex', '/evolutions', '/locations', '/abilities']) {
    assert(tools.includes(`href="/${locale}${path}/"`), `${locale}: tools missing ${path}`);
  }

  const dex = visible(read(locale, 'dex'));
  for (const path of ['/tools/', '/tools/twine/', '/tools/catch/']) {
    assert(dex.includes(`href="/${locale}${path}"`), `${locale}: dex missing ${path}`);
  }

  const crossplay = visible(read(locale, 'guide/aniimo-crossplay-cross-save'));
  for (const slug of ['aniimo-platforms', 'aniimo-multiplayer', 'aniimo-progress-account-safety']) {
    assert(crossplay.includes(`/guide/${slug}/`), `${locale}: crossplay missing ${slug}`);
  }

  const launch = visible(read(locale, 'guide/aniimo-launch-time-preload'));
  assert(launch.includes(locale === 'en' ? 'Historical search status' : locale === 'zh-Hant' ? '歷史搜尋狀態' : '历史搜索状态'), `${locale}: launch page missing historical status`);
}

console.log('Bing recovery checks passed across all three locales.');
