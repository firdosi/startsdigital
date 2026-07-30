# STARTS DIGITAL: OFFLINE PRE-LAUNCH RELEASE PACKAGE (ROADMAP 8.1)

This document represents the complete offline pre-launch release package for the Starts Digital agency website prior to purchasing `startsdigital.com` and launching production deployment in Roadmap 8.2.

---

## 1. Route Inventory Summary

- **Total HTML Routes Built**: `34`
- **Indexable HTML Routes**: `32`
- **Legal HTML Routes**: `3` (`/privacy/`, `/terms/`, `/legal/`)
- **Noindex Utility HTML Routes**: `2` (`/404.html`, `/style-guide/`)
- **Utility Endpoints**: `2` (`robots.txt`, `sitemap-index.xml`)
- **Total Public Endpoints**: `36`

---

## 2. Asset & Media Readiness Inventory

- **Total Client Brands**: `12`
- **Client Logos Audited**: `12`
- **High-Res Logos Available**: `12` (`public/images/`)
- **Image Budget Verification**: 100% of images in `public/images/` are compressed under the 500 KB ceiling (`black-gold-official.png` at 382 KB).
- **Social & Browser Assets**:
  - `public/favicon.ico`
  - `public/favicon.svg`
  - `public/apple-touch-icon.png`
  - Open Graph Fallback Card Image
  - Twitter Card Metadata

---

## 3. Project Claim & Evidence Audit Summary

- **Detailed Project Stories**: `4` (`clearzone-immigration`, `convortai`, `black-gold-fertilizer`, `rk-reno-solutions`)
- **Client Experience Profiles**: `8` (`rapidline-immigration-services`, `rapidzone`, `riyadh-finish-pro`, `viral-naturals`, `shopinq-online`, `super-safety-covers`, `unique-lahore-lab-sahiwal`, `qurbani-campaign`)
- **Pending Evidence Classification**: 100% of 8 Client Experience profiles are explicitly marked `"Pending Client Verification"` with zero invented metric claims or unverified quotes.
- **Partner Classification**: ConvortAI is strictly isolated as a co-development partner story (`detailType: 'partner-story'`).

---

## 4. Future Domain Migration Checklist (For Roadmap 8.2)

### A. Registrar & Infrastructure
- [ ] Purchase `startsdigital.com` domain.
- [ ] Confirm registrar account details and SSL configuration.
- [ ] Configure DNS A Records (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`).
- [ ] Add `CNAME` file to `public/CNAME` pointing to `startsdigital.com`.

### B. Code & Configuration Switch
- [ ] Update `site.config.ts` `SITE_ORIGIN` to `https://startsdigital.com`.
- [ ] Update `site.config.ts` `SITE_BASE_PATH` to `""` (empty string).
- [ ] Update canonical tag base prefix in layouts.
- [ ] Update sitemap domain index.
- [ ] Update Open Graph & Twitter image URLs.

---

## 5. Deployment Pre-Flight Checklist

1. [ ] Run `npm run check` (verify 0 TypeScript/Astro errors).
2. [ ] Run `npm run build` (verify 34 pages generated in `dist/`).
3. [ ] Run `npm run qa:all` (verify all sub-audits pass with 0 errors).
4. [ ] Verify `dist/` contains zero development artifacts (`.map`, `.log`, `.gemini`).

---

## 6. Emergency Rollback Checklist

1. In the event of a domain or build failure during launch:
   - Revert `site.config.ts` `SITE_ORIGIN` to `https://firdosi.github.io` and `SITE_BASE_PATH` to `/startsdigital`.
   - Remove `public/CNAME`.
   - Re-run `npm run build` and push `main` to restore GitHub Pages fallback deployment.

---

## 7. Post-Launch Verification Checklist

1. [ ] Verify HTTP 200 on `https://startsdigital.com/`.
2. [ ] Verify SSL certificate validity and HTTPS redirection.
3. [ ] Test all 34 routes for proper canonical tags.
4. [ ] Test custom 404 page rendering on nonexistent URL.
5. [ ] Submit sitemap to Google Search Console.
