/**
 * Labels and default card copy for categories assigned in content/videos.json.
 */

export interface VideoCategory {
  id: VideoCategoryId;
  /** Filter chip text. */
  label: string;
  /** Small badge on the thumbnail. */
  badge: string;
  /** Label of the secondary "buy the materials" button on cards of this category. */
  shopLabel: string;
}

export const videoCategoryIds = ['beginner', 'bouquets', 'boxes', 'keychains', 'flowers'] as const;
export type VideoCategoryId = (typeof videoCategoryIds)[number];

export const videoCategories: VideoCategory[] = [
  { id: 'beginner', label: 'Beginner Friendly', badge: 'Beginner', shopLabel: 'Get Starter Kit' },
  { id: 'bouquets', label: 'Flower Bouquets', badge: 'Flower Bouquet', shopLabel: 'Get Materials from Shopee' },
  { id: 'boxes', label: 'Gift & Hampers', badge: 'Gift Hampers', shopLabel: 'Get Box & Hamper Kit' },
  { id: 'keychains', label: 'Keychains & Charms', badge: 'Keychains', shopLabel: 'Get Bead Supplies' },
  { id: 'flowers', label: 'Artificial Flowers', badge: 'Flowers', shopLabel: 'Get Materials from Shopee' },
];

/** Chip order in the UI (the "All Tutorials" chip is always first). */
export const videoChipOrder = ['bouquets', 'boxes', 'keychains', 'flowers', 'beginner'] as const;
