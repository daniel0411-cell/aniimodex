# November 15 GSC and Bing audit and next optimization plan

## Scope and baseline

- Requested outcome: audit recent signed-in GSC and Bing data and propose the
  next optimization plan. No site implementation, account setting change or
  release in this task.
- Fresh `git fetch --prune origin` completed at task start. Clean `main`,
  HEAD and origin/main `c1a4155`, local-only/remote-only 0/0.
- Applied `docs/content-quality-standard.md`. Prioritize concrete visitor tasks
  and verified answers over additional URLs or cosmetic freshness.
- Observation date: November 15, 2026, Asia/Shanghai. Dashboard date ranges use
  each provider's reporting dates, not a conversion to Beijing calendar days.
- Fixed comparison: November 6–12 versus October 30–November 5. GSC's rolling
  seven-day window advanced during the session; the final metrics below were
  rechecked using explicit custom dates. Discard intermediate rolling-window
  page samples. In particular, the event page is growing in this fixed window.
- This is a search performance and sampled index/content audit, not a full
  technical crawl, independent market-volume measurement or causal experiment.

## Sources and measurement boundaries

- GSC performance, domain property aniimodex.com, web/text search:
  https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Aaniimodex.com&metrics=CLICKS%2CIMPRESSIONS%2CCTR%2CPOSITION&start_date=20261106&end_date=20261112&compare_start_date=20261030&compare_end_date=20261105
- GSC indexing:
  https://search.google.com/search-console/index?resource_id=sc-domain%3Aaniimodex.com
- Bing performance, aniimodex.com property:
  https://www.bing.com/webmasters/searchperf?siteUrl=https://aniimodex.com/
- Bing Site Explorer, same selected property, observed November 15.
- Live platform page and old Switch URL, observed November 15:
  https://aniimodex.com/en/guide/aniimo-platforms/
  https://aniimodex.com/en/guide/aniimo-nintendo-switch/
- Dashboard impressions abbreviated as K are rounded; percentage changes using
  them are approximate. Query rows exclude anonymized/unreported searches and
  are not the full demand universe. Average position changes with query mix.
- Bing Web and Chat headline metrics differ in scope from its web-only query
  and page breakdowns. Neither provider's position is interchangeable with the
  other's. All-vertical Bing CTR is not a web snippet CTR.

## Performance: fixed seven-day comparison

Current / previous:

| Metric | GSC web | Bing Web and Chat |
| --- | --- | --- |
| Clicks | 759 / 1,434 (-47.1%) | 46 / 164 (-72.0%) |
| Impressions | 16.9K / 30.8K (~-45.1%) | 1.5K / 4.5K (~-66.7%) |
| CTR | 4.5% / 4.7% | 3.13% / 3.68% |
| Average position | 6.5 / 6.3 | 5.8 / 6.3 |

Bing's All view: 46/164 clicks, 4.6K/5.9K impressions, CTR 0.99%/2.76%.
Do not mix this with the Web and Chat comparison above.
Bing current daily web impressions sum to 1,469; current clicks sum to 46.
GSC's comparison Days tab supplied no usable daily table in this session;
no precise Google daily turning point is established.

### GSC pages

All paths below are on https://aniimodex.com. Current / previous:

| Page | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| /en/ | 443 / 849 | 2,820 / 6,236 | 15.7% / 13.6% | 3.3 / 3.5 |
| /en/guide/aniimo-prismana-event-tracker/ | 67 / 57 | 1,175 / 693 | 5.7% / 8.2% | 5.6 / 6.1 |
| /en/locations/ | 33 / 108 | 1,072 / 2,544 | 3.1% / 4.2% | 7.8 / 6.9 |
| /en/guide/aniimo-platforms/ | 31 / 48 | 2,811 / 3,568 | 1.1% / 1.3% | 6.5 / 6.8 |
| /en/evolutions/ | 23 / 34 | 409 / 800 | 5.6% / 4.3% | 5.4 / 6.1 |
| /zh-Hant/guide/aniimo-launch-checklist-known-issues/ | 18 / 16 | 322 / 598 | 5.6% / 2.7% | 6.3 / 6.6 |
| /en/dex/ | 15 / 74 | 868 / 3,168 | 1.7% / 2.3% | 5.1 / 5.2 |
| /en/guide/aniimo-launch-checklist-known-issues/ | 13 / 71 | 1,861 / 4,995 | 0.7% / 1.4% | 7.3 / 6.8 |
| /en/guide/aniimo-rv-homeland-guide/ | 10 / 7 | 222 / 196 | 4.5% / 3.6% | 7.2 / 9.2 |
| /zh-Hant/guide/aniimo-progress-account-safety/ | 9 / 11 | 182 / 285 | 4.9% / 3.9% | 5.9 / 6.4 |

