import type { NextConfig } from 'next';

/**
 * Two ways to run this site:
 *
 *  1. Default (Vercel / Node / Docker):  `npm run build && npm start`
 *     Content JSON is validated and rendered at build time. Images are optimised on demand.
 *
 *  2. Fully static (GitHub Pages / any static host):  `npm run build:static`
 *     Produces ./out. Content JSON is read at build time. Images are not optimised in this mode.
 */
const isExport = process.env.NEXT_OUTPUT === 'export';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const config: NextConfig = {
  output: isExport ? 'export' : undefined,
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    unoptimized: isExport,
    // YouTube thumbnails are optimised by Next on first request, then cached.
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com', pathname: '/vi/**' }],
  },

  // Content is read from ./content with fs at (re)generation time; make sure it ships with the server.
  outputFileTracingIncludes: { '/': ['./content/**/*'] },

  // `headers()` is not supported with `output: 'export'`.
  ...(isExport
    ? {}
    : {
        async headers() {
          return [
            { source: '/:path*', headers: securityHeaders },
            { source: '/images/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }] },
          ];
        },
      }),
};

export default config;
