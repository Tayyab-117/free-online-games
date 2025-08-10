import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Suspense } from "react";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://freegames.example.com"),
  title: "Free Online Games – Play Instantly",
  description: "Nostalgic, easy-to-browse free HTML5 games. No downloads.",
  openGraph: {
    title: "Free Online Games – Play Instantly",
    description: "Nostalgic, easy-to-browse free HTML5 games. No downloads.",
    images: ["/og-cover.svg"],
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-slate-100">
        <a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>
        <Suspense fallback={<div className="h-14" />}>
          <Header />
        </Suspense>
        <main id="main" className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
