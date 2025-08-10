import { byTrending, games, categories } from "@/lib/games";
import Hero from "@/components/Hero";
import ContinueRail from "@/components/ContinueRail";
import GameCard from "@/components/GameCard";

export default function Home({ searchParams }: { searchParams: { q?: string; c?: string } }) {
  const q = (searchParams?.q ?? "").toLowerCase();
  const c = searchParams?.c;
  let list = games;
  if (q) list = list.filter(g => g.title.toLowerCase().includes(q) || g.tags.some(t=>t.includes(q)));
  if (c && c !== "New") list = list.filter(g => g.category === c);
  return (
    <div className="space-y-8">
      <Hero/>
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold">New & Trending</h2>
          <div className="text-sm text-slate-400">Categories: {categories.join(" • ")}</div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {list.map(g => <GameCard key={g.id} g={g}/>)}
        </div>
      </section>

      <ContinueRail/>
    </div>
  );
}
