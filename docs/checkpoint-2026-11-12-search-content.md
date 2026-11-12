# Search decline and November 12 content update

## Baseline and task

Requested: inspect signed-in Chrome GSC and Bing, diagnose the recent decline,
and improve useful current content. Initial clean main 36dcb4e was two commits
behind GitHub. Fetched and fast-forwarded to c6b6ca7 before editing. Preserve
the consent-gated advertising integration introduced by those two commits.

Visitor tasks: select the correct racing mode and track, meet photo reward
requirements without wasted travel, distinguish maintenance from a device bug,
and understand Whirlbite reset eligibility and removed progression effects.
Improve three existing guide URLs and the homepage, with all three locales.

## Search observations, November 12

Use complete weeks November 2-8 versus October 26-November 1, 2026. Search
reports lag; incomplete November 10-12 totals are not a comparable baseline.
Private account identifiers and browser sessions are excluded from this note.

GSC domain aniimodex.com:

- Clicks 1,060 versus 1,715: -38.2%.
- Impressions approximately 21.3K versus 39.5K: approximately -46% (UI rounded).
- CTR 5.0% versus 4.3%; average position 6.4 versus 6.4.
- Brand query aniimodex: 358 versus 581 clicks, 913 versus 1,448 impressions.
- English homepage 625 versus 931 clicks; locations 62 versus 142; Dex 35
  versus 104; troubleshooting 19 versus 125 (2,105 versus 8,069 impressions).
- Event tracker grew 24 to 91 clicks and 476 to 913 impressions.
- Sitemap successful, last read November 11, 211 discovered URLs.
- Index report last updated November 6: indexed 436, excluded 411. Exclusions
  include redirects 233, canonical alternatives 132, crawled not indexed 21,
  discovered not indexed 13, duplicates 9, noindex 1, 404 2. These are a stale
  snapshot, not an established trend or proof of a new indexing collapse.
- Historical 404 /abilities already has both slash and non-slash 301 rules to
  /en/abilities/ in public/_redirects. /cdn-cgi/l/email-protection is not given
  an unrelated redirect to conceal its historical 404.

Bing search performance daily chart, same complete weeks (data through Nov 8):

- Prior daily clicks 10,13,18,36,46,30,33 = 186.
- Current daily clicks 20,13,9,13,9,7,5 = 76: -59.1%.
- Prior daily impressions 441,500,525,1.1K,973,944,1K: roughly 5,483.
- Current daily impressions 650,714,707,907,774,809,572 = 5,133.
- Prior rounded impressions imply only about -6.4% exposure, and approximate
  CTR 3.39% to 1.48%. This is derived from rounded daily labels, not exact
  exported totals. Do not attribute Bing's entire decline to lower demand.
- Site Explorer showed indexed 484, errors 0, warnings 1, excluded 30.
  Its six-month folder totals are not used as weekly performance metrics.

Google's aggregate rank stability, improved CTR and reduced brand exposure
support an exposure decline, but do not prove the cause is demand alone.
Aggregate rank can hide page/query changes. No penalty diagnosis is established.
Bing needs continued page/query and CTR observation; the reports do not provide
evidence of a broad crawl outage. Advertising enabled November 10 cannot explain
the full decline in the preceding complete comparison week.

## Primary evidence and changes

Public research used the in-app browser, starting from a search engine and
opening the official notice. Signed-in reports used the user's Chrome session.

Source: https://www.aniimo.com/newslist/detail/100298
Title: Departure with the Wind: Part 2 - November 12 Update Notice.
Published November 9, observed November 12, 2026.

- Replace earlier Aniimo Go preview with Aniimo Dash. Greenfield opens after
  the update, Gullcove November 19 10:00 per server, Redrock after November 26
  update. All servers end at the same instant, despite different displayed
  dates/hours. Solo all day; multiplayer daily 18:00-24:00, up to eight. The
  multiplayer paragraph does not explicitly name its timezone.
- Prismana Snapshots phase 1 starts after the update, not 04:00. Five regular
  Sparkling types count toward completion; Dazzling/Shadow are excluded from
  those five. Distinguish each special type's first photo reward from the
  shared once-per-phase extra reward. Do not infer a photo target from rotation.
- Add shared maintenance window, platform-specific next checks, and Whirlbite
  reset window November 12 04:00-November 27 04:00 per server. Eligibility is
  pre-balance Basic/Prismana Whirlbite, not all individuals or all species.
- Add Egg Heist reporting, enemy Giga-Egg names, Team Mode Umbral cap scope
  and three specific fixes. Exact caps remain unknown.
- Correct mobile margin adjustment's former future-plan status. Historical
  patch evidence retains its dates. Homepage links to events and maintenance.
- Update only affected page modification dates; Dex observations remain old.

The earlier October 27 source remains for unchanged Fantasy Resonance and
rotation windows: https://www.aniimo.com/newslist/detail/100244 .
No gameplay benchmarks, live maintenance completion, optimal racing team,
reset menu path, exact Umbral caps or unannounced target is invented. The new
notice's compensation eligibility oddly refers to Season 2; omit entitlement
claims instead of silently translating that into a November 12 cutoff.

## Validation and release

Passed production build (495 generated routes), lint/types, content quality,
Dex reading notes, event/Dex regression, guide consolidation, Part 2, November
patch, support content and SEO audit (486 pages, 211 sitemap URLs). New checks
cover superseded racing time, three server deadlines, photo exclusions/shared
reward, November 12 source links and Team Mode scope. Fixed two existing raw
HTML assertions to account for the homepage title's HTML-escaped ampersand.

Advertising runtime and enabled-export checks passed: exactly nine placements
on the previously approved three guides, none added elsewhere. The historical
check-privacy-no-ads.cjs fails on those expected enabled placements; it applies
to a disabled build and is not a valid release gate for the enabled baseline.
No advertising settings changed and no live ads requested for local testing.

Browser checked homepage and all three guides in all locales at 1365x900 and
390x844 (24 page/viewport combinations): no page-level horizontal overflow,
current titles and source links present. Inspected desktop/mobile screenshots
and exercised the Prismana server selector to Americas; its heading/offset
updated correctly. Temporary viewport override reset afterward.

Pre-release fetch found HEAD and origin/main both c6b6ca7, 0 local-only / 0
remote-only commits; git diff --check passed. Commit/push and live verification
are the remaining release steps at this checkpoint.

Do not describe publication as proof of recovered traffic. Recompare complete
weeks and inspect declining page/query groups after search reports catch up.
