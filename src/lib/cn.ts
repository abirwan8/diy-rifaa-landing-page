/** Tiny className joiner: cn('a', cond && 'b') */
export const cn = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');
