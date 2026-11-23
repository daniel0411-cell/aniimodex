# November 23: complete verified late-November content gaps

## Scope and baseline

User authorized completing the previously researched content backlog; ongoing
project instructions authorize publishing completed content. Implemented the
first evidence-ready batch from checkpoint-2026-11-21-content-directions.md,
not all fifteen proposals. No new URLs, gameplay tests, fabricated task chains,
probabilities or performance rankings.

Started on main at 9b7b0b9. Only the November 21 research checkpoint was
untracked. Initial fetch failed due to a stopped local proxy. A command-local
GitHub-specific proxy override (`git -c http.https://github.com/.proxy= fetch
--prune origin`) succeeded: HEAD/upstream 0 local-only / 0 remote-only.
Repeated pre-release fetch also returned 0/0. No persistent proxy settings
were changed; no existing edits were discarded.

## Sources

- Read https://www.aniimo.com/newslist/detail/100275 in the background in-app
  browser on November 23. Article header October 29, latest body entry
  November 17. Verified November 13 Home/Dash fixes, November 17 Egg Heist
  rewards/handling changes and the still-listed known issues.
- Used November 21 browser readings of official 100244 and 100298 from the
  research checkpoint for event dates, photo rules and Redrock opening.
  New source records preserve those observation dates. Existing older source
  dates and historical patch sections remain intact.

## Implemented value

- Egg Heist: choice reward versus weekly shop blind box, separate 200-star
  requirement, collection decision, unknown prices/quotas/probabilities;
  Giga-Egg jump/knockback adjustment versus future object-interference work.
  Cross-rank entry and scoring are explicitly separate/unverified.
- Home: symptom-to-check table for delivery, refresh, points and furniture;
  separate missing animation from guaranteed new quests; do not repeatedly
  spend coins to diagnose. Furniture reissue remains promised, not delivered.
- Known issues: separate Thundercloud movement fix from failed transformation;
  preserve Interlink timer issues. Explicitly disclose conflicting Astra
  visibility entries instead of declaring it universally fixed. Current
  title/lead no longer prioritize the historical November 12 maintenance.
- Shared homepage/event plan: November 23 Glameep rotation and separate
  Snapshots phase 3, November 26 Redrock (no invented hour), November 27
  Whirlbite deadline and photo/ecological preparation. Existing album/form
  checks help avoid unnecessary retakes and duplicate targets.
- All changes in English, Simplified Chinese and Traditional Chinese; four
  materially changed guides dated November 23. No change to acquisition
  probabilities, consent gates, ad scope, or data snapshot freshness.

## Validation

Restored missing local dependencies using npm install --ignore-scripts
--package-lock=false; no manifest or lockfile change. Build uses Next14.2.35.
Dependency audit reported six existing-range advisories (one moderate, four
high, one critical); dependency upgrades are outside this content batch.

Production build, including lint/type checks and 495 static pages, passed.
Content quality, consolidation, advertising/CMP, November patch, event Dex,
Part 2 and SEO scripts passed. SEO audit: 486 pages, 211 sitemap URLs.
Updated two existing date assertions for four substantive guide updates.
Inspected rendered HTML for all four guides and homepage in three locales:
reward distinctions, milestones, source links, modified dates and internal
routes. Final rebuild passed after one English scope clarification. Background
browser inspection confirmed desktop and 390px mobile Egg Heist layout;
tables retain their horizontal scroll container. Viewport override reset.
Release and live verification are recorded below after execution.

## Remaining evidence gaps

Exact Jaguaraun task chain/materials, rank/difficulty result rules, complete
Prismana egg pools and rerun dates, crop mutation effects/rates, tested race
routes, Home footprints and precise progression material quantities still
need current game-panel or reproducible evidence. No claim these are done.
Growth/handbook/form decision aids remain later editorial batches; existing
Whirlbite checklist and detailed Snapshots rules were retained rather than
repackaged as new articles.

## Release

Content committed as ba6e034 and pushed to main. Follow-up label correction
changes the shared homepage planning label from its historical November13
check date to the November23 plan date, distinct from source observation.
Git integration deployment is verified from production content after push.