The English homepage accounts for 406 of the net 675 lost Google clicks
(60.1%). This is a descriptive page contribution, not the fraction of decline
caused by market demand. Locations, Dex and English known issues lose another
75, 59 and 58 clicks respectively. Query losses overlap these page losses.

### GSC query signals

| Query | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| aniimodex | 268 / 511 | 677 / 1,299 | 39.6% / 39.3% | 1.6 / 1.5 |
| animodex | 42 / 64 | 125 / 206 | 33.6% / 31.1% | 1.5 / 1.6 |
| anidex aniimo | 14 / 14 | 553 / 966 | 2.5% / 1.4% | 3.9 / 3.4 |
| aniimo switch | 11 / 9 | 438 / 526 | 2.5% / 1.7% | 6.7 / 7.2 |
| aniimo switch 2 | 5 / 10 | 389 / 602 | 1.3% / 1.7% | 6.3 / 6.4 |
| aniimo dex | 5 / 68 | 286 / 1,568 | 1.7% / 4.3% | 5.6 / 4.7 |
| aniimo prismana schedule | 4 / 0 | 61 / 33 | 6.6% / 0% | 6.2 / 6.5 |
| aniimo prismana event | 4 / 2 | 55 / 32 | 7.3% / 6.3% | 7.1 / 7.3 |
| aniimo habitats | 4 / 15 | 8 / 34 | 50% / 44.1% | 2.6 / 1.9 |
| aniimo habitat | 3 / 7 | 6 / 21 | 50% / 33.3% | 3.7 / 2.2 |
| is aniimo on switch | 0 / 1 | 241 / 310 | 0% / 0.3% | 6.5 / 7.4 |
| is aniimo on switch 2 | 0 / 1 | 109 / 93 | 0% / 1.1% | 5.8 / 7.9 |
| aniimo platforms | 1 / 1 | 90 / 67 | 1.1% / 1.5% | 8.9 / 8.3 |

Other discovery signals: `hospital location aniimo` 106 impressions, zero
clicks, position 8.8; `hospital aniimo location` 37 impressions, one click,
position 7.2; `catch rate estimator` 50 impressions, zero clicks, position 8.9.
These are candidates for relevance/source checks, not immediate reasons to
publish new guides. Competitor-like or ambiguous navigational spellings such
as `annidex`/`aniidex` should not become keyword-stuffed targets.

These are domain-wide query rows. A page-row click did not establish a page
filter; no query-to-page attribution is inferred from that attempted action.
Landing-page drilldowns are a required next step before changing the Dex or
known-issues information architecture.

### Device and country checks

- Mobile: 391/786 clicks, 9,607/16,816 impressions, CTR 4.1%/4.7%, position 6.5/6.4.
- Desktop: 354/616 clicks, 7,116/13,558 impressions, CTR 5.0%/4.5%, position 6.5/6.1.
- Tablet: 14/32 clicks, 203/404 impressions, CTR 6.9%/7.9%, position 5.8/5.8.
- US: 109/206 clicks, 5,342/9,164 impressions, position 7.1/7.0.
- Brazil: 72/155 clicks, 686/1,231 impressions, position 5.7/4.8.
- Taiwan: 64/78 clicks, 1,483/2,486 impressions, position 6.7/6.9.
- France: 64/136 clicks, 647/1,070 impressions, position 4.9/4.8.
- Germany: 34/66 clicks, 834/1,732 impressions, position 7.3/6.8.
- Philippines: 31/35 clicks, 642/1,196 impressions, position 6.1/6.6.
- Decline spans countries and both major devices. Taiwan and the Philippines
  are relatively more resilient. No evidence here justifies adding languages.
- Mobile CTR merits segment-level follow-up; device mix and search intent must
  be controlled before attributing the difference to page UX or advertising.

### Bing web breakdown

- English homepage: 37/143 clicks, 953/~3.2K impressions, CTR 3.88%/4.43%,
  position 5.33/6.14. Its 106 lost clicks represent 89.8% of net 118 lost clicks.
