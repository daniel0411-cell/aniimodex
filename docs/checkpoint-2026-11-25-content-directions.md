# November 25 content directions

## Baseline and scope

Read AGENTS.md and content-quality-standard.md. Clean main at `5839064`.
Fetched origin with command-local GitHub proxy override; HEAD/upstream 0/0.
Research and repository gap inspection only. No site content changed, no push
or deployment performed. No new GSC/Bing data or search volume measurement.

## Direct browser evidence

Observed November 25, 2026. Public research in background in-app browser,
starting with Google query `Aniimo November 25 2026 update`; search snippets
and AI overview were not used as factual authority.

A. https://www.aniimo.com/newslist/detail/100312
Published November 23: November 26 maintenance/update announcement. Read
complete rendered body. Planned maintenance Europe 06:00-11:00 UTC+0,
Americas 02:00-07:00 UTC-4, Apac 14:00-19:00 UTC+8. Can finish early/late;
restart client afterward. Glimmer x500; registration before S2 eligibility.

B. https://x.com/Aniimo_EN/status/2125409675294494977
Displayed November 25 official Dev Feedback. Read full nine-question article.
Current rules, announced changes and upcoming-version promises must be labeled
separately. No client gameplay or numerical balance testing performed.

C. https://www.aniimo.com/newslist
Latest visible list includes A; list inspection is not an audit of every
rolling notice or every official social post.

D. https://www.reddit.com/r/Aniimo/new/
Observed recent feed titles and visible bodies on November 25; not a full
comment review, demand survey or verified mechanics evidence:
- https://www.reddit.com/r/Aniimo/comments/1y4ztjl/why_the_level_lock/
  Title/gallery only, displayed 19m.
- https://www.reddit.com/r/Aniimo/comments/1y4zo4t/im_missing_something/
  Visible body asks why Ascension still does not allow leveling beyond 60; 28m.
- https://www.reddit.com/r/Aniimo/comments/1y4z7uj/heist_season_2_item_rollover/
  Title/gallery only; 55m. Item carryover not established.
- https://www.reddit.com/r/Aniimo/comments/1y4y28u/dev_feedback_nov_25/
  Feed links directly to B; 2h.
- https://www.reddit.com/r/Aniimo/comments/1y4y283/a_few_aniimo_are_getting_exploration_slot_buffs/
  Title/image only; 2h. B supplies actual future-plan scope.
- https://www.reddit.com/r/Aniimo/comments/1y4ubou/same_sparkling/
  Visible complaint about duplicate hue rerolls; 5h. Not a probability sample.
- https://www.reddit.com/r/Aniimo/comments/1y4u2eg/egg_heist_collectables/
  Visible player report of missing Evercrystal despite high rank; 5h.
- https://www.reddit.com/r/Aniimo/comments/1y4uws5/anyone_else_having_problems_importing_combo_codes/
  Title/video only; 5h. No reproduced bug.
- https://www.reddit.com/r/Aniimo/comments/1y4uot9/steamdeck_controller_issue/
  Visible report of changed PS5 touchpad functions on Steam Deck; 5h.
  One report, no confirmed universal regression or tested fix.

## Prioritized implementation backlog

Improve existing destinations in three locales. Counts below are player tasks,
not a target number of new URLs. Prior November 23 preparation is already live;
these additions should supply newly available answers rather than rephrase it.

