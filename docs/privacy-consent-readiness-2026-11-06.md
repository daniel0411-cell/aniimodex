# Privacy and consent readiness — November 6, 2026

## Scope and baseline

User requested privacy policy and regional consent work while explicitly keeping
real ad units disabled. Fresh fetch: main 6c363c6, upstream difference 0/0.
Preserved existing local ad-placeholder changes and unrelated .workbuddy/.
No account credentials, payment data or account security changes required.

## Evidence

Official Google pages read on November 6:
- https://support.google.com/adsense/answer/13554116?hl=en
  Certified TCF CMP required for personalized ads in EEA, UK and Switzerland;
  Google's Privacy & messaging European regulations solution is certified.
- https://support.google.com/adsense/answer/7670013?hl=en
  Consent, disclosures and identification of selected ad technology providers.
- https://support.google.com/adsense/answer/1348695?hl=en
  Advertising cookie disclosures, personalization choices and vendor links.
- https://support.google.com/adsense/answer/9560818?hl=en
  US states: publisher assessment, RDP, GPP and ad partner controls.

Before this release, a read-only download of live privacy HTML confirmed the
existing AdSense loader was still present. No live scripts were executed and no ad
requests were made. No analytics/CMP loader was present in that HTML. Hosting
dashboard settings and the AdSense Privacy & messaging dashboard were not
accessible or verified. The user subsequently confirmed no regional messages
had been created and chose to defer CMP setup. Do not treat source inspection
as a dashboard audit.

## Implementation

- Remove AdSense loader in every build; retain publisher verification metadata
  and ads.txt. No formal ad unit integration and no fake consent banner.
- Three localized privacy policies explicitly separate current no-ad operation
  from future ad-launch conditions; do not claim a CMP is currently active.
- Disclose Cloudflare delivery, direct publisher-CDN images, email contact and
  necessary preferences/security processing. No invented exact log retention.
- Add working policy/resource links and footer link to /privacy/#privacy-choices.
  This is an explanatory/contact section, not a simulated consent control.
- Update only privacy sitemap modification date; preserve article dates.

The user subsequently authorized committing and deploying the policy and
loader-removal changes. Advertising placeholders remain local, excluded from
this release. No payment/account-verification settings are in scope.

## Before a future ad launch

1. Confirm the public operator identity/contact and actual provider retention
   arrangements; do not invent legal entity, address or time periods.
2. Verify hosting dashboard analytics/injections and any new third-party tags.
3. Prefer Google AdSense > Privacy & messaging > European regulations for a
   certified CMP. Bind aniimodex.com and its localized privacy URLs, confirm the
   actual supported message languages and fallback, and review selected vendors.
4. Configure consent, refusal and purpose/vendor management; provide an effective
   persistent way to reopen/withdraw. Do not treat browsing as consent or use
   My Ad Center as a substitute for a site's consent controls.
5. Implement the current documented CMP tag/integration only once its dashboard
   configuration is known. Do not insert an assumed loader/TCF implementation.
   Keep ad requests blocked without a valid applicable choice; account for
   delayed/failed CMP loading. Non-personalized ads are not a consent exemption.
6. Assess US state law applicability and any required opt-out/GPC handling,
   GPP/RDP signaling and vendor coverage. A European CMP alone is insufficient.
7. Test consent/refusal/manage/reopen/withdraw paths and region/language behavior,
   with ad-network requests blocked during local tests. Do not infer region
   behavior from viewport width, interface language or a plain VPN assumption.
8. Review/update the policy when actual ads, vendors or analytics are activated.

No CMP message was created/published in the account and no live consent flow was
verified in this task. No guarantee of comprehensive legal compliance is made.

## Validation

Build and run node scripts/check-privacy-no-ads.cjs. It checks all exported HTML
for absent ad/CMP/analytics loaders and ad units/development placeholders,
three policy anchors/footer links, resource URLs and preserved ownership metadata.
Browser validation covers localized privacy pages, footer navigation and mobile/
desktop layouts with external requests blocked. Browser closed after testing.

Completed: production build (483 generation entries), lint/type checks and
check-privacy-no-ads (477 exported HTML files). Browser checks passed all 12
language/width combinations at 360/390/768/1365px, including footer navigation
from an actual guide, anchor clearance below the sticky header and linked
contact/resources. Zero external requests, runtime errors or cookies observed
in the local production preview. Screenshots visually inspected on mobile and
desktop. This does not verify hosting-platform injections or a live CMP.
