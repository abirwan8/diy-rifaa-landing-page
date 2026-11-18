import 'server-only';
import fs from 'node:fs/promises';
import path from 'node:path';
import { z } from 'zod';
import { site } from '@/data/site';
import { videoCategoryIds } from '@/data/video-config';

const videoIdPattern = /^[A-Za-z0-9_-]{11}$/;
const youtubeUrlSchema = z.url().refine((value) => {
  const url = new URL(value);
  if (url.protocol !== 'https:') return false;
  if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(url.hostname)) {
    return url.pathname === '/watch' && videoIdPattern.test(url.searchParams.get('v') ?? '');
  }
  return url.hostname === 'youtu.be' && videoIdPattern.test(url.pathname.slice(1));
}, 'Must be a YouTube video URL');
const thumbnailSchema = z.union([
  z.string().regex(/^\/images\/.+\.(jpe?g|png|webp|avif)$/i),
  z.url().refine((value) => {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'i.ytimg.com';
  }, 'Remote thumbnails must use https://i.ytimg.com'),
]);
const shopeeUrlSchema = z.url().refine((value) => /(^|\.)(shopee\.[a-z.]{2,}|shp\.ee|shope\.ee)$/i.test(new URL(value).hostname), {
  message: 'Must be a Shopee link (shopee.co.id, shp.ee, ...)',
});
const videoSchema = z.object({
  id: z.string().min(3),
  youtubeUrl: youtubeUrlSchema.optional(),
  title: z.string().min(5).max(200),
  description: z.string().max(500).optional(),
  thumbnail: thumbnailSchema.optional(),
  publishedAt: z.iso.datetime(),
  views: z.number().int().nonnegative().optional(),
  durationSeconds: z.number().int().positive().optional(),
  categories: z.array(z.enum(videoCategoryIds)),
  shopeeUrl: shopeeUrlSchema.optional(),
  shopeeLabel: z.string().min(1).max(80).optional(),
});

export type Video = z.infer<typeof videoSchema> & {
  url: string;
  thumbnail: string;
  live: boolean;
  youtubeId: string | undefined;
};

export interface ChannelStats {
  subscribers: number;
  videoCount: number;
  url: string;
}

const videosPath = path.join(process.cwd(), 'content', 'videos.json');

export async function getVideos(): Promise<Video[]> {
  let raw: unknown;
  try {
    raw = JSON.parse(await fs.readFile(videosPath, 'utf8'));
  } catch (cause) {
    throw new Error(`Unable to read content/videos.json: ${cause instanceof Error ? cause.message : 'unknown error'}`);
  }

  const parsed = z.array(videoSchema).safeParse(raw);
  if (!parsed.success) throw new Error(`Invalid content/videos.json\n${z.prettifyError(parsed.error)}`);

  const ids = new Set<string>();
  const videos = await Promise.all(parsed.data.map(async (video) => {
    if (ids.has(video.id)) throw new Error(`Duplicate video id "${video.id}" in content/videos.json`);
    ids.add(video.id);

    const youtubeId = video.youtubeUrl
      ? (() => {
          const url = new URL(video.youtubeUrl);
          return url.hostname === 'youtu.be' ? url.pathname.slice(1) : url.searchParams.get('v')!;
        })()
      : videoIdPattern.test(video.id) ? video.id : undefined;
    const live = youtubeId !== undefined;
    if (!video.thumbnail && !live) throw new Error(`Video "${video.id}" needs a thumbnail in content/videos.json`);
    const thumbnail = video.thumbnail ?? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
    if (thumbnail.startsWith('/images/')) {
      try {
        await fs.access(path.join(process.cwd(), 'public', thumbnail));
      } catch {
        throw new Error(`Video "${video.id}": thumbnail "${thumbnail}" does not exist in /public`);
      }
    }

    return {
      ...video,
      url: video.youtubeUrl ?? (youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : site.youtube.channelUrl),
      thumbnail,
      live,
      youtubeId,
    };
  }));
  return videos;
}
