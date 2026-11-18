export const site = {
  name: "DIY Rifa's",
  legalName: "DIY Rifa's Studio",
  tagline: 'Turn Your Creativity Into Something Beautiful',
  title: "DIY Rifa's – Handmade Gift Tutorials & Craft Supplies",
  description:
    'Free DIY tutorials for satin flower bouquets, gift hampers and beaded keychains, plus studio-tested craft supplies and kits from our official Shopee store.',
  lang: 'en',
  locale: 'en_ID',
  themeColor: '#fff8f8',

  shopee: {
    storeUrl: 'https://shopee.co.id/fefa_craft',
    vouchersUrl: 'https://shopee.co.id/REPLACE_STORE_NAME#voucher',
  },

  youtube: {
    channelUrl: 'https://www.youtube.com/@DIYRifaA',
    subscribeUrl: 'https://www.youtube.com/@DIYRifaA?sub_confirmation=1',
  },

  social: {
    youtube: 'https://www.youtube.com/@DIYRifaA',
    instagram: 'https://www.instagram.com/diy_rifaa/',
    tiktok: 'https://www.tiktok.com/@rifaumi',
    shopee: 'https://shopee.co.id/fefa_craft',
  },

  founder: { name: 'Rifa', role: 'Founder & Craft Creator' },

  /** Subscriber total shown in the site; update this value manually. */
  channelStats: {
    subscribers: 200_000,
  },

  /** Trust badges in the hero. Keep these truthful: they are shown as facts. */
  trust: {
    rating: '4.9/5 Shopee Store Rating',
    quality: '100% Studio-Tested Kits',
  },

  /** How many videos to render. The first `initialCount` show by default. */
  tutorials: { total: 20, initialCount: 4 },
  /** Products visible before "Show all". */
  products: { initialCount: 6 },

  nav: [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'DIY Tutorials', href: '#tutorials', id: 'tutorials' },
    { label: 'Craft Supplies', href: '#supplies', id: 'supplies' },
    { label: 'Inspiration', href: '#inspiration', id: 'inspiration' },
    { label: 'About Us', href: '#about', id: 'about' },
  ],
} as const;

/** Brand name with a typographic apostrophe, for visible text only. */
export const brandDisplay = site.name.replace("'", '’');

export const isPlaceholder = (value: string | undefined | null) => !value || value.includes('REPLACE');

export const productCategoryLabels: Record<string, string> = {
  ribbons: 'Satin Ribbons & Fabric',
  wrapping: 'Bouquet Materials',
  keychain: 'Keychain Accessories',
  beads: 'Beads & Charms',
  kits: 'DIY Gift Kits',
  tools: 'Craft Tools',
  packaging: 'Hampers & Packaging',
};

export const galleryCategoryLabels: Record<string, string> = {
  bouquets: 'Bouquets',
  flowers: 'Artificial Flowers',
  keychains: 'Keychains',
};
