# Free Games – Vercel Ready (Final)

Next.js 14 + Tailwind portal with 5 HTML5 games (Phaser 3). All assets are procedural SVG or inline shapes (CC0-safe).

## Deploy
1. `npm install`
2. `npm run dev` (local) or push to GitHub → Vercel
3. Vercel uses `vercel.json` (build: `npm run vercel-build`)

## Notes
- If you customize domains, update `metadataBase` in `src/app/layout.tsx`.
- Games live under `/public/games/*` and are embedded via iframe.
- SEO: per-game JSON-LD, OG images, sitemap + robots.

© 2025 Free Games
