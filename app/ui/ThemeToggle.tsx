"use client"; // Для Next.js 13+

import { useState, useEffect } from "react";

export default function ThemeSwitcher() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Проверяем предпочтения системы или сохранённую тему
    const isDark =
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none"
      aria-label="Переключить тему"
    >
      <span
        className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white dark:bg-yellow-300 shadow-md transform transition-transform duration-300 ${
          darkMode ? "translate-x-6" : ""
        }`}
      >
        {darkMode ? (
          <span className="absolute inset-0 flex items-center justify-center">
            🌙
          </span>
        ) : (
          <span className="absolute inset-0 flex items-center justify-center">
            ☀️
          </span>
        )}
      </span>
    </button>
  );
}
