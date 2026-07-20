# Implementation Plan - Portfolio & Case Study Foundation

This plan details the technical, content, and design approach for creating the Starts Digital case-study foundation, including the Work overview page and two initial case studies (Black Gold Fertilizer & Qurbani Campaign).

## 1. Planned Pages and Routes
The following public routes will be introduced:
- `/work/`: A premium portfolio page listing our strategic capabilities, sectors served, and summaries of verified client results.
- `/work/black-gold-fertilizer/`: Case study details for the Black Gold Fertilizer project.
- `/work/qurbani-campaign/`: Case study details for the Eid Qurbani livestock campaign.

---

## 2. Content Architecture
To manage portfolio content, we evaluate three options supported by Astro:

| Option | Pros | Cons |
| :--- | :--- | :--- |
| **Astro Content Collections** *(Recommended)* | - Strong schema validation (using Zod)<br>- Centralized markdown content<br>- Separatation of copy from code layout<br>- Out-of-the-box static generation with `getStaticPaths()` | - Small initial setup overhead (declaring `src/content/config.ts`) |
| **Typed TypeScript Data Files** | - Fast definition in TypeScript | - Lacks layout separation for rich textual content (needs manual parsing or raw HTML in properties) |
| **Individual Hard-coded Astro Pages** | - Quickest to build for exactly 2 pages | - High code duplication<br>- Difficult to maintain or scale in future phases |

### Recommendation: Astro Content Collections
We will implement the **Astro Content Collections** framework. This is the official Astro approach for managing markdown pages. It compiles collections into type-safe modules, validates metadata fields (such as titles, descriptions, metrics) at compile time via Zod, and easily generates optimized static HTML files inside the output directory structure (`dist/work/[slug]/index.html`), ensuring clean URLs on GitHub Pages.

---

## 3. Work Page Layout (`/work/`)
The portfolio index page ([work/index.astro](../../../src/pages/work/index.astro)) will be structured with a clean, high-contrast visual rhythm:
- **Hero & Intro**: A bold introduction reinforcing the brand promise: *AI-powered digital strategy, marketing campaigns, and technical execution built for commercial outcomes.*
- **Strategic Sector Listing**: Displays our experience across competitive sectors (Agriculture, E-commerce, Local Services, Education & Recruitment).
- **Client Project Rows**: A sequence of premium editorial project rows (no card grids or image placeholders). Each item shows:
  - Project Title & Industry
  - Prominent business metrics (e.g. *PKR 30M+ revenue*, *150+ animals sold*)
  - A short summary of our responsibilities
  - A text link: `Read Case Study &rarr;`
- **Final Call to Action**: Connects directly to the `#contact` CTA.

---

## 4. Case-Study Page Structure
All case studies will use a single layout template ([CaseStudyLayout.astro](../../../src/layouts/CaseStudyLayout.astro) or dynamic router `[slug].astro`) containing the following sections:

1.  **Project Header**: Big bold title, industry, and a high-impact outcome summary.
2.  **Metadata Strip**: Small details displaying:
    - Client Industry
    - Service Scope (e.g. *Meta ads, Strategy, Web development*)
    - Target Audience
3.  **Business Challenge**: Details the client's bottleneck before Starts Digital stepped in.
4.  **Responsibilities**: A clear list of what we owned.
5.  **Strategy**: The strategic planning phase (focusing on practical AI adoption and structured marketing funnels).
6.  **Execution & Channels**: Technical campaign setups, creative testing, and tools.
7.  **Key Results**: Large, visually dominant figures using approved phrasing (no invented ROAS/ad spend).
8.  **Campaign Visuals**: Reserved sections for actual client creative assets (using text descriptions or empty visual slots until the user uploads real images; no generic stock photos).
9.  **Lessons & Strategic Insights**: Editorial takeaways from the project.
10. **Related Services**: Links pointing back to services defined in `src/data/services.ts`.
11. **Contact CTA**: A centered block linking to `/work/#contact` or `/startsdigital/#contact` for inquiries.

### Verification Matrix for Page Sections
To preserve truthfulness, we map out what can be written immediately versus what requires user approval:

| Section | Status | Detail / Action Required |
| :--- | :--- | :--- |
| **1. Project Header** | Ready | Uses approved wording (PKR 30M+ revenue / 150+ animals sold). |
| **2. Metadata Strip** | Ready | Uses approved list of services. |
| **3. Business Challenge** | Draft | Drafted based on industry background. User to verify client-specific context. |
| **4. Responsibilities** | Ready | Confirmed from previous files. |
| **5. Strategy** | Draft | Drafted based on standard marketing frameworks. User to expand on operational details. |
| **6. Execution & Channels** | Draft | Drafted based on Meta ads and lead generation setup. |
| **7. Key Results** | Ready | Uses approved outcomes. |
| **8. Campaign Visuals** | *Pending* | **Requires user visual assets** (e.g. ad creatives, Shopify screenshots). |
| **9. Lessons & Insights** | Draft | General agency learnings. User to approve. |
| **10. Related Services** | Ready | Automatically mapped to existing services. |
| **11. Contact CTA** | Ready | Links to approved contact channels. |

---

