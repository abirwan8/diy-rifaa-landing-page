import Image from 'next/image';
import { galleryCategoryLabels } from '@/data/site';
import type { GalleryItem } from '@/lib/content';
import { Reveal } from './ui/Reveal';

const bentoGrid = [
  'mt-10 grid grid-flow-dense grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4',
  'auto-rows-[9.5rem] sm:auto-rows-[13rem] lg:auto-rows-[15rem]',
  // 1 -> besar (2x2) di semua breakpoint
  '[&>li:nth-child(6n+1)]:col-span-2 [&>li:nth-child(6n+1)]:row-span-2',
  // 3 -> tinggi (1x2)
  '[&>li:nth-child(6n+3)]:row-span-2',
  // 5 dan 6 -> lebar (2x1)
  '[&>li:nth-child(6n+5)]:col-span-2 [&>li:nth-child(6n+6)]:col-span-2',
  // Tile besar selalu menampilkan caption; tile lain menampilkannya saat hover/fokus.
  '[&>li:nth-child(6n+1)_figcaption]:translate-y-0',
].join(' ');

export function Gallery({ items: gallery }: { items: GalleryItem[] }) {
  return (
    <section id="inspiration" aria-labelledby="gallery-title" className="bg-blush-50 py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="eyebrow">Community &amp; Creations</p>
            <h2 id="gallery-title" className="section-title mt-3">
              <span className="font-serif">Made</span> With Love
            </h2>
            <p className="section-lead mt-4">A visual showcase of finished handmade creations, bouquets, and heartfelt gifts inspired by our channel.</p>
          </Reveal>
        </div>

        <ul className={bentoGrid}>
          {gallery.map((g, i) => (
            <Reveal as="li" key={g.id} index={i % 4}>
              <figure className="group relative size-full overflow-hidden rounded-3xl bg-blush-300 shadow-card ring-1 ring-white/60 sm:rounded-4xl">
                <Image
                  src={g.image}
                  alt={g.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover transition duration-1200ms ease-out-expo group-hover:scale-[1.07]"
                />

                {/* gradasi tipis agar teks selalu terbaca */}
                <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-cocoa-900/55 via-transparent to-transparent opacity-70 transition duration-500 group-hover:opacity-100" />

                <span className="absolute top-3 left-3 rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold text-berry-700 shadow-card backdrop-blur-sm sm:top-4 sm:left-4">
                  {galleryCategoryLabels[g.category]}
                </span>

                <figcaption className="absolute inset-x-0 bottom-0 translate-y-full p-4 pt-12 text-sm leading-snug font-semibold text-white transition duration-500 ease-out-expo group-hover:translate-y-0 sm:p-5 sm:pt-14 sm:text-base">
                  {g.title}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}