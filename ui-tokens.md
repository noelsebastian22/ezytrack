
# Ezytrack UI Tokens

Design tokens for the Ezytrack Marketing Landing Page. All colors, typography, spacing, and component values are structured to replicate the premium, high-contrast aesthetic of the Radius Telematics reference site. Use these exact values throughout the Astro/React codebase — never hardcode colors or use raw Tailwind color classes in components.

---

## How to Use

This project uses **Tailwind CSS v4**. All design tokens are defined using the `@theme` directive in `src/styles/globals.css`.

Tailwind v4 automatically generates utility classes from `@theme` variables:

- `--color-brand` → `bg-brand`, `text-brand`, `border-brand`
- `--color-surface-dark` → `bg-surface-dark`, `text-surface-dark`, `border-surface-dark`

```tsx
// Correct — uses generated utility classes
className="bg-surface-dark text-text-inverse border-border-dark"

// Also correct — references CSS variable directly
style={{ color: 'var(--color-text-primary)' }}

// Never — hardcoded hex values
className="bg-[#1C1F26] text-[#FFFFFF]"

// Never — raw Tailwind color classes
className="bg-red-600 text-gray-900"

```

---

## globals.css — Complete Token Definition

```css
@import "tailwindcss";

@theme {
  /* Font */
  /* Replicating the clean geometric sans-serif from Radius (e.g., Montserrat or Inter) */
  --font-sans: "Inter", system-ui, sans-serif;

  /* Brand Primary (The 'Radius Red' equivalent for Ezytrack CTAs) */
  /* Note: Assuming Ezytrack uses a strong red based on common fleet themes. Adjust if brand differs. */
  --color-brand: #E60000;
  --color-brand-hover: #CC0000;
  --color-brand-muted: #FDECEC;
  --color-brand-foreground: #FFFFFF;

  /* Page and surface backgrounds */
  --color-background: #FFFFFF;
  --color-surface: #FFFFFF;
  --color-surface-muted: #F5F5F5;
  
  /* Dark Mode Surfaces (For sections 4, 6, and Footer) */
  --color-surface-dark: #12151C;
  --color-surface-dark-elevated: #1C1F26;

  /* Borders */
  --color-border: #E5E7EB;
  --color-border-dark: #2A2E39;
  --color-border-active: #E60000;

  /* Text */
  --color-text-primary: #111827;
  --color-text-secondary: #4B5563;
  --color-text-muted: #6B7280;
  
  /* Text Inverse (For dark backgrounds) */
  --color-text-inverse: #FFFFFF;
  --color-text-inverse-muted: #9CA3AF;

  /* Status Colors */
  /* Green checks in lists (Section 6) */
  --color-success: #00B050; 
  --color-success-background: #E5F7ED;

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  
  /* Shadows (For floating images and cards) */
  --shadow-float: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

```

---

## Color Usage Guide

### Page Layout (Section Based)

| Section | Token |
| --- | --- |
| Global Background | `bg-background` |
| Dark Sections (4, 6) | `bg-surface-dark` |
| Footer | `bg-surface-dark` |
| Feature Cards | `bg-surface-muted` |
| Floating Mockups | `bg-surface` / `bg-surface-dark-elevated` |

### Typography

| Element | Background Context | Token |
| --- | --- | --- |
| H1, H2, H3 | Light | `text-text-primary` |
| Paragraphs | Light | `text-text-secondary` |
| H1, H2, H3 | Dark | `text-text-inverse` |
| Paragraphs | Dark | `text-text-inverse-muted` |

### Brand (Primary CTAs)

Used for: 'Get a quote' buttons, interactive tab highlights, and key links.

| Element | Token |
| --- | --- |
| Button background | `bg-brand` |
| Button text | `text-brand-foreground` |
| Active Tab Underline | `border-brand` |

---

## Typography

| Element | Size | Weight | Line height | Context/Color token |
| --- | --- | --- | --- | --- |
| Hero H1 | 48px | 700 | 56px | `text-text-inverse` |
| Section H2 | 36px | 700 | 44px | Dynamic (Primary/Inverse) |
| Feature Title | 20px | 600 | 28px | Dynamic (Primary/Inverse) |
| Body Copy | 16px | 400 | 24px | Dynamic (Secondary/Inverse-Muted) |
| Small Text | 14px | 400 | 20px | `text-text-muted` |
| Button Label | 16px | 600 | 24px | `text-brand-foreground` |

---

## Spacing

The Radius layout relies heavily on generous vertical whitespace between sections and tight groupings within components.

| Token | Value | Usage |
| --- | --- | --- |
| `gap-2` | 8px | Between icon and text (e.g., checkmarks) |
| `gap-4` | 16px | Internal component spacing (e.g., card title to body) |
| `gap-8` | 32px | Between grid columns |
| `gap-16` | 64px | Between major content blocks within a section |
| `py-24` | 96px | Vertical padding for major page sections |
| `px-4` / `px-8` | 16px/32px | Responsive container side padding |

---

## Component Tokens

### Buttons

**Primary CTA:**

```css
background: bg-brand
hover: hover:bg-brand-hover
text: text-brand-foreground
border-radius: rounded-full /* The reference site uses pill-shaped buttons */
padding: px-6 py-3
font-weight: font-semibold
transition: all duration-200

```

**Secondary / Ghost (e.g., Login link):**

```css
background: transparent
text: text-text-primary /* or inverse on dark */
hover: hover:underline decoration-brand
padding: px-4 py-2

```

### Feature Lists (Checkmarks)

```css
icon container: bg-success-background text-success rounded-full size-6 flex items-center justify-center
text: text-text-inverse /* typically used on dark sections */
gap: gap-4 items-start

```

### Interactive Tabs (React Component)

**Inactive Tab:**

```css
text: text-text-secondary
border-bottom: 2px solid transparent
padding: pb-4

```

**Active Tab:**

```css
text: text-brand
border-bottom: 2px solid var(--color-border-active)
padding: pb-4
font-weight: 600

```

---

## Invariants

* Never use hex values directly in Astro or React components — always use CSS variables via Tailwind tokens.
* Maintain the strict contrast ratios observed in the reference: use `inverse` tokens specifically on `surface-dark` backgrounds.
* All primary buttons must be fully rounded (`rounded-full`) to match the reference site's CTA style.
* Ezytrack's brand color `var(--color-brand)` is strictly reserved for primary actions and active states. Do not use it as a general accent or text color unless explicitly intended to draw click attention.

```

```