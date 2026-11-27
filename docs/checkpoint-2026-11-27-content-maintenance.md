# November 27: event timing and claim-path maintenance

## Baseline and authorization

User invoked site-content-maintenance to implement evidence-backed existing
analysis and deliver under the project's established release authorization.
Read AGENTS.md, content-quality-standard.md and November 23/25 audit/release
records. Initial local main c6b6ca7 was 0 local-only / 18 remote-only after
fresh fetch; fast-forwarded to 94f4a75. Untracked .workbuddy/ preserved.
GitHub's Cloudflare check for 94f4a75 succeeded. The formal homepage returned
the November 25 plan, the pre-maintenance call to action and Whirlbite reminder;
deployment identity and actual visible content were checked separately.

Pre-release fetch found one new remote commit, 4f79a2b (helpful-image publishing
standard and assets). Its paths did not overlap these dirty content files;
fast-forwarded without stashing or discarding work. Read the new AGENTS.md
image rule and image-publishing-standard.md, retained all incoming work, and
re-ran the production build including its integrated image gate.

## Selected reader tasks and changes

| Reader question | Existing owner | Evidence and concrete benefit | Acceptance |
|---|---|---|---|
| Why is the Carnival gift not available at 10:00? | Event tracker and free-to-play guide | Current official notice gives 14:00 per server. Correct the four-hour error and provide Beijing equivalents for all three servers, including next-day Americas start. | Both guides show 14:00, 22:00 and next-day 02:00; preserve server offsets. |
| Which rewards are daily and which require spending? | Same guides | Separate event-page daily claims, free Shop > Pack gift and Starlight Echoes spend tiers. No daily gift-refresh or missing-collectible guarantee. | Three distinct claim paths, free box contents retained, no recommendation to spend. |
| What should I check today instead of yesterday's maintenance? | Homepage and shared event plan | Replace old maintenance card with Home Shop exchange; retain current collection/recipe/return tasks and clarify past Redrock opening as announced, not tested. | Card links resolve in all locales; no maintenance-preparation card. |
| Has Whirlbite reset closed on my server? | Homepage and event table, linking existing issue guide | November 27 04:00 each server means Beijing 04:00/12:00/16:00. At research time not every server had reached the cutoff. | Conditional expired-window warning, no blanket all-regions closure or unverified extension. |
| Does November 23 Snapshots changeover determine today's photo target? | Event tracker | Who's That Aniimo and ecological phase 3 instead use November 27–December 4. Distinguish their gates from Snapshots and preserve unknown target roster. | Correct phase dates, Student II/I, album/duplicate checks and working server selector. |

English, Simplified and Traditional Chinese updated together. No new public
URL. Only the two changed guides receive November 27 modification dates and
scoped source references. Homepage sitemap lastmod advances for its substantive
planning revision. Titles/descriptions/canonicals stay with existing owner roles.
The existing #prismana-schedule anchor remains. Generated section-index anchors
can move when article blocks change; no stable named anchor was removed.
No advertising configuration, account setting or calculator was changed.
No new figure selected: these tasks need exact readable times and claim-path
tables, and no genuine new in-game panels were available. Avoid fabricated
reward UI and decorative artwork. Incoming image metadata/assets are retained.

## Primary evidence and dated extracts

Read the public server-rendered HTML on November 27; no client gameplay or
event-panel access claimed. Temporary full downloads were parsed excluding
script/style data; the material excerpts below preserve this observation
even if the rolling official URLs later change. Existing November 25 evidence
records keep their original dates.

1. https://www.aniimo.com/newslist/detail/100312
   Heading: November 26 Update Notice, publication November 23.

   Carnival and Starlight Echoes both list:

   > "Aniimo-Europe" 2026/11/27 14:00 ~ 2026/12/01 12:00 UTC+0
   > "Aniimo-Americas" 2026/11/27 14:00 ~ 2026/12/01 12:00 UTC-4
   > "Aniimo-Apac" 2026/11/27 14:00 ~ 2026/12/01 12:00 UTC+8

   > During the event, claim rewards such as appearance discount vouchers
   > and random treasure chests on the event page each day.
   > After logging in during the event, go to Shop > Pack to claim a free
   > Aniimo Gratitude Gift Box.

   Box: Collectible Blind Box x1, Wonder Sugar Crystal x100, Vein Essence x5.
   Spending tiers count Lumin Crystals spent during the event. Home Shop
   Resource Exchange lists November 27 04:00–December 2 03:59 per server.
   No daily refresh for the gift, exact exchange stock/prices or optimal spend
   is established. Earlier site's 10:00 value is corrected; no claim is made
   about when or whether Google/the publisher changed the source.

