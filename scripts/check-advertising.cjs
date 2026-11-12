// No network or dependencies: exercise the shipped bootstrap with mocked CMPs.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../public/advertising.js'), 'utf8');

function scenario({ hostname = 'aniimodex.com', gpc = false, pathname = '/en/guide/aniimo-rv-homeland-guide/', manual = true, paths } = {}) {
  let tcf, gpp, click, mutation;
  let requests = 0, revocations = 0;
  let reloads = 0, assigned;
  const scripts = [], placements = [];
  const attributes = new Set();
  const location = { hostname, pathname, origin: 'https://aniimodex.com', href: `https://aniimodex.com${pathname}`, reload() { reloads++; }, assign(href) { assigned = href; } };
  const window = {
    adsbygoogle: { push() { requests++; } },
    __tcfapi(command, version, callback) { assert.equal(command, 'addEventListener'); assert.equal(version, 2); tcf = callback; },
    __gpp(command, callback) { assert.equal(command, 'addEventListener'); gpp = callback; },
    addEventListener() {},
    googlefc: {
      callbackQueue: [],
      showRevocationMessage() { revocations++; },
      usstatesoptout: {
        InitialUsStatesOptOutStatusEnum: { DOES_NOT_APPLY: 1, NOT_OPTED_OUT: 2, OPTED_OUT: 3 },
        getInitialUsStatesOptOutStatus() { return 1; },
      },
    },
  };
  const document = {
    currentScript: { dataset: { aniimoAdvertising: 'live', autoAdPaths: JSON.stringify(paths ?? ['/', '/dex/', '/locations/', '/guide/aniimo-rv-homeland-guide/']) } },
    documentElement: { setAttribute(name) { attributes.add(name); }, toggleAttribute(name, force) { if (force) attributes.add(name); else attributes.delete(name); } },
    body: {}, head: { appendChild(script) { if (script.tagName === 'script') scripts.push(script); } },
    querySelectorAll() { return placements; },
    createElement(tagName) { return { tagName }; },
    addEventListener(name, callback) { if (name === 'click') click = callback; },
  };
  const context = vm.createContext({ window, document, location, URL, navigator: { globalPrivacyControl: gpc },
    MutationObserver: class { constructor(callback) { mutation = callback; } observe() {} },
  });
  function place(width = 600) {
    const placement = { hidden: true, unit: null, querySelector() { return this.unit; } };
    placement.unit = { dataset: {}, getBoundingClientRect() { return { width }; }, remove() { placement.unit = null; } };
    placements.push(placement);
    return placement;
  }
  const first = manual ? place() : null;
  vm.runInContext(source, context);
  const api = window.googlefc;
  return {
    scripts, first, place, window, location, attributes,
    reloads: () => reloads, assigned: () => assigned,
    loadAds() { scripts.find(script => script.src.includes('/adsbygoogle.js'))?.onload(); },
    requests: () => requests, revocations: () => revocations,
    rerun: () => vm.runInContext(source, context),
    ready() { api.callbackQueue.find(item => item.CONSENT_API_READY)?.CONSENT_API_READY(); },
    us(status = 1) { api.usstatesoptout.getInitialUsStatesOptOutStatus = () => status; api.callbackQueue.find(item => item.INITIAL_US_STATES_OPT_OUT_DATA_READY)?.INITIAL_US_STATES_OPT_OUT_DATA_READY(); },
    dataReady() { api.callbackQueue.find(item => item.CONSENT_DATA_READY)?.CONSENT_DATA_READY(); },
    tcf(data, success = true) { tcf(data, success); },
    gpp(event, success = true) { gpp(event, success); },
    mutate() { mutation([{ type: 'childList' }]); },
    click(anchor = null, privacy = anchor === null) {
      const event = { target: { closest(selector) { return selector === 'a[href]' ? anchor : privacy ? {} : null; } }, button: 0, preventDefault() { this.defaultPrevented = true; }, stopPropagation() {} };
      click(event);
      for (const item of api.callbackQueue.slice(3)) item.CONSENT_API_READY?.();
      return event.defaultPrevented;
    },
  };
}
const consent = { cmpStatus: 'loaded', gdprApplies: true, eventStatus: 'useractioncomplete', purpose: { consents: { 1: true, 3: true, 4: true } }, vendor: { consents: { 755: true } } };
for (const options of [{ hostname: 'localhost' }, { hostname: 'preview.pages.dev' }, { gpc: true }]) {
  const s = scenario(options);
  assert.equal(s.scripts.length, 0); assert.equal(s.requests(), 0);
}
let s = scenario();
assert.equal(s.scripts.length, 1); assert.equal(s.requests(), 0);
assert(s.scripts[0].src.includes('fundingchoicesmessages.google.com'));
assert.equal(s.window.adsbygoogle.pauseAdRequests, 1);
s.rerun(); assert.equal(s.scripts.length, 1);
s.ready(); s.us(); assert.equal(s.requests(), 0);
s.tcf({ ...consent, purpose: { consents: {} } }); assert.equal(s.requests(), 0);
s.tcf(consent, false); assert.equal(s.requests(), 0);
s.tcf({ ...consent, eventStatus: 'cmpuishown' }); assert.equal(s.requests(), 0);
s.tcf(consent); assert.equal(s.requests(), 0);
s.dataReady(); assert.equal(s.requests(), 0); assert.equal(s.window.adsbygoogle.pauseAdRequests, 1);
assert.equal(s.scripts.length, 2); s.loadAds();
assert.equal(s.requests(), 1); assert.equal(s.first.hidden, false); assert.equal(s.window.adsbygoogle.pauseAdRequests, 0);
s.mutate(); assert.equal(s.requests(), 1);
const next = s.place(); s.mutate(); assert.equal(s.requests(), 2);
next.unit.dataset.adStatus = 'unfilled'; s.mutate(); assert.equal(next.hidden, true);
assert.equal(s.click(), true); assert.equal(s.revocations(), 1); assert.equal(s.first.unit, null);
assert.equal(s.window.adsbygoogle.pauseAdRequests, 1);
s.tcf({ ...consent, purpose: { consents: {} } }); s.place(); s.mutate(); assert.equal(s.requests(), 2);

