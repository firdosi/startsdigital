# Implementation Plan - Portfolio & Case Study Foundation (Final)

This plan details the technical architecture, content strategy, visual guidelines, and files required to implement the portfolio index and case-study foundation for the Starts Digital website.

## 1. Directory Structure & Astro 7 Content Layer Architecture
We will use Astro 7's new **Content Layer** approach. Collection configuration and schema validation will live in `src/content.config.ts`. Case-study files will be stored in Markdown format under `src/data/case-studies/`.

Recommended file structure:
```text
src/
├── content.config.ts
├── data/
│   └── case-studies/
│       ├── black-gold-fertilizer.md
│       └── qurbani-campaign.md
├── pages/
│   └── work/
│       ├── index.astro
│       └── [slug].astro
├── layouts/
│   └── CaseStudyLayout.astro
└── components/
    ├── navigation/
    │   └── Breadcrumbs.astro
    └── seo/
        └── BreadcrumbSchema.astro
```

### Collection Loader & Schema Setup
In [content.config.ts](../../../src/content.config.ts), we will import loaders and validate fields. To support images and ensure accessibility compliance, we define a reusable `mediaSchema` which requires alternate text:

```typescript
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const mediaSchema = z.object({
  src: z.string(),
  alt: z.string().min(1),
  caption: z.string().optional()
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "./src/data/case-studies" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    industry: z.string(),
    services: z.array(z.string()),
    outcomeSummary: z.string(),
    metrics: z.array(
      z.object({
        value: z.string(),
        label: z.string()
      })
    ),
    responsibilities: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    seoTitle: z.string(),
    seoDescription: z.string(),
    ogImage: z.string().optional(),
    heroImage: mediaSchema.optional(),
    gallery: z.array(mediaSchema).optional(),
    draft: z.boolean().default(true)
  })
});

export const collections = { 'case-studies': caseStudies };
```
*Note: The pattern `**/*.md` allows for future nested case-study content.*

### Dynamic Route Rendering
Because the project compiles to static pages (`output: 'static'`), the dynamic page [[slug].astro](../../../src/pages/work/[slug].astro) will implement `getStaticPaths()`, filtering out only entries explicitly marked `draft: true`:
```typescript
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const entries = await getCollection('case-studies', ({ data }) => !data.draft);
  return entries.map(entry => ({
    params: { slug: entry.id },
    props: { entry }
  }));
}
```
Page HTML will compile using:
`const { Content } = await render(entry);`

---

## 2. Publication Strategy
We will launch the initial case studies immediately using only approved facts. Both entries will be created with `draft: false` in their frontmatter. 

To ensure absolute truthfulness:
- **Verified Fields Published**: Industry, services, responsibilities, metrics, and result wording.
- **Omitted Sections**: We will completely omit Business Challenge, Strategy, Execution, Target Audience, Timeline, Channels, Tools, and Lessons sections from the templates until verified facts are supplied.
- **Header Conditional Handling**: We will not display headings or section titles (e.g. *"Our Strategy"*) if their content is empty or unconfigured.
- **Verification Questionnaires**: The questionnaire responses collected in future updates will enrich the pages incrementally, without delaying the launch of these initial minimal versions.

---

## 3. Centralized URL Handling & Domain Migration
We will not hardcode base paths or domain links in any component or content file. Instead, URLs will resolve dynamically using site configuration properties:
- `Astro.site` (configured in `astro.config.mjs`)
- `Astro.url.pathname`
- Centralized helpers in [site.ts](../../../src/data/site.ts) such as:
  - `getAssetPath('/work/black-gold-fertilizer/')`
  - `getAssetPath('/work/qurbani-campaign/')`
  - `getAssetPath('/work/')`
  - `` `${siteConfig.basePath}/#contact` `` (For case-study contact buttons)

