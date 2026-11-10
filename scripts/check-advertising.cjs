// No network or dependencies: exercise the shipped bootstrap with mocked CMPs.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../public/advertising.js'), 'utf8');

function scenario({ hostname = 'aniimodex.com', gpc = false } = {}) {
  let tcf, gpp, click, mutation;
  let requests = 0, revocations = 0;
  const scripts = [], placements = [];
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
    currentScript: { dataset: { aniimoAdvertising: 'live' } },
    body: {}, head: { appendChild(script) { scripts.push(script); } },
    querySelectorAll() { return placements; },
    createElement() { return {}; },
    addEventListener(name, callback) { if (name === 'click') click = callback; },
  };
  const context = vm.createContext({ window, document, location: { hostname }, navigator: { globalPrivacyControl: gpc },
    MutationObserver: class { constructor(callback) { mutation = callback; } observe() {} },
  });
  function place(width = 600) {
    const placement = { hidden: true, unit: null, querySelector() { return this.unit; } };
    placement.unit = { dataset: {}, getBoundingClientRect() { return { width }; }, remove() { placement.unit = null; } };
    placements.push(placement);
    return placement;
  }
  const first = place();
  vm.runInContext(source, context);
  const api = window.googlefc;
  return {
    scripts, first, place, window,
    requests: () => requests, revocations: () => revocations,
    rerun: () => vm.runInContext(source, context),
    ready() { api.callbackQueue.find(item => item.CONSENT_API_READY)?.CONSENT_API_READY(); },
    us(status = 1) { api.usstatesoptout.getInitialUsStatesOptOutStatus = () => status; api.callbackQueue.find(item => item.INITIAL_US_STATES_OPT_OUT_DATA_READY)?.INITIAL_US_STATES_OPT_OUT_DATA_READY(); },
    tcf(data, success = true) { tcf(data, success); },
    gpp(event, success = true) { gpp(event, success); },
    mutate() { mutation([{ type: 'childList' }]); },
    click() {
      const event = { target: { closest() { return {}; } }, button: 0, preventDefault() { this.defaultPrevented = true; } };
      click(event);
      for (const item of api.callbackQueue.slice(2)) item.CONSENT_API_READY?.();
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
s.rerun(); assert.equal(s.scripts.length, 1);
s.ready(); s.us(); assert.equal(s.requests(), 0);
s.tcf({ ...consent, purpose: { consents: {} } }); assert.equal(s.requests(), 0);
s.tcf(consent, false); assert.equal(s.requests(), 0);
s.tcf({ ...consent, eventStatus: 'cmpuishown' }); assert.equal(s.requests(), 0);
s.tcf(consent); assert.equal(s.requests(), 1); assert.equal(s.first.hidden, false);
s.mutate(); assert.equal(s.requests(), 1);
const next = s.place(); s.mutate(); assert.equal(s.requests(), 2);
next.unit.dataset.adStatus = 'unfilled'; s.mutate(); assert.equal(next.hidden, true);
assert.equal(s.click(), true); assert.equal(s.revocations(), 1); assert.equal(s.first.unit, null);
s.tcf({ ...consent, purpose: { consents: {} } }); s.place(); s.mutate(); assert.equal(s.requests(), 2);

for (const status of [undefined, 0, 3]) {
  s = scenario(); s.ready(); s.us(status === undefined ? 0 : status); s.tcf(consent); assert.equal(s.requests(), 0);
}
s = scenario(); s.ready(); s.us(2); s.tcf({ cmpStatus: 'loaded', gdprApplies: false }); assert.equal(s.requests(), 1);
s.gpp({ eventName: 'sectionChange' }); s.place(); s.mutate(); assert.equal(s.requests(), 1); assert.equal(s.first.unit, null);
s = scenario(); s.ready(); s.us(); s.scripts[0].onerror(); s.tcf(consent); assert.equal(s.requests(), 0);
s = scenario(); s.window.__tcfapi = undefined; s.ready(); s.us(); assert.equal(s.requests(), 0);
s = scenario(); s.window.__gpp = undefined; s.ready(); s.us(2); s.tcf(consent); assert.equal(s.requests(), 0);
s = scenario(); s.ready(); s.us(); s.tcf({ cmpStatus: 'error', gdprApplies: false }); assert.equal(s.requests(), 0);
console.log('Advertising checks passed: off-host/GPC, unknown/refused/allowed, duplicate bootstrap, SPA, unfilled, revocation, US updates, missing APIs and loader failure. No network used.');

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
        units += count;
      }
    }
  }
  scan(output);
  assert.equal(units, 9);
  console.log('Enabled export check passed: exactly nine units (three guides x three locales), no other placements.');
}
