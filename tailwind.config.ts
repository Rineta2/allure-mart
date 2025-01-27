import type { Config } from "tailwindcss";

import daisyui from "daisyui";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        text: "var(--text)",
        title: "var(--title)",
        primary: "var(--primary)",
      },

      container: {
        screens: {
          DEFAULT: "1500px",
        },
        center: true,
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["var(--background)"],
  },
} satisfies Config;
