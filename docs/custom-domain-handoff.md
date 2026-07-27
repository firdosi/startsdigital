# STARTS DIGITAL CUSTOM DOMAIN MIGRATION HANDOFF GUIDE

## Overview

This document provides step-by-step technical instructions for migrating the Starts Digital website from the temporary GitHub Pages production URL (`https://firdosi.github.io/startsdigital/`) to the official custom domain (`https://startsdigital.com`).

> **Note**: The custom domain `startsdigital.com` has not yet been purchased or connected. Do NOT create a `CNAME` file or change production environment variables until the domain registration and DNS records are active.

---

## Technical Handoff Parameters

| Configuration | Current GitHub Pages Target | Future Custom Domain Target |
| :--- | :--- | :--- |
| **Domain Name** | `firdosi.github.io` | `startsdigital.com` |
| **Production URL** | `https://firdosi.github.io/startsdigital/` | `https://startsdigital.com/` |
| **`SITE_ORIGIN` Env Variable** | `https://firdosi.github.io` | `https://startsdigital.com` |
| **`SITE_BASE_PATH` Env Variable** | `/startsdigital` | `""` (empty string) |
| **`CNAME` File** | None (Absent) | `public/CNAME` containing `startsdigital.com` |

---

## Step-by-Step Migration Checklist

### 1. Domain Purchase & DNS Setup
1. Purchase the domain **`startsdigital.com`** via your preferred domain registrar.
2. In your DNS management console, create the following DNS records pointing to GitHub Pages servers:
   - **Apex `@` A Records**:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **`www` CNAME Record**:
     - Host: `www`
     - Target: `firdosi.github.io`

### 2. Repository & Repository Settings Configuration
1. Create a `CNAME` file inside `public/CNAME` containing:
   ```
   startsdigital.com
   ```
2. Navigate to GitHub Repository Settings -> **Pages**.
3. Under **Custom domain**, enter `startsdigital.com` and click **Save**.
4. Once DNS propagation check completes, check **Enforce HTTPS**.

### 3. Build Environment Update
When running your build or deployment script:
```bash
export SITE_ORIGIN="https://startsdigital.com"
export SITE_BASE_PATH=""
npm run build
```

### 4. Post-Migration Verification
Execute the automated domain readiness dry-run QA script:
```bash
npm run qa:domain
npm run qa:all
```
Verify that:
- All canonical tags point to `https://startsdigital.com/...`
- `sitemap-index.xml` contains absolute URLs starting with `https://startsdigital.com/...`
- `robots.txt` specifies `Sitemap: https://startsdigital.com/sitemap-index.xml`
- Zero `/startsdigital` subpath segments remain in asset or page URLs.

### 5. Google Search Console & Launch Submission
1. Log into Google Search Console.
2. Add a new Domain property for `startsdigital.com` (or URL prefix `https://startsdigital.com/`).
3. Complete DNS TXT record verification.
4. Submit the sitemap index: `https://startsdigital.com/sitemap-index.xml`.

---

## Rollback Guidance

If DNS issues or SSL certificate provisioning delays occur:
1. Remove `public/CNAME`.
2. Clear the custom domain setting in GitHub Repository Pages settings.
3. Re-build with default environment variables (`SITE_ORIGIN=https://firdosi.github.io`, `SITE_BASE_PATH=/startsdigital`).
4. Re-deploy to restore live access on `https://firdosi.github.io/startsdigital/`.
