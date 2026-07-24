# Starts Digital — Corrected Baseline Audit Report (Phase 0)

> **AUDIT STATUS**: Phase 0 Baseline Audit Report (Evidence Branch Verified & Pushed)  
> **Repository**: `https://github.com/firdosi/startsdigital`  
> **Evidence Branch**: `audit-phase-0-evidence`  
> **Raw GitHub Evidence Base**: `https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/`

---

## 1. Evidence Branch & Verification Status

* **Evidence Branch**: `audit-phase-0-evidence`
* **Direct Branch URL**: `https://github.com/firdosi/startsdigital/tree/audit-phase-0-evidence`
* **Direct Evidence Folder**: `https://github.com/firdosi/startsdigital/tree/audit-phase-0-evidence/audit-evidence/phase-0`
* **Commit Message**: `docs: add Phase 0 audit evidence files under audit-evidence/phase-0/`
* **Total Files Committed**: 48 files
* **`main` Branch Status**: Untouched, 100% clean working tree.

---

## 2. Evidence Manifest Summary

Full file-by-file manifest available at:  
[EVIDENCE_MANIFEST.md](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/EVIDENCE_MANIFEST.md)

---

## 3. Readiness Dashboard

The current website state is described as an **Early Foundation**.

| Operational Category | Current State | Evidence Reference | Blocking Gaps | Confidence Level |
| :--- | :--- | :--- | :--- | :--- |
| **Technical Foundation** | **Solid** | Astro build clean, site.config.mjs single source of truth | Domain acquisition & custom URL migration | **High** |
| **Visual Quality** | **Developing** | Dark navy design system, clear typography | White Black Gold logo contrast (`DEF-01`), section label sizing (`DEF-07`) | **High** |
| **Motion Quality** | **Developing** | Safe CSS grid accordions fixed | Observer `rootMargin` late reveal (`DEF-08`), hover matrix transform conflict (`DEF-09`) | **High** |
| **Responsive Quality** | **Developing** | Responsive across 390px, 768px, 1440px | Contact section vertical stack length on 390px mobile (`DEF-16`) | **High** |
| **Content Depth** | **Early Foundation** | Core landing page copy complete | Lacks deep industry narrative and client storytelling | **Medium** |
| **Service Architecture** | **Incomplete** | `/services/` single-page summary | 6 dedicated individual service sub-pages missing (`DEF-03`) | **High** |
| **Portfolio Depth** | **Incomplete** | 3 featured case studies built | 10 brands relegated to link tiles (`DEF-04`); ConvortAI needs case study (`DEF-10`) | **High** |
| **Team Credibility** | **Missing** | Zero team members/photos on site | Awaiting genuine team roster specs and photographs (Phase 7) | **High** |
| **SEO Content Depth** | **Early Foundation** | Basic Open Graph & meta tags | Lacks industry landing pages, resource hub, and blog | **High** |
| **Conversion Readiness** | **Developing** | 9-field brief form with live validation | Event tracking and analytics integration pending (Phase 9) | **High** |

**Overall State Assessment**: **Early Foundation** (Not launch ready).

---

## 4. Corrected Roadmap Phase Mapping

| Roadmap Phase | Target Scope | Items Assigned |
| :--- | :--- | :--- |
| **Phase 0** | Baseline Audit | Complete evidence capture, motion inventory, readiness dashboard, defect register |
| **Phase 1** | Immediate Defect Repair | Invisible Black Gold logo (`DEF-01`), unsupported company claims (`DEF-06`), About Operator image misuse (`DEF-05`), section label sizing (`DEF-07`) |
| **Phase 2** | Design System & Typography | Logo optical sizing system (`DEF-11`), badge standardization (`DEF-12`), button & card token system, shadow/border tokens |
| **Phase 3** | Motion & Interaction System | Scroll observer `rootMargin` optimization (`DEF-08`), entrance animation stagger, hover-transform separation (`DEF-09`), hydration reload flash fix (`DEF-15`) |
| **Phase 4** | Homepage Hierarchy & Narrative | Homepage section order, content hierarchy, team preview layout planning, brand presentation |
| **Phase 5** | Dedicated Service Pages | Build 6 individual service pages (`/services/paid-advertising/`, `/services/website-development/`, `/services/seo/`, `/services/creative-content/`, `/services/social-media-marketing/`, `/services/ai-marketing-systems/`) |
| **Phase 6** | Portfolio Expansion | Fair portfolio architecture across all 13 brands, expanded brand media, mini case studies, dedicated ConvortAI Technology Partner case study (`DEF-10`) |
| **Phase 7** | Genuine Team & About Page | Genuine founder info, approved team member bios & photos, About page company history |

