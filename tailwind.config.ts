import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme 1: Warm Espresso & Terracotta (Default)
        canvas: {
          DEFAULT: "var(--color-surface, #FAF8F5)",       // Warm Alabaster
          subtle: "var(--color-surface-subtle, #F3EFEA)", // Light Biscuit Linen
          card: "var(--color-surface-card, #EFECE6)",     // Soft Oat
        },
        primary: {
          DEFAULT: "var(--color-primary, #D95D39)",       // Burnt Terracotta
          hover: "var(--color-primary-hover, #C24D2B)",
          faint: "var(--color-primary-faint, rgba(217, 93, 57, 0.08))",
        },
        brand: {
          DEFAULT: "var(--color-primary, #D95D39)",
          hover: "var(--color-primary-hover, #C24D2B)",
          faint: "var(--color-primary-faint, rgba(217, 93, 57, 0.08))",
        },
        secondary: {
          DEFAULT: "var(--color-secondary, #D95D39)",     // Burnt Terracotta Badges
          hover: "var(--color-secondary-hover, #C24D2B)",
          faint: "var(--color-secondary-faint, rgba(217, 93, 57, 0.12))",
        },
        badge: {
          DEFAULT: "var(--color-secondary, #D95D39)",
          hover: "var(--color-secondary-hover, #C24D2B)",
          faint: "var(--color-secondary-faint, rgba(217, 93, 57, 0.12))",
        },
        border: {
          DEFAULT: "var(--color-border, #DDD6CC)",        // Oat Border
          subtle: "var(--color-border-subtle, #E8E2D9)",
          strong: "var(--color-border-strong, #C4BAAC)",
        },
        ink: {
          DEFAULT: "var(--color-text, #1E1B18)",          // Deep Espresso
          secondary: "var(--color-text-secondary, #6E675F)", // Warm Taupe
          faint: "var(--color-text-faint, #9C948B)",
        },
        accent: {
          DEFAULT: "var(--color-primary, #D95D39)",       // Burnt Terracotta
          hover: "var(--color-primary-hover, #C24D2B)",
          faint: "var(--color-primary-faint, rgba(217, 93, 57, 0.08))",
        },
        dietary: {
          veg: "#15803D",     // Soft leaf green
          nonveg: "#BE123C",  // Soft ruby red
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        hand: ["var(--font-hand)", "cursive", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
      borderWidth: {
        hairline: "1px",
      },
    },
  },
  plugins: [],
};

export default config;
