# Production Visual Asset Manifest & Intake Registry

This document serves as the master intake registry tracking all required visual assets for Starts Digital production release. It maps private source locations to public repository paths, defines individual brand and platform records, and outlines temporary asset replacement criteria.

---

## 1. Production Release Gate Requirements

To prevent partial text-only layouts, unverified claims, or placeholder images on production, the site will only be released when all gate conditions are fulfilled:

- [ ] **At least 6 approved and optimized real client logos** received in vector SVG or transparent PNG format.
- [ ] **Black Gold Fertilizer**: Approved logo and real campaign/e-commerce visual.
- [ ] **Wajib Livestock**: Approved public case-study name, approved logo, and real Qurbani/livestock visual.
- [ ] **RK Reno Solutions**: Approved logo and real website screenshot.
- [ ] **Technology Platforms**: Approved official SVG assets downloaded directly from platform brand portals.
- [ ] **Temporary Visuals**: All temporary prototype visuals replaced in component files.
- [ ] **Labels**: All `CONCEPT VISUAL` badges removed from components after asset replacement.
- [ ] **Privacy Audit**: Zero private or unredacted information (phone numbers, ad account IDs, client emails) inside public assets.

---

## 2. Master Production Asset Manifest

### A. Hero & Services Core Visuals

| Component / Visual Target | Required Asset Type | Private Source Location | Received | Public Usage Approved | Redaction Required | Optimized | Public Filename | Final Public Repository Path | Used in Component | Replacement Target | Notes |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :--- |
| **Hero Primary Visual** | Real agency dashboard or campaign composite | `private-assets/hero/hero-primary-original.png` | No | Pending | Yes | No | `hero-primary.webp` | `public/hero/hero-primary.webp` | [Hero.astro](../../../src/components/sections/Hero.astro) | `public/prototype/hero-business.webp` | Must show real ad/analytics visual without PII |
| **Hero Secondary Visual** | Real analytics screenshot or campaign card | `private-assets/hero/hero-secondary-original.png` | No | Pending | Yes | No | `hero-secondary.webp` | `public/hero/hero-secondary.webp` | [Hero.astro](../../../src/components/sections/Hero.astro) | `public/prototype/hero-dashboard.webp` | Overlapping visual frame in Hero right column |
| **Creative Content & AI** | Real short-form video editing or ad creative layout | `private-assets/services/content-ai-original.png` | No | Pending | No | No | `content-ai.webp` | `public/services/content-ai.webp` | [Services.astro](../../../src/components/sections/Services.astro) | `public/prototype/content-strategy.webp` | Services Pillar C image-led panel |
| **Founder Section** | Professional portrait headshot photo | `private-assets/founder/portrait-original.jpg` | No | Pending | No | No | `portrait.webp` | `public/founder/portrait.webp` | [FounderSection.astro](../../../src/components/sections/FounderSection.astro) | Disabled placeholder block | Requires founder photo, bio & role confirmation |

### B. Featured Work Showcase Visuals

| Project Name | Required Asset Type | Private Source Location | Received | Public Usage Approved | Redaction Required | Optimized | Public Filename | Final Public Repository Path | Used in Component | Replacement Target | Notes |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :--- |
| **Black Gold Fertilizer** | Real e-commerce campaign creative or website screenshot | `private-assets/black-gold-fertilizer/showcase-original.png` | No | Pending | Yes | No | `showcase.webp` | `public/work/black-gold-fertilizer/showcase.webp` | [FeaturedWork.astro](../../../src/components/sections/FeaturedWork.astro) | `public/prototype/hero-dashboard.webp` | Showcases e-commerce growth project |
| **Qurbani Campaign** | Real livestock photo, Qurbani ad creative or campaign visual | `private-assets/wajib-livestock/qurbani-original.png` | No | Pending | No | No | `showcase.webp` | `public/work/wajib-livestock/showcase.webp` | [FeaturedWork.astro](../../../src/components/sections/FeaturedWork.astro) | `public/prototype/campaign-lab.webp` | Showcases seasonal Qurbani campaign |
| **RK Reno Solutions** | Real website screenshot or renovation project photo | `private-assets/rk-reno-solutions/website-original.png` | No | Pending | No | No | `showcase.webp` | `public/work/rk-reno-solutions/showcase.webp` | [FeaturedWork.astro](../../../src/components/sections/FeaturedWork.astro) | `public/prototype/project-seo.webp` | Showcases KL & Selangor renovation SEO work |

