# Visual Redesign Asset Intake Registry

This document serves as the centralized asset intake and tracking checklist for the Starts Digital visual redesign. Implementation of Stage 2 case studies and logo grids is gated until the minimum release requirements are fulfilled with real, verified client assets.

---

## Minimum Release Gate Status

To prevent partial text-only layouts or broken image regions on production, the redesigned pages will only go public once the following asset threshold is met:
*   [ ] **At least 6 approved brand logos** received in transparent format.
    *   *Clarification*: Plain brand-name text fallbacks do not count toward this 6 approved-logo requirement. Only received, approved, and optimized real logos count.
    *   *Clarification*: Platform/tool logos do not count toward the 6 client-brand logos.
    *   *Clarification*: An approved brand without an approved logo may appear as normal text only in secondary experience listings. It must not:
        *   Appear in the logo wall
        *   Count toward the six-logo release gate
        *   Be styled to imitate a missing logo
*   [ ] **Black Gold Fertilizer**: Approved logo + 1 real desktop screenshot or ad visual.
*   [ ] **Wajib Livestock**: Approved brand naming + approved logo + 1 real campaign or livestock visual.
*   [ ] **RK Reno Solutions**: Approved logo + 1 real website screenshot.
*   [ ] **Platforms & Tools**: Approved official SVG assets for tools actually used.

---

## Original Asset Storage

- Original source assets remain in user-controlled private local or cloud storage.
- The registry may record a private storage reference without exposing credentials or private URLs.
- Only approved, redacted and optimized publication assets may be committed under public/.
- GitHub must never contain private customer data, ad-account identifiers, phone numbers, email lists or unredacted sales evidence.

*   **Private original storage reference**: Not committed to repository

---

## File-Size & Optimization Targets

Rather than rigid maximum constraints, the following are quality targets for assets. Larger files may be accepted when further compression visibly damages readability:
*   **Simple SVG platform icon**: target under 20 KB
*   **SVG brand logo**: target under 30 KB
*   **Transparent PNG or WebP logo**: target under 60 KB
*   **Project screenshot**: target under 200 KB
*   **Campaign creative**: target under 150 KB

*Note on Logo Dimensions*: Recommended display bounding box: 240 x 80 px, preserve original aspect ratio. Never stretch or crop brand logos to fill the box.

---

## Client Brand Registry (12 Records)

All publication and logo approvals remain pending until the user confirms them. Permission is never inferred from previous work history or online profiles.

### 1. Black Gold Fertilizer
*   **Brand name**: Black Gold Fertilizer
*   **Asset type**: Client Logo
*   **Required filename**: `logo.png` / `logo.svg`
*   **Source owner**: Black Gold Fertilizer
*   **Source URL**: N/A
*   **Original dimensions**: Variable
*   **Recommended display bounding box**: 240 x 80 px, preserve original aspect ratio
*   **Format**: Transparent SVG or clean WebP/PNG
*   **Alt text**: `Black Gold Fertilizer logo`
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/brands/black-gold-fertilizer/logo.png`
*   **Notes**: Contrast-adjusted for light neutral tiles. Never stretch or crop brand logos to fill the box.

*   **Brand name**: Black Gold Fertilizer
*   **Asset type**: E-commerce desktop screenshot
*   **Required filename**: `desktop-screenshot.webp`
*   **Source owner**: Black Gold Fertilizer
*   **Source URL**: N/A
*   **Original dimensions**: 1920 x 1080 px
*   **Recommended display bounding box**: 1200 x 630 px, preserve original aspect ratio
*   **Format**: WebP / AVIF
*   **Alt text**: `E-commerce online store layout for Black Gold Fertilizer`
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: N/A
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/projects/black-gold-fertilizer/desktop-screenshot.webp`
*   **Notes**: Straight flat screenshot frame only.

---

