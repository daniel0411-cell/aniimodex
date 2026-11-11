# Advertising integration checkpoint - November 10, 2026

Current transport and release authorization are described in the November 11
sections below. They supersede the earlier single-loader and disabled-default
descriptions; earlier entries are historical validation records.

## Scope and baseline

- Fresh fetch found local 3630f73 behind origin/main by three commits; safely fast-forwarded to 36dcb4e, retaining existing local guide-ad preview work and unrelated .workbuddy/.
- Prepare one responsive end-of-article unit (3760991389, publisher ca-pub-2321309842883439) on three guides, in all three locales: aniimo-prismana-potential-breeding-guide, aniimo-rv-homeland-guide, aniimo-version-1-1-update.
- This checkpoint does not authorize activation, dashboard changes, push or deployment. Auto ads remain a dashboard setting and must stay off.

## Switches and behavior

- Default build: no advertising bootstrap or units. ADSENSE_ENABLED=1 enables the prepared integration only in a production build. Changing a Cloudflare build variable requires a rebuild; removing it and rebuilding is the rollback.
- Development: AD_LAYOUT_PREVIEW=1 shows inert layout placeholders only. Even ADSENSE_ENABLED=1 cannot enable the integration in development.
- Browser runtime only loads the AdSense tag on aniimodex.com/www.aniimodex.com, never local/staging hosts; browsers exposing navigator.globalPrivacyControl=true skip the tag entirely.
- Published Google Privacy & messaging messages are deployed through the AdSense tag. Loading this tag itself contacts Google before unit initialization; this is not a promise of zero Google network traffic before consent.
- Unit initialization requires CONSENT_DATA_READY and an explicit loaded TCF result. Applicable EU visitors need completed consent for purposes 1/3/4 and Google vendor 755, without waiting for an unrelated US callback. Explicitly non-EU visitors need a known initial US result; applicable US visitors additionally need a ready GPP signal. Unknown/error/absent applicable signals stay blocked.
- Google remains responsible for interpreting complete CMP signals and actual ad eligibility. This additional gate is intentionally conservative and may suppress otherwise eligible limited ads.
- EU Privacy choices opens showRevocationMessage through callbackQueue when applicable; otherwise the link opens the localized policy/contact section. US retains Google's own Do Not Sell or Share entrypoint (no overrideDnsLink).
- Initial GPP not-ready/sectionChange events are normal startup, not a saved-choice change. After GPP first becomes ready, a subsequent US change/error/not-ready signal stops initialization until reload. Revocation removes any initialized unit from display; already sent requests cannot be undone. A removed unit is not recreated in that same placement during the current mount.
- Mutation observation supports client navigation without duplicate unit submissions, hides unfilled inventory, and waits for nonzero unit width. No ads on dex, tools or homepage.
- The three localized policies disclose both paused and enabled operation; the rendered status switches at build time with the same flag as the integration.

## Evidence

- Google Funding Choices API: https://developers.google.com/funding-choices/fc-api-docs
  Existing AdSense tags deploy published messages; CONSENT_API_READY, initial US status, TCF listeners and EU revocation are documented here. Custom US Do Not Sell or Share override is explicitly Ad Manager-only.
- CMP requirement: https://support.google.com/adsense/answer/13554116
- Privacy disclosures: https://support.google.com/adsense/answer/1348695
- US processing: https://support.google.com/adsense/answer/9560818

## Checks and remaining launch requirements

