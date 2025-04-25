// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Удаляем дублирующиеся определения (теперь используем только colors)
      colors: {
        // Основные цвета с CSS-переменными
        background: {
          DEFAULT: "oklch(var(--background) / <alpha-value>)",
          light: "#ffffff",
          dark: "#0f172a",
        },
        foreground: {
          DEFAULT: "oklch(var(--foreground) / <alpha-value>)",
          light: "#1e293b",
          dark: "#f8fafc",
        },

        // Цветовые схемы
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          100: "oklch(0.9 0.1 185)",
          400: "oklch(0.75 0.14 185)",
          600: "oklch(0.6 0.16 185)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          400: "oklch(0.8 0.18 25)",
        },
        success: {
          DEFAULT: "oklch(var(--success) / <alpha-value>)",
          400: "oklch(0.8 0.12 150)",
        },
        gray: {
          DEFAULT: "oklch(var(--gray) / <alpha-value>)",
          50: "oklch(0.98 0.01 250)",
          200: "oklch(0.9 0.02 250)",
          700: "oklch(0.35 0.03 250)",
          900: "oklch(0.15 0.02 250)",
        },
      },
    },
  },
  plugins: [
    // Плагин для генерации CSS-переменных
    function ({ addBase }) {
      addBase({
        ":root": {
          "--background": "1 0 0", // white in oklch
          "--foreground": "0.15 0.02 250", // gray-900
          "--primary": "0.6 0.16 185",
          "--accent": "0.8 0.18 25",
          "--success": "0.8 0.12 150",
          "--gray": "0.15 0.02 250",
        },
        '[data-theme="dark"]': {
          "--background": "0.15 0.02 250", // slate-900
          "--foreground": "0.98 0.01 250", // gray-50
          "--primary": "0.75 0.14 185",
          "--accent": "0.8 0.2 25",
          "--success": "0.8 0.15 150",
          "--gray": "0.98 0.01 250",
        },
      });
    },
  ],
};

export default config;
