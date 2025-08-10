import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pixel Quest – Play Free Online",
  description: "A long, challenging multi-level platformer you can play in your browser.",
  openGraph: { title: "Pixel Quest – Play Free Online", description: "A long, challenging multi-level platformer with traps, keys, and a boss.", images: ["/og.svg"] }
};

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body>
        <Header/>
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
