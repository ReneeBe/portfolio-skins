import type { Theme } from "@/lib/themes";

type Props = { theme: Theme };

export default function PortfolioPreview({ theme }: Props) {
  // Apply theme vars scoped to this container so they don't affect the sidebar
  const cssVars = Object.fromEntries(
    Object.entries(theme.vars)
  ) as React.CSSProperties;

  const fg = theme.vars["--foreground"];
  const gradA = theme.vars["--grad-a"];
  const gradB = theme.vars["--grad-b"];

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        ...cssVars,
        backgroundColor: theme.vars["--background"],
        backgroundImage: theme.vars["--bg-pattern"],
        color: fg,
        fontFamily: "var(--font-body)",
        transition: "background-color 0.4s ease, color 0.4s ease",
      }}
    >
      {/* Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
      </div>

      {/* Mock nav */}
      <div className="relative z-10 flex justify-center px-6 pt-6">
        <nav
          className="glass flex items-center gap-2 rounded-full px-3 py-2 text-sm shadow-lg"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)" }}
        >
          <span
            className="mr-1 px-2 font-black text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            rb<span className="gradient-text">.dev</span>
          </span>
          <div className="h-4 w-px" style={{ background: `${fg}15` }} />
          {["Home", "50 Projects", "Blog"].map((label) => (
            <span
              key={label}
              className="rounded-full px-3 py-1 text-xs"
              style={{ color: `${fg}50` }}
            >
              {label}
            </span>
          ))}
          <div className="h-4 w-px" style={{ background: `${fg}15` }} />
          <span
            className="rounded-full px-3 py-1.5 text-xs font-semibold text-white"
            style={{ background: `linear-gradient(135deg, ${gradA}, ${gradB})` }}
          >
            Hire me
          </span>
        </nav>
      </div>

      {/* Mock hero */}
      <div className="relative z-10 flex flex-col items-center justify-center px-8 pt-16 text-center">
        {/* Terminal label */}
        <div
          className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono"
          style={{ color: theme.vars["--grad-d"] }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{
              background: theme.vars["--grad-d"],
              boxShadow: `0 0 6px ${theme.vars["--grad-d"]}`,
            }}
          />
          <span style={{ color: `${fg}40` }}>$</span>
          <span>&nbsp;whoami&nbsp;</span>
          <span style={{ color: `${fg}30` }}>//</span>
          <span style={{ color: `${fg}60` }}>fullstack_engineer</span>
        </div>

        {/* Name */}
        <h1
          className="mb-3 w-full font-black leading-[1.15]"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 4.5vw, 4rem)",
            textWrap: "balance",
          }}
        >
          <span className="gradient-text">Renee </span>
          <span style={{ color: fg }}>Berger</span>
        </h1>

        <p className="mb-8 max-w-sm text-sm leading-relaxed" style={{ color: `${fg}50` }}>
          I build fast, scalable web products &mdash; from pixel-perfect UIs to
          robust backend systems and everything in between.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div
            className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white"
            style={{
              background: `linear-gradient(135deg, ${gradA}, ${gradB})`,
              boxShadow: `0 0 24px ${gradA}40`,
            }}
          >
            <span
              className="h-2 w-2 rounded-full bg-white/80"
              style={{ boxShadow: "0 0 5px white" }}
            />
            Available for work
          </div>
          <div
            className="glass inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold"
            style={{ color: `${fg}80` }}
          >
            See my projects
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
          {[
            { value: "5+", label: "Years building" },
            { value: "30+", label: "Projects shipped" },
            { value: "FS", label: "Frontend & Backend" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div
                className="text-2xl font-black tracking-tight gradient-text"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {value}
              </div>
              <div className="mt-0.5 text-[10px] uppercase tracking-widest" style={{ color: `${fg}35` }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Theme name badge */}
      <div className="absolute bottom-5 right-5 z-10">
        <div
          className="glass rounded-full px-3 py-1.5 text-xs font-mono"
          style={{ color: `${fg}50` }}
        >
          {theme.emoji} {theme.name}
        </div>
      </div>
    </div>
  );
}
