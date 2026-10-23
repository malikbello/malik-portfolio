"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle light or dark theme"
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-border text-brand-muted transition-colors hover:border-brand-accent hover:text-brand-accent ${className ?? ""}`}
    >
      {/* Which icon shows is driven by the data-theme attribute via CSS, not
          React state — avoids a setState-in-effect render cascade and any
          SSR/client hydration mismatch, since both icons render identically
          on the server either way. */}
      <Sun className="h-4 w-4 [html[data-theme=light]_&]:hidden" />
      <Moon className="hidden h-4 w-4 [html[data-theme=light]_&]:block" />
    </button>
  );
}
