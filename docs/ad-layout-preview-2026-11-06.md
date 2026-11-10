# Local guide ad layout preview

- Baseline: main 6c363c6, fetched origin on November 6; upstream difference 0/0.
- User authorized placeholder layout only. No push, deployment or live-ad test.
- Publisher supplied a responsive display unit and confirmed Auto ads disabled.
  The unit has not been integrated; preview contains no ad slot or ad initializer.
- Preview requires both development mode and AD_LAYOUT_PREVIEW=1.
  Development layout excludes the existing AdSense loader on every route.
- Three guides: prismana potential/breeding, RV Homeland, version 1.1 update.
  Each has one placeholder after the article's sources/editorial attribution,
  before related tools/articles. No article content or freshness dates changed.
- Reserved preview height: mobile 250px, desktop 280px. This is a layout
  sample, not a promise of actual responsive creative size or ad fill.
- Start: AD_LAYOUT_PREVIEW=1 npm run dev -- --hostname 127.0.0.1 --port 3016
- Validation: ESLint and git diff --check; Playwright checks three languages
  at 390px and 1365px, one placeholder per selected guide, no horizontal
  overflow, no AdSense loader/unit, and zero attempted ad-network requests.
  An excluded guide must contain no placeholder. Screenshots in /tmp.
- Additional responsive self-test: 45 combinations (three guides, three
  languages, widths 360/390/768/1365/1920), including mobile touch emulation.
  Checked ad geometry/spacing, no horizontal overflow, menu open/close,
  outline anchor navigation and decision-tool state changes. All passed;
  zero runtime errors and zero attempted ad-network requests. Results:
  /tmp/aniimo-ad-responsive-results.json. Independent browser closed in finally.
- Real ad rendering, consent management, fill and revenue are outside scope.
  Production never renders this placeholder. The subsequent privacy task
  removes the existing advertising loader in every environment; see
  privacy-consent-readiness-2026-11-06.md.
