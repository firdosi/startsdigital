# Walkthrough - Starts Digital Case Study Foundation

This walkthrough documents the design and development details of the newly introduced portfolio index and dynamic case studies for the Starts Digital website.

## 1. Accomplishments

### Dynamic Content Layer Setup
- Configured [src/content.config.ts](../../../src/content.config.ts) utilizing Astro 7's new Content Layer pattern.
- Implemented `defineCollection` using the standard `glob` loader to read Markdown case study entries under `./src/data/case-studies` matching pattern `**/*.md`.
- Added strict schema validation using `z` from `astro/zod`, introducing a reusable, accessible `mediaSchema` requiring alt-texts for images:
  ```typescript
  const mediaSchema = z.object({
    src: z.string(),
    alt: z.string().min(1),
    caption: z.string().optional()
  });
  ```

### Factual Case Study Entries
- Created [black-gold-fertilizer.md](../../../src/data/case-studies/black-gold-fertilizer.md) containing verified e-commerce metrics (PKR 30M+ revenue, 29,000+ sales contribution) and approved services.
- Created [qurbani-campaign.md](../../../src/data/case-studies/qurbani-campaign.md) containing seasonal livestock sales results (150+ animals sold, PKR 4.2M+ sales supported).
- Set `draft: false` on both entries to mark them as published.

### Reusable case-study layout (`CaseStudyLayout.astro`)
- Created [CaseStudyLayout.astro](../../../src/layouts/CaseStudyLayout.astro) to render case studies dynamically.
- Implemented **conditional rendering**: Omitted all unverified sections (Business Challenge, Strategy, Execution, Target Audience, Timeline, Channels, Tools, and Lessons) and their headings.
- Omitted all visual areas and galleries because no visual assets have been configured yet.
- Pointed related service links back to the homepage services section: `${siteConfig.basePath}/#services`.
- Connected final CTAs to the homepage contact section: `${siteConfig.basePath}/#contact`.

### Premium Portfolio Page (`/work/`)
- Created [index.astro](../../../src/pages/work/index.astro) to serve as our main work listing.
- Fetches non-draft case studies dynamically from the content layer, sorted by order index.
- Lists RK Reno Solutions and Immigration Projects under a distinct **"Additional Experience"** section with no fake buttons or links.
- Uses exact approved metadata:
  - Title: *Client Success & Case Studies | Starts Digital*
  - Description: *Explore Starts Digital case studies covering e-commerce growth, paid advertising, lead generation and verified campaign outcomes.*
- Connects CTA button to homepage contact section.

### Accessible breadcrumb navigation
- Created [Breadcrumbs.astro](../../../src/components/navigation/Breadcrumbs.astro) wrapping breadcrumb lists inside a semantic `<nav aria-label="Breadcrumb">` tag, using `aria-current="page"` on the current active item.
- Created [BreadcrumbSchema.astro](../../../src/components/seo/BreadcrumbSchema.astro) to output JSON-LD `BreadcrumbList` schema.
- Embedded breadcrumbs and breadcrumb schemas on both the portfolio overview page and dynamic case studies.

### Dynamic Routing Setup
- Created [[slug].astro](../../../src/pages/work/[slug].astro) dynamic router page using `getStaticPaths()`.
- Excludes draft entries (`data.draft === true`) from generating routes.

### Centralized URL Handling & Project Navigation
- Updated the header and footer Work links inside [navigation.ts](../../../src/data/navigation.ts) to route dynamically via `getAssetPath('/work/')`.
- Updated homepage Hero button to route to `/work/` via `getAssetPath` in [index.astro](../../../src/pages/index.astro).
- Configured Selected Work links in [SelectedWork.astro](../../../src/components/sections/SelectedWork.astro) to link dynamically to published case study paths, keeping the other two projects unlinked.
- Resolved all canonical URLs and breadcrumb schema absolute items using dynamic Astro variables (`Astro.site` and `Astro.url`) and centralized helpers. No base paths are hardcoded.

---

## 2. Validation & Deployment

### Astro Diagnostics
- **Astro Check (`npm run check`)**:
  - `Result (27 files): 0 errors, 0 warnings, 0 hints`
- **Astro Build (`npm run build`)**:
  - Successfully generated static pages.
  - Verification check outputs:
    - `/work/index.html` (Work Overview Page)
    - `/work/black-gold-fertilizer/index.html` (Case Study 1)
    - `/work/qurbani-campaign/index.html` (Case Study 2)
    - `/style-guide/index.html` (Style Guide reviewed)

### Sitemap Verification
- Confirmed sitemap index XML output lists the three new work paths (`/work/`, `/work/black-gold-fertilizer/`, `/work/qurbani-campaign/`) and excludes `/style-guide/`.
