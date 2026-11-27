import { test } from 'node:test';
import assert from 'node:assert/strict';
import { enrichSitemap } from './enrich-image-sitemap.mjs';

test('preserves sitemap records and only adds registered canonical indexable body images', () => {
  const site = 'https://aniimodex.com';
  const paths = ['good', 'noindex', 'wrong-canonical', 'unregistered', 'metadata-only'];
  const xml = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(p => `<url><loc>${site}/en/guide/${p}/</loc><lastmod>2026-01-01</lastmod></url>`).join('')}</urlset>`;
  const assets = { a: { src: '/images/a&b.webp' } };
  const readPage = p => {
    const name = p.split('/')[3];
    const canonical = name === 'wrong-canonical' ? '/other/' : p;
    const robots = name === 'noindex' ? 'noindex' : 'index';
    const body = name === 'metadata-only' ? '' : name === 'unregistered'
      ? '<img src="/images/other.webp"/><img src="https://cdn.example/a.webp"/>'
      : '<img src="/images/a&amp;b.webp"/><img src="/images/a&amp;b.webp"/>';
    return `<link rel="canonical" href="${site}${canonical}"/><meta name="robots" content="${robots}"/><meta property="og:image" content="${site}/images/a&amp;b.webp"/>${body}`;
  };
  const result = enrichSitemap(xml, assets, readPage);
  assert.equal(result.count, 1);
  assert.equal((result.xml.match(/<image:loc>/g) ?? []).length, 1);
  assert(result.xml.includes('a&amp;b.webp'));
  assert.equal((result.xml.match(/<lastmod>2026-01-01/g) ?? []).length, 5);
  assert.equal(enrichSitemap(result.xml, assets, readPage).xml, result.xml, 'idempotent export');
  const removed = enrichSitemap(result.xml, assets, p => `<link rel="canonical" href="${site}${p}"/><meta name="robots" content="noindex"/>`);
  assert.equal(removed.count, 0);
  assert(!removed.xml.includes('<image:loc>'), 'remove stale image entries after index exclusion');
});
