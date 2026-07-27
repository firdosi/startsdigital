# STARTS DIGITAL ANALYTICS ACTIVATION HANDOFF GUIDE

## Overview

The Starts Digital website includes a privacy-first, disabled-by-default Google Analytics 4 (GA4) system. In production, analytics remains completely inactive until explicitly enabled with a valid measurement ID. When disabled, zero cookies are created and zero network requests are made to external tracking servers.

---

## Current Status & Environment Variables

| Variable | Current Production Value | Future Active Production Value | Description |
| :--- | :--- | :--- | :--- |
| `PUBLIC_ANALYTICS_ENABLED` | `false` | `true` | Master toggle controlling analytics tracking script injection. |
| `PUBLIC_GA_MEASUREMENT_ID` | `""` (empty) | `"G-XXXXXXXXXX"` | Valid Google Analytics 4 Measurement ID. |
| `PUBLIC_ANALYTICS_DEBUG` | `false` | `false` (or `true` locally) | Logs captured events to `window.__ANALYTICS_EVENTS__`. |

---

## Step-by-Step Analytics Activation

### 1. Create a GA4 Property
1. Log into [Google Analytics](https://analytics.google.com/).
2. Create a new Google Analytics 4 Property named **Starts Digital Production**.
3. Set up a Web Data Stream targeting `https://startsdigital.com` (or `https://firdosi.github.io/startsdigital`).
4. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`).

### 2. Configure Environment Variables
In your hosting environment or deployment pipeline (e.g., GitHub Actions Secrets or `.env.production`):
```bash
PUBLIC_ANALYTICS_ENABLED=true
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Build & Test
Rebuild the production website:
```bash
npm run build
npm run qa:analytics
```

---

## Event Taxonomy Reference

All user interactions emit standardized, non-PDI events:

| Event Name | Trigger Condition | Safe Parameters Captured |
| :--- | :--- | :--- |
| `page_view` | Initial page load & ClientRouter page transitions | `page_path`, `viewport_group` |
| `primary_cta_click` | Primary CTA button click | `page_path`, `source`, `viewport_group` |
| `whatsapp_click` | Direct WhatsApp link click (`wa.me`) | `page_path`, `source`, `link_destination_type="whatsapp"` |
| `email_click` | Direct email link click (`mailto:`) | `page_path`, `source`, `link_destination_type="email"` |
| `service_view` | Service card or detail link click | `service_id`, `page_path` |
| `case_study_view` | Case study link click | `project_id`, `page_path` |
| `partner_story_view` | Technology partner story link click | `project_id`, `page_path` |
| `external_client_visit` | External approved brand website visit | `project_id`, `link_destination_type="external"` |
| `contact_form_start` | First interaction with form field on `/contact/` | `page_path` |
| `contact_brief_generate` | Valid brief generation on Contact page | `page_path`, `source`, `project_id`, `service_id` |
| `navigation_click` | Header or Footer menu link click | `page_path` |

---

## Privacy & Parameter Safety Rules

- **Zero Personally Identifiable Information (PII)**: Name, email address, phone number, company, message text, and generated brief text are **NEVER** captured or included in any analytics payload.
- **Anonymized IP**: `gtag('config', measurementId, { send_page_view: false, anonymize_ip: true })` enforces IP anonymization.
- **Manual Page Views**: `send_page_view: false` prevents automatic duplicate page views; page views are tracked explicitly on ready and ClientRouter swap events.

---

## How to Deactivate Analytics

To immediately disable all analytics tracking in production:
```bash
PUBLIC_ANALYTICS_ENABLED=false
PUBLIC_GA_MEASUREMENT_ID=""
```
This removes the Google Analytics script tag from the HTML build output entirely.
