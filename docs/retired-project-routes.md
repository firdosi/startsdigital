# Retired Project Routes & Redirect Registry

This document lists the 12 individual client project routes retired in Roadmap 8.2 as part of the public storytelling simplification.

Future VPS web server configurations (Nginx / CNAME setup) should issue permanent HTTP 301 redirects for these legacy URLs pointing to the main `/work/` page.

## Retired Route List

| Retired Legacy Route | Target 301 Redirect Destination | Status |
| :--- | :--- | :--- |
| `/work/black-gold-fertilizer/` | `/work/` | Retired from public build |
| `/work/qurbani-campaign/` | `/work/` | Retired from public build |
| `/work/rk-reno-solutions/` | `/work/` | Retired from public build |
| `/work/convortai/` | `/work/` | Retired from public build |
| `/work/rapidline-immigration-services/` | `/work/` | Retired from public build |
| `/work/rapidzone/` | `/work/` | Retired from public build |
| `/work/clearzone-immigration/` | `/work/` | Retired from public build |
| `/work/riyadh-finish-pro/` | `/work/` | Retired from public build |
| `/work/viral-naturals/` | `/work/` | Retired from public build |
| `/work/shopinq-online/` | `/work/` | Retired from public build |
| `/work/super-safety-covers/` | `/work/` | Retired from public build |
| `/work/unique-lahore-lab-sahiwal/` | `/work/` | Retired from public build |

## Rationale & Internal Data Strategy

- **Public Presentation**: Replaced individual client pages with combined commercial achievements, capability highlights, and an unlinked brand logo wall.
- **Internal Data Retention**: Private project registries (`src/data/projects.ts`, `src/data/projectClaims.ts`, `evidence-intake/`) remain intact for internal management, reporting, and future private portfolio use.
