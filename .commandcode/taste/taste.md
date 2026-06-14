# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# astro
- Use Astro as the web framework with @astrojs/react integration for interactive React components. Confidence: 0.50

# data-handling
- Use a central src/data/siteContent.js file to export content objects for mapping into components instead of hardcoding content. Confidence: 0.85

# styling
See [styling/taste.md](styling/taste.md)
# security
- External links that open in new tabs must include target="_blank" and rel="noopener". Confidence: 0.70

# architecture
- Prefer inline component feedback states (success messages, error states) over adding external toast/notification libraries like sonner or react-hot-toast. Confidence: 0.65

# workflow
- Diagnose and implement autonomously without asking questions — whether fixing issues or making implementation decisions, choose the best solution and apply it directly. Confidence: 0.85
- When reverting changes, scope the reversion precisely to what was asked (e.g., "just the color/design revert") — don't roll back unrelated features from the same session. Confidence: 0.65

