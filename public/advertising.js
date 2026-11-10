/* Regional consent is supplied by Google's published Privacy & messaging CMP.
 * This gate is intentionally stricter than AdSense's limited-ad eligibility.
 */
(() => {
  'use strict';
  if (window.__aniimoAdvertising || document.currentScript?.dataset.aniimoAdvertising !== 'live') return;
  window.__aniimoAdvertising = true;
  // Never contact Google from local previews, staging hosts or GPC browsers.
  if (!['aniimodex.com', 'www.aniimodex.com'].includes(location.hostname) || navigator.globalPrivacyControl === true) return;

  let euAllowed = false;
  let usAllowed = false;
  let euApplies = false;
  let failed = false;
  let usChanged = false;
  let refreshing = false;
  const submitted = new WeakSet();
  const googlefc = window.googlefc = window.googlefc || {};
  googlefc.callbackQueue = googlefc.callbackQueue || [];

  function refresh() {
    if (refreshing) return;
    refreshing = true;
    try {
      const allowed = euAllowed && usAllowed && !failed && !usChanged && navigator.globalPrivacyControl !== true;
      document.querySelectorAll('[data-guide-ad]').forEach((placement) => {
        const unit = placement.querySelector('ins.adsbygoogle');
        if (!unit) { placement.hidden = true; return; }
        if (!allowed) {
          placement.hidden = true;
          // Removing the element stops its display. Requests already sent cannot
          // be undone; Google receives subsequent consent updates via its CMP.
          if (submitted.has(unit)) unit.remove();
          return;
        }
        if (unit.dataset.adStatus === 'unfilled') { placement.hidden = true; return; }
        placement.hidden = false;
        if (submitted.has(unit) || unit.getBoundingClientRect().width === 0) return;
        submitted.add(unit);
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch {
          failed = true;
          placement.hidden = true;
        }
      });
    } finally { refreshing = false; }
  }

  // Unknown or missing framework data deliberately leaves placements blocked.
  googlefc.callbackQueue.push({ CONSENT_API_READY: () => {
    if (typeof window.__tcfapi === 'function') {
      window.__tcfapi('addEventListener', 2, (data, success) => {
        euApplies = success === true && data?.gdprApplies === true;
        euAllowed = success === true && data?.cmpStatus === 'loaded' && (
          data.gdprApplies === false || (
            data.gdprApplies === true &&
            ['tcloaded', 'useractioncomplete'].includes(data.eventStatus) &&
            data.purpose?.consents?.[1] === true &&
            data.purpose?.consents?.[3] === true &&
            data.purpose?.consents?.[4] === true &&
            data.vendor?.consents?.[755] === true
          )
        );
        refresh();
      });
    }
    if (typeof window.__gpp === 'function') {
      window.__gpp('addEventListener', (event, success) => {
        // Re-read choices on a fresh document after any US choice change. Do not
        // reuse Google's explicitly initial-only opt-out result for later ads.
        if (success !== true || event?.eventName === 'sectionChange' || event?.pingData?.signalStatus === 'not ready') {
          usChanged = true;
          refresh();
        }
      });
    }
  } });
  googlefc.callbackQueue.push({ INITIAL_US_STATES_OPT_OUT_DATA_READY: () => {
    const api = googlefc.usstatesoptout;
    const status = api?.getInitialUsStatesOptOutStatus?.();
    const values = api?.InitialUsStatesOptOutStatusEnum;
    usAllowed = !!values && (status === values.DOES_NOT_APPLY || (
      status === values.NOT_OPTED_OUT && typeof window.__gpp === 'function'
    ));
    refresh();
  } });

  // Keep Google's built-in US Do Not Sell or Share entrypoint. Overriding it
  // with openConfirmationDialog is documented as Ad Manager-only, not AdSense.
  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('[data-privacy-choices]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!euApplies || typeof googlefc.showRevocationMessage !== 'function') return;
    event.preventDefault();
    euAllowed = false;
    refresh();
    googlefc.callbackQueue.push({ CONSENT_API_READY: () => googlefc.showRevocationMessage() });
  }, true);

  const observer = new MutationObserver((changes) => {
    if (changes.some((change) => change.type === 'childList' || change.attributeName === 'data-ad-status')) refresh();
  });
  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-ad-status'] });
  window.addEventListener('resize', refresh);
  window.addEventListener('pageshow', refresh);
  const loader = document.createElement('script');
  loader.async = true;
  loader.crossOrigin = 'anonymous';
  loader.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2321309842883439';
  loader.onerror = () => { failed = true; refresh(); };
  document.head.appendChild(loader);
})();
