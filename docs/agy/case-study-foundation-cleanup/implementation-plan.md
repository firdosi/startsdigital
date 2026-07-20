# Implementation Plan - Case Study Foundation Cleanup

This plan proposes minor corrections to the Starts Digital portfolio pages and case study entries to resolve SEO title duplication, introduce the `WebPageSchema` structured data component, configure Open Graph types, align responsibilities to the exact approved terms, and refine mobile typography.

## 1. Proposed Changes

### A. Dynamic Schema & SEO Components

#### [NEW] [WebPageSchema.astro](../../../src/components/seo/WebPageSchema.astro)
- A new structured data component that generates a basic JSON-LD `WebPage` schema.
- Acceptable properties: `name`, `description`, `url`, and an optional `breadcrumb` reference.
- Evaluated and verified fields only. It will strictly omit `datePublished`, `dateModified`, `image`, `author`, `client`, `reviews`, and `ratings`.

#### [MODIFY] [BaseLayout.astro](../../../src/layouts/BaseLayout.astro)
- Update component props to accept and forward these optional settings to `SEO.astro`:
  - `canonicalUrl`
  - `ogType`
  - `ogImage`

#### [MODIFY] [CaseStudyLayout.astro](../../../src/layouts/CaseStudyLayout.astro)
- Forward `ogType="article"` to `BaseLayout` so dynamic case studies render with correct Open Graph article tags.
- Import and render `<WebPageSchema />` with dynamic data (title, description, and canonical URL) inside the page.

---

### B. Content Metadata Refinement

#### [MODIFY] [black-gold-fertilizer.md](../../../src/data/case-studies/black-gold-fertilizer.md)
- **Fix Duplicated Title Suffix**: Change `seoTitle` to `"Black Gold Fertilizer: E-Commerce Growth Case Study"` (removing `| Starts Digital`). `SEO.astro` will append the brand suffix dynamically to generate: `Black Gold Fertilizer: E-Commerce Growth Case Study | Starts Digital`.
- **Align Responsibilities**: Replace the custom checklist with the exact approved terms:
  - Digital marketing strategy
  - Meta advertising
  - Campaign management
  - Creative testing
  - E-commerce growth
  - Website and conversion support

#### [MODIFY] [qurbani-campaign.md](../../../src/data/case-studies/qurbani-campaign.md)
- **Fix Duplicated Title Suffix**: Change `seoTitle` to `"Eid Qurbani Campaign: Seasonal Lead Generation Case Study"` (removing `| Starts Digital`).
- **Align Responsibilities**: Replace the custom checklist with the exact approved terms:
  - Seasonal campaign strategy
  - Paid social advertising
  - Lead generation
  - Creative content
  - Sales support
  - Campaign management

---

### C. Layout & Typography Adjustments

#### [MODIFY] [index.astro](../../../src/pages/work/index.astro) (Work page)
- Pass `ogType="website"` to `BaseLayout`.
- Update the Services list in the Featured Case Studies panel and the description text in Additional Experience: change from `text-sm` (14px) to at least `text-base` (16px) on mobile viewports to comply with mobile reading standards. (Breadcrumbs and industry tags may remain at `text-xs` / `text-sm`).

---

## 2. Verification Plan

### Automated Checks
- Run `npm run check` to verify TypeScript typings.
- Run `npm run build` to verify static compile.
- Confirm sitemap (`dist/sitemap-0.xml`) includes all three `/work/` paths and excludes `/style-guide/`.

### Manual Audit Checks
- **SEO Title Suffix**: Inspect page `<title>` elements of both compiled case studies to verify there are no duplicate `| Starts Digital | Starts Digital` suffixes.
- **Structured Data**: Verify JSON-LD outputs using validation tools:
  - Breadcrumb lists on all routes.
  - `CollectionPage` on `/work/`.
  - `WebPage` on `/work/black-gold-fertilizer/` and `/work/qurbani-campaign/`.
  - No presence of `Article` schema, ratings, reviews, client details, or missing images.
- **Open Graph Metadata**: Confirm `og:type` is `article` on case studies and `website` on the Work overview page. Confirm no empty `og:image` tags render.
- **Copy Alignment**: Match the responsibilities in case studies directly against the approved requirements to confirm zero deviation.
- **Work page mobile viewport**: Check that all normal copy and service lists scale to at least 16px (`text-base`) on mobile viewports.
