import { site } from '@/data/site';
import { Icon, type IconName } from './ui/Icon';
import { Reveal } from './ui/Reveal';

const perks: { icon: IconName; text: string }[] = [
  { icon: 'truck', text: 'Fast Delivery Across Indonesia' },
  { icon: 'gift', text: 'Beginner-Friendly Kits' },
  { icon: 'message-circle', text: '5-Star Community Support' },
];

export function CallToAction() {
  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-24">
      <div className="container-page">
        <Reveal variant="scale" className="relative isolate overflow-hidden rounded-[2.25rem] bg-linear-to-br from-blush-300 via-blush-200 to-blush-300 px-6 py-16 text-center shadow-card sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute -top-24 left-[8%] -z-10 size-[26rem] animate-drift rounded-full bg-white/60 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-20 -bottom-28 -z-10 size-[24rem] animate-drift rounded-full bg-blush-500/40 blur-3xl [animation-delay:-9s]" aria-hidden="true" />

          <p className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-semibold text-berry-700 shadow-card">
            <Icon name="sparkles" className="size-3.5" /> Start Your Free Project
          </p>
          <h2 id="cta-title" className="section-title mx-auto mt-5 max-w-2xl">
            <span className="font-serif">Ready </span>to Create Your First Masterpiece?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
            Join thousands of crafters turning simple ribbons and paper into unforgettable memories. Watch free video tutorials or order complete DIY craft kits directly on Shopee today.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={site.shopee.storeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary px-7 py-3.5 text-sm">
              <Icon name="shopping-bag" className="size-4" />
              Shop Supplies on Shopee
            </a>
            <a href="#tutorials" className="btn btn-white px-7 py-3.5 text-sm">
              <Icon name="play" solid className="size-3.5" />
              Watch Free Tutorials
            </a>
          </div>
          <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs text-muted">
            {perks.map((p) => (
              <li key={p.text} className="flex items-center gap-2">
                <Icon name={p.icon} className="size-4 text-berry-600" />
                {p.text}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
