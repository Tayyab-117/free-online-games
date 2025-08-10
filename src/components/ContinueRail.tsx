'use client';
import { useEffect, useState } from 'react';
import { games } from '@/lib/games';
import GameCard from './GameCard';
type Recent = { slug: string; ts: number };
export default function ContinueRail(){
  const [recent, setRecent] = useState<Recent[]>([]);
  useEffect(()=>{
    try{
      const raw = localStorage.getItem('recent-games') || '[]';
      const arr: Recent[] = JSON.parse(raw);
      const slugs = new Set(arr.map(a=>a.slug));
      // Only include slugs we still have
      const filtered = arr.filter(a => games.find(g=>g.slug===a.slug));
      setRecent(filtered.sort((a,b)=>b.ts-a.ts).slice(0,6));
    }catch{}
  },[]);
  if(!recent.length) return null;
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-bold">Continue playing</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {recent.map(r=>{
          const g = games.find(g=>g.slug===r.slug)!;
          return <GameCard key={g.id} g={g}/>;
        })}
      </div>
    </section>
  );
}
