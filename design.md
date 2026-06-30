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

---

## 6. Standardized UI Components & Typography

These style patterns are standard across all public pages of the project.

### 6.1 Hero Elements
- **Hero Title:** `mb-8 text-center text-4xl font-bold text-white sm:text-5xl md:mb-12 md:text-6xl`
  - *Example:* "Escreva, publique e lucre. Sua jornada começa aqui."
- **Hero Subtitle:** `mb-4 text-center text-lg text-indigo-200 sm:text-xl md:mb-8`
  - *Example:* "Plataforma para Autores Autônomos"

### 6.2 Sections
- **Section Title:** `mb-4 text-2xl font-bold text-gray-900 dark:text-zinc-100 md:mb-6 lg:text-3xl uppercase tracking-tight` (with `text-center` for centered sections).
  - *Example:* "OUR COMPETITIVE ADVANTAGE"
- **Section Subtitle:** `text-gray-500 dark:text-zinc-400 text-sm md:text-lg` (with `mx-auto max-w-screen-md text-center` for centered layout).
  - *Example:* "Foque na escrita. Nós cuidamos da formatação..."
- **Section Link:** `text-sm font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 hover:text-indigo-650 dark:hover:text-indigo-300 flex items-center gap-1.5 cursor-pointer transition-colors`
  - *Example:* "Explorar Catálogo Completo"

### 6.3 Badges
- **Badge Style:** `text-sm font-bold text-indigo-500 dark:text-indigo-400 tracking-[0.2em] uppercase font-mono bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/50 w-fit block`
  - *Example:* "DIAGRAMAÇÃO INTEGRADA"

### 6.4 Cards
- **Card Title:** `mb-2 text-lg font-semibold text-gray-900 dark:text-zinc-100 md:text-xl`
  - *Example:* "Editor de Escrita Professional"
- **Card Text:** `mb-4 text-gray-500 dark:text-zinc-400 text-sm leading-relaxed`
  - *Example:* "Um ambiente sem distrações..."
- **Card Link:** `font-bold text-indigo-550 dark:text-indigo-400 transition duration-100 hover:text-indigo-600 dark:hover:text-indigo-300 flex items-center gap-1 text-sm`
  - *Example:* "Escrever"

### 6.5 Books
- **Book Title:** `font-bold text-sm uppercase truncate text-gray-900 dark:text-zinc-100 tracking-tight leading-none`
- **Book Author:** `text-sm text-gray-400 dark:text-zinc-500 uppercase tracking-wider truncate`
  - *Example:* "Luana Costa"

### 6.6 Footer
- **Footer Navigation & Social Links:** Standard `text-sm text-gray-500 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition duration-100`
- **Footer Copyright:** `text-sm text-gray-400 dark:text-zinc-500`

### 6.7 Minimum Font Size Constraint
- No font size in the project should be smaller than `text-sm` (14px). Any legacy usages of `text-xs`, `text-[10px]`, `text-[11px]` on text elements have been standardized to `text-sm` to ensure maximum legibility.
