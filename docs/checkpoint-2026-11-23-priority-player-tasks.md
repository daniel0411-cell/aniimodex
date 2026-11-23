# November 23: priority player tasks

## Baseline and authorization

User approved implementing the priority topics from the preceding 20-item
backlog. Continued authorized commit/push/deploy workflow. Read AGENTS.md and
content-quality-standard.md. Main and fetched origin/main both `71ef3d1`,
0 local-only / 0 remote-only; clean working tree at start. GitHub fetch used
the command-local GitHub proxy override, with no persistent configuration change.

## Player tasks completed

Updated existing destinations in English, Simplified and Traditional Chinese;
no new public URL was created.

1. Holo Sim reward audit: stage first clears, Trial first clears, Trial weekly
   rewards and Training Index are distinct. Element/difficulty/week/claim
   checks prevent treating an old first clear as a current weekly claim.
2. Interlink triage: compare independent path bests and next milestone before
   repeating; manually claim reached rewards; separate current timer/result
   known issues from the previously announced manual-claim fix.
3. Jaguaraun and Redrock preparation: check rank/level, actual targets and
   own event window; recipe reward is not a direct Aniimo grant; Redrock
   multiplayer special events are unavailable under the published rules.
4. November 27 photo/ecology split: photo Student II versus ecology Student I;
   keep eligible old album photos, match exact forms, and prefer inspecting
   unrecorded eligible ecology targets because their first-survey points double.
5. November 30 catch-up lookup: four forms mapped to their announced regions,
   with separate server windows. Does not extrapolate simultaneous form return
   to concentrated-spawn replay or refreshed first-three-Nurture bonuses.
6. Egg Heist goal sheet: eggs/species, missing collectible, rank/stars and
   learning Chaos each require a different pre-queue and result check. No
   invented route, guaranteed collectible or cross-rank scoring rule.

Homepage/shared event plan expanded from four to six cards: Jaguaraun now has
its own date/entry instead of being buried in the photo card; form catch-up
has a separate card. Desktop grid has three columns for two complete rows.
Holo guide title/subtitle now accurately cover Sim and Interlink, and its
substantive update date is November 23. Existing date assertion updated.

## Evidence

Read in background in-app browser on November 23, starting with a focused
Google search and verifying primary sources directly. Search snippets and
AI overviews were not treated as evidence.

- https://www.aniimo.com/newslist/detail/100244 — October 27 publication.
  Directly read Holo Sim/Interlink sections, all four form-return regions,
  separate weekend bonuses, photo and Idyll Ecological Investigation gates.
  Ecology explicitly requires Student I and awards doubled first-survey
  points for targets not yet in the player's Index. Repeated catches give
  no additional points and exact listed forms are required.
- https://www.aniimo.com/newslist/detail/100298 — November 9 publication for
  November 12 update. Directly checked Redrock post-November-26 opening,
  Lv40, all-day solo versus daily multiplayer, prep of party/buffs, track
  mission rewards and Redrock multiplayer special-event exclusion.
- https://www.aniimo.com/newslist/detail/100275 — October 29 header, rolling
  body includes November 17/13/12 entries. Directly checked current listed
  Interlink timer/result symptoms and November 17 Egg Heist reward distinctions.
- https://www.reddit.com/r/Aniimo/comments/1y3c2kc/holo_battle_sim_weekly_reward/
  Reread November 23, displayed 2 hours old at this observation. Player claims
  Trial also collects lower-tier rewards. This is attributed as community
  feedback and explicitly unverified; no fixed reward quantity is published.
- Jaguaraun postponement retains the already directly verified official post:
  https://x.com/Aniimo_EN/status/2122102376811090146 — November 16 publication,
  read November 23 during preceding batch. Not reread or redated this batch.
- Egg Heist goals use previously read detailed community question as problem
  discovery, not mechanics authority:
  https://www.reddit.com/r/Aniimo/comments/1y3590g/chaos_egg_heist_advice/
  See preceding handbook/orb backlog checkpoint for observation scope.

## Evidence limits and follow-up

No current client, Alpha lineup, race route or drop sample was tested. No new
GSC/Bing measurement. Exact Jaguaraun sequence/materials, Redrock shortcuts,
phase-three target list, automatic lower-tier Holo claims, exact weekly payout,
Sim reset hour and concentrated catch-up spawn replay remain unverified.
Update these only when primary or reproducible evidence is available.

Validation and publication status are recorded below before release.

## Validation and publication

- Final `npm run build` passed after all copy changes (495 static outputs).
- Content quality, November patch, Part 2, guide-consolidation and advertising
  checks passed. Advertising inventory and consent behavior were not changed.
- Final SEO audit passed: 486 audited pages, 211 sitemap URLs.
- Three-locale rendered guide/homepage assertions and `git diff --check` passed.
- Browser QA: English Holo reward categories; Simplified event gates and
  double points; Traditional Egg goal table; mobile 390px without page overflow
  (wide tables scroll inside their containers); final homepage six entries and
  desktop three-column grid. Temporary viewport override reset.
- Pre-publication fetch: `HEAD` and `origin/main` still `71ef3d1`, 0/0.
- Release will use the existing Git-triggered production deployment. Production
  visibility must be checked after push; a successful build alone is not proof
  of deployment.

### Production verification

Content commit `3133248` pushed successfully to main. Existing Git-triggered
production deployment became visible at `https://aniimodex.com` on November 23.
Verified with the background browser:

- English Holo: new Trial/Interlink title, four reward categories and triage.
- Simplified event tracker: Student I ecology gate, double first-survey points,
  and four-form catch-up scope warning.
- Traditional Egg Heist: goal decision table and Chaos resource-budget row.
- Simplified homepage: new late-November heading, dedicated catch-up card and
  separate photo/ecology gates.

This verifies production content visibility, not a traffic or indexing uplift.
