# Starts Digital - Visual Homepage Prototype Walkthrough

This document presents a comprehensive walkthrough of the visual homepage prototype built on the `visual-redesign-v2` branch for Starts Digital.

---

## 1. Executive Summary & Visual Direction

The previous dark-mode homepage was rejected for being basic, text-heavy, empty, dark, repetitive, and similar to a written business report. 

The new visual prototype shifts Starts Digital into a **premium, light-first digital agency identity**:
- **Visual Balance**: ~70% light sections (`#F7F7F3` Warm White, `#FFFFFF` Surface White) balanced with ~30% high-impact Deep Navy sections (`#07111F`) for Results, Contact CTA, and Footer.
- **Brand Identity**: Primary Blue (`#246BFD`) for actions & results, Teal Accent (`#10A8A0`) for tags & labels, Near Black (`#0B0D10`) for main typography.
- **Wordmark Integrity**: Clear `StartsDigital` brandmark in Header and Footer (`Starts` in Near Black/Warm White, `Digital` in Primary Blue).
- **Technology Stack**: Built on Astro 7, TypeScript, and Tailwind CSS without third-party JS animation bloat or fake data.

---

## 2. Oldweb Inspection & Reference Analysis

### A. Oldweb Files Reviewed
- `oldweb/index.html`: Analyzed split-screen hero structure, brand strip layout, card grids, process sequence, FAQ accordion, and contact form layout.
- `oldweb/services.html`: Analyzed service categorization and key deliverables breakdown.
- `oldweb/contact.html`: Analyzed contact methods and WhatsApp CTA integration.
- `oldweb/assets/css/style.css`: Inspected color scheme (old red/cream theme), typography, spacing, and animations.
- `oldweb/assets/js/main.js`: Inspected accordion logic, mobile menu toggles, and scroll event handling.
- `oldweb/assets/img/`: Inspected SVG icons, WebP images, and decorative assets.

### B. Old Design Ideas Reused
- **Split-Screen Hero Structure**: Left column for headline + copy + CTAs + metrics strip; right column for a straight, high-impact visual frame.
- **Brand/Platform Strips**: Dedicated sections highlighting client brand experience and platform technology tools.
- **Alternating Showcase Rows**: Large visual project showcase cards alternating image-left/text-right and image-right/text-left.
- **4-Stage Open Process Timeline**: Understand &rarr; Plan &rarr; Build &rarr; Grow workflow sequence.
- **Accessible Accordion FAQ**: Native keyboard-accessible question and answer component.

### C. Old Ideas Intentionally Rejected
- **Dark Mode Default & Red/Cream Color Palette**: Replaced by editorial Warm White (`#F7F7F3`) base with Primary Blue (`#246BFD`) and Deep Navy (`#07111F`) accents.
- **Fake Metrics & Demo Content**: Removed fake ROAS multipliers (3.8x), fake lead counts (5K+), fake 24-hour response promises, generic "Business Owner" quotes, demo package prices, and fake meeting visuals.
- **Excessive Visual Gimmicks**: Omitted cursor glow, magnetic button JavaScript, tilt-on-card 3D hover effects, rotating image borders, animated marquee tickers, and floating glassmorphic cards.
- **Bulky 6-Card Uniform Grids**: Replaced with open layout service cards featuring thin dividers (`#E4E7EC`) and featured deliverable panels.

---

## 3. Asset Classification & Retained Prototype Assets

### A. Temporary Oldweb Assets Retained (Prototype Preview Only)
To keep the repository clean of unused clutter, 17 unused WebP images were removed from `public/prototype/`. Exactly 4 active WebP images are retained for prototype visual frames:
1. `public/prototype/hero-business.webp`: Used in [Hero.astro](../../src/components/sections/Hero.astro) right-column visual frame.
2. `public/prototype/hero-dashboard.webp`: Used in [FeaturedWork.astro](../../src/components/sections/FeaturedWork.astro) for the Black Gold Fertilizer project layout preview.
3. `public/prototype/campaign-lab.webp`: Used in [FeaturedWork.astro](../../src/components/sections/FeaturedWork.astro) for the Qurbani Campaign project layout preview.
4. `public/prototype/project-seo.webp`: Used in [FeaturedWork.astro](../../src/components/sections/FeaturedWork.astro) for the RK Reno Solutions project layout preview.

*Note*: Every section utilizing these temporary assets displays a visible, high-contrast label (`PROTOTYPE VISUAL` or `Prototype visual only. Replace with approved real project asset before release.`).

### B. Platform Display Approach
We adopted the preferred safe prototype approach in [PlatformsTools.astro](../../src/components/sections/PlatformsTools.astro):
- Render platform names in clean neutral text tiles with category tags.
- Removed manually created SVG files from the repository to prevent unverified brand asset representation.
- Official platform SVG brand assets remain pending formal guideline review per [asset-intake.md](../visual-portfolio-redesign/asset-intake.md).

