import 'server-only';
import { isPlaceholder, productCategoryLabels, site } from '@/data/site';
import type { Product } from './content';
import { toIsoDuration } from './format';
import type { Video } from './videos';

interface BuildArgs {
  origin: URL;
  products: Product[];
  videos: Video[];
}

const abs = (path: string, origin: URL) => new URL(path, origin).href;

/**
 * One schema.org @graph for the home page: Organization, WebSite, an ItemList of
 * Product + Offer, and a VideoObject per REAL video. Placeholder URLs and sample
 * videos are intentionally left out so search engines never see fake data.
 */
export function buildStructuredData({ origin, products, videos }: BuildArgs) {
  const orgId = `${origin.href}#organization`;
  const sameAs = Object.values(site.social).filter((u) => !isPlaceholder(u));

  const organization = {
    '@type': 'Organization',
    '@id': orgId,
    name: site.name,
    legalName: site.legalName,
    url: origin.href,
    logo: { '@type': 'ImageObject', url: abs('/logo-seo.jpeg', origin), width: 512, height: 512 },
    ...(sameAs.length ? { sameAs } : {}),
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${origin.href}#website`,
    url: origin.href,
    name: site.name,
    description: site.description,
    inLanguage: site.lang,
    publisher: { '@id': orgId },
  };

  const productNodes = products.map((p) => ({
    '@type': 'Product',
    '@id': `${origin.href}#product-${p.id}`,
    name: p.name,
    description: p.description,
    image: abs(p.image, origin),
    category: productCategoryLabels[p.category],
    brand: { '@type': 'Brand', name: site.name },
    offers: {
      '@type': 'Offer',
      price: p.price.toFixed(2),
      priceCurrency: 'IDR',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      ...(isPlaceholder(p.shopeeUrl) ? {} : { url: p.shopeeUrl }),
      seller: { '@id': orgId },
    },
  }));

  const productList = {
    '@type': 'ItemList',
    '@id': `${origin.href}#products`,
    name: 'Craft supplies from the official Shopee store',
    itemListElement: productNodes.map((node, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@id': node['@id'] } })),
  };

  const videoNodes = videos
    .flatMap((v) => {
      if (!v.youtubeId) return [];
      return [{
        '@type': 'VideoObject',
        '@id': `https://www.youtube.com/watch?v=${v.youtubeId}`,
        name: v.title,
        description: v.description || v.title,
        thumbnailUrl: [v.thumbnail],
        uploadDate: v.publishedAt,
        contentUrl: v.url,
        embedUrl: `https://www.youtube.com/embed/${v.youtubeId}`,
        ...(v.durationSeconds ? { duration: toIsoDuration(v.durationSeconds) } : {}),
        publisher: { '@id': orgId },
      }];
    });

  return { '@context': 'https://schema.org', '@graph': [organization, website, productList, ...productNodes, ...videoNodes] };
}

/** JSON for an inline ld+json script; "<" is escaped so it can never close the tag. */
export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');
