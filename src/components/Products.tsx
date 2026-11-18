import { productCategoryLabels, site } from '@/data/site';
import type { Product } from '@/lib/content';
import { FilterChips, FilterList, FilterScope, type FilterItem } from './Filter';
import { ProductCard } from './ProductCard';
import { VoucherBanner } from './VoucherBanner';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';

export function Products({ products }: { products: Product[] }) {
  // Chips are generated from the categories that actually have products.
  const chips = Object.entries(productCategoryLabels)
    .filter(([id]) => products.some((p) => p.category === id))
    .map(([id, label]) => ({ id, label }));

  const items: FilterItem[] = products.map((p, i) => ({
    key: p.id,
    categories: [p.category],
    extra: i >= site.products.initialCount,
    node: <ProductCard product={p} />,
  }));

  return (
    <section id="supplies" aria-labelledby="supplies-title" className="pt-4 pb-24 sm:pb-28">
      <div className="container-page">
        <FilterScope noun="products">
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="pill">
                <Icon name="store" className="size-3.5" /> Official Shopee Store
              </p>
              <h2 id="supplies-title" className="section-title mt-4">
                <span className="font-serif">Everything </span>You Need to Create
              </h2>
              <p className="section-lead mt-4">Get the exact ribbons, tools, and DIY kits featured in our tutorials, delivered securely to your doorstep.</p>
            </div>
            <a href={site.shopee.storeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-fit px-5 py-3 text-[13px]">
              <Icon name="store" className="size-4" />
              Open Shopee Store
            </a>
          </Reveal>

          <Reveal className="mt-8" index={1}>
            <FilterChips chips={chips} allLabel="All Supplies" ariaLabel="Filter supplies by category" variant="solid" />
          </Reveal>

          <FilterList
            items={items}
            cols={3}
            className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            showMoreLabel={products.length > site.products.initialCount ? `Show all ${products.length} products` : undefined}
            empty="No products in this category yet. Check the full catalogue on our Shopee store."
          />

          {/* <VoucherBanner /> */}
        </FilterScope>
      </div>
    </section>
  );
}
