# Build Plan

## Core Principle

Pixel-perfect structural replication built from top to bottom. The UI is built entirely with decoupled data mapped from `siteContent.ts`. Any missing copy from the scraped data must be mocked with high-quality B2B SaaS logistics copy. Zero-JavaScript by default; React is only introduced in Phase 4 for complex interactivity.

---

## Phase 1 — Foundation & Data Architecture

### 01 Project Initialization & Design Tokens
Establish the strict boundaries of the tech stack and styling before building components.

**Logic:**
- Initialize Astro project with `@astrojs/react` and `@tailwindcss/vite` (Tailwind v4).
- Inject the exact contents of `ui-tokens.md` into `src/styles/globals.css`.
- Install `lucide-react` for all iconography to avoid messy/complex custom SVGs.
- Setup global font imports (Inter) in `Layout.astro`.

### 02 Data Decoupling (`siteContent.ts`)
Extract, clean, and mock the content to feed the UI.

**Logic:**
- Create `src/data/siteContent.ts`.
- Manually map relevant data from `scraped-data.md` (e.g., "25+ years experience", "Midas Touch Strategies Group").
- **Crucial Filter:** Exclude all data related to "Studco EzyTrack" (drywall) and the Zimbabwe branch.
- **Mocking:** Since the scraped data lacks deep feature descriptions, write high-fidelity mock B2B copy for the remaining sections (Hero, Steps, Hardware, Use Cases) using the Radius screenshot as structural inspiration.

---

## Phase 2 — Global Layout & Navigation

### 03 Base Layout & Global Header
Build the persistent shell of the application.

**UI:**
- **Header:** Full width, sticky top, white background.
- Left: Ezytrack Logo (text placeholder or unstyled image until client provides asset).
- Center: Navigation links (Features, Hardware, Industries).
- Right: "Login" ghost button, "Get a quote" solid primary pill button.
- **Mobile:** Hamburger menu triggering a clean slide-down overlay (React island: `client:load`).

**Logic:**
- Login button strictly routes to `https://ezytrackaus.telematics.guru/` with `target="_blank" rel="noopener noreferrer"`.
- Smooth scroll logic for anchor links.

### 04 Global Footer
The dark-mode footer grounding the page.

**UI:**
- Background: `bg-surface-dark`. Text: `text-text-inverse`.
- Grid layout: Brand column, Quick Links, Legal, Contact Info.
- Bottom bar with copyright.

---

## Phase 3 — Static High-Impact Sections (Zero-JS)

### 05 Hero Section
The high-conversion entry point.

**UI:**
- Dark overlay over a high-quality Unsplash image (Search term: "modern fleet logistics truck highway").
- Massive H1 (White text): "Market-leading GPS fleet tracking for your business" (or Ezytrack specific).
- Subheadline.
- Primary "Get a quote" CTA button.
- **Animation:** Simple CSS fade-in-up (`animate-in fade-in slide-in-from-bottom-4 duration-700`) on page load.

### 06 Step-by-Step Process Grid
Visualizing the onboarding pipeline.

**UI:**
- 3-column grid structure inside a `max-w-7xl` container.
- Each column: Unsplash image (e.g., "mechanic hands", "smartphone app", "fleet parking"), Step title with green `lucide-react` checkmark icon, short description text.
- Cards have subtle hover states (`hover:-translate-y-1 transition-transform duration-300`).

### 07 Hardware Features Bar & Benefits Split
Highlighting the physical tracker and business outcomes.

**UI:**
- **Hardware Bar:** `bg-surface-dark` full-width strip. 4-column icon grid detailing tracker specs.
- **Benefit Split:** 2-column layout. Left side text (H2 + paragraphs + CTA). Right side: Floating 3D/device mockup (Unsplash placeholder or sleek CSS shape if no asset available) with `shadow-float` applied.

---

## Phase 4 — Interactive React Islands

### 08 Market-Leading Features (Checklist & Floating Mockups)
The dark-mode feature showcase.

**UI:**
- Background: `bg-surface-dark`.
- **Left Column:** H2, paragraph, and a vertical list of 5-6 features. Each feature uses a green circle with a check icon.
- **Right Column:** Overlapping, floating application UI mockups.
- **Animation:** Use standard Tailwind intersection classes (e.g., trigger opacity/translate via a lightweight Astro script, or use a tiny React wrapper `client:visible` if stagger animations are strictly required).

### 09 Interactive Software Showcase (Tabs)
Replicating the Radius map/dashboard toggle.

**UI:**
- **React Component (`client:visible`):**
- **Left side:** Vertical accordion/tabs. Active tab has a `border-brand` left border and bold text. Clicking a tab updates state.
- **Right side:** A large container showing an image of the software dashboard/map.
- **Logic:** The image crossfades based on the `activeTab` state. Use high-res Unsplash placeholders (e.g., "google maps dashboard", "analytics screen") for the software screenshots.

### 10 Industry Use Cases (Horizontal Tabs)
Bottom-of-page application examples.

**UI:**
- **React Component (`client:visible`):**
- Horizontal pill-shaped tabs (Fleet tracking, Asset tracking, Dashcams).
- Content area below swaps a descriptive paragraph, a CTA, and a relevant Unsplash image based on selection.

---

## Phase 5 — Polish & Integration

### 11 Zoho SalesIQ Integration
Implementing the lead-generation live chat.

**Logic:**
- Create `src/components/Analytics.astro`.
- Inject the Zoho SalesIQ script snippet securely (client to provide exact snippet).
- Ensure it loads with `defer` or `async` so it does not block the Astro HTML parsing or initial paint.

### 12 Final QA & Responsive Pass
Ensuring pixel perfection across devices.

**Logic:**
- Verify all primary buttons are `rounded-full`.
- Verify contrast ratios in dark sections (`surface-dark` backgrounds must use `text-inverse` text).
- Check mobile padding (`px-4` vs `md:px-8`) and section gaps (`py-16` vs `py-24`).
- Ensure no React hydration errors occur between Astro layout and interactive islands.

---

## Feature Count

| Phase | Features |
| :--- | :--- |
| Phase 1 — Foundation | 2 |
| Phase 2 — Layout | 2 |
| Phase 3 — Static UI | 3 |
| Phase 4 — Interactive UI | 3 |
| Phase 5 — Polish | 2 |
| **Total** | **12** |