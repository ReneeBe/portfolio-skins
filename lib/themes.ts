export type ThemeVars = {
  "--background": string;
  "--foreground": string;
  "--blob-1": string;
  "--blob-2": string;
  "--blob-3": string;
  "--blob-4": string;
  "--blob-opacity": string;
  "--blob-blur": string;
  "--grad-a": string;
  "--grad-b": string;
  "--grad-c": string;
  "--grad-d": string;
  "--glass-bg": string;
  "--glass-border": string;
  "--glass-strong-bg": string;
  "--glass-strong-border": string;
  "--blur-glass": string;
  "--blur-glass-strong": string;
  "--font-heading": string;
  "--font-body": string;
  "--bg-pattern": string;
};

export type Theme = {
  id: string;
  name: string;
  emoji: string;
  vars: ThemeVars;
};

const SPACE_GROTESK = `var(--font-space-grotesk), "Space Grotesk", ui-sans-serif, system-ui, sans-serif`;
const INTER = `var(--font-inter), "Inter", ui-sans-serif, system-ui, sans-serif`;
const ORBITRON = `var(--font-orbitron), "Orbitron", sans-serif`;
const LORA = `var(--font-lora), "Lora", "Georgia", serif`;
const MONO = `"Courier New", "Courier", monospace`;

// Horizontal CRT scanlines — hard stops, no gradient
const AMBER_SCANLINES =
  "repeating-linear-gradient(rgba(255,176,0,0.08) 0px, rgba(255,176,0,0.08) 1px, transparent 1px, transparent 6px)";