### 2. Wajib Livestock (Naming & Route Pending)
*   **Proposed Name**: `Wajib Livestock Qurbani Campaign`
*   **Route status**: Old Qurbani route `/work/qurbani-campaign/` and files remain unchanged pending approval.
*   **Brand name**: Wajib Livestock
*   **Asset type**: Client Logo
*   **Required filename**: `logo.png` / `logo.svg`
*   **Source owner**: Wajib Livestock
*   **Source URL**: N/A
*   **Original dimensions**: Variable
*   **Recommended display bounding box**: 240 x 80 px, preserve original aspect ratio
*   **Format**: Transparent SVG or clean WebP/PNG
*   **Alt text**: `Wajib Livestock logo`
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/brands/wajib-livestock/logo.png`
*   **Notes**: Name approval pending. Never stretch or crop brand logos to fill the box.

*   **Brand name**: Wajib Livestock
*   **Asset type**: Campaign creative photography
*   **Required filename**: `campaign-photo.webp`
*   **Source owner**: Wajib Livestock
*   **Source URL**: N/A
*   **Original dimensions**: 1200 x 1200 px
*   **Recommended display bounding box**: 800 x 800 px, preserve original aspect ratio
*   **Format**: WebP
*   **Alt text**: `Wajib Livestock Eid Qurbani campaign visual`
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: N/A
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/projects/wajib-livestock/campaign-photo.webp`
*   **Notes**: No fake dashboard widgets or browser chrome mockups.

---

### 3. RK Reno Solutions
*   **Brand name**: RK Reno Solutions
*   **Asset type**: Client Logo
*   **Required filename**: `logo.png` / `logo.svg`
*   **Source owner**: RK Reno Solutions
*   **Source URL**: N/A
*   **Original dimensions**: Variable
*   **Recommended display bounding box**: 240 x 80 px, preserve original aspect ratio
*   **Format**: Transparent SVG or clean WebP/PNG
*   **Alt text**: `RK Reno Solutions logo`
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/brands/rk-reno-solutions/logo.png`
*   **Notes**: Falls back to styled plain text block if logo files are not supplied. Never stretch or crop brand logos to fill the box.

*   **Brand name**: RK Reno Solutions
*   **Asset type**: Website screenshot
*   **Required filename**: `website-screenshot.webp`
*   **Source owner**: RK Reno Solutions
*   **Source URL**: N/A
*   **Original dimensions**: 1920 x 1080 px
*   **Recommended display bounding box**: 1200 x 630 px, preserve original aspect ratio
*   **Format**: WebP
*   **Alt text**: `Home renovation service website layout for RK Reno Solutions`
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: N/A
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/projects/rk-reno-solutions/website-screenshot.webp`
*   **Notes**: Flat screenshot inside neutral frames.

---

### 4. Viral Naturals
*   **Brand name**: Viral Naturals
*   **Asset type**: Client Logo
*   **Required filename**: `logo.png` / `logo.svg`
*   **Source owner**: Viral Naturals
*   **Source URL**: N/A
*   **Original dimensions**: Variable
*   **Recommended display bounding box**: 240 x 80 px, preserve original aspect ratio
*   **Format**: Transparent SVG or clean WebP/PNG
*   **Alt text**: `Viral Naturals logo`
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/brands/viral-naturals/logo.png`
*   **Notes**: Omit if approval not confirmed. Never stretch or crop brand logos to fill the box.

---

### 5. Convort AI
*   **Brand name**: Convort AI
*   **Asset type**: Client Logo
*   **Required filename**: `logo.png` / `logo.svg`
*   **Source owner**: Convort AI
*   **Source URL**: N/A
*   **Original dimensions**: Variable
*   **Recommended display bounding box**: 240 x 80 px, preserve original aspect ratio
*   **Format**: Transparent SVG or clean WebP/PNG
*   **Alt text**: `Convort AI logo`
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/brands/convort-ai/logo.png`
*   **Notes**: Dynamic tech card grid. Never stretch or crop brand logos to fill the box.

---

### 6. Clearzone Immigration
*   **Brand name**: Clearzone Immigration
*   **Asset type**: Client Logo
*   **Required filename**: `logo.png` / `logo.svg`
*   **Source owner**: Clearzone Immigration
*   **Source URL**: N/A
*   **Original dimensions**: Variable
*   **Recommended display bounding box**: 240 x 80 px, preserve original aspect ratio
*   **Format**: Transparent SVG or clean WebP/PNG
*   **Alt text**: `Clearzone Immigration logo`
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/brands/clearzone/logo.png`
*   **Notes**: Wordmark text layout fallback. Never stretch or crop brand logos to fill the box.

---

### 7. Europa Immigration
*   **Brand name**: Europa Immigration
*   **Asset type**: Client Logo
*   **Required filename**: `logo.png` / `logo.svg`
*   **Source owner**: Europa Immigration
*   **Source URL**: N/A
*   **Original dimensions**: Variable
*   **Recommended display bounding box**: 240 x 80 px, preserve original aspect ratio
*   **Format**: Transparent SVG or clean WebP/PNG
*   **Alt text**: `Europa Immigration logo`
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/brands/europa-immigration/logo.png`
*   **Notes**: Neutral sector list entry. Never stretch or crop brand logos to fill the box.

