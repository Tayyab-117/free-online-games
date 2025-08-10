"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { byTrending } from "@/lib/games";

export default function Hero(){
  const featured = byTrending(3);
  const [i,setI] = useState(0);
  useEffect(()=>{
    const t = setInterval(()=> setI(v => (v+1)%featured.length), 5000);
    return ()=>clearInterval(t);
  },[]);
  const f = featured[i];
  if(!f) return null;
  return (
    <section className="rounded-xl bg-panel shadow-card overflow-hidden">
      <div className="relative h-56 md:h-72">
        <Image src={f.hero || f.thumb} alt={f.title} fill priority className="object-cover opacity-95"/>
      </div>
      <div className="p-6 -mt-24 relative">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">{f.title}</h1>
        <Link href={`/game/${f.slug}`} className="inline-block mt-4 bg-accent text-ink font-semibold px-5 py-2 rounded-xl hover:brightness-110">Play Now</Link>
      </div>
    </section>
  );
}
