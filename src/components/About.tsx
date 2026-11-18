import Image from 'next/image';
import { brandDisplay, site } from '@/data/site';
import { formatGrouped } from '@/lib/format';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';

export function About({ crafters }: { crafters: number }) {
  // "over 120,000": round down to the nearest 5,000 so the claim is always true.
  const communityCount = Math.floor(crafters / 5000) * 5000;

  return (
    <section id="about" aria-labelledby="about-title" className="overflow-hidden bg-blush-100 py-20 sm:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Reveal variant="mask" className="row-span-2 self-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-photo">
              <Image src="/images/about/17.JPG" alt="Hands arranging a handmade pastel bouquet with a pink ribbon" fill sizes="(min-width: 1024px) 300px, 46vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal variant="mask" index={1}>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-photo">
              <Image src="/images/about/68.jpg" alt="Crafting desk with scissors, ribbon spools and small satin flowers" fill sizes="(min-width: 1024px) 300px, 46vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal variant="mask" index={2}>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-photo">
              <Image src="/images/about/38.JPEG" alt="Studio shelves stacked with ribbons, paper and craft supplies" fill sizes="(min-width: 1024px) 300px, 46vw" className="object-cover" />
            </div>
          </Reveal>
        </div>

        <Reveal variant="right">
          <p className="pill">
            <Icon name="heart" className="size-3.5" /> Our Story
          </p>
          <h2 id="about-title" className="section-title mt-4">
            <span className="font-serif">A </span>Little Creativity Goes a Long Way
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
            <p>
              {brandDisplay} started from a genuine passion for thoughtful, handmade gifts. What began as a personal craft hobby at a small dining table has blossomed into a thriving creative
              community of over {formatGrouped(communityCount)} crafters who believe that the most meaningful gifts are the ones crafted with your own hands.
            </p>
            <p>
              Whether you’re making your very first satin rose, designing a festive graduation bouquet, or packing a bespoke hamper for your best friend, we provide both the relaxing video
              guidance on YouTube and the exact studio-tested materials on Shopee to make your journey effortless and joyful.
            </p>
          </div>

          <div className="mt-7 flex items-center gap-3.5">
            <Image src="/images/about/founder.jpg" alt="" width={96} height={96} className="size-12 rounded-full object-cover shadow-card ring-2 ring-white" />
            <div>
              <p className="font-semibold">— {site.founder.name}</p>
              <p className="text-xs text-muted">{site.founder.role}</p>
            </div>
          </div>

          <a href={site.youtube.channelUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-8 px-6 py-3.5 text-sm">
            <Icon name="youtube" className="size-5" />
            Discover Our YouTube Channel
          </a>
        </Reveal>
      </div>
    </section>
  );
}
