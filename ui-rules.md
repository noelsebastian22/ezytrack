# UI Rules

Concise rules for building the Ezytrack Marketing Landing Page. These rules cover the most important patterns and constraints to replicate the premium, high-contrast structure of the Radius Telematics reference site while maintaining our decoupled Astro/React architecture.

---

## Font

Always import Inter (or your chosen geometric sans-serif) at the root level. For Astro, it is recommended to use `@fontsource/inter` in your main Layout component to prevent render-blocking requests.

```astro
---
// src/layouts/Layout.astro
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '../styles/globals.css';
---

```

The `--font-sans` variable is already declared in `@theme` in `globals.css`. Never use system fonts as the primary font for headings or body copy.

---

## Page Layout & Containers

The Radius design relies heavily on "full-bleed" background sections containing constrained, centered content.

* **Sections:** All `<section>` elements must be full viewport width (`w-full`).
* **Inner Container:** Main content inside sections is constrained to `max-w-7xl` (1280px), centered (`mx-auto`).
* **Padding:** - Horizontal: `px-4` on mobile, `md:px-8` on tablet/desktop.
* Vertical (Section gaps): `py-16 md:py-24` to maintain premium, breathable spacing.


* **Alternating Backgrounds:** Alternate strictly between `bg-background` (white), `bg-surface-muted` (light gray), and `bg-surface-dark` (near black) per the reference blueprint.

---

## Navbar

* **Layout:** Flex container. Logo left, navigation links center, CTAs right.
* **CTAs:** Two primary actions.
* "Login": A ghost button/link routing to `https://ezytrackaus.telematics.guru/` (`target="_blank"`).
* "Get a quote": A solid `bg-brand` pill button.


* **Background:** Always `bg-background` (white) with a subtle bottom border (`border-b border-border`) or soft shadow. Height fixed around 72px to 80px.

---

## Typography Hierarchy

Four levels used consistently throughout the landing page:

**Hero Heading (H1)** — Massive impact, usually on a dark overlay.

```css
font-size: 40px (mobile) to 48px/56px (desktop)
font-weight: 700 (Bold)
color: text-text-inverse (white)
line-height: tight

```

**Section Headings (H2)** — Titles for major page blocks.

```css
font-size: 32px to 36px
font-weight: 700
color: text-text-primary (light bg) OR text-text-inverse (dark bg)

```

**Feature / Card Titles (H3)**

```css
font-size: 20px
font-weight: 600
color: text-text-primary (light bg) OR text-text-inverse (dark bg)

```

**Body / Paragraph Text**

```css
font-size: 16px
font-weight: 400
color: text-text-secondary (light bg) OR text-text-inverse-muted (dark bg)
line-height: relaxed (1.5 to 1.625)

```

---

## Buttons

To match the Radius brand style, **all primary and secondary buttons must be pill-shaped (`rounded-full`)**. Do not use standard rounded corners (`rounded-md` or `rounded-lg`) for buttons.

**Primary Button (Lead Gen):**

```css
background: bg-brand
color: text-brand-foreground
border-radius: rounded-full
padding: px-6 py-3
font-weight: 600

```

**Secondary / Ghost Button (Login):**

```css
background: transparent
color: text-text-primary
border-radius: rounded-full
padding: px-4 py-2
hover: bg-surface-muted

```

---

## Feature Checklists

A recurring pattern in the Radius reference is a vertical list of benefits accompanied by a green checkmark icon.

* **Icon Container:** `size-6 rounded-full bg-success-background text-success flex items-center justify-center shrink-0`.
* **Spacing:** `gap-4` between the icon and the text content.
* **Layout:** Use CSS Grid (`grid-cols-1 md:grid-cols-2`) for these lists to keep them organized on wider screens.

---

## Cards & Floating Mockups

* **Data Cards (e.g., Step-by-Step process):** - Background: `bg-surface-muted` or `bg-surface`.
* Border: None or very subtle (`border border-border`).
* Radius: `rounded-2xl` or `rounded-3xl` for a modern, soft feel.


* **Floating UI Mockups (Right side of dark sections):**
* Must have `shadow-float` applied to elevate them off the dark background.
* Ensure images are exported as transparent PNGs or WebPs to blend seamlessly.



---

## Dark Sections (Strict Contrast)

When building Sections 4, 6, and the Footer:

* The section background must be `bg-surface-dark`.
* ALL text inside this section must switch to `text-text-inverse` (headings) and `text-text-inverse-muted` (paragraphs).
* Do not use standard gray text (`text-text-secondary`) on dark backgrounds, as it fails WCAG accessibility contrast ratios.

---

## Tailwind v4 Note

This project uses Tailwind v4. Tokens are defined with `@theme` in `src/styles/globals.css`. Never define colors in a config file. Always use `@theme` for new tokens, and utilize the automatically generated utility classes (e.g., `bg-brand`, `text-surface-dark`).

---

## Do Nots

* **Never** use square or slightly rounded buttons (`rounded`, `rounded-md`) — Ezytrack primary CTAs are always `rounded-full` (pill shape).
* **Never** use Tailwind's built-in color classes (`bg-red-500`, `text-gray-600`) — use project tokens only.
* **Never** hardcode marketing text into the UI components — everything maps from `src/data/siteContent.ts`.
* **Never** use a dark text color on a dark section background. Contrast is non-negotiable.
* **Never** trigger a React hydration (`client:load`, `client:visible`) on a purely static component like a footer or a simple text grid. Keep the payload zero-JS where possible.

```

```