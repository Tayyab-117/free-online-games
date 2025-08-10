import { bySlug, related } from "@/lib/games";
import GameCard from "@/components/GameCard";
import Script from "next/script";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props) {
  const g = bySlug(params.slug);
  return {
    title: g ? `${g.title} – Play Free Online` : "Game",
    description: g?.description ?? "",
    openGraph: { images: [g?.thumb ?? "/og-cover.svg"] },
  };
}

export default function GamePage({ params }: Props) {
  const g = bySlug(params.slug);
  if (!g) {
    return <div className="py-24 text-center">Game not found.</div>;
  }
  const rel = related(g.slug, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: g.title,
    description: g.description,
    genre: g.category || "Arcade",
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
        id="game-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="rounded-xl bg-panel overflow-hidden shadow-card">
        <div className="relative w-full aspect-video">
          <iframe
            src={g.embed}
            title={g.title}
            loading="lazy"
            allow="autoplay; fullscreen; gamepad; clipboard-write"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
        <div className="p-4 text-slate-300 text-sm">
          <h1 className="text-2xl font-bold text-white">{g.title}</h1>
          <p className="mt-2">{g.description}</p>
          {g.category && <p className="mt-2">Category: {g.category}</p>}
        </div>
      </div>

      {rel.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-3">Related games</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {rel.map((r) => (
              <GameCard key={r.id} g={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
