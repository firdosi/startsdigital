# Implementation Plan - Starts Digital Visual Portfolio Redesign

This document outlines the visual redesign plan for the Starts Digital portfolio, Work page, case studies, and selected homepage components. It shifts the website from a dark, text-heavy layout to a premium, light-first agency visual system incorporating real screenshots, platform icons, brand logs, and structured grids.

---

## 1. User Review & Approval Required

> [!IMPORTANT]
> The following items require explicit user approval or asset delivery before implementation begins:
> 1. **Case-Study Naming**: Recommendation to replace the generic naming **"Qurbani Campaign"** with either **"Wajib Livestock"** or **"Wajib Livestock Qurbani Campaign"**.
> 2. **Brand Logo Verification**: User must confirm and approve the list of 11 brands under *Brands & Projects We Have Worked With*. No logos or names will be published without explicit approval.
> 3. **Platform Logos**: Approval of tools grid (Meta, Google, WordPress, Shopify, Canva, GTM, etc.) and verification of no unofficial "Partner" badges.
> 4. **Visual Asset Checklist**: Delivery of screenshots, product photography, or campaign creatives following the parameters in Section 6.

---

## 2. Current Design Problems vs. Proposed Visual System

| Element | Current Design Problem | Redesigned Light-First Visual System |
| :--- | :--- | :--- |
| **Theme / Contrast** | dominated by black backgrounds; feels like a corporate business report; text-heavy and visually repetitive on mobile. | **Light-First Premium Look**: ~70% warm white/light grey backgrounds (`#F9FAFB`), ~30% dark sections (`#0B0F19`) for metrics, logo walls, and CTAs. |
| **Typography** | Repeated grey/white blocks with minimal contrast differences on dark layouts. | High-contrast charcoal/black text (`#111827`) on light blocks; dynamic font scale hierarchy; brand teal (`#0D9488`) used sparingly for labels. |
| **Project Previews** | Text-only layout lists in Selected Work with em-dash bullet lists. | Alternating layout grids combining the brand logo, a descriptive text pane, verified metrics, and real browser/device screenshots. |
| **Tool Lists** | Simple comma-separated lists of tools and services. | Highly recognizable SVG icon grids for services and platform logos, maximizing visual trust. |

---

## 3. Page-by-Page Wireframe Descriptions

### A. Redesigned Work Page (`/work/`)
1. **Visual Hero (Light Background)**:
   - *Left*: Large title ("Client Success & Case Studies") and a value-focused sub-heading.
   - *Right*: A collaged layout preview showing a stacked preview of featured client layouts (overlapping, tilted border cards).
2. **Brand Logo Wall (Dark Navy background)**:
   - A grid of transparent client brand logos under the title: *"Projects & Brands We Have Worked With"*.
3. **Featured Case Studies (Alternating Layouts, Light Background)**:
   - *Case Study 01 (Left Image / Right Info)*:
     - Real desktop website or campaign screenshot on the left (rounded corners, shadow-md).
     - Right column: Brand logo, industry tag, description, services checklist with teal bullets, verified outcomes, and a bold button "Read Case Study →".
   - *Case Study 02 (Right Image / Left Info)*:
     - Reversed layout for visual rhythm.
4. **Platform & Tool Grid (Light Grey Background)**:
   - Title: *"Platforms & Tools We Work With"*.
   - A grid showing official SVGs of Meta Ads, Google Ads, Shopify, WooCommerce, WordPress, and GTM.
5. **Additional Experience Section (Light Background)**:
   - Non-linked projects (RK Reno Solutions, Immigration Projects) displayed as card grids with industry banners, description, and list of rendered services.
6. **Final Contact CTA (Dark Navy Background)**:
   - High-contrast banner linking to the homepage contact form.

### B. Visual Case-Study Layout (`CaseStudyLayout.astro`)
1. **Header (Light Background)**:
   - Breadcrumbs navigation trail (`Home > Work > Client`).
   - Client brand logo and project title.
2. **Dynamic Hero Screen (Light Background)**:
   - Large browser screenshot or dynamic ad visual matching the client's campaign.
3. **Outcome Strip (Dark Navy Background)**:
   - Visually dominant metric figures (e.g. `PKR 30M+`) styled in large blue numbers, paired with service icons.
4. **Details Split Grid (Light Background)**:
   - *Left Sidebar*: Industry description, links to homepage services, and platforms applied.
   - *Right Column*: Standard responsibilities list (em-dash bullets), followed by a dynamic text slot.
5. **Campaign Gallery / Creative Showcases (Light Grey Background - Conditional)**:
   - 2-column screenshot showcases displaying website views or social ad layouts.
6. **Related Work Strip (Light Background)**:
   - Previews of other case studies.
7. **Contact CTA (Dark Navy Background)**.

