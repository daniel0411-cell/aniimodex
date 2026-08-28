import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = new URL('../out/', import.meta.url).pathname;
const pages = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (
      name === 'index.html' &&
      path !== join(outDir, 'index.html') &&
      path !== join(outDir, '404', 'index.html')
    ) {
      pages.push(path);
    }
  }
}

walk(outDir);

const errors = [];
const canonicals = new Set();
const sitemap = readFileSync(join(outDir, 'sitemap.xml'), 'utf8');
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]));
const pageCanonicals = new Set();

for (const path of pages) {
  const html = readFileSync(path, 'utf8');
  const get = (pattern) => html.match(pattern)?.[1];
  const title = get(/<title>(.*?)<\/title>/s);
  const description = get(/<meta name="description" content="([^"]*)"/);
  const canonical = get(/<link rel="canonical" href="([^"]*)"/);
  const noindex = /<meta name="robots" content="noindex, follow"/.test(html);
  const h1Count = (html.match(/<h1\b/g) ?? []).length;
  const hreflangCount = (html.match(/<link rel="alternate" hrefLang=/g) ?? []).length;

  if (!title) errors.push(`${path}: missing title`);
  if (!description) errors.push(`${path}: missing description`);
  if (!canonical) errors.push(`${path}: missing canonical`);
  if (h1Count !== 1) errors.push(`${path}: expected 1 h1, found ${h1Count}`);
  if (hreflangCount !== 4) errors.push(`${path}: expected 4 hreflang links, found ${hreflangCount}`);
  if (canonical && canonicals.has(canonical)) errors.push(`${path}: duplicate canonical ${canonical}`);
  if (canonical) canonicals.add(canonical);
  if (canonical) pageCanonicals.add(canonical);
  if (canonical && noindex && sitemapUrls.has(canonical)) {
    errors.push(`${path}: noindex URL appears in sitemap`);
  }

  const locale = get(/<html lang="([^"]*)"/);
  if (locale && canonical && !canonical.includes(`/${locale}/`)) {
    errors.push(`${path}: canonical does not match page locale`);
  }
  for (const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    if (locale && /https:\/\/aniimodex\.com\/(dex|guide|tools)\//.test(match[1])) {
      errors.push(`${path}: JSON-LD contains a locale-less internal URL`);
    }
  }
}

for (const url of sitemapUrls) {
  if (!pageCanonicals.has(url)) errors.push(`sitemap URL has no matching built page: ${url}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`SEO audit passed: ${pages.length} pages, ${sitemapUrls.size} sitemap URLs.`);
