# UI Registry — Ezytrack Marketing Site

This file captures the visual patterns from built components so future components stay consistent. Updated via `/imprint` after each UI component is built.



---

### Gallery

File: `src/components/Gallery.tsx`
Last updated: 2026-06-13

| Property         | Class                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Background       | `bg-surface` (section), `bg-surface-muted` (image placeholder)        |
| Border           | none                                                                  |
| Border radius    | `rounded-2xl` (image cards)                                           |
| Text — primary   | `text-text-primary` (heading), `text-white` (overlay captions)         |
| Text — secondary | `text-text-secondary` (subtitle)                                      |
| Spacing          | `py-16 md:py-24` section, `px-4 md:px-8` container, `mb-12` heading block, `gap-6` grid, `mb-6` per card |
| Hover state      | `group-hover:scale-105` (image), `group-hover:opacity-100` (overlay)   |
| Focus state      | `focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4` |
| Shadow           | none                                                                  |
| Accent usage     | `border-t-brand` (loading spinner accent)                             |

**Pattern notes:**
- White section with centered heading. Title uses `mb-12` — slightly more breathing room than standard `mb-4` headings.
- Masonry grid uses CSS `columns-1 sm:columns-2 lg:columns-3` for responsive layout.
- Each image card is a `button` with `aria-label` for accessibility — clicking opens the lightbox.
- Loading state: `aspect-[4/3]` spinner container with a spinning border ring using `border-t-brand` as the accent.
- Hover overlays use `bg-gradient-to-t from-black/60 via-transparent to-transparent` with caption text at the bottom.
- IntersectionObserver triggers `animate-fade-in-up` with staggered delays (200ms + 100ms × index).

### Lightbox (Overlay Modal)

File: `src/components/Gallery.tsx`
Last updated: 2026-06-13

| Property         | Class                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Background       | `bg-black/90` (backdrop)                                              |
| Border           | none                                                                  |
| Border radius    | `rounded-full` (buttons), `rounded-lg` (image), `rounded-full` (counter badge) |
| Text — primary   | `text-white` (buttons, counter)                                       |
| Text — secondary | none                                                                  |
| Spacing          | `p-4 md:p-8` container, buttons `p-2` (close) / `p-3` (nav), counter `px-4 py-2` |
| Hover state      | `hover:bg-white/20` (all buttons)                                     |
| Focus state      | `focus-visible:ring-2 focus-visible:ring-brand`                       |
| Shadow           | none                                                                  |
| Accent usage     | `focus-visible:ring-brand` (focus rings)                              |

**Pattern notes:**
- Full-screen fixed overlay with `z-50`. Backdrop click (but not modal click) closes.
- All buttons are translucent white circles (`rounded-full bg-white/10`), brightening to `bg-white/20` on hover.
- Counter badge is a pill (`rounded-full bg-white/10`) showing "N / total".
- Keyboard: Escape closes, arrows navigate, Tab trapped inside dialog.
- Focus restored to the triggering element on close via `previousFocusRef`.
- Image displays with `object-contain` to preserve full visibility at any viewport.

---

### Header

File: `src/components/Header.astro`
Last updated: 2026-06-13

| Property         | Class                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Background       | `bg-background`                                                       |
| Border           | `border-b border-border`                                              |
| Border radius    | none                                                                  |
| Text — primary   | `text-text-primary` (logo)                                            |
| Text — secondary | `text-text-secondary` (nav links)                                     |
| Spacing          | `px-4 md:px-8`, `h-18`, nav `gap-8`, CTAs `gap-4`                     |
| Hover state      | nav: `hover:text-text-primary`; login: `hover:bg-surface-muted`; CTA: `hover:bg-brand-hover` |
| Shadow           | none                                                                  |
| Accent usage     | CTA: `bg-brand text-brand-foreground`                                 |

**Pattern notes:**
- Header is sticky, full-width, white background with a subtle bottom border.
- Primary CTA is pill-shaped (`rounded-full`) and uses brand colors.
- Login is a ghost button that hovers with a muted surface background.
- Nav links are medium weight and transition to primary text on hover.

---

### Footer

File: `src/components/Footer.astro`
Last updated: 2026-06-13

| Property         | Class                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Background       | `bg-surface-dark`                                                     |
| Border           | `border-t border-border-dark` (copyright bar)                         |
| Border radius    | none                                                                  |
| Text — primary   | `text-text-inverse` (headings)                                        |
| Text — secondary | `text-text-inverse-muted` (body/links)                                |
| Spacing          | `px-4 md:px-8`, `py-16 md:py-20`, grid `gap-12`, list `gap-3`         |
| Hover state      | links: `hover:text-text-inverse`                                      |
| Shadow           | none                                                                  |
| Accent usage     | none                                                                  |

**Pattern notes:**
- Footer is a dark section using inverse text tokens for contrast.
- All links use muted inverse text and brighten on hover.
- External links in footer open in a new tab with `rel="noopener noreferrer"`.
- Grid layout is data-driven from `siteContent.footer.columns`.

---

### Mobile Menu

File: `src/components/MobileMenu.tsx`
Last updated: 2026-06-13

| Property         | Class                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Background       | `bg-background`                                                       |
| Border           | `border-b border-border`                                              |
| Border radius    | `rounded-md` (hamburger button)                                       |
| Text — primary   | `text-text-primary` (button icon)                                     |
| Text — secondary | `text-text-secondary` (nav links)                                     |
| Spacing          | `p-4`, links `gap-4`, CTAs `gap-3`, `pt-4` divider                    |
| Hover state      | button: `hover:bg-surface-muted`; links: `hover:text-text-primary`; CTA: `hover:bg-brand-hover` |
| Shadow           | `shadow-lg`                                                           |
| Accent usage     | CTA: `bg-brand text-brand-foreground`                                 |

**Pattern notes:**
- Mobile menu is a React island hydrated with `client:load`.
- Overlay is fixed below the header, fills the viewport below the header, and contains the same nav links and CTAs as the desktop header.
- Menu closes when any link or CTA is clicked.
- Hamburger button uses `lucide-react` Menu/X icons.

---
