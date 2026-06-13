
# Code Standards

Implementation rules and conventions for the Ezytrack marketing frontend. The AI agent must follow these in every session without exception. These rules prevent pattern drift across sessions and maintain the high-performance benchmark required for this project.

---

## Engineering Mindset

The AI agent on this project operates as a senior frontend architect. This means:

- **Think before implementing** — understand what is being built and why before writing a single line.
- **Read context files first** — never assume, always verify against `project-overview.md` and `ui-tokens.md`.
- **Performance is sacred** — zero-javascript by default. Only load JavaScript when user interaction strictly demands it.
- **Clean over clever** — simple readable code that a junior developer can understand is always preferred over complex abstractions.
- **One thing at a time** — complete one component fully and test its responsiveness before moving to the next.
- **Pixel perfection** — the Radius reference site is the structural blueprint. Spacing, typography, and contrast must be exact.

---

## TypeScript

- Strict mode enabled in `tsconfig.json` — no exceptions.
- Never use `any` — use `unknown` and narrow the type.
- Never use type assertions (`as SomeType`) unless absolutely necessary and explicitly commented.
- All function parameters and return types must be explicitly typed.
- Use `type` for object shapes and unions — use `interface` only for extendable component props.
- Use `const` by default — only use `let` when reassignment is necessary.

---

## Astro & React Framework Conventions

- **Astro First:** Astro is the primary framework for routing and layout structure. All pages (`.astro`) are pre-rendered as Static Site Generation (SSG).
- **React Islands:** React (`@astrojs/react`) is used strictly for interactive components (e.g., Tabs, Accordions, Map Toggle).
- **Zero-JS Default:** By default, Astro components ship no JavaScript to the browser. 
- **Client Directives:** When using a React component in an Astro file, you must explicitly declare how it hydrates using Astro's client directives:
  - `client:load` for immediate, high-priority interactivity (e.g., Mobile Menu).
  - `client:visible` for components lower on the page (e.g., Feature Tabs).
  - `client:idle` for low-priority interactivity.
- **No Global React State:** Avoid heavy state managers (Redux, Context) unless absolutely necessary. Component-level `useState` is sufficient for this scope.

---

## File and Folder Naming

- Pages: kebab-case — `src/pages/index.astro`, `src/pages/contact.astro`
- Astro Components: PascalCase — `src/components/Hero.astro`, `src/components/Footer.astro`
- React Components: PascalCase — `src/components/react/FeatureTabs.tsx`
- Utility files: camelCase — `src/utils/format.ts`
- Data/Content files: camelCase — `src/data/siteContent.ts`
- One component per file — never export multiple components from one file.

---

## Component Structure

### Astro Component Example (`.astro`)
```astro
---
// 1. Imports
import { Button } from "@/components/ui/Button";
import FeatureTabs from "@/components/react/FeatureTabs";
import { siteContent } from "@/data/siteContent";

// 2. Type definitions & Props
interface Props {
  theme?: "light" | "dark";
}
const { theme = "light" } = Astro.props;

// 3. Server-side logic / Frontmatter data mapping
const sectionData = siteContent.featuresSection;
---

<section class={`py-24 ${theme === 'dark' ? 'bg-surface-dark text-text-inverse' : 'bg-background'}`}>
  <div class="container mx-auto px-4 md:px-8">
    <h2>{sectionData.title}</h2>
    <FeatureTabs client:visible items={sectionData.tabs} />
  </div>
</section>

```

### React Component Example (`.tsx`)

```tsx
// 1. External imports
import { useState } from "react";

// 2. Type definitions
type TabItem = {
  id: string;
  title: string;
  content: string;
  imageSrc: string;
};

interface Props {
  items: TabItem[];
}

// 3. Component
export default function FeatureTabs({ items }: Props) {
  // state
  const [activeTab, setActiveTab] = useState(items[0].id);

  // handlers
  const handleTabClick = (id: string) => setActiveTab(id);

  // return JSX
  return (
    <div class="flex flex-col md:flex-row gap-8">
      {/* ... implementation ... */}
    </div>
  );
}

```

*Note: React components in Astro project should strictly use `export default` for easier integration, or named exports if preferred, but remain consistent.*

---

## Data & Content Architecture

* **No Hardcoding:** Absolutely no hardcoded marketing copy in components.
* **Single Source of Truth:** All text, lists, and metadata reside in `src/data/siteContent.ts`.
* **Sanitization:** When migrating data from `scraped-data.md` to `siteContent.ts`, ensure irrelevant search noise (e.g., international branches, unrelated construction products) is entirely filtered out.

```typescript
// src/data/siteContent.ts
export const siteContent = {
  global: {
    companyName: "Ezytrack",
    loginUrl: "[https://ezytrackaus.telematics.guru/](https://ezytrackaus.telematics.guru/)",
  },
  hero: {
    headline: "Market-leading GPS fleet tracking for your business",
    subheadline: "Real-time visibility, reporting, and dashcam solutions.",
    ctaText: "Get a quote",
  }
};

```

---

## Styling & Tailwind CSS

* **Design Tokens:** Always refer to `ui-tokens.md`.
* Never use raw hex values in standard components (e.g., `className="bg-[#1C1F26]"`).
* Never use default Tailwind colors that clash with tokens (e.g., `text-red-500`). Use the defined semantic variables: `bg-brand`, `text-surface-dark`.
* Use responsive prefixes consistently: Mobile-first by default, followed by `md:` (tablet), and `lg:` (desktop).

---

## Third-Party Integrations

### Zoho SalesIQ

* Live chat/lead tracking script must be injected globally, ideally just before the closing `</body>` tag or within a dedicated `analytics.astro` component included in the main layout.
* Ensure the script loads asynchronously (`async` or `defer`) so it does not block the main Astro render path.

### Telematics Guru External Links

* All "Login" buttons and links routing to the backend software MUST include `target="_blank"` and `rel="noopener noreferrer"`.
* URL: `https://ezytrackaus.telematics.guru/`

---

## Import Aliases

Always use the `@/` alias for standard paths.

```typescript
// Correct
import Header from "@/components/Header.astro";
import { siteContent } from "@/data/siteContent";

// Never
import Header from "../../components/Header.astro";

```

---

## Dependencies

Never install a new package without a clear reason. Minimal dependencies keep the Astro build fast.

Approved dependencies for this project:

* `astro` — Core framework
* `@astrojs/react` — React integration
* `react`, `react-dom` — UI interaction
* `tailwindcss`, `@tailwindcss/vite` — Styling
* `lucide-react` — SVGs and Icons

Do not install any other packages (like heavy animation libraries or state managers) without prior architectural approval.

```

```