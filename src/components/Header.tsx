"use client";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/games";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") || "");
  useEffect(()=>{ setQ(searchParams.get("q")||""); },[searchParams]);
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-bgd/70 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" width={120} height={34} alt="Free Games"/>
        </Link>
        <nav className="hidden md:flex gap-4">
          {categories.map(c => (
            <Link key={c} href={`/?c=${encodeURIComponent(c)}`} className="text-slate-200 hover:text-white text-sm px-2 py-1 rounded">{c}</Link>
          ))}
          <Link href="/?c=New" className="text-slate-200 hover:text-white text-sm px-2 py-1 rounded">New</Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <input
            value={q}
            onChange={e=>setQ(e.target.value)}
            onKeyDown={e=>e.key==='Enter' && router.push(`/?q=${encodeURIComponent(q)}`)}
            placeholder="Search"
            className="bg-panel/70 text-slate-100 placeholder:text-slate-400 rounded-lg px-3 py-2 w-48 md:w-64 outline-none border border-white/10 focus:border-sky-400"
          />
        </div>
      </div>
    </header>
  );
}
