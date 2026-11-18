import type { Metadata } from 'next';
import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/ui/Logo';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
  alternates: {},
};

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-dvh place-items-center bg-[linear-gradient(180deg,#fde6ee,#fff8f8)] px-6 text-center">
      <div>
        <a href="/" className="inline-block">
          <Logo />
        </a>
        <p className="mt-10 font-serif text-7xl font-bold text-berry-600 italic">404</p>
        <h1 className="mt-4 text-2xl font-bold">This page wandered off</h1>
        <p className="mx-auto mt-3 max-w-sm text-muted">The link may be old, or the page may have moved. Let’s get you back to the good stuff.</p>
        <a href="/" className="btn btn-primary mt-8 px-6 py-3.5 text-sm">
          Back to home <Icon name="arrow-right" className="btn-icon btn-icon-nudge size-4" />
        </a>
      </div>
    </main>
  );
}