### Custom-Domain Migration Requirements
When migrating from the temporary path `firdosi.github.io/startsdigital` to the future domain `startsdigital.com`, configuration must be updated in:
1.  **`astro.config.mjs`**: Set `site: 'https://startsdigital.com'`
2.  **`astro.config.mjs`**: Set `base: '/'`
3.  **`src/data/site.ts`**: Set `siteConfig.url: 'https://startsdigital.com'`
4.  **`src/data/site.ts`**: Set `siteConfig.basePath: ''`
5.  **`public/CNAME`**: Create or update to `startsdigital.com`
6.  **GitHub Settings**: Update domain configurations inside the repository settings tab
7.  **DNS Records**: Map domain A/AAAA and CNAME records to GitHub Pages servers

All canonical links, Open Graph nodes, and sitemaps will continue deriving from Astro core settings and centralized helpers automatically.

---

## 4. Detailed Plan & Requirements

### A. Work Overview Page Layout (`/work/`)
- **Introductory Hero**: Strategic copy presenting Starts Digital's focus: commercial outcomes, digital strategy, campaign management, e-commerce development, and practical AI integrations.
- **Featured Case Studies**: Lists the two published case studies using dynamic data from content collections:
  - Black Gold Fertilizer (linked to `/work/black-gold-fertilizer/` using `getAssetPath`)
  - Qurbani Campaign (linked to `/work/qurbani-campaign/` using `getAssetPath`)
- **Verified Outcome Summaries**: Visually prominent metrics alongside service definitions.
- **Additional Experience**: Other verified experience (RK Reno Solutions & Immigration and Education Projects) will appear under a separate *"Additional Experience"* text stack. These will not have fake links or disabled buttons.
- **Final Contact CTA**: Connects users directly to the homepage contact form using `${siteConfig.basePath}/#contact`.

### B. Reusable Case-Study Layout
- **Breadcrumbs**: Accessible text links: `Home > Work > [Project Name]`.
- **Project Header**: Large page title, industry name, and main outcome summary.
- **Industry & Services List**: Clean listings displaying responsibilities.
- **Approved Outcome Summary**: Restrained results statements in large typography.
- **Responsibilities**: A bulleted checklist of managed actions.
- **Conditionally Rendered Narrative Sections**: Business Challenge, Strategy, Execution, and Lessons headings and text blocks are ONLY rendered when their content exists.
- **Metrics**: High-contrast outcomes in Primary Blue.
- **Conditionally Rendered Real Visuals**: Section header and gallery render ONLY if `heroImage` or `gallery` properties are present in the frontmatter. All images must display their corresponding `alt` property value.
- **Related Services**: Links pointing back to services defined in `src/data/services.ts`.
- **Contact CTA**: Prominent block linking to `${siteConfig.basePath}/#contact`.

### C. Visual Direction
- **Existing Styling Tokens**: Build layouts with established tokens (Warm White `#F7F7F3` for layout reading columns, and Deep Navy `#07111F` or Near Black `#0B0D10` for headliners and outcome boxes).
- **Premium Editorial Layout**: Clean, border-divided grids. Information will separate using thin dividers (`border-brand-grey/15`), em-dashes, and clean spacing.
- **No Card Grids**: Avoid card archives. Present projects as editorial paragraphs and lists.
- **No Stock Imagery**: Do not include stock photos, fake dashboard screenshots, or fake browser mockups.

### D. SEO Plan
*   **Page Titles**:
    - Work Page: `Client Success & Case Studies | Starts Digital`
    - Black Gold Fertilizer: `Black Gold Fertilizer: E-Commerce Growth Case Study | Starts Digital`
    - Qurbani Campaign: `Eid Qurbani Campaign: Seasonal Lead Generation Case Study | Starts Digital`
*   **Meta Descriptions**: Unique, search-optimized descriptions containing the exact outcome figures (e.g. *Read how Starts Digital supported PKR 30M+ in revenue...*).
*   **Canonical URLs**: Derived dynamically from `Astro.site` and `Astro.url.pathname`.
*   **Open Graph**: type configured as `website` for the index page, and `article` for case studies. The tags `og:image` and `twitter:image` will only render when `ogImage` is explicitly configured.
*   **Structured Data**:
    - **`/work/`**: JSON-LD `CollectionPage` schema.
    - **Case Studies**: JSON-LD `WebPage` schema. We will not use `Article` schema unless genuine publication dates, author profiles, and appropriate editorial metadata are configured.
    - **Breadcrumbs**: JSON-LD `BreadcrumbList` schema.

