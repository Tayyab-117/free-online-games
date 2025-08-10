import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/types";

export default function GameCard({ g }: { g: Game }){
  return (
    <Link href={`/game/${g.slug}`} className="group rounded-xl bg-panel overflow-hidden shadow hover:brightness-110">
      <div className="relative aspect-square">
        <Image src={g.thumb} alt={g.title} fill className="object-cover" />
      </div>
      <div className="p-3">
        <h3 className="text-slate-100 font-semibold line-clamp-1">{g.title}</h3>
      </div>
    </Link>
  );
}
