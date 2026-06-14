## Implementation Plan — Quote Form

### What we are building

A professional quote request form section placed after the Gallery and before the Footer. All 6+ existing "Get a quote" CTA buttons across the site will point to `#quote-form` (smooth scroll anchor) instead of `mailto:`. The form collects Name, Email, Phone, Company Name, Fleet Size (dropdown), and Message. On submit it validates client-side, shows an inline success state (checkmark + confirmation message), and has a stub handler ready for Zoho integration. No external dependencies added.

### Language we agreed on

- **Inline success state**: A success message rendered inside the form component itself (checkmark icon + "Thanks — we'll be in touch"), replacing the form fields after submission. No toast library added.
- **Stub handler**: A placeholder function that logs form data, structurally ready to swap out for a Zoho API call later.
- **All CTAs → `#quote-form`**: Every button on the site currently using `mailto:sales@ezytrack.com.au` will now use `href="#quote-form"` with smooth scrolling. The email stays visible in the Footer for direct contact.

### Decisions made

- **No toast library** — inline success state in the component (matches taste: "Prefer inline component feedback states over external toast libraries").
- **No backend / no Formspree** — stub handler, Zoho integration deferred.
- **React component (`client:visible`)** — enables client-side validation and interactive state. Same hydration strategy as Gallery, FeaturesChecklist, UseCases.
- **All mailto links replaced with `#quote-form`** — unified CTA flow. Footer keeps the raw email for direct contact.
- **Form data in `siteContent.ts`** — follows the existing decoupled content pattern. Field labels, placeholder text, fleet size options, and success message all from the data file.

### How to build it

**Step 1 — Add form data to `siteContent.ts`**

Add a `quoteForm` section to the `SiteContent` type and `siteContent` object:
- `sectionTitle`, `sectionSubtitle` (heading block)
- `fields` array: name, email, phone, company, fleetSize (dropdown with options), message
- `submitLabel`, `successTitle`, `successMessage`
- `privacyNote` (small text under submit button — "We respect your privacy" etc.)

**Step 2 — Create `src/components/QuoteForm.tsx`**

React component with:
- Controlled form state (6 fields)
- Client-side validation (required fields, email format, phone format)
- Error states: inline field-level red border + message (use `text-brand`, `border-brand`)
- Loading state on submit button (spinner + "Sending...")
- Success state: replaces form with checkmark icon (`lucide-react` `CheckCircle`) + success title + message
- Stub `handleSubmit` function: validates → sets loading → waits briefly → shows success. Structured to accept a handler prop or call an API function later.
- Scroll-triggered `animate-fade-in-up` on the section (matching ProcessGrid, HardwareBar pattern)
- Design: white background (`bg-surface-muted` to visually separate from Gallery's white), pill submit button (`rounded-full bg-brand`), `max-w-2xl` centered form, `rounded-2xl` card container

**Step 3 — Insert `QuoteForm` into `src/pages/index.astro`**

After `<Gallery client:visible />` and before `</main>`:
```astro
<QuoteForm client:visible />
```

**Step 4 — Set the anchor ID on the QuoteForm section**

The QuoteForm renders a `<section id="quote-form">` so `#quote-form` links work.

**Step 5 — Replace all mailto links with `#quote-form`**

Update 6 components:
- `src/components/Header.astro` — hardcoded `ctaHref` → `"#quote-form"`
- `src/components/Hero.astro` — `ctaHref` → `#quote-form`
- `src/components/BenefitsSplit.astro` — `ctaHref` → `#quote-form`
- `src/components/FeaturesChecklist.tsx` — `ctaHref` → `#quote-form`
- `src/components/UseCases.tsx` — all 3 tab `ctaHref` → `#quote-form`
- `src/components/MobileMenu.tsx` — receives `ctaHref` from Header, will inherit the change

`scroll-behavior: smooth` already exists on `<html>` in `globals.css` line 4.

### Files to modify

| File | What changes |
|------|--------------|
| `src/data/siteContent.ts` | Add `quoteForm` type + data |
| `src/components/QuoteForm.tsx` | **New file** — the form component |
| `src/pages/index.astro` | Import + render `QuoteForm` |
| `src/components/Header.astro` | `ctaHref` → `#quote-form` |
| `src/components/Hero.astro` | `ctaHref` → `#quote-form` |
| `src/components/BenefitsSplit.astro` | `ctaHref` → `#quote-form` |
| `src/components/FeaturesChecklist.tsx` | `ctaHref` → `#quote-form` |
| `src/components/UseCases.tsx` | All 3 tab `ctaHref` → `#quote-form` |

`MobileMenu.tsx` needs no change — it receives `ctaHref` as a prop from Header.

### Verification

- `npm run build` passes clean
- Click any "Get a quote" button → smooth scroll to form section
- Submit empty form → see validation errors on required fields
- Submit invalid email → see email format error
- Submit valid form → see loading spinner → inline success state replaces form
- Form renders correctly at all breakpoints (mobile: stacked, desktop: 2-column for name/email row)
- No new dependencies in `package.json`
- Design tokens used throughout (no raw hex values, no raw Tailwind colors)
