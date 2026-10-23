# Access guide consolidation and source refresh

Baseline: clean main 46065d5, fetched origin/main equal (0 local / 0 remote).
Observation date: 2026-10-23. Scope: access-guide overlap, current download
routes and official Wiki index drift. This is not an AdSense approval finding.

## Visitor tasks and changes

- Platforms: choose an official route for a device and understand regional limits.
  Consolidate PS5 and Nintendo Switch articles here: their useful answers were
  already covered by the platform overview. Retain both slash variants via 301.
- Download: select a client, check requirements, distinguish store redirects,
  device incompatibility, download failures and account/login failures. Replace
  repeated availability tables with concrete next checks and clickable official
  routes. No installation was performed.
- Release history: explain time zones and the separate mobile launch. Merge the
  obsolete preload article here; preserve its historical question and 301 URLs.
- Mobile: retain separately because device requirements, missing store actions,
  overheating and account switching are distinct tasks. Older source dates stay
  intact; no new mobile benchmark or compatibility test is claimed.
- Crossplay, system requirements and free-to-play: retain their distinct account,
  hardware and purchase questions. They were reviewed for overlap, not freshly
  reverified claim by claim in this release.

## Primary sources observed through the background browser

- https://www.aniimo.com/ (English selected through the language menu): PC
  launcher, Steam, PS5, Xbox, Epic and expanded App Store/Google Play links.
  No Nintendo route observed. This is absence from this route list, not proof
  that no announcement exists anywhere.
- https://store.steampowered.com/app/4126040/Aniimo/: free Play action,
  Pawprint Studio, September 15 release date, cross-platform multiplayer,
  Windows 10 minimum and 40 GB storage. Locale redirected to Chinese.
- https://apps.apple.com/app/aniimo/id6759098797: redirected to China App Store
  home page. This did not verify current app availability or removal worldwide.
- https://store.playstation.com/concept/10018491: navigation timed out. Existing
  September 14 launch evidence retains its date, not a new October verification.
- https://wiki.aniimo.com/ (English selected): 86 visible named entry links;
  current routes use /item/{number}/basic-form rather than the old page IDs.
- https://wiki.aniimo.com/item/012/basic-form: Irisal, grass DPS, new detailed
  attributes, habitats and skills. This is a sample of schema drift, not a
  complete refresh of every detail record.

## Wiki findings and remaining work

The August snapshot contains 92 records; the current index lists 86. Exact name
matching finds 80 old records: 12 retain their number and 68 have a different
number. Twelve old records have no exact current name match, including the
punctuated `Budclaw.`. Do not infer deletion, rename or identity for those rows.
New entries and gaps must not be dropped by the old three-digit parser.

Persist the observed index separately and resolve current outbound entry links
by exact name, never by the old numeric URL. Historical local URLs and detail
snapshots remain stable. Mark Dex and data-guide pages as historical and remove
the green scope panel on Dex pages so visitors can see the limitation before
using the data. No skill, habitat, role or count is relabelled as October data.

Full current-version detail migration remains outstanding: a new parser must
handle named forms, five-digit entries, changed schema and stable identities;
then recheck derived collections, tools, localized names and old-URL redirects.
Do not run the old synchronization scripts against the changed site and treat
partial success as a safe replacement. This release reduces misleading
freshness and repeated guides; it does not finish the full Wiki migration.

## Validation

Production build and lint/type checks passed. Existing data, review-fix,
content-quality, index-recovery and Bing-recovery checks passed. The new
guide-consolidation checks passed, including retired HTML/sitemap absence,
internal links, redirects, launch conversion and Wiki identity mapping.
SEO audit passed: 465 HTML pages and 208 sitemap URLs.

Browser checks covered the desktop platform page, 390px mobile download and
Dex pages, release history and the Helmut legacy #062 to current #061 link.
No whole-page horizontal overflow was observed on the checked access pages.
The download checklist distinguishes Steam's October 23 40 GB listing from the
older Epic 30 GB requirement; neither is presented as measured download size.

Pre-publication fetch kept origin/main at 46065d5 (0 local / 0 remote).
Deployment and production redirect results are recorded in the release
checkpoint outside the repository after publication.
