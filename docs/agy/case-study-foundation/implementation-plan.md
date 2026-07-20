# Implementation Plan - Portfolio & Case Study Foundation (Revised)

This plan outlines the technical structure, design rules, and content verification steps for adding a portfolio and case-study system to the Starts Digital website.

## 1. Directory Structure & Astro 7 Content Layer Architecture
We will use Astro 7's new **Content Layer** approach. Instead of the legacy `src/content/config.ts` system, we will configure the schema inside `src/content.config.ts` using the new dynamic loaders and `defineCollection`.

Recommended folder structure:
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
└── layouts/
    └── CaseStudyLayout.astro
```

### Collection Loader Setup
In [content.config.ts](../../../src/content.config.ts), the case-studies collection will use the built-in `glob` loader to read markdown files:
```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudies = defineCollection({
  loader: glob({ pattern: '*.md', base: "./src/data/case-studies" }),
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
    heroImage: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    draft: z.boolean().default(true)
  })
});

export const collections = { 'case-studies': caseStudies };
```
*Note: Publication dates and image paths are optional, and will be conditionally rendered to avoid broken references.*

### Dynamic Routing
Because the project compiles to static pages (`output: 'static'`), the dynamic page [[slug].astro](../../../src/pages/work/[slug].astro) will explicitly implement `getStaticPaths()` using `getCollection` from `astro:content`:
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
Inside the template, page HTML will render dynamically using:
`const { Content } = await render(entry);`

---

## 2. Content Truthfulness & Verification Matrix
To ensure 100% truthfulness, only approved business facts will be published. Client-specific narratives, timelines, and technical challenges will **not** be drafted based on general marketing frameworks or assumptions.

### Approved Project Facts
- **Black Gold Fertilizer**: E-commerce / Agriculture sector. Managed services include Meta advertising, digital strategy, e-commerce growth, and creative campaigns. Contributed to PKR 30M+ in revenue and 29,000+ product sales.
- **Qurbani Campaign**: Seasonal e-commerce / Livestock sector. Managed services include Campaign strategy, lead generation, content, and paid social. Helped sell more than 150 animals and supported PKR 4.2M+ in sales.

### Verification Matrix
The following sections must be verified by the user before they are moved from draft status:

| Page Section | Verification Status | Rules |
| :--- | :--- | :--- |
| **Business Challenge** | **Pending User Verification** | Do not draft narrative until the user supplies exact facts. |
| **Our Responsibilities**| Ready | Strictly matches the list of approved services. |
| **Strategy** | **Pending User Verification** | No assumptions allowed. User must verify strategic planning. |
| **Execution** | **Pending User Verification** | No assumptions allowed. User must verify creative assets and setups. |
| **Key Results** | Ready | Restrained to the approved outcomes. |
| **Channels & Tools** | **Pending User Verification** | User must confirm platforms used. |
| **Target Audience** | **Pending User Verification** | User must define target audience parameters. |
| **Project Timeline** | **Pending User Verification** | User must provide real campaign durations. |
| **Lessons & Insights** | **Pending User Verification** | User must provide operational insights. |

---

## 3. No Empty Media Placeholders
To ensure a premium design, we will use **conditional rendering** to show visuals. 
- If a case study has no approved images in its frontmatter (`heroImage` or `gallery`), the visual blocks will be completely omitted from the DOM.
- We will not render "image coming soon" boxes, empty placeholder skeletons, stock photography, fake analytics dashboard screenshots, or AI-generated visual drafts.
- Campaign screenshot media will only render once actual client files are approved and uploaded by the user.

---

## 4. Centralized URL Handling
We will avoid hardcoding URLs in canonical links, breadcrumbs, structured data, and navigation. All URLs will resolve dynamically using site configuration properties:
- `Astro.site` or `Astro.url.pathname`
- `siteConfig.url` and `siteConfig.basePath` (e.g. from [site.ts](../../../src/data/site.ts))
- Existing URL helpers (such as `getFullUrl` or `getAssetPath` in `site.ts`)

This ensures that migrating the project from the temporary GitHub Pages path to the custom domain `startsdigital.com` only requires modifying the centralized configuration in `src/data/site.ts`.

### Direct Contact CTAs
All case-study CTA buttons prompting project inquiries must link back to the homepage contact section:
```text
${siteConfig.basePath}/#contact
```
Do not link to `/work/#contact` (since contact forms do not exist on the `/work/` page).

