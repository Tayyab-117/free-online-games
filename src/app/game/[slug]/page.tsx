"use client";

import { useParams } from "next/navigation";
import Script from "next/script";
import games from "@/data/games.json";

export default function GamePage() {
  const params = useParams();
  const game = games.find((g) => g.slug === params.slug);

  if (!game) {
    return <div>Game not found.</div>;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: game.description,
    genre: game.genre,
    inLanguage: "en"
  };

  return (
    <div className="space-y-8">
      {/* SEO JSON-LD Structured Data */}
      <Script
        type="application/ld+json"
        id="game-jsonld"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Game container */}
      <div className="rounded-xl bg-panel overflow-hidden shadow-card">
        <div className="relative w-full aspect-video">
          <iframe
            src={`/games/${params.slug}/index.html`}
            className="w-full h-[80vh] border-none"
            title={game.title}
          ></iframe>
        </div>
      </div>

      {/* Game description */}
      <div className="bg-panel rounded-xl p-4 shadow-card">
        <h1 className="text-2xl font-bold mb-2">{game.title}</h1>
        <p className="text-slate-300">{game.description}</p>
      </div>
    </div>
  );
}
