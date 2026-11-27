# Search images: November 27, 2026

## Baseline and audit before implementation

Freshly fetched main/origin/main at `94f4a75`: 0 local-only / 0 remote-only;
clean checkout. User authorized image audit, fixes, standards and the existing
commit/push/Cloudflare Git deployment workflow. Read AGENTS, content standard,
Next config, rendering templates, guide records, robots and release notes.

Next 14 static export, React18/next-intl, Cloudflare Pages; images unoptimized.
Build commands previously only ran Next; no separate CI workflow in repository.

Confirmed in source and existing exported pages:
- Published guides mostly lacked selected body/OG/Twitter/Article image records.
  Existing image fields primarily belong to three unpublished legacy articles.
- Sparkling operation guide already has three useful 768x512 WebP conceptual
  illustrations and explicit AI/non-game disclosure; no representative metadata.
- All 102 Dex route records share a generic brand image in social metadata even
  though each body already uses its own official CDN character illustration.
  WebPage schema does not identify that representative image.
- Brand OG PNG is actually 1200x624, 779,493 bytes; metadata claims 1200x630.
- No explicit large-image preview permission in indexable page metadata.
- Homepage links use legacy decorative game-style art unrelated to specific
  current support/account questions; provenance for those old JPEGs is unclear.
- robots.txt allows crawling; no source rule blocking local images. Source access
  alone does not prove every Googlebot request succeeds. 404 is separately noindex.

Not established: any observed Google search thumbnail failure, causal effect of
missing tags, current Google indexing/CTR, or a guaranteed presentation outcome.
Browser MCP research unavailable this session; Google reference URLs are not
represented as newly read. Isolated Chrome through Playwright is available for
own-site testing/screenshots, without using personal browser credentials.

## Implementation and asset evidence

Six guide tasks x3 locales: catching, Twine explanation, choosing by mobility/role,
mobility directory, element explanation, Sparkling/growth. Shared registry drives
body, OG, Twitter and Article ImageObject. Sparkling reuses the existing in-body
reroll illustration instead of adding another hero. Body figures follow lead/
direct-answer sections; captions and full-size/tool links preserve mobile use.

Nine real screenshots captured November27 from the existing static website at
1200x900 (catch/type) and 1200x1200 (Twine result crop). No fake game UI or
numeric test result. Catch shows unknown inputs, Twine Take Off filtered results, type
matrix retains the unknown matchup. Community/assumption limits remain in HTML
captions. Registry stores provenance and original site-UI usage basis; underlying
game icon ownership is not claimed. New captions are translated in three locales.

All 102 existing official CDN principal illustrations loaded successfully in
isolated Chrome, and native dimensions were measured November27. Kept original
hotlinks and recorded URL/dimensions; no new copied character-art files or license
claim. Dex body/social/WebPage image now agree. Changed CDN URLs require remeasure.

Generic brand card lossily compressed to 46,132-byte WebP at native1200x624, used
on landing/index pages and tools without a selected representative. Three related
tools now share their actual localized UI captures. Original PNG stays available
for existing external links. Removed unrelated legacy art from homepage guide
links; legacy unpublished pages/assets remain untouched. Guide dates, source-check
and sitemap lastmod are unchanged. Privacy, ad loader, robots.txt and _headers
are untouched; page robots add large-preview permission without changing index flags.

Permanent policy: `docs/image-publishing-standard.md`, referenced in AGENTS.
Build and pages:build both enforce `scripts/check-editorial-images.mjs`.
SEO noindex detection now parses directive tokens, so adding preview directives
cannot hide noindex from the existing audit.

## Remaining asset gaps and next capture plan

No invented image fallback. Other published guides intentionally remain without
an article image until a useful, authorized asset exists:
- Platform/download/controller/account troubleshooting: genuine public launcher,
  store/platform or settings captures with personal identifiers omitted; capture
  only when platform/version and reproduction evidence are available.
