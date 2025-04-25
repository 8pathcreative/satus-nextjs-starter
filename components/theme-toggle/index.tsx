"use client";
import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 50,
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 24,
        color: "var(--color-text, #222)",
      }}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