### C. Individual Client Brand Logo Records (15 Brands)

Logo Format Specification:
- SVG preferred; transparent PNG accepted (at least 1000px on longest side where available).
- Preserve original aspect ratio; never crop or stretch.
- Display bounding box: `240 x 80px`.

| Client Brand Name | Private Source Location | Received | Public Approved | Logo Approved | Optimized | Public Filename | Final Public Repository Path | Used in Component | Notes |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- |
| **Black Gold Fertilizer** | `private-assets/black-gold-fertilizer/logo.svg` | No | Yes | Pending | No | `logo.svg` | `public/brands/black-gold-fertilizer/logo.svg` | [BrandExperience.astro](../../../src/components/sections/BrandExperience.astro) | Public name approved; logo pending review |
| **Wajib Livestock** | `private-assets/wajib-livestock/logo.svg` | No | Yes | Pending | No | `logo.svg` | `public/brands/wajib-livestock/logo.svg` | [BrandExperience.astro](../../../src/components/sections/BrandExperience.astro) | Public name approved; logo pending review |
| **RK Reno Solutions** | `private-assets/rk-reno-solutions/logo.svg` | No | Yes | Pending | No | `logo.svg` | `public/brands/rk-reno-solutions/logo.svg` | [BrandExperience.astro](../../../src/components/sections/BrandExperience.astro) | Public name approved; logo pending review |
| **Viral Naturals** | `private-assets/client-logos/viral-naturals-logo.svg` | No | Yes | Pending | No | `logo.svg` | `public/brands/viral-naturals/logo.svg` | [BrandExperience.astro](../../../src/components/sections/BrandExperience.astro) | Public name approved; logo pending review |
| **Shopinq Online** | `private-assets/client-logos/shopinq-online-logo.svg` | No | Yes | Pending | No | `logo.svg` | `public/brands/shopinq-online/logo.svg` | [BrandExperience.astro](../../../src/components/sections/BrandExperience.astro) | Public name approved; logo pending review |
| **Super Safety Covers** | `private-assets/client-logos/super-safety-covers-logo.svg` | No | Yes | Pending | No | `logo.svg` | `public/brands/super-safety-covers/logo.svg` | [BrandExperience.astro](../../../src/components/sections/BrandExperience.astro) | Public name approved; logo pending review |
| **Riyadh Finish Pro** | `private-assets/client-logos/riyadh-finish-pro-logo.svg` | No | Yes | Pending | No | `logo.svg` | `public/brands/riyadh-finish-pro/logo.svg` | [BrandExperience.astro](../../../src/components/sections/BrandExperience.astro) | Public name approved; logo pending review |
| **Convort AI** | `private-assets/client-logos/convort-ai-logo.svg` | No | Yes | Pending | No | `logo.svg` | `public/brands/convort-ai/logo.svg` | [BrandExperience.astro](../../../src/components/sections/BrandExperience.astro) | Public name approved; logo pending review |
| **Clearzone Immigration** | `private-assets/client-logos/clearzone-immigration-logo.svg` | No | Yes | Pending | No | `logo.svg` | `public/brands/clearzone-immigration/logo.svg` | [BrandExperience.astro](../../../src/components/sections/BrandExperience.astro) | Public name approved; logo pending review |
| **Europa Immigration** | `private-assets/client-logos/europa-immigration-logo.svg` | No | Yes | Pending | No | `logo.svg` | `public/brands/europa-immigration/logo.svg` | [BrandExperience.astro](../../../src/components/sections/BrandExperience.astro) | Public name approved; logo pending review |
| **Quick Immigration Service** | `private-assets/client-logos/quick-immigration-service-logo.svg` | No | Yes | Pending | No | `logo.svg` | `public/brands/quick-immigration-service/logo.svg` | [BrandExperience.astro](../../../src/components/sections/BrandExperience.astro) | Public name approved; logo pending review |
| **Unique Lahore Lab Sahiwal** | `private-assets/client-logos/unique-lahore-lab-sahiwal-logo.svg` | No | Yes | Pending | No | `logo.svg` | `public/brands/unique-lahore-lab-sahiwal/logo.svg` | [BrandExperience.astro](../../../src/components/sections/BrandExperience.astro) | Public name approved; logo pending review |
| **Right Link Advisors** | `private-assets/client-logos/right-link-advisors-logo.svg` | No | Yes | Pending | No | `logo.svg` | `public/brands/right-link-advisors/logo.svg` | [BrandExperience.astro](../../../src/components/sections/BrandExperience.astro) | Public name approved; logo pending review |
| **Rapidline Immigration Services** | `private-assets/client-logos/rapidline-immigration-services-logo.svg` | No | Yes | Pending | No | `logo.svg` | `public/brands/rapidline-immigration-services/logo.svg` | [BrandExperience.astro](../../../src/components/sections/BrandExperience.astro) | Public name approved; logo pending review |
| **Rapidzone** | `private-assets/client-logos/rapidzone-logo.svg` | No | Yes | Pending | No | `logo.svg` | `public/brands/rapidzone/logo.svg` | [BrandExperience.astro](../../../src/components/sections/BrandExperience.astro) | Public name approved; logo pending review |

