# Starts Digital — Phase 2A Visual Evidence & Technical Audit

This directory contains the visual verification evidence captured for the Starts Digital Phase 2A client wall layout and keyboard focus accessibility implementation.

## Commit Metadata
- **Main Source Commit SHA**: `27361377ada0ecad04b12795e2f59a5fb0de92f4`
- **Evidence Branch**: `audit-phase-2a-evidence`

## Measured Row Arrays
- **390px (Mobile)**: `[2, 2, 2, 2, 2, 2, 1]`
- **768px (Tablet)**: `[3, 3, 3, 3, 1]`
- **1440px (Desktop)**: `[5, 5, 3]`

## Focus Computed Styles
- **Black Gold Logo Link**:
  - `matches(':focus-visible')`: `true`
  - `outlineStyle`: `solid`
  - `outlineWidth`: `2px`
  - `outlineColor`: `rgb(8, 30, 51)` / `#ff762b`
  - `outlineOffset`: `1px`
- **ConvortAI Logo Link**:
  - `matches(':focus-visible')`: `true`
  - `outlineStyle`: `solid`
  - `outlineWidth`: `3px`
  - `outlineColor`: `rgb(6, 29, 51)` / `#ff762b`
  - `outlineOffset`: `0px`
- **RK Reno Solutions Logo Link**:
  - `matches(':focus-visible')`: `true`
  - `outlineStyle`: `solid`
  - `outlineWidth`: `3px`
  - `outlineColor`: `rgb(6, 29, 51)`
  - `outlineOffset`: `0px`
- **Form Input Focus (Contact Page)**:
  - `outlineStyle`: `none`
  - `borderColor`: `oklab(0.869 -0.00647109 -0.0210268)` (preserves site-wide focus rule without forced duplicate rules)

## Direct Raw Evidence Links
1. [client-wall-390.png](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-2a-evidence/audit-evidence/phase-2a/client-wall-390.png) (Mobile Viewport: 390px × 844px)
2. [client-wall-768.png](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-2a-evidence/audit-evidence/phase-2a/client-wall-768.png) (Tablet Viewport: 768px × 1024px)
3. [client-wall-1440.png](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-2a-evidence/audit-evidence/phase-2a/client-wall-1440.png) (Desktop Viewport: 1440px × 900px)
4. [client-wall-first-row.png](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-2a-evidence/audit-evidence/phase-2a/client-wall-first-row.png) (Desktop First Row Close-Up: 5 Items)
5. [client-wall-final-row.png](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-2a-evidence/audit-evidence/phase-2a/client-wall-final-row.png) (Desktop Final Row Close-Up: 3 Centred Items)
6. [dark-logo-plates.png](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-2a-evidence/audit-evidence/phase-2a/dark-logo-plates.png) (Compact Dark Logo Container Plates)
7. [convortai-caption.png](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-2a-evidence/audit-evidence/phase-2a/convortai-caption.png) (ConvortAI Technology Partner Caption & Focus)
8. [optical-logo-contact-sheet.png](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-2a-evidence/audit-evidence/phase-2a/optical-logo-contact-sheet.png) (Desktop Contact Sheet: All 13 Rendered Brands)
9. [keyboard-focus.png](https://raw.githubusercontent.com/firdosi/startsdigital/audit-phase-2a-evidence/audit-evidence/phase-2a/keyboard-focus.png) (Keyboard Focus State Verification)
