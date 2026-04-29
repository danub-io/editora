import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        /* === Material Design 3 Palette === */
        background: "#fdf7ff",
        "on-background": "#1d1b20",
        surface: "#fdf7ff",
        "on-surface": "#1d1b20",
        "on-surface-variant": "#494551",
        "surface-bright": "#fdf7ff",
        "surface-dim": "#ded8e0",
        "surface-tint": "#6750a4",
        "surface-variant": "#e6e0e9",
        "surface-container": "#f2ecf4",
        "surface-container-low": "#f8f2fa",
        "surface-container-high": "#ece6ee",
        "surface-container-highest": "#e6e0e9",
        "surface-container-lowest": "#ffffff",
        "inverse-surface": "#322f35",
        "inverse-on-surface": "#f5eff7",
        "inverse-primary": "#cfbcff",

        primary: {
          DEFAULT: "#4f378a",
          foreground: "#ffffff",
        },
        "on-primary": "#ffffff",
        "primary-container": "#6750a4",
        "on-primary-container": "#e0d2ff",
        "primary-fixed": "#e9ddff",
        "primary-fixed-dim": "#cfbcff",
        "on-primary-fixed": "#22005d",
        "on-primary-fixed-variant": "#4f378a",

        secondary: {
          DEFAULT: "#63597c",
          foreground: "#ffffff",
        },
        "on-secondary": "#ffffff",
        "secondary-container": "#e1d4fd",
        "on-secondary-container": "#645a7d",
        "secondary-fixed": "#e9ddff",
        "secondary-fixed-dim": "#cdc0e9",
        "on-secondary-fixed": "#1f1635",
        "on-secondary-fixed-variant": "#4b4263",

        tertiary: "#765b00",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#c9a74d",
        "on-tertiary-container": "#503d00",
        "tertiary-fixed": "#ffdf93",
        "tertiary-fixed-dim": "#e7c365",

        error: {
          DEFAULT: "#ba1a1a",
          foreground: "#ffffff",
        },
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",

        outline: "#7a7582",
        "outline-variant": "#cbc4d2",

        /* === shadcn/ui compatibility mappings === */
        border: "#cbc4d2",
        input: "#cbc4d2",
        ring: "#6750a4",
        foreground: "#1d1b20",
        muted: {
          DEFAULT: "#e6e0e9",
          foreground: "#494551",
        },
        accent: {
          DEFAULT: "#e6e0e9",
          foreground: "#1d1b20",
        },
        destructive: {
          DEFAULT: "#ba1a1a",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#1d1b20",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1d1b20",
        },
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
      spacing: {
        gutter: "1rem",
        "sidebar-width": "256px",
        "container-padding": "2rem",
        "max-editor-width": "800px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "editor-text": [
          "18px",
          { lineHeight: "1.8", letterSpacing: "0.01em", fontWeight: "400" },
        ],
        h1: [
          "36px",
          { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "ui-body": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        h2: [
          "30px",
          { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        "ui-label": ["12px", { lineHeight: "16px", fontWeight: "500" }],
        h3: [
          "24px",
          { lineHeight: "1.4", letterSpacing: "0em", fontWeight: "600" },
        ],
        "editor-chapter": [
          "28px",
          { lineHeight: "1.5", fontWeight: "500" },
        ],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;