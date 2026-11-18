import 'server-only';
import { z } from 'zod';

/**
 * Server-only, validated environment. `server-only` makes the build FAIL if any
 * client component ever imports this file, and none of these names use the
 * NEXT_PUBLIC_ prefix, so Next.js can never inline them into browser bundles.
 */
const schema = z.object({
  SITE_URL: z.url().default('https://www.youtube.com/@DIYRifaA'),
});

const blankToUndefined = (v: string | undefined) => (v && v.trim() !== '' ? v : undefined);

function load() {
  const parsed = schema.safeParse({
    SITE_URL: blankToUndefined(process.env.SITE_URL),
  });
  if (!parsed.success) {
    // Do not echo values (one of them is a secret): print only which keys are wrong.
    const keys = parsed.error.issues.map((i) => `${String(i.path[0])}: ${i.message}`).join('; ');
    throw new Error(`Invalid environment variables: ${keys}`);
  }
  return parsed.data;
}

export const env = load();
