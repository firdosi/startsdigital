# Starts Digital - Design System

This document outlines the core styling tokens, guidelines, and constraints for the Starts Digital website. All developers and AI agents must strictly adhere to these rules when building or modifying the UI.

---

## 1. Brand Colors

Our color palette is selected to convey a premium, modern, and high-trust editorial identity. Do not invent new colors or gradients.

| Color Name | Hex Value | Role / Usage |
| :--- | :--- | :--- |
| **Near Black** | `#0B0D10` | Default body background (creates a dark mode feel) |
| **Deep Navy** | `#07111F` | Section backgrounds, card containers, dark offsets |
| **Warm White** | `#F7F7F3` | Primary body text (high contrast against dark backgrounds) |
| **Soft Grey** | `#E8EBEF` | Secondary headers, subtle borders, panel lines |
| **Text Grey** | `#667085` | Supporting paragraphs, captions, footers (accessible contrast) |
| **Primary Blue** | `#246BFD` | CTAs, brand highlights, interactive elements, text links |
| **Teal Accent** | `#10A8A0` | Selective accents, system states, strategy tags |

---

## 2. Typography

We use self-hosted variable font packages to ensure speed, privacy (no external Google Fonts domains), and complete control.

*   **Headings**: `Manrope` (variable font, weights 400 through 800)
*   **Body**: `Inter` (variable font, weights 300 through 700)

### Typographic Scale

| Class / Element | Font Family | Size | Line Height | Tracking | Weights |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title (`h1`)** | Manrope | `2.5rem` (40px) to `4.0rem` (64px) | `1.1` | `-0.02em` | 700, 800 |
| **Section Title (`h2`)** | Manrope | `2.0rem` (32px) to `2.75rem` (44px) | `1.2` | `-0.01em` | 600, 700 |
| **Subhead (`h3`)** | Manrope | `1.5rem` (24px) to `1.75rem` (28px) | `1.3` | `0` | 600 |
| **Body Large** | Inter | `1.125rem` (18px) | `1.6` | `0` | 300, 400 |
| **Body Regular** | Inter | `1.0rem` (16px) | `1.5` | `0` | 400 |
| **Small / Eyebrow** | Inter | `0.75rem` (12px) to `0.875rem` (14px) | `1.4` | `0.1em` (uppercase) | 500, 600 |

---

## 3. Layout & Grid

*   **Max Width**: The primary container has a maximum width of `1200px` (`max-w-7xl` in Tailwind, padded).
*   **Whitespace**: Generous but controlled spacing. Rely on standard Tailwind spacings (`py-12`, `py-24`, `gap-8`).
*   **Content Padding**:
    *   Desktop: Side margins of `2rem` (32px).
    *   Mobile: Side margins of `1.25rem` (20px).

---

## 4. Spacing Scale

Rely strictly on standard Tailwind spacing classes. Avoid arbitrary values where possible.

*   **Small (Sub-components)**: `0.5rem` (8px), `1.0rem` (16px), `1.5rem` (24px)
*   **Medium (Component Layout)**: `2.0rem` (32px), `3.0rem` (48px)
*   **Large (Section Spacing)**: `4.0rem` (64px), `6.0rem` (96px)

---

## 5. UI Elements

### Buttons

Buttons must feel refined and strategic, not bulky.

*   **Primary Variant**: Primary Blue (`#246BFD`) background, Warm White text. Hover state: slightly darker blue or scaling. Sharp to slightly rounded corners (`rounded-lg`).
*   **Secondary Variant**: Transparent background, Soft Grey border, Warm White text. Hover state: Deep Navy background.
*   **Tertiary Variant**: Text-only with Primary Blue or Warm White, matching inline arrow icon (`→`). Focus state: Outline.

### Cards

Cards should not be glassmorphic blobs.
*   **Background**: Deep Navy (`#07111F`) or transparent with subtle border.
*   **Borders**: `1px` solid Soft Grey (`#E8EBEF`) with low opacity (`opacity-10`).
*   **Rounded Corners**: Restrained border radius (`rounded-lg` or `rounded-xl`). Avoid huge rounded cards.
*   **Shadows**: Subtle, soft shadows. Do not use heavy colored glows.

---

## 6. Accessibility & Quality

*   **Interactive Focus**: Interactive elements must have a visible outline state when focused (`outline-none focus-visible:ring-2 focus-visible:ring-primary-blue`).
*   **Contrast**: Always ensure contrast ratio between text and background exceeds 4.5:1.
*   **Reduced Motion**: Support `motion-safe:` and `prefers-reduced-motion` to keep animations optional and subtle.
*   **HTML Semantics**: Use `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<button>`, and `<a>` appropriately. Never use `<div>` for clickable buttons.
*   **Skip-to-Content**: Include a skip link at the top of all pages.

---

## 7. What to Avoid (Anti-patterns)

*   **NO** stock imagery or generic office photography.
*   **NO** neon glowing gradients, glowing borders, or colored shadows.
*   **NO** background glassmorphism overlaying everything.
*   **NO** oversized headings that break readable page flow.
*   **NO** floating social media icons or floating widgets.
*   **NO** random vector blobs, laptop mockups, circuit designs, or robot visuals.
*   **NO** fake charts, stats, client logos, or fabricated testimonials.
