import type { MetadataRoute } from 'next';
import { env } from '@/lib/env';

export const dynamic = 'force-static'; // required for `output: 'export'`

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: new URL('/', env.SITE_URL).href, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 }];
}
