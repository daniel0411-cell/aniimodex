// Real CMP checks. --ad-library also loads Google JS; ad delivery is blocked.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
if (!process.argv.includes('--live')) {
  console.error('Usage: node scripts/check-cmp-live.cjs --live [gdpr|natural|gpc] [refuse|consent-revoke|manage|us-out-reload] [--mobile] [--ad-library] [--site|--deployed]');
  process.exit(1);
}
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const mode = process.argv.find(arg => ['gdpr', 'natural', 'gpc'].includes(arg)) || 'gdpr';
const action = process.argv.find(arg => ['refuse', 'consent-revoke', 'manage', 'us-out-reload'].includes(arg));
const mobile = process.argv.includes('--mobile');
const realAdLibrary = process.argv.includes('--ad-library');
const deployed = process.argv.includes('--deployed');
const siteMode = deployed || process.argv.includes('--site');
let runtime = fs.readFileSync(path.join(__dirname, '../public/advertising.js'), 'utf8');
runtime = runtime.replace('pauseAdRequests = allowed && adLoaderReady ? 0 : 1;', 'pauseAdRequests = allowed && adLoaderReady ? 0 : 1; window.__requestedPause = allowed && adLoaderReady ? 0 : 1;');
// Keep real library behavior, but never submit the dummy unit to Google.
if (realAdLibrary) runtime = runtime.replace('(window.adsbygoogle = window.adsbygoogle || []).push({});', 'window.__unitInitializations++;');
const setup = `
window.__cmpEvents=[];window.__unitInitializations=0;window.__requestedPause=1;
window.adsbygoogle=${realAdLibrary ? '[]' : '{push:()=>{window.__unitInitializations++;}}'};
window.googlefc={callbackQueue:[{CONSENT_API_READY:()=>{
  if(typeof __tcfapi==='function')__tcfapi('addEventListener',2,(d,s)=>__cmpEvents.push({type:'tcf',success:s,gdpr:d?.gdprApplies,status:d?.cmpStatus,event:d?.eventStatus,p1:d?.purpose?.consents?.[1],p3:d?.purpose?.consents?.[3],p4:d?.purpose?.consents?.[4],google:d?.vendor?.consents?.[755]}));
  if(typeof __gpp==='function')__gpp('addEventListener',(d,s)=>__cmpEvents.push({type:'gpp',success:s,event:d?.eventName,signal:d?.pingData?.signalStatus,sections:d?.pingData?.applicableSections}));
}},{INITIAL_US_STATES_OPT_OUT_DATA_READY:()=>__cmpEvents.push({type:'us',status:googlefc.usstatesoptout?.getInitialUsStatesOptOutStatus?.()})},
{CONSENT_DATA_READY:()=>__cmpEvents.push({type:'dataReady'})}]};`;

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_EXECUTABLE_PATH ? { executablePath: process.env.CHROME_EXECUTABLE_PATH } : {}) });
  const blocked = [], failures = [], errors = [], adLibraryRequests = [], blockedStates = [];
  let allowedRequests = 0;
  try {
    const context = await browser.newContext({ viewport: { width: mobile ? 375 : 1280, height: 900 }, locale: 'en-US' });
    if (deployed) await context.addInitScript({ content: setup });
    if (mode === 'gpc') await context.addInitScript(() => Object.defineProperty(navigator, 'globalPrivacyControl', { value: true }));
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    page.on('requestfailed', request => failures.push({ host: new URL(request.url()).hostname, error: request.failure()?.errorText }));
    await page.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (url.hostname === 'aniimodex.com') {
        if (url.pathname === '/advertising.js') return route.fulfill({ contentType: 'application/javascript', body: runtime });
        if (deployed) return route.continue();
        if (siteMode) {
          let file = path.join(__dirname, '../out', decodeURIComponent(url.pathname));
          if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
          if (!fs.existsSync(file)) return route.fulfill({ status: 404, body: 'Not found' });
          const extension = path.extname(file);
          const contentType = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2' }[extension] || 'application/octet-stream';
          const body = extension === '.html' ? fs.readFileSync(file, 'utf8').replace('<head>', '<head><script>' + setup + '</script>') : fs.readFileSync(file);
          return route.fulfill({ contentType, body });
        }
        return route.fulfill({ contentType: 'text/html', body: `<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>AniimoDex CMP-only verification</title><script>${setup}</script></head><body><h1>AniimoDex CMP verification</h1><a data-privacy-choices href="/en/privacy/#privacy-choices">Privacy choices</a><aside data-guide-ad hidden><ins class="adsbygoogle" style="display:block;height:60px">Inert probe: no publisher or ad slot attributes</ins></aside><script src="/advertising.js" data-aniimo-advertising="live"></script></body></html>` });
      }
      if (['fundingchoicesmessages.google.com', 'www.gstatic.com', 'fonts.googleapis.com', 'fonts.gstatic.com', 'lh3.googleusercontent.com'].includes(url.hostname)) {
        allowedRequests++;
        return route.continue();
      }
      if (url.hostname === 'pagead2.googlesyndication.com' && route.request().resourceType() === 'script' &&
          (url.pathname === '/pagead/js/adsbygoogle.js' || /^\/pagead\/managed\/js\/adsense\/[^/]+\/show_ads_impl\.js$/.test(url.pathname))) {
        adLibraryRequests.push({ path: url.pathname, pause: await page.evaluate(() => window.adsbygoogle?.pauseAdRequests) });
        return realAdLibrary ? route.continue() : route.fulfill({ contentType: 'application/javascript', body: '' });
      }
      blocked.push(url.origin + url.pathname);
      blockedStates.push({ path: url.origin + url.pathname, pause: await page.evaluate(() => window.__requestedPause) });
      return route.abort('blockedbyclient');
    });
    await page.goto('https://aniimodex.com/en/' + (siteMode ? 'guide/aniimo-prismana-potential-breeding-guide/' : 'privacy/') + (mode === 'gdpr' ? '?fc=alwaysshow&fctype=gdpr' : ''), { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.__aniimoAdvertising === true);
    if (mode === 'gdpr') await page.getByRole('button', { name: 'Consent', exact: true }).waitFor();
    else if (mode !== 'gpc') await page.waitForFunction(() => window.__cmpEvents.some(event => event.type === 'dataReady'));
    if (action === 'us-out-reload') await page.waitForFunction(() => window.__unitInitializations === 1);
    const gate = () => page.evaluate(() => ({ initializations: window.__unitInitializations, visible: !document.querySelector('[data-guide-ad]').hidden, paused: window.__requestedPause, pauseApiSetter: typeof Object.getOwnPropertyDescriptor(window.adsbygoogle || {}, 'pauseAdRequests')?.set === 'function' }));
    const initial = await gate();
    let beforeReload;
    if (mode === 'gdpr') assert.equal(initial.initializations, 0, 'Provisional non-GDPR flag must not release a unit');
    if (mode === 'gdpr') { assert.equal(initial.paused, 1); assert.equal(adLibraryRequests.length, 0); assert.equal(blocked.filter(url => /googlesyndication|doubleclick/.test(url)).length, 0); }
    if (action === 'refuse') await page.getByRole('button', { name: 'Do not consent', exact: true }).click();
    if (action === 'manage') await page.getByRole('button', { name: 'Manage options', exact: true }).click();
    if (action === 'consent-revoke') {
      await page.getByRole('button', { name: 'Consent', exact: true }).click();
      await page.waitForFunction(() => window.__unitInitializations === 1);
      await page.waitForTimeout(1500);
      await page.locator('[data-privacy-choices]').click();
      await page.getByRole('button', { name: 'Do not consent', exact: true }).click();
    }
    if (action === 'us-out-reload') {
      await page.getByText('Do Not Sell or Share My Personal Information', { exact: true }).click();
      const readyCount = await page.evaluate(() => window.__cmpEvents.filter(event => event.type === 'gpp' && event.event === 'signalStatus' && event.signal === 'ready').length);
      await page.getByRole('button', { name: 'Opt out', exact: true }).click();
      await page.waitForFunction(count => window.__cmpEvents.filter(event => event.type === 'gpp' && event.event === 'signalStatus' && event.signal === 'ready').length > count && document.querySelector('[data-guide-ad]').hidden, readyCount);
      beforeReload = await gate();
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => window.__cmpEvents.some(event => event.type === 'dataReady'));
      assert(await page.evaluate(() => window.__cmpEvents.some(event => event.type === 'us' && event.status === 3)), 'Saved opt-out must survive reload');
    }
    if (action === 'refuse' || action === 'consent-revoke') await page.waitForFunction(() => window.__cmpEvents.some(event => event.type === 'tcf' && event.event === 'useractioncomplete' && event.p1 === false));
    await page.waitForTimeout(1500);
    const final = await gate();
    if (['refuse', 'manage', 'us-out-reload'].includes(action)) assert.equal(final.initializations, 0);
    if (action === 'consent-revoke') { assert.equal(final.initializations, 1); assert.equal(final.visible, false); }
    if (mode === 'gpc') { assert.equal(allowedRequests, 0); assert.equal(final.initializations, 0); }
    assert.deepEqual(errors, []);
    if (['refuse', 'consent-revoke', 'us-out-reload'].includes(action)) assert.equal(final.paused, 1);
    if (siteMode) assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Site must not overflow horizontally');
    const report = { mode, action, mobile, siteMode, deployed, transport: realAdLibrary ? 'Real CMP and AdSense JS; manual unit submission replaced by local counter; all ad delivery blocked' : 'Real CMP; advertising JS stubbed', initial, beforeReload, final, events: await page.evaluate(() => window.__cmpEvents), allowedRequests, adLibraryRequests, blocked, blockedStates, failures, errors, realAdRequestsAllowed: 0 };
    const base = path.join(os.tmpdir(), `aniimo-cmp-${mode}-${action || 'initial'}-${mobile ? 'mobile' : 'desktop'}${deployed ? '-deployed' : siteMode ? '-site' : ''}`);
    fs.writeFileSync(base + '.json', JSON.stringify(report, null, 2));
    await page.screenshot({ path: base + '.png', fullPage: true });
    console.log(JSON.stringify({ ...report, report: base + '.json', screenshot: base + '.png' }, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
