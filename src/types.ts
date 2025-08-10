export type GameMeta = {
  slug: string;
  title: string;
  description: string;
  thumb: string;
  hero?: string;
  embed: string;
};
// Backward-compatible alias for components expecting `Game`
export type Game = GameMeta;
