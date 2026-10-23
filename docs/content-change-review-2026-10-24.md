# Content change review, October 24

## Baseline and scope

Fetched origin before review. main and origin/main both pointed to
524307062be56c47af67e1876021c0474c8165f4, with zero commits either side.
Reviewed the pending contact page, guide attribution, catch explanations,
footer/policy navigation, sitemap and three locale files. Preserved useful
changes and corrected unsupported claims before release.

## Findings and fixes

- High: new catch copy claimed BREAK x2, a 20% HP cap, backstrike x1.3 and
  zero chance for alert/leaving. These contradict the existing September
  dataset and/or current official disclosure. Replaced with sourced scope
  explanations, a reproducible conditional example (33.6% versus 46.2%),
  and explicit unknowns instead of field-tested optimization claims.
- High: attribution asserted reverse engineering, universal manual/client
  testing and guaranteed reliability without evidence. Replaced the invented
  author credentials with editorial/source notes and correction links.
- Medium: three new mailboxes and a 24-48-hour reply commitment were not
  verified. Asked the owner asynchronously. Until confirmed, use the existing
  published privacy/copyright channels with mailto links and no reply promise.
  End-to-end delivery for even the existing addresses was not tested.
- Medium: unchanged About/Privacy/Terms content was assigned fresh dates.
  Restored About's date and used the existing policy content dates in sitemap.
  Catch gets its actual substantive update date. Localized policy navigation.
- Removed unrelated JSON formatting churn while preserving all JSON values.

## Current primary-source observation

Read rendered official page through background browser on 2026-10-24:
https://www.aniimo.com/zh-tw/formula-multipliers

The source has no displayed publication date. Observed ordinary field/battle
formulas, boss formula = 6% x cube, five region rows, HP rows 0/5/10/50/80/90/100,
backstrike x1.5 excluding the big white ball, and lowest-penalty/otherwise-highest
status selection. It does not currently publish individual status coefficients,
the old tower row, or the older defeated-target formulation. Story encounters
can force success/failure. This differs materially from the September snapshot.

The old calculator and tables are now collapsed under a dated historical-model
label with a prominent explanation of mismatches. Its data and calculations
are not silently relabelled as current. Migrating the calculator to a model
that propagates unpublished status values remains a separate unresolved task;
historical results must not be used as current encounter predictions.

## Verification

Production build (495 entries), existing content-quality, guide-consolidation,
review-fixes, index-recovery and SEO checks passed. SEO output: 486 HTML pages,
220 sitemap URLs. Browser release checks cover the historical disclosure toggle,
FAQ, localized contact mail links/navigation, mobile overflow and guide notes.
Record exact deployed commit/check and production observations after publishing.
This release does not request AdSense review or claim approval/indexing gains.
