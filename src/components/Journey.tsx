import { Icon, type IconName } from './ui/Icon';
import { Reveal } from './ui/Reveal';

const steps: { icon: IconName; tag: string; title: string; text: string }[] = [
  {
    icon: 'play',
    tag: 'Free on YouTube',
    title: 'Watch',
    text: 'Discover relaxing, step-by-step DIY tutorials on our YouTube channel. Follow along with clear camera angles, slow demonstrations, and pro tips.',
  },
  {
    icon: 'shopping-bag',
    tag: 'Shipped from Shopee',
    title: 'Gather',
    text: 'Find the exact ribbons, specialty Korean wrap papers, adhesives, and all-in-one DIY kit bundles directly in our verified Shopee official storefront.',
  },
  {
    icon: 'scissors',
    tag: 'At your own pace',
    title: 'Create',
    text: 'Sip your tea, follow along at your own comfortable rhythm, and experience the pure mindful joy of gifting a handmade creation made with genuine love.',
  },
];

export function Journey() {
  return (
    <section aria-labelledby="journey-title" className="pt-20 pb-6 sm:pt-24">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">The Creative Journey</p>
          <h2 id="journey-title" className="section-title mt-3">
            <span className="font-serif">From </span> Inspiration to Creation
          </h2>
          <p className="section-lead mx-auto mt-4">We bridge the gap between learning a craft and finding the exact materials to make it effortlessly.</p>
        </Reveal>

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} index={i}>
              <article className="card group h-full p-7 transition duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-lift">
                <span className="grid size-14 place-items-center rounded-2xl bg-berry-500 text-white transition duration-500 ease-spring group-hover:-rotate-6 group-hover:scale-110">
                  <Icon name={s.icon} className="size-6" solid={s.icon === 'play'} />
                </span>
                <div className="mt-6">
                  <span className="pill">{s.tag}</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