---

### 8. Quick Immigration Service
*   **Brand name**: Quick Immigration Service
*   **Asset type**: Client Logo
*   **Required filename**: `logo.png` / `logo.svg`
*   **Source owner**: Quick Immigration Service
*   **Source URL**: N/A
*   **Original dimensions**: Variable
*   **Recommended display bounding box**: 240 x 80 px, preserve original aspect ratio
*   **Format**: Transparent SVG or clean WebP/PNG
*   **Alt text**: `Quick Immigration Service logo`
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/brands/quick-immigration/logo.png`
*   **Notes**: Text fallback. Never stretch or crop brand logos to fill the box.

---

### 9. Shopinq Online
*   **Brand name**: Shopinq Online
*   **Asset type**: Client Logo
*   **Required filename**: `logo.png` / `logo.svg`
*   **Source owner**: Shopinq Online
*   **Source URL**: N/A
*   **Original dimensions**: Variable
*   **Recommended display bounding box**: 240 x 80 px, preserve original aspect ratio
*   **Format**: Transparent SVG or clean WebP/PNG
*   **Alt text**: `Shopinq Online logo`
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/brands/shopinq/logo.png`
*   **Notes**: Approved brand asset. Never stretch or crop brand logos to fill the box.

---

### 10. Super Safety Covers
*   **Brand name**: Super Safety Covers
*   **Asset type**: Client Logo
*   **Required filename**: `logo.png` / `logo.svg`
*   **Source owner**: Super Safety Covers
*   **Source URL**: N/A
*   **Original dimensions**: Variable
*   **Recommended display bounding box**: 240 x 80 px, preserve original aspect ratio
*   **Format**: Transparent SVG or clean WebP/PNG
*   **Alt text**: `Super Safety Covers logo`
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/brands/super-safety-covers/logo.png`
*   **Notes**: Omit completely if publicApproved is not confirmed. Never stretch or crop brand logos to fill the box.

---

### 11. Riyadh Finish Pro
*   **Brand name**: Riyadh Finish Pro
*   **Asset type**: Client Logo
*   **Required filename**: `logo.png` / `logo.svg`
*   **Source owner**: Riyadh Finish Pro
*   **Source URL**: N/A
*   **Original dimensions**: Variable
*   **Recommended display bounding box**: 240 x 80 px, preserve original aspect ratio
*   **Format**: Transparent SVG or clean WebP/PNG
*   **Alt text**: `Riyadh Finish Pro logo`
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/brands/riyadh-finish-pro/logo.png`
*   **Notes**: Construction client. Never stretch or crop brand logos to fill the box.

---

### 12. Unique Lahore Lab Sahiwal
*   **Brand name**: Unique Lahore Lab Sahiwal
*   **Asset type**: Client Logo
*   **Required filename**: `logo.png` / `logo.svg`
*   **Source owner**: Unique Lahore Lab Sahiwal
*   **Source URL**: N/A
*   **Original dimensions**: Variable
*   **Recommended display bounding box**: 240 x 80 px, preserve original aspect ratio
*   **Format**: Transparent SVG or clean WebP/PNG
*   **Alt text**: `Unique Lahore Lab Sahiwal logo`
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/brands/unique-lahore-lab/logo.png`
*   **Notes**: Healthcare laboratory. Never stretch or crop brand logos to fill the box.

---

## Platforms & Tools Registry (12 Records)

The availability of public brand-resource pages does not imply prior approval for our specific layouts. All review, usage, and logo approvals are pending verification. These platforms are tools we work with and are never described as partners without documentation.

### 1. Meta Ads
*   **Official source owner**: Meta Platforms, Inc.
*   **Official brand-resource URL**: https://about.meta.com/brand/resources/meta-ads/
*   **Asset type**: Platform Logo
*   **Original filename**: `meta-ads-original.svg`
*   **Local optimized filename**: `meta-ads.svg`
*   **Recommended display bounding box**: 48 x 48 px, preserve original aspect ratio
*   **Format**: Official SVG or approved transparent PNG
*   **Optimization target**: SVG under 20 KB where quality allows
*   **Alt text**: `Meta Ads logo`
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/platforms/meta-ads.svg`
*   **Guideline review completed**: [ ] Yes / [x] No
*   **Whether recoloring is allowed**: Pending official guideline review
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Usage notes**: Use the official asset unchanged by default until review is completed

