import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const assets = JSON.parse(readFileSync('data/editorial-images.json'));
const dex = JSON.parse(readFileSync('data/dex-images.json'));
const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';
function dimensions(path) {
  const b = readFileSync(path);
  if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    let offset = 12;
    while (offset + 10 < b.length) {
      const type = b.toString('ascii', offset, offset + 4), n = b.readUInt32LE(offset + 4), i = offset + 8;
      if (type === 'VP8 ') return [b.readUInt16LE(i + 6) & 16383, b.readUInt16LE(i + 8) & 16383];
      if (type === 'VP8X') return [1 + b.readUIntLE(i + 4, 3), 1 + b.readUIntLE(i + 7, 3)];
      if (type === 'VP8L') { const v = b.readUInt32LE(i + 1); return [(v & 16383) + 1, ((v >>> 14) & 16383) + 1]; }
      offset += 8 + n + (n % 2);
    }
  }
  if (b.subarray(1, 4).toString() === 'PNG') return [b.readUInt32BE(16), b.readUInt32BE(20)];
  throw new Error(`Unsupported metadata image: ${path}`);
}
for (const [key, a] of Object.entries(assets)) {
  assert.deepEqual(dimensions(`public${a.src}`), [a.width, a.height], `${key}: false intrinsic dimensions`);
  assert(statSync(`public${a.src}`).size < 160000, `${key}: review image compression`);
  for (const k of ['alt', 'caption', 'source', 'rights', 'observedAt']) assert(a[k]?.trim(), `${key}: missing ${k}`);
}
const pages = [];
function walk(dir) { for (const name of readdirSync(dir)) { const p = join(dir, name); if (statSync(p).isDirectory()) walk(p); else if (name.endsWith('.html')) pages.push(p); } }
walk('out');
const remote = new Map(Object.values(dex).map(a => [a.url, a]));
function attrs(tag) { return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m => [m[1], m[2]])); }
const current = JSON.parse(readFileSync('data/current-wiki-snapshot.json')).entries;
const historical = JSON.parse(readFileSync('data/official-wiki-snapshot.json')).entries;
const names = new Set(current.map(e => e.name));
for (const entry of [...current, ...historical.filter(e => !names.has(e.name))]) {
  assert.equal(dex[entry.number]?.url, entry.imageUrl, `${entry.number}: remeasure new or changed Dex image`);
}
let illustrated = 0, dexCount = 0;
for (const path of pages) {
  const html = readFileSync(path, 'utf8');
  const meta = [...html.matchAll(/<meta\s[^>]*>/g)].map(m => attrs(m[0]));
  const values = key => meta.filter(a => a.name === key || a.property === key).map(a => a.content);
  const robots = values('robots').join(',');
  if (robots.includes('index') && !robots.includes('noindex') && /out\/(en|zh-Hans|zh-Hant)\//.test(path)) assert(robots.includes('max-image-preview:large'), `${path}: missing large preview policy`);
  const og = values('og:image');
  const twitter = values('twitter:image');
  if (og.length) {
    assert.deepEqual(twitter, og, `${path}: OG/Twitter disagree`);
    for (const url of og) {
      let size;
      if (url.startsWith(`${site}/`)) {
        const local = `out${new URL(url).pathname}`;
        assert(existsSync(local), `${path}: missing ${url}`);
        size = dimensions(local);
      } else {
        const image = remote.get(url); assert(image, `${path}: unmeasured external representative`);
        size = [image.width, image.height];
      }
      assert.deepEqual([Number(values('og:image:width')[0]), Number(values('og:image:height')[0])], size, `${path}: false OG dimensions`);
    }
  }
  const dom = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  const imgs = [...dom.matchAll(/<img\s[^>]*>/g)].map(m => attrs(m[0]));
  for (const im of imgs) if (im.src?.startsWith('/')) assert(existsSync(`out${im.src}`), `${path}: broken local img ${im.src}`);
  const graphs = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap(m => { const j = JSON.parse(m[1]); return j['@graph'] ?? [j]; });
  const article = graphs.find(g => g['@type'] === 'Article');
  if (article?.image) {
    illustrated++;
    assert.equal(article.image.url, og[0], `${path}: Article/OG mismatch`);
    const src = article.image.url.replace(site, '');
    const body = imgs.find(im => im.src === src);
    assert(body?.alt, `${path}: representative missing from body or missing alt`);
    assert.equal(Number(body.width), article.image.width);
    assert.equal(Number(body.height), article.image.height);
    const record = Object.values(assets).find(a => a.src === src);
    assert(record, `${path}: no provenance`);
    assert.equal(Number(body.width), record.width);
    assert.equal(Number(body.height), record.height);
  }
  const webpage = graphs.find(g => g['@type'] === 'WebPage' && g.primaryImageOfPage);
  if (webpage) {
    dexCount++;
    assert.equal(webpage.primaryImageOfPage.url, og[0], `${path}: Dex schema/OG mismatch`);
    const body = imgs.find(im => im.src === og[0]);
    assert(body?.alt && Number(body.width) === webpage.primaryImageOfPage.width && Number(body.height) === webpage.primaryImageOfPage.height, `${path}: Dex body mismatch`);
  }
}
// Coverage guards catch accidental removal of the integration, not just malformed tags.
const selected = readFileSync('lib/editorial-images.ts', 'utf8').split('guideImageKinds:')[1].split('};')[0].match(/'[^']+':/g).length;
assert.equal(illustrated, selected * 3, 'Expected all selected guide tasks in three locales');
assert.equal(dexCount, Object.keys(dex).length * 3);
for (const p of ['out/404.html', 'out/404/index.html']) if (existsSync(p)) assert(/<meta name="robots" content="noindex/.test(readFileSync(p, 'utf8')), `${p}: preserve noindex`);
assert(readFileSync('out/robots.txt', 'utf8').includes('Allow: /'), 'Do not block image crawling');
console.log(`Editorial image checks passed: ${Object.keys(assets).length} records, ${illustrated} guides, ${dexCount} Dex pages; dimensions, body/schema/social alignment, local resources and preview policy.`);
