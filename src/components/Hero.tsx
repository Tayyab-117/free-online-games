import Image from "next/image";
import Link from "next/link";

type Props = { title: string; cta: string; image: string; href: string };

export default function Hero({ title, cta, image, href }: Props) {
  return (
    <section className="rounded-xl bg-panel shadow-card overflow-hidden">
      <div className="relative h-56 md:h-72">
        <Image src={image} alt={title} fill priority className="object-cover opacity-95" />
      </div>
      <div className="p-6 -mt-24 relative">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">
          {title}
        </h1>
        <Link
          href={href}
          className="inline-block mt-4 bg-accent text-ink font-semibold px-5 py-2 rounded-xl hover:brightness-110"
        >
          {cta}
        </Link>
      </div>
    </section>
  );
}
