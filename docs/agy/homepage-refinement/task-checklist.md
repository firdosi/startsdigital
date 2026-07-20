# Implementation Checklist - Starts Digital Homepage Visual Refinements

- [x] Global Theme & Section Heading Updates
  - [x] Update `src/components/ui/SectionHeading.astro` to use `text-brand-muted-dark` (#98A2B3) for dark background descriptions

- [x] Header & Footer Readability
  - [x] Update `src/components/layout/Header.astro` for wordmark size and hamburger button touch area
  - [x] Update `src/components/layout/Footer.astro` for wordmark size, spacing, and link readability (removing low-opacity text)

- [x] Homepage Section Refinements
  - [x] Update `src/pages/index.astro` Hero section text sizes, button spacings, and capability card list rows (remove hover-only "Active →" indicator)
  - [x] Update `src/components/sections/Results.astro` (2-column mobile grid, prominent metrics, readable descriptions)
  - [x] Update `src/components/sections/Services.astro` (Enlarged service titles, numbers, and 16px descriptions)
  - [x] Update `src/components/sections/SelectedWork.astro` (Editorial panel redesign, outcome prominence, service sentence instead of chips)
  - [x] Update `src/components/sections/Process.astro` (Vertical mobile sequence layout, large numbers, 16px descriptions)
  - [x] Update `src/components/sections/WhyUs.astro` (Use Lucide icons as bullets, increase description spacing)
  - [x] Update `src/components/sections/AboutPreview.astro` (Split dense copy, add uppercase strategy tag eyebrow)
  - [x] Update `src/components/sections/ContactCTA.astro` (Full-width buttons on mobile, larger contact numbers/text, spacing)

- [x] Validation & Build Checks
  - [x] Confirm no instances of `text-2xs` remain in public content
  - [x] Run `npm run check` to verify TypeScript typings
  - [x] Run `npm run build` to verify static compilation
  - [x] Confirm `/style-guide` remains excluded from sitemap output
  - [x] Commit with message: `Refine homepage mobile design and readability`
  - [x] Push to `origin/main`
