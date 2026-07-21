# Private Asset Drop & Intake Guide

This guide documents the local asset intake protocol for Starts Digital.

---

## 1. Safety & Security Rules

- **Local Storage Only**: All original client design files, unredacted campaign screenshots, client branding packages, and ad account screenshots must remain in user-controlled local storage (`private-assets/`) or private cloud storage.
- **Never Commit Credentials**: GitHub must never contain unredacted sales evidence, customer phone numbers, email lists, ad-account IDs, or private URLs.
- **Redaction & Optimization**: Only approved, redacted, compressed, and optimized WebP/SVG production assets will be copied into `public/`.

---

## 2. Drop Directory Structure (`private-assets/`)

Drop files into the respective ignored local folders:

```
private-assets/
├── client-logos/            <-- Drop original client brand vector/PNG logos
├── black-gold-fertilizer/   <-- Drop Black Gold Fertilizer ad creatives & screenshots
├── wajib-livestock/         <-- Drop Qurbani campaign video stills, photos & ad creatives
├── rk-reno-solutions/       <-- Drop renovation project photos & website screenshots
├── other-brands/            <-- Drop secondary client brand assets
├── founder/                 <-- Drop high-resolution founder professional portrait
└── platform-originals/      <-- Drop official SVG brand assets from platform resource portals
```

---

## 3. Required Intake Assets & Specifications

### A. Black Gold Fertilizer
- **Required**: Transparent vector SVG or high-res PNG logo.
- **Required**: At least 1 real campaign creative, website screenshot, or product campaign visual.
- **Optional**: Secondary product photo or ad creative pack.

### B. Wajib Livestock (Qurbani Campaign)
- **Required**: Transparent vector SVG or high-res PNG logo.
- **Required**: At least 1 real livestock photo, Qurbani campaign ad creative, or video still.
- **Required**: Written confirmation of public case-study display name (e.g. `Qurbani Campaign` vs `Wajib Livestock Qurbani Campaign`).

### C. RK Reno Solutions
- **Required**: Transparent vector SVG or high-res PNG logo.
- **Required**: Real website screenshot targeting renovation/air-conditioning services in KL & Selangor.
- **Optional**: Real renovation project photo.

### D. Other Brands (Experience Grid)
- **Required**: Original vector/PNG logo.
- **Required**: Written public display permission (`publicApproved: true`).
- **Required**: Approved public brand name string.

### E. Founder Section
- **Required**: High-resolution professional portrait photo.
- **Required**: Approved founder full name.
- **Required**: Approved founder title/role.
- **Required**: Approved short biography paragraph.

### F. Technology Platforms
- **Required**: Vector SVG asset downloaded directly from official platform brand guidelines portals (e.g. Meta Ads, Google Ads, WordPress, Shopify, WooCommerce).
- **Constraint**: No unofficial or manually re-created platform logos.

---

## 4. Processing Pipeline: Private to Public

1. **Drop**: User drops raw source asset into `private-assets/<category>/`.
2. **Review & Redact**: Inspect asset for sensitive client data (phone numbers, account IDs, internal names) and redact if necessary.
3. **Format & Optimize**: Convert images to WebP (`80-85%` quality, max width `1440px`) or sanitize SVG icons.
4. **Copy to Public**: Copy optimized file into `public/<category>/`.
5. **Update Manifest**: Record status in [production-asset-manifest.md](./production-asset-manifest.md).
