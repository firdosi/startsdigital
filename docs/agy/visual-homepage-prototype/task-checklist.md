# Starts Digital - Visual Homepage Prototype Task Checklist

This document tracks the tasks completed for the bold, image-led visual homepage redesign on branch `visual-redesign-v2`.

---

## 1. Setup & Branch Isolation

- [x] Pull latest changes from `origin/main`
- [x] Verify clean working tree on `visual-redesign-v2`
- [x] Inspect existing project rules ([PROJECT_RULES.md](../../../PROJECT_RULES.md), [DESIGN_SYSTEM.md](../../../DESIGN_SYSTEM.md), asset intake registry)

## 2. Reference Analysis & Asset Intake

- [x] Inspect complete `oldweb/` directory (`index.html`, `services.html`, `contact.html`, `assets/`)
- [x] Reuse layered composite visual concepts, brand strips, timeline progression, and scannable metrics
- [x] Copy temporary concept WebP visuals under `public/prototype/` with `loading="eager"` attributes to ensure zero blank image frames
- [x] Add concise `CONCEPT VISUAL` badges to temporary project image containers

## 3. Hero Section Transformation

- [x] Rebuild [Hero.astro](../../../src/components/sections/Hero.astro): Desktop ~48% content / ~52% visual composition split
- [x] Eyebrow: `DIGITAL MARKETING, CREATIVE & TECHNOLOGY`
- [x] Headline: `Digital strategy, campaigns and websites built to generate <span class="...">measurable growth.</span>`
- [x] Scannable Results Strip: `PKR 30M+` Revenue Supported, `29,000+` Product Sales, `Multiple` Industries & Markets
- [x] Right column layered composite composition with blue/teal graphic shapes, subtle dot matrix pattern, and `CONCEPT VISUAL` badge

## 4. Elimination of Repetitive Card Grids

- [x] Rebuild [Services.astro](../../../src/components/sections/Services.astro): Replace 6 equal white cards with 3 distinct large solution pillars (`Performance & Lead Generation`, `Websites, E-Commerce & SEO`, `Creative Content & AI Systems`) using light, dark navy, and image-led panels
- [x] Rebuild [FeaturedWork.astro](../../../src/components/sections/FeaturedWork.astro): Replace small alternating cards with 3 substantial editorial project showcases (`Black Gold Fertilizer`, `Qurbani Campaign`, `RK Reno Solutions`)
- [x] Rebuild [Results.astro](../../../src/components/sections/Results.astro): Wide editorial metric layout with vertical dividers and background glow effects
- [x] Rebuild [PlatformsTools.astro](../../../src/components/sections/PlatformsTools.astro): Compact horizontal technology band grouped by category with typographic list dividers
- [x] Rebuild [WhyUs.astro](../../../src/components/sections/WhyUs.astro): Editorial split layout (left: large statement, right: 4 differentiators with dividers)
- [x] Rebuild [Process.astro](../../../src/components/sections/Process.astro): Continuous horizontal connected timeline (`Understand → Plan → Build → Grow`)
- [x] Rebuild [FAQ.astro](../../../src/components/sections/FAQ.astro): Split layout with left-side direct consultation panel and right-side interactive accordion
- [x] Rebuild [ContactCTA.astro](../../../src/components/sections/ContactCTA.astro): High-impact Deep Navy CTA section with separated email and WhatsApp cards

## 5. Mobile Content Reduction & Typography

- [x] Reduce mobile page length: 3 main service category panels, concise deliverables, compact platform groups, shortened process descriptions
- [x] Enforce minimum 16px font size on mobile body copy

## 6. Verification & Quality Assurance

- [x] Run `npm run check` (`astro check`) and resolve all TypeScript/Astro errors (0 errors)
- [x] Run `npm run build` to verify static production build (0 errors)
- [x] Verify responsive layout across 320px, 375px, 430px, 768px, 1024px, 1440px
- [x] Ensure no blank grey image frames appear in screenshots
- [x] Regenerate full-page screenshots (`desktop-1440-full.png`, `tablet-768-full.png`, `mobile-375-full.png`)
- [x] Generate focused review screenshots (`desktop-hero-services.png`, `desktop-featured-work.png`, `mobile-hero-work.png`)
