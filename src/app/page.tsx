import Image from "next/image";
import Link from "next/link";
import { game } from "@/lib/game";

export default function Home(){
  return (
    <div className="space-y-8">
      <section className="rounded-xl bg-panel shadow overflow-hidden">
        <div className="relative h-64">
          <Image src={game.hero || game.thumb} alt={game.title} fill className="object-cover"/>
        </div>
        <div className="p-6 -mt-16 relative">
          <h1 className="text-3xl font-extrabold text-white drop-shadow">{game.title}</h1>
          <p className="mt-2 text-slate-300">{game.description}</p>
          <Link href="/game/pixel-quest" className="inline-block mt-4 bg-accent text-black font-semibold px-5 py-2 rounded-xl hover:brightness-110">Play Now</Link>
        </div>
      </section>
    </div>
  );
}