- Passed node scripts/check-advertising.cjs for mocked gate checks (no network), npm run lint and production builds with the switch both off and on. The disabled build passed node scripts/check-privacy-no-ads.cjs across 489 HTML files. The enabled build passed node scripts/check-advertising.cjs --export-enabled: exactly nine units (three guides x three locales), none elsewhere.
- Independent headless Chrome tests routed all site assets from local out/ and replaced Google's loader with a local CMP/ad mock. Disabled: 18 mobile/desktop guide checks plus localized policy checks, no advertising requests. Enabled: 23 cases including all three guides/locales at 375px and 1440px, EU revocation, unknown/refused/US opt-out/GPC/loader failure; no browser JS errors, horizontal overflow or real Google requests. Mobile and desktop screenshots visually checked. Repeated the enabled checks after switching bootstrap loading to Next Script afterInteractive so DOM edits begin after hydration. Each browser was closed in finally.
- Final local output is rebuilt with ADSENSE_ENABLED=0; no publishing or dashboard modifications occurred.
- Local preview must be checked on mobile and desktop. Real Google advertisements must not be requested for testing, clicked or repeatedly refreshed.
- Before activation: confirm both regional messages are actually published (not just saved), correct site/privacy URL/languages, automatic ads off, and live regional consent/exit entries working. Screenshots/configuration alone do not prove geographic delivery.
- Verify real TCF/GPP availability and false/not-applicable signals outside Europe/US. If missing, ads intentionally remain blocked; do not weaken the gate by assuming undefined means consent or non-applicability.
- No guarantee of compliance, account safety, fill or revenue is inferred from local mocks. Account payment/PIN handling stays with the user.

## Publication handoff

- User supplied dashboard screenshots after the publication instructions. Both AniimoDex_Europe_Consent (en) and AniimoDex_US_Privacy (en-US) show Published, site aniimodex.com, with publishing switches enabled and November 10 modification dates.
- Screenshots establish dashboard publication only, not geographic delivery, consent string validity or actual ad eligibility. Auto ads status was not re-proven by these screenshots.
- Following the agreed next step, release the prepared website integration while keeping the formal advertising switch disabled. This supersedes the earlier local-only publishing scope; it does not enable the ad tag or initialize live units.
- Fresh pre-release fetch: HEAD and origin/main both 36dcb4e, difference 0/0. Existing .workbuddy/ excluded. Re-ran the mocked advertising checks, the disabled export check over 489 HTML files and git diff --check; all passed. Full builds/lint and mobile/desktop mocked browser checks passed during implementation as recorded above.
- Real regional delivery still requires a separate activation/verification step. Do not treat a deployed but disabled integration as a live CMP test.

## Real CMP validation and corrections

The user requested completion of regional validation before formal activation.
Fresh fetch: local 9f44be2 is one commit ahead of origin/main 36dcb4e; no remote-only changes. No push or deployment performed in this verification task.

### Method and boundary

- Official API documentation re-read: https://developers.google.com/funding-choices/fc-api-docs. Its supported debugging parameters are fc=alwaysshow and fctype=gdpr/ccpa/usnat/usfl.
- A fresh, unauthenticated headless Chrome context intercepted aniimodex.com HTML locally. It loaded the real publisher-specific Google CMP, not a mocked consent dialog, and exercised the current site's callback/revocation handlers. The dummy initialization target had no publisher/client/slot attributes and adsbygoogle.push only incremented a local counter. All advertising/measurement destinations were blocked by an allowlist; no real ads were served or clicked.
- Full AdSense-loader attempt failed with Chrome net::ERR_CONNECTION_CLOSED; curl independently failed its TLS connection with SSL_ERROR_SYSCALL. This is a limitation of the current connection to pagead2.googlesyndication.com, not proof of an origin-site failure or a resolved production integration.
- To isolate message verification, the test harness substituted the publicly served Google CMP tag transport only, without changing production transport. Therefore these results verify published CMP configuration, actual APIs and site gate behavior, not the complete deployed AdSense loading chain.
- Cloudflare reported the current connection country as US. EU tests used Google's official debug mode, not a European IP; other unregulated regions were checked with explicit mocked not-applicable signals only.

### Observed defects, now corrected

