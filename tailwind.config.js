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
          100: "oklch(var(--color-primary-100))",
          400: "oklch(var(--color-primary-400))",
          600: "oklch(var(--color-primary-600))",
        },
        accent: {
          400: "oklch(var(--color-accent-400))",
        },
        success: {
          400: "oklch(var(--color-success-400))",
        },
        gray: {
          50: "oklch(var(--color-gray-50))",
          200: "oklch(var(--color-gray-200))",
          700: "oklch(var(--color-gray-700))",
          900: "oklch(var(--color-gray-900))",
        },
      },
    },
  },
};