---

## 5. Corrected Defect Register & Component Paths

| ID | Severity | Category | Current File Path | Description | Recommended Fix | Assigned Phase |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **DEF-01** | **P0** | Visual | `src/components/landing/Showcase.astro` & `src/components/landing/BrandMarquee.astro` | White Black Gold logo artwork rendered inside white container (`bg-white`). | Change logo container background to dark navy `#061d33`. | **Phase 1** |
| **DEF-02** | **P1** | Credibility | `src/components/landing/AboutOperator.astro` & `src/pages/about.astro` | Zero team members, founders, or personnel shown anywhere on website. | Collect team specifications and build genuine team grid. | **Phase 7** |
| **DEF-03** | **P1** | Architecture | `src/pages/services.astro` | Services page is a single-page summary; individual service pages missing. | Build 6 dedicated service sub-pages (`PROPOSED COMPONENT: src/pages/services/[slug].astro`). | **Phase 5** |
| **DEF-04** | **P1** | Brand Equity | `src/components/landing/Showcase.astro` | Portfolio imbalance: 3 brands dominate featured space while 10 receive link tiles. | Redesign portfolio layout with fair category/industry groupings. | **Phase 6** |
| **DEF-05** | **P1** | Content | `src/components/landing/AboutOperator.astro` | Reuses Black Gold fertilizer product packaging image (`black-gold-official.png`). | Replace with genuine agency workflow screenshot, founder portrait, or creative collage. | **Phase 1** |
| **DEF-06** | **P1** | Content | `src/components/landing/AboutOperator.astro` | Claims "zero outsourced middleman layers" and "no junior sales reps". | Tone down claims to focus on direct communication and structured brief delivery. | **Phase 1** |
| **DEF-07** | **P1** | Visual | `src/components/common/SectionHeader.astro` | Orange section identifier labels (`text-xs font-mono`) render at ~12px font size. | Standardise section labels to `text-xs sm:text-sm font-semibold tracking-wider`. | **Phase 1** |
| **DEF-08** | **P2** | Motion | `src/components/common/MotionController.astro` | Observer uses `rootMargin: 0px 0px -15% 0px` and `threshold: 0.2`. | Adjust observer `rootMargin` to `-5%` and `threshold` to `0.1`. | **Phase 3** |
| **DEF-09** | **P2** | Motion | `src/components/landing/Features.astro` & `Showcase.astro` | CSS reveal transform (`translateY(24px)`) conflicts with hover transform. | Wrap reveal on parent container and isolate hover transform to inner div. | **Phase 3** |
| **DEF-10** | **P1** | Brand Equity | `src/pages/work.astro` | ConvortAI is verified Technology Partner but lacks a full case study layout. | Build dedicated ConvortAI case study page (`PROPOSED PAGE: src/pages/work/convort-ai.astro`). | **Phase 6** |
| **DEF-11** | **P2** | Visual | `src/components/landing/BrandMarquee.astro` | Logos displayed in fixed grid boxes without optical sizing normalization. | Apply per-logo max-height and optical padding rules. | **Phase 2** |
| **DEF-12** | **P2** | Visual | `src/components/common/SectionHeader.astro` | Mix of plain text section labels and rounded pill badges creates visual inconsistency. | Establish strict Design Tokens for Badges. | **Phase 2** |
| **DEF-13** | **P2** | Content | `src/components/landing/AboutOperator.astro` | Unattributed quotation: *"We take personal responsibility for performance..."*. | Add explicit speaker attribution or convert to body prose. | **Phase 1** |
| **DEF-14** | **P2** | Visual | `src/components/landing/Showcase.astro` | Featured case cards have varying vertical heights across viewports. | Standardise card inner padding, flex alignment, and media box aspect ratios. | **Phase 2** |
| **DEF-15** | **P2** | Motion | `src/components/landing/Hero.astro` | Fast reloads can cause 1-frame opacity flash before observer attaches. | Inline opacity fallbacks or set hero section to render fully visible by default. | **Phase 3** |
| **DEF-16** | **P2** | Responsive | `src/pages/contact.astro` | Contact cards & expectation box create long vertical scroll stack on 390px. | Optimise vertical padding and gap utilities for mobile viewports. | **Phase 2** |
| **DEF-17** | **P2** | SEO | `src/components/common/Footer.astro` | Footer navigation links do not include secondary service or industry landing pages. | Expand footer column architecture. | **Phase 8** |

