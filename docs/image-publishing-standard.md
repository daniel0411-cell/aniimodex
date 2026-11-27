# Image publishing standard

Adopted November 27, 2026. Applies with `content-quality-standard.md` to new
content, material updates, data pages and tools. Search engines choose whether
and which image to display. This policy cannot guarantee a thumbnail or CTR.

## Editorial selection and rights

1. State the visitor task and what the image explains. Prefer genuine operation
   screenshots, original explanatory diagrams or relevant, attributable assets.
   Direct answers and critical operations come first. Put the figure beside its
   explanation; never add an unrelated hero just to qualify for search display.
2. Reuse a useful image where the task matches; unique artwork per URL is not
   required. Do not use keyword posters or fabricate game/product UI, gameplay,
   testing, rewards, account balances or personal experience. Label conceptual
   and AI-assisted artwork explicitly. A screenshot of our tool is not gameplay
   proof; retain model assumptions and evidence limits in HTML beside it.
3. Record source URL/file, creator/rightsholder, publication or capture date,
   transformations, usage permission/license and its scope. Attribution alone
   is not a license. Use owned/authorized assets for new work; if permission is
   unclear, record a gap and choose another asset or publish without a figure.
   Do not buy stock for this task. Existing official CDN hotlinks are not proof
   of a separate reuse license. Review them if terms change or removal is asked.
4. For captures: use a clean isolated browser; omit credentials, account details,
   private configuration and ads. Record viewport and actual state. Crop genuine
   content without changing results. Do not erase evidence warnings. Recheck a
   screenshot whenever the illustrated UI, rules or data scope changes.

## Implementation

- Register selected guide assets in `data/editorial-images.json` and select tasks
  in `lib/editorial-images.ts`. Give each locale accurate alt/caption text. Store
  source, rights basis and observation date. Keep detail-image measurements in
  `data/dex-images.json` aligned with the source URL. New/changed CDN images need
  an actual load/dimension check; never guess dimensions.
- Hub article previews must reuse the selected article registry asset and link to
  the corresponding article. Leave unsupported tasks as useful text entries; do
  not substitute brand or unrelated art to achieve a visual coverage percentage.
- Record `previewUsage` and `previewReason` separately from body usefulness.
  Text-led diagrams, very wide lookups and dense field/table captures can remain
  beside an HTML explanation without being preferred search/social images.
  Avoid text-led images for preferred previews; do not create keyword posters.
  A real WebApplication screenshot can remain as a descriptive `screenshot`
  property without also becoming its `image`, Article image or OG preview.
- An eligible body representative, OG, Twitter and applicable Article/WebPage image must
  identify the same content. Use `imageMetadata` and the registry. Avoid generic
  brand art as an individual creature or article representative. Index/landing
  pages may retain an accurate brand share card. No suitable image means omit
  the image claim and record the gap; do not borrow unrelated imagery.
- Render a standard `img` (Next Image currently exports one) with true intrinsic
  width/height. Use concise, descriptive alt; no keyword lists. Decorative images
  can have empty alt. Add visible HTML captions for source, context and limits;
  do not make essential instructions accessible only as pixels.
- Preserve aspect ratio and mobile containment. Do not enlarge low-resolution
  screenshots. Keep a full-size link and working tool/text alternative when dense
  screenshots shrink on phones. Compress at source: static export has no image
  optimizer. Current selected asset budget is 160KB; review an exception instead
  of sacrificing legibility. Lazy-load below-answer figures; prioritize only
  genuine above-fold essentials. Do not preload every image.
- 1200px is not a universal ordinary-search-thumbnail threshold. Keep honest
  native sizes, e.g. 768px illustrations and 808px calculator captures. Larger
  formats have their own requirements; never upscale or misreport dimensions.
- Allow `max-image-preview:large` on indexable production pages. This permits a
  preview; it does not require Google to use one. Retain all noindex, preview-host
  and 404 restrictions. Do not add global headers that undo host restrictions.
- Template, alt, metadata and compression changes alone must not refresh article
  `datePublished`, `updatedAt`, source-check dates or sitemap lastmod.

## Release acceptance

Both `npm run build` and `npm run pages:build` enrich the exported sitemap and
run `images:check` after export. `node --test scripts/enrich-image-sitemap.test.mjs`
checks canonical/noindex exclusion, deduplication, XML escaping and idempotence.
The sitemap extension only adds registered first-party body images on existing
approved guide and Team Builder URLs. It preserves URL membership and dates.
A sitemap image is a discovery aid, not a preferred-preview claim: useful
body-only diagrams can be listed there. Do not copy external CDN art or claim
control/verification of a third-party CDN.
It checks file dimensions/budgets/provenance fields, local image existence,
OG/Twitter agreement, body/structured-data agreement, measured Dex coverage,
preview permission and 404 noindex. It also rejects unmeasured remote share
images. Keep the coverage assertions aligned when deliberately selecting a new
task. Automated checks cannot establish visual relevance, authenticity, rights,
legibility or Google's selection; an editor must review those.

Before release: inspect representative guide, tool, Dex, missing-image and 404
cases in all locales at desktop and phone viewports; record actual width/height.
Check image decoding, captions, layout shift reservations, document overflow,
body and head/schema URLs, robots.txt and response headers. Preview noindex must
remain effective. After deployment verify formal page HTML and asset HTTP status,
MIME and decoded dimensions; save desktop/mobile screenshots and a checkpoint.
If live host verification is unavailable, say so and leave that check pending.

Google primary references (Images and image sitemap verified through browser
on November 27, 2026; the other links remain reference targets):
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
- https://developers.google.com/search/docs/appearance/google-images
- https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
- https://developers.google.com/search/docs/appearance/structured-data/article

The absence of a tag alone does not explain a missing search thumbnail. Consider
crawl access, page relevance, image quality and search presentation separately;
use actual Search Console evidence if investigating an observed SERP issue.

Original decision diagrams follow `docs/editorial-diagram-evidence.md`: preserve
editable localized source and generated assets together, label their editorial
nature, and keep equivalent instructions in HTML. Regenerate after source edits;
review facts, readable text and clipping in every locale. Missing genuine game
captures do not justify invented UI or repeated requests to an owner who cannot
provide them. Record a licensed-source/contributor plan instead.
