# Habitat workflow and traffic diagnosis, 2026-11-12

## Baseline and visitor task

Started on clean main acd52d7ea55bc000535978bcc692df171d4141c8.
Fetched origin; HEAD and origin/main were equal (0 local-only / 0 remote-only).
The visitor needs to distinguish scheduled Prismana event areas from published
Basic Form habitats, then compare the Basic Forms associated with an area.

## Changes

- Locations reuses the existing server-clock Prismana schedule, with a direct
  jump to the regular habitat directory and explicit scope separation.
- Each of 19 habitat groups links to a matching Dex filter. The Dex supports
  habitat plus name, element, role and evolution-stage intersections.
- Name and habitat persist in query links; reset removes these parameters.
  Other filter settings are not represented in shared URLs.
- A separate unpublished-habitat option covers 19 of 91 records. Missing data
  does not establish that a creature cannot appear in an area.
- Server wrapper passes only habitat names and stable route identities to the
  client browser. Full 91-entry HTML and the base canonical remain intact.
- All three locales updated; only substantively changed directory lastmod dates
  advanced. Underlying Wiki evidence dates were preserved.

## Evidence and sources

Observed 2026-11-12 through signed-in Chrome GSC and Bing, plus public Google
Trends through the in-app browser. Compare complete equal weeks: November 2-8
versus October 26-November 1, 2026. Search-account identifiers and session data
are intentionally omitted.

- GSC: https://search.google.com/search-console/
- Bing: https://www.bing.com/webmasters/searchperf
- Trends: https://trends.google.com/trends/explore?date=2026-10-26%202026-11-08&q=Aniimo
- Event source: https://www.aniimo.com/newslist/detail/100244
  Published October 27; existing schedule evidence checked November 8.
- Official Wiki: https://wiki.aniimo.com/
  Existing data: 86 entries checked October 23, four November 8, Jaguaraun
  November 9. This update does not claim a fresh full-Wiki verification.
- November 12 maintenance notice: https://www.aniimo.com/newslist/detail/100298
  Published November 9, checked November 12 in the preceding content release.

### Independent search-demand signal

Google Trends scope: worldwide, all categories, Google web search, search term
Aniimo (not a topic or a player-count metric). Visible daily normalized indices:

| Week | Daily indices | Sum | Mean |
| --- | --- | --- | --- |
| October 26-November 1 | 52, 49, 53, 87, 98, 100, 100 | 539 | 77.00 |
| November 2-8 | 69, 57, 53, 48, 50, 57, 56 | 390 | 55.71 |

Relative interest fell 27.64%. This supports an independent demand decline,
but is neither absolute search volume nor a measured fall in active players.
It cannot assign a percentage of our click loss to demand.

### Google Search Console

Clicks 1,060 versus 1,715 (-38.2%); rounded impressions 21.3K versus 39.5K;
CTR 5.0% versus 4.3%; aggregate average position 6.4 versus 6.4.
Selected fixed queries, current/previous:

| Query | Clicks | Impressions | Average position |
| --- | --- | --- | --- |
| aniimodex | 358 / 581 | 913 / 1,448 | 1.6 / 1.5 |
| animodex | 53 / 89 | 153 / 254 | 1.5 / 1.7 |
| aniimo dex | 44 / 51 | 1,075 / 1,160 | 4.6 / 5.4 |
| aniimo habitats | 8 / 18 | 16 / 41 | 1.7 / 2.3 |
| aniimo locations | 2 / 7 | 33 / 85 | 8.1 / 7.5 |
| aniimo habitat | 4 / 9 | 12 / 19 | 3.8 / 1.5 |

Selected English pages, current/previous:

| Page | Clicks | Impressions | Average position |
| --- | --- | --- | --- |
| Homepage | 625 / 931 | 4,471 / 6,062 | 3.4 / 3.6 |
| Dex | 35 / 104 | 1,919 / 3,856 | 5.2 / 5.7 |
| Locations | 62 / 142 | 1,517 / 3,126 | 7.5 / 6.7 |
| Evolutions | 32 / 58 | 487 / 1,124 | 5.6 / 6.0 |
| Known issues guide | 19 / 125 | 2,105 / 8,069 | 7.4 / 6.6 |
| Prismana event tracker | 91 / 24 | 913 / 476 | 5.4 / 6.8 |

Brand/homepage demand and directory exposure declined despite several stable or
improved ranks. Locations and known issues also lost about 0.8 positions;
content relevance and competition remain plausible contributors. Event growth
shows a shift in intent and a useful area for continued updates.

### Bing: comparable reporting scope matters

All traffic: clicks 76 / 186 (-59.1%), rounded impressions 5.1K / 5.5K,
CTR 1.48% / 3.39%. This includes other verticals; it is misleading to infer a
web-search snippet problem directly from that aggregate CTR change.

After selecting **Web and Chat**, the same dates show clicks 76 / 186,
rounded impressions 2.3K / 5.4K, CTR 3.26% / 3.43%, position 6.1 / 6.3.
The interface states query/page breakdowns apply only to web traffic.

| Web query | Clicks current/previous | Impressions | Position |
| --- | --- | --- | --- |
| aniimo dex | 47 / 103 | 444 / 809 | 3.51 / 3.92 |
| aniidex | 1 / 3 | 361 / 359 | 6.01 / 7.28 |
| aniimo | 0 / 8 | 146 / about 1.2K | 8.46 / 6.62 |

English homepage: clicks 69 / 156, impressions about 1.6K / 3.9K,
CTR 4.28% / 3.99%, position 5.83 / 6.12. It accounts for 87 of 110 lost
total clicks. English Dex: clicks 3 / 15, impressions 223 / 603,
CTR 1.35% / 2.49%, position 6.35 / 6.06. The primary query improved rank
while losing exposure; the broad game query and Dex page also show local
ranking/CTR weaknesses. Demand alone is not established as the entire cause.

## Diagnosis and limits

Evidence supports search-demand decline as an important contributor, with
localized content/ranking weaknesses and changing search intent alongside it.
There is no defensible causal percentage split. One two-week comparison cannot
establish a sustained decline in the game's active population.

The November 9 notice and November 10 ad enablement occurred after the compared
week; neither explains that earlier decline. Prior index counts do not provide
a historical series establishing an indexing collapse or a penalty.
Continue useful event/area updates and assess subsequent equal complete weeks;
do not interpret demand normalization as a guarantee of traffic recovery.

## Validation

- Production build: 495 routes, TypeScript and lint passed.
- Content quality, event/Dex regression, SEO audit and advertising checks passed.
  SEO audit covered 486 HTML pages and 211 sitemap URLs. Advertising export
  remains exactly nine placements on the existing three guides in three locales.
- Browser checks: Dex and locations in en/zh-Hans/zh-Hant at 390x844 and
  1365x900; no document overflow or observed broken images.
- All 19 habitat filter results exactly matched directory member route IDs.
- Nimbus Fields: 12 records; name Nimbi intersection: one; Fire: three;
  Lumin plus Attacker: Emberpup and Celestis. Unpublished habitat: 19.
- Empty results, clear and reload, name/habitat persistence, invalid habitat
  fallback, browser back navigation and localized links verified.
- Source dates, explicit event/Basic Form distinction, canonical URLs and
  regular-directory shortcut checked. No invented coordinates or spawn claims.

Release commit and deployment verification are recorded in the task response.
