import { game } from "@/lib/game";
import Script from "next/script";

export default function PixelQuest(){
  const jsonLd = {
    "@context":"https://schema.org",
    "@type":"VideoGame",
    name: game.title,
    description: game.description,
    genre: "Platformer",
    applicationCategory: "Game",
    playMode: "SinglePlayer",
    operatingSystem: "Web Browser",
    inLanguage: "en",
    url: "https://example.com/game/pixel-quest",
    image: game.hero || game.thumb
  };
  return (
    <div className="space-y-6">
      <Script id="jsonld" type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
      <div className="rounded-xl bg-panel overflow-hidden shadow">
        <div className="relative w-full aspect-video">
          <iframe src={game.embed} title={game.title} className="absolute inset-0 w-full h-full border-0" allow="autoplay; fullscreen; gamepad"></iframe>
        </div>
      </div>
      <div className="bg-panel rounded-xl p-4 shadow">
        <h1 className="text-2xl font-bold">{game.title}</h1>
        <p className="text-slate-300">{game.description}</p>
      </div>
    </div>
  );
}