- Egg Heist/PVP, event tracker/Jaguaraun, RV/home, farm and currency/shop guides:
  genuine live mechanics/event/menu captures with server/date/version; exact
  task, shop and reward panels remain unavailable. No fabricated receipts/UI.
- Progression, roadmap, update/status, forms/evolution, habitats and general
  introduction: select verified source figures or original evidence-backed diagrams
  only when they simplify a concrete decision. Do not substitute unrelated art.
- Getting-started and free/gacha guides: task-specific operation/cost comparisons
  would help more than a generic hero. Wait for reliable relevant screenshots.
- Official CDN art is existing attributed external content, not an independently
  licensed asset library. Reassess against rightsholder terms before new reuse.
- Brand art provenance predates this task; retained only as site identity. Review
  original ownership records before broader promotional redistribution.

### Exact guide inventory without a selected article image

Thirty guide URLs per locale have no selected Article/OG image after this change.
This is an inventory, not a requirement to add pictures everywhere: verification
methodology/status pages may already complete their task with text. Prioritize
real platform/download, event and home operation captures from the groups above.

- `aniimo-crossplay-cross-save`
- `aniimo-dev-dispatch-roadmap`
- `aniimo-egg-heist`
- `aniimo-evolution-system`
- `aniimo-forms-explained`
- `aniimo-habitats-locations`
- `aniimo-harvest-gathering-farm-guide`
- `aniimo-holo-battle-interlink`
- `aniimo-language-controller-support`
- `aniimo-launch-checklist-known-issues`
- `aniimo-launch-watchlist`
- `aniimo-mobile`
- `aniimo-multiplayer`
- `aniimo-platforms`
- `aniimo-pre-registration`
- `aniimo-prismana-event-tracker`
- `aniimo-progress-account-safety`
- `aniimo-release-date`
- `aniimo-roles-explained`
- `aniimo-rv-homeland-guide`
- `aniimo-system-requirements`
- `aniimo-team-composition`
- `aniimo-version-1-1-update`
- `getting-started`
- `how-to-download-aniimo`
- `how-we-verify`
- `is-aniimo-a-gacha-game`
- `is-aniimo-free-to-play`
- `official-aniimo-dex-status`
- `what-is-aniimo`

## Validation and publication

- Final Next build passed: 495 static outputs, built-in lint and TypeScript.
- Integrated image validation passed: 12 localized records, 18 selected guide
  pages, 306 Dex pages. Native image dimensions, asset budgets/local resources,
  OG/Twitter/body/schema consistency, large-preview policy and raw 404 noindex.
- Content quality, consolidation, advertising/CMP, Sparkling decision, guide tasks,
  Dex reading, Part Two, November patch and event/Dex checks passed. SEO audit:
  486 localized pages, 211 sitemap URLs. `git diff --check` passed.
- Isolated Chrome QA: 78 page/viewport combinations (13 pages x3 locales x2).
  Actual desktop1365x900 and phone390x900, DPR1. All selected body images decoded,
  no representative enlargement and no document horizontal overflow. Included
  all six selected guides, two Dex cases, three tools, a missing-image platform
  guide and homepage. Inspected desktop/phone figure/caption and Dex screenshots.
- First QA run reached all page cases but its DOM-only 404 assertion timed out:
  the static 404 response contains noindex, while client navigation does not
  retain that element. Rechecked raw response HTML (also checked by build script)
  in the final successful run; no 404 source behavior changed in this task.
- All capture/QA contexts isolated; ad and tracking endpoints blocked during QA.
  No personal sessions, ad interactions, credentials or private config saved.
- Guide data, sitemap source, source-check records, robots.txt, _headers and
  ad/privacy implementation have no changes. Article update dates preserved.
- Screenshot evidence and full case inventory: /tmp/aniimo-image-qa/.

Formal-domain HTML, HTTP resource/headers and screenshots pending publication.
