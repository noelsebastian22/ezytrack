# Project Overview: Ezytrack Marketing Frontend

## 1. Executive Summary
Ezytrack requires a high-performance, conversion-optimized B2B landing page. The objective is to engineer a pixel-perfect structural clone of the Radius Telematics landing page, replacing their branding and copy with Ezytrack’s localized Australian assets. The site acts as a lean marketing frontend to drive lead generation and route existing users to a white-labeled backend.

## 2. Core Business Objectives
* **Primary CTA (Lead Generation):** Drive prospective B2B clients to request a quote or contact sales. This will be supported by the integration of **Zoho SalesIQ** for active tracking and live chat engagement.
* **Secondary CTA (Customer Routing):** Provide a frictionless, high-visibility "Login" portal that securely redirects existing clients to the Telematics Guru backend (`https://ezytrackaus.telematics.guru/` via `target="_blank"`).

## 3. Technical Architecture
* **Framework:** Astro. We are leveraging Astro's Static Site Generation (SSG) for maximum performance, zero-javascript baseline payloads, and superior SEO indexing for the Australian market.
* **Interactivity:** React (`@astrojs/react`). We will use React strictly as "islands" for complex, state-driven UI components (e.g., the interactive feature tabs and map UI seen in sections 5 and 6 of the Radius screenshot).
* **Styling:** Tailwind CSS. This will allow us to rapidly translate the spacing, typography, and layout of the Radius site into scalable, reusable utility classes.
* **Data Strategy:** Complete decoupling. No hardcoded copy. All text, testimonials, and feature lists will be structured in a `src/data/siteContent.js` file, ingesting the clean data from the `scraped-data.md` file while explicitly filtering out unrelated entities (like the construction track system or international equivalents).

## 4. Visual & Structural Strategy (The "Radius Clone")
Based on the provided structural blueprint, we will architect the page into the following sequential component tree:
1. **Global Header:** Logo left, Navigation center, Login (Telematics Guru) & "Get a quote" CTA right.
2. **Hero Section:** Dark overlay, striking background image, strong H1 value proposition, and primary CTA.
3. **Process/Steps Grid (3-Column):** Visualizing the "Install, Use, Manage" pipeline.
4. **Hardware Features Bar:** Dark section highlighting tracker specifications with iconography.
5. **Benefit Split Content (Image/Text):** Explaining how fleet tracking aids the business.
6. **Market-Leading Features (Dark Mode Split):** Checklist on the left, floating device/app mockups on the right.
7. **Interactive Software Showcase:** React-driven tabs/accordion on the left swapping out map/dashboard UI images on the right.
8. **Industry Use Cases (Tabs):** React-driven horizontal tabs detailing specific applications (Fleet, Asset, etc.).
9. **Global Footer:** Dark background, SEO links, legal, and Zoho SalesIQ script injection.