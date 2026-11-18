import Image from 'next/image';
import { brandDisplay } from '@/data/site';
import { cn } from '@/lib/cn';

export function Logo({ className, wordmark = true }: { className?: string; wordmark?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      {wordmark ? (
        <Image src="/logo.png" alt={brandDisplay} width={600} height={195} className="h-12 w-auto shrink-0" />
      ) : (
        <span className="size-9 shrink-0 overflow-hidden">
          <Image src="/logo.png" alt="" width={600} height={195} className="h-9 w-auto max-w-none" />
        </span>
      )}
    </span>
  );
}