1. EU consent did not invoke the US initial callback in the real debug flow; requiring both prevented all EU units. Regional eligibility now branches on known TCF applicability.
2. Real US initialization emitted listenerRegistered/not ready, signalStatus/not ready, initial status 2, sectionChange/not ready, then signalStatus/ready. Treating these startup events as permanent revocation prevented all US units. Startup now waits for readiness; later changes still invalidate initial data.
3. The API initially reported gdprApplies=false before the EU debug dialog became applicable. Added the documented CONSENT_DATA_READY gate so this provisional flag cannot release a unit.

### Real service results

| Case | Observed result |
| --- | --- |
| European unchosen and fresh refusal, 375px | Counter remains 0; useractioncomplete has purposes 1/3/4 false |
| European consent, desktop | Counter moves 0 to 1 only after consent and data readiness; Google vendor 755 and purposes 1/3/4 true |
| Site Privacy choices, then European refusal | Real dialog reopens; purposes become false; target hidden/removed; counter remains 1 (no new initialization) |
| European Manage options, 375px | Real purposes/vendors/legitimate-interest controls and confirm/accept buttons render; screenshot checked, counter 0 |
| US natural connection, desktop/mobile | Native Do Not Sell or Share My Personal Information link renders; initial status 2 and GPP section 7 become ready before counter 1 |
| Native US Opt out, then reload | Target stops displaying; on reload initial US status is 3; counter 0; choice survives reload |
| GPC enabled | Zero CMP/ad-network requests and counter 0 |

The published European message currently declares 210 partners and the optional precise-geolocation special feature. This reflects the actual vendor configuration returned by Google; no backend vendor settings were changed in this task.

### Reproduction and remaining gaps

- Node regression: node scripts/check-advertising.cjs. Includes real observed EU/US startup ordering, missing callbacks, provisional flags, readiness and later revocation.
- Opt-in real-service runner: scripts/check-cmp-live.cjs --live, with PLAYWRIGHT_MODULE_PATH and CHROME_EXECUTABLE_PATH set to the installed runtime. Modes: gdpr, natural, gpc; actions: refuse, consent-revoke, manage, us-out-reload; optional --mobile. It deliberately tests CMP-only transport; report/screenshot paths are printed, and the browser closes in finally.
- Example on this host: PLAYWRIGHT_MODULE_PATH=/Users/daniel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright CHROME_EXECUTABLE_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' node scripts/check-cmp-live.cjs --live gdpr refuse --mobile.
- Prototype raw observations: /tmp/aniimo-cmp-result-gdpr-consent-revoke.json, /tmp/aniimo-cmp-result-gdpr-refuse-mobile.json, /tmp/aniimo-cmp-result-natural-us-out-reload.json, /tmp/aniimo-cmp-result-gpc-initial.json; mobile Manage options screenshot /tmp/aniimo-cmp-live-gdpr-manage-mobile.png.
- Still unverified: production AdSense-loader-to-CMP chain on a network where the real ad host is reachable; actual EU IP targeting; non-US/non-EU real IP behavior; ad inventory/fill (intentionally not requested). These are not converted to a pass by CMP-only tests or simulation. Keep formal serving disabled until remaining activation checks are resolved.
- Final regression: enabled production build and exactly-nine-units export check passed; three-locale 375px/1440px mocked browser run passed all 23 cases with zero real Google requests. Disabled production rebuild passed lint/type checking and the 489-file no-ad check. The maintained live runner passed mobile EU refusal, desktop EU consent/revocation, US natural opt-out with saved status after reload, and GPC. All independent test browsers closed. Final artifacts and restored local development preview keep real ad serving disabled. Code fixes remain local; nothing was pushed or deployed in this verification task.

### Simplified test follow-up

