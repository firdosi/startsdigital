# Revised Implementation Plan - Starts Digital Visual Redesign & Asset System

This document outlines the complete visual redesign plan for the Starts Digital website, Work page, case studies, and selected homepage components. It shifts the entire site to a unified, light-first digital agency design system while maintaining brand identity and technical accessibility.

---

## 1. Global Visual System & Design Tokens

To address the overall visual feedback, the entire site is transitioning from its dark mode default to a **premium, light-first editorial system**. Existing color tokens from [DESIGN_SYSTEM.md](../../../DESIGN_SYSTEM.md) are preserved but re-mapped for light-mode backgrounds, reserving dark navy colors for visual punctuation.

### Color Mapping & Section Rules
*   **Light Backgrounds (applied to ~70% of the site)**:
    *   Page Background: Warm White (`#F7F7F3`) — Applied as the base body background globally (instead of `#0B0D10`).
    *   Surface White: Pure White (`#FFFFFF`) — Card containers and inner blocks.
    *   Surface Grey: Light Grey / Soft Grey (`#F0F2F5`) — Alternating section backgrounds, process blocks, and code/table outlines.
    *   Main Text / Headings: Near Black (`#0B0D10`) — Default body copy and headings.
    *   Muted Text: Text Grey (`#667085`) — Supporting descriptions and small metadata.
    *   Borders: Light border grey (`#E4E7EC`) — Thin dividers (`1px`).
*   **Dark Sections (applied to ~30% of the site, e.g. Results, platforms, CTA, footer)**:
    *   Background: Deep Navy (`#07111F`).
    *   Headings: Warm White (`#F7F7F3`) — Must be used for high-contrast headers.
    *   Supporting / Body Text: Muted Light (`#98A2B3`) — For all secondary copy inside dark areas.
    *   *Contrast Constraint*: Never use `#0F172A` or `#667085` as text on a `#07111F` background.

---

## 2. Page Wireframe & Layout Specifications

All layouts feature straight, clean real screenshots, simple borders, subtle shadows, and alternating project columns without 3D rotations or overlapping frames.

### A. Global Layout Elements
*   **Header**: White background (`#FFFFFF`) with a subtle bottom border (`#E4E7EC`). Logo text uses Near Black (`#0B0D10`) for "Starts" and Primary Blue (`#246BFD`) for "Digital".
*   **Footer**: Deep Navy background (`#07111F`) with Warm White (`#F7F7F3`) headings and Muted Light (`#98A2B3`) body copy.
*   **Mobile Navigation**: Full-screen overlay in Pure White (`#FFFFFF`), with large clickable menu links in Near Black (`#0B0D10`).

### B. Homepage Structure
1.  **Hero Section (Light Background)**:
    *   *Left*: Large H1 title in Near Black. Introductory paragraph in `#667085`. Dual CTA buttons (Primary Blue filled and Secondary Grey bordered).
    *   *Right (Conditional Visual Area)*: A clean, straight desktop screenshot of our flagship project (e.g. Black Gold Fertilizer) displayed inside a neutral grey border frame (`#E4E7EC`).
    *   *Fallback*: If no real visual is approved, this area is completely omitted (no placeholder boxes or empty frames).
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
    *   **Open Icon-Led Layout**: Replaces bulky card grids with an open layout. Features thin light grey dividers (`#E4E7EC`) between items. Includes Lucide icons to denote service concepts.
6.  **Platforms & Tools (Light Grey Background)**:
    *   Platform logo grid containing tool tiles.
7.  **Process (Light Background)**:
    *   Horizontal numbered sequence with clean borders.
8.  **About Section (Light Background)**:
    *   Spacious splitting block for agency vision and values.
9.  **Contact CTA (Dark Navy Background)**:
    *   Centered CTA text and "Discuss Your Project" button.

