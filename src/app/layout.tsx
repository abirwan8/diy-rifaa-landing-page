import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import 'aos/dist/aos.css';
import { ClientRuntime } from '@/components/ui/ClientRuntime';
import { site } from '@/data/site';
import { env } from '@/lib/env';

// Self-hosted (latin subset): no request to Google Fonts, preloaded automatically, zero layout shift.
const jakarta = localFont({
  src: './fonts/plus-jakarta-sans-latin-wght-normal.woff2',
  variable: '--font-jakarta',
  weight: '200 800',
  display: 'swap',
});
const playfair = localFont({
  src: './fonts/playfair-display-latin-700-italic.woff2',
  variable: '--font-playfair',
  weight: '700',
  style: 'italic',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: site.themeColor,
};

const ogImage = { url: '/og-default.jpg', width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` };

export const metadata: Metadata = {
  metadataBase: new URL(env.SITE_URL),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    url: '/',
    title: site.title,
    description: site.description,
    images: [ogImage],
  },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description, images: [ogImage.url] },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/svg+xml' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: instrumentation-client adds classes to <html> before React hydrates.
    <html lang={site.lang} className={`${jakarta.variable} ${playfair.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-full focus:bg-berry-600 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <div className="scroll-progress" aria-hidden="true" />
        {children}
        <ClientRuntime />
      </body>
    </html>
  );
}
