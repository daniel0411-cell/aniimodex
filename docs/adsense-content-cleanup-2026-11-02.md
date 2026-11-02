# Content cleanup - November 2, 2026

## Authorization and baseline

User requested optimization after the AdSense readiness audit. This batch
addresses the concrete audit findings; no AdSense submission or new approval
claim. Fresh fetch: main and origin/main both a39118b, zero local-only and
remote-only commits. Preserved unrelated .workbuddy/.

## Reader tasks and implementation

- Twine overview now answers how to select a documented mobility ability.
  Four examples use the existing shared mobility index, with actual member
  counts and up to three members sorted by official number. The workflow
  explains union selection versus a creature possessing all selected abilities,
  reset behavior, missing data, and combat skill names versus mobility evidence.
  Direct links lead to the lookup, party tool, Celestis and ability directory.
- Consolidated the overlapping launch coverage tracker into the existing
  official-aniimo-dex-status URL. The surviving guide maps concrete questions to
  available answers and evidence limits, rather than keeping a stale work queue.
  Removed old output and sitemap entry through published:false; eight explicit
  301 rules cover localized and unlocalized paths with both slash variants.
  Related-guide mapping prevents internal links to the retired URL.
- Home guide starts with Magical Wonder Night entry and clocks, old currency
  and seed conversions, new crop and stage checks, blueprint changes and
  separate RV20 vehicle eligibility. Historical October15 source remains dated.
- Holo-Battle Interlink guide now covers independent paths, solo/team/matching,
  current mechanics, per-path star progress, manual claims and the preparation-
  phase-only AI replacement statement. Its announcement segment does not specify
  per-server timezone, so the current server timer takes priority over an
  unsupported universal UTC+8 assumption.
- Homepage moves growth/mode/item task entries directly after metrics. The
  event-calendar link uses the current guide; old October15 patch is retained
  in a collapsed native details element. Snapshot date is explicitly October23
  and incomplete for Part2. Actual homepage and guide-list edits update only
  their sitemap dates; source and snapshot dates are not relabelled November2.

## Evidence

Reused the official bodies read in the November2 audit and existing snapshots:

- October27 announcement for October29 update:
  https://steamcommunity.com/games/4126040/announcements/detail/687520329382238609
- Steam news API body saved during the audit:
  https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=4126040&count=30&maxlength=0
- October23 Basic Form and mobility snapshot with shared derived index.
- October27 official capture disclosure already registered in data/sources.ts.

Existing registry observation dates remain unchanged; November2 is the material
editorial change date. No client gameplay, seed conversion payout, blueprint
purchase, terrain route, current Alpha roster or optimal build is claimed.
Part2 species and alternate-form attributes remain incomplete. No arbitrary
article count, mass noindex or content-score gate was added for AdSense.

## Validation

Production build passed, including lint/type checks and 483 generated entries.
All 14 existing regression/audit scripts passed. SEO audit reports 474 HTML
pages and 208 sitemap URLs. git diff --check passed.

Independent headless Chromium reviewed the homepage and four updated guides
in all three locales at 1365x900 and 390x844. No document overflow or page
runtime errors; section anchors exist and the historical homepage disclosure
opens by keyboard. Screenshots of the Chinese homepage and Home table were
visually inspected. Twine single selection, two-selection union and reset
matched the guide's explanation. The test browser was closed in finally;
the user's Chrome was not used. Local preview: http://127.0.0.1:4183/zh-Hans/.

Redirect rules passed static regression checks; the local Python preview does
not implement Cloudflare redirects, and production redirects remain unverified
until deployment. No new gameplay tests or account-side AdSense checks were
performed. This improves the audited stale/overlapping content but does not
establish approval or complete current-game data coverage.
The user subsequently authorized committing and deploying this cleanup, followed
by a full-site audit. Pre-publish fetch again confirmed a39118b with zero
local-only or remote-only commits. Release verification is recorded separately.
No indexing submission or AdSense review is authorized by this deployment task.