- English Dex: 3/11 clicks, 117/494 impressions, position 6.44/6.28.
- Forms guide: 1/1 click, 77/103 impressions, position 6.53/7.01.
- Type chart: 0/0 clicks, 53/54 impressions, position 7.11/6.93.
- Locations: 0/1 click, 32/89 impressions, position 7.19/7.98.
- Known issues: 1/4 clicks, 27/187 impressions, position 7.00/6.30.
- Old Nintendo Switch guide: 32/43 impressions, no clicks, position 6.28/6.70.
  Browser navigation to its live URL lands on the consolidated platform guide;
  repository rules specify 301. Browser observation alone is not a measured
  HTTP status trace. Historical Bing rows do not establish a broken redirect.
- `aniimo dex`: 29/96 clicks, 300/742 impressions, CTR 9.67%/12.94%, position
  3.04/3.91 (better). `aniimo`: 15/858 impressions, position 8.20/7.28.
- `aniimo tools`: 34/226 impressions, no clicks; `aniidex`: 264/427 impressions,
  1/4 clicks; `animodex`: 35/88 impressions, 0/6 clicks.

## Indexing and technical evidence

- GSC index report last updated November 9: 449 indexed, 422 excluded. Prior
  saved snapshot had 436 indexed. This does not support a broad deindexing event.
- Exclusions: 241 redirects, 134 alternative canonical pages, 9 duplicates
  without user-selected canonical, 1 noindex, 24 crawled/not indexed,
  11 discovered/not indexed, 2 not found. Exclusion is not synonymous with error.
- The 24 crawled/not-indexed samples mostly include historical non-trailing-
  slash traditional Chinese guide/tool variants (October 17/19 crawls), plus
  favicon.ico, a type-chart query URL, and both slash/non-slash Dex 033 URLs.
  Dex 033 sample crawls show November 11; type-chart query shows November 10,
  despite the summary report's earlier update label. Record this inconsistency
  rather than assigning a single crawl cutoff to every sample.
- Inspect current canonical, live response chain and Google's selected canonical
  before interpreting these variants as missing content. Prioritize the actual
  canonical Dex 033 URL and valuable discovered URLs. Do not bulk-request indexing
  of redirects, favicon or intentional parameter duplicates.
- Sitemap: success, last read November 14, 211 discovered URLs. Sitemap scope
  differs from all known indexed URLs; 211 versus 449 is not an error rate.
- Bing Site Explorer: indexed 486, errors 0, warnings 1, excluded 28; prior
  November 12 note: 484/0/1/30. No broad collapse is visible. Warning not drilled
  down. Site Explorer folder click/impression aggregates cover six months,
  and are not used as weekly performance metrics.
- GSC CWV last updated November 9: insufficient field data for both device
  groups over 90 days. This is neither a passing grade nor evidence of CLS harm.
- Manual actions/security reports, fresh crawl statistics, individual URL
  inspection and a live server response crawl were not completed in this audit.

## Diagnosis: supported findings and uncertainty

1. Broad exposure contraction is the strongest shared pattern. Exact brand
   query exposure falls while its rank and CTR hold, homepage ranks hold or
   improve, and both search engines decline. This supports reduced demand or
   reduced search opportunity as an important contributor. Search Console
   impressions alone cannot measure total market demand or distinguish every
   SERP/competition change.
2. Historical independent signal: the November 12 checkpoint recorded worldwide
   Google Trends Aniimo relative interest, November 2–8 versus October 26–
   November 1, means 55.71/77 (-27.64%). Source:
   https://trends.google.com/trends/explore?date=2026-10-26%202026-11-08&q=Aniimo
   This was not freshly rechecked today, uses different weeks, and is relative
   interest, not absolute search volume or player population. It corroborates
   the earlier demand direction without proving this week's causal split.
3. Local weaknesses coexist with demand decline: `aniimo dex` rank and CTR,
   locations rank and CTR, English known-issues CTR, and platform-query relevance.
   An aggregate rank of 6.5 cannot exclude deterioration for important queries.
4. Events are a growing pocket: tracker clicks 57→67 and impressions 693→1,175,
   with better position but lower blended CTR. The query mix changed; do not
   declare its snippet worse solely from blended CTR.
5. No evidence establishes a sitewide low-quality penalty, indexing collapse,
   or automatic ads as the cause. The previously observed decline predates
   the November 10/12 ad rollout. Current overlap still warrants UX measurement.
6. November 13 updates fall outside the fixed performance window. These data
   cannot assess their effectiveness, and existing event/timezone cards should
   not be proposed again as missing work.

## Prioritized execution plan

### P1 — Recover useful Dex and habitat entry paths

- First filter `aniimo dex` and the locations/Dex pages separately in both
  tools. Compare actual landing pages, queries and country/device mixes. Check
  whether homepage and Dex compete; do not assume cannibalization beforehand.
