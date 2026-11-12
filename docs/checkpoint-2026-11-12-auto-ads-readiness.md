# Auto ads readiness - 2026-11-12

## Scope and baseline

User authorized adjusting website loading while retaining privacy controls,
publishing the change, and explaining subsequent AdSense dashboard steps.
Fetched origin at task start: clean main, HEAD and origin/main both 489c5a9,
0 local-only / 0 remote-only commits. Dashboard settings are not changed here.

## Evidence and implementation

- Previously the ad library was loaded only when an existing manual slot was
  found. Eligible pages without a manual slot can now load it after consent.
- Explicit locale-neutral allowlist: homepage, 35 published guides, and Dex,
  habitat, evolution and ability directories (40 paths, three locales).
- Tools, Dex details, element details, guide index, verification guide,
  information/policy and unknown paths are excluded. Missing scope fails closed.
- Existing European TCF, US applicability/GPP, opt-out, GPC and error gates are
  retained. Consent withdrawal pauses requests and hides known ad elements;
  previously transmitted requests cannot be undone.
- After the ad library starts, cross-page navigation creates a fresh document
  to clear prior placements. This trades SPA navigation for ad isolation.
  EU privacy-choice links still reopen the CMP before navigation handling.
- Original three manual guides x three locales remain unchanged (nine units).
- Three privacy translations and privacy sitemap date reflect the change.
- Synthetic live-CMP fixture now declares its test-only allowed path. This
  does not allow production privacy pages.

## Validation

- Final npm run build: 495 static routes; compilation, lint and types passed.
- check-advertising.cjs --export-enabled passed, including no-slot loading,
  three-locale exclusions, consent withdrawal and document navigation, with no
  network or real inventory requests.
- Content quality checks and SEO audit passed (486 pages, 211 sitemap URLs).
- git diff --check passed.
- In-app browser inspected all three privacy translations; mobile Chinese
  pages at 390px had 375px document width, without horizontal overflow.
- Desktop English privacy page rendered scope count 40 and zero manual units;
  selected original guide retained exactly one manual unit.

## Dashboard observations and remaining checks

Earlier signed-in Chrome observation: Auto ads off, auto optimize on, one
active European and one active US privacy message. User screenshot later
showed Auto ads on in preview with overlay formats 3/3; saved application was
not confirmed. Existing messages do not need recreation for this code change.

Recommended initial dashboard settings: Auto ads on, overlay formats off,
intent-driven formats off, in-page banners on at low density, then Apply to
site. Reassess density and placement after actual user traffic.

Local previews deliberately do not contact Google. This task does not claim
new live geographic CMP testing, actual Auto ads fill, display timing or
revenue. Full live CMP runner was updated but not executed in this task.
Deployment result is reported separately after commit/push verification.
