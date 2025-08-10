import { games } from "@/lib/games";
export default async function sitemap() {
  const base = "https://freegames.example.com";
  return [
    { url: `${base}/`, priority: 1 },
    ...games.map(g => ({ url: `${base}/game/${g.slug}`, priority: 0.8 }))
  ];
}
