# S1 Part 2 quality checkpoint - November 1, 2026

## Baseline and reader tasks

Fetched origin before implementation. main and origin/main both at `38fd58e`,
zero local-only/remote-only commits. Preserved the October 28 uncommitted Dex
reading notes, overview corrections and unrelated `.workbuddy/` directory.
This batch implements the urgent first phase of the November 1 direction review:
choose the correct event window, distinguish eligibility from bugs, identify a
dated fix and understand the site's actual Dex coverage.

## Evidence

Read official Steam news API bodies on November 1:
https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=4126040&count=30&maxlength=0

- October 27 S1 Part 2 notice for the October 29 update:
  https://steamcommunity.com/games/4126040/announcements/detail/687520329382238609
- October 30 v1.1.3857679.0 fixes:
  https://steamcommunity.com/games/4126040/announcements/detail/686395063661496366
- Developer-pinned issue thread observed in the same day's direction research:
  https://steamcommunity.com/app/4126040/discussions/0/562546073917327130/

New registry records preserve publication versus observation dates. Older
September/October source dates remain unchanged. No live-client testing, spawn
rate, coordinate or performance benchmark is claimed.

## Scope and added value

- Existing Prismana URL now prioritizes five November/December windows with
  Pouchwisp, Royalby, Jeburst and Glameep, their paired areas, Student II and
  regional clock requirements. Native server selection uses the three fixed
  offsets explicitly printed in the announcement, not device timezone/DST.
- Schedule status uses device time after hydration, refreshes every 30 seconds,
  and expires at the next 04:00 boundary after the stated 03:59 end minute. It
  does not claim server monitoring or automatic knowledge of future amendments.
  Before JavaScript initializes, dates remain visible with a check-clock label.
- Event guidance distinguishes Vein Abundance, Who's That Aniimo and Prismana
  Photo. Added the form/location eligibility checks, not just a copied calendar.
  Energy growth +50% is explicitly not a 50% catch rate. Historical Melloblum,
  Waleetle and Journey Chronicles windows remain under a historical heading.
- Existing issue URL now starts with current-version symptom gathering and
  October 30 patch-specific actions: Waterfall Climb, mysterious mechanism,
  Gachapus photo recognition, Dewple Waterfall Form, chests, models and settings.
  Loading hotfix evidence is separated from universal device performance claims.
  Private support report checklist includes privacy cautions. Older official
  FAQ and Outpost recovery are retained after the current answer, scoped as
  history. Old patch/feedback blocks no longer prepend the current issue page.
- Dex title, description, introduction, cross-tool link and shared snapshot
  notice now describe 86 indexed October 23 Basic Form records, not all current
  creatures. S1 Part 2 additions and alternate-form values remain incomplete.
  No automatic 86+51 total or unverified new species pages were generated.
- Existing guide/list/home related links consume the same guide getter, so the
  updated titles and subtitles propagate without duplicate content definitions
  in every caller. Historical definitions are retained but superseded by the
  explicit Part 2 getter for the two changed slugs.

## Validation

- Production build including lint and types passed (486 build entries).
- New check-part-two-content.cjs covers server offsets, inclusive start and
  exclusive end boundaries, server differences at one absolute time, future
  expiry, initial unknown status, three-locale output, source links, current
  before historical ordering and explicit coverage language.
- Existing data, review fixes, current catch, editorial review, consolidation,
  content quality, index recovery, Bing recovery, October feedback, support
  content, guide-task, Dex reading-note and SEO checks passed. Updated the old
  October-event check to require replacement November schedule rather than a
  no-replacement lead. Historical event expiry checks remain.
- Independent headless browser: 1365x900 and 390x844, all three locales, all
  server options. Controlled clock at November 1 20:00Z confirms APAC active
  while Europe/Americas remain upcoming; December 8 confirms all five ended.
  These are test times, not reported live event availability.
- Verified keyboard table scrolling, no document horizontal overflow, event to
  issue navigation and absence of hydration/runtime exceptions. Desktop/mobile
  screenshots visually inspected. Remote assets blocked during local interaction
  tests, so production image rendering is not re-certified by this test.
- git diff --check passed. Temporary browser closes in finally; user Chrome
  is not accessed. Local preview is stopped after validation.

## Remaining work

Changes are local, not committed/deployed; no indexing or AdSense submission.
Next phase: map-entry versus rank/level progression checklist, Egg Heist mode
comparison, and Sparkling Hue/resource decision table, each only after its
specific prerequisites and effects are verified. Complete current Wiki coverage
requires identity/form reconciliation, not extrapolation from announcement
counts. Email delivery, image-use basis and regional advertising consent remain
unverified. No article count or word count is an AdSense approval guarantee.