- User requested a simpler test of the three manual article-end placements, without further dashboard or DevTools work. Fresh fetch again found local HEAD 9f44be2 one commit ahead and no remote-only changes; retained existing runtime corrections and unrelated .workbuddy/.
- Re-ran the inert local preview: 18 cases (three guides, three locales, 390px/1365px) passed, the excluded guide had no placement, no horizontal overflow and zero attempted advertising requests. Inspected the mobile and desktop screenshots.
- Re-ran maintained real-CMP checks: mobile EU refusal left initialization counter at zero; US natural opt-out survived reload with status 3 and zero subsequent initializations. The real ad library and ad destinations remained blocked; these are CMP-only checks.
- Node gate regression and the 489-file disabled-export check passed again. All independent test browsers closed; existing local inert preview remains at http://127.0.0.1:3016. No application changes, new commit, push, dashboard changes, deployment or formal ad activation in this follow-up. The complete AdSense transport and actual EU IP coverage remain unverified as noted above.

## November 11 - request pause and separated loading candidate

### Baseline and evidence

- Fresh fetch: HEAD 9f44be2, origin/main 36dcb4e, local-only 1 / remote-only 0. Preserved all earlier changes and unrelated .workbuddy/. User authorized continued local fixes/testing, not activation or deployment.
- Google AdSense tag and its show_ads_impl.js dependency now return HTTP 200. A clean AdSense-tag test, with no manual slot, attempted /pagead/ads before any CMP API appeared; the test blocked it. This does not establish the dashboard Auto ads setting.
- Official request-pause documentation: https://support.google.com/adsense/answer/7670312?hl=en-GB . Set pauseAdRequests=1 before ad requests and 0 to resume. Google explicitly says scripts still load, existing Google cookies may be read, no new cookies are set by this paused technique, and associated existing-cookie data is not used for serving/measurement. This is not a zero-contact guarantee.
- Pausing the AdSense tag alone prevented requests but did not start a CMP in the clean test.

### Local candidate

- Start with global pauseAdRequests=1, then load the publisher-specific Funding Choices tag. Only after existing TCF/GPP/DATA_READY checks allow a placement does the runtime insert the AdSense tag. It remains paused until that tag loads and current consent is rechecked. Unknown, refusal, revocation or errors set the global pause back to 1 as well as hiding/removing units.
- The global pause also protects against an AdSense tag inserted by Google's CMP itself, which was observed during the US opt-out flow.
- Independent Funding Choices loading successfully serves this publisher's real messages. However, the official independent-tag help page https://support.google.com/adsense/answer/11575177 documents ad blocking recovery tagging; it does not explicitly recommend this two-stage combination for AdSense European messages. Do not describe this candidate as a specifically documented Google EU integration, or mark production readiness established solely by these tests.
- Default production flag remains off; no push, deploy, dashboard change or account action.

### Checks and precise boundaries

- No-network regression passes, including delayed library load, withdrawal while loading, ad-library failure, regional states and global request pause. Existing disabled export still passes the 489-HTML no-ad check; this is an existing output check, not a fresh full production build for this revision.
- Maintained real-service runner now uses the unmodified production transport order. Default mode stubs advertising JS; --ad-library allows the actual adsbygoogle.js/show_ads_impl.js while replacing only the site's manual unit submission with a local counter. Dummy ins elements have no publisher or slot attributes. Advertising/measurement requests are intercepted and aborted; no actual inventory or impressions were tested.
- Passed real-service cases: European mobile refusal (no ad-library request, no blocked request attempt); European desktop/mobile consent then revocation (initial counter 0, consent counter 1, final hidden and pause requested 1); natural US allowed then opt-out/reload (counter 1 before exit, status 3 and counter 0 after reload); GPC (zero external requests).
- Google replaces pauseAdRequests with a setter-only API after library loading. Tests therefore record the actual setter assignment and confirm the setter exists instead of interpreting an undefined property read as a failed pause.
- The mobile consent run attempted gen_204 only while pause was released after consent. US opt-out attempted lidar.js while paused; that auxiliary request was blocked by the test. No blanket claim of zero Google traffic after withdrawal.
- Evidence: OS temp aniimo-cmp-gdpr-refuse-mobile.json, aniimo-cmp-gdpr-consent-revoke-desktop.json, aniimo-cmp-gdpr-consent-revoke-mobile.json, aniimo-cmp-natural-us-out-reload-desktop.json and aniimo-cmp-gpc-initial-desktop.json.
- European tests still use Google's debug parameter, not an EU IP. Other regions and actual inventory/fill remain unverified. Every independent Chrome instance was closed in finally.