### 2. Facebook
*   **Official source owner**: Meta Platforms, Inc.
*   **Official brand-resource URL**: https://about.meta.com/brand/resources/facebook-app/logo/
*   **Asset type**: Platform Logo
*   **Original filename**: `facebook-original.svg`
*   **Local optimized filename**: `facebook.svg`
*   **Recommended display bounding box**: 48 x 48 px, preserve original aspect ratio
*   **Format**: Official SVG or approved transparent PNG
*   **Optimization target**: SVG under 20 KB where quality allows
*   **Alt text**: `Facebook logo`
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/platforms/facebook.svg`
*   **Guideline review completed**: [ ] Yes / [x] No
*   **Whether recoloring is allowed**: Pending official guideline review
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Usage notes**: Use the official asset unchanged by default until review is completed

### 3. Instagram
*   **Official source owner**: Meta Platforms, Inc.
*   **Official brand-resource URL**: https://about.meta.com/brand/resources/instagram/instagram-brand/
*   **Asset type**: Platform Logo
*   **Original filename**: `instagram-original.svg`
*   **Local optimized filename**: `instagram.svg`
*   **Recommended display bounding box**: 48 x 48 px, preserve original aspect ratio
*   **Format**: Official SVG or approved transparent PNG
*   **Optimization target**: SVG under 20 KB where quality allows
*   **Alt text**: `Instagram logo`
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/platforms/instagram.svg`
*   **Guideline review completed**: [ ] Yes / [x] No
*   **Whether recoloring is allowed**: Pending official guideline review
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Usage notes**: Use the official asset unchanged by default until review is completed

### 4. Google Ads
*   **Official source owner**: Google LLC
*   **Official brand-resource URL**: https://www.google.com/permissions/
*   **Asset type**: Platform Logo
*   **Original filename**: `google-ads-original.svg`
*   **Local optimized filename**: `google-ads.svg`
*   **Recommended display bounding box**: 48 x 48 px, preserve original aspect ratio
*   **Format**: Official SVG or approved transparent PNG
*   **Optimization target**: SVG under 20 KB where quality allows
*   **Alt text**: `Google Ads logo`
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/platforms/google-ads.svg`
*   **Guideline review completed**: [ ] Yes / [x] No
*   **Whether recoloring is allowed**: Pending official guideline review
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Usage notes**: Use the official asset unchanged by default until review is completed

### 5. Google Analytics 4
*   **Official source owner**: Google LLC
*   **Official brand-resource URL**: N/A
*   **Asset type**: Platform Logo
*   **Original filename**: `google-analytics-original.svg`
*   **Local optimized filename**: `google-analytics.svg`
*   **Recommended display bounding box**: 48 x 48 px, preserve original aspect ratio
*   **Format**: Official SVG or approved transparent PNG
*   **Optimization target**: SVG under 20 KB where quality allows
*   **Alt text**: `Google Analytics 4 logo`
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/platforms/google-analytics.svg`
*   **Guideline review completed**: [ ] Yes / [x] No
*   **Whether recoloring is allowed**: Pending official guideline review
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Usage notes**: Use the official asset unchanged by default until review is completed

### 6. Google Tag Manager
*   **Official source owner**: Google LLC
*   **Official brand-resource URL**: N/A
*   **Asset type**: Platform Logo
*   **Original filename**: `google-tag-manager-original.svg`
*   **Local optimized filename**: `google-tag-manager.svg`
*   **Recommended display bounding box**: 48 x 48 px, preserve original aspect ratio
*   **Format**: Official SVG or approved transparent PNG
*   **Optimization target**: SVG under 20 KB where quality allows
*   **Alt text**: `Google Tag Manager logo`
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/platforms/google-tag-manager.svg`
*   **Guideline review completed**: [ ] Yes / [x] No
*   **Whether recoloring is allowed**: Pending official guideline review
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Usage notes**: Use the official asset unchanged by default until review is completed

### 7. WordPress
*   **Official source owner**: WordPress Foundation
*   **Official brand-resource URL**: https://wordpress.org/about/logos/
*   **Asset type**: Platform Logo
*   **Original filename**: `wordpress-original.svg`
*   **Local optimized filename**: `wordpress.svg`
*   **Recommended display bounding box**: 48 x 48 px, preserve original aspect ratio
*   **Format**: Official SVG or approved transparent PNG
*   **Optimization target**: SVG under 20 KB where quality allows
*   **Alt text**: `WordPress logo`
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/platforms/wordpress.svg`
*   **Guideline review completed**: [ ] Yes / [x] No
*   **Whether recoloring is allowed**: Pending official guideline review
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Usage notes**: Use the official asset unchanged by default until review is completed

