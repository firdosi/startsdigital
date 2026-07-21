# Starts Digital - Visual Homepage Prototype Task Checklist

This document tracks the tasks completed for the visual homepage prototype on branch `visual-redesign-v2`.

---

## 1. Setup & Branch Isolation

- [x] Pull latest changes from `origin/main`
- [x] Verify clean working tree
- [x] Create and switch to isolated prototype branch `visual-redesign-v2`
- [x] Inspect existing project rules (`PROJECT_RULES.md`, `DESIGN_SYSTEM.md`, implementation plan, asset intake registry)

## 2. Reference Analysis & Asset Intake

- [x] Inspect complete `oldweb/` directory (`index.html`, `services.html`, `contact.html`, `assets/`)
- [x] Review layout structures, typography hierarchy, section transitions, and responsive behavior
- [x] Copy temporary non-client decorative visuals to `public/prototype/` for prototype display
- [x] Populate official platform SVG icons under `public/platforms/`

## 3. Data Architecture & Structured Models

- [x] Create `src/data/brands.ts` for managing 12 client brand records and approval flags (`publicApproved`, `logoApproved`)
- [x] Create `src/data/platforms.ts` for managing 12 platform tool records

## 4. Layout & Design System Re-mapping

- [x] Re-map global design tokens to light-first system in `src/styles/global.css`
- [x] Update `src/layouts/BaseLayout.astro` for light body background (`bg-brand-white text-brand-black`)
- [x] Update `src/components/layout/Header.astro` to premium light header with `StartsDigital` wordmark
- [x] Update `src/components/layout/MobileMenu.astro` with light drawer styling
- [x] Update `src/components/layout/Footer.astro` for Deep Navy background, verified contact info, and navigation links

## 5. Homepage Component Implementation

- [x] Rebuild `Hero.astro`: Split-screen layout, verified metrics strip, and clean straight visual frame
- [x] Create `BrandExperience.astro`: Responsive logo wall for logo-approved entries and secondary text listings for text-only entries
- [x] Rebuild `Services.astro`: Open layout with featured cards, deliverables grid, and thin dividers
- [x] Create `FeaturedWork.astro`: Alternating project showcase rows (Black Gold Fertilizer, Wajib Livestock Qurbani Campaign, RK Reno Solutions)
- [x] Rebuild `Results.astro`: Deep Navy background displaying only verified client results
- [x] Create `PlatformsTools.astro`: Responsive grid displaying 12 official platform tool icons
- [x] Rebuild `WhyUs.astro`: Operating model pillars focusing on strategy + execution, engineering, and transparency
- [x] Create `FounderSection.astro`: Conditionally disabled founder component layout
- [x] Rebuild `Process.astro`: Open 4-stage timeline layout (Understand, Plan, Build, Grow)
- [x] Create `FAQ.astro`: Accessible accordion component with verified Q&As
- [x] Rebuild `ContactCTA.astro`: Deep Navy CTA block with direct email and WhatsApp links
- [x] Rebuild `src/pages/index.astro` assembling all 11 homepage sections in 70/30 light/dark visual balance

## 6. Verification & Quality Assurance

- [x] Run `npm run check` (`astro check`) and resolve all TypeScript/Astro errors
- [x] Run `npm run build` to verify static production build
- [x] Verify responsive layout across breakpoints (320px, 375px, 430px, 768px, 1024px, 1440px)
- [x] Ensure no fake ROAS, fake lead totals, fake team photos, or unapproved claims are published
