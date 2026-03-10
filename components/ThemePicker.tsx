"use client";

import { useState } from "react";
import { themes, type Theme, type ThemeVars } from "@/lib/themes";

const FONT_MAP: Record<string, string> = {
  serif: `var(--font-lora), "Lora", "Georgia", serif`,
  "sans-serif": `var(--font-space-grotesk), "Space Grotesk", ui-sans-serif, system-ui, sans-serif`,
  monospace: `"Courier New", "Courier", monospace`,
  cursive: `var(--font-pacifico), "Pacifico", cursive`,
  fantasy: `var(--font-orbitron), "Orbitron", fantasy`,
};

function resolveFont(val: string): string {
  return FONT_MAP[val.trim().toLowerCase()] ?? val;
}

type Props = {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
};

export default function ThemePicker({ theme, onThemeChange }: Props) {
  const [customText, setCustomText] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  async function generateTheme() {
    if (!customText.trim()) return;
    setGenerating(true);
    setError("");
    try {
      const endpoint = process.env.NEXT_PUBLIC_AI_ENDPOINT ?? "";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: customText }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Generation failed");
      }
      const vars = (await res.json()) as ThemeVars;
      vars["--font-heading"] = resolveFont(vars["--font-heading"]);
      vars["--font-body"] = resolveFont(vars["--font-body"]);
      setCustomText("");
      onThemeChange({
        id: "custom",
        name: customText.slice(0, 28),
        emoji: "✨",
        vars,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate. Try again.");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 p-5">
      {/* App header */}
      <div>
        <p className="mb-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-white/25">
          day 02 / 50 projects
        </p>
        <h1
          className="text-2xl font-black tracking-tight text-white"
          style={{ fontFamily: "var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif" }}
        >
          portfolio
          <span className="gradient-text">-skins</span>
        </h1>
        <p className="mt-0.5 text-xs text-white/35">
          Theme switcher for{" "}
          <a
            href="https://reneebe.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 underline-offset-2 hover:text-white/70 hover:underline"
          >
            rb.dev
          </a>
        </p>
      </div>

      {/* Pre-made themes */}
      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">
          Pre-made themes
        </p>
        <div className="flex flex-col gap-0.5">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => onThemeChange(t)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-150 ${
                theme.id === t.id
                  ? "bg-white/8 ring-1 ring-white/10"
                  : "hover:bg-white/5"
              }`}
            >
              <span className="w-5 text-center text-base leading-none">
                {t.emoji}
              </span>
              <span className="flex-1 text-sm font-medium text-white/80">
                {t.name}
              </span>
              <div className="flex gap-0.5">
                {(["--grad-a", "--grad-b", "--grad-c", "--grad-d"] as const).map(
                  (k) => (
                    <div
                      key={k}
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: t.vars[k] }}
                    />
                  )
                )}
              </div>
            </button>
          ))}

          {/* Show custom theme if active */}
          {theme.id === "custom" && (
            <div className="flex items-center gap-3 rounded-xl bg-white/8 px-3 py-2.5 ring-1 ring-white/10">
              <span className="w-5 text-center text-base leading-none">{theme.emoji}</span>
              <span className="flex-1 text-sm font-medium text-white/80">
                {theme.name}
              </span>
              <div className="flex gap-0.5">
                {(["--grad-a", "--grad-b", "--grad-c", "--grad-d"] as const).map(
                  (k) => (
                    <div
                      key={k}
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: theme.vars[k] }}
                    />
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Theme generator */}
      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">
          AI Theme
        </p>
        <textarea
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) generateTheme();
          }}
          placeholder={`"ocean at dusk"\n"retro 80s arcade"\n"deep sea bioluminescence"...`}
          className="w-full resize-none rounded-xl bg-white/5 px-3 py-2.5 text-xs leading-relaxed text-white/70 placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/15"
          rows={3}
        />
        {error && (
          <p className="mt-1.5 text-[11px] text-red-400">{error}</p>
        )}
        <button
          onClick={generateTheme}
          disabled={!customText.trim() || generating}
          className="mt-2 w-full rounded-xl py-2.5 text-xs font-semibold text-white transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          style={{
            background: "linear-gradient(135deg, #f72585, #7209b7)",
          }}
        >
          {generating ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Generating…
            </span>
          ) : (
            "✨ Generate with AI"
          )}
        </button>
        <p className="mt-1.5 text-center text-[10px] text-white/20">
          ⌘↩ to generate
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-white/5 pt-4">
        <a
          href="https://github.com/reneebe/portfolio-skins"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-white/20 transition-colors hover:text-white/40"
        >
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          reneebe/portfolio-skins
        </a>
      </div>
    </div>
  );
}
