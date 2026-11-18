'use client';

/**
 * Accessible category filtering shared by Tutorials, Products and Gallery.
 *
 *   <FilterScope noun="products">         state holder (renders no DOM)
 *     <FilterChips ... />                 the pill buttons (aria-pressed)
 *     <FilterList items={[...]} />        the grid; "extra" items collapse behind a "Show all" button
 *
 * Cards are rendered on the server and passed in as `node`, so they cost no client JS.
 * Every item is in the server HTML (SEO + no-JS); collapsing/hiding only happens after hydration.
 */
import { createContext, useCallback, useContext, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';

interface FilterState {
  noun: string;
  active: string;
  expanded: boolean;
  /** Increments on every user interaction; 0 = pristine (initial render). */
  version: number;
  setActive: (id: string) => void;
  expand: () => void;
}

const FilterContext = createContext<FilterState | null>(null);

function useFilter() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('Filter components must be rendered inside <FilterScope>');
  return ctx;
}

export function FilterScope({ noun, children }: { noun: string; children: ReactNode }) {
  const [active, setActiveState] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const [version, setVersion] = useState(0);

  const setActive = useCallback((id: string) => {
    setActiveState(id);
    setVersion((v) => v + 1);
  }, []);
  const expand = useCallback(() => {
    setExpanded(true);
    setVersion((v) => v + 1);
  }, []);

  const value = useMemo(() => ({ noun, active, expanded, version, setActive, expand }), [noun, active, expanded, version, setActive, expand]);
  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export interface FilterChipDef {
  id: string;
  label: string;
}

export function FilterChips({
  chips,
  allLabel,
  ariaLabel,
  variant = 'soft',
  className,
}: {
  chips: FilterChipDef[];
  allLabel: string;
  ariaLabel: string;
  variant?: 'soft' | 'solid';
  className?: string;
}) {
  const { active, setActive } = useFilter();
  return (
    <div className={cn('chip-row', className)} role="group" aria-label={ariaLabel}>
      {[{ id: 'all', label: allLabel }, ...chips].map((chip) => (
        <button key={chip.id} type="button" className={cn('chip', variant === 'solid' && 'chip-solid')} aria-pressed={active === chip.id} onClick={() => setActive(chip.id)}>
          {chip.label}
        </button>
      ))}
    </div>
  );
}

export interface FilterItem {
  key: string;
  categories: string[];
  /** Hidden behind "Show all" until expanded. */
  extra?: boolean;
  node: ReactNode;
  /** Scroll-reveal variant for this item's <li>. */
  variant?: 'up' | 'mask';
}

export function FilterList({
  items,
  className,
  cols = 3,
  empty,
  showMoreLabel,
}: {
  items: FilterItem[];
  className?: string;
  /** Number of grid columns on desktop: used to stagger each row from 0. */
  cols?: number;
  empty: ReactNode;
  /** When set, items marked `extra` collapse behind a button with this label. */
  showMoreLabel?: string;
}) {
  const { noun, active, expanded, version, expand } = useFilter();
  const listRef = useRef<HTMLUListElement>(null);

  const collapsed = active === 'all' && !expanded;
  const hasExtras = items.some((i) => i.extra);
  let shown = 0;

  const rendered = items.map((item, i) => {
    const match = active === 'all' || item.categories.includes(active);
    const visible = match && !(collapsed && item.extra);
    const n = visible ? shown++ : 0;
    const touched = version > 0;
    return (
      <Reveal
        as="li"
        key={item.key}
        variant={item.variant ?? 'up'}
        index={i % cols}
        immediate={touched && visible}
        hidden={!match}
        data-extra={item.extra ? '' : undefined}
        className={cn(touched && visible && (version % 2 ? 'fi-a' : 'fi-b'))}
        style={{ '--n': Math.min(n, 8) } as CSSProperties}
      >
        {item.node}
      </Reveal>
    );
  });

  const onShowMore = () => {
    expand();
    // The button disappears, so hand keyboard focus to the first newly revealed card.
    setTimeout(() => listRef.current?.querySelector<HTMLElement>('[data-extra] a')?.focus({ preventScroll: true }), 60);
  };

  return (
    <>
      <ul ref={listRef} className={className} data-collapsed={collapsed && hasExtras ? '' : undefined}>
        {rendered}
      </ul>

      {shown === 0 && version > 0 && <div className="mt-8 rounded-2xl bg-white p-6 text-center text-sm text-muted shadow-card">{empty}</div>}
      <p className="sr-only" aria-live="polite">
        {version === 0 ? '' : shown ? `Showing ${shown} ${noun}` : `No ${noun} in this category yet`}
      </p>

      {showMoreLabel && hasExtras && active === 'all' && !expanded && (
        <div className="mt-10 flex justify-center">
          <button type="button" onClick={onShowMore} className="btn btn-white js-only px-6 py-3 text-sm">
            {showMoreLabel}
            <Icon name="chevron-down" className="size-4" />
          </button>
        </div>
      )}
    </>
  );
}
