import { headers } from "next/headers";

/**
 * Server-only. A sliding-window rate limiter kept in memory.
 *
 * Free, and enough to stop one script hammering the contact form. Know its
 * limits: counts live in a single server process, so they reset on every
 * deploy and cold start, and on a serverless host each warm instance keeps its
 * own. If spam starts getting through, keep this interface and back it with a
 * shared store such as Upstash Redis.
 */

export type RateLimitResult = { ok: true; remaining: number } | { ok: false; retryAfterMs: number };

const hits = new Map<string, number[]>();

/** Clear out idle keys every so often, so the map can't grow without bound. */
const SWEEP_EVERY = 500;
let calls = 0;

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);

  if (++calls % SWEEP_EVERY === 0) {
    for (const [storedKey, times] of hits) {
      if (now - times[times.length - 1] >= windowMs) hits.delete(storedKey);
    }
  }

  if (recent.length >= limit) {
    hits.set(key, recent);
    return { ok: false, retryAfterMs: windowMs - (now - recent[0]) };
  }

  recent.push(now);
  hits.set(key, recent);
  return { ok: true, remaining: limit - recent.length };
}

/**
 * The visitor's IP, as far as it can be known. On Vercel the platform sets
 * x-forwarded-for itself, so it can be trusted. On a self-hosted server with
 * no proxy in front, anyone can send that header — treat the limit as a speed
 * bump there, not a wall.
 */
export function getClientIp(): string {
  const requestHeaders = headers();
  return (
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip")?.trim() ||
    "unknown"
  );
}