---

## 4. Brand Approval Flags & Verified Case-Study Wording

### A. Brand Approval Flags
In [brands.ts](../../src/data/brands.ts), all 12 client brand records are explicitly set to:
- `publicApproved: false`
- `logoApproved: false`

Unapproved client brand logos or names do not render on the public prototype page. [BrandExperience.astro](../../src/components/sections/BrandExperience.astro) maintains ready component architecture and displays a clean pending intake notice.

### B. Verified Project Wording
1. **Black Gold Fertilizer**:
   - Title: Black Gold Fertilizer
   - Summary: Digital marketing and e-commerce growth support across multiple product categories.
   - Outcome: Contributed to PKR 30M+ in revenue and 29,000+ product sales across multiple product categories through managed digital campaigns.
2. **Qurbani Campaign**:
   - Title: Qurbani Campaign (route `/work/qurbani-campaign/` preserved pending Wajib Livestock name approval).
   - Summary: Seasonal digital marketing and sales support for an Eid Qurbani livestock campaign.
   - Outcome: Helped sell more than 150 animals and supported PKR 4.2M+ in sales during the Eid Qurbani campaign.
3. **RK Reno Solutions**:
   - Title: RK Reno Solutions
   - Summary: Website and SEO work for renovation and air-conditioning services in Kuala Lumpur and Selangor.
   - Outcome Label: `PROJECT SCOPE`
   - Outcome: Built a structured SEO foundation targeting renovation and air-conditioning services in Kuala Lumpur and Selangor.
   - Link: Points to `/work/` (no dedicated case study route created).

---

## 5. Components Created & Modified

### A. Data Models
1. [brands.ts](../../src/data/brands.ts): Manages 12 client brand records and approval flags.
2. [platforms.ts](../../src/data/platforms.ts): Manages 12 platform tool records.

### B. Layout Components
1. [global.css](../../src/styles/global.css): Configured light-first theme tokens (`#F7F7F3` background, `#0B0D10` body text).
2. [BaseLayout.astro](../../src/layouts/BaseLayout.astro): Re-mapped body styles and selection highlights.
3. [Header.astro](../../src/components/layout/Header.astro): Implemented sticky light header (`bg-white/90`), `StartsDigital` brandmark, navigation links, and "Discuss Your Project" CTA.
4. [MobileMenu.astro](../../src/components/layout/MobileMenu.astro): Implemented accessible drawer with light theme.
5. [Footer.astro](../../src/components/layout/Footer.astro): Deep Navy background (`#07111F`) with agency details, direct email, WhatsApp links, and copyright 2026.

### C. Homepage Section Components
1. [Hero.astro](../../src/components/sections/Hero.astro): Split-screen hero with verified metrics strip and visible `PROTOTYPE VISUAL` label.
2. [BrandExperience.astro](../../src/components/sections/BrandExperience.astro): Component architecture displaying pending intake notice.
3. [Services.astro](../../src/components/sections/Services.astro): Open service layout featuring 2 large featured deliverable cards and 4 supporting panels with thin dividers.
4. [FeaturedWork.astro](../../src/components/sections/FeaturedWork.astro): Showcase rows highlighting Black Gold Fertilizer, Qurbani Campaign, and RK Reno Solutions with visible prototype labels.
5. [Results.astro](../../src/components/sections/Results.astro): Deep Navy section displaying verified commercial statistics.
6. [PlatformsTools.astro](../../src/components/sections/PlatformsTools.astro): Neutral text tile grid displaying 12 platform tools.
7. [WhyUs.astro](../../src/components/sections/WhyUs.astro): Operating model pillars focusing on strategy, execution, tech stack, and transparency.
8. [FounderSection.astro](../../src/components/sections/FounderSection.astro): Founder layout component (conditionally disabled).
9. [Process.astro](../../src/components/sections/Process.astro): 4-stage open timeline layout.
10. [FAQ.astro](../../src/components/sections/FAQ.astro): Accessible accordion component with 6 verified Q&As.
11. [ContactCTA.astro](../../src/components/sections/ContactCTA.astro): Deep Navy CTA section with direct contact channels.
12. [index.astro](../../src/pages/index.astro): Assembled all 11 section blocks in clean 70/30 light/dark visual order.

---

## 6. Screenshots & Full-Page Visual Proof

Full-page screenshots of the production preview build were captured using Playwright CLI on port 4321 with the `/startsdigital/` base path:

- [Desktop 1440px Full-Page Screenshot](./screenshots/desktop-1440-full.png)
- [Mobile 375px Full-Page Screenshot](./screenshots/mobile-375-full.png)
- [Tablet 768px Full-Page Screenshot](./screenshots/tablet-768-full.png)

All screenshots capture the complete layout from header to footer, demonstrate responsive behavior, show visible prototype labels, and confirm zero horizontal overflow.
