import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { enrichSitemap } from './enrich-image-sitemap.mjs';

// Prevent edited diagram text or output assets from silently drifting apart.
const diagramManifest = JSON.parse(readFileSync('assets/editorial-diagrams/manifest.json'));
const sha256 = p => createHash('sha256').update(readFileSync(p)).digest('hex');
assert.equal(sha256('assets/editorial-diagrams/content.json'), diagramManifest.contentSha256, 'Regenerate diagrams after editing their content');
for (const [file, hash] of Object.entries(diagramManifest.files)) assert.equal(sha256(file), hash, `Regenerate/review changed diagram: ${file}`);

const taskVisualManifest = JSON.parse(readFileSync('assets/task-visuals/manifest.json'));
assert.equal(sha256('assets/task-visuals/content.json'), taskVisualManifest.contentSha256, 'Regenerate/review task visuals after content or placement changes');
assert.equal(sha256('scripts/render-task-visuals.cjs'), taskVisualManifest.rendererSha256, 'Regenerate/review task visuals after renderer changes');
for (const [file, hash] of Object.entries(taskVisualManifest.files)) assert.equal(sha256(file), hash, `Task visual output drift: ${file}`);
const taskVisuals = JSON.parse(readFileSync('assets/task-visuals/content.json'));
assert.equal(new Set(taskVisuals.map(row => row.slug)).size, 19, 'Review the complete 19-task batch');

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
  assert(['body-only', 'representative'].includes(a.previewUsage), `${key}: missing preview decision`);
  for (const k of ['alt', 'caption', 'source', 'rights', 'observedAt', 'previewReason']) assert(a[k]?.trim(), `${key}: missing ${k}`);
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
  if (/out\/(en|zh-Hans|zh-Hant)\/(evolutions|locations|abilities|elements\/[^/]+)\/index.html$/.test(path)) {
    assert.equal(values('og:description')[0], values('description')[0], `${path}: inherited unrelated collection description`);
    assert(values('og:title')[0] && html.match(/<title>(.*?)<\/title>/)?.[1].startsWith(values('og:title')[0]), `${path}: unrelated collection share title`);
  }
  const og = values('og:image');
  for (const a of Object.values(assets).filter(a => a.previewUsage === 'body-only')) assert(!og.includes(`${site}${a.src}`), `${path}: body-only image claimed as preferred preview`);
  const twitter = values('twitter:image');
  assert.deepEqual(twitter, og, `${path}: OG/Twitter disagree`);
  if (og.length) {
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
  const app = graphs.find(g => g['@type'] === 'WebApplication' && g.screenshot);
  if (app) {
    // A truthful application screenshot describes the interface; it need not
    // also be promoted as a preferred preview.
    if (app.image) assert.equal(app.image.url, og[0], `${path}: application image/OG mismatch`);
    assert(imgs.some(im => `${site}${im.src}` === app.screenshot.url), `${path}: missing visible screenshot`);
  }
  const webpage = graphs.find(g => g['@type'] === 'WebPage' && g.primaryImageOfPage);
  if (webpage) {
    dexCount++;
    assert.equal(webpage.primaryImageOfPage.url, og[0], `${path}: Dex schema/OG mismatch`);
    const body = imgs.find(im => im.src === og[0]);
    assert(body?.alt && Number(body.width) === webpage.primaryImageOfPage.width && Number(body.height) === webpage.primaryImageOfPage.height, `${path}: Dex body mismatch`);
  }
}
// Selected task previews must be truthful links to the same article representative.
for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
  const hub = readFileSync(`out/${locale}/guide/index.html`, 'utf8');
  const previews = [...hub.matchAll(/<img\s[^>]*data-guide-preview[^>]*>/g)].map(m => attrs(m[0]));
  // Zero is valid when none of this hub's tasks have an eligible preview.
  for (const preview of previews) {
    const guide = readFileSync(`out/${locale}/guide/${preview['data-guide-preview']}/index.html`, 'utf8');
    assert(guide.includes(`property="og:image" content="${site}${preview.src}"`), `${locale}: hub/article image mismatch`);
  }
  const team = readFileSync(`out/${locale}/tools/team-builder/index.html`, 'utf8');
  assert(!team.includes('property="og:image"'), `${locale}: Team Builder text-led screenshot is body-only`);
  assert(team.includes(`data-editorial-image="${assets[`team-${locale}`].src}"`), `${locale}: missing Team Builder reading example`);
}
// Coverage guards catch accidental removal of the integration, not just malformed tags.
const mapping = [...readFileSync('lib/editorial-images.ts', 'utf8').split('guideImageKinds:')[1].split('};')[0].matchAll(/'([^']+)': '([^']+)'/g)];
let expectedPreviews = 0;
for (const [, slug, kind] of mapping) for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
  const a = assets[`${kind}-${locale}`];
  const html = readFileSync(`out/${locale}/guide/${slug}/index.html`, 'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  assert(html.includes(`src="${a.src}"`), `${slug}/${locale}: lost useful body illustration`);
  if (a.previewUsage === 'representative') {
    expectedPreviews++;
    assert(html.includes(`property="og:image" content="${site}${a.src}"`), `${slug}/${locale}: wrong preferred asset`);
  }
}
// A moved or removed answer must trigger an editorial placement review.
const escapeHTML = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;');
for (const task of taskVisuals) for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
  const a = assets[`${task.kind}-${locale}`];
  const html = readFileSync(`out/${locale}/guide/${task.slug}/index.html`, 'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  const figure = html.indexOf(`data-editorial-image="${a.src}"`);
  assert(figure >= 0, `${task.slug}/${locale}: missing task figure`);
  const heading = task.afterHeading?.[locale];
  if (heading) {
    const heads = [...html.matchAll(/<h2\b[^>]*>(.*?)<\/h2>/gs)];
    const target = heads.find(h => h[1] === escapeHTML(heading));
    assert(target && target.index < figure, `${task.slug}/${locale}: figure precedes its HTML explanation`);
    const next = heads.find(h => h.index > target.index);
    assert(!next || figure < next.index, `${task.slug}/${locale}: figure detached from corresponding section`);
  }
  assert.equal(a.previewUsage, 'body-only', 'Re-review labelled diagrams before changing preview eligibility');
}
assert.equal(illustrated, expectedPreviews, 'Selected preferred guide previews in all locales');
assert.equal(dexCount, Object.keys(dex).length * 3);
for (const p of ['out/404.html', 'out/404/index.html']) if (existsSync(p)) assert(/<meta name="robots" content="noindex/.test(readFileSync(p, 'utf8')), `${p}: preserve noindex`);
assert(readFileSync('out/robots.txt', 'utf8').includes('Allow: /'), 'Do not block image crawling');
console.log(`Editorial image checks passed: ${Object.keys(assets).length} records, ${illustrated} guides, ${dexCount} Dex pages; dimensions, body/schema/social alignment, local resources and preview policy.`);

const sitemap = readFileSync('out/sitemap.xml', 'utf8');
const enriched = enrichSitemap(sitemap, assets, p => readFileSync(`out${p}index.html`, 'utf8'), site);
assert.equal(enriched.xml, sitemap, 'Image sitemap missing, stale, or includes images not present in canonical body');
assert(enriched.count > 0, 'Missing image discovery coverage');
console.log(`Image sitemap checked: ${enriched.count} canonical existing URLs with registered body images.`);
