# Task Checklist - Starts Digital Case Study Foundation

- [x] Content layer configuration setup:
  - [x] Create `src/content.config.ts`
  - [x] Configure schema with `mediaSchema` and optional properties
  - [x] Configure glob loader with pattern `**/*.md`

- [x] Dynamic case studies generation:
  - [x] Create entry `src/data/case-studies/black-gold-fertilizer.md`
  - [x] Create entry `src/data/case-studies/qurbani-campaign.md`
  - [x] Create dynamic routing page `src/pages/work/[slug].astro`
  - [x] Exclude dynamic routing for draft case studies

- [x] Reusable case-study layout implementation:
  - [x] Create `src/layouts/CaseStudyLayout.astro`
  - [x] Conditionally render visual evidence sections (gallery and hero) when assets are set
  - [x] Omit unverified narrative sections (Business Challenge, Strategy, etc.)
  - [x] Add dynamic BreadcrumbSchema JSON-LD structured data
  - [x] Map related services links back to homepage services (`#services`)
  - [x] Map contact CTAs back to homepage contact (`#contact`)

- [x] Accessible breadcrumb navigation:
  - [x] Create `src/components/navigation/Breadcrumbs.astro`
  - [x] Create `src/components/seo/BreadcrumbSchema.astro`

- [x] Work list page:
  - [x] Create `src/pages/work/index.astro`
  - [x] Query non-draft studies from the new content layer collection
  - [x] Display additional unlinked experience (RK Reno Solutions, Immigration Projects)
  - [x] Inject Breadcrumb and CollectionPage JSON-LD structured data
  - [x] Ensure sitemap output indices are updated

- [x] Navigation & Link mappings:
  - [x] Update header and footer navigation arrays to map to `getAssetPath('/work/')` in `src/data/navigation.ts`
  - [x] Point homepage Hero "View Our Work" button to `/work/` in `src/pages/index.astro`
  - [x] Update homepage Selected Work project lists to link to detail pages in `src/components/sections/SelectedWork.astro`

- [x] Verification & Validation:
  - [x] Run `npm run check` and ensure 0 errors/warnings
  - [x] Run `npm run build` to verify clean static compile
  - [x] Confirm sitemap index includes all three new Work URLs and style-guide remains excluded