for (const status of [undefined, 0, 3]) {
  s = scenario(); s.ready(); s.us(status === undefined ? 0 : status); s.dataReady(); s.tcf({cmpStatus:'loaded',gdprApplies:false}); assert.equal(s.requests(), 0);
}
s = scenario(); s.ready(); s.us(2); s.dataReady(); s.tcf({ cmpStatus: 'loaded', gdprApplies: false }); assert.equal(s.requests(), 0);
s.gpp({eventName:'listenerRegistered',pingData:{signalStatus:'not ready'}});
s.gpp({eventName:'sectionChange',pingData:{signalStatus:'not ready'}}); assert.equal(s.requests(),0);
s.gpp({eventName:'signalStatus',pingData:{signalStatus:'ready'}}); s.loadAds(); assert.equal(s.requests(),1);
s.gpp({ eventName: 'sectionChange' }); s.place(); s.mutate(); assert.equal(s.requests(), 1); assert.equal(s.first.unit, null);
s = scenario(); s.ready(); s.us(); s.dataReady(); s.scripts[0].onerror(); s.tcf(consent); assert.equal(s.requests(), 0);
s = scenario(); s.window.__tcfapi = undefined; s.ready(); s.us(); s.dataReady(); assert.equal(s.requests(), 0);
s = scenario(); s.window.__gpp = undefined; s.ready(); s.us(2); s.dataReady(); s.tcf({cmpStatus:'loaded',gdprApplies:false}); assert.equal(s.requests(), 0);
s = scenario(); s.ready(); s.us(); s.dataReady(); s.tcf({ cmpStatus: 'error', gdprApplies: false }); assert.equal(s.requests(), 0);
// Real EU messages do not necessarily invoke the US initial callback.
s = scenario(); s.ready(); s.tcf(consent); s.dataReady(); s.loadAds(); assert.equal(s.requests(),1);
// Even mixed/debug regional signals must respect an explicit US opt-out.
s = scenario(); s.ready(); s.us(3); s.tcf(consent); s.dataReady(); assert.equal(s.requests(),0);
// A provisional false GDPR flag cannot release an ad before CMP data is ready.
s = scenario(); s.ready(); s.us(); s.tcf({cmpStatus:'loaded',gdprApplies:false}); assert.equal(s.requests(),0);
s.tcf({...consent,eventStatus:'cmpuishown'}); s.dataReady(); assert.equal(s.requests(),0);
// Explicitly non-applicable regions need neither consent nor a US GPP signal.
s = scenario(); s.ready(); s.us(); s.tcf({cmpStatus:'loaded',gdprApplies:false}); s.dataReady(); s.loadAds(); assert.equal(s.requests(),1);
// Consent may be withdrawn while the advertising library is in flight.
s = scenario(); s.ready(); s.tcf(consent); s.dataReady(); s.click(); s.loadAds();
assert.equal(s.requests(),0); assert.equal(s.window.adsbygoogle.pauseAdRequests,1);
// An advertising-loader error must keep the global request pause engaged.
s = scenario(); s.ready(); s.tcf(consent); s.dataReady();
s.scripts[1].onerror(); s.loadAds(); assert.equal(s.requests(),0); assert.equal(s.window.adsbygoogle.pauseAdRequests,1);
console.log('Advertising checks passed: off-host/GPC, unknown/refused/allowed, duplicate bootstrap, SPA, unfilled, revocation, US updates, missing APIs and loader failure. No network used.');

