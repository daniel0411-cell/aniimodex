# Editorial diagrams: source, ownership and maintenance

Created November 27, 2026. These are original AniimoDex explanatory vectors,
not gameplay captures, tested purchases, account transfers or newly verified
availability claims. No third-party artwork, screenshots or font files are
included. System fonts are rasterized by Sharp. AniimoDex owns the original
layout and explanatory copy. No game-art reuse permission is claimed or needed
for these text/shape diagrams.

## Evidence and reader task

| Diagram / selected guide | Reader decision / existing evidence |
| --- | --- |
| Download / how-to-download-aniimo, aniimo-mobile | Choose an official route, check region/device, separate installation from login/progress issues. `data/access-guides.ts`, `OfficialDownloadLinks.tsx`, mobile guide in `data/launch-guides.ts`. Store-route observations remain October 23, 2026; links do not guarantee regional access. |
| Account / aniimo-crossplay-cross-save, aniimo-progress-account-safety | Separate multiplayer, unlink and save transfer. `novemberAccountBlocks` in `data/launch-guides.ts`: November 5 patch v1.1.3880756.0, checked November 6, documents Steam/Epic unlink entry. Does not establish relink rules, universal platform pairs, save/purchase transfer or recovery success. |
| Spending / is-aniimo-free-to-play | Identify offer, check eligibility/window/price/limit, compare with goal. `currenciesGuide` in `data/launch-guides.ts`. Historical rewards are not currently claimable by implication. No independent shop transaction or delivery tests. |
| Monetization / is-aniimo-a-gacha-game | Distinguish base-game price, randomness and paid gameplay impact. Existing localized guide in `messages/*.json`: storefront purchase disclosure and official probability source are different claims; no complete current pricing/impact evidence establishes a pay-to-win verdict. |

Original source targets remain linked in those articles, including
https://www.aniimo.com/ and the official store routes. No primary source was
freshly browsed for this diagram-only release. Evidence dates and article
modification dates remain unchanged. Diagrams inherit the article's uncertainty;
revisit them when official account or monetization policy materially changes.

## Reproduce and review

Edit localized `assets/editorial-diagrams/content.json`, then run:

```sh
NODE_PATH=/path/to/tooling/node_modules node scripts/render-editorial-diagrams.cjs
```

Sharp is an authoring dependency available in the workspace runtime; it is not
needed by deployment/CI. Commit the editable SVGs, WebPs and generated hash
manifest together. The build-integrated image checker detects content/output
hash drift, wrong dimensions, missing images, oversize assets and body/OG/schema
inconsistency. A matching hash does not prove factual accuracy or visual quality.
Review every locale for readable text, clipping and preserved uncertainty.

Images follow a complete initial HTML answer/checklist section; all essential
facts remain in readable HTML with source links. Selected images are shared by
body, article schema, social metadata and guide-hub preview. Native 720x720 WebP;
no upscaling or artificial 1200px expansion. Full-size link remains available.

## Material gaps and owner support

The owner does not play the game and cannot provide captures (confirmed
November 27). No screenshot request blocks publishing useful text or original
diagrams. Do not solicit account credentials or ask the owner to play merely to
fill visual coverage.

For future genuine captures, obtain a willing contributor or a clearly licensed
official media asset. Attribution alone is insufficient. Record creator, exact
source, permission scope, platform, interface language, version and capture date.
Prioritize these tasks only when a source can document the matching operation:

- Event/handbook: eligibility, event page claim entry and claim state. Distinguish
  free shop gifts from cumulative-spend tiers; never fabricate reward delivery.
- RV/homeland/farm: actual placement, production or recipe screen beside the
  specific operation explained; no inferred item stats or tested yields.
- Controller/language: real settings and device context; never imply every
  platform shares a menu or mapping.
- Holo Battle/Egg Heist: real mode selection/objective display with dated rules.

Remove UID, email, receipts and other private data before accepting a capture;
prefer framing that never includes them. No assets are purchased. Until an
appropriate source exists, keep these guides text-first without unrelated art.
Trust/legal pages and broad update/roadmap articles need no forced hero image.
