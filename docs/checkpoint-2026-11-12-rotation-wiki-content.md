# November 12: habitat evidence, rotation summary and Holo rewards

## Baseline and scope

- Clean main and fetched origin/main both at 24770082afa9f1779d4e00c13468bb76853ffcf1, 0 local-only / 0 remote-only commits before work.
- Improve existing task completion: find Eko/Eklue habitats, identify this and next Prismana rotation, diagnose failed manual Holo star claims. No new pages or ad placements.
- Pre-release fetch succeeded; compare again before pushing.

## Evidence observed through background browser on 2026-11-12

- https://wiki.aniimo.com/item/031/basic-form — Eko lists Cloudreach Falls and Forest of Falling Stars. Local stable route is /dex/032/, not the Wiki number.
- https://wiki.aniimo.com/item/032/basic-form — Eklue lists the same two habitats. Local stable route is /dex/033/.
- Both evolution diagrams lack sufficiently clear named relationships; retain evolutionPublished=false.
- https://wiki.aniimo.com/item/004/basic-form — Inferlupa still has no habitat section; retain unknown rather than infer from a family.
- https://www.aniimo.com/newslist/detail/100298 — November 12 update notice, published November 9: fixes manual Holo-Battle Interlink star reward claims under certain circumstances. This is distinct from the November 5 Holo Training Ace unlock fix. No client test, automatic delivery promise or mandatory rerun established.
- Existing rotation source remains https://www.aniimo.com/newslist/detail/100244 (October 27 announcement; schedule checked November 8). Summary does not advance that source date. Rotation availability does not establish the designated Snapshots target.
- Search discovery: https://www.google.com/search?q=site%3Awiki.aniimo.com+Aniimo+habitat+evolution ; no useful official result, then verified known primary-source detail pages.

## Changes

- Add Cloudreach Falls to the two habitat lists and a scoped habitatsCheckedAt field. Preserve original October 23 record date for unaudited skills, forms and attributes. Display direct official citations next to the scoped date; sitemap considers both dates.
- Current/next rotation summary derives from the same server-offset status calculation as the table. Handles SSR unknown clock, before-first and after-last cases without inventing future rotations.
- Holo guide separates manual claim failure from achievement unlocks and provides a support evidence workflow; three locales and article modified date updated.

## Validation

- Production build: 495 routes. November patch, Part 2 content, content quality, event/Dex regression, SEO audit and advertising checks passed; git diff --check passed.
- SEO: 486 pages audited, 211 sitemap URLs. Advertising: nine existing units only.
- Regression checks cover three server offsets, exact 04:00 transition, unknown clock, before/after schedule, scoped habitat dates, unresolved evolution and three-language rendered evidence.
- Local browser checked English rotation and Americas switch (UTC-4), simplified Chinese mobile rotation (390x844), traditional Chinese habitat evidence and rotation, English Holo claim workflow. Mobile document width 375 at viewport 390: no horizontal page overflow; the schedule table retains its internal horizontal scroll.

## Remaining gaps

- No new named evolution relationships verified; Inferlupa habitat still unknown. Wiki index has additional newer identities/name changes requiring a separate identity audit before importing or renaming.
- Rotation state uses device time and published fixed offsets; no server monitoring or gameplay verification. Maintenance completion and claim fix effectiveness not tested in client.
- Deployment verification follows push; Git source freshness alone does not prove production freshness.
