# November patch and event task update - November 6, 2026

## Baseline and reader tasks

Fetched origin before editing: main and origin/main at 73f6936, 0/0 divergence.
Unrelated untracked .workbuddy/ preserved. Eight existing guides improved;
no new URLs, ads settings, review submissions or indexing changes.

Readers need to match a symptom to the right patch, distinguish an intentional
unlink from account recovery, select the correct event window/action, and avoid
unnecessary facility spending. Reuse static tables and links, not new tools.

## Evidence

Read official full announcement bodies via the Steam app 4126040 news API on
November 6. Source snapshots kept in /tmp/aniimo-news-2026-11-06-update.json.

- November 5, 06:24:15 UTC: Patch Notes-v1.1.3880756.0
  https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1848664643339992
- October 27 announcement for October 29 Part Two:
  https://steamcommunity.com/games/4126040/announcements/detail/687520329382238609

Only official announcement items establish delivered adjustments. Publication
date, source access date and editorial date stay distinct; old observations are
not relabelled as fresh playtests. No current-client testing is claimed.

## Added value

- Troubleshooting: seven symptom groups with post-update checks. November 5
  unintended water-column climb differs from October 30 quest-block fixes.
  An achievement fix does not prove retroactive payout; PS5 invitation fix does
  not prove every cross-platform pairing. Old patch context retained below.
- Three account-related pages share one current explanation of Steam/Epic
  Settings > Account Settings unlink, followed by dated background. The full
  decision table is only in account safety; crossplay and dispatch link to it.
  Old absolute
  no-unlink guidance is scoped to UID mismatch, lost progress or recovery in
  flight. Console unlink, relink limits, cross-save and purchases stay unknown.
- Event page retains the working server rotation selector. Full three-phase
  tables distinguish Who's That Aniimo, Prismana Photo and Glamour Star. Times
  use the announcement's fixed server offsets; a Beijing-time Royalby example
  makes their different absolute starts concrete. Static photo/contest tables
  do not pretend to monitor availability. Distinct-type progress, one special
  photo reward per phase, and single-claim contest rewards remain separate.
- Home: level 1 facility Season Recipes differs from RV level 10 entry. Missing
  furniture display is not proof of compensation or a need to buy replacements.
- Egg Heist: wind-interaction fix does not invent a new strategy or win condition.
- Holo-Battle: Holo Training Ace achievement differs from manual star rewards.

## Validation

- Final production build including TypeScript and lint passed (483 entries).
- New November patch regression checks all eight guides in three languages:
  Article dateModified, patch evidence before old references, account route
  ordering, full event phase dates and valid internal routes.
- Part Two, guide-task, consolidation, content-quality, Sparkling decision
  and SEO checks passed. Static site remains 474 localized pages and 208
  sitemap URLs. Stale tests that depended on incidental source-access date
  strings now check Article dateModified or the relevant citation explicitly.
- Final independent headless browser passed 48 page/viewport combinations:
  eight articles, three locales, 390px and 1365px widths. No document overflow,
  duplicate anchors, broken article outline links or runtime exceptions.
  Existing server selector checked for APAC and Americas. Chinese screenshots
  inspected for issues, account safety and events; wide tables use existing
  horizontally scrollable regions.
- Eight Chinese pages also checked with JavaScript disabled; the static task
  tables remain readable. No game client or player account was used.
- Browser closed in finally. Temporary static preview stopped; user Chrome
  was not used. git diff --check passed.

## Limits

No current contest theme, high-score outfit, scent recipe, conversion ratio,
production benchmark, loot sample or new species record is invented. Current
Wiki expansion remains a separate evidence task. Publication authorized November
6. Pre-release fetch confirms main and origin/main at 73f6936 (0/0), with a fresh
production build and focused regressions before publishing through the existing
Cloudflare Pages Git integration. Post-release verification is recorded separately.