| Priority | Task and added value | Destination / evidence / limitation |
|---|---|---|
| P0 | Correct fair-PVP equipment explanation; compare retained vs standardized vs disabled properties | Egg Heist + team composition. B Q5 retains species/form/appearance/skills; standardizes level/personality/acquired potential/resonance/capability; retains Held Items at uniform level and base stats with core/advanced effects active; disables core skill enhancements. Existing `data/part-two-guides.ts` has two blanket no-configured-equipment statements (team row and Egg row) requiring correction. Distinguish bag consumables from Held Items. |
| P1 | New 45/50 progression and island unlock decision table | Version guide + getting started. A: final Breezy quest Lv45 Wayfarer II; island story Lv50 Wayfarer III plus prior A New Journey; check quest-name distinctions in source. Reduced Lv41-54 Safari requirements and mail compensation, no invented amounts. |
| P1 | Revised Chapter of Breezy/Whisperwake promotion handoff | Version guide. A: Chapter of Breezy 6 can continue island story; island unlocks Whisperwake chapter; after first chapter return to Breezy6 for promotion until Grade I Trailblazer. Inspect and replace older blanket Trailblazer I unlock wording. Keep 60+ cap/Ascension distinct. |
| P1 | Renewal Pigment vs existing pigment duplicates | Existing item/forms decision guides. A: guarantees one Sparkling Pigment not already owned, excludes Shadow/Dazzling. Do not infer exact price, stock, every individual/form eligibility or inventory-full behavior. |
| P1 | Egg Heist collectible rate-up scope and missing-item decision | Egg guide. A: after update-Dec9 23:59 each server clock, Team Mode all difficulties, common/prized collectibles from chest or Umbral defeats +100% drop rate. Not all loot doubled, not guaranteed Evercrystal. Prismatic Iris Dark added to Chaos. B distinguishes 200-star selection, weekly random box, later reruns. |
| P1 | Jaguaraun actual announced daily loop and Fantasy Tokens | Event + Dex. A: daily04 appearances, investigation tasks; friends' catching counts in Companion Mode; all tasks for recipe, designated task each round for one Fantasy Token; one token for past recipe at vendor, actual listings required. Exact tasks, route, ingredients still unavailable. |
| P1 | Gracewing reset eligibility, losses/refunds, correct global deadline | Known issues/growth. A lists Basic/Sea of Flowers/Nighttime/Mountain Woods obtained before balance; refunds EXP/Star Up/Capability/Capafruit and removes effects. Europe Dec10 20:00 UTC0 / Americas Dec10 16:00 UTC-4 / Apac Dec11 04:00 UTC+8 = same instant. Do not reuse Whirlbite local04 pattern. No invented balance percentages. |
| P1 | Annual Carnival free claim versus spending rewards | Event/currency. A: Nov27 10:00-Dec1 12:00 each server, Student I; daily rewards; Shop>Pack free box with collectible blindbox1, SugarCrystal100, VeinEssence5; Starlight Echoes cumulative Lumin spend is separate. Costs and tiers need actual panels. |
| P1 | Maintenance versus event time reference | Homepage/event/support. A: Nov26 planned14-19 Beijing across all servers, not guaranteed opening19; free claim, Home shop, collectible boost and Gracewing use different deadlines. Use existing server selector. |
| P1 | Solo Dash weekly task/reward plan | Dash/event. A four new tasks: group likes10, group itemuses10, solo completion1, solo A+1. Only last two are solo; B says solo Racing Coins source, no amount. Shop Prismana Eggs, prices/limits unknown. Retain Redrock pending-route caveat. |
| P2 | Return to Idyll eligibility and reward ladder | Multiplayer/beginner. A Student I +14d absent +42d since activation; ends04 on15th day; 14/30d login tiers;1350tokens choice egg; shared benefits20/20/10% nonstacking. Do not reinterpret catchchance+10% as+10 percentage points or plug into calculator without formula. |
| P2 | Home/RV changed unlock and practical chores | Home guide. A largest RV and skinchange Lv16; rain automatically waters; floor snapping; Nov27 04-Dec2 03:59 server-local ResourceExchange limited stock. Need actual prices/stock before recommendations. |
| P2 | Home Contribution efficiency and solo event progress | Home/season guide. B season furniture Comfort converts at3x Contribution, RVskin on personal track, core rewards obtainable solo; home Park order submission expected1.1.2, verify client before calling available. No invented shopping list or time guarantee. |
| P2 | Revised map/boss level lookup | Locations/version guide. A five regions and six named Alpha/Omega starting levels; preserve starting-level scope, not all spawns. No coordinates or new creature stats inferred. |
| P2 | Current versus planned mobility comparison | Mobility/team guide. B upcoming Prismana Hypnyto/Ekrim flightLv3, no exact release version. Add planned note, do not replace current BasicForm snapshot or list Jeburst as included. |
| P2 | Capture-report Credit budget correction | Catch/currency. B announces1200->1600 base reportCredits, no exact effective date; label announced, verify before calculator. Not global rewards+33.3%, first-catch bonus restored or all captures1600. |
| P2 | Platform issue triage after update | Support/mobile/console. A announces PS5/Xbox RVblack-screen, batch/warehouse/sort/release/racing fixes; S25Ultra/Android fixes. Record platform/version/symptom, do not promise universal performance recovery. |
| Research | S2 carryover, combo import and SteamDeck touchpad | D questions only. Need official persistence rules, reproducible import example, and current SteamInput mappings before publishing fixes. Distinguish collectible rerun promise in B from inventory/ticket/currency carryover. |

## Suggested release sequence

First batch: P0 correction plus progression/handoff, pigment, collectible boost,
Jaguaraun and Gracewing; homepage date/maintenance and new free-claim entry.
Second batch: solo Dash, returning-player comparison, Home changes, map levels,
platform issue updates. Planned mobility/Credits changes stay clearly announced
until version evidence exists. Opening-day task lists and shop costs need live
panels; do not fabricate them from preview text.

## Validation

Research checkpoint only: source publication/observation dates and URLs recorded,
repository gaps checked against fetched baseline. No build needed for notes.
