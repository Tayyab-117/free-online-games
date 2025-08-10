'use client';
import { useEffect } from 'react';
export default function RecentClient({ slug }: { slug: string }){
  useEffect(()=>{
    try{
      const raw = localStorage.getItem('recent-games') || '[]';
      const arr = JSON.parse(raw);
      const now = Date.now();
      const filtered = arr.filter((a:any)=>a.slug !== slug);
      filtered.unshift({ slug, ts: now });
      localStorage.setItem('recent-games', JSON.stringify(filtered.slice(0,20)));
    }catch{}
  },[slug]);
  return null;
}
