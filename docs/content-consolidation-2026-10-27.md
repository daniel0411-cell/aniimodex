# Content consolidation, October 27

## Baseline and scope

Fetched origin before editing. main and origin/main both at 75217cc, zero
commits either side; preserved the existing untracked .workbuddy directory.
This is the first implementation batch after the AdSense low-value-content
discussion, not a claim to know Google's rejection cause or an approval fix.

## Visitor tasks and changes

- New players: retain the bounded appearance-import safety answer in the
  beginner guide instead of publishing a separate article without a verified
  import procedure. Retire the face-data-import article.
- Spending decisions: consolidate historical Glimmer rewards, crop bonuses,
  Sparkling style probabilities and purchase checks into the free-to-play page.
  Answer the base-price question first. Do not imply a complete currency guide,
  current shop catalogue or guaranteed reward availability.
- Controller support: retain the Steam Input steps, community-origin Proton
  workaround, support-report checklist and benchmark limitations in one support
  article. Retire the duplicate Steam Deck optimization article.
- Event access: replace the obsolete not-open-yet lead with a historical
  schedule disclosure. The homepage patch block is explicitly an archive.
  A past opening date is not proof of current access or continued bonuses.

All three retired paths have localized and unlocalized permanent redirects,
with and without trailing slashes. Their HTML and sitemap entries are no longer
generated. Related article links resolve to the surviving pages. Existing source
records and their actual check dates remain unchanged; substantive page updates
are dated October 27. No new live-game or official-source verification is claimed.

## Verification

Production build passed, including lint and type checks. Consolidation tests
cover retired output, sitemap exclusion, all redirect variants, internal links,
retained answers, reading order and update dates. Data evidence, matchup/content
boundaries, content quality, October feedback, editorial review, index recovery,
Bing recovery and SEO checks passed. Final output has 477 audited HTML pages
and 211 sitemap URLs.

Browser QA checked the English spending article on desktop and simplified
Chinese spending, traditional Chinese controller support and simplified Chinese
Harvest Gathering articles at a 390px viewport. The checked mobile documents
had equal client/scroll widths (375px excluding the scrollbar), with readable
wrapped headings. Retained answers and the historical lead were present.
The temporary static preview server was stopped after verification. Redirect
rules were checked in exported files, not served by this plain HTTP preview;
production redirect behavior still needs verification after deployment.

## Remaining work

- Migrate the historical catch calculator to current published rules with
  explicit unknown coefficients; this batch does not change the numerical model.
- Add independently verified gameplay procedures and appropriate screenshots
  where evidence supports them; no fabricated experience or benchmark claims.
- Verify contact mailbox delivery and third-party asset rights before another
  AdSense application. Code tests cannot establish either.
- This batch does not submit an AdSense application, commit, push or deploy.
