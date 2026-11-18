'use client';

import { useEffect, useRef, useState } from 'react';
import { brandDisplay, site } from '@/data/site';
import { cn } from '@/lib/cn';
import { Icon } from './ui/Icon';
import { Logo } from './ui/Logo';

const linkClass =
  'rounded-full px-3 py-2 text-xs font-medium text-cocoa-700 transition duration-200 hover:text-berry-700 data-[active=true]:bg-blush-300/70 data-[active=true]:font-semibold data-[active=true]:text-berry-700';

export function Header({ subscribersLabel }: { subscribersLabel: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState('home');
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  // Scroll-spy: a section is "current" while it crosses the middle band of the viewport.
  useEffect(() => {
    const sections = site.nav.map((n) => document.getElementById(n.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Escape closes the menu; growing past the mobile breakpoint resets it.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    };
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => e.matches && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onChange);
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onChange);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 -mb-[78px] bg-transparent">
      <div className="container-page py-2">
        <div className="rounded-[12px] border border-blush-400/50 bg-white/95 shadow-[0_8px_28px_-18px_rgb(54_37_31/0.4)] backdrop-blur-xl">
          <div className="flex h-[60px] items-center justify-between gap-3 py-4 px-4 sm:px-6">
            <a href="#home" className="shrink-0 rounded-full" aria-label={`${brandDisplay} home`}>
              <Logo className="[&_img]:h-12" />
            </a>

            <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
              {site.nav.map((item) => (
                <a key={item.id} href={item.href} className={linkClass} data-active={active === item.id} aria-current={active === item.id ? 'location' : undefined}>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-2">
              <a
                href={site.youtube.subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1.5 rounded-full border border-blush-400/70 px-3 py-2 text-xs font-semibold text-cocoa-800 transition hover:bg-blush-100 md:inline-flex"
              >
                <Icon name="bell" className="size-3.5" />
                Subscribe
                <span className="text-[10px] font-medium text-muted">{subscribersLabel}</span>
              </a>
              <a
                href={site.shopee.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-cocoa-900 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-cocoa-800 sm:px-4"
              >
                <Icon name="shopping-bag" className="size-3.5" />
                Shop Now
              </a>
              <button
                ref={toggleRef}
                type="button"
                data-menu-toggle
                className="grid size-9 place-items-center rounded-full border border-blush-400/70 text-cocoa-800 lg:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label="Menu"
                onClick={() => setMenuOpen((o) => !o)}
              >
                <Icon name={menuOpen ? 'x' : 'menu'} className="size-5" />
              </button>
            </div>
          </div>

          {/* `inert` keeps collapsed links out of the tab order (only after mount, so no-JS keeps working). */}
          <div id="mobile-menu" data-menu-panel data-open={menuOpen} inert={mounted && !menuOpen} className="menu-panel lg:hidden">
            <div className="overflow-hidden">
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 pb-4 sm:px-6" onClick={(e) => (e.target as HTMLElement).closest('a') && setMenuOpen(false)}>
                {site.nav.map((item) => (
                  <a key={item.id} href={item.href} className={cn(linkClass, 'px-4 py-3 text-sm')} data-active={active === item.id}>
                    {item.label}
                  </a>
                ))}
                <a
                  href={site.youtube.subscribeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 rounded-full border border-blush-400/70 px-4 py-3 text-sm font-semibold text-cocoa-800"
                >
                  <Icon name="bell" className="size-4" /> Subscribe on YouTube
                  <span className="text-xs font-medium text-muted">{subscribersLabel}</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
