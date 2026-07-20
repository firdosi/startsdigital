# Revised Implementation Plan - Starts Digital Visual Redesign & Asset System

This document outlines the complete visual redesign plan for the Starts Digital website, Work page, case studies, and selected homepage components. It shifts the entire site to a unified, light-first digital agency design system while maintaining brand identity and technical accessibility.

---

## 1. Global Visual System & Design Tokens

To address the overall visual feedback, the entire site is transitioning from its dark mode default to a **premium, light-first editorial system**. Existing color tokens from [DESIGN_SYSTEM.md](../../../DESIGN_SYSTEM.md) are preserved but re-mapped for light-mode backgrounds, reserving dark navy colors for visual punctuation.

### Re-mapped Design Tokens
*   **Page Background**: Warm White (`#F7F7F3`) — Applied as the base body background globally (instead of `#0B0D10`).
*   **Surface White**: Pure White (`#FFFFFF`) — Card bodies, dropdown blocks, and light containers.
*   **Surface Grey**: Light Grey / Soft Grey (`#F0F2F5` / `#E8EBEF`) — Secondary sections, process blocks, and code/table outlines.
*   **Main Text / Headings**: Near Black (`#0B0D10`) — Used for default body copy, titles, and structural labels to ensure readable contrast (ratio > 7:1).
*   **Muted Text**: Text Grey (`#667085`) — Description blocks, subtitles, and metadata labels.
*   **Border Color**: Light Grey (`#E4E7EC`) — Subtle borders (`1px`) on containers, tiles, and headers.
*   **Primary Blue**: Accent Blue (`#246BFD`) — Core action button background, inline text links, and key metric numbers.
*   **Teal Accent**: Accent Teal (`#10A8A0`) — Selective highlight markers, category labels, and status badges.
*   **Dark Navy**: Deep Navy (`#07111F`) — Reserved for high-impact visual sections: metrics strips, platform tool grids, the final Contact CTA banner, and footer backgrounds.
*   **Near Black**: Charcoal (`#0F172A`) — Text color for items positioned inside Deep Navy blocks.

---

## 2. Page Wireframe & Layout Specifications

All layouts feature straight, clean real screenshots, simple borders, subtle shadows, and alternating project columns without 3D rotations or overlapping frames.

### A. Global Layout Elements
*   **Header**: White background (`#FFFFFF`) with a subtle bottom border (`#E4E7EC`). Logo text wordmark uses Near Black (`#0B0D10`) for "Starts" and Primary Blue (`#246BFD`) for "Digital".
*   **Footer**: Deep Navy background (`#07111F`) with Warm White (`#F7F7F3`) text and Text Grey (`#667085`) description copy.
*   **Mobile Navigation**: Full-screen overlay in Pure White (`#FFFFFF`), with large clickable menu links in Near Black (`#0B0D10`).

### B. Homepage Structure (Warm White / Light Grey background)
1.  **Hero Section (Light Background)**:
    *   Text-aligned left. Large H1 title in Near Black.
    *   Introductory paragraph and dual CTA buttons (Primary Blue filled and Secondary Grey bordered).
    *   Spacious bottom padding (`py-24` / `96px`) to present an airy agency feel.
2.  **Brand Logo Wall (Light Grey background, `#F0F2F5`)**:
    *   Grid of light neutral tiles showing approved client logos.
3.  **Selected Work (Light Background)**:
    *   Section order: Eyebrow ("SELECTED WORK") -> H2 Section Title.
    *   Alternating columns:
        *   *Project 1*: Straight desktop/mobile screenshot on the left inside a simple `#E4E7EC` border frame. Title, services, and verified metrics on the right.
        *   *Project 2*: Straight screenshot on the right, content on the left.
4.  **Results (Dark Navy Background, `#07111F`)**:
    *   High-impact metric counters styled in large white/blue numbers.
5.  **Services (Light Background)**:
    *   3-column card grid in Pure White. Title uses Lucide icons.
