# Memory — Review Cleanup & Broken Image Fix

Last updated: 2026-06-13

## What was built

Fixed all remaining review issues + broken gallery image:

- **`src/components/Hero.astro`** line 29 — `text-white/90` → `text-text-inverse-muted`
- **`src/styles/globals.css`** — removed dead `--color-banner-start` / `--color-banner-end` tokens (zero source references)
- **`src/data/siteContent.ts`** gallery image 6 — replaced dead Unsplash URL (`1560170433-c001ac2b4cb1` → 404) with working `1482029255085-35a4a48b7084` ("Driver navigating with GPS")

## Decisions made

- Dead Unsplash image replaced with a working one from the same source — a driver with GPS in-car shot. Alt text updated to match new image content.

## Problems solved

- Hero subheadline was still using raw `text-white/90` instead of the design token `text-text-inverse-muted` — missed during Feature 12 token cleanup
- Dead CSS custom properties (`--color-banner-start`, `--color-banner-end`) were defined in globals.css but never referenced anywhere — safe to remove
- Gallery image "Driver checking route on tablet" was a broken 404 Unsplash URL — replaced with verified working URL

## Current state

All review issues resolved. `npm run build` passes clean. Site is production-ready.

2 minor non-blocking issues remain:
- `text-text-inverse/90` in FeaturesChecklist.tsx line 74 — off-standard, should be `text-text-inverse-muted`
- `ui-registry.md` is stale — references pre-fix values

## Next session starts with

Site is ready. Either deploy/ship, or clean up the 2 minor issues (FeaturesChecklist token + stale ui-registry.md).

## Open questions

- None.
