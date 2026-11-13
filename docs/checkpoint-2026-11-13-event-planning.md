# November 13 event planning and reset decisions

## Scope and baseline

- User authorized implementing the revised update plan and publishing it.
- Fresh fetch: clean `main`, HEAD/upstream `9e81e9b`, local-only/remote-only 0/0.
- Visitor task: identify the next event boundary, prepare the right prerequisite,
  distinguish server time from Beijing time, and decide whether an eligible
  Whirlbite reset is appropriate before its deadline.
- Improve the existing homepage and two guides; no new content URLs or species
  imports. Advertising and privacy behavior are unchanged.

## Evidence observed through the browser on November 13, 2026

- Google search for official November updates led to the official news center.
- https://www.aniimo.com/newslist — top visible entry remains the November 12
  update notice; this is an observation of the list, not proof no other notice exists.
- https://www.aniimo.com/newslist/detail/100298 — published November 9.
  Rechecked photo phase 1/2 boundary, Student II, regular/special rewards,
  Dash Lv.40 and modes, Gullcove November 19 10:00 by server, and Whirlbite
  eligibility, refund/removal scope and November 27 04:00 by server.
- https://www.aniimo.com/newslist/detail/100244 — published October 27.
  Focused recheck of Fantasy Resonance: November 20 04:00 through December 10
  03:59 by server, Student I, photo/skill/catching quests, all quests required
  for the exclusive offering recipe. No verified ingredient list.
- https://wiki.aniimo.com/ — visible index contains region-specific duplicate
  numbers (e.g. Emberpup and Reefish #001). Number alone is not identity.
  This was a scoped index inspection, not a full diff or database synchronization.
- https://wiki.aniimo.com/item/004/basic-form — Inferlupa still has no displayed
  habitat section. Unknown remains unknown.
- https://wiki.aniimo.com/item/031/basic-form — Eko still lists Cloudreach Falls
  and Forest of Falling Stars, already incorporated November 12.
  No species dates or snapshot were refreshed from these scoped observations.

## Changes and added value

- Shared, dated planning cards for photo phase change November 16, Gullcove
  November 19, Fantasy Resonance November 20, and the later reset deadline.
- Move the homepage update entry above progression cards; each milestone opens
  the existing relevant guide. Explicit server offsets and dated-plan scope.
- Event guide starts with the plan, next actions and November 16 phase-change
  conversions: Apac 03:59/04:00, Europe 11:59/12:00, Americas 15:59/16:00 UTC+8.
- Reset guide adds November 27 cutoff conversions: Apac 04:00, Europe 12:00,
  Americas 16:00 UTC+8. Editorial pre-reset checklist explicitly separates
  returned resources from removed progression; no unverified menu walkthrough.
- Only the two materially changed guides receive November 13 modified dates.
  Earlier sources and individual database fields retain their scoped check dates.

## Validation and release

- `npm run build`: 495 static routes; compilation, lint and types passed.
- Content quality, November patch, S1 Part 2, event/Dex, advertising
  `--export-enabled` and SEO checks passed (486 pages, 211 sitemap URLs).
- Updated existing checks for the two modified dates and the intentional
  replacement of the homepage Royalby shortcut with event/reset guide entries.
- Independently calculated the new photo/reset UTC+8 conversions for offsets
  +8, 0 and -4 and compared them with the published values.
- Browser inspected English desktop homepage/guide, simplified Chinese mobile
  homepage/reset guide and traditional Chinese event guide. At 390px viewport,
  document/client widths both 375px; wide guide tables scroll within their
  region (480px content inside 341px region), without document overflow.
- Clicked the traditional Chinese Gullcove homepage card and verified the
  existing localized event guide opened with the new plan.
- `git diff --check` passed. Release fetch required normal sandbox escalation
  to write FETCH_HEAD; succeeded, upstream unchanged at 9e81e9b (0/0).
- Commit/push and live deployment verification follow this checkpoint.

## Remaining gaps

- No in-game testing or live event availability claim; no fastest Dash team,
  track terrain strategy, current photo target, recipe ingredients or reset menu.
- No new GSC/Bing evidence gathered; this update does not establish a traffic
  cause or promise indexing/revenue improvement.
- Full Wiki identity reconciliation remains separate; no blind snapshot import.
