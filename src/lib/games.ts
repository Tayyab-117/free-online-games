import { Game } from '@/types';

export const games: Game[] = [
{
  id: "knight-adventure",
  slug: "knight-adventure",
  title: "Knight Adventure",
  description: "A fast, nostalgic platformer. Collect coins, avoid spikes and reach the flag before time runs out.",
  category: "Action",
  rating: 4.3,
  plays: 12853,
  thumb: "/images/knight-adventure-thumb.svg",
  hero: "/images/knight-adventure-cover.svg",
  tags: ["controller", "offline"],
  embed: "/games/knight-adventure/index.html"
},
{
  id: "balloon-match",
  slug: "balloon-match",
  title: "Balloon Match",
  description: "Aim and pop in this classic bubble shooter. Clear the board with clever angles and combos.",
  category: "Puzzle",
  rating: 4.5,
  plays: 12690,
  thumb: "/images/balloon-match-thumb.svg",
  hero: "/images/balloon-match-cover.svg",
  tags: ["mouse-only", "casual"],
  embed: "/games/balloon-match/index.html"
},
{
  id: "mini-hoops",
  slug: "mini-hoops",
  title: "Mini Hoops",
  description: "Flick to score as many baskets as you can in 60 seconds. Chain streaks for bonus points.",
  category: "Sports",
  rating: 4.8,
  plays: 6747,
  thumb: "/images/mini-hoops-thumb.svg",
  hero: "/images/mini-hoops-cover.svg",
  tags: ["touch", "mobile-friendly"],
  embed: "/games/mini-hoops/index.html"
},
{
  id: "rolling-sphere",
  slug: "rolling-sphere",
  title: "Rolling Sphere",
  description: "Dodge obstacles and collect gems while speed ramps up. How long can you survive?",
  category: "Arcade",
  rating: 4.2,
  plays: 9037,
  thumb: "/images/rolling-sphere-thumb.svg",
  hero: "/images/rolling-sphere-cover.svg",
  tags: ["keyboard", "endless"],
  embed: "/games/rolling-sphere/index.html"
},
{
  id: "pixel-racer",
  slug: "pixel-racer",
  title: "Pixel Racer",
  description: "Top-down time-trial racing. Nail corners, avoid traffic, and set record laps.",
  category: "Arcade",
  rating: 4.6,
  plays: 8754,
  thumb: "/images/pixel-racer-thumb.svg",
  hero: "/images/pixel-racer-cover.svg",
  tags: ["keyboard", "racing"],
  embed: "/games/pixel-racer/index.html"
},
];

export const categories = ["Action","Puzzle","Sports","Arcade","Multiplayer"] as const;
export function byTrending(limit = 12){ return [...games].sort((a,b)=>b.plays-a.plays).slice(0,limit); }
export function byNewest(limit = 12){ return [...games].slice(-limit).reverse(); }
export function bySlug(slug: string){ return games.find(g=>g.slug===slug); }
export function related(slug: string, limit = 6) {
  const base = bySlug(slug);
  if(!base) return [];
  return games.filter(g=>g.slug!==slug && (g.category===base.category || g.tags.some(t=>base.tags.includes(t)))).slice(0,limit);
}