### C. Responsive Grid Stacking Rules (320px to 1440px)
*   **1440px (Desktop)**: 12-column grids, maximum width `1200px` (`max-w-7xl` with `px-8` side margins). Alternating screenshots (left/right split). Horizontal dividers for Services.
*   **1024px (Tablet Landscape)**: Grid columns contract to 2-columns for showcase items. Platform tool icons wrap to a 4-column layout.
*   **768px (Tablet Portrait)**: Homepage hero stacks vertically. Selected work switches to screenshot-top, text-bottom layout. Services grid stacks into a single column with horizontal dividers.
*   **430px (Large Mobile)**: Margins shrink to `px-5` (`20px`). Large fonts scale down dynamically (H1 to `2.25rem`, H2 to `1.75rem`).
*   **375px (Medium Mobile)**: Logo walls scale to 2-columns. Inline buttons stack vertically to fit viewport width.
*   **320px (Small Mobile)**: Padding reduced to `px-4` (`16px`). Text size capped to prevent clipping or horizontal scrolling.

---

## 3. Data Architecture & Structured Models

We introduce strict type definitions for managing brand listings and platform tools.

### A. Brand Data Model (`src/data/brands.ts`)
```typescript
export interface Brand {
  id: string;
  name: string;
  category: 'ecommerce' | 'construction' | 'immigration' | 'technology' | 'healthcare';
  logo?: string;          // Optional path under public/brands/
  website?: string;
  projectUrl?: string;
  relationshipLabel?: string;
  assetSource?: string;   // Track origin details of screenshots/logos
  permissionNote?: string; // Track user approval context
  featured: boolean;
  publicApproved: boolean; // Visual display permission
  logoApproved: boolean;   // Logo rendering permission
  active: boolean;
  order: number;
}
```
*   *Mandatory Omission Rule*: If `publicApproved: false`, the brand is **completely omitted** from the website (never rendered in logo grids, lists, or text mentions).
*   *Fallback Wordmark*: If `publicApproved: true` but `logoApproved: false`, the entry will render as styled plain text (do not refer to this as a "wordmark").
*   *Security Rule*: Internal approval parameters (`publicApproved`, `logoApproved`, `assetSource`, `permissionNote`) must not be output to rendered HTML wrappers.

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

### Dynamic Case-Study Paths:
*   **Wajib Livestock Naming**: The rename of "Qurbani Campaign" to **"Wajib Livestock Qurbani Campaign"** remains **pending explicit user approval**.
*   **Old Route Redirection**: If approved in the future, we will utilize Astro's native redirection feature in `astro.config.mjs` instead of custom redirect page components.
    ```javascript
    // astro.config.mjs (future configuration if approved)
    export default defineConfig({
      redirects: {
        '/work/qurbani-campaign': '/work/wajib-livestock-qurbani-campaign'
      }
    });
    ```
*   *Security Rule*: All redirects will resolve dynamically or use relative paths. **Never hardcode `/startsdigital`** in redirect configurations.

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

### Brand Registry & Details (12 projects)
Under the section title **"Brands & Projects We Have Worked With"**:
1.  **Black Gold Fertilizer** (E-commerce and consumer)
    *   *Source / Approval*: User supplies file / explicitly approves.
    *   *Visuals*: Logo & desktop layout view.
2.  **Viral Naturals** (E-commerce and consumer)
    *   *Source / Approval*: User supplies.
3.  **Shopinq Online** (E-commerce and consumer)
    *   *Source / Approval*: User supplies.
4.  **Super Safety Covers** (E-commerce and consumer)
    *   *Source / Approval*: User supplies.
5.  **Wajib Livestock** (E-commerce and consumer)
    *   *Source / Approval*: Naming and asset approval pending.
6.  **RK Reno Solutions** (Construction and local services)
    *   *Source / Approval*: User supplies.
7.  **Riyadh Finish Pro** (Construction and local services)
    *   *Source / Approval*: User supplies.
8.  **Clearzone Immigration** (Immigration and international services)
    *   *Source / Approval*: User supplies.
9.  **Europa Immigration** (Immigration and international services)
    *   *Source / Approval*: User supplies.