### E. Asset Checklist (Needed from User)
The following visual files are requested from the user to enrich the case studies in future iterations:
- **Black Gold Fertilizer**:
  - 1–2 ad creative images/videos.
  - Cropped screenshot of Shopify/WooCommerce analytics.
  - Product packaging photography.
- **Qurbani Campaign**:
  - 1–2 social media ad creative files.
  - Cropped screenshots of Meta Ads Manager lead volumes or campaign results.
- **Redaction Rules**: All customer details (names, emails, telephone numbers, and profile avatars), pixel IDs, and client-confidential budget numbers must be blurred, cropped, or blacked out prior to upload.

### F. Accessibility & Responsive Review
- **Responsiveness**: Support full scaling across all standard viewports: `320px`, `375px`, `430px`, `768px`, `1024px`, and `1440px`.
- **Heading Hierarchy**: Enforce semantic structure (`h1` for page titles, `h2` and `h3` for inner sections).
- **Keyboard Navigation**: Focus outlines on all navigation anchors and buttons (`focus-visible:ring-2 focus-visible:ring-brand-blue`).
- **Accessible Breadcrumbs**: Breadcrumb container wrapped in `<nav aria-label="Breadcrumb">` with `aria-current="page"` on the current link.
- **Layout Shifts**: Images will use explicit aspect ratios and dimension attributes (`width` and `height`) to prevent cumulative layout shift (CLS).
- **No Overflow**: Rigid width constraints on wrapper classes to prevent horizontal scroll bars.

---

## 5. File Plan

### A. New Files to Create
- [src/content.config.ts](../../../src/content.config.ts): Content layer configuration (schema & glob loader).
- [src/data/case-studies/black-gold-fertilizer.md](../../../src/data/case-studies/black-gold-fertilizer.md): Black Gold Fertilizer verified data.
- [src/data/case-studies/qurbani-campaign.md](../../../src/data/case-studies/qurbani-campaign.md): Qurbani Campaign verified data.
- [src/pages/work/index.astro](../../../src/pages/work/index.astro): Portfolio list overview page.
- [src/pages/work/[slug].astro](../../../src/pages/work/[slug].astro): Dynamic case study routing page.
- [src/layouts/CaseStudyLayout.astro](../../../src/layouts/CaseStudyLayout.astro): Template layout wrapper.
- [src/components/navigation/Breadcrumbs.astro](../../../src/components/navigation/Breadcrumbs.astro): Breadcrumb link tracker.
- [src/components/seo/BreadcrumbSchema.astro](../../../src/components/seo/BreadcrumbSchema.astro): JSON-LD breadcrumb data generator.

### B. Existing Files to Update
- [src/pages/index.astro](../../../src/pages/index.astro): Link hero buttons to page section anchors.
- [src/components/sections/SelectedWork.astro](../../../src/components/sections/SelectedWork.astro): Update project row buttons to link dynamically to `/work/[slug]/`.
- [src/data/projects.ts](../../../src/data/projects.ts): Align keys and services for matching content fields.
- [src/data/navigation.ts](../../../src/data/navigation.ts): Verify work routing references.
- [src/components/seo/SEO.astro](../../../src/components/seo/SEO.astro): Conditionally output OG image properties.

---

## 6. Verification & Build Checks
Following implementation, we will validate the build:
1.  Run `npm run check` and ensure `0 errors` and `0 warnings`.
2.  Run `npm run build` to confirm output files generate inside `dist/work/` correctly.
3.  Check `dist/sitemap-0.xml` to verify `/work/`, `/work/black-gold-fertilizer/`, and `/work/qurbani-campaign/` routes are included, and `/style-guide` remains excluded.
4.  Confirm `draft: true` files do not generate public routes.
5.  Scan HTML files to verify no hardcoded `/startsdigital` base path URLs exist inside links.
