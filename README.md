# Starts Digital Website

A premium, fast, SEO-friendly digital marketing agency and portfolio website for **Starts Digital**.

*   **Temporary Live URL**: `https://firdosi.github.io/startsdigital/`
*   **Future Custom Domain**: `startsdigital.com`
*   **Positioning**: AI-powered digital marketing for businesses ready to grow.

---

## Technology Stack

*   **Framework**: Astro
*   **Styles**: Tailwind CSS 4 (Vite plugin `@tailwindcss/vite`)
*   **Language**: TypeScript (strict mode)
*   **Icons**: `@lucide/astro` (used selectively)
*   **Routing & Bundling**: Astro static building and bundling
*   **Deployment**: GitHub Pages (via GitHub Actions)
*   **Sitemap**: `@astrojs/sitemap`

---

## Project Structure

```text
startsdigital/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment to Pages
├── public/
│   ├── favicon.svg         # Site brand favicon
│   ├── robots.txt          # Robots.txt instructions
│   └── fonts/              # Custom/packaged self-hosted fonts
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro       # Responsive header
│   │   │   ├── Footer.astro       # Footer element
│   │   │   └── MobileMenu.astro   # Mobile menu drawer
│   │   ├── ui/
│   │   │   ├── Button.astro       # Reusable button component
│   │   │   ├── Container.astro    # Content width limiter (1200px)
│   │   │   └── SectionHeading.astro
│   │   └── seo/
│   │       ├── SEO.astro          # Reusable page metadata
│   │       └── StructuredData.astro
│   ├── data/
│   │   ├── navigation.ts   # Shared navigation arrays
│   │   └── site.ts         # Centralized site configurations
│   ├── layouts/
│   │   └── BaseLayout.astro # Base HTML template structure
│   ├── pages/
│   │   ├── index.astro     # Homepage Hero section
│   │   ├── style-guide.astro # Private design system test suite
│   │   └── 404.astro       # 404 error page
│   └── styles/
│       └── global.css      # Core Tailwind CSS directives
├── astro.config.mjs
├── DESIGN_SYSTEM.md        # UI and styling guidelines
├── PROJECT_RULES.md        # Agent development rules
├── package.json
└── tsconfig.json
```

---

## Local Development Instructions

### Prerequisites
*   Node.js (>=22.12.0)
*   npm

### 1. Installation
Install all required project dependencies:
```bash
npm install
```

### 2. Run Development Server
Start the local development server (background mode recommended for agent workflows, or regular dev for interactives):
```bash
npx astro dev
```
By default, the server runs at `http://localhost:4321/startsdigital/`.

### 3. Build & Typecheck Commands
To perform a complete type check and static build:
```bash
# Verify Astro components and run TypeScript checks
npm run astro check

# Compile static site output
npm run build
```

---

## GitHub Pages Deployment

The site uses GitHub Actions to deploy static builds to GitHub Pages from the `main` branch.
Workflow is configured in `.github/workflows/deploy.yml`.

### Future Custom Domain Migration Steps
When the custom domain `startsdigital.com` is purchased:
1. Update `site` in `astro.config.mjs` to `'https://startsdigital.com'`.
2. Update `base` in `astro.config.mjs` to `'/'` (root directory).
3. Update `cname` config in the deploy step or add a CNAME file inside `public/CNAME` containing `startsdigital.com`.
4. Update DNS configurations on your registrar pointing to GitHub Pages IPs.

---

## Content & Security Rules

*   **Content Authenticity**: No placeholder client logos, stats, charts, or fake testimonials are permitted in production code. All claims must be authentic.
*   **Security Policies**: Never commit secrets, API keys, or private reports to this repository.

---

## Next Planned Development Phase

1.  **Services Page**: Individual sections detailing strategy, Meta ads, SEO, development, content, and AI solutions.
2.  **Portfolio / Work Showcase**: Case studies displaying verified outcomes.
3.  **About / Agency Story**: Strategic positioning and team focus.
4.  **Interactive Forms & WhatsApp Inquiry Integration**: Contact flow and WhatsApp routing.