---

## 6. Motion Inventory Reference

Full item-by-item motion inventory available at:  
[FULL_MOTION_INVENTORY.md](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/reports/FULL_MOTION_INVENTORY.md)

---

## 7. Motion Recording Index with Timestamps

1. [01_homepage_desktop_normal_scroll.webm](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/recordings/01_homepage_desktop_normal_scroll.webm) — (00:01 Hero status badge, 00:02 Metric cards, 00:03 Brand marquee, 00:04 Showcase cards)
2. [02_homepage_desktop_fast_scroll.webm](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/recordings/02_homepage_desktop_fast_scroll.webm) — (00:01 Late reveal on fast scroll, `DEF-08`)
3. [03_homepage_mobile_normal_scroll.webm](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/recordings/03_homepage_mobile_normal_scroll.webm) — (00:02 Mobile vertical stack & section label sizing, `DEF-07`)
4. [04_homepage_scroll_down_and_up.webm](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/recordings/04_homepage_scroll_down_and_up.webm) — (00:03 Revealing elements on scroll up)
5. [05_homepage_hard_reload.webm](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/recordings/05_homepage_hard_reload.webm) — (00:01 Hero 1-frame hydration flash, `DEF-15`)
6. [06_services_page_scroll.webm](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/recordings/06_services_page_scroll.webm) — (00:01 Services overview, missing sub-pages, `DEF-03`)
7. [07_work_page_scroll.webm](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/recordings/07_work_page_scroll.webm) — (00:02 Portfolio grid & white logo contrast, `DEF-01`, `DEF-04`)
8. [08_about_page_scroll.webm](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/recordings/08_about_page_scroll.webm) — (00:01 Company story & missing team info, `DEF-02`, `DEF-05`)
9. [09_black_gold_case_scroll.webm](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/recordings/09_black_gold_case_scroll.webm) — (00:01 Case study layout & logo contrast, `DEF-01`)
10. [10_working_method_accordion.webm](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/recordings/10_working_method_accordion.webm) — (00:01 Safe CSS grid accordion expand/collapse)
11. [11_faq_accordion_interaction.webm](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/recordings/11_faq_accordion_interaction.webm) — (00:01 FAQ accordion expand/collapse)
12. [12_mobile_nav_toggle.webm](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/recordings/12_mobile_nav_toggle.webm) — (00:01 Mobile drawer menu open/close)
13. [13_reduced_motion_test.webm](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/recordings/13_reduced_motion_test.webm) — (00:01 `prefers-reduced-motion` compliance)
14. [14_browser_back_forward_test.webm](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/recordings/14_browser_back_forward_test.webm) — (00:02 Navigation history state persistence)
15. [15_card_hover_after_reveal.webm](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/recordings/15_card_hover_after_reveal.webm) — (00:02 Card hover matrix transform jitter mid-reveal, `DEF-09`)

---

## 8. Screenshot Index & All 8 Contact Sheets

### Screenshot Index (Direct GitHub URLs)
* **Homepage**: [390px natural](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/screenshots/homepage_390_natural.png) | [390px settled](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/screenshots/homepage_390_settled.png) | [768px settled](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/screenshots/homepage_768_settled.png) | [1440px natural](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/screenshots/homepage_1440_natural.png) | [1440px settled](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/screenshots/homepage_1440_settled.png)
* **Services**: [390px settled](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/screenshots/services_390_settled.png) | [768px settled](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/screenshots/services_768_settled.png) | [1440px settled](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/screenshots/services_1440_settled.png)
* **Work**: [390px settled](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/screenshots/work_390_settled.png) | [768px settled](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/screenshots/work_768_settled.png) | [1440px settled](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/screenshots/work_1440_settled.png)
* **About**: [390px settled](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/screenshots/about_390_settled.png) | [1440px settled](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/screenshots/about_1440_settled.png)
* **Contact**: [390px settled](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/screenshots/contact_390_settled.png) | [1440px settled](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/screenshots/contact_1440_settled.png)
* **Interactive States**: [Mobile menu open](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/screenshots/mobile_menu_open.png) | [Validation error](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/screenshots/contact_validation_error.png) | [Service preselected](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/screenshots/contact_service_preselected.png) | [Source context](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/screenshots/contact_source_context.png) | [Method stage 1](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/screenshots/working_method_stage1.png) | [Method stage 2](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/screenshots/working_method_stage2.png) | [FAQ open](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/screenshots/faq_open.png) | [Footer mobile](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/screenshots/footer_mobile.png)

