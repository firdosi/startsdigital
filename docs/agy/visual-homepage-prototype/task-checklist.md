# Starts Digital - Visual Homepage Prototype Task Checklist

This document tracks the tasks completed for the visual homepage prototype on branch `visual-redesign-v2`.

---

## 1. Setup & Branch Isolation

- [x] Pull latest changes from `origin/main`
- [x] Verify clean working tree
- [x] Create and switch to isolated prototype branch `visual-redesign-v2`
- [x] Inspect existing project rules ([PROJECT_RULES.md](../../../PROJECT_RULES.md), [DESIGN_SYSTEM.md](../../../DESIGN_SYSTEM.md), implementation plan, asset intake registry)

## 2. Reference Analysis & Asset Intake

- [x] Inspect complete `oldweb/` directory (`index.html`, `services.html`, `contact.html`, `assets/`)
- [x] Review layout structures, typography hierarchy, section transitions, and responsive behavior
- [x] Copy and filter temporary non-client decorative WebP visuals under `public/prototype/` (retaining only 4 active prototype assets)
- [x] Adopt preferred safe platform display model using neutral text tiles with category icons (official brand assets pending review per [asset-intake.md](../../visual-portfolio-redesign/asset-intake.md))

## 3. Data Architecture & Structured Models

- [x] Create [brands.ts](../../../src/data/brands.ts) for managing 12 client brand records, setting all entries to `publicApproved: false` and `logoApproved: false` pending user confirmation
- [x] Create [platforms.ts](../../../src/data/platforms.ts) for managing 12 platform tool records

## 4. Layout & Design System Re-mapping

- [x] Re-map global design tokens to light-first system in [global.css](../../../src/styles/global.css)
- [x] Update [BaseLayout.astro](../../../src/layouts/BaseLayout.astro) for light body background (`bg-brand-white text-brand-black`)
- [x] Update [Header.astro](../../../src/components/layout/Header.astro) to premium light header with `StartsDigital` wordmark
- [x] Update [MobileMenu.astro](../../../src/components/layout/MobileMenu.astro) with light drawer styling
- [x] Update [Footer.astro](../../../src/components/layout/Footer.astro) for Deep Navy background, verified contact info, and navigation links

## 5. Homepage Component Implementation

- [x] Rebuild [Hero.astro](../../../src/components/sections/Hero.astro): Split-screen layout, verified metrics strip, visible `PROTOTYPE VISUAL` label, and neutral wording
- [x] Update [BrandExperience.astro](../../../src/components/sections/BrandExperience.astro): Component architecture ready, completely hidden when zero brands have `publicApproved: true`
- [x] Rebuild [Services.astro](../../../src/components/sections/Services.astro): Open layout with featured cards, prominent SVG category icons, deliverables grid, and thin dividers
- [x] Update [FeaturedWork.astro](../../../src/components/sections/FeaturedWork.astro): Showcase rows with approved wording, `Qurbani Campaign` title, `RK Reno Solutions` scope, and visible prototype labels
- [x] Rebuild [Results.astro](../../../src/components/sections/Results.astro): Deep Navy background displaying only verified client results
- [x] Update [PlatformsTools.astro](../../../src/components/sections/PlatformsTools.astro): Neutral text tile grid displaying 12 platform tools with generic category SVG icons
- [x] Rebuild [WhyUs.astro](../../../src/components/sections/WhyUs.astro): Operating model pillars focusing on strategy + execution, engineering, and transparency
- [x] Create [FounderSection.astro](../../../src/components/sections/FounderSection.astro): Conditionally disabled founder component layout
- [x] Rebuild [Process.astro](../../../src/components/sections/Process.astro): Open 4-stage timeline layout (Understand, Plan, Build, Grow)
- [x] Create [FAQ.astro](../../../src/components/sections/FAQ.astro): Accessible accordion component with 6 verified Q&As
- [x] Rebuild [ContactCTA.astro](../../../src/components/sections/ContactCTA.astro): Deep Navy CTA block with direct email and WhatsApp links
- [x] Rebuild [index.astro](../../../src/pages/index.astro) assembling all section blocks in clean 70/30 light/dark visual order

## 6. Verification & Quality Assurance

- [x] Run `npm run check` (`astro check`) and resolve all TypeScript/Astro errors (0 errors)
- [x] Run `npm run build` to verify static production build (0 errors)
- [x] Verify responsive layout across breakpoints (320px, 375px, 430px, 768px, 1024px, 1440px)
- [x] Ensure no fake ROAS, fake lead totals, fake team photos, or unapproved claims are published
- [x] Capture and commit 3 full-page screenshots under `docs/agy/visual-homepage-prototype/screenshots/`