---

## 5. Internal Link & Work Page Rules
- **Homepage Selected Work**:
  - The *Black Gold Fertilizer* link will point to `/startsdigital/work/black-gold-fertilizer/`.
  - The *Qurbani Campaign* link will point to `/startsdigital/work/qurbani-campaign/`.
  - *RK Reno Solutions* and *Immigration and Education Projects* will remain plain text entries or link back to `/startsdigital/work/` (with no fake case study target paths).
- **Work Overview Page (`/work/`)**:
  - The two verified case studies will be featured prominently with clickable links.
  - The other two projects (RK Reno & Immigration) will appear in a separate section titled `"Additional Experience"` without fake links. We will not use disabled buttons or broken indicators.

---

## 6. Open Graph (OG) & Social Images
- We will not reference dummy files (like `/images/og-default.jpg`) if they do not exist in the repository.
- We will conditionally render `og:image` and `twitter:image` tags in [SEO.astro](../../../src/components/seo/SEO.astro) only when `ogImage` is explicitly configured in frontmatter.
- Recommended visual assets for OG preview images must have dimensions of exactly `1200 × 630 pixels`.

---

## 7. Structured Data
- **Article Schema**: Dynamic case-study pages will render JSON-LD `Article` structured data. We will only include real metadata. We will not generate fake values for `datePublished`, `dateModified`, `image`, client details, author profiles, or fake reviews.
- **Breadcrumb Schema**: We will render `BreadcrumbList` structured data on `/work/` and individual case-study pages, aligning with search engine indexing guidelines.

---

## 8. Image Alt Text Guidelines
- Alt text must describe only what is visibly present in the image.
- We will not write alt text that asserts commercial outcomes (e.g. *"Dashboard verifying PKR 4.2M sales"*).
- Alt text must be factual and descriptive (e.g. *"Meta ads manager interface showing lead generation metrics"*).

---

## 9. User Information Questionnaire
The following questionnaire must be filled out for each project to complete the pending sections of the case studies:

### Questionnaire for Case Studies
1.  **Original Business Problem**: What challenges was the client facing before this project?
2.  **Campaign Objective**: What was the primary goal (e.g. leads, product sales)?
3.  **Client's Target Audience**: Who was the target demographic and location?
4.  **Exact Services/Responsibilities**: What did Starts Digital manage (strategy, ad creatives, page optimization)?
5.  **Platforms & Tools Used**: Confirm all channels (Meta Ads, Shopify, WooCommerce, WhatsApp Business, etc.).
6.  **Campaign Formats**: What ad types were tested (video, catalog ads, carousel, lead forms)?
7.  **Creative Testing Approach**: How was testing managed (copy variations, creative testing hooks)?
8.  **Project Period/Timeline**: What was the approximate duration of the campaigns?
9.  **Key Operations & Improvements**: What workflow changes were implemented to optimize results?
10. **Lessons Learned**: What key insights did we take away from this campaign?
11. **Assets Available**: Are there screenshots, visual designs, or product photography files available for upload?
12. **Client Permission Status**: Has the client approved displaying their brand name and results?

---

## 10. Verification Plan
- **Type Checking**: Run `npm run check` to ensure Astro 7 loaders and schema typings compile.
- **Static Compile**: Run `npm run build` to confirm output static files generate within the `/dist/work/` directory hierarchy.
- **Link & Sitemap Integrity**: Confirm `/style-guide` remains excluded from `sitemap-0.xml`.