### All 8 Contact Sheets (Direct GitHub URLs)
* **Contact Sheet A (Homepage Complete Sections)**: [contact_sheet_A_homepage_sections.png](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/contact-sheets/contact_sheet_A_homepage_sections.png)
* **Contact Sheet B (All-Pages Desktop Sheet)**: [contact_sheet_B_desktop_pages.png](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/contact-sheets/contact_sheet_B_desktop_pages.png)
* **Contact Sheet C (All-Pages Mobile Sheet)**: [contact_sheet_C_mobile_pages.png](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/contact-sheets/contact_sheet_C_mobile_pages.png)
* **Contact Sheet D (13 Brand Logos in Real Containers)**: [contact_sheet_D_13_brand_logos.png](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/contact-sheets/contact_sheet_D_13_brand_logos.png)
* **Contact Sheet E (Featured Project Cards Side-by-Side)**: [contact_sheet_E_featured_project_cards.png](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/contact-sheets/contact_sheet_E_featured_project_cards.png)
* **Contact Sheet F (Orange Section Labels Side-by-Side)**: [contact_sheet_F_orange_section_labels.png](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/contact-sheets/contact_sheet_F_orange_section_labels.png)
* **Contact Sheet G (Major Button Styles Side-by-Side)**: [contact_sheet_G_button_styles.png](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/contact-sheets/contact_sheet_G_button_styles.png)
* **Contact Sheet H (Major Card Styles Side-by-Side)**: [contact_sheet_H_card_styles.png](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-0-evidence/audit-evidence/phase-0/contact-sheets/contact_sheet_H_card_styles.png)

---

## 9. Corrected Brand Coverage Matrix (Using Strictly Verified Facts)

ConvortAI is kept distinct as the verified **Technology Partner**. All unverified metrics, fake leads, sales numbers, and search ranking claims for non-approved brands have been removed.

| Brand Name | Verified Approved Role & Services | Approved Result Evidence Available | Available Media Assets | Services Demonstrated | Potential Future Use |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Black Gold Fertilizer** | E-Commerce Growth & Performance Marketing | PKR 30M+ delivered orders, 29,000+ sales over 24 months | WebP Logo, Product Packaging Render (`black-gold-official.png`) | Performance marketing, Meta Ads, web shop | Featured Case Study #1 (Fix dark container logo contrast) |
| **Wajib Livestock** | Seasonal Campaign Strategy & Media Buying | 150+ animals sold, PKR 4.2M+ sales during Eid Qurbani | WebP Logo, Campaign Banner Visuals | Social media ads, seasonal campaign strategy | Featured Case Study #2 |
| **RK Reno Solutions** | Web Architecture & Local Search Foundation | Renovations & AC service digital presence in KL & Selangor | WebP Logo, Website Screenshot (`screenshot.png`/`webp`) | Web design, local SEO foundation | Featured Case Study #3 |
| **ConvortAI** | Technology Partner & Growth Partner | Web application engineering, AI lead conversion product development | WebP Logo, Tech Partner Badge | Web app engineering, AI automation, product growth | **Technology Partner (Dedicated Case Study - Phase 6)** |
| **Right Link Advisors** | Immigration & Visa Consultancy Services | Verified client engagement | WebP Logo | Paid advertising, lead generation strategy | Category Featured Card (Immigration Sector) |
| **Rapidline Immigration** | Immigration Services | Verified client engagement | WebP Logo | Performance marketing, social media strategy | Category Featured Card (Immigration Sector) |
| **Rapidzone** | Business Formation & Consultancy | Verified client engagement | WebP Logo | Media buying, digital presence | Category Featured Card (Business Services) |
| **Viral Naturals** | E-Commerce Retail | Verified client engagement | WebP Logo | Social media marketing, brand collateral | Category Featured Card (E-Commerce Sector) |
| **Clearzone Immigration** | Immigration Consultancy | Verified client engagement | WebP Logo | Search campaign management, lead capture | Category Featured Card (Immigration Sector) |
| **Riyadh Finish Pro** | Construction & Renovation Services | Verified client engagement | WebP Logo | Local service advertising | Category Featured Card (Construction Sector) |
| **Shopinq Online** | E-Commerce Platform | Verified client engagement | WebP Logo | Social media marketing, catalog ads | Logo Wall + Mini Case Study |
| **Super Safety Covers** | Safety Products E-Commerce | Verified client engagement | WebP Logo | Direct-to-consumer ad campaigns | Logo Wall + Mini Case Study |
| **Unique Lahore Lab** | Diagnostic Healthcare Services | Verified client engagement | WebP Logo | Local healthcare awareness campaign | Logo Wall + Mini Case Study |

