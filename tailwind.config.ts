import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "bounce-x": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-12%)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
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
        "fade-in-up": "fade-in-up .4s cubic-bezier(.22,1,.36,1) both",
        "bounce-x": "bounce-x 1.2s ease-in-out infinite",
        shimmer: "shimmer 1.2s linear infinite",
        "accordion-down": "accordion-down .25s ease-out",
        "accordion-up": "accordion-up .2s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