### 8. WooCommerce
*   **Official source owner**: WooCommerce (Automattic Inc.)
*   **Official brand-resource URL**: https://woocommerce.com/style-guide/
*   **Asset type**: Platform Logo
*   **Original filename**: `woocommerce-original.svg`
*   **Local optimized filename**: `woocommerce.svg`
*   **Recommended display bounding box**: 48 x 48 px, preserve original aspect ratio
*   **Format**: Official SVG or approved transparent PNG
*   **Optimization target**: SVG under 20 KB where quality allows
*   **Alt text**: `WooCommerce logo`
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/platforms/woocommerce.svg`
*   **Guideline review completed**: [ ] Yes / [x] No
*   **Whether recoloring is allowed**: Pending official guideline review
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Usage notes**: Use the official asset unchanged by default until review is completed

### 9. Shopify
*   **Official source owner**: Shopify Inc.
*   **Official brand-resource URL**: https://www.shopify.com/brand-assets
*   **Asset type**: Platform Logo
*   **Original filename**: `shopify-original.svg`
*   **Local optimized filename**: `shopify.svg`
*   **Recommended display bounding box**: 48 x 48 px, preserve original aspect ratio
*   **Format**: Official SVG or approved transparent PNG
*   **Optimization target**: SVG under 20 KB where quality allows
*   **Alt text**: `Shopify logo`
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/platforms/shopify.svg`
*   **Guideline review completed**: [ ] Yes / [x] No
*   **Whether recoloring is allowed**: Pending official guideline review
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Usage notes**: Use the official asset unchanged by default until review is completed

### 10. WhatsApp Business
*   **Official source owner**: Meta Platforms, Inc.
*   **Official brand-resource URL**: https://whatsappbrand.com/
*   **Asset type**: Platform Logo
*   **Original filename**: `whatsapp-original.svg`
*   **Local optimized filename**: `whatsapp.svg`
*   **Recommended display bounding box**: 48 x 48 px, preserve original aspect ratio
*   **Format**: Official SVG or approved transparent PNG
*   **Optimization target**: SVG under 20 KB where quality allows
*   **Alt text**: `WhatsApp Business logo`
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/platforms/whatsapp.svg`
*   **Guideline review completed**: [ ] Yes / [x] No
*   **Whether recoloring is allowed**: Pending official guideline review
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Usage notes**: Use the official asset unchanged by default until review is completed

### 11. Elementor
*   **Official source owner**: Elementor Ltd.
*   **Official brand-resource URL**: N/A
*   **Asset type**: Platform Logo
*   **Original filename**: `elementor-original.svg`
*   **Local optimized filename**: `elementor.svg`
*   **Recommended display bounding box**: 48 x 48 px, preserve original aspect ratio
*   **Format**: Official SVG or approved transparent PNG
*   **Optimization target**: SVG under 20 KB where quality allows
*   **Alt text**: `Elementor logo`
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/platforms/elementor.svg`
*   **Guideline review completed**: [ ] Yes / [x] No
*   **Whether recoloring is allowed**: Pending official guideline review
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Usage notes**: Use the official asset unchanged by default until review is completed

### 12. Canva
*   **Official source owner**: Canva Pty Ltd
*   **Official brand-resource URL**: N/A
*   **Asset type**: Platform Logo
*   **Original filename**: `canva-original.svg`
*   **Local optimized filename**: `canva.svg`
*   **Recommended display bounding box**: 48 x 48 px, preserve original aspect ratio
*   **Format**: Official SVG or approved transparent PNG
*   **Optimization target**: SVG under 20 KB where quality allows
*   **Alt text**: `Canva logo`
*   **Received**: [ ] Yes / [x] No
*   **Optimized**: [ ] Yes / [x] No
*   **Final repository path**: `public/platforms/canva.svg`
*   **Guideline review completed**: [ ] Yes / [x] No
*   **Whether recoloring is allowed**: Pending official guideline review
*   **Public usage approved**: [ ] Yes / [ ] No
*   **Logo usage approved**: [ ] Yes / [ ] No
*   **Usage notes**: Use the official asset unchanged by default until review is completed