2. https://www.aniimo.com/newslist/detail/100244
   Part 2 notice, publication October 27. Both Who's That Aniimo and
   Idyll Ecological Investigation list phase 3:

   > 2026/11/27 04:00 ~ 2026/12/4 03:59

   Each explicitly uses Europe UTC+0 / Americas UTC-4 / Apac UTC+8.
   Photo requires Student II; ecology Student I. Existing qualifying album
   photos allowed; Holo-Battle Sim/Sanctum excluded. Ecology grants points
   only for a target's first survey; repeats do not add points.

3. https://www.aniimo.com/newslist/detail/100298
   November 12 notice, published November 9. Whirlbite reset:

   > [Reset Period] 2026/11/12 04:00 ~ 2026/11/27 04:00

   All three rows specify their own UTC+0 / UTC-4 / UTC+8. Does not establish
   an extension or the exact current client's reset screen.

## Validation and release

- Next production build passed, 495 static outputs including framework routes.
- Content-quality, guide-consolidation, November patch, Part Two and event/Dex
  checks passed. Two existing date assertions updated only for the changed
  event/free-to-play articles, not to conceal a missing content requirement.
- SEO audit passed: 486 pages, 211 sitemap URLs. No indexing submission or
  ranking/revenue result inferred. No new GSC/Bing data accessed.
- Desktop/mobile navigation and source-specific time conversions checked before
  release; final browser and production results recorded below when complete.

Final local results: integrated image checks passed (12 records, 18 guide
images, 306 Dex pages). All listed content checks and SEO passed again after
incoming image work. Six explicit Carnival start/end offset conversions passed.
Browser QA passed six viewport/locale combinations at 390px and 1440px: home
card navigation, two owner articles, Home exchange destination, expanded mobile
TOC, unobscured anchor heading after smooth scrolling settles, Americas server
selection, and no document-wide overflow or page errors. Mobile tables retain
the existing horizontal-scroll container. Inspected phone Chinese and desktop
English screenshots. Test harness initially needed the real mobile disclosure,
trailing-slash-optional client navigation and scroll-completion waits; those
were test sequencing issues, not hidden product failures. All external ad and
tracking requests blocked; independent browsers closed.

## Evidence-gated work and next triggers

Do not fabricate phase-3 target forms, shop prices/stock, complete Jaguaraun
task chains/ingredients, tested Redrock routes, S2 carryover or fixed release
dates for announced mobility/Credits changes. Egg Heist article restructuring
remains a separate larger task; this batch prioritizes the consequential timing
error and current claim paths rather than touching its whole historical body.

Review on an official timing correction or reader report; next scheduled
content change is the November 30 four-form return, then Carnival's December 1
12:00 server deadline and Home exchange December 2 03:59. Exact target lists
need an actual panel or equivalent primary evidence. No automation created.

## Production result

- Retained incoming documentation-only commit 4d8adae before publication.
  Last pre-push fetch compared 0/0. Content commit 93dbac8 pushed to main.
- Cloudflare Pages succeeded: deployment
  0818be7e-69c1-44b2-933b-b8e36715c231. Its dedicated
  https://0818be7e.aniimodex.pages.dev/en/guide/is-aniimo-free-to-play/
  returned the corrected start and November 27 date.
- Formal https://aniimodex.com showed the November 27 plan and 14:00 card.
  Live browser repeated all six viewport/locale combinations: home-to-event
  navigation, both claim guides, Home exchange destination, unobscured TOC
  headings, server selector and contained page width. No page errors.
- Results saved in docs/verification/2026-11-27-content-maintenance.json;
  English desktop and Simplified phone screenshots in docs/screenshots/.
  All non-site requests blocked, no test ad inventory/clicks. Browsers closed.
- Confirms published reader paths, not gameplay, indexing, CTR, traffic or
  revenue improvement. No indexing submitted.