6.  **Platforms & Tools (Light Grey Background)**:
    *   Platform logo grid containing tool tiles.
7.  **Process (Light Background)**:
    *   Horizontal numbered sequence with clean borders.
8.  **About Section (Light Background)**:
    *   Spacious splitting block for agency vision and values.
9.  **Contact CTA (Dark Navy Background)**:
    *   Centered CTA text and "Discuss Your Project" button.

### C. Work Overview Page (`/work/` - Light Background)
1.  **Introductory Hero**: Large header, category navigation tags (E-commerce, Local Services, International).
2.  **Featured Work Showcase**: Alternating screenshot/info grids (2-column layout).
3.  **Additional Projects**: Simple text card lists (RK Reno, etc.) without fake screenshot placeholders.

### D. Case Study Details Page (Light Background)
1.  **Header**: Home > Work > Client Breadcrumbs trail.
2.  **Metrics Banner (Dark Navy background)**: Side-by-side key numbers.
3.  **Split Grid**:
    *   *Left Sidebar (width 1/3)*: Industry metadata, Services, and Platforms.
    *   *Right Sidebar (width 2/3)*: Exact responsibilities checklist, followed by dynamic markdown body content.
4.  **Visual Evidence Gallery (Light Grey background)**: Two side-by-side straight website or campaign screenshots.
5.  **CTA Banner (Dark Navy background)**.

---

## 3. Data Architecture & Structured Models

We introduce strict type definitions for managing brand listings and platform tools.

### A. Brand Data Model (`src/data/brands.ts`)
```typescript
export interface Brand {
  id: string;
  name: string;
  category: 'ecommerce' | 'construction' | 'immigration' | 'technology' | 'healthcare';
  logo: string; // Path under public/brands/
  website?: string;
  projectUrl?: string;
  relationshipLabel?: string;
  featured: boolean;
  publicApproved: boolean; // Visual display permission
  logoApproved: boolean;   // Logo rendering permission
  active: boolean;
  order: number;
}
```
*   *Security Rule*: If `publicApproved: false` or `logoApproved: false`, the logo grid will fallback to rendering a plain text wordmark or omit the entry. Internal Boolean parameters must not be output to rendered HTML wrappers.

### B. Platform Data Model (`src/data/platforms.ts`)
```typescript
export interface Platform {
  id: string;
  name: string;
  logo: string; // Path under public/platforms/
  category: 'advertising' | 'analytics' | 'cms' | 'design' | 'communication';
  url?: string;
  active: boolean;
  order: number;
}
```
*   *Heading Rule*: Explicitly titled: **"Platforms & Tools We Work With"**. Do not label companies as official "Partners" or include certification badges.

---

## 4. Content Collection Schema Extensions

We propose modifying [src/content.config.ts](../../../src/content.config.ts) to define optional visual media properties for dynamic layouts.

```typescript
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro:loaders';

const imageSchema = z.object({
  src: z.string(),
  alt: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  caption: z.string().optional()
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/case-studies' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    industry: z.string(),
    services: z.array(z.string()),
    outcomeSummary: z.string(),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })),
    responsibilities: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    seoTitle: z.string(),
    seoDescription: z.string(),
    ogImage: z.string().optional(),
    draft: z.boolean().default(true),
    
    // Redesign extensions (all optional)
    brandLogo: z.string().optional(),
    heroImage: imageSchema.optional(),
    desktopScreenshot: imageSchema.optional(),
    mobileScreenshot: imageSchema.optional(),
    gallery: z.array(imageSchema).optional(),
    platforms: z.array(z.string()).optional(),
    accentColor: z.string().optional(),
    relatedProjects: z.array(z.string()).optional()
  })
});
```

---

## 5. Naming & Route Redirection Strategy

