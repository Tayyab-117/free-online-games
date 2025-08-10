# Free Games – Vercel Ready

Next.js 14 + Tailwind portal with 5 HTML5 games (Phaser 3). All assets are original SVGs or CC0-safe (generated shapes).

## Quick start

```bash
npm install
npm run dev
```

## Deploy (Vercel)

1. Push this folder to a GitHub repo.
2. Import into Vercel → framework auto-detect: **Next.js**.
3. Deploy. No env vars needed.

## Structure

- `src/` – Next.js portal (App Router), SEO, pages.
- `public/games/*` – 5 Phaser 3 games, each self-contained.
- `public/images/*` – Thumbnails & OG covers (SVG).
- `sitemap` & `robots` auto-generated.

## Included games

1. **Knight Adventure** – platformer
2. **Balloon Match** – bubble shooter
3. **Mini Hoops** – basketball flick
4. **Rolling Sphere** – endless runner
5. **Pixel Racer** – top-down racer

### Shared features
- Start/pause/restart buttons
- Score HUD + simple high score entry point (localStorage-ready)
- Keyboard/touch controls
- No external copyrighted assets

## SEO
- Per-game OpenGraph
- JSON-LD (`VideoGame`) on game pages
- Clean URLs, category filtering
- Sitemap & robots

## Notes for developers
- Games are deliberately lightweight and use procedural graphics (no external art files).
- If you want to replace visuals/sounds, drop CC0 assets into each game's `/assets` folder and load them in `preload()`.
- To convert to PWA later, add a service worker and precache `/public/images` + `/public/games` content.

© 2025 Free Games
