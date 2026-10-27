# Current catch calculator checkpoint - October 27, 2026

## Scope and visitor task

Continue the local content-quality work after the guide consolidation batch.
Help a player compare published catch factors without presenting unknown inputs
as a precise species probability. No new routes, dependencies or live-game
testing claims. Work remains local; no commit, push, deployment, indexing or
AdSense review submission was performed.

Baseline: main and fetched origin/main both `75217cc` (0 local-only / 0
remote-only commits). Existing local consolidation work and `.workbuddy/` were
preserved.

## Evidence

Read the rendered official disclosure in the browser on October 27:
https://www.aniimo.com/zh-tw/formula-multipliers

This is a source-observation date, not an official publication date. Added a
separate source-registry record rather than rewriting the September snapshot.

- Outside battle: base x cube x level x backstrike x status.
- In battle: base x cube x level x HP x status.
- Boss: 6% x cube; ordinary-target inputs do not enter this formula.
- Five region rows, level-difference table and seven discrete HP rows.
- Cube reference includes super and legendary entries; the x6 white-ball row
  applies to nourishment-gathered targets, not a claimed mass-outbreak rule.
- Backstrike x1.5 excludes the big white ball, not all non-standard cubes.
- Status stacking selects the lowest coefficient if a penalty exists, otherwise
  the highest. Individual status coefficients are not listed.
- Scripted encounters can force success or failure.

## Implementation

Removed the obsolete defeated scenario, tower row, numeric status table and
standard-cube-only backstrike restriction. The current calculator is visible
instead of hidden as a historical model.

The default result is unknown. Ordinary calculations require an explicit region
row assumption, a known player bonus (blank is not zero), valid levels and an
explicit neutral-status assumption. Unknown active statuses block the numerical
result. Every scenario, including guaranteed cubes, requires confirmation that
the target is catchable and no scripted override applies. Invalid relevant
inputs return unknown. Percentages are conditional arithmetic, not measured
species success rates. Results are capped at 100%; HP interpolation is absent.

Updated the reference table, verification claim, sitemap date and English,
Simplified Chinese and Traditional Chinese copy. Historical guide records were
not relabeled as newly tested mechanics.

## Validation

- Production build, lint/type checks: passed, 486 build entries.
- `node scripts/check-current-catch.cjs`: passed, including invalid/unknown
  inputs, status selection, boss independence and guarantee eligibility.
- Data evidence, review fixes, editorial review, guide consolidation, content
  quality, index recovery, Bing recovery and October feedback checks: passed.
- SEO audit: passed, 477 HTML pages, 211 sitemap URLs.
- `git diff --check`: passed.
- Desktop browser: default unknown; confirmed model 56%; battle examples 33.6%
  and 46.2%; switching status back to unknown removes the number; boss 6%;
  legendary cube unknown without eligibility, 100% after confirmation.
- Chinese mobile at 390 x 844: no horizontal overflow (375px client and scroll
  widths after scrollbar); advanced backstrike 63%; white ball 56% with disabled
  backstrike. Reference-table text was visually inspected.

## Remaining gaps

No per-status numerical effects can be calculated from the current disclosure.
The region row and neutral status remain user assumptions, not encounter
identification. Scripted outcomes are not inferred automatically. No independent
gameplay experiments were conducted. No change guarantees AdSense approval;
further work should improve high-intent guide tasks and evidence boundaries,
not add near-duplicate pages or request review merely because code changes.