### Route Redirection for case studies:
*   **Target Change**: Naming Qurbani Campaign to **Wajib Livestock Qurbani Campaign** (pending user approval).
*   **Target Route**: `/work/wajib-livestock-qurbani-campaign/`
*   **Redirect Strategy**: Because GitHub Pages hosts static files and does not support server-side 301 redirects, we will create a client-side routing page at [src/pages/work/qurbani-campaign.astro](../../../src/pages/work/qurbani-campaign.astro) utilizing an HTML `<meta http-equiv="refresh" content="0;url=/startsdigital/work/wajib-livestock-qurbani-campaign/">` redirect tag. This ensures old inbound URLs route gracefully without breaking.

---

## 6. Project & Brand Asset Directory Structure

All assets are managed under `public/` using optimized file formats.

```text
public/
  brands/
    black-gold-fertilizer/
    viral-naturals/
    shopinq/
    super-safety-covers/
    wajib-livestock/
    rk-reno-solutions/
    riyadh-finish-pro/
    clearzone/
    europa-immigration/
    quick-immigration/
    convort-ai/
    unique-lahore-lab/
  platforms/
  projects/
    black-gold-fertilizer/
    wajib-livestock/
    rk-reno-solutions/
    viral-naturals/
    convort-ai/
    immigration/
```

### Complete Brand Registry & Details (12 projects)
1.  **Black Gold Fertilizer** (E-commerce and consumer)
    *   *Permission*: Pending logo & screenshot approval.
    *   *Visuals*: Transparent logo (SVG/PNG), desktop website screenshot.
2.  **Viral Naturals** (E-commerce and consumer)
    *   *Permission*: Pending.
    *   *Visuals*: Logo & desktop layout.
3.  **Shopinq Online** (E-commerce and consumer)
    *   *Permission*: Pending.
    *   *Visuals*: Logo.
4.  **Super Safety Covers** (E-commerce and consumer)
    *   *Permission*: Pending.
    *   *Visuals*: Logo.
5.  **Wajib Livestock** (E-commerce and consumer)
    *   *Permission*: Naming pending user approval.
    *   *Visuals*: Logo & 1 livestock/campaign photograph.
6.  **RK Reno Solutions** (Construction and local services)
    *   *Permission*: Pending logo & homepage screenshot.
    *   *Visuals*: Logo, desktop screenshot.
7.  **Riyadh Finish Pro** (Construction and local services)
    *   *Permission*: Pending.
    *   *Visuals*: Text wordmark fallback.
8.  **Clearzone Immigration** (Immigration and international services)
    *   *Permission*: Pending.
    *   *Visuals*: Text wordmark fallback.
9.  **Europa Immigration** (Immigration and international services)
    *   *Permission*: Pending.
    *   *Visuals*: Text wordmark fallback.
10. **Quick Immigration Service** (Immigration and international services)
    *   *Permission*: Pending.
    *   *Visuals*: Text wordmark fallback.
11. **Convort AI** (Technology and AI)
    *   *Permission*: Pending.
    *   *Visuals*: Software screenshot.
12. **Unique Lahore Lab Sahiwal** (Healthcare)
    *   *Permission*: Pending.
    *   *Visuals*: Logo or text fallback.

---

## 7. Asset Implementation Gate System

To guarantee the site remains professional and layout-complete, the implementation is strictly divided into two distinct gates.

### Stage 1 Scope (Structure & Layout Foundations)
*   Deploy global light-first styling tokens (`global.css`, `BaseLayout.astro`).
*   Update core structural markup (Header, Footer, Homepage panels, Work lists).
*   Create data models `src/data/brands.ts` and `src/data/platforms.ts`.
*   Support layout files and schema fields in `content.config.ts`.
*   **Zero visual placeholders, fake browser frames, or dummy mockups will be added.** If no visual screenshot exists for a project, the image container will be completely omitted from the layout.

### Stage 2 Scope (Visual Assets & Evidence Integration)
Visual case studies and logo grids will only be rendered once the following specific real client files are supplied/approved by the user:
1.  **Black Gold Fertilizer**: Approved logo file and one real desktop website view or campaign creative.
2.  **Wajib Livestock**: Approved project name, logo file, and one real campaign or livestock photograph.
3.  **RK Reno Solutions**: Approved logo file and one real website or social media visual asset.

