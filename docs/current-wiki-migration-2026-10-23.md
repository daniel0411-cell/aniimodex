# Current Wiki migration and quality checkpoint

## Baseline and visitor task

Fetched origin on October 23 before continuing: main and origin/main both
468cfdee88eeeddbb64afd99527f81530b79d341, zero commits either side. The only
unfinished local file was the browser-DOM importer from this same task.

Help a visitor find the right current Aniimo, compare published Basic Form
attributes and exploration functions, and inspect skill parameters without
confusing old route numbers with current official identity. This is a data and
usability migration, not an expansion of article templates to gain page count.

## Evidence and scope

Observed https://wiki.aniimo.com/ and all 86 linked English Basic Form pages
through the background in-app browser on 2026-10-23. Extracted rendered DOM,
not undocumented application state or guessed API responses. Waited for the
matching name heading and final Resonance Training section on every page;
an earlier heading-only capture missed sections during hydration and was
replaced in full. The intermediate capture is /private/tmp/aniimo-current-dom.json.

The importer validates all identities against data/wiki-current-index.ts,
unique artwork identities, exact source URLs, six distinct attribute labels,
numeric values, Basic Form links, traits and skills before generating the
dated current-wiki-snapshot.json and current-wiki-details.json.

- 86 current entries; 80 exact-name matches retain their established URLs.
- Six new identities use wiki-prefixed route keys. Official numbers are
  separate display/search values, including five-digit numbers.
- Twelve unmatched historical identities retain their old URLs and August
  source dates. They are excluded from current directories, tools, related
  comparisons and the sitemap selection. Budclaw. is not silently aliased to
  Budclaw merely because punctuation resembles a name change.
- 68 records publish habitats; 50 publish mobility, across 19 ability names.
- Eight entries have dual elements. Light now has two published entries.
- Form links contain 18 names; all 86 have Basic Form, 25 link Prismana Form.
  Alternate-form values have not been collected or compared.
- Evolution diagram artwork is matched to indexed Basic Form artwork using
  exact filename identity, preserving the displayed tree and stage labels.
  Six trees contain identities absent from this directory: stable routes
  032, 033, 048, 049, wiki-99996 and wiki-99998. These trees are explicitly
  unresolved and excluded from family aggregation. Missing is not no evolution.

## Added value and corrections

Current filters, lookup tools, exploration groups, skill directories and
candidate comparisons all derive from the same current snapshot. Show six
official Basic Form attributes and skill Type/Cost/Power; compare attributes
alongside roles, habitats and mobility. Existing URLs remain stable even when
official numbering changes. Search and selected filters now apply together.

Form names open the corresponding official form page. Current and historical
scope notices differ. Source dates, guide coverage, counts and form tables in
all three locales reflect their actual dataset. The 12-entry watchlist now
contains unique current identities, with a documented field-coverage selection
rule and correct name-based links rather than obsolete numeric links.

Same-named skills can have different descriptions; the directory omits a
shared description when variants disagree. Source text also contains unresolved
{0}/{1}/{4} placeholders and a BREAK increase of zero. Preserve raw evidence,
but replace those descriptions in the UI with an incomplete-source explanation.
No substitute effect amount is invented. Skill Cost 0 and legitimate fractional
timings remain valid. These are source-data problems, not proof of client bugs.

## Limits and release checks

These are Wiki values, not tested client stats, a growth model, damage ranking,
guaranteed encounter location or evidence of alternate-form effects. Other
numerical tools retain their separate official/community evidence boundaries.
Old August JSON files remain unchanged as historical evidence. Sitemap coverage
is still selective, with dates updated only for materially changed pages.

Production build and lint/type checks, source evidence audit, current identity
and preserved-route checks, all three locales' current and historical HTML,
guide consolidation, index recovery, Bing recovery and disputed matchup
regressions are release gates. Browser QA covers desktop/mobile display, old
URLs with new numbers, new entries, missing data, search with filters and
published attribute comparisons. Deployment SHA, live checks and screenshots
are recorded in the task's external release evidence after publication.

This work does not submit an AdSense review or assert an indexing result.