## November 11 - production-page validation and release decision

- User authorized completing local integration and validation; publication remains a separate authorization. Fresh fetch again found HEAD 9f44be2 one ahead of origin/main 36dcb4e, no remote-only commits, with the existing dirty work preserved.
- Retained the tested separated Google-message/AdSense loading order and Google's documented pauseAdRequests control. The absence of a help article specifically recommending this exact combination is a documentation limitation, not evidence of failure or a Google prohibition. No claim of Google certification or legal assurance is made. Engineering judgment: the local implementation is suitable for a limited rollout once current dashboard status and publication authorization are confirmed.
- Fresh ADSENSE_ENABLED=1 production build passed compilation, lint and type checking. Export validation found exactly 9 units (3 guides x 3 locales), none on other pages.
- Passed 23 actual-export browser cases using local mocks at 375px/1440px, in en/zh-Hans/zh-Hant: placement bounds, no horizontal overflow, footer revocation, unknown/refused/opted-out/GPC and loader failure. Inspected mobile Chinese and desktop English screenshots. These tests made no real Google requests.
- Added --site to the maintained real-service runner. It serves the actual out/ HTML/CSS/Next assets under intercepted production URLs, then uses real Google CMP and AdSense JS. Only the site's manual unit submission is replaced with a local counter and every delivery/measurement request remains blocked. This validates actual page hydration/entrypoints rather than only synthetic HTML.
- Passed actual production-page real-service cases: European mobile refusal (no ad-library request), European desktop consent and footer revocation (counter 0 to 1, then hidden/paused), natural US allowed then opt-out/reload (counter 1 to 0 on reload, saved status 3, paused). No page errors or horizontal overflow. Reports/screenshots have -site suffix in the OS temp directory.
- Fresh ADSENSE_ENABLED=0 production build also passed compilation, lint and types. Rollback is to remove ADSENSE_ENABLED or set it to 0 and rebuild/redeploy; it disables both message/ad bootstrap and all units. The closing local output is this disabled build.
- Remaining release actions: account owner confirms Auto ads is still off and dashboard has no serving restriction/action preventing launch; deploy only after authorization, then verify live release content and privacy entrypoints without clicking ads or repeatedly refreshing inventory.
- Real EU IP geotargeting and actual inventory/fill are still outside these tests. Runtime consent unknown/errors remain blocked, and failures should be monitored during any limited release. All independent browsers close in finally; no push, deploy or dashboard change in this task.

## November 11 - authorized initial production rollout

- The user supplied current dashboard screenshots showing no policy-center issues, no visible blocking alert on the account home page, and one active European and one active US message. User explicitly chose to keep Auto ads off.
- User then explicitly authorized commit and deployment. This authorizes only the prepared three-guide manual article-end rollout; no AdSense dashboard changes or account/payment operations.
- Fresh pre-release fetch: local HEAD 9f44be2 one ahead of origin/main 36dcb4e, remote-only zero. Existing runtime corrections and tests included; unrelated .workbuddy/ excluded.
- Production builds now default to the approved enabled state. Development remains inert. Set ADSENSE_ENABLED=0 and rebuild/redeploy to disable all placements and the advertising/CMP bootstrap; unsetting this variable now restores the enabled production default. Unknown explicit values remain disabled.
- The runtime still refuses off-host/staging execution and GPC, pauses globally until consent gates and library readiness permit, and serves manual units only on the three allowlisted guides. Auto ads is a separate dashboard setting and was not changed by this release.