---

## 8. Reusable Component Inventory

*   `BrandLogoGrid.astro` *(New)*: Renders client logos inside light neutral tiles.
*   `PlatformLogoGrid.astro` *(New)*: Renders SVG platform icons under "Platforms & Tools We Work With".
*   `ProjectShowcase.astro` *(New)*: Renders alternating layout rows (screenshot and text splits).
*   `ProjectGallery.astro` *(New)*: Handles multi-screenshot grids inside case studies.
*   *Note*: Separate layout files will not be created if their code is utilized once.
*   *Trademark Compliance*: Official logos for Meta Ads, Shopify, Google Ads, etc., will be loaded from local files with original proportions, ensuring no color manipulation or unofficial "Partner" badge additions.

---

## 9. Performance & Accessibility Standards

*   **Explicit Dimensions**: All `img` elements will declare strict `width` and `height` dimensions to prevent Cumulative Layout Shift (CLS).
*   **Lazy Loading**: Enabled (`loading="lazy"`) for all assets below the fold. Eager loading and `fetchpriority="high"` are reserved exclusively for Hero elements.
*   **Accessible Alts**: Images will contain descriptive alt text (e.g. `"Black Gold Fertilizer website view on Google Chrome"`).
*   **Focus Ring Support**: Focus borders will be highlighted on user tab interaction: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue`.
*   **Animations**: Motion effects will be limited, wrapping custom transitions under `@media (prefers-reduced-motion: no-preference)`.

---

## 10. Exact File Checklist

### Files to Create:
1. `src/data/brands.ts` *(Client registry data)*
2. `src/data/platforms.ts` *(Platforms registry data)*
3. `src/components/ui/BrandLogoGrid.astro` *(Logo rendering grid)*
4. `src/components/ui/PlatformLogoGrid.astro` *(Platform logo rendering grid)*
5. `src/components/ui/ProjectShowcase.astro` *(Visual showcase rows)*
6. `src/components/ui/ProjectGallery.astro` *(Case study creative galleries)*
7. `src/pages/work/qurbani-campaign.astro` *(Static HTML redirect mapping)*

### Files to Modify:
1. [BaseLayout.astro](../../../src/layouts/BaseLayout.astro) *(Redesign global backgrounds to light-first)*
2. [CaseStudyLayout.astro](../../../src/layouts/CaseStudyLayout.astro) *(Update columns, metric strips, and gallery slots)*
3. [index.astro](../../../src/pages/work/index.astro) *(Rebuild layout using logo walls and visual showcases)*
4. [src/pages/index.astro](../../../src/pages/index.astro) *(Rebuild Homepage using light-first section blocks)*
5. [src/content.config.ts](../../../src/content.config.ts) *(Extend schema with media fields)*
6. [Header.astro](../../../src/components/layout/Header.astro) *(Adjust header contrast to white background)*
7. [Footer.astro](../../../src/components/layout/Footer.astro) *(Refine text layouts for Deep Navy colors)*
8. [Results.astro](../../../src/components/sections/Results.astro) *(Update container padding and alignment)*
9. [Services.astro](../../../src/components/sections/Services.astro) *(Rebuild services using Lucide icons)*
10. [SelectedWork.astro](../../../src/components/sections/SelectedWork.astro) *(Update homepage panels to use project showcase layouts)*
11. [Process.astro](../../../src/components/sections/Process.astro) *(Clean sequence borders)*
12. [AboutPreview.astro](../../../src/components/sections/AboutPreview.astro) *(Adjust side grid spacings)*
13. [ContactCTA.astro](../../../src/components/sections/ContactCTA.astro) *(Refine margins)*
14. [global.css](../../../src/styles/global.css) *(Declare light-first global styles and design variables)*
