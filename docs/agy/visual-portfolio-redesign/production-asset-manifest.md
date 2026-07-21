# Production Visual Asset Manifest & Intake Registry

This document tracks all required visual assets for Starts Digital production release, mapping private intake sources to public repository targets and defining removal criteria for temporary prototype visuals.

---

## 1. Master Production Asset Manifest

| Brand or Project | Required Asset | Private Source Location | Received | Public Usage Approved | Logo Usage Approved | Redaction Required | Optimized | Public Filename | Final Public Repository Path | Used in Component | Replacement Target | Notes |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :--- |
| **Hero Primary Visual** | Real agency dashboard or campaign composite | `private-assets/hero/hero-primary-original.png` | No | Pending | N/A | Yes | No | `hero-primary.webp` | `public/hero/hero-primary.webp` | `Hero.astro` | `public/prototype/hero-business.webp` | Must show real ad/analytics visual without client PII |
| **Hero Secondary Visual** | Real analytics screenshot or campaign card | `private-assets/hero/hero-secondary-original.png` | No | Pending | N/A | Yes | No | `hero-secondary.webp` | `public/hero/hero-secondary.webp` | `Hero.astro` | `public/prototype/hero-dashboard.webp` | Overlapping visual in Hero right column |
| **Creative Content & AI** | Real short-form video editing or ad creative layout | `private-assets/services/content-ai-original.png` | No | Pending | N/A | No | No | `services-content-ai.webp` | `public/services/content-ai.webp` | `Services.astro` | `public/prototype/content-strategy.webp` | Services Pillar C image-led panel |
| **Black Gold Fertilizer** | Transparent real brand logo | `private-assets/black-gold-fertilizer/logo.svg` | No | Pending | Pending | No | No | `black-gold-logo.svg` | `public/brands/black-gold-fertilizer.svg` | `BrandExperience.astro` | Logo wall entry | Requires explicit user approval |
| **Black Gold Fertilizer** | Real e-commerce campaign creative or website screenshot | `private-assets/black-gold-fertilizer/showcase-original.png` | No | Pending | N/A | Yes | No | `black-gold-showcase.webp` | `public/work/black-gold-fertilizer/showcase.webp` | `FeaturedWork.astro` | `public/prototype/hero-dashboard.webp` | Showcases e-commerce growth project |
| **Wajib Livestock** | Transparent real brand logo | `private-assets/wajib-livestock/logo.svg` | No | Pending | Pending | No | No | `wajib-livestock-logo.svg` | `public/brands/wajib-livestock.svg` | `BrandExperience.astro` | Logo wall entry | Requires explicit user approval of name & logo |
| **Qurbani Campaign** | Real livestock photo, Qurbani ad creative or campaign visual | `private-assets/wajib-livestock/qurbani-original.png` | No | Pending | N/A | No | No | `qurbani-campaign-showcase.webp` | `public/work/wajib-livestock/showcase.webp` | `FeaturedWork.astro` | `public/prototype/campaign-lab.webp` | Showcases seasonal Qurbani campaign |
| **RK Reno Solutions** | Transparent real brand logo | `private-assets/rk-reno-solutions/logo.svg` | No | Pending | Pending | No | No | `rk-reno-logo.svg` | `public/brands/rk-reno-solutions.svg` | `BrandExperience.astro` | Logo wall entry | Requires explicit user approval |
| **RK Reno Solutions** | Real website screenshot or renovation project photo | `private-assets/rk-reno-solutions/website-original.png` | No | Pending | N/A | No | No | `rk-reno-showcase.webp` | `public/work/rk-reno-solutions/showcase.webp` | `FeaturedWork.astro` | `public/prototype/project-seo.webp` | Showcases KL & Selangor renovation SEO work |
| **Brand Logo Wall** | Client vector logos (up to 12 brands) | `private-assets/client-logos/` | No | Pending | Pending | No | No | Various `.svg` | `public/brands/` | `BrandExperience.astro` | Logo wall entries | Currently zero brands are approved (`publicApproved: false`) |
| **Founder Section** | Professional portrait headshot photo | `private-assets/founder/portrait-original.jpg` | No | Pending | N/A | No | No | `founder-portrait.webp` | `public/founder/portrait.webp` | `FounderSection.astro` | Currently disabled section | Requires founder photo, bio & role confirmation |
| **Platform Band** | Official platform SVG brand packages | `private-assets/platform-originals/` | No | Pending | N/A | No | No | Various `.svg` | `public/platforms/` | `PlatformsTools.astro` | Text tiles with SVG icons | Must be downloaded from official brand portals |

---

## 2. Temporary Prototype Asset Mapping & Removal Criteria

The following 5 temporary prototype assets are currently retained for visual composition previews. They must be replaced before production launch:

### 1. `public/prototype/hero-business.webp`
- **Current Usage**: Hero section right-column primary visual frame ([Hero.astro](../../src/components/sections/Hero.astro)).
- **Required Real Replacement**: Approved real agency dashboard or campaign strategy composite (`public/hero/hero-primary.webp`).
- **Component Path**: `src/components/sections/Hero.astro`
- **Production Removal Condition**: Delete when a verified, redacted real campaign visual is supplied and approved.

### 2. `public/prototype/hero-dashboard.webp`
- **Current Usage**: 
  - Hero section right-column overlapping secondary visual frame ([Hero.astro](../../src/components/sections/Hero.astro)).
  - Black Gold Fertilizer project showcase visual frame ([FeaturedWork.astro](../../src/components/sections/FeaturedWork.astro)).
- **Required Real Replacement**:
  - Hero secondary: Approved real analytics screenshot (`public/hero/hero-secondary.webp`).
  - Black Gold Fertilizer: Real e-commerce ad creative or website screenshot (`public/work/black-gold-fertilizer/showcase.webp`).
- **Component Path**: `src/components/sections/Hero.astro`, `src/components/sections/FeaturedWork.astro`
- **Production Removal Condition**: Delete when real Black Gold Fertilizer creative and hero secondary screenshot are supplied.

### 3. `public/prototype/content-strategy.webp`
- **Current Usage**: Services Pillar C (*Creative Content & AI Systems*) image-led panel ([Services.astro](../../src/components/sections/Services.astro)).
- **Required Real Replacement**: Approved short-form video editing or ad creative production visual (`public/services/content-ai.webp`).
- **Component Path**: `src/components/sections/Services.astro`
- **Production Removal Condition**: Delete when real creative production visual is supplied and approved.

### 4. `public/prototype/campaign-lab.webp`
- **Current Usage**: Qurbani Campaign project showcase visual frame ([FeaturedWork.astro](../../src/components/sections/FeaturedWork.astro)).
- **Required Real Replacement**: Approved real livestock photo, Qurbani ad creative, or video still (`public/work/wajib-livestock/showcase.webp`).
- **Component Path**: `src/components/sections/FeaturedWork.astro`
- **Production Removal Condition**: Delete when real Qurbani campaign visual is supplied and approved.

### 5. `public/prototype/project-seo.webp`
- **Current Usage**: RK Reno Solutions project showcase visual frame ([FeaturedWork.astro](../../src/components/sections/FeaturedWork.astro)).
- **Required Real Replacement**: Approved real renovation website screenshot or project photo (`public/work/rk-reno-solutions/showcase.webp`).
- **Component Path**: `src/components/sections/FeaturedWork.astro`
- **Production Removal Condition**: Delete when real RK Reno website screenshot is supplied and approved.
