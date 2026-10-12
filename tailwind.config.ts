import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Source Sans Pro", "sans-serif"],
        serif: ["Source Serif Pro", "serif"],
      },
      // Type scale: a ~1.25 ratio off an 18px body. Headings scale fluidly between a
      // phone and a ~1100px viewport; tracking tightens as size grows. Use the
      // .type-* classes in globals.css rather than these tokens directly.
      fontSize: {
        h1: ["clamp(2.5rem, 1.75rem + 2.5vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.75rem, 1.375rem + 1.25vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        h3: ["clamp(1.25rem, 1.0625rem + 0.625vw, 1.5rem)", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        h4: ["1.125rem", { lineHeight: "1.4", letterSpacing: "0" }],
        body: ["clamp(1.0625rem, 1rem + 0.25vw, 1.125rem)", { lineHeight: "1.6", letterSpacing: "0" }],
        small: ["1rem", { lineHeight: "1.55", letterSpacing: "0" }],
        caption: ["0.875rem", { lineHeight: "1.45", letterSpacing: "0" }],
        eyebrow: ["0.8125rem", { lineHeight: "1.2", letterSpacing: "0.08em" }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom colors from Figma
        portfolio: {
          background: "#ffffff",
          card: "#f5f5f5",
          header: "#000000",
          text: {
            primary: "#000000",
            secondary: "#333333",
            muted: "#666666",
          },
          accent: {
            teal: "#22A3B4", // Updated from #4EB1B3 for better contrast
            green: "#16a34a",
            lime: "#65a30d",
            gray: "#e5e5e5",
            lightgray: "#f5f5f5",
            white: "#ffffff",
            lightblue: "#f0f9ff",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
} satisfies Config

export default config
