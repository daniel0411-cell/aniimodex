# Image selection correction and discovery — November 27, 2026

## Baseline and scope

Fresh origin fetch at task start: clean main 063c193, HEAD/upstream 0/0.
Re-fetched before first publishing: 0/0 at 063c193; final visual
selection correction also re-fetched at 57c87eb, 0/0. User authorized continuation
and publishing. Existing body assets and factual content retained; no article,
evidence-check or sitemap dates refreshed. No game availability claims updated.
The owner cannot supply gameplay captures; no further request made.

## Verified guidance and editorial correction

Read primary pages through background in-app browser on November 27, 2026:

- https://developers.google.com/search/docs/appearance/google-images?hl=zh-cn
  Visible update March 3, 2026. Preferred-image guidance says avoid generic
  images, text-containing images and extreme aspect ratios. Image choice is
  automatic; OG/schema signals cannot guarantee search presentation.
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps?hl=zh-cn
  Visible update February 20, 2026. Image extensions may enrich existing sitemap
  records. External CDN ownership/verification is not assumed.

The previous release promoted text-led original diagrams and dense/wide lookup
captures into preferred previews. Their usefulness in body prose does not make
that the best preferred-image choice. Removed those OG/Twitter/Article claims
and tiny hub previews. Kept body figures and HTML alternatives. There is no
observed Search Console or SERP evidence establishing these tags caused missing
thumbnails; this is a selection-quality correction, not a diagnosed ranking fix.

All 36 registry assets now record previewUsage and previewReason. Final visual review confirmed evolution and form captures are text-led,
and team cards also contain substantial interface text. All are body-only.
The team screenshot property continues to describe the actual application UI,
separately from preferred image metadata. Disclosed Sparkling conceptual art
remains a text-free illustration, not gameplay proof. Review it again if a
clearer relevant authorized alternative becomes available. Never promise Google will select any of them.

## Delivery

- 17 guide tasks × three locales retain body figures (51 pages).
- One guide task × three locales retains a preferred article image (3 pages).
- Existing 306 localized Dex metadata/body/schema alignments preserved.
- Added image extension to existing sitemap: 54 URLs, 54 image records, drawn
  from registered first-party body assets in 51 guides and three Team Builders.
- Sitemap remains 211 URLs. URL membership, hreflang and lastmod preserved by
  build assertion; XML parsed with Python ElementTree. Body-only image entries
  aid discovery; they are not preferred-image signals.
- No external CDN copying, image purchases, artificial upscaling, new content
  URLs, forced freshness or index-policy changes.

Next 14 does not support image extensions in MetadataRoute.Sitemap. A small
post-export enrichment step preserves the existing sitemap implementation.
Both build scripts now enrich and check output. Regression coverage includes
noindex/wrong-canonical/metadata-only/unregistered exclusion, deduplication,
XML escaping, stale entry removal and idempotence. Image checker verifies exact
body coverage separately from preferred-preview coverage and rejects body-only
OG claims. Rights, relevance and authenticity still require editorial review.

## Local acceptance

- npm run build: passed, 495 exported outputs, lint and type checks.
- npm run images:check: passed, including sitemap regression test.
- npm run seo:audit: passed, 486 localized pages, 211 sitemap URLs.
- Content-quality, advertising/privacy and guide-consolidation checks: passed.
- In-app browser, effective desktop 1365×900 and phone 390×900: 60 route/viewport
  cases across en, zh-Hans, zh-Hant; no document horizontal overflow. Cases cover
  guide hub, body-only download, evolution, forms, Sparkling, four affected
  tools and Dex. Native image dimensions/load verified by build and visible
  representative samples; offscreen lazy thumbnails are not declared broken
  based on an immediate unloaded state. Dex hero observed decoded at 512px.
- Results: docs/verification/2026-11-27-image-selection-local.json.
- Existing 404 noindex and max-image-preview rules passed build checks.

## Remaining material gaps

Body figure coverage remains 17 of 36 guide tasks; 19 have no selected body
asset, and 16 illustrated tasks intentionally have no preferred preview image.
Prioritize genuine event/handbook, RV/homeland/farm, controller/language and
battle-mode captures only when a willing contributor or clearly licensed official
source exists. See editorial-diagram-evidence.md for acceptance fields. Do not
contact others or invent screens to fill coverage. Trust/legal and broad roadmap
pages do not require a forced hero. This work cannot guarantee thumbnails or CTR.

## Production acceptance

Functional commits 57c87eb and final selection correction da5c10c deployed
through the existing Cloudflare Git integration. No duplicate manual deployment.
Observed final formal-host output November 27, 2026, 08:22:32 UTC (16:22 Beijing):

- 30 localized guide/tool pages: HTTP 200, preferred OG/Twitter choices match
  final registry, body-only assets retained in guides, large preview permission.
- 34 distinct first-party asset files: HTTP 200, image MIME, SHA256 equal to the
  locally measured native-dimension files. The 36 registry records include
  three locale records sharing one Sparkling illustration.
- Production sitemap: 211 URLs and 54 image records. Non-image XML content
  equals the built sitemap, including existing URLs, alternates and dates.
- Missing route: HTTP 404 and noindex. robots.txt allows normal crawling.
- In-app desktop 1365×900 and phone 390×900, DPR 1: formal guide hub and expanded
  Team Builder reading example checked, no horizontal overflow. Phone example
  decoded at native 752×418, displayed 343px wide, with HTML caption and full-size
  link. Text-led screenshots no longer promoted as preferred images.
- Screenshots: docs/screenshots/2026-11-27-image-selection-{desktop,mobile}.jpg.
- HTTP evidence: docs/verification/2026-11-27-image-selection-live.json.

No active preview-deployment URL was available for a new host-level check;
existing preview restrictions were unchanged. No search-thumbnail selection,
indexing, ranking or CTR outcome is established by these acceptance checks.
