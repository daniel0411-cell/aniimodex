# Sparkling operation decisions - November 3, 2026

## Baseline and reader task

Fetched origin before work: main and origin/main were both 4c29816, with
0 local-only and 0 remote-only commits. Preserved unrelated .workbuddy files.
AdSense review is already pending; this update improves an existing reader task
without changing URLs, indexability, advertising configuration or site layout.

Reader: a player about to consume Pigment, Credits or a Legendary Aniipod.
Task: distinguish the desired outcome, verify the target and avoid spending
on an operation that cannot produce that outcome.

## Evidence

Read the official Steam news API on November 3:
https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=4126040&count=30&maxlength=0

The newest returned official announcement is the October 30 patch; third-party
feeds were excluded. No new November 3 patch is claimed.
Source for the actual decision rules:
https://steamcommunity.com/games/4126040/announcements/detail/687520329382238609

Title: Season 1: Departure with the Wind Part 2 Starts!
Published: 2026-10-27T02:47:13.000Z, announcing the October 29 update.
SHA-256 of the API item's contents string when read:
ce1bdc5cb000e4fb47dca776ffd2cba32a1419473c4814739ea75b8746532124

Relevant original statements in Sparkling Hue and Growth System:

- "Hue unlock only applies to the same Aniimo individual"
- "spend \"Credits\" to freely switch between different hues of the same Aniimo"
- "When a hue that has already been unlocked is rolled, \"Sparkling Sigil\" ×2 will be returned."
- "cannot change the target Aniimo's Acquired Potential"
- "This function cannot be used on Irisalis, Helion, or Lunara."
- "Any Sparkling Aniimo can automatically obtain and freely switch to this color scheme."
- Adjusted Prismana Orb: "The Aniimo's original Acquired Potential, Mutation, and Personality are retained."

Registry access date is updated because the source was actually read again.
Other source dates and the October 29 publication context remain distinct.
The checker does not independently inspect a player's account or live client.

## Added value and scope

The existing item guide gains one compact operation checker in all three
languages. It distinguishes an individual's unlocked hue from a different
individual's unlock, random Pigment from selection, original Sparkling color,
species exclusions and an explicitly unchanged Potential field. Unknown inputs
retain a verification step. Explicit species exclusions take precedence even
if Sparkling status is unknown; Potential remains unchanged regardless of
other inputs. An ordinary non-excluded species is not a universal item-
compatibility guarantee.

The existing static decision table and prose remain the complete fallback.
No new guide URL or repetitive creature pages were added. No hue distribution,
guarantee counter, optimal budget, account delivery or gameplay test is invented.
No advertised feature is labelled a combat simulator or guaranteed improvement.

## Validation

- Production build, TypeScript and lint passed (483 generated entries).
- All 15 content, data, tool and SEO regression scripts passed; SEO output
  remains 474 localized pages and 208 sitemap URLs. Pre-publication fetch
  again showed 0/0 divergence from origin/main.
- New rule checks cover missing inputs, every excluded species, locked versus
  unlocked individual hues and Potential invariance; three-locale static output
  includes the source, the existing table and truthful sitemap update dates.
- Independent browser checks passed at 1365px and 390px for all three locales,
  including all operation results, changing input state, native controls, live
  result text, valid outline anchors and no document horizontal overflow.
- With JavaScript disabled, the item comparison table and core conditions
  remain readable in every locale.
- Mobile and desktop screenshots were visually inspected. Browser sessions
  close in finally; user Chrome is unused.

## Limitations

Current client and exact item confirmation remain authoritative for a player's
target. Prices and random hue odds are not published in this evidence. This
update cannot guarantee AdSense approval and does not submit another review.
