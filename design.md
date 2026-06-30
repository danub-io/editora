---
name: GospelReads Design System
colors:
  surface: '#ffffff'
  surface-dim: '#f3f4f6'
  on-surface: '#111827'
  on-surface-variant: '#6b7280'
  primary: '#6366f1'
  primary-hover: '#4f46e5'
  secondary: '#e5e7eb'
  border-color: '#e5e7eb'
editor-colors:
  light-bg: '#fbf9f5'
  light-paper: '#ffffff'
  dark-bg: '#09090b'
  dark-paper: '#121214'
typography:
  interface: 'font-sans'
  writing: 'font-serif'
rounded:
  DEFAULT: '0.5rem'
---

## Brand & Style

This design system embodies a modern, high-utility SaaS aesthetic for GospelReads., prioritizing clarity, readability, and clean typography.

The general aesthetic is **Modern Corporate Minimalism** (based on Flowrift and Flowbite): generous whitespace, standard Tailwind utility classes, and crisp contrast.

## 1. Colors & Theme

*   **Primary (Brand):** Indigo-500 (`#6366F1`) as the main action color for CTAs, focus indicators, and active states.
*   **Secondary (Surface Tones):** Pure white (`#FFFFFF` / `bg-white`) for main content backings, and Gray-100 (`#F3F4F6` / `bg-gray-100`) for card layers, section headers, and dividers.
*   **Typography Colors:**
    *   **Headings:** `text-gray-900` (Light) and `text-zinc-100` (Dark).
    *   **Body Copy:** `text-gray-500` / `text-gray-600` (Light) and `text-zinc-400` (Dark).
    *   **Subtle Metadata:** `text-gray-400` (Light) and `text-zinc-550` (Dark).

## 2. Typography

*   **Public/Interface:** **Inter** or standard system sans-serif (`font-sans`) for landing pages, settings, layouts, and menus.
*   **Weights:** Headings use heavy weights (`font-bold`, `font-extrabold`), body text uses `font-normal`, and buttons/navigation items use `font-semibold`.

## 3. Shapes & Spacing

*   **Roundedness:** **Rounded-LG** (`rounded-lg` / `0.5rem`) is the standard for all primary buttons, inputs, and card containers.
*   **Layout:** Centered desktop grids (max-width `1280px` / `max-w-screen-xl` or `max-w-screen-2xl`). Component vertical rhythm is managed with 8px/4px base units.

## 4. Components

### Buttons
*   **Primary:** `bg-indigo-500 text-white hover:bg-indigo-600 active:bg-indigo-700 rounded-lg text-sm font-semibold transition`
*   **Secondary:** `bg-gray-200 text-gray-500 hover:bg-gray-300 rounded-lg text-sm font-semibold transition` (Dark: `bg-zinc-800 text-zinc-300 hover:bg-zinc-700`).

### Input Fields
*   **Styling:** White background (`bg-white`), `border-gray-300`, `rounded-lg` (8px). Uses `focus:ring-2 focus:ring-indigo-300`.

---

## 5. Editor Design Style (Exception)

Unlike the clean SaaS/Marketing interface, the **Manuscritos Editor** uses a dedicated **Distraction-Free Writing Workspace** style optimized for long-form reading and writing comfort.

### Colors & Interface (Editor Only)
*   **Background:** Soft, warm paper tones in light mode (`bg-[#fbf9f5]`) to reduce eye strain, and deep zinc-black in dark mode (`bg-[#09090b]`).
*   **Writing Board:** Pure white sheet (`bg-white`) in light mode and deep paper charcoal (`bg-[#121214]`) in dark mode, framed by subtle low-contrast borders.

### Typography & Layout (Editor Only)
*   **Serif Fonts:** Exclusive use of serif typefaces (`font-serif` / Georgia / Times) in the writing sheet area.
*   **Sizing & Height:** Generous letter size (`text-lg` or `text-xl`) with relaxed line heights (`leading-relaxed` or `leading-loose`).
*   **Writing Space Constraints:** The writing board has a restricted width (`max-w-2xl` or `max-w-3xl`) to limit characters per line (optimally 65–75 chars).
*   **Clean Sides:** Sidebars and utility bars are thin, low-contrast, and collapsible to maximize focus on the paper.
