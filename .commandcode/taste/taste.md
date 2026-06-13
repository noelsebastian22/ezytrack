# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# astro
- Use Astro as the web framework with @astrojs/react integration for interactive React components. Confidence: 0.50

# data-handling
- Use a central src/data/siteContent.js file to export content objects for mapping into components instead of hardcoding content. Confidence: 0.85

# styling
- Use Tailwind CSS exclusively for styling with no external CSS files. Confidence: 0.70
- Use Inter, Poppins, or Roboto as the primary sans-serif font family via Google Fonts. Confidence: 0.60
- Use white (#FFFFFF) backgrounds for most sections, dark surface banners, light grey (#F8F9FA) for stats, and dark slate (#1A202C) for footer. Confidence: 0.75
- Use red (#E60000) as the primary brand accent color for CTAs and interactive elements. Confidence: 0.70
- Use rounded-2xl with subtle box-shadows (shadow-sm/shadow-lg with low opacity) for card components. Confidence: 0.60

# security
- External links that open in new tabs must include target="_blank" and rel="noopener". Confidence: 0.70

# workflow
- Diagnose and implement autonomously without asking questions — whether fixing issues or making implementation decisions, choose the best solution and apply it directly. Confidence: 0.85
- When reverting changes, scope the reversion precisely to what was asked (e.g., "just the color/design revert") — don't roll back unrelated features from the same session. Confidence: 0.65

