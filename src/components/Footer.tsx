import { site } from '@/data/site';
import { Icon, type IconName } from './ui/Icon';
import { Logo } from './ui/Logo';
import { Reveal } from './ui/Reveal';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Tutorials',
    links: [
      { label: 'Satin Flower Bouquets', href: '#tutorials' },
      { label: 'Gift Boxes & Hampers', href: '#tutorials' },
      { label: 'Keychains & Charms', href: '#tutorials' },
      { label: 'Beginner Starter Projects', href: '#tutorials' },
    ],
  },
  {
    title: 'Shopee Store',
    links: [
      { label: 'All Craft Materials', href: site.shopee.storeUrl, external: true },
      { label: 'Curated DIY Bundles', href: '#supplies' },
      { label: 'Ribbons & Wrapping Paper', href: '#supplies' },
      { label: 'Shopee Voucher Deals', href: site.shopee.vouchersUrl, external: true },
    ],
  },
];

const socials: { label: string; href: string; icon: IconName }[] = [
  { label: 'YouTube', href: site.social.youtube, icon: 'youtube' },
  { label: 'Instagram', href: site.social.instagram, icon: 'instagram' },
  { label: 'TikTok', href: site.social.tiktok, icon: 'music' },
  { label: 'Shopee store', href: site.social.shopee, icon: 'shopping-bag' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-br from-blush-500 via-blush-300 to-blush-400">
      <Reveal variant="fade" className="container-page pt-16 pb-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {site.tagline}. Discover fun DIY papercrafts, resin keepsakes, floral designs, and studio-tested crafting supplies.
            </p>
            {/* <div className="mt-6 flex gap-2.5">
              <a href={site.shopee.storeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blush-500/70">
                <Icon name="store" className="size-5.5" /> Shopee Official Store
              </a>
              <a href={site.youtube.channelUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-red-500 px-4 py-2 text-xs font-semibold text-white transition hover:shadow-card">
                <Icon name="youtube" className="size-5.5" /> YouTube Channel
              </a>
            </div> */}
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-sm font-semibold">{col.title}</h2>
              <ul className="mt-5 space-y-3 text-sm text-muted">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="transition duration-300 hover:text-berry-600">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-sm font-semibold">Connect</h2>
            <ul className="mt-5 flex gap-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label={s.label}
                    className="grid size-10 place-items-center rounded-full bg-white text-cocoa-800 shadow-card transition duration-300 ease-out-expo hover:-translate-y-1 hover:bg-berry-600 hover:text-white"
                  >
                    <Icon name={s.icon} className="size-[20px]" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-[16rem] text-xs leading-relaxed text-muted">Questions about materials? Chat with our studio team directly via Shopee Chat.</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 rounded-2xl bg-white px-6 py-4 text-xs text-muted sm:flex-row">
          <p>
            © {year} {site.legalName.replace("'", '’')}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Handmade with <Icon name="heart" solid className="size-3.5 text-berry-600" /> for creators everywhere.
          </p>
        </div>
      </Reveal>
    </footer>
  );
}
