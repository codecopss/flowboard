// src/components/ThemeToggle.jsx
import React from "react";
import { useThemeContext } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <button
      onClick={toggleTheme}
      title="Toggle theme"
      className={`p-2 rounded-md hover:bg-slate-200/10 transition ${className}`}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
