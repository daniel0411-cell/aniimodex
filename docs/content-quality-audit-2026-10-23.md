# Content quality audit and checkpoint

## Baseline and scope

2026-10-23: fetched origin before audit. Clean main and origin/main both at
6ee77d8c4c87d7ade35bc6debde3914a2cc0534b; 0 local-only / 0 remote-only commits.
Reviewed Dex detail rendering, all five data-topic guides, element directories,
catch formula/calculator, type chart and its team-builder consumer, source and
verification registries, and release readiness instructions. This is a template
and shared-data audit, not a claim to have manually reviewed every article.

Production observations on 2026-10-23:
- https://aniimodex.com/en/dex/004/ promised Location in its title but had no
  habitat section despite linking to it; summary showed 0 for absent records.
  Dual-element matchups were split into separate single-element links.
- https://aniimodex.com/en/guide/aniimo-roles-explained/ had three short general
  answers, no member comparison, and a related link promising unavailable stats.

## Findings addressed in this release

1. High: the stored community reference explicitly disputes Ice attacking Wind,
   but the tool used neutral 1x. Dependent counter rankings and team weaknesses
   therefore implied precision unsupported by their own evidence. Return null,
   mark the cell and selected result, exclude affected numeric rankings, and
   disclose omitted team calculations when Wind defenders are present.
2. High: four published data guides mostly stated what was known/unknown, without
   helping users compare actual entries. Add distinct derived tables: all roles,
   branching families, six most-populated habitats and six most-shared mobility
   abilities. Include coverage, linked examples, selection rules and limitations.
3. Medium: Dex similar entries were the first eight matching either role or an
   element, without showing why they were useful alternatives. Replace that block
   with a current-versus-candidates table prioritizing role, shared elements and
   habitats. Show actual published fields, not an invented combat recommendation.
4. Medium: empty habitat/mobility records produced broken anchors and zero-like
   absence claims. Retain reachable sections explaining missing data and label
   missing summaries. Evolution tree nodes now open the matching numbered entry.
5. Medium: single-element tool links lost dual-element context. Deep-link the
   exact Aniimo to the existing combined lookup instead.
6. Low: remove Cubbo keyword-variant filler; localize Dex metadata and describe
   available Wiki data rather than promising a location for every entry.
7. Process: persist the task/evidence/added-value standard in AGENTS.md and
   content-quality-standard.md for subsequent development.

## Retained and unresolved

- Existing element directories already derive roles, families and secondary
  elements; element guide gained a sourced directory in the preceding release.
- Catch calculator exposes formula factors and species-rate limitations. Its
  numerical source values were not reverified live or modified in this release.
- Source presence alone still controls some guide indexing. It is a provenance
  gate, not a quality score; avoid indiscriminate noindex or bulk removal.
- The Wiki snapshot is dated 2026-08-30. New tables reorganize that evidence;
  they do not establish October game completeness. Refresh live sources before
  adding current mechanics, download availability or game-version assertions.
- A displayed community source record is not proof of a fresh cross-check.
  This release fixes the recorded dispute; other community chart cells still
  require independent validation before being described as official.
- Platform/download/support articles need a separate claim-by-claim current
  source review and overlap assessment; no blanket freshness claim is made here.
- Artwork rights and privacy/copyright mailbox delivery remain release-readiness
  checks; see adsense-readiness.md. Do not treat new tables as resolving them.
- GSC indexing and AdSense eligibility cannot be certified by code checks.
  The prior GSC request was blocked by a reCAPTCHA network error, not accepted.

## Validation

- Production build passed (483 generated build entries); lint/type checks passed.
- `node scripts/data-audit.mjs` and `node scripts/check-review-fixes.cjs` passed,
  including disputed single/dual-element calculations and existing boundaries.
- `node scripts/check-content-quality.cjs` passed: all 276 localized Dex pages,
  12 guide tables, reachable anchors, missing-data explanations, lookup context,
  comparison selection and snapshot-derived role counts/family links.
- SEO audit passed: 474 HTML pages and 217 sitemap URLs. Index-recovery checks
  passed without regressing earlier redirects, canonicals or update-date rules.
- Browser checked desktop and 390x844 mobile. English Dex #004 opened a lookup
  with #004 selected and both Fire/Dark labels retained. Ice/Wind showed a
  dispute on desktop and mobile; selecting Wind entry #008 excluded Ice from
  numeric rankings. Example A in team builder displayed the omission notice.
- Simplified Chinese role table and Traditional Chinese Dex comparison stayed
  inside horizontally scrollable regions (520/620px content inside 343px
  regions), with no page-wide horizontal overflow. Desktop comparison reviewed;
  primary creature image finished loading at 512px and browser logs were clean.
- Local screenshot: content-quality-comparison-local-2026-10-23.jpg in the task's
  visualization directory. Release verification is recorded below after publish.
