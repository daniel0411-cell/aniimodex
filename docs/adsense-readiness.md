# AdSense release checklist

This file is an implementation guardrail, not a claim that AdSense approval is guaranteed.

## Before applying

- Verify `privacy@aniimodex.com` and `copyright@aniimodex.com` receive mail.
- Keep About, Privacy, Terms and How We Verify linked from every page.
- Do not add an `ads.txt` publisher record until the real AdSense publisher ID is known.
- Recheck that indexed guides have named sources and that unsupported drafts remain unpublished.
- Test the site logged out on mobile and desktop with JavaScript enabled and disabled where practical.

## Before enabling ads

- Install Google's current AdSense code only from the publisher account that owns the site.
- Use a Google-certified CMP for visitors in the EEA, United Kingdom and Switzerland before non-essential advertising storage is used.
- Add the exact authorized-sellers line supplied by AdSense to `/ads.txt`.
- Do not place ads so they resemble navigation, game controls, official store links or download buttons.
- Keep ads away from search inputs, filters, previous/next controls and dense clusters of internal links.
- Reserve stable ad dimensions to prevent layout shift and keep content visible without an ad click.
- Never click live ads, ask users to click, buy incentivized traffic or test production ads with automated browsers.
- Exclude legal pages, error pages and other low-content utility surfaces from Auto ads if placements reduce usability.

## Ongoing review

- Review Policy Center, consent messages and `ads.txt` status after launch.
- Keep privacy disclosures aligned with the analytics, consent and advertising vendors actually in use.
- Remove or improve pages that become stale, unsupported or materially duplicative.
- Treat game artwork, names and descriptions as third-party rights-holder material and honor substantiated correction or removal requests.
