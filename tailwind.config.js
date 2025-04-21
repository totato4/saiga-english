/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      bg: {
        light: "#ffffff", // Белый фон (светлая тема)
        dark: "#0f172a", // Темный фон (темная тема)
      },
      text: {
        light: "#1e293b", // Темный текст (светлая тема)
        dark: "#f8fafc", // Белый текст (темная тема)
      },
      colors: {
        primary: {
          100: "oklch(0.9 0.1 185))",
          400: "oklch(0.75 0.14 185)",
          600: "oklch(0.6 0.16 185)",
        },
        accent: {
          400: "oklch(0.8 0.18 25)",
        },
        success: {
          400: "oklch(0.8 0.12 150)",
        },
        gray: {
          50: "oklch(0.98 0.01 250)",
          200: "oklch(0.9 0.02 250)",
          700: "oklch(0.35 0.03 250)",
          900: "oklch(0.15 0.02 250)",
        },
      },
    },
  },
};
