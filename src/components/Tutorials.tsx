import { site } from '@/data/site';
import { videoCategories, videoChipOrder } from '@/data/video-config';
import { formatPlus } from '@/lib/format';
import type { ChannelStats, Video } from '@/lib/videos';
import { FilterChips, FilterList, FilterScope, type FilterItem } from './Filter';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';
import { VideoCard } from './VideoCard';

export function Tutorials({ videos, channel }: { videos: Video[]; channel: ChannelStats }) {
  const list = videos.slice(0, site.tutorials.total);
  const chips = videoChipOrder
    .map((id) => videoCategories.find((c) => c.id === id)!)
    .filter((c) => list.some((v) => v.categories.includes(c.id)))
    .map((c) => ({ id: c.id, label: c.label }));

  const items: FilterItem[] = list.map((video, i) => ({
    key: video.id,
    categories: video.categories,
    extra: i >= site.tutorials.initialCount,
    node: <VideoCard video={video} />,
  }));

  return (
    <section id="tutorials" aria-labelledby="tutorials-title" className="pt-20 pb-24 sm:pt-28">
      <div className="container-page">
        <FilterScope noun="tutorials">
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Step-by-Step Inspiration</p>
              <h2 id="tutorials-title" className="section-title mt-3">
                <span className="font-serif">Let’s </span> Make Something Beautiful
              </h2>
              <p className="section-lead mt-4">Curated video guides designed for complete beginners to experienced craftsmen alike.</p>
            </div>
            <a
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-berry-500 px-4 py-2.5 text-[13px] font-semibold text-white ring-1 ring-blush-400/60 transition duration-300 hover:bg-white hover:text-berry-500"
            >
              <Icon name="youtube" className="size-5" />
              {formatPlus(channel.subscribers)} Subscribers on YouTube
            </a>
          </Reveal>

          <Reveal className="mt-8" index={1}>
            <FilterChips chips={chips} allLabel="All Tutorials" ariaLabel="Filter tutorials by topic" />
          </Reveal>

          <FilterList
            items={items}
            cols={4}
            className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            empty={
              <>
                No tutorials in this topic yet.{' '}
                <a className="font-semibold text-berry-600 underline" href={channel.url} target="_blank" rel="noopener noreferrer">
                  Browse the full channel on YouTube
                </a>
                .
              </>
            }
          />

          <Reveal className="mt-12 flex justify-center" variant="scale">
            <a
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-berry-500 max-w-full flex-wrap gap-x-3 gap-y-2 px-5 py-3.5 text-sm whitespace-normal text-white sm:px-6"
            >
              <Icon name="youtube" className="size-6" />
              View All Tutorials on YouTube
              <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-berry-500">700+ Videos</span>
            </a>
          </Reveal>
        </FilterScope>
      </div>
    </section>
  );
}
