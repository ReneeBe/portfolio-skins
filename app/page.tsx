"use client";

import { useState } from "react";
import { themes, type Theme } from "@/lib/themes";
import ThemePicker from "@/components/ThemePicker";
import PortfolioPreview from "@/components/PortfolioPreview";

export default function Home() {
  const [theme, setTheme] = useState<Theme>(themes[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative h-dvh overflow-hidden">
      {/* Full-screen preview */}
      <PortfolioPreview theme={theme} />

      {/* Toggle button — top right */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg ring-1 ring-white/10 transition-all hover:brightness-110 active:scale-95"
        style={{
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <span>🎨</span>
        <span>Themes</span>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-in panel */}
      <div
        className="fixed right-0 top-0 z-40 h-full w-72 overflow-y-auto border-l border-white/5 transition-transform duration-300"
        style={{
          background: "rgba(5,5,10,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <ThemePicker theme={theme} onThemeChange={setTheme} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
}
