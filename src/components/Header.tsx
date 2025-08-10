"use client";
import Image from "next/image";
import Link from "next/link";
export default function Header(){
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-bgd/70 border-b border-white/10">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2"><Image src="/logo.svg" alt="Logo" width={120} height={34}/></Link>
        <nav className="ml-auto text-sm text-slate-300 flex gap-4">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/game/pixel-quest" className="hover:text-white">Play</Link>
        </nav>
      </div>
    </header>
  );
}
