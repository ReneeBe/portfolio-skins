# Portfolio Skins

A theme switcher for my portfolio. Pick from pre-made skins or describe a vibe and get an AI-generated theme on the spot. Day 2 of my [50 projects challenge](https://reneebe.github.io).

**[Live demo →](https://reneebe.github.io/portfolio-skins)**

## How it works

Pre-made themes (Cyberpunk, Neon Tokyo, Matrix, etc.) apply instantly from a sidebar. The AI generator takes a text description ("deep sea bioluminescence," "retro 80s arcade") and Claude returns a JSON blob of CSS custom properties that get applied to the page in real time.

Themes control more than just colors: fonts, backdrop blur intensity, glass card opacity, gradient accents, and CSS background patterns all change together.

The AI side runs through a Cloudflare Worker that holds the Anthropic API key so nothing leaks into the static frontend.

## Stack

- [Next.js 15](https://nextjs.org/) static export → GitHub Pages
- [Tailwind CSS v4](https://tailwindcss.com/) with CSS custom properties for runtime theming
- [Cloudflare Workers](https://workers.cloudflare.com/) for API proxy, secret management, CORS
- [Anthropic API](https://anthropic.com) (`claude-sonnet-4-6`) for theme JSON generation

## Auth

No API key needed. The AI theme generator works out of the box with a daily visitor pool. [MagicLink](https://magiclink.reneebe.workers.dev/resume) tokens provide additional access (20 uses across all projects).

## Running locally

```bash
npm install
npm run dev
```
