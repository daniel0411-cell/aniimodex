# November 23 next content audit

## Scope and baseline

- Request: continue finding useful optimizations after the late-November update.
- Fetched origin successfully for this task; main and origin/main both at
  `3ada725`, comparison 0 local-only / 0 remote-only; working tree was clean.
- Read the content quality standard and inspected the active guide selection,
  rendered-content assembly and source-date logic. This is an editorial audit,
  not a new GSC/Bing measurement or proof of changed search demand.
- No site code or content changed in this audit; no deployment required.

## Newly checked primary evidence

Observed through the background in-app browser on 2026-11-23:

- https://www.aniimo.com/newslist
  Visible list includes November 12 notice, rolling Known Issues & Fixes and
  Part 2 notice. This list alone cannot prove there are no newer edits inside
  existing notices.
- https://www.aniimo.com/newslist/detail/100244
  Published 2026-10-27. Re-read the Companion Handbook and Prismana Orb sections.
  Free Standard rewards include Hypnyto Egg and Random Perfect Aniimo Egg;
  Advanced includes Perfect Potential Prismana Hypnyto Egg and Hypnyto Soul.
  Collector adds benefits including 10 handbook levels. Weekly quests reset
  Monday 04:00; quests complete once, no weekly EXP cap, season-series
  prerequisites apply, and all quests close at handbook end. Institute Guide
  Daily Activity also grants EXP. The current handbook's Prismana egg is
  explicitly announced to return in Home in S3; this is not a universal rerun
  promise. Handbook deadlines differ by server and carry explicit UTC offsets.
  The adjusted existing Orb description explicitly requires an Aniimo whose
  Prismana Form has been unlocked; it retains Acquired Potential, Mutation and
  Personality. Separate added regional/global Orb descriptions do not explain
  every eligibility detail. Do not infer that every Orb bypasses the unlock.

## Prioritized work

1. **P1: explain Orb eligibility before players consume resources.**
   `data/part-two-guides.ts` item table currently advises checking the exact item
   but omits the adjusted existing Orb's explicit unlocked-form prerequisite.
   Add a small decision table: existing adjusted Orb, Whisperwake Isles variant,
   global item; distinguish announced geographic scope from confirmed unlock
   requirements. Preserve ambiguity where the notice does not specify it.
   Link from the forms guide; do not publish an unverified species hatch pool
   or assert that an Orb unlocks a missed event form.
2. **P1: make the Hypnyto handbook actionable.**
   Add a concise free / Advanced / Collector comparison to the existing
   free-to-play guide, then link it from the event tracker. Add a catch-up
   checklist: server end time, current level and remaining EXP, reward level
   shown in-game, remaining weekly/season prerequisites and daily sources.
   Separate quest reset from EXP cap. No guaranteed completion calculation
   without verified per-level requirements and a player's remaining tasks;
   no assumed price or recommendation to purchase.
3. **P1: scope verification labels accurately.**
   In `app/[locale]/guide/[slug]/page.tsx`, `sourceCheckedAt` is the maximum
   accessedAt among sources. The header labels this both Sources checked and
   Last verified beside Verified against official sources. One recently read
   source cannot establish a full-page re-audit. Replace the blanket claim
   with a scoped source notice, keep substantive page-update dates separate,
   and leave individual source dates visible. Check all three locales and
   the existing special download notices before implementing.
4. **P2: consolidate Egg Heist guidance around player decisions.**
   The active Part 2 body prepends late-November rewards, November 12 blocks
   and fix blocks before the numbered ruleset guide. Group current entry,
   victory, reward and recovery rules together; move historical fixes into a
   clearly dated section. Preserve useful current warnings, source links and
   anchors. Avoid repeating the same patch in multiple lead sections.

## Evidence-gated backlog

- Jaguaraun complete quest chain/materials: require game-panel or equivalent
  primary evidence; offering recipe unlock is not a guaranteed direct catch.
- Missed Fulmintis/Inferlupa forms and complete Egg Heist pools: community
  questions establish a user problem, not current availability or odds.
- Cross-rank Egg Heist entry versus rank points: require current rules/results.
- Crop mutation probabilities, optimized Dash routes and comparative builds:
  require reproducible evidence; do not derive rankings from ability names.
- Level 60–70 guidance is already a substantial decision table. No extra
  expansion proposed merely to increase words or page count.

## Release checks for follow-up implementation

Implement in active data providers rather than overridden message bodies;
update three locales and affected source mappings. Verify complete/unknown
eligibility cases, server-date wording, rendered source labels and mobile
tables. Run build and relevant content checks once. Before publishing, fetch
again and compare upstream; verify live deployment separately.
