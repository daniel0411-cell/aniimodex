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
  let consentDataReady = false;
  let usApplies = false;
  let usOptedOut = false;
  let usReady = false;
  let usWasReady = false;
  let failed = false;
  let usChanged = false;
  let refreshing = false;
  let adLoaderStarted = false;
  let adLoaderReady = false;
  const initialPath = location.pathname;
  let navigating = false;
  let adPaths;
  try { adPaths = new Set(JSON.parse(document.currentScript.dataset.autoAdPaths || '[]')); }
  catch { adPaths = new Set(); }
  const pageAllowed = () => /^\/(en|zh-Hans|zh-Hant)(\/|$)/.test(location.pathname) &&
    adPaths.has(location.pathname.replace(/^\/(en|zh-Hans|zh-Hant)(?=\/|$)/, '').replace(/\/?$/, '/'));
  // Google CMP can itself insert an AdSense tag. Pause that tag too.
  (window.adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 1;
  const submitted = new WeakSet();
  const blockedStyle = document.createElement('style');
  blockedStyle.textContent = 'html[data-aniimo-ads-blocked] ins.adsbygoogle, html[data-aniimo-ads-blocked] .google-auto-placed { display: none !important; }';
  document.documentElement.setAttribute('data-aniimo-ads-blocked', '');
  document.head.appendChild(blockedStyle);
  const googlefc = window.googlefc = window.googlefc || {};
  googlefc.callbackQueue = googlefc.callbackQueue || [];

  function refresh() {
    if (refreshing) return;
    refreshing = true;
    try {
      // A new document clears Google-created placements when leaving a page.
      if (adLoaderStarted && location.pathname !== initialPath) {
        (window.adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 1;
        document.documentElement.setAttribute('data-aniimo-ads-blocked', '');
        if (!navigating) { navigating = true; location.reload(); }
        return;
      }
      const regionalAllowed = (euApplies || usAllowed) && !usOptedOut && (!usApplies || (usReady && !usChanged));
      const allowed = pageAllowed() && consentDataReady && euAllowed && regionalAllowed && !failed && navigator.globalPrivacyControl !== true;
      (window.adsbygoogle = window.adsbygoogle || []).pauseAdRequests = allowed && adLoaderReady ? 0 : 1;
      document.documentElement.toggleAttribute('data-aniimo-ads-blocked', !allowed || !adLoaderReady);
      if (allowed && !adLoaderStarted) {
        adLoaderStarted = true;
        const adLoader = document.createElement('script');
        adLoader.async = true;
        adLoader.crossOrigin = 'anonymous';
        adLoader.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2321309842883439';
        adLoader.onload = () => { adLoaderReady = true; refresh(); };
        adLoader.onerror = () => { failed = true; refresh(); };
        document.head.appendChild(adLoader);
      }
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
        if (!adLoaderReady) { placement.hidden = true; return; }
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
        // Initial sectionChange/not-ready events are normal CMP startup. Only
        // invalidate the initial opt-out result after signals were first ready.
        const ready = success === true && event?.pingData?.signalStatus === 'ready';
        if (usWasReady && (success !== true || event?.eventName === 'sectionChange' || !ready)) {
          usChanged = true;
        }
        usReady = ready;
        if (ready) usWasReady = true;
        refresh();
      });
    }
  } });
  googlefc.callbackQueue.push({ INITIAL_US_STATES_OPT_OUT_DATA_READY: () => {
    const api = googlefc.usstatesoptout;
    const status = api?.getInitialUsStatesOptOutStatus?.();
    const values = api?.InitialUsStatesOptOutStatusEnum;
    usApplies = !!values && (status === values.NOT_OPTED_OUT || status === values.OPTED_OUT);
    usOptedOut = !!values && status === values.OPTED_OUT;
    usAllowed = !!values && (status === values.DOES_NOT_APPLY || (
      status === values.NOT_OPTED_OUT && typeof window.__gpp === 'function'
    ));
    refresh();
  } });
  // API_READY can initially report gdprApplies=false before the EU message
  // opens. DATA_READY prevents that provisional result from releasing a unit.
  googlefc.callbackQueue.push({ CONSENT_DATA_READY: () => {
    consentDataReady = true;
    refresh();
  } });

  // Keep Google's built-in US Do Not Sell or Share entrypoint. Overriding it
  // with openConfirmationDialog is documented as Ad Manager-only, not AdSense.
  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('[data-privacy-choices]');
    if (link && !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey &&
        euApplies && typeof googlefc.showRevocationMessage === 'function') {
      event.preventDefault();
      euAllowed = false;
      refresh();
      googlefc.callbackQueue.push({ CONSENT_API_READY: () => googlefc.showRevocationMessage() });
      return;
    }
    const anchor = event.target.closest?.('a[href]');
    if (adLoaderStarted && anchor && !event.defaultPrevented && event.button === 0 &&
        !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey &&
        !anchor.hasAttribute('download') && (!anchor.target || anchor.target === '_self')) {
      const destination = new URL(anchor.href, location.href);
      if (destination.origin === location.origin && destination.pathname !== location.pathname) {
        (window.adsbygoogle = window.adsbygoogle || []).pauseAdRequests = 1;
        event.preventDefault();
        event.stopPropagation();
        location.assign(destination.href);
        return;
      }
    }
  }, true);

  const observer = new MutationObserver((changes) => {
    if (changes.some((change) => change.type === 'childList' || change.attributeName === 'data-ad-status')) refresh();
  });
  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-ad-status'] });
  window.addEventListener('resize', refresh);
  window.addEventListener('pageshow', refresh);
  window.addEventListener('popstate', refresh);
  const loader = document.createElement('script');
  loader.async = true;
  loader.src = 'https://fundingchoicesmessages.google.com/i/pub-2321309842883439?ers=1';
  loader.onerror = () => { failed = true; refresh(); };
  document.head.appendChild(loader);
})();
