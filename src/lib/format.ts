const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });
const grouped = new Intl.NumberFormat('en-US');

/** 28500 -> "IDR 28,500" (matches the design). */
export const formatIdr = (amount: number) => `IDR ${grouped.format(amount)}`;

/** 54200 -> "54.2K" */
export const formatCompact = (n: number) => compact.format(n);

/** 123456 -> "120K+" (rounds DOWN to 2 significant digits so the "+" stays honest). */
export function formatPlus(n: number): string {
  if (n < 10) return `${n}+`;
  const mag = 10 ** (Math.floor(Math.log10(n)) - 1);
  const floored = Math.round(Math.floor(n / mag) * mag);
  return `${compact.format(floored)}+`;
}

/** 125000 -> "125,000" */
export const formatGrouped = (n: number) => grouped.format(n);

/** Seconds -> "14:20" or "1:02:03". */
export function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  const pad = (v: number) => String(v).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

/** Seconds -> ISO 8601 duration for schema.org ("PT14M20S"). */
export function toIsoDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  return `PT${h ? `${h}H` : ''}${m ? `${m}M` : ''}${s || (!h && !m) ? `${s}S` : ''}`;
}

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

/** "3 weeks ago". Computed at build time; the site is rebuilt on a schedule. */
export function timeAgo(iso: string, now = Date.now()): string {
  const diffSec = Math.round((new Date(iso).getTime() - now) / 1000);
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31_536_000],
    ['month', 2_592_000],
    ['week', 604_800],
    ['day', 86_400],
    ['hour', 3_600],
    ['minute', 60],
  ];
  for (const [unit, secs] of units) {
    if (Math.abs(diffSec) >= secs) return rtf.format(Math.round(diffSec / secs), unit);
  }
  return 'just now';
}
