# Starts Digital - Visual Homepage Prototype Walkthrough

This document presents a comprehensive walkthrough of the visual homepage prototype built on the `visual-redesign-v2` branch for Starts Digital.

---

## 1. Executive Summary & Visual Direction

The previous dark-mode homepage was rejected for being basic, text-heavy, empty, dark, repetitive, and similar to a written business report. 

The new visual prototype shifts Starts Digital into a **premium, light-first digital agency identity**:
- **Visual Balance**: ~70% light sections (`#F7F7F3` Warm White, `#FFFFFF` Surface White) balanced with ~30% high-impact Deep Navy sections (`#07111F`) for Results, Contact CTA, and Footer.
- **Brand Identity**: Primary Blue (`#246BFD`) for actions & results, Teal Accent (`#10A8A0`) for tags & labels, Near Black (`#0B0D10`) for main typography.
- **Wordmark Integrity**: Clear `StartsDigital` brandmark in Header and Footer (`Starts` in Near Black/Warm White, `Digital` in Primary Blue).
- **Structure**: Rebuilt on Astro 5, TypeScript, and Tailwind CSS without third-party JS animation bloat or fake data.

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

## 3. Asset Classification & Usage

### A. Temporary Oldweb Assets Used (Prototype Only)
These non-client decorative assets were copied from `oldweb/assets/img/*.webp` into `public/prototype/` to serve as clean straight visual frames on the `visual-redesign-v2` prototype branch:
- `public/prototype/hero-business.webp`: Used in the Hero right-column visual frame.
- `public/prototype/hero-dashboard.webp`: Used as temporary visual for Black Gold Fertilizer showcase.
- `public/prototype/campaign-lab.webp`: Used as temporary visual for Wajib Livestock Qurbani Campaign showcase.
- `public/prototype/project-seo.webp`: Used as temporary visual for RK Reno Solutions showcase.

*Note*: These temporary assets are purely decorative for prototype preview and will not be merged into production without client approval.

### B. Real & Verified Assets Used
- **Platform SVGs**: Official vector assets under `public/platforms/` for Meta Ads, Facebook, Instagram, Google Ads, Google Analytics 4, Google Tag Manager, WordPress, WooCommerce, Shopify, WhatsApp Business, Elementor, and Canva.
- **Verified Facts**:
  - `PKR 30M+` revenue supported
  - `29,000+` product sales supported
  - `PKR 4.2M+` Qurbani sales supported
  - `150+` animals sold

---

## 4. Components Created & Modified

