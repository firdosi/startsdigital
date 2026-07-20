# Task Checklist - Starts Digital Case Study Foundation Cleanup

- [x] SEO Title duplicate fixes:
  - [x] Remove `| Starts Digital` from `seoTitle` in `src/data/case-studies/black-gold-fertilizer.md`
  - [x] Remove `| Starts Digital` from `seoTitle` in `src/data/case-studies/qurbani-campaign.md`

- [x] Exact responsibilities wording matching:
  - [x] Restrain `black-gold-fertilizer` responsibilities to the exact six approved terms
  - [x] Restrain `qurbani-campaign` responsibilities to the exact six approved terms

- [x] Base Layout SEO prop forwarding:
  - [x] Update `src/layouts/BaseLayout.astro` to accept and forward `canonicalUrl`, `ogType`, and `ogImage`

- [x] WebPage JSON-LD Structured Data:
  - [x] Create structured data component `src/components/seo/WebPageSchema.astro` accepting `name`, `description`, and absolute `url`
  - [x] Import and render `<WebPageSchema />` inside dynamic pages via `CaseStudyLayout.astro`
  - [x] Forward `canonicalUrl`, `ogType="article"`, and `ogImage` to `BaseLayout` in `CaseStudyLayout.astro`

- [x] Work list page metadata and mobile typography:
  - [x] Pass `ogType="website"` to `BaseLayout` in `src/pages/work/index.astro`
  - [x] Scale service description text in featured list to `text-base` (16px) on mobile viewports
  - [x] Scale service list text in Additional Experience section to `text-base` (16px) on mobile viewports

- [x] Verification & Builds:
  - [x] Run `npm run check` and ensure 0 errors/warnings/hints
  - [x] Run `npm run build` to verify clean static compile
  - [x] Confirm dynamic page titles parse brand suffixes exactly once
  - [x] Verify sitemap includes the three Work routes and excludes Style Guide