---

## 10. Team Information Collection Sheet (Phase 7 Requirement)

Before Phase 7 implementation, approved specifications must be provided using this collection sheet:

```markdown
1. Full Name: [Approved Public Name]
2. Official Role / Title: [e.g. Founder & Technical Lead / Performance Marketer]
3. Employment / Collaboration Relationship: [Core Team / Specialist Partner]
4. Core Responsibilities: [e.g. Web Architecture, Meta Media Buying, Creative Design]
5. Short Biography: [2-3 sentences highlighting experience]
6. Genuine High-Res Photograph: [Attach min 600x600px PNG/JPG portrait]
7. Photo Publication Approval: [YES / NO]
8. Homepage Preview Visibility: [YES / NO]
9. About-Page Visibility: [YES / NO]
10. Professional Link (LinkedIn/GitHub): [URL or None]
11. Sort Order Priority: [1, 2, 3...]
```

#### Adaptable Layout Options Based on Actual Roster Size
* **1 Person**: Centered Founder/Operator profile card with direct contact CTA.
* **2 People**: Balanced 2-column executive bio grid.
* **3–4 People**: 3 or 4-card horizontal operator grid with role badges.
* **5–8 People**: 4-column team gallery with expandable modal bios.
* **More than 8 People**: Leadership showcase + categorized team directory.

---

## 11. Confirmed P0 & P1 Issue Summaries

### Confirmed P0 Issue (1)
* **DEF-01**: White Black Gold logo artwork rendered inside `bg-white` containers (`Showcase.astro` line 64, `BrandMarquee.astro` line 30). Logo becomes completely invisible on white backgrounds.

### Confirmed P1 Issues (7)
1. **DEF-02**: Zero team members, founders, or personnel shown anywhere on website (Severe credibility gap).
2. **DEF-03**: `/services/` is a single-page summary; 6 dedicated individual service sub-pages are missing.
3. **DEF-04**: Portfolio imbalance where 3 brands dominate all featured space while 10 receive link tiles.
4. **DEF-05**: Reuses Black Gold productpackaging image (`black-gold-official.png`) inside general agency credibility card (`AboutOperator.astro`).
5. **DEF-06**: Unsupported corporate claims ("zero outsourced middleman layers", "no junior sales reps").
6. **DEF-07**: Orange section identifier labels (`text-xs font-mono`) render at ~12px font size.
7. **DEF-10**: ConvortAI is verified Technology Partner but lacks a full case study layout.

### Unconfirmed Issues Requiring Further Observation (2)
1. **Scroll Observer Trigger Margin**: `rootMargin: 0px 0px -15% 0px` causes late reveal on fast scrolling. Test environment confirms `rootMargin: -5%` resolves late pop-in; requires full cross-browser verification in Phase 3.
2. **1-Frame Hero Reload Hydration Flash**: Flash of un-hydrated hero text observed during hard page reloads (`05_homepage_hard_reload.webm`). Requires inline fallback CSS testing in Phase 3.

---

## 12. Recommended Phase 1 Repair Batches

* **Batch 1A: Visual Reliability & Logo Contrast (`DEF-01`, `DEF-05`, `DEF-07`)**
  * Update Black Gold logo container styling to `#061d33` dark fill across client grid & featured cards.
  * Replace `black-gold-official.png` on `AboutOperator.astro` with genuine agency workflow visual or founder portrait.
  * Increase section label font size to `text-xs sm:text-sm font-semibold tracking-wider`.
* **Batch 1B: Credibility Copy Cleanup (`DEF-06`, `DEF-13`)**
  * Remove unverified "zero outsourced / junior account manager" claims.
  * Attribute or convert standalone quotation in `AboutOperator.astro`.

---
*The audit report is complete. No website source code was modified, and main remains 100% clean.*
