import Image from 'next/image';
import { site } from '@/data/site';
import { videoCategories } from '@/data/video-config';
import { formatCompact, formatDuration, timeAgo } from '@/lib/format';
import type { Video } from '@/lib/videos';
import { Icon } from './ui/Icon';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

export function VideoCard({ video }: { video: Video }) {
  const primary = videoCategories.find((c) => video.categories.includes(c.id));
  const shopHref = video.shopeeUrl ?? site.shopee.storeUrl;
  const shopLabel = video.shopeeLabel ?? primary?.shopLabel ?? 'Get Materials from Shopee';

  return (
    <article className="card group flex h-full flex-col p-3 transition duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-lift">
      {/* The "Watch Tutorial" button below is the keyboard/screen-reader link; this one is a bigger pointer target. */}
      <a href={video.url} {...external} tabIndex={-1} aria-hidden="true" className="relative block aspect-video overflow-hidden rounded-[1.2rem] bg-blush-300">
        {/* 16:9 box + object-cover also crops the black letterbox bars baked into YouTube's hqdefault image. */}
        <Image
          src={video.thumbnail}
          alt=""
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition duration-700 ease-out-expo group-hover:scale-[1.06]"
        />
        <span className="absolute inset-0 bg-linear-to-t from-cocoa-900/35 via-transparent to-transparent" />
        {primary && <span className="absolute top-2.5 left-2.5 rounded-full bg-berry-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-berry">{primary.badge}</span>}
        <span className="absolute inset-0 grid place-items-center">
          <span className="play-btn relative grid size-12 place-items-center rounded-full bg-white/95 text-berry-600 shadow-card transition duration-500 ease-spring group-hover:scale-110">
            <Icon name="play" solid className="ml-0.5 size-5" />
          </span>
        </span>
        {video.durationSeconds && (
          <span className="absolute right-2.5 bottom-2.5 rounded-md bg-cocoa-900/80 px-1.5 py-0.5 text-[11px] font-semibold text-white tabular-nums">{formatDuration(video.durationSeconds)}</span>
        )}
      </a>

      <div className="flex flex-1 flex-col px-2 pt-4 pb-1">
        <p className="flex flex-wrap items-center gap-x-2 text-xs text-muted">
          {video.views !== undefined && (
            <>
              <span>{formatCompact(video.views)} views</span>
              <span aria-hidden="true" className="size-1 rounded-full bg-blush-500" />
            </>
          )}
          <time dateTime={video.publishedAt}>{timeAgo(video.publishedAt)}</time>
        </p>
        <h3 className="mt-2 line-clamp-2 min-h-[2.8em] text-[15px] leading-snug font-semibold">{video.title}</h3>

        <div className="mt-auto flex flex-col gap-2 pt-5">
          <a href={video.url} {...external} className="btn bg-berry-500 w-full py-2.5 text-[13px] text-white">
            <Icon name="play" solid className="size-3.5" />
            Watch Tutorial
            <span className="sr-only">: {video.title} (opens YouTube)</span>
          </a>
          <a href={shopHref} {...external} className="btn w-full bg-blush-100 py-2.5 text-xs text-berry-700 ring-1 ring-blush-400/70 hover:bg-blush-300">
            <Icon name="shopping-bag" className="size-3.5" />
            {shopLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
