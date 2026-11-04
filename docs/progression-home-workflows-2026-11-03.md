# Progression and Home task workflows - November 3, 2026

## Baseline and scope

Fetched origin: main and origin/main both 0e246c1, divergence 0/0.
Preserved unrelated untracked .workbuddy/. No new article URLs, indexability,
AdSense or advertising settings changed. This batch addresses the historical
Harvest Gathering landing page first, then the two prioritized existing guides.

## Evidence

Re-read official Steam announcement bodies through the Steam news API:
https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=4126040&count=30&maxlength=0

The latest official item returned remains the October 30 patch. Core source:
https://steamcommunity.com/games/4126040/announcements/detail/687520329382238609
Published October 27 for the October 29 update. No new November patch is implied.

Confirmed separate story/event gates; Trailblazer II and III cap changes;
main-element Evolution Item for Ascension after level 60; level 65 for Stellar
Tier 6; Season Tags for any-region Dewdrop Crystal. Confirmed RV level 10 plus
Act Seven entry, staged Home activities, named old-item conversions, seasonal
shop removal and a future return without a date. No conversion ratios supplied.

## Reader value

- Harvest page: historical title/description, current Home guide link before
  historical schedule, no unverified seven-piece furniture recipe.
- Growth: four goal-specific decision paths distinguish title, individual
  Ascension, map story and survey eligibility, with checks before spending.
- Home: four symptom-specific checks distinguish season eligibility, stage
  timers, converted items and removed shop stock. Existing item conversion
  table remains the destination lookup.
- All three languages use the existing static table/link renderer. Flow arrows
  express check order within each branch, not a mandatory progression across
  unrelated systems. No invented client UI, playtest, map or screenshot.

## Validation

- Production build, TypeScript and lint passed (483 generated entries).
- Part Two regression, guide-task, content-quality and SEO checks passed;
  474 localized pages and 208 sitemap URLs remain unchanged.
- The regression now checks current Home navigation before historical content,
  localized branch headings and actual Article dateModified in JSON-LD.
- Independent headless browser passed all 18 combinations (three articles,
  three locales, widths 390 and 1365): no document overflow, valid outline
  anchors, correct branch row count and mobile keyboard table scrolling.
- Chinese mobile/desktop screenshots inspected. Wide tables retain the existing
  horizontally scrollable, keyboard-focusable region; no client JavaScript
  is required for the added text, links or tables.
- Browser closed in finally; temporary preview server stopped. User Chrome
  was not opened. git diff --check passed.

Release authorized November 4, 2026. Pre-release fetch still shows main and
origin/main at 0e246c1 (0/0); production build and focused checks are repeated
before publishing through the existing Cloudflare Pages Git integration.
Post-deployment verification is recorded separately after the release completes.

## Remaining limits

No current-client access or account entitlement verification. Full story chains,
exact material quantities, conversion ratios and stage-specific amendments need
additional evidence. No review resubmission or approval prediction.
