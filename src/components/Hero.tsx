import Image from 'next/image';
import type { CSSProperties } from 'react';
import { site } from '@/data/site';
import { cn } from '@/lib/cn';
import { formatPlus } from '@/lib/format';
import { Icon } from './ui/Icon';

/**
 * Five photo cards fanned out like a hand of cards.
 *  r = rotation, y = drop (px), d = deal order (0 = first), fx = where the card starts
 *  before it is "dealt" outward. Replace the photos in /public/images/hero.
 */
const cards = [
  { src: '/images/hero/7.jpg', alt: 'White gift box filled with soft pink satin flowers', r: -11, y: 56, d: 2, fx: '13vw', z: 10, size: 'w-[clamp(7rem,17.5vw,16.5rem)]', vis: 'hidden sm:block' },
  { src: '/images/hero/9.jpeg', alt: 'Handmade gift hamper with chocolates, flowers and a name tag', r: -5, y: 26, d: 1, fx: '6.5vw', z: 20, size: 'w-[clamp(7.5rem,18.5vw,17.5rem)]', vis: '' },
  { src: '/images/hero/13.jpeg', alt: 'Pastel satin rose bouquet wrapped in cream paper', r: 0, y: 0, d: 0, fx: '0px', z: 30, size: 'w-[clamp(8.5rem,20.5vw,19rem)]', vis: '', center: true },
  { src: '/images/hero/2.jpeg', alt: 'Graduate holding a handmade sunflower bouquet', r: 5, y: 26, d: 1, fx: '-6.5vw', z: 20, size: 'w-[clamp(7.5rem,18.5vw,17.5rem)]', vis: '' },
  { src: '/images/hero/15.jpg', alt: 'Rolls of pastel satin ribbon laid out on linen', r: 11, y: 56, d: 2, fx: '-13vw', z: 10, size: 'w-[clamp(7rem,17.5vw,16.5rem)]', vis: 'hidden sm:block' },
] as const;

const avatars = ['/images/hero/hero-2.jpg', '/images/hero/hero-3.jpg', '/images/hero/hero-4.jpg'];

export function Hero({ crafters }: { crafters: number }) {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#F2F8FA_0%,#E6F0F5_42%,#CDE2EB_78%)] pt-24 pb-20 sm:pt-30 sm:pb-28"
    >
      <div
        className="pointer-events-none absolute -top-56 left-1/2 -z-10 h-136 w-5xl max-w-none -translate-x-1/2 animate-drift rounded-full bg-blush-300/60 blur-3xl"
        aria-hidden="true"
      />

      <div className="hero-fan mx-auto flex max-w-350 items-end justify-center px-4 pt-4 pb-6">
        {cards.map((c, i) => (
          <div
            key={c.src}
            className={cn('hero-card relative shrink-0', c.size, c.vis, i > 0 && 'ml-[-2.4vw] sm:ml-[-2vw]')}
            style={{ '--r': `${c.r}deg`, '--y': `${c.y}px`, '--d': c.d, '--fx': c.fx, zIndex: c.z } as CSSProperties}
          >
            <div className="hero-float" style={{ '--d': c.d } as CSSProperties}>
              <div className="relative aspect-4/5 overflow-hidden rounded-[1.4rem] border-[3px] border-white bg-blush-300 shadow-photo sm:rounded-[1.8rem]">
                <Image
                  src={c.src}
                  alt={c.alt}
                  fill
                  sizes="(min-width: 1024px) 300px, 30vw"
                  // All five cards are above the fold: load them eagerly; only the centre one is preloaded.
                  loading="eager"
                  preload={'center' in c}
                  className="object-cover"
                />
                {'center' in c && (
                  <span className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold whitespace-nowrap text-berry-700 shadow-card sm:text-[11px]">
                    Featured Tutorial
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="container-page mt-10 text-center sm:mt-14">
        <h1 id="hero-title" className="mx-auto max-w-4xl text-[clamp(2.2rem,5.4vw,4rem)] leading-[1.08] font-bold tracking-tight">
          <span className="line-mask">
            <span className="line-rise" style={{ '--delay': '.55s' } as CSSProperties}>
              Turn Your Creativity Into
            </span>
          </span>
          <span className="line-mask">
            <span className="line-rise font-serif text-berry-600 italic" style={{ '--delay': '.72s' } as CSSProperties}>
              Something Beautiful.
            </span>
          </span>
        </h1>

        <p className="hero-fade mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-lg" style={{ '--delay': '1s' } as CSSProperties}>
          Discover fun DIY tutorials, create handmade gifts, and find all the studio-tested craft supplies you need to bring your floral and papercraft ideas to life.
        </p>

        <div className="hero-fade mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ '--delay': '1.12s' } as CSSProperties}>
          <a href="https://www.youtube.com/@DIYRifaA" target="_blank" rel="noopener noreferrer" className="btn btn-dark py-1.5 pr-1.5 pl-6 text-sm">
            Explore DIY Tutorials
            <span className="btn-icon btn-icon-nudge grid size-10 place-items-center rounded-full bg-blush-100">
              <Icon name="arrow-right" className="size-4 text-ink" />
            </span>
          </a>
          <a href="https://shopee.co.id/fefa_craft" target="_blank" rel="noopener noreferrer" className="btn bg-berry-500 text-white px-6 py-3.5 text-sm">
            <Icon name="shopping-bag" className="size-4" />
            Shop Craft Supplies
          </a>
        </div>

        <ul className="hero-fade mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[13px] text-muted" style={{ '--delay': '1.28s' } as CSSProperties}>
          <li className="flex items-center gap-2.5">
            <span className="flex -space-x-2" aria-hidden="true">
              {avatars.map((src) => (
                <Image key={src} src={src} alt="" width={56} height={56} className="size-7 rounded-full object-cover ring-2 ring-blush-50" />
              ))}
            </span>
            <span>
              <strong className="font-semibold text-ink">{formatPlus(crafters)}</strong> Crafters
            </span>
          </li>
          <li className="hidden h-4 w-px bg-blush-400 sm:block" aria-hidden="true" />
          <li className="flex items-center gap-1.5">
            <Icon name="star" solid className="size-4 text-berry-600" />
            {site.trust.rating}
          </li>
          <li className="hidden h-4 w-px bg-blush-400 sm:block" aria-hidden="true" />
          <li className="flex items-center gap-1.5">
            <Icon name="shield-check" className="size-4 text-berry-600" />
            {site.trust.quality}
          </li>
        </ul>
      </div>
    </section>
  );
}
