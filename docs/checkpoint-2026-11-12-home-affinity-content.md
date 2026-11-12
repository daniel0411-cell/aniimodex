# Home, Affinity and event content update - November 12, 2026

## Baseline and scope

- Started on clean main at 90b247223e2fd54b52ac63c1c067575be60ebbf4, equal to fetched origin/main (0 local-only, 0 remote-only commits).
- Fetched again before publishing; origin/main remained equal to HEAD.
- Improved three existing guides in English, Simplified Chinese and Traditional Chinese. No new URLs or advertising placements.
- Visitor tasks: choose a supported Affinity activity, distinguish RV access/display/work problems, understand Snapshot counting, and separate marker or claim failures from unmet requirements.

## Evidence

- Primary source: https://www.aniimo.com/newslist/detail/100298
- Published November 9, 2026; observed November 12, 2026 through the background in-app browser after a browser search for the November 12 official update.
- This is the already published November 12 update notice, not a newly discovered later announcement.
- Source names Affinity routes and individual daily/weekly limits, Homeland phase changes, RV/furniture fixes, Lumin Marking and challenge-marker discrepancies, and Holo-Battle Interlink manual star-reward claiming.
- Snapshot rules distinguish five different regular Sparkling types from Dazzling/Shadow first-photo rewards and the once-per-phase extra Special Snapshot reward.

## Added value

- Home guide: task-based Affinity comparison and spending checks; separates unsupported rates, offline rules and unlock levels from published mechanics. RV and furniture symptom table gives information to retain for follow-up. Reconciled historical staged-opening wording with the November 12 change.
- Event guide: A, A, B worked example explains why three photos can count as two different regular types; distinguishes regular completion from special rewards. A/B are illustrative labels, not claimed event targets.
- Known issues: compares actual acquisition/challenge progress with stale map markers and separates earned star thresholds from reward claiming failures.
- Updated Home guide date and source metadata; synchronized two existing date assertions with the substantive update.

## Validation

- Production build passed: 495 static pages.
- Passed: check-november-patch.cjs, check-part-two-content.cjs, check-content-quality.cjs, seo-audit.mjs, check-advertising.cjs --export-enabled, git diff --check.
- SEO audit: 486 audited pages, 211 sitemap URLs. Advertising export: existing nine units only.
- Browser QA: three guides x three locales at 1440x1000 and 390x844. Correct page headings, rendered tables and official source links; no document-level horizontal overflow. Mobile screenshot inspected.

## Remaining gaps

- No gameplay or device tests. Announced fixes do not establish that maintenance ended or that each affected client is fixed.
- Affinity exact caps, rates, reset times, offline gain and unlock thresholds remain unverified. No fastest farming route or general damage bonus is asserted.
- No exact furniture-set cost or new menu paths were invented.
- No new traffic attribution claim: the preceding traffic diagnosis remains in checkpoint-2026-11-12-habitats-traffic.md. Content improvements alone cannot establish a recovery in search demand or clicks.
- Production deployment and live browser verification are completed after the commit and reported in the task close-out.
