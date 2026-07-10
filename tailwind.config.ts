import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta inspirada no logótipo da X Íntimo.
        cream: "#FAF8F5", // fundo off-white
        sand: "#F1ECE5", // superfícies suaves
        ink: {
          DEFAULT: "#1A1A1A", // preto principal
          soft: "#3A3733",
          muted: "#6B655E",
        },
        accent: {
          DEFAULT: "#C1351D", // vermelho/laranja escuro (círculo do logo)
          dark: "#9A2A16",
          soft: "#E8755C",
          tint: "#FBEDE9",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(26, 26, 26, 0.12)",
        card: "0 6px 24px -8px rgba(26, 26, 26, 0.10)",
        lift: "0 24px 60px -20px rgba(26, 26, 26, 0.22)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-22px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
