import { About } from '@/components/About';
import { CallToAction } from '@/components/CallToAction';
import { Footer } from '@/components/Footer';
import { Gallery } from '@/components/Gallery';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Journey } from '@/components/Journey';
import { Products } from '@/components/Products';
import { Tutorials } from '@/components/Tutorials';
import { env } from '@/lib/env';
import { site } from '@/data/site';
import { getGallery, getProducts } from '@/lib/content';
import { formatPlus } from '@/lib/format';
import { buildStructuredData, serializeJsonLd } from '@/lib/seo';
import { getVideos } from '@/lib/videos';

/**
 * Page content is validated and rendered at build time from the local content JSON files.
 */
export default async function HomePage() {
  const [products, gallery, videos] = await Promise.all([getProducts(), getGallery(), getVideos()]);
  const channel = {
    subscribers: site.channelStats.subscribers,
    videoCount: videos.length,
    url: site.youtube.channelUrl,
  };

  const jsonLd = serializeJsonLd(buildStructuredData({ origin: new URL(env.SITE_URL), products, videos }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Header subscribersLabel={formatPlus(channel.subscribers)} />
      <main id="main">
        <Hero crafters={channel.subscribers} />
        <Journey />
        <Tutorials videos={videos} channel={channel} />
        <Products products={products} />
        <Gallery items={gallery} />
        <About crafters={channel.subscribers} />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
