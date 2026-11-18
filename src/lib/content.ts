import 'server-only';
import fs from 'node:fs/promises';
import path from 'node:path';
import { z } from 'zod';
import { isPlaceholder } from '@/data/site';

/**
 * Products and gallery live in plain JSON files in /content. Every file is validated
 * with Zod when the page is generated, so a typo (negative price, a non-Shopee link,
 * a missing photo) fails the build with a readable message instead of shipping broken.
 */

export const PRODUCT_CATEGORIES = ['ribbons', 'wrapping', 'keychain', 'beads', 'kits', 'tools', 'packaging'] as const;
export const GALLERY_CATEGORIES = ['bouquets', 'flowers', 'keychains'] as const;

const shopeeUrl = z.url().refine((v) => /(^|\.)(shopee\.[a-z.]{2,}|shp\.ee|shope\.ee)$/i.test(new URL(v).hostname), {
  message: 'Must be a Shopee link (shopee.co.id, shp.ee, ...)',
});
const publicImage = z.string().regex(/^\/images\/.+\.(jpe?g|png|webp|avif)$/i, 'Must look like /images/products/photo.jpg (a file inside /public)');

const productSchema = z.object({
  name: z.string().min(8).max(140),
  /** Short plain-text summary, reused for structured data (SEO). */
  description: z.string().min(20).max(300),
  /** Price in whole rupiah, e.g. 28500. */
  price: z.number().int().positive(),
  category: z.enum(PRODUCT_CATEGORIES),
  badge: z.string().max(24).optional(),
  badgeStyle: z.enum(['solid', 'soft']).default('soft'),
  shopeeUrl,
  image: publicImage,
  imageAlt: z.string().min(5).max(160),
  /** Optional social proof shown on the photo. Keep these truthful. */
  rating: z.number().min(1).max(5).optional(),
  sold: z.number().int().nonnegative().optional(),
  /** Lower numbers appear first. */
  order: z.number().int().default(100),
  /** true = hide without deleting the file. */
  draft: z.boolean().default(false),
});

const galleryItemSchema = z.object({
  id: z.string().min(2),
  title: z.string().min(3).max(100),
  alt: z.string().min(10).max(200),
  category: z.enum(GALLERY_CATEGORIES),
  image: publicImage,
  order: z.number().int().default(100),
});

export type Product = z.infer<typeof productSchema> & { id: string };
export type GalleryItem = z.infer<typeof galleryItemSchema>;

const CONTENT_DIR = path.join(process.cwd(), 'content');

/** Only verify photo files while building / developing (the deployed server may not ship /public). */
const shouldCheckFiles = process.env.NEXT_PHASE === 'phase-production-build' || process.env.NODE_ENV === 'development';

async function assertFile(publicPath: string, owner: string) {
  if (!shouldCheckFiles) return;
  try {
    await fs.access(path.join(process.cwd(), 'public', publicPath));
  } catch {
    throw new Error(`${owner}: image "${publicPath}" does not exist in /public`);
  }
}

export async function getProducts(): Promise<Product[]> {
  const dir = path.join(CONTENT_DIR, 'products');
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith('.json')).sort();

  const products = await Promise.all(
    files.map(async (file) => {
      const parsed = productSchema.safeParse(JSON.parse(await fs.readFile(path.join(dir, file), 'utf8')));
      if (!parsed.success) throw new Error(`Invalid product file content/products/${file}\n${z.prettifyError(parsed.error)}`);
      await assertFile(parsed.data.image, `content/products/${file}`);
      return { id: file.replace(/\.json$/, ''), ...parsed.data };
    }),
  );

  const visible = products.filter((p) => !p.draft).sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
  const unset = visible.filter((p) => isPlaceholder(p.shopeeUrl)).length;
  if (unset > 0 && shouldCheckFiles) {
    console.warn(`[content] ${unset}/${visible.length} products still use placeholder Shopee links (content/products/*.json).`);
  }
  return visible;
}

export async function getGallery(): Promise<GalleryItem[]> {
  const raw = JSON.parse(await fs.readFile(path.join(CONTENT_DIR, 'gallery.json'), 'utf8'));
  const parsed = z.array(galleryItemSchema).safeParse(raw);
  if (!parsed.success) throw new Error(`Invalid content/gallery.json\n${z.prettifyError(parsed.error)}`);
  const ids = new Set<string>();
  for (const item of parsed.data) {
    if (ids.has(item.id)) throw new Error(`Duplicate gallery id "${item.id}" in content/gallery.json`);
    ids.add(item.id);
  }
  await Promise.all(parsed.data.map((g) => assertFile(g.image, `content/gallery.json (${g.id})`)));
  return parsed.data.sort((a, b) => a.order - b.order);
}