10. **Quick Immigration Service** (Immigration and international services)
    *   *Source / Approval*: User supplies.
11. **Convort AI** (Technology and AI)
    *   *Source / Approval*: User supplies.
12. **Unique Lahore Lab Sahiwal** (Healthcare)
    *   *Source / Approval*: User supplies.

---

## 7. Asset Implementation Gate System

To guarantee the site remains professional and layout-complete, the implementation is strictly divided into two distinct gates.

### Stage 1 Scope (Structure & Layout Foundations)
*   Deploy global light-first styling tokens (`global.css`, `BaseLayout.astro`).
*   Update core structural markup (Header, Footer, Homepage panels, Work lists).
*   Create data models `src/data/brands.ts` and `src/data/platforms.ts`.
*   Support layout files and schema fields in `content.config.ts`.
*   **No partial text-only redesign deployment to production.** Global deployment of Stage 1 remains gated until Stage 2 assets are available to prevent rendering layout skeletons.

### Stage 2 Scope (Visual Assets & Public Release Gate)
Visual case studies and logo grids will only be rendered once the following specific **Public Release Gate** assets are available:
1.  **Approved Logos**: At least 6 approved brand logos in the logo registry.
2.  **Black Gold Fertilizer**: Approved logo file and one real desktop website view or campaign creative.
3.  **Wajib Livestock**: Approved project name, logo file, and one real campaign or livestock photograph.
4.  **RK Reno Solutions**: Approved logo file and one real website or social media visual asset.
5.  **Platforms & Tools**: Approved platform logos grid.

---

## 8. Reusable Component Inventory

*   `BrandLogoGrid.astro` *(New)*: Renders client logos inside light neutral tiles.
*   `PlatformLogoGrid.astro` *(New)*: Renders SVG platform icons under "Platforms & Tools We Work With".
*   `ProjectShowcase.astro` *(New)*: Renders alternating layout rows (screenshot and text splits).
*   `ProjectGallery.astro` *(New)*: Handles multi-screenshot grids inside case studies.
*   *Note*: Separate layout files will not be created if their code is utilized once.
*   *Logo Contrast Rules*: Client logo grids will use light neutral tiles (`#F9FAFB`) with consistent internal padding and original aspect ratios. Logo assets will not be white-converted without explicit approval.
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

### Files to Modify:
1. [BaseLayout.astro](../../../src/layouts/BaseLayout.astro) *(Redesign global backgrounds to light-first)*
2. [CaseStudyLayout.astro](../../../src/layouts/CaseStudyLayout.astro) *(Update columns, metric strips, and gallery slots)*
3. [index.astro](../../../src/pages/work/index.astro) *(Rebuild layout using logo walls and visual showcases)*
4. [src/pages/index.astro](../../../src/pages/index.astro) *(Rebuild Homepage using light-first section blocks and hero conditional screen)*
5. [src/content.config.ts](../../../src/content.config.ts) *(Extend schema with media fields)*
6. [Header.astro](../../../src/components/layout/Header.astro) *(Adjust header contrast to white background)*
7. [Footer.astro](../../../src/components/layout/Footer.astro) *(Refine text layouts for Deep Navy colors)*
8. [Results.astro](../../../src/components/sections/Results.astro) *(Update container padding and alignment)*
9. [Services.astro](../../../src/components/sections/Services.astro) *(Rebuild services using Lucide icons and open border layouts)*
10. [SelectedWork.astro](../../../src/components/sections/SelectedWork.astro) *(Update homepage panels to use project showcase layouts)*
11. [Process.astro](../../../src/components/sections/Process.astro) *(Clean sequence borders)*
12. [AboutPreview.astro](../../../src/components/sections/AboutPreview.astro) *(Adjust side grid spacings)*
13. [ContactCTA.astro](../../../src/components/sections/ContactCTA.astro) *(Refine margins)*
14. [global.css](../../../src/styles/global.css) *(Declare light-first global styles and design variables)*
