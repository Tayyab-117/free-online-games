// src/app/game/[slug]/page.tsx
import { notFound } from "next/navigation";
import games from "@/lib/games";
import type { Game } from "@/types";
import Script from "next/script";

export default function GamePage({ params }: { params: { slug: string } }) {
  const g: Game | undefined = games.find((game) => game.slug === params.slug);

  if (!g) {
    return notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: g.title,
    description: g.description,
    genre: g.category || "Arcade", // Resilient fallback
    operatingSystem: "Web Browser",
    applicationCategory: "Game",
    playMode: "SinglePlayer",
    image: g.hero || g.thumb,
    url: `https://freegames.example.com/game/${g.slug}`,
    inLanguage: "en",
  };

  return (
    <div className="space-y-8">
      <Script
        type="application/ld+json"
        id="game-jsonld"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="rounded-xl bg-panel overflow-hidden shadow-card">
        <div className="relative w-full aspect-video">
          <iframe
            src={g.embed}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            title={g.title}
          />
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold">{g.title}</h1>
        <p className="mt-2 text-lg text-slate-300">{g.description}</p>
        {g.category && (
          <p className="mt-1 text-sm text-slate-400">Category: {g.category}</p>
        )}
      </div>
    </div>
  );
}
