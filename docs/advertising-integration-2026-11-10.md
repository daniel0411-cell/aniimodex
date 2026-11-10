# Advertising integration checkpoint - November 10, 2026

## Scope and baseline

- Fresh fetch found local 3630f73 behind origin/main by three commits; safely fast-forwarded to 36dcb4e, retaining existing local guide-ad preview work and unrelated .workbuddy/.
- Prepare one responsive end-of-article unit (3760991389, publisher ca-pub-2321309842883439) on three guides, in all three locales: aniimo-prismana-potential-breeding-guide, aniimo-rv-homeland-guide, aniimo-version-1-1-update.
- This checkpoint does not authorize activation, dashboard changes, push or deployment. Auto ads remain a dashboard setting and must stay off.

## Switches and behavior

- Default build: no advertising bootstrap or units. ADSENSE_ENABLED=1 enables the prepared integration only in a production build. Changing a Cloudflare build variable requires a rebuild; removing it and rebuilding is the rollback.
- Development: AD_LAYOUT_PREVIEW=1 shows inert layout placeholders only. Even ADSENSE_ENABLED=1 cannot enable the integration in development.
- Browser runtime only loads the AdSense tag on aniimodex.com/www.aniimodex.com, never local/staging hosts; browsers exposing navigator.globalPrivacyControl=true skip the tag entirely.
- Published Google Privacy & messaging messages are deployed through the AdSense tag. Loading this tag itself contacts Google before unit initialization; this is not a promise of zero Google network traffic before consent.
- Unit initialization requires an explicit loaded TCF result (GDPR does not apply, or completed consent with purposes 1/3/4 and Google vendor 755), plus a known initial US opt-out status. Unknown/error/absent signals stay blocked. Applicable US regions additionally require the GPP API.
- Google remains responsible for interpreting complete CMP signals and actual ad eligibility. This additional gate is intentionally conservative and may suppress otherwise eligible limited ads.
- EU Privacy choices opens showRevocationMessage through callbackQueue when applicable; otherwise the link opens the localized policy/contact section. US retains Google's own Do Not Sell or Share entrypoint (no overrideDnsLink).
- After a US GPP section change/error, this document stops initializing units until reload. Revocation removes any initialized unit from display; already sent requests cannot be undone. A removed unit is not recreated in that same placement during the current mount.
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
