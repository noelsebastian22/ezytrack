# Memory — Site Animations

Last updated: 2026-06-14

## What was built

Added animations across 8 files — tab transitions, gallery lightbox, mobile menu, and scroll entrances for 3 static sections. Pure CSS/Tailwind, zero new dependencies.

- **`src/styles/globals.css`** — added 3 new `@keyframes` + utility classes: `fade-in` (250ms), `scale-in` (250ms), `slide-down` (200ms). Kept existing `fade-in-up`.
- **`src/components/UseCases.tsx`** — converted from single-panel render to all-panels-stacked-absolute with opacity crossfade (300ms ease-in-out), matching SoftwareShowcase pattern.
- **`src/components/Gallery.tsx`** — lightbox opens with fade-in backdrop + scale-in image. Closes with backward transitions (200ms). Prev/next crossfades images (150ms fade-out → swap → fade-in). Controls/counter fade with close. Added `closing` and `imageVisible` state.
- **`src/components/MobileMenu.tsx`** — slide-down on open (`animate-slide-down`), fade+slide-up on close (180ms). Added `closing` state with timeout-driven DOM removal.
- **`src/components/ProcessGrid.astro`** — heading and 3 cards get staggered `fade-in-up` (0ms, 150ms, 250ms, 350ms delays).
- **`src/components/HardwareBar.astro`** — heading, subtitle, and 4 spec cards get staggered `fade-in-up` (0ms to 500ms delays).
- **`src/components/BenefitsSplit.astro`** — title, 3 paragraphs, CTA, and image get staggered `fade-in-up` (0ms to 600ms delays).

## Decisions made

- **Pure CSS/Tailwind for all animations** — no framer-motion or external libraries. Follows established project pattern.
- **UseCases adopts SoftwareShowcase's crossfade pattern** — stack all panels absolute, toggle opacity. Consistent UX between both tab components.
- **Mobile menu uses timeout-driven closing state** — keeps DOM mounted for 180ms during close animation, then removes. Prevents instant disappearance.
- **Lightbox uses same timeout pattern** — 200ms for close, 150ms for image nav crossfade. State machine: `closing`, `imageVisible`.
- **Astro components use pure CSS animation** on page load — no IntersectionObserver needed for above-the-fold sections. `opacity-0` + `animate-fade-in-up` with staggered `animation-delay` inline styles.
- **No over-engineering** — kept Astro files as Astro (no React conversion), didn't add unused keyframes, reused existing patterns.

## Problems solved

- UseCases had zero tab transition — completely static DOM swap. Now has smooth crossfade.
- Gallery lightbox appeared/disappeared instantly — harsh UX. Now has polished open/close/nav transitions.
- Mobile menu popped in/out abruptly — now slides.
- ProcessGrid, HardwareBar, BenefitsSplit were completely static on load — now have staged entrances matching the rest of the page.

## Current state

`npm run build` passes clean. All animations functional.

**Known issue (critical):** UseCases now renders all 3 panels simultaneously due to crossfade pattern, but the single `imageError` boolean is shared. An error on any panel's image sets it to true and shows "Image unavailable" on the active panel even if that panel's image loaded fine. Fix: track errors per tab using a `Set<string>` of errored tab IDs. The existing `useEffect` resets `imageError` on tab change, partially masking this.

**Known issue (minor):** SoftwareShowcase active-tab indicator refinement (subtle pulse/scale on the active tab button) was planned but not implemented. The crossfade works fine without it.

## Next session starts with

Fix the critical UseCases `imageError` bug — convert the shared boolean to a `Set<string>` tracking errored tab IDs, and check `errors.has(activeTabId)` when deciding whether to show the error state.

## Open questions

- None.
