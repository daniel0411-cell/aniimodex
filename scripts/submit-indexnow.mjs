import { readFile } from 'node:fs/promises';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aniimodex.com').replace(/\/$/, '');
const keyFile = new URL('../.seo/indexnow-key.txt', import.meta.url);

async function getKey() {
  if (process.env.INDEXNOW_KEY) return process.env.INDEXNOW_KEY.trim();
  try {
    return (await readFile(keyFile, 'utf8')).trim();
  } catch {
    return '';
  }
}

async function getUrls() {
  const response = await fetch(`${siteUrl}/sitemap.xml`);
  if (!response.ok) throw new Error(`Could not fetch sitemap: HTTP ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
}

const key = await getKey();
const urls = await getUrls();
const hostname = new URL(siteUrl).hostname;

if (!urls.length) throw new Error('Sitemap contains no URLs.');
if (urls.some((url) => new URL(url).hostname !== hostname)) {
  throw new Error('Sitemap contains a URL outside the configured hostname.');
}

if (!process.argv.includes('--submit')) {
  console.log(`IndexNow check passed: ${urls.length} URLs for ${hostname}.`);
  console.log('Run pnpm seo:indexnow:submit after configuring INDEXNOW_KEY.');
  process.exit(0);
}

if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) {
  throw new Error('Set INDEXNOW_KEY or .seo/indexnow-key.txt to a valid IndexNow key.');
}

const keyLocation = `${siteUrl}/${key}.txt`;
const keyResponse = await fetch(keyLocation);
if (!keyResponse.ok || (await keyResponse.text()).trim() !== key) {
  throw new Error(`IndexNow key file is not live at ${keyLocation}. Deploy with INDEXNOW_KEY first.`);
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: hostname, key, keyLocation, urlList: urls }),
});

if (![200, 202].includes(response.status)) {
  throw new Error(`IndexNow rejected the submission: HTTP ${response.status} ${await response.text()}`);
}

console.log(`IndexNow accepted ${urls.length} URLs: HTTP ${response.status}.`);
