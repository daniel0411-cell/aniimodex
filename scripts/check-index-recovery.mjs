import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const snapshot = JSON.parse(readFileSync('data/current-wiki-snapshot.json', 'utf8'));
const sitemap = readFileSync('out/sitemap.xml', 'utf8');
const redirects = readFileSync('out/_redirects', 'utf8');
const elements = ['Light', 'Fire', 'Ice', 'Dark', 'Lightning', 'Grass', 'Water', 'Earth', 'Wind'];
const visible = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');

for (const path of ['abilities', 'evolutions', 'locations']) {
  for (const slash of ['', '/']) {
    assert(redirects.split('\n').some((line) => {
      const [from, to, status] = line.trim().split(/\s+/);
      return from === `/${path}${slash}` && to === `/en/${path}/` && status === '301';
    }), `Missing permanent redirect for /${path}${slash}`);
  }
}

for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
  for (const slug of ['aniimo-elements-explained', 'aniimo-launch-watchlist']) {
    const html = readFileSync(`out/${locale}/guide/${slug}/index.html`, 'utf8');
    const url = `https://aniimodex.com/${locale}/guide/${slug}/`;
    assert(html.includes(`<link rel="canonical" href="${url}"`), `${locale}/${slug}: wrong canonical`);
    assert(html.includes('<meta name="robots" content="index, follow"'), `${locale}/${slug}: not indexable`);
    const graphs = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
      .map((match) => JSON.parse(match[1]));
    const article = graphs.flatMap((graph) => graph['@graph'] ?? [graph])
      .find((item) => item['@type'] === 'Article');
    assert.equal(article.datePublished, slug === 'aniimo-elements-explained' ? '2026-08-31' : '2026-09-16');
    assert.equal(article.dateModified, '2026-10-23');
    const sitemapEntry = [...sitemap.matchAll(/<url>(.*?)<\/url>/gs)]
      .find((match) => match[1].includes(`<loc>${url}</loc>`))?.[1];
    assert(sitemapEntry?.includes('<lastmod>2026-10-23</lastmod>'), `${locale}/${slug}: stale sitemap date`);
    assert(!html.includes('747live.bet'), `${locale}/${slug}: unexpected external canonical domain`);
  }

  const guide = visible(readFileSync(`out/${locale}/guide/aniimo-elements-explained/index.html`, 'utf8'));
  const table = guide.slice(guide.indexOf('id="element-directory"')).match(/<table\b[^>]*>(.*?)<\/table>/s)?.[1];
  assert(table, `${locale}: missing server-rendered element directory`);
  const rows = [...table.matchAll(/<tr\b[^>]*>(.*?)<\/tr>/gs)].slice(1);
  assert.equal(rows.length, 9);
  elements.forEach((element, index) => {
    const members = snapshot.entries.filter((entry) => entry.elements.includes(element));
    assert(rows[index][1].includes(`href="/${locale}/elements/${element.toLowerCase()}/"`));
    assert.match(rows[index][1], new RegExp(`<td[^>]*>${members.length}</td>`));
    for (const member of members.slice(0, 2)) {
      assert(rows[index][1].includes(`href="/${locale}/dex/${member.number}/"`));
    }
  });
  assert(guide.includes(snapshot.checkedAt), `${locale}: missing snapshot date`);
  assert(guide.includes(`href="/${locale}/tools/team-builder/"`));

  const watchlist = visible(readFileSync(`out/${locale}/guide/aniimo-launch-watchlist/index.html`, 'utf8'));
  const watchlistTable = watchlist.match(/<table\b[^>]*>(.*?)<\/table>/s)?.[1];
  assert(watchlistTable, `${locale}: missing watchlist table`);
  const watchlistRows = [...watchlistTable.matchAll(/<tr\b[^>]*>(.*?)<\/tr>/gs)].slice(1);
  assert.equal(watchlistRows.length, 12);
  const linkedNumbers = [];
  for (const [html, row] of watchlistRows) {
    const number = row.match(/href="\/[^/]+\/dex\/([^/]+)\//)?.[1];
    const entry = snapshot.entries.find(entry => entry.number === number);
    assert(entry && row.includes(entry.name), `${locale}: wrong watchlist identity`);
    assert(row.replace(/<!--.*?-->/g, '').includes(`#${entry.officialNumber}`));
    linkedNumbers.push(number);
  }
  assert.equal(new Set(linkedNumbers).size, 12, 'Watchlist must not duplicate entries');
}

console.log('Index recovery checks passed: legacy redirects, localized element data and links, canonical URLs and honest update dates.');
