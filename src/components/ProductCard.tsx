import Image from 'next/image';
import { productCategoryLabels } from '@/data/site';
import { cn } from '@/lib/cn';
import { formatCompact, formatIdr } from '@/lib/format';
import type { Product } from '@/lib/content';
import { Icon } from './ui/Icon';

export function ProductCard({ product: p }: { product: Product }) {
  return (
    <article className="card group flex h-full flex-col p-3 transition duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-lift">
      <div className="relative aspect-square overflow-hidden rounded-[1.3rem] bg-blush-300">
        <Image
          src={p.image}
          alt={p.imageAlt}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition duration-700 ease-out-expo group-hover:scale-[1.07]"
        />
        {p.badge && (
          <span className={cn('absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] font-bold shadow-card', p.badgeStyle === 'solid' ? 'bg-berry-600 text-white' : 'bg-blush-300 text-berry-700')}>
            {p.badge}
          </span>
        )}
        {p.rating !== undefined && (
          <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-ink shadow-card">
            <Icon name="star" solid className="size-3 text-berry-600" />
            {p.rating.toFixed(1)}
            {p.sold !== undefined && <span className="font-medium text-muted">· {formatCompact(p.sold)} sold</span>}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-2 pt-5 pb-1">
        <p className="text-[10px] font-bold tracking-[0.14em] text-berry-600 uppercase">{productCategoryLabels[p.category]}</p>
        <h3 className="mt-2 line-clamp-2 min-h-[2.9em] text-[15px] leading-snug font-semibold">{p.name}</h3>

        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between gap-3 border-t border-blush-300/70 pt-4">
            <div>
              <p className="text-[11px] text-muted">Price</p>
              <p className="text-lg leading-tight font-extrabold text-berry-600 tabular-nums">
                <data value={p.price}>{formatIdr(p.price)}</data>
              </p>
            </div>
            <a href={p.shopeeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary px-4 py-2.5 text-[13px]">
              <Icon name="shopping-bag" className="size-4" />
              Buy on Shopee
              <span className="sr-only">: {p.name}</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
