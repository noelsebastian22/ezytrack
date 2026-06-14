# Memory — Quote Form

Last updated: 2026-06-14

## What was built

**Quote Form section** — new contact form placed after Gallery and before Footer. Replaces all site-wide `mailto:` links with `#quote-form` anchor scroll.

- **`src/components/QuoteForm.tsx`** — new React component (`client:visible`). 6 fields: Name, Email, Phone, Company, Fleet Size (select), Message. Client-side validation with inline field-level errors (red border + message using `text-brand`, `border-brand`). Loading state (spinner + "Sending…", button disabled). Success state (inline card with `CheckCircle` icon + title + message, replaces form). Stub `handleSubmit` with console.log and 1s delay — ready for Zoho integration later. IntersectionObserver fade-in.
- **`src/data/siteContent.ts`** — added `FormField` type (name, type, label, placeholder, required, options) and `quoteForm` section to `SiteContent` type and data object. All labels, placeholders, fleet size options, success text, privacy note in the data file.
- **`src/pages/index.astro`** — imported and rendered `<QuoteForm client:visible />` after `<Gallery client:visible />`.

**CTA link replacement** — all `mailto:` links replaced with `#quote-form` across:
- `src/components/Header.astro` — hardcoded mailto → `#quote-form`
- `src/components/Hero.astro` — mailto → `#quote-form`
- `src/components/BenefitsSplit.astro` — mailto → `#quote-form`
- `src/components/FeaturesChecklist.tsx` — mailto → `#quote-form`
- `src/components/UseCases.tsx` — mailto → `#quote-form` (all 3 tabs)
- `MobileMenu.tsx` — no change needed, inherits `ctaHref` prop from Header
- Footer email link **untouched** — remains as direct contact option

## Decisions made

- **No toast library** — inline success state in the component. Matches taste preference.
- **No backend** — stub handler with console.log, Zoho integration deferred.
- **All CTAs → `#quote-form`** — unified flow. Footer keeps raw email.
- **Form data in `siteContent.ts`** — follows decoupled content pattern.
- **Review passed** — 0 issues across plan alignment, system integrity, and production readiness.

## Problems solved

- Previously fixed (before this session): UseCases `imageError` bug — converted from shared boolean to per-tab `Set<string>` (`erroredTabs`).

## Current state

`npm run build` passes clean. QuoteForm ships at 6.40 kB (2.08 kB gzipped). Zero new dependencies. Review passed with 0 issues.

## Next session starts with

Integrate Zoho forms — replace the stub `handleSubmit` with an actual API call. Zoho endpoint URL and field mapping will be needed.

## Open questions

- None.
