"use client";

import { useState } from "react";
import { themes, type Theme } from "@/lib/themes";
import ThemePicker from "@/components/ThemePicker";
import PortfolioPreview from "@/components/PortfolioPreview";

export default function Home() {
  const [theme, setTheme] = useState<Theme>(themes[0]);

  return (
    <div className="flex h-dvh overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 flex-shrink-0 overflow-y-auto border-r border-white/5 bg-black/20">
        <ThemePicker theme={theme} onThemeChange={setTheme} />
      </aside>

      {/* Preview */}
      <main className="relative flex-1 overflow-hidden">
        <PortfolioPreview theme={theme} />
      </main>
    </div>
  );
}
