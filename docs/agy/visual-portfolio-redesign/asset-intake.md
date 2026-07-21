# Visual Portfolio Redesign - Asset Intake Guidelines & Protocol

This document defines the asset intake rules, privacy protocols, and intake pipeline for Starts Digital.

---

## 1. Asset Storage & Privacy Rules

- **Original Source Assets**: Remain in user-controlled private local storage (`private-assets/`) or private cloud storage. Original assets must never be committed to public GitHub repositories.
- **Private Storage Reference**: The intake registry may record a private storage reference (e.g. `Private original storage reference: Not committed to repository`) without exposing credentials, private URLs, or account numbers.
- **Public Repository Rules**: Only approved, redacted, compressed, and optimized publication assets may be committed under `public/`.
- **Data Protection**: GitHub must never contain private customer data, ad-account identifiers, phone numbers, email lists, or unredacted sales evidence.

---

## 2. Intake Workflow & Related Guides

To submit, redact, optimize, and map production visual assets, consult these documents:

- [Private Asset Drop & Intake Guide](./private-asset-drop-guide.md) — Step-by-step instructions for placing raw original assets into local `private-assets/` drop subdirectories.
- [Production Asset Manifest & Intake Registry](./production-asset-manifest.md) — Master replacement manifest tracking source locations, approval status, public targets, and prototype removal criteria.

---

## 3. Asset Specifications by Category

### A. Client Logos & Brands
- **Source Format**: Original vector SVG or high-resolution PNG (`300+ DPI`).
- **Approval Rule**: Brands are set to `publicApproved: false` and `logoApproved: false` in `src/data/brands.ts` until explicit user confirmation is received. Unapproved brand logos or names will not render publicly.

### B. Project Showcase Visuals
- **Format**: High-resolution PNG or WebP screenshots (`1440px+` width).
- **Redaction Rule**: Customer phone numbers, ad account IDs, user email addresses, and unapproved internal names must be blurred or cropped before export.
- **Optimization Target**: Compressed WebP format (`80-85%` quality, max width `1440px`).

### C. Technology Platform Logos
- **Source**: Downloaded directly from the official brand asset portal of each respective platform (e.g. Meta Ads, Google Ads, WordPress, Shopify, WooCommerce).
- **Constraint**: Manually re-created or unofficial platform logos are strictly prohibited.
