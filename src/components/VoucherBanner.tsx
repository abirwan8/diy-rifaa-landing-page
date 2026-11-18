import { brandDisplay, site } from '@/data/site';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';

export function VoucherBanner() {
  return (
    <Reveal
      as="aside"
      variant="scale"
      aria-label="Shopee store benefits"
      className="relative mt-14 overflow-hidden rounded-[2rem] bg-linear-to-r from-blush-300 via-blush-300 to-blush-200 p-6 shadow-card sm:p-8"
    >
      <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4 sm:items-center sm:gap-5">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-berry-600 text-white shadow-berry">
            <Icon name="store" className="size-6" />
          </span>
          <div>
            <h3 className="flex flex-wrap items-center gap-2.5 text-lg font-semibold">
              {brandDisplay} Official Shopee Store
              <span className="rounded-full bg-berry-600 px-2.5 py-0.5 text-[10px] font-bold text-white">Official</span>
            </h3>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">Daily shipping nationwide across Indonesia with extra bubble wrap &amp; reinforced packaging protection.</p>
          </div>
        </div>
        <a href={site.shopee.vouchersUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary shrink-0 px-6 py-3.5 text-sm">
          Claim Vouchers on Shopee
          <Icon name="arrow-right" className="btn-icon btn-icon-nudge size-4" />
        </a>
      </div>
    </Reveal>
  );
}
