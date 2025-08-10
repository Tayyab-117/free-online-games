export default function Footer(){
  return (
    <footer className="mt-10 border-t border-white/10 py-8 text-slate-400">
      <div className="mx-auto max-w-6xl px-4 grid gap-2 md:flex md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Free Games. UI and game assets are original or CC0.</p>
        <nav className="flex gap-4 text-sm">
          <a href="/privacy" className="hover:text-white">Privacy</a>
          <a href="/terms" className="hover:text-white">Terms</a>
          <a href="/contact" className="hover:text-white">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