## 5. Visual & Design Direction
The case study pages will extend the existing Starts Digital styling system:
- **Palette**: Use Warm White (`#F7F7F3`) for body columns to ensure editorial reading comfort, and Deep Navy (`#07111F`) or Near Black (`#0B0D10`) for the header and results strips.
- **Typography**: Editorial layout with large, high-contrast headings (`font-heading text-3xl md:text-5xl font-bold`) and readable body text (`font-body text-base md:text-lg leading-relaxed`).
- **No Bulky Cards**: Information is separated by thin horizontal dividers (`border-brand-grey/15`), em-dashes, and clean spacing grids.
- **Strict Visual Restraints**:
  - **No stock images** or generic graphics representing client dashboards.
  - **No fake browser windows** or fake desktop device mockups.
  - **No generic vector illustrations**.
  - Visual blocks are strictly reserved for actual client assets. If not provided, we will omit the image section entirely or use descriptive text notes.

---

## 6. SEO & Metadata Plan
Each page will have native SEO configurations passed to `SEO.astro`:
*   **Page Titles**:
    - Work Overview: `Client Success & Selected Case Studies | Starts Digital`
    - Black Gold Fertilizer: `Black Gold Fertilizer: E-Commerce Growth Case Study | Starts Digital`
    - Qurbani Campaign: `Eid Qurbani Campaign: Seasonal Lead Generation Case Study | Starts Digital`
*   **Meta Descriptions**: Unique, search-optimized descriptions containing the exact outcome figures (e.g. *Read how Starts Digital supported PKR 30M+ in revenue...*).
*   **Canonical URLs**: Points explicitly to the absolute URL on GitHub Pages:
    - `https://firdosi.github.io/startsdigital/work/`
    - `https://firdosi.github.io/startsdigital/work/black-gold-fertilizer/`
    - `https://firdosi.github.io/startsdigital/work/qurbani-campaign/`
*   **Open Graph (OG)**: Inherits title and description defaults, with page type configured as `article`.
*   **Breadcrumbs**: Standard breadcrumb trail: `Home > Work > [Project Name]` with active links.
*   **Breadcrumb Structured Data**: JSON-LD `BreadcrumbList` schema output.
*   **Case-Study Structured Data**: JSON-LD `Article` schema targeting the case studies:
    ```json
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "[Project Title] Case Study",
      "description": "[Project Meta Description]",
      "author": {
        "@type": "Organization",
        "name": "Starts Digital"
      }
    }
    ```
*   **Internal Linking**: Update the homepage `SelectedWork.astro` panels to link directly to `/work/black-gold-fertilizer/` and `/work/qurbani-campaign/`, and link back from case studies to `/work/`.
*   **Image Alt-Text Rules**: Descriptive text strictly focusing on the visual content of the asset (e.g., *"Meta ads manager dashboard showing verified PKR 4.2M sales value output"*).

---

## 7. Asset Checklist (Needed from User)
To elevate these case studies to a premium level, the user is requested to compile the following real-world evidence assets where possible.

### Black Gold Fertilizer
*   **Ad Creative Samples**: 1–2 image or video ad designs used in campaigns (identifying information can be blurred/cropped).
*   **E-commerce Screenshots**: Crop of Shopify/WooCommerce backend dashboard showing the order volume (29k+ sales) or revenue scale (confidential absolute account settings can be blurred).
*   **Product Visuals**: High-quality product packaging photos of the fertilizer.
*   **Workflow / Ad Accounts**: Screenshots of Meta Ads Manager showing the campaign structure.

### Qurbani Campaign
*   **Ad Creative Samples**: Paid social designs or videos showcasing livestock for Qurbani campaigns.
*   **WhatsApp Lead Chats**: Blurry/cropped screenshot of client inquiries coming in through WhatsApp (removing user names and phone numbers).
*   **Campaign Dashboard**: Crop of Meta Lead Generation campaign metrics showing lead forms submitted.

### Instructions on Confidentiality & Redaction
To protect client privacy:
- **Client Identifiers**: Crop out or apply a solid black overlay on email addresses, customer names, private phone numbers, pixel IDs, and ad account numbers.
- **Absolute Budgets**: If the client does not want to disclose absolute advertising spend, crop or blur the budget and cost-per-result columns, keeping only the relative growth percentages or total volume metrics.
- **Logo Usage**: Confirm that the client has granted permission to display their text logo or wordmark. If not, we will represent them using text headers only.

---

## 8. Accessibility & Responsiveness Plan
We will design pages to support standard accessibility protocols:
- **Heading Order**: Enforce strict `h1 -> h2 -> h3` semantic flow.
- **Keyboard Navigation**: All interactive elements (breadcrumbs, buttons, text links) must have visible focus rings (`focus-visible:ring-2 focus-visible:ring-brand-blue`).
- **Contrast**: Confirm that text colors on light backgrounds meet a minimum of 4.5:1 ratio, and dark text (`text-brand-muted-dark` or `#98A2B3`) has high contrast on dark backgrounds.
- **Responsive Breaks**: Test grid alignments at `320px`, `375px`, `430px`, `768px`, `1024px`, and `1440px`. Ensure images use explicit aspect ratios to avoid layout shifts.
