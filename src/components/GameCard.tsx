import Image from "next/image";
import Link from "next/link";
import Rating from "./Rating";
import { Game } from "@/types";

export default function GameCard({ g }: { g: Game }) {
  return (
    <Link href={`/game/${g.slug}`} className="group hover:brightness-110 rounded-xl bg-panel shadow-card overflow-hidden">
      <div className="relative aspect-square">
        <Image src={g.thumb} alt={g.title} fill className="object-cover" loading="lazy"/>
      </div>
      <div className="p-3">
        <h3 className="text-slate-100 font-semibold line-clamp-1">{g.title}</h3>
        <div className="mt-1 flex items-center justify-between">
          <Rating value={g.rating}/>
          <span className="text-xs text-slate-400">{g.category}</span>
        </div>
      </div>
    </Link>
  );
}
