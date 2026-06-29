---
name: Editorial Modern
colors:
  surface: '#fdf8f8'
  surface-dim: '#ddd9d8'
  surface-bright: '#fdf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f2'
  surface-container: '#f1edec'
  surface-container-high: '#ebe7e6'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#444748'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e3e2e2'
  on-secondary-container: '#646464'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1d1b1a'
  on-tertiary-container: '#868381'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e6e1df'
  tertiary-fixed-dim: '#cac6c3'
  on-tertiary-fixed: '#1d1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#fdf8f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Playfair Display
    fontSize: 17px
    fontWeight: '400'
    lineHeight: '1.6'
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '400'
    lineHeight: '1.4'
spacing:
  container-max: 1280px
  edge-margin-desktop: 40px
  edge-margin-mobile: 20px
  gutter: 24px
  stack-unit: 8px
  section-gap: 80px
---

## Brand & Style
The design system is rooted in the "Editorial Modern" aesthetic, drawing inspiration from high-end literary journals and legacy news publications. The brand personality is authoritative, intellectual, and timeless, prioritizing legibility and content hierarchy over decorative elements.

The style is a blend of **Minimalism** and **Modern Editorial**. It relies on a rigorous grid, deliberate whitespace, and thin hairline rules rather than shadows or gradients to create structure. The emotional response should be one of calm focus, simulating the tactile experience of reading a premium physical broadsheet or literary magazine.

## Colors
The palette is intentionally restrained to mimic ink on newsprint.

- **Primary Surface (#F7F7F5):** A warm, off-white "newsprint" grey that reduces eye strain compared to pure white and adds a premium, archival feel.
- **Primary Text (#111111):** A deep, rich black used for high-contrast legibility in headlines and body copy.
- **Secondary Text (#767676):** A medium grey reserved for metadata, bylines, and auxiliary information.
- **Borders (#E5E5E5):** Used for structural hairlines (1px rules) to separate sections without adding visual weight.

## Typography
Typography is the primary driver of the design system. It employs a high-contrast pairing of an elegant Serif and a functional Sans-Serif.

- **Serif (Playfair Display):** Used for all narrative content, including headlines, titles, and body copy. Long-form text should utilize `body-md` with generous line-height (1.6) to ensure maximum readability.
- **Sans-Serif (Inter):** Used exclusively for functional UI elements such as navigation, labels, buttons, and captions. These are typically set in uppercase with a `0.05em` letter-spacing to provide a modern, "machine-age" contrast to the classic serif.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy for desktop to maintain the "columnar" feel of a newspaper, transitioning to a fluid stack on mobile.

- **Grid:** 12-column grid for desktop. Use 1px vertical borders between columns for high-density information layouts.
- **Rhythm:** Spacing is built on an 8px scale. However, "Editorial White Space" is prioritized—sections should be separated by large gaps (`section-gap`) to allow content to breathe.
- **Margins:** Desktop margins are generous (40px) to frame the content, acting as a "matte" for the editorial work within.

## Elevation & Depth
This design system rejects the use of shadows and blurs. Depth is achieved through **Tonal Layering** and **Structural Rules**:

- **Flat Hierarchy:** All elements exist on the same Z-index visually.
- **Structural Rules:** 1px solid borders (`#E5E5E5`) are the primary method for separating content blocks. Use `border-b` for list items and `border-r` for sidebars.
- **Inversion:** Dark mode or "Breaking News" callouts use a background of `#111111` with `#F7F7F5` text to create a stark, immediate sense of depth and importance.

## Shapes
The shape language is strictly **Sharp**.

- **Corners:** Use 0px radius for all containers, buttons, and input fields. This reinforces the "cut paper" aesthetic of printed media.
- **Borders:** Hairline 1px borders are the standard. Do not use rounded buttons or pill-shaped tags.

## Components
- **Buttons:**
  - *Primary:* Solid `#111111` background, `#F7F7F5` Inter Uppercase text. Sharp corners.
  - *Secondary:* Transparent background, 1px border, or a simple underline.
- **Input Fields:**
  - "Machine-style": No surrounding box. Only a 1px bottom border (`border-b`). On focus, the border color transitions to `#111111`.
- **Chips / Tags:**
  - Small, rectangular boxes with 1px borders. Text is `label-md` (Inter, Uppercase).
- **Cards:**
  - Defined by spacing and 1px bottom separators rather than containers. Images should be full-width within their column span, with captions in `label-md` immediately below.
- **Navigation:**
  - Horizontal list of `label-lg` links separated by generous spacing. A thin 1px rule usually sits below the entire navigation bar.
- **Lists:**
  - Use 1px horizontal rules between items. For editorial lists, use large serif numbers (Playfair Display) as indicators.