### A. Data Models Created
1. [`src/data/brands.ts`](file:///c:/Users/BGF/OneDrive/Documents/StartsDigital/src/data/brands.ts): Manages 12 client brand entries, categories, and permission flags (`publicApproved`, `logoApproved`).
2. [`src/data/platforms.ts`](file:///c:/Users/BGF/OneDrive/Documents/StartsDigital/src/data/platforms.ts): Manages 12 platform tool entries and official SVG paths.

### B. Layout Components Modified
1. [`src/styles/global.css`](file:///c:/Users/BGF/OneDrive/Documents/StartsDigital/src/styles/global.css): Configured light-first theme tokens (`#F7F7F3` background, `#0B0D10` body text).
2. [`src/layouts/BaseLayout.astro`](file:///c:/Users/BGF/OneDrive/Documents/StartsDigital/src/layouts/BaseLayout.astro): Re-mapped body styles and selection highlights.
3. [`src/components/layout/Header.astro`](file:///c:/Users/BGF/OneDrive/Documents/StartsDigital/src/components/layout/Header.astro): Implemented sticky light header (`bg-white/90`), `StartsDigital` brandmark, navigation links, and "Discuss Your Project" CTA.
4. [`src/components/layout/MobileMenu.astro`](file:///c:/Users/BGF/OneDrive/Documents/StartsDigital/src/components/layout/MobileMenu.astro): Implemented accessible drawer with light theme.
5. [`src/components/layout/Footer.astro`](file:///c:/Users/BGF/OneDrive/Documents/StartsDigital/src/components/layout/Footer.astro): Deep Navy background (`#07111F`) with complete agency details, direct email, WhatsApp links, and copyright 2026.

### C. Homepage Section Components Created & Rebuilt
1. [`src/components/sections/Hero.astro`](file:///c:/Users/BGF/OneDrive/Documents/StartsDigital/src/components/sections/Hero.astro): Rebuilt split-screen hero with verified metrics strip and straight visual frame.
2. [`src/components/sections/BrandExperience.astro`](file:///c:/Users/BGF/OneDrive/Documents/StartsDigital/src/components/sections/BrandExperience.astro): Created responsive logo wall and secondary text listing for entries without approved logos.
3. [`src/components/sections/Services.astro`](file:///c:/Users/BGF/OneDrive/Documents/StartsDigital/src/components/sections/Services.astro): Rebuilt open service layout featuring 2 large featured deliverable cards and 4 supporting panels with thin dividers.
4. [`src/components/sections/FeaturedWork.astro`](file:///c:/Users/BGF/OneDrive/Documents/StartsDigital/src/components/sections/FeaturedWork.astro): Created alternating project showcase rows highlighting Black Gold Fertilizer, Wajib Livestock Qurbani Campaign, and RK Reno Solutions.
5. [`src/components/sections/Results.astro`](file:///c:/Users/BGF/OneDrive/Documents/StartsDigital/src/components/sections/Results.astro): Rebuilt Deep Navy section displaying verified commercial statistics.
6. [`src/components/sections/PlatformsTools.astro`](file:///c:/Users/BGF/OneDrive/Documents/StartsDigital/src/components/sections/PlatformsTools.astro): Created 12-tile official platform SVG grid.
7. [`src/components/sections/WhyUs.astro`](file:///c:/Users/BGF/OneDrive/Documents/StartsDigital/src/components/sections/WhyUs.astro): Rebuilt operating model pillars focusing on strategy, execution, tech stack, and transparency.
8. [`src/components/sections/FounderSection.astro`](file:///c:/Users/BGF/OneDrive/Documents/StartsDigital/src/components/sections/FounderSection.astro): Created founder layout component (conditionally disabled).
9. [`src/components/sections/Process.astro`](file:///c:/Users/BGF/OneDrive/Documents/StartsDigital/src/components/sections/Process.astro): Rebuilt 4-stage open timeline layout.
10. [`src/components/sections/FAQ.astro`](file:///c:/Users/BGF/OneDrive/Documents/StartsDigital/src/components/sections/FAQ.astro): Created accessible accordion component with 6 verified Q&As.
11. [`src/components/sections/ContactCTA.astro`](file:///c:/Users/BGF/OneDrive/Documents/StartsDigital/src/components/sections/ContactCTA.astro): Rebuilt Deep Navy CTA section with direct email and WhatsApp links.
12. [`src/pages/index.astro`](file:///c:/Users/BGF/OneDrive/Documents/StartsDigital/src/pages/index.astro): Assembled all 11 section blocks in clean 70/30 light/dark visual order.

---

## 5. Responsive, Performance & Accessibility Implementation

### A. Responsive Breakpoint Behaviors
- **1440px (Desktop)**: 12-column container grids (`max-w-7xl px-8`), dual-column hero split, alternating project rows, 6-column tool grids.
- **1024px (Tablet Landscape)**: Showcase cards scale to 2-column flex layouts, platform tool icons wrap to 4 columns.
- **768px (Tablet Portrait)**: Hero section stacks vertically (text first, CTAs, metrics, visual), mobile menu toggle activates, services stack cleanly with left borders.
- **430px / 375px (Mobile)**: Padding adjusts to `px-5` / `px-4`, headline fonts scale dynamically (`text-4xl`), hero CTAs and contact cards stack vertically with full-width touch targets.
- **320px (Small Mobile)**: Guaranteed no horizontal scrolling, zero text clipping or overlapping elements.

### B. Animation & Performance Considerations
- **No Third-Party Animation Bloat**: No heavy JS animation libraries or CSS Framework overrides added.
- **Subtle Interactions**: Smooth CSS transitions for header backdrop-blur, accordion toggles, button hover states, and card borders.
- **Media Optimizations**: Explicit `width` and `height` attributes on image elements to eliminate Cumulative Layout Shift (CLS). Eager loading on hero visual; lazy loading on all below-the-fold assets.
- **Reduced Motion Support**: Fully respects `@media (prefers-reduced-motion: reduce)`.

### C. Accessibility Standards
- High contrast body text (`#0B0D10` on `#F7F7F3`, `#F7F7F3` on `#07111F`).
- Skip-to-content accessibility link at the top of BaseLayout.
- Keyboard-navigable mobile menu drawer with focus trapping and `Escape` key handler.
- Keyboard-navigable FAQ accordion with dynamic `aria-expanded` and `aria-controls` updates.
- All interactive buttons and links feature visible focus rings (`focus-visible:ring-2 focus-visible:ring-brand-blue`).

---

## 6. Remaining Asset Intake Requirements

Before merging `visual-redesign-v2` into production, the following real client assets from [asset-intake.md](../../../docs/agy/visual-portfolio-redesign/asset-intake.md) should be uploaded:
1. **Brand Logos**: Receive and place transparent logo files for Black Gold Fertilizer, Wajib Livestock, RK Reno Solutions, Viral Naturals, Shopinq Online, Super Safety Covers, Riyadh Finish Pro, Convort AI, Clearzone Immigration, Europa Immigration, Quick Immigration Service, and Unique Lahore Lab Sahiwal under `public/brands/<brand-name>/logo.png` or `logo.svg`.
2. **Real Screenshots & Campaign Photos**: Replace temporary prototype images in `public/prototype/` with real client screenshots/creatives under `public/projects/`.