export const themes: Theme[] = [
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    emoji: "\uD83C\uDF06",
    vars: {
      "--background": "#050510",
      "--foreground": "#f0f0f8",
      "--blob-1": "#f72585",
      "--blob-2": "#7209b7",
      "--blob-3": "#3a86ff",
      "--blob-4": "#06d6a0",
      "--blob-opacity": "0.18",
      "--blob-blur": "120px",
      "--grad-a": "#f72585",
      "--grad-b": "#7209b7",
      "--grad-c": "#3a86ff",
      "--grad-d": "#06d6a0",
      "--glass-bg": "rgba(255, 255, 255, 0.08)",
      "--glass-border": "rgba(255, 255, 255, 0.12)",
      "--glass-strong-bg": "rgba(255, 255, 255, 0.13)",
      "--glass-strong-border": "rgba(255, 255, 255, 0.18)",
      "--blur-glass": "20px",
      "--blur-glass-strong": "32px",
      "--font-heading": SPACE_GROTESK,
      "--font-body": INTER,
      "--bg-pattern": "none",
    },
  },
  {
    id: "light",
    name: "Light Mode",
    emoji: "\u2600\uFE0F",
    vars: {
      "--background": "#f0eef8",
      "--foreground": "#0a0a12",
      "--blob-1": "#c77dff",
      "--blob-2": "#7b9cff",
      "--blob-3": "#ff9ecd",
      "--blob-4": "#72efdd",
      "--blob-opacity": "0.10",
      "--blob-blur": "140px",
      "--grad-a": "#9b5de5",
      "--grad-b": "#5b8cff",
      "--grad-c": "#f15bb5",
      "--grad-d": "#00bbf9",
      "--glass-bg": "rgba(255, 255, 255, 0.50)",
      "--glass-border": "rgba(0, 0, 0, 0.08)",
      "--glass-strong-bg": "rgba(255, 255, 255, 0.70)",
      "--glass-strong-border": "rgba(0, 0, 0, 0.12)",
      "--blur-glass": "20px",
      "--blur-glass-strong": "32px",
      "--font-heading": SPACE_GROTESK,
      "--font-body": INTER,
      "--bg-pattern": "none",
    },
  },
  {
    id: "neon-tokyo",
    name: "Neon Tokyo",
    emoji: "\uD83C\uDF38",
    vars: {
      "--background": "#0a0015",
      "--foreground": "#ffe4f7",
      "--blob-1": "#ff0090",
      "--blob-2": "#00f5ff",
      "--blob-3": "#7b2fff",
      "--blob-4": "#ff6b00",
      "--blob-opacity": "0.20",
      "--blob-blur": "130px",
      "--grad-a": "#ff0090",
      "--grad-b": "#7b2fff",
      "--grad-c": "#00f5ff",
      "--grad-d": "#ff6b00",
      "--glass-bg": "rgba(255, 255, 255, 0.08)",
      "--glass-border": "rgba(255, 255, 255, 0.12)",
      "--glass-strong-bg": "rgba(255, 255, 255, 0.13)",
      "--glass-strong-border": "rgba(255, 255, 255, 0.18)",
      "--blur-glass": "28px",
      "--blur-glass-strong": "44px",
      "--font-heading": ORBITRON,
      "--font-body": INTER,
      "--bg-pattern": "none",
    },
  },
  {
    id: "sunset",
    name: "Sunset",
    emoji: "\uD83C\uDF05",
    vars: {
      "--background": "#0f0005",
      "--foreground": "#fff0e8",
      "--blob-1": "#ff6b35",
      "--blob-2": "#ef233c",
      "--blob-3": "#ffbe0b",
      "--blob-4": "#f7c59f",
      "--blob-opacity": "0.20",
      "--blob-blur": "150px",
      "--grad-a": "#ff6b35",
      "--grad-b": "#ef233c",
      "--grad-c": "#ffbe0b",
      "--grad-d": "#f7c59f",
      "--glass-bg": "rgba(255, 255, 255, 0.08)",
      "--glass-border": "rgba(255, 255, 255, 0.12)",
      "--glass-strong-bg": "rgba(255, 255, 255, 0.13)",
      "--glass-strong-border": "rgba(255, 255, 255, 0.18)",
      "--blur-glass": "24px",
      "--blur-glass-strong": "40px",
      "--font-heading": LORA,
      "--font-body": LORA,
      "--bg-pattern": "none",
    },
  },
  {
    id: "retro-terminal",
    name: "Retro Terminal",
    emoji: "\uD83D\uDFE0",
    vars: {
      "--background": "#0c0800",
      "--foreground": "#ffb000",
      "--blob-1": "#ffb000",
      "--blob-2": "#ff8c00",
      "--blob-3": "#ffd700",
      "--blob-4": "#ff6600",
      "--blob-opacity": "0",
      "--blob-blur": "80px",
      "--grad-a": "#ffb000",
      "--grad-b": "#ff8c00",
      "--grad-c": "#ffd700",
      "--grad-d": "#ff6600",
      "--glass-bg": "rgba(255, 176, 0, 0.10)",
      "--glass-border": "rgba(255, 176, 0, 0.20)",
      "--glass-strong-bg": "rgba(255, 176, 0, 0.15)",
      "--glass-strong-border": "rgba(255, 176, 0, 0.28)",
      "--blur-glass": "12px",
      "--blur-glass-strong": "20px",
      "--font-heading": MONO,
      "--font-body": MONO,
      "--bg-pattern": AMBER_SCANLINES,
    },
  },
  {
    id: "forest",
    name: "Forest",
    emoji: "\uD83C\uDF32",
    vars: {
      "--background": "#060e07",
      "--foreground": "#c8e6b4",
      "--blob-1": "#2d6a2d",
      "--blob-2": "#4a7c59",
      "--blob-3": "#8bc34a",
      "--blob-4": "#c5a028",
      "--blob-opacity": "0.20",
      "--blob-blur": "130px",
      "--grad-a": "#4caf50",
      "--grad-b": "#2e7d32",
      "--grad-c": "#8bc34a",
      "--grad-d": "#c5a028",
      "--glass-bg": "rgba(255, 255, 255, 0.08)",
      "--glass-border": "rgba(200, 230, 180, 0.14)",
      "--glass-strong-bg": "rgba(255, 255, 255, 0.13)",
      "--glass-strong-border": "rgba(200, 230, 180, 0.22)",
      "--blur-glass": "24px",
      "--blur-glass-strong": "40px",
      "--font-heading": LORA,
      "--font-body": LORA,
      "--bg-pattern": "none",
    },
  },
  {
    id: "desert-sand",
    name: "Desert Sand",
    emoji: "\uD83C\uDFDC\uFE0F",
    vars: {
      "--background": "#faf0dc",
      "--foreground": "#2c1810",
      "--blob-1": "#e07b4a",
      "--blob-2": "#c4622d",
      "--blob-3": "#d4a853",
      "--blob-4": "#8b4513",
      "--blob-opacity": "0.12",
      "--blob-blur": "140px",
      "--grad-a": "#e07b4a",
      "--grad-b": "#c4622d",
      "--grad-c": "#d4a853",
      "--grad-d": "#8b4513",
      "--glass-bg": "rgba(255, 255, 255, 0.45)",
      "--glass-border": "rgba(44, 24, 16, 0.10)",
      "--glass-strong-bg": "rgba(255, 255, 255, 0.65)",
      "--glass-strong-border": "rgba(44, 24, 16, 0.16)",
      "--blur-glass": "20px",
      "--blur-glass-strong": "32px",
      "--font-heading": LORA,
      "--font-body": LORA,
      "--bg-pattern": "none",
    },
  },
];

export const defaultTheme = themes[0];