for (const locale of ['en', 'zh-Hans', 'zh-Hant']) {
  for (const pathname of [`/${locale}/`, `/${locale}/dex/`, `/${locale}/locations/`]) {
    s = scenario({ pathname, manual: false }); s.ready(); s.tcf(consent); s.dataReady();
    assert.equal(s.scripts.length, 2, 'Eligible pages load the library without a manual unit');
    assert.equal(s.window.adsbygoogle.pauseAdRequests, 1);
    s.loadAds(); assert.equal(s.window.adsbygoogle.pauseAdRequests, 0); assert.equal(s.requests(), 0);
    assert(!s.attributes.has('data-aniimo-ads-blocked'));
    s.click(); assert.equal(s.window.adsbygoogle.pauseAdRequests, 1);
    assert(s.attributes.has('data-aniimo-ads-blocked'));
  }
  for (const path of ['privacy', 'terms', 'contact', 'about', 'tools', 'tools/catch', 'dex/001', 'guide/not-published', 'guide/how-we-verify']) {
    s = scenario({ pathname: `/${locale}/${path}/`, manual: false }); s.ready(); s.tcf(consent); s.dataReady();
    assert.equal(s.scripts.length, 1, `Excluded ${path} must not load the ad library`);
    assert.equal(s.window.adsbygoogle.pauseAdRequests, 1);
  }
}
s = scenario({ manual: false, paths: [] }); s.ready(); s.tcf(consent); s.dataReady();
assert.equal(s.scripts.length, 1, 'Missing scope must fail closed');
s = scenario({ manual: false }); s.ready(); s.tcf(consent); s.dataReady(); s.loadAds();
s.click({ href: 'https://aniimodex.com/en/privacy/#privacy-choices', target: '', hasAttribute() { return false; } }, true);
assert.equal(s.assigned(), undefined, 'European privacy choices reopen CMP instead of navigating');
assert.equal(s.revocations(), 1);
s.tcf(consent);
s.click({ href: 'https://aniimodex.com/en/privacy/', target: '', hasAttribute() { return false; } });
assert.equal(s.assigned(), 'https://aniimodex.com/en/privacy/');
assert.equal(s.window.adsbygoogle.pauseAdRequests, 1);
s.location.pathname = '/en/privacy/'; s.mutate(); s.mutate();
assert.equal(s.reloads(), 1, 'Programmatic route changes reload once');
for (const data of [{ ...consent, purpose: { consents: {} } }, { ...consent, cmpStatus: 'error' }]) {
  s = scenario({ manual: false }); s.ready(); s.tcf(data); s.dataReady();
  assert.equal(s.scripts.length, 1, 'No-slot pages must retain consent/error blocking');
}
console.log('Auto-ad readiness passed: no-slot loading, three-locale exclusions, consent withdrawal, document navigation and missing scope. No inventory requested.');

if (process.argv.includes('--export-enabled')) {
  const output = path.join(__dirname, '../out');
  const slugs = ['aniimo-prismana-potential-breeding-guide', 'aniimo-rv-homeland-guide', 'aniimo-version-1-1-update'];
  let units = 0;
  function scan(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) scan(file);
      else if (entry.name.endsWith('.html')) {
        const html = fs.readFileSync(file, 'utf8');
        const expected = slugs.some(slug => file.endsWith(path.join('guide', slug, 'index.html')));
        const count = (html.match(/data-ad-slot=/g) || []).length;
        assert.equal(count, expected ? 1 : 0, `Unexpected unit count: ${file}`);
        assert(!html.includes('data-ad-preview'), `Development preview in ${file}`);
        const flight = [...html.matchAll(/self\.__next_f\.push\((\[.*?\])\)<\/script>/g)]
          .map((match) => JSON.parse(match[1])[1]).filter((value) => typeof value === 'string').join('');
        if (flight.includes('aniimo-advertising')) assert(flight.includes('data-auto-ad-paths'), `Missing explicit page scope: ${file}`);
        units += count;
      }
    }
  }
  scan(output);
  assert.equal(units, 9);
  console.log('Enabled export check passed: exactly nine units (three guides x three locales), no other placements.');
}