### D. Individual Platform Logo Records (12 Platforms)

Must be downloaded from official brand-resource sources:

| Platform Name | Official Source Portal | Private Source Location | Received | Guideline Reviewed | Optimized | Public Filename | Final Public Repository Path | Used in Component | Notes |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- | :--- | :--- | :--- |
| **Meta Ads** | Meta Brand Resources | `private-assets/platform-originals/meta-ads.svg` | No | Pending | No | `meta-ads.svg` | `public/platforms/meta-ads.svg` | [PlatformsTools.astro](../../../src/components/sections/PlatformsTools.astro) | Official Meta Ads vector logo |
| **Facebook** | Meta Brand Resources | `private-assets/platform-originals/facebook.svg` | No | Pending | No | `facebook.svg` | `public/platforms/facebook.svg` | [PlatformsTools.astro](../../../src/components/sections/PlatformsTools.astro) | Official Facebook app logo |
| **Instagram** | Meta Brand Resources | `private-assets/platform-originals/instagram.svg` | No | Pending | No | `instagram.svg` | `public/platforms/instagram.svg` | [PlatformsTools.astro](../../../src/components/sections/PlatformsTools.astro) | Official Instagram glyph logo |
| **Google Ads** | Google Permissions | `private-assets/platform-originals/google-ads.svg` | No | Pending | No | `google-ads.svg` | `public/platforms/google-ads.svg` | [PlatformsTools.astro](../../../src/components/sections/PlatformsTools.astro) | Official Google Ads logo |
| **Google Analytics 4** | Google Permissions | `private-assets/platform-originals/google-analytics.svg` | No | Pending | No | `google-analytics.svg` | `public/platforms/google-analytics.svg` | [PlatformsTools.astro](../../../src/components/sections/PlatformsTools.astro) | Official GA4 icon |
| **Google Tag Manager** | Google Permissions | `private-assets/platform-originals/google-tag-manager.svg` | No | Pending | No | `google-tag-manager.svg` | `public/platforms/google-tag-manager.svg` | [PlatformsTools.astro](../../../src/components/sections/PlatformsTools.astro) | Official GTM icon |
| **WordPress** | WordPress.org Logos | `private-assets/platform-originals/wordpress.svg` | No | Pending | No | `wordpress.svg` | `public/platforms/wordpress.svg` | [PlatformsTools.astro](../../../src/components/sections/PlatformsTools.astro) | Official W mark logo |
| **WooCommerce** | WooCommerce Style Guide | `private-assets/platform-originals/woocommerce.svg` | No | Pending | No | `woocommerce.svg` | `public/platforms/woocommerce.svg` | [PlatformsTools.astro](../../../src/components/sections/PlatformsTools.astro) | Official WooCommerce wordmark |
| **Shopify** | Shopify Brand Assets | `private-assets/platform-originals/shopify.svg` | No | Pending | No | `shopify.svg` | `public/platforms/shopify.svg` | [PlatformsTools.astro](../../../src/components/sections/PlatformsTools.astro) | Official Shopping bag icon |
| **WhatsApp Business** | WhatsApp Brand Portal | `private-assets/platform-originals/whatsapp.svg` | No | Pending | No | `whatsapp.svg` | `public/platforms/whatsapp.svg` | [PlatformsTools.astro](../../../src/components/sections/PlatformsTools.astro) | Official WhatsApp logo |
| **Elementor** | Elementor Press Kit | `private-assets/platform-originals/elementor.svg` | No | Pending | No | `elementor.svg` | `public/platforms/elementor.svg` | [PlatformsTools.astro](../../../src/components/sections/PlatformsTools.astro) | Official E logo |
| **Canva** | Canva Brand Assets | `private-assets/platform-originals/canva.svg` | No | Pending | No | `canva.svg` | `public/platforms/canva.svg` | [PlatformsTools.astro](../../../src/components/sections/PlatformsTools.astro) | Official Canva logo |

