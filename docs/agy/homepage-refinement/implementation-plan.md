# Implementation Plan - Homepage Visual Refinements & Mobile Readability

This plan proposes visual refinements for the Starts Digital homepage to improve mobile readability, layout scanability, and typographic hierarchy, without adding stock images, fake charts, or heavy animations.

## User Review Required

> [!IMPORTANT]
> - **No `text-2xs` for Public Content**: We will remove `text-2xs` from all public copy and replace it with `text-xs` (12px) for labels and tags, or `text-base` (16px) for body copy.
> - **`brand-muted-dark` Token**: We will use the new `#98A2B3` color token for secondary and paragraph text on dark backgrounds to improve contrast.
> - **Selected Work Redesign**: We will replace the table-like row layout and tiny tags with premium editorial panel rows. Each project will have a prominent Outcome statement, a short readable services list, and a distinct numbered layout.
> - **Unbuilt / Sitemap Safeguards**: We will verify that sitemap exclusions remain active and no unbuilt page links are restored.

---

## Proposed Changes

### Reusable UI and Layout

#### [MODIFY] [SectionHeading.astro](src/components/ui/SectionHeading.astro)
- Adjust the light and dark text colors to use `text-brand-muted-dark` in dark mode for better readability.

---

### Navigation Components

#### [MODIFY] [Header.astro](src/components/layout/Header.astro)
- Enlarge logo wordmark to `text-xl md:text-2xl`.
- Enlarge mobile hamburger toggle interactive target area to `44px` (`p-3` or `w-11 h-11`).
- Maintain fixed position and check mobile paddings.

#### [MODIFY] [Footer.astro](src/components/layout/Footer.astro)
- Enlarge logo wordmark.
- Ensure link list copy is at least `text-sm` or `text-base` (no low opacity or tiny text).
- Increase spacing between sections, links, and copyright text.

---

### Homepage Sections

#### [MODIFY] [index.astro](src/pages/index.astro) (Hero section layout inline)
- Adjust mobile text size of hero paragraph to `text-base sm:text-lg leading-relaxed text-brand-muted-dark`.
- Increase mobile padding/gap between hero copy and buttons.
- Remove the hover-only `Active →` indicators from capabilities list rows to simplify layout on touch screens.
- Enhance vertical rhythm between hero elements.

#### [MODIFY] [Results.astro](src/components/sections/Results.astro)
- Convert mobile layout to a clean 2-column grid (`grid grid-cols-2 lg:grid-cols-4 gap-8`).
- Set figures to `text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-blue`.
- Set wording text to `text-sm sm:text-base text-brand-text font-normal leading-normal` (clear paragraph spacing, no rounded cards).

#### [MODIFY] [Services.astro](src/components/sections/Services.astro)
- Enlarge numbers to `text-sm` or `text-base` in `text-brand-teal` with solid weights.
- Enlarge service titles to `text-xl md:text-2xl font-bold`.
- Ensure descriptions are at least `text-base` (16px) using `text-brand-muted-dark`.
- Add clean border dividers and spacing between services.

#### [MODIFY] [SelectedWork.astro](src/components/sections/SelectedWork.astro)
- Remove tiny chips and replace with a short readable services sentence: *"Services: Meta advertising, digital strategy..."*
- Make the outcome block visually dominant with larger bold text.
- Re-layout each project row into an editorial panel.
- Simplify the coming next note.

#### [MODIFY] [Process.astro](src/components/sections/Process.astro)
- Re-layout on mobile to a vertical timeline/sequence with visible spacing.
- Enlarge numbers (`text-3xl` or `text-4xl` in `text-brand-blue`).
- Enlarge step titles and set descriptions to `text-base` (16px) with `text-brand-muted-dark`.

#### [MODIFY] [WhyUs.astro](src/components/sections/WhyUs.astro)
- Replace plain dashes with a clean `@lucide/astro` icon (e.g. `ArrowUpRight` or `Check`) to act as list bullets.
- Ensure description text is at least `text-base` (16px).
- Add generous spacing between differentiators.

#### [MODIFY] [AboutPreview.astro](src/components/sections/AboutPreview.astro)
- Split dense strategic paragraph into two shorter, highly readable paragraphs.
- Add supporting uppercase tracking eyebrow label: `MARKETING + TECHNOLOGY + EXECUTION`.

#### [MODIFY] [ContactCTA.astro](src/components/sections/ContactCTA.astro)
- Increase vertical padding (`py-28 md:py-36`).
- Set CTA buttons to be full width on mobile (`w-full sm:w-auto`).
- Set a minimum comfortable button height (`py-3.5`).
- Enlarge direct email/phone text sizes to `text-base md:text-lg`.
- Add distinct spacing between headline, buttons, and direct contact details.

---

## Verification Plan

### Automated Validation Checks
- `npm run check` to verify TypeScript typings.
- `npm run build` to verify static file generation.

### Manual Verification Checks
- Verify `text-2xs` is completely gone.
- Verify sitemap exclusions for `/style-guide` remain active.
- Verify focus outline contrast.
