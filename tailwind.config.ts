import type { Config } from "tailwindcss";

/** Colours resolve to the CSS variables defined in src/app/globals.css. */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: token("background"),
        surface: {
          DEFAULT: token("surface"),
          raised: token("surface-raised"),
        },
        foreground: token("foreground"),
        muted: token("muted"),
        border: {
          DEFAULT: token("border"),
          /** border-border-strong — for control outlines. See globals.css. */
          strong: token("border-strong"),
        },
        ring: token("ring"),
        danger: token("danger"),
        accent: {
          DEFAULT: token("accent"),
          hover: token("accent-hover"),
          foreground: token("accent-foreground"),
        },
      },
      fontFamily: {
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
        content: "72rem",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
