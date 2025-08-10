export type Game = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: "Action" | "Puzzle" | "Sports" | "Arcade" | "Multiplayer";
  rating: number;
  plays: number;
  thumb: string;
  hero?: string;
  tags: string[];
  embed?: string; // iframe path under /games/...
};
