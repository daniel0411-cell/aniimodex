# Content release - November 1, 2026

## Scope and baseline

User authorized completing the next content batch and committing/deploying all
previous intended local updates. Fetched origin: main and origin/main both
38fd58e, zero commits on either side. Preserve unrelated .workbuddy/ outside
the release. Includes the October 28 Dex reading batch and November 1 event,
issue and snapshot-scope batch documented in their separate checkpoints.

## Reader tasks and evidence

Re-read the official October 27 S1 Part 2 announcement through the Steam news
API on November 1. Publication date is distinct from the October 29 update.
https://steamcommunity.com/games/4126040/announcements/detail/687520329382238609

October 30 fixes:
https://steamcommunity.com/games/4126040/announcements/detail/686395063661496366

Reused existing URLs rather than creating overlapping announcement articles:

- Version update: locate story, title, Ascension or Resonance progression gates.
  The survey event quest requirement is not asserted as universal map entry.
- Egg Heist: choose fair PVP versus PVE/Chaos by entry requirements, equipment
  rules and final Twine ownership; locate recovery effects and warehouse eggs.
  New-egg pool changes do not silently apply to pre-update inventory.
- Potential guide: select hue, form or growth items by effect and limitation.
  Individual unlocks, Credits cost, duplicate Sigils and unchanged Acquired
  Potential prevent conflating appearance with stat improvements.
- Forms: concise current Hue and Umbral clarification linking to the decision
  table; no duplicate full item guide. Roadmap explicitly separates historical
  October 1 plans from the specific functions in the October 29 announcement.

All changes cover English, Simplified Chinese and Traditional Chinese.
Source dates and actual editorial update dates remain separate. Older Erlath,
October 13 feedback and October 15 patch references retain historical scope.

## Evidence gaps

No live gameplay tested. No complete island quest chain, coordinates, optimal
route/team, full hatch pool, numeric PVP reward odds, hue distribution, purchase
prices or material recipe quantities are invented. PVP schedule's absolute
timezone is not established by its announcement segment: use the server panel.
Overlapping Prismana Orb names remain explicit; verify current item targets.
No new URLs, mass noindex, indexing submissions or AdSense review requested.

## Validation and deployment

- Production build, lint and type checks passed: 486 generated entries.
- All 14 data, review, catch, editorial, consolidation, quality, index/Bing,
  October feedback, support, guide tasks, Dex reading, Part 2 and SEO scripts
  passed. SEO audited 477 HTML pages and 211 sitemap URLs.
- Expanded Part 2 checks cover all three locales, progression gates, mode
  distinction, individual item restrictions, current-before-historical ordering,
  dated sources, indexability and existing localized link targets.
- Independent headless browser passed 1365x900 and 390x844 for all three locales
  on the four current decision pages, section anchors, contained/focusable
  tables, task navigation and actual image loading. Schedule test also passed
  all server choices, different start times, future expiry and runtime checks.
- Visually inspected mobile item table and desktop progression checklist.
  Mobile tables intentionally scroll within a named, keyboard-focusable region.
- No new public URL, sitemap count or indexability policy changes.

Pre-push origin fetch completed again with no new upstream commits. Production
verification follows the GitHub-triggered Cloudflare build. Earlier checkpoints
record their own pre-release state, not a claim that this release was live then.
