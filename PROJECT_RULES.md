# Start Digital - Project Rules

This repository enforces strict rules for development. All future AI coding agents and human developers must follow these rules without exception.

## Mandatory Rules

1.  **Read the Design System**: Read `DESIGN_SYSTEM.md` before writing or editing any UI components or layouts.
2.  **No Invented Tokens**: Do not invent new colors, typography scale values, transitions, or fonts. Stick strictly to the defined system.
3.  **Reuse Existing Components**: Look for existing elements in `src/components/ui/` and `src/components/layout/` before writing custom HTML structure.
4.  **No Scope Creep**: Do not refactor or redesign unrelated UI areas while completing a specific task.
5.  **No Unnecessary Dependencies**: Do not install third-party NPM packages, heavy animation libraries, or complex UI libraries without clear, written project lead approval.
6.  **Content Integrity**: Never publish fake or placeholder testimonials, clients, statistics, charts, logos, or business outcomes. All content must represent verified facts.
7.  **Data Centralization**: Keep editable content (e.g. navigation links, site meta information, services listing) centralized inside typescript files under `src/data/` where practical.
8.  **Multi-Device Testing**: Always verify layout and interaction behavior across mobile (320px+), tablet (768px), laptop (1024px), and desktop (1440px+).
9.  **Pre-Commit Validation**: Run `npm run astro check` and `npm run build` before pushing any changes. Solve all errors and warnings first.
10. **Focused Commits**: Keep Git commits atomic, specific, and clearly named.
11. **Security & Secrets**: Never commit API keys, configuration credentials, client details, private reports, or staging environment credentials. Use `.env` or system environment variables.
12. **Restrained Aesthetics**: Do not add animations, gradients, shadows, or visual effects merely to make the site look "advanced". Keep the editorial layout spacious, clean, and strategic.