### C. Homepage Selected Work Section
- Replaces the current text rows with visual cards:
  - Each card shows a thumbnail screenshot of the project, the brand logo, a verified metrics label, and a CTA link to the case study.

---

## 4. Reusable Component Architecture

We propose introducing these modular components:
1. **`BrandLogoGrid.astro`**: Renders client logos in a responsive grid.
2. **`PlatformLogoGrid.astro`**: Renders SVG platform badges (Meta, Shopify, etc.).
3. **`ProjectShowcase.astro`**: Handles the alternating layout showing project screens, text, and outcomes.
4. **`ServiceIconList.astro`**: Renders service lists accompanied by clean Lucide icons.
5. **`ProjectGallery.astro`**: Dynamic, responsive layout to output screenshot grids.

---

## 5. Asset Directory & Standards

A strict, maintainable assets structure is planned:
```text
public/
  brands/       <-- Transparent SVG or clean PNG client logos
  platforms/    <-- Official tool logos (Meta, Google, WordPress, etc.)
  projects/     <-- Client screenshots and creative folders
    black-gold-fertilizer/
    wajib-livestock/
    rk-reno-solutions/
    viral-naturals/
    convort-ai/
    immigration/
```

### Image Specifications Table:
| Asset Type | Dimension (px) | Ratio | Max Size | Format | Alt Requirements |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Screenshots** | 1200 x 630 | 1.91:1 | 150 KB | WebP / AVIF | Detailed content description |
| **Mobile Screenshots** | 375 x 812 | 9:16 (vertical)| 80 KB | WebP / AVIF | Device layout details |
| **Brand Logos** | 240 x 80 | Flexible | 10 KB | SVG / PNG | `"Client Name Logo"` |
| **Platform Badges** | 48 x 48 | 1:1 | 5 KB | SVG | `"Tool Name Icon"` |
| **Creative Assets** | 800 x 800 | 1:1 | 100 KB | WebP | Description of ad copy/layout |

---

## 6. Visual Asset Checklist for User

Please supply these visual assets or confirm approval to prepare mockups for these projects:

### 1. Black Gold Fertilizer
- [ ] Brand Logo (Transparent SVG or PNG)
- [ ] Desktop Homepage Screenshot
- [ ] Mobile Website View Screenshot
- [ ] 2 to 3 Meta ad creative images

### 2. Wajib Livestock (Qurbani Campaign)
- [ ] Brand Logo (Transparent SVG or PNG)
- [ ] 2 to 3 campaign creatives or banner assets
- [ ] Product photography or livestock presentation visuals

### 3. RK Reno Solutions
- [ ] Brand Logo (Transparent SVG or PNG)
- [ ] Desktop Homepage Screenshot

### 4. Viral Naturals
- [ ] Brand Logo (Transparent SVG or PNG)
- [ ] Desktop/Mobile Website Screenshot

### 5. Convort AI
- [ ] Brand Logo (Transparent SVG or PNG)
- [ ] Software UI panel layout screenshot

### 6. Clearzone or Europa Immigration
- [ ] Brand Logo (Transparent SVG or PNG)

---

## 7. Accessibility & SEO Guidelines

- **Image Alt Texts**: Every image tag will include descriptive `alt` attributes detailing layout details.
- **Performance**: Use `loading="lazy"` on all assets below the fold. Primary hero visuals will utilize `loading="eager"` and `fetchpriority="high"`.
- **Layout Shift Prevention**: Set explicit `width` and `height` properties on all image components to prevent CLS.
- **Logo Contrast**: Logos will have transparent backgrounds matching both light/dark wrappers.
- **Focus States**: Clear focus borders (`focus-visible:ring-2 focus-visible:ring-brand-blue`) will remain on all links and visual cards.

---

## 8. Proposed Code Changes

The redesign proposes modifications to these files:

### Files to Create:
1. `src/components/ui/BrandLogoGrid.astro` *(Renders client logos)*
2. `src/components/ui/PlatformLogoGrid.astro` *(Renders tool logos)*
3. `src/components/ui/ProjectShowcase.astro` *(Featured list visual row)*
4. `src/components/ui/ProjectGallery.astro` *(Case study image gallery)*

### Files to Modify:
1. [BaseLayout.astro](../../../src/layouts/BaseLayout.astro) *(Ensure light-first global styles are compatible)*
2. [CaseStudyLayout.astro](../../../src/layouts/CaseStudyLayout.astro) *(Integrate visual assets and outcome strips)*
3. [index.astro](../../../src/pages/work/index.astro) *(Add logo walls, hero image layouts, and grid structures)*
4. [SelectedWork.astro](../../../src/components/sections/SelectedWork.astro) *(Convert homepage list to visual panels)*
5. [Services.astro](../../../src/components/sections/Services.astro) *(Integrate Lucide icons next to items)*