- Inspect canonical/hreflang, server-rendered introductory answers and important
  internal links, especially canonical traditional Chinese Dex 033.
- Improve the existing Dex task: locate a species, recognize forms, find the
  verified habitat and reach the relevant tool without redundant navigation.
- Add habitat detail only where primary sources establish the location and
  conditions. Retain unknown labels. Build on the November 12 region filtering
  rather than duplicating it or inventing routes/spawn rates.
- Acceptance: correct single canonical landing per intended page, relevant
  query landing confirmed, source-backed answers and functioning lookup links.

### P1 — Refresh the platform guide for Switch intent

- Live guide's source/updated date remains October 23, and Switch/ Switch 2
  answer is below the supported-device table. Freshly check official Aniimo
  and Nintendo sources before changing any availability statement.
- Lead with a concise dated supported/unconfirmed status summary that answers
  the observed Switch intent. Refine title/description/headings on the existing
  platforms URL; preserve full supported-device download checks below it.
- Maintain old Switch URL consolidation; verify HTTP/canonical response once,
  then monitor engine recrawl instead of restoring a duplicate guide.
- Acceptance: a visitor can identify the current verified status and official
  checking route from the first screen, with uncertainty and regional scope.
- Opportunity scenario only: at 2,811 impressions, moving CTR from 1.1% to 2%
  would yield roughly 25 more weekly clicks. This is not a forecast or a
  universal CTR benchmark; rank, query mix and demand may change.

### P1 — Maintain growing event answers, selectively

- Review the existing tracker around November 16/19/20 against fresh official
  announcements and actual evidence. November 13 already added planning cards,
  server time conversions and reset decisions: preserve and build on that work.
- Focus on what a visitor can do now, eligibility, phase/deadline and timezone.
  Recheck photo phase changes and new announcements before updating labels.
- Add race strategy, current photo targets or recipe ingredients only when
  verified; an announced unlock is not proof it is live for every server.
- Acceptance: existing URL answers the next action without contradictory dates;
  observed event queries continue to land on the appropriate guide.

### P1/P2 — Reorganize troubleshooting around actual queries

- English known-issues guide loses 58 clicks and has 0.7% CTR. Its traditional
  Chinese equivalent grows slightly; do not apply a blanket rewrite to all
  locales. First drill page-specific queries to identify lost problems.
- Separate current unresolved symptoms, fixed/version-specific issues and
  time-limited reset actions within the existing guide. Use symptom → evidence
  → safe next action, with affected version and source dates where established.
- Do not promise tested fixes or turn every patch note into a new URL.
- Acceptance: top observed troubleshooting tasks have a direct answer or an
  explicit evidence gap, with resolved issues clearly marked as historical.

### P2 — Target indexing exceptions and mobile UX

- Inspect the canonical Dex 033 URL, 11 discovered/not-indexed URLs and Bing's
  one warning, using current response and URL-inspection evidence. Treat
  duplicates and redirects according to intended behavior, not index count.
- Measure mobile LCP/CLS and content interaction across homepage, Dex and long
  guides with consent behavior intact. Lab measurements and real-user field
  data must be reported separately. Evaluate whether ad placement obstructs
  lookup tasks; no ad configuration changes were made in this audit.
- Acceptance: actual canonical crawl/access defects fixed where found; no
  document overflow or obstructed main task on sampled mobile pages; no claim
  of CWV success based on insufficient field data.

## Sequence and evaluation

- First batch: query/landing drilldown, Dex/locations issue confirmation and
  platform source refresh. These combine existing traffic exposure with a
  concrete visitor task. Event checks proceed around the known phase dates.
- Second batch: query-led known-issues editing, specific indexing exceptions,
  and measured mobile UX. Defer broad Wiki imports, extra languages, speculative
  Affinity articles and mass URL publication without demand/evidence.
- Record release date and per-page substance/source changes. Verify crawl or
  reindex status before treating absent search changes as editorial failure.
- Compare two complete post-release weeks with prior complete weeks, using
  page/query cohorts, similar rank/country/device segments, clicks, impressions
  and CTR. Track event queries separately from brand/Dex queries and expired
  launch-support queries. Small samples can fluctuate substantially.
- Recovery target is improved answer usefulness and capture of available
  relevant demand. Do not promise total traffic will return to launch levels.
- No production edits, build/test run, commit, push or deployment in this audit.
  Report-only validation: checked metric arithmetic and `git diff --check`.
