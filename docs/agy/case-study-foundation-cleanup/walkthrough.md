# Walkthrough - Starts Digital Case Study Foundation Cleanup

This walkthrough logs the adjustments made to the Starts Digital case-study metadata and schemas during the cleanup phase.

## 1. Accomplishments

### SEO Title Duplication Fix
- Updated [black-gold-fertilizer.md](../../../src/data/case-studies/black-gold-fertilizer.md) and [qurbani-campaign.md](../../../src/data/case-studies/qurbani-campaign.md) to remove the brand suffix `| Starts Digital` from `seoTitle` fields.
- Verified that `SEO.astro` appends the brand name suffix exactly once, generating:
  - `Black Gold Fertilizer: E-Commerce Growth Case Study | Starts Digital`
  - `Eid Qurbani Campaign: Seasonal Lead Generation Case Study | Starts Digital`

### Factual Responsibility Realignment
- Restrained Black Gold Fertilizer responsibilities checklist exactly to the approved terms:
  - *Digital marketing strategy*
  - *Meta advertising*
  - *Campaign management*
  - *Creative testing*
  - *E-commerce growth*
  - *Website and conversion support*
- Restrained Qurbani Campaign responsibilities checklist exactly to the approved terms:
  - *Seasonal campaign strategy*
  - *Paid social advertising*
  - *Lead generation*
  - *Creative content*
  - *Sales support*
  - *Campaign management*

### BaseLayout SEO Prop Forwarding
- Updated [BaseLayout.astro](../../../src/layouts/BaseLayout.astro) to accept and forward these optional settings to the SEO manager:
  - `canonicalUrl`
  - `ogType`
  - `ogImage`

### WebPage Schema structured data
- Created [WebPageSchema.astro](../../../src/components/seo/WebPageSchema.astro) to render semantic `WebPage` structured data. Excludes all unverified elements (publication dates, images, ratings).
- Integrated the component inside [CaseStudyLayout.astro](../../../src/layouts/CaseStudyLayout.astro), rendering WebPage schema dynamically on dynamic pages using `Astro.url.href` as the canonical page identifier.
- Configured dynamic page layout to forward `ogType="article"`, `canonicalUrl={Astro.url.href}`, and `ogImage` to `BaseLayout`.

### Work page updates
- Configured [index.astro](../../../src/pages/work/index.astro) to pass `ogType="website"`.
- Adjusted mobile font sizes on the Work overview page: increased featured project services copy and Additional Experience services lists to `text-base` (16px) for readable mobile viewports.

---

## 2. Validation & Build Checks

### Diagnostics
- **Astro Check (`npm run check`)**:
  - `Result (34 files): 0 errors, 0 warnings, 0 hints`
- **Astro Build (`npm run build`)**:
  - Successfully compiled the static site:
    - `/work/index.html` (Work Overview Page)
    - `/work/black-gold-fertilizer/index.html` (Case Study 1)
    - `/work/qurbani-campaign/index.html` (Case Study 2)
  - verified final titles do not contain duplicate suffix tags.
  - sitemap indexes confirmed to include all three Work routes.