---

## 3. Temporary Prototype Asset Mapping & Removal Criteria

The following 5 temporary prototype assets are currently retained for visual composition previews. They must be replaced before production launch:

1. **`public/prototype/hero-business.webp`**:
   - *Current Usage*: Hero section right-column primary visual frame ([Hero.astro](../../../src/components/sections/Hero.astro)).
   - *Production Target*: `public/hero/hero-primary.webp`
   - *Removal Condition*: Replace when real redacted agency dashboard or campaign composite is provided.

2. **`public/prototype/hero-dashboard.webp`**:
   - *Current Usage*: Hero section secondary visual frame ([Hero.astro](../../../src/components/sections/Hero.astro)) & Black Gold Fertilizer showcase ([FeaturedWork.astro](../../../src/components/sections/FeaturedWork.astro)).
   - *Production Target*: `public/hero/hero-secondary.webp` & `public/work/black-gold-fertilizer/showcase.webp`
   - *Removal Condition*: Replace when real analytics screenshot and Black Gold Fertilizer creative are provided.

3. **`public/prototype/content-strategy.webp`**:
   - *Current Usage*: Services Pillar C (*Creative Content & AI Systems*) image-led panel ([Services.astro](../../../src/components/sections/Services.astro)).
   - *Production Target*: `public/services/content-ai.webp`
   - *Removal Condition*: Replace when real creative production visual is provided.

4. **`public/prototype/campaign-lab.webp`**:
   - *Current Usage*: Qurbani Campaign project showcase visual frame ([FeaturedWork.astro](../../../src/components/sections/FeaturedWork.astro)).
   - *Production Target*: `public/work/wajib-livestock/showcase.webp`
   - *Removal Condition*: Replace when real livestock photo or Qurbani ad creative is provided.

5. **`public/prototype/project-seo.webp`**:
   - *Current Usage*: RK Reno Solutions project showcase visual frame ([FeaturedWork.astro](../../../src/components/sections/FeaturedWork.astro)).
   - *Production Target*: `public/work/rk-reno-solutions/showcase.webp`
   - *Removal Condition*: Replace when real KL & Selangor renovation website screenshot is provided.
