import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const ns = 'http://www.google.com/schemas/sitemap-image/1.1';
const escapeXml = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
const decodeXml = s => s.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m => [m[1], decodeXml(m[2])]));

// Only enrich existing approved URLs with registered first-party images in body HTML.
// This discovers reading aids too; it makes no preferred-preview claim.
export function enrichSitemap(xml, assets, readPage, site = 'https://aniimodex.com') {
  let count = 0;
  const registered = new Set(Object.values(assets).map(a => a.src));
  const clean = xml.replace(/\s*<image:image>[\s\S]*?<\/image:image>/g, '').replace(/ xmlns:image="[^"]*"/g, '').replace(/\s*<\/url>/g, '</url>');
  const result = clean.replace('<urlset ', `<urlset xmlns:image="${ns}" `).replace(/<url>[\s\S]*?<\/url>/g, block => {
    const loc = decodeXml(block.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '');
    const url = new URL(loc);
    if (url.origin !== site || !/^\/(en|zh-Hans|zh-Hant)\/(guide\/[^/]+|tools\/team-builder)\/$/.test(url.pathname)) return block;
    const html = readPage(url.pathname);
    const tags = [...html.matchAll(/<(?:meta|link)\s[^>]*>/g)].map(m => attributes(m[0]));
    if (tags.some(t => ['robots', 'googlebot'].includes(t.name) && /noindex|none/i.test(t.content ?? ''))) return block;
    if (!tags.some(t => t.rel === 'canonical' && t.href === loc)) return block;
    const body = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
    const images = [...new Set([...body.matchAll(/<img\s[^>]*>/g)].map(m => attributes(m[0]).src).filter(src => registered.has(src) && src.startsWith('/images/') && !src.includes('..')))];
    if (images.length) count++;
    return block.replace('</url>', (images.length ? '\n' : '') + images.map(src => `<image:image><image:loc>${escapeXml(`${site}${src}`)}</image:loc></image:image>`).join('\n') + '</url>');
  });
  // Non-image content, URL membership, alternates and dates are unchanged.
  assert.equal(result.replace(/ xmlns:image="[^"]*"/g, '').replace(/\s*<image:image>[\s\S]*?<\/image:image>/g, '').replace(/\s+/g, ''), clean.replace(/\s+/g, ''));
  return { xml: result, count };
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const path = 'out/sitemap.xml';
  const assets = JSON.parse(readFileSync('data/editorial-images.json'));
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com';
  const result = enrichSitemap(readFileSync(path, 'utf8'), assets, p => readFileSync(`out${p}index.html`, 'utf8'), site);
  writeFileSync(path, result.xml);
  console.log(`Image sitemap: ${result.count} existing URLs enriched; URL membership and dates preserved.`);
}
