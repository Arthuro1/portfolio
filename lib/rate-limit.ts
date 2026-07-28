/**
 * Distributed rate limiting + concurrency guard for the chat endpoint.
 *
 * Primary (production) backend: Upstash Redis via @upstash/ratelimit. This is
 * the authoritative limiter and works correctly across Vercel serverless
 * instances. It enforces three things:
 *   1. A per-client sliding window (requests/minute).
 *   2. A global daily safety cap (cost kill-switch).
 *   3. A per-client concurrency guard (in-flight generations).
 *
 * Fallback backend: a *bounded* in-memory limiter, used only when Upstash is
 * not configured (e.g. local dev) or if Redis becomes unreachable. It is
 * best-effort and per-instance — never the intended production authority — but
 * it guarantees that some bound is always enforced, so the endpoint fails
 * safely (never fully open) rather than allowing unlimited model calls.
 *
 * The client identifier passed in is already hashed (see lib/log.ts); raw IPs
 * never reach Redis or memory.
 */

import type { ChatConfig } from "./chat-config";

export type ReservationReason =
  | "ok"
  | "rate_limit"
  | "concurrency_limit"
  | "daily_limit";

export type Reservation = {
  ok: boolean;
  status: number; // 200 when ok, 429 when blocked
  retryAfterSeconds: number; // 0 when ok
  reason: ReservationReason;
  backend: "redis" | "memory";
  /** Releases the concurrency slot. Always safe to call; no-op when nothing reserved. */
  release: () => Promise<void>;
};

const NOOP_RELEASE = async (): Promise<void> => {};

function retryAfterFromReset(resetEpochMs: number): number {
  return Math.max(1, Math.ceil((resetEpochMs - Date.now()) / 1000));
}

function isRedisConfigured(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
  );
}

// --- Redis backend ---------------------------------------------------------
// Kept behind dynamic imports so the packages are only loaded when configured,
// and so the module remains importable in environments without them.

/* eslint-disable @typescript-eslint/no-explicit-any */
type Limiters = {
  redis: any;
  minute: any;
  daily: any | null;
  minutePerWindow: number;
  dailyLimit: number;
};

let cachedLimiters: Limiters | null = null;

async function getLimiters(cfg: ChatConfig): Promise<Limiters | null> {
  if (!isRedisConfigured()) return null;

  if (
    cachedLimiters &&
    cachedLimiters.minutePerWindow === cfg.maxRequestsPerMinute &&
    cachedLimiters.dailyLimit === cfg.globalDailyLimit
  ) {
    return cachedLimiters;
  }

  const [{ Redis }, { Ratelimit }] = await Promise.all([
    import("@upstash/redis"),
    import("@upstash/ratelimit"),
  ]);

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL as string,
    token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
  });

  const minute = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(cfg.maxRequestsPerMinute, "60 s"),
    prefix: "chat:rl",
    analytics: false,
  });

  const daily =
    cfg.globalDailyLimit > 0
      ? new Ratelimit({
          redis,
          limiter: Ratelimit.fixedWindow(cfg.globalDailyLimit, "1 d"),
          prefix: "chat:day",
          analytics: false,
        })
      : null;

  cachedLimiters = {
    redis,
    minute,
    daily,
    minutePerWindow: cfg.maxRequestsPerMinute,
    dailyLimit: cfg.globalDailyLimit,
  };
  return cachedLimiters;
}

async function redisReserve(
  limiters: Limiters,
  clientId: string,
  cfg: ChatConfig,
): Promise<Reservation> {
  // 1. Per-client request rate.
  const perMinute = await limiters.minute.limit(clientId);
  if (!perMinute.success) {
    return {
      ok: false,
      status: 429,
      retryAfterSeconds: retryAfterFromReset(perMinute.reset),
      reason: "rate_limit",
      backend: "redis",
      release: NOOP_RELEASE,
    };
  }

  // 2. Global daily safety cap.
  if (limiters.daily) {
    const daily = await limiters.daily.limit("global");
    if (!daily.success) {
      return {
        ok: false,
        status: 429,
        retryAfterSeconds: retryAfterFromReset(daily.reset),
        reason: "daily_limit",
        backend: "redis",
        release: NOOP_RELEASE,
      };
    }
  }

  // 3. Concurrency guard: bounded counter with a self-healing TTL so a crashed
  // request can never permanently hold a slot.
  const key = `chat:conc:${clientId}`;
  const ttlSeconds = Math.ceil(cfg.requestTimeoutMs / 1000) + 5;
  const count: number = await limiters.redis.incr(key);
  await limiters.redis.expire(key, ttlSeconds);

  if (count > cfg.maxConcurrentPerClient) {
    try {
      await limiters.redis.decr(key);
    } catch {
      /* the TTL will reclaim it */
    }
    return {
      ok: false,
      status: 429,
      retryAfterSeconds: 5,
      reason: "concurrency_limit",
      backend: "redis",
      release: NOOP_RELEASE,
    };
  }

  let released = false;
  const release = async (): Promise<void> => {
    if (released) return;
    released = true;
    try {
      await limiters.redis.decr(key);
    } catch {
      /* the TTL will reclaim it */
    }
  };

  return {
    ok: true,
    status: 200,
    retryAfterSeconds: 0,
    reason: "ok",
    backend: "redis",
    release,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// --- Bounded in-memory fallback backend ------------------------------------

const MEM_MAX_KEYS = 20_000;
const memHits = new Map<string, number[]>();
const memConcurrency = new Map<string, number>();

function pruneMemHits(windowStart: number): void {
  for (const [key, timestamps] of memHits) {
    const live = timestamps.filter((t) => t > windowStart);
    if (live.length === 0) memHits.delete(key);
    else memHits.set(key, live);
  }
}

function memoryReserve(clientId: string, cfg: ChatConfig): Reservation {
  const now = Date.now();
  const windowMs = 60_000;
  const windowStart = now - windowMs;

  const timestamps = (memHits.get(clientId) ?? []).filter(
    (t) => t > windowStart,
  );
  timestamps.push(now);
  memHits.set(clientId, timestamps);

  // Keep the map bounded so it can never grow without limit.
  if (memHits.size > MEM_MAX_KEYS) pruneMemHits(windowStart);

  if (timestamps.length > cfg.maxRequestsPerMinute) {
    const resetMs = timestamps[0] + windowMs;
    return {
      ok: false,
      status: 429,
      retryAfterSeconds: retryAfterFromReset(resetMs),
      reason: "rate_limit",
      backend: "memory",
      release: NOOP_RELEASE,
    };
  }

  const active = memConcurrency.get(clientId) ?? 0;
  if (active >= cfg.maxConcurrentPerClient) {
    return {
      ok: false,
      status: 429,
      retryAfterSeconds: 5,
      reason: "concurrency_limit",
      backend: "memory",
      release: NOOP_RELEASE,
    };
  }
  memConcurrency.set(clientId, active + 1);

  let released = false;
  const release = async (): Promise<void> => {
    if (released) return;
    released = true;
    const current = (memConcurrency.get(clientId) ?? 1) - 1;
    if (current <= 0) memConcurrency.delete(clientId);
    else memConcurrency.set(clientId, current);
  };

  return {
    ok: true,
    status: 200,
    retryAfterSeconds: 0,
    reason: "ok",
    backend: "memory",
    release,
  };
}

// --- Public API ------------------------------------------------------------

export function isDistributedLimiterConfigured(): boolean {
  return isRedisConfigured();
}

export async function reserveChatSlot(
  clientId: string,
  cfg: ChatConfig,
): Promise<Reservation> {
  try {
    const limiters = await getLimiters(cfg);
    if (limiters) return await redisReserve(limiters, clientId, cfg);
  } catch {
    // Redis unreachable/misconfigured at runtime: drop to the bounded
    // in-memory limiter so a bound is still enforced (fail safe, not open).
    cachedLimiters = null;
  }
  return memoryReserve(clientId, cfg);
}

/** Test-only: reset the in-memory fallback state between cases. */
export function __resetInMemoryLimiterForTests(): void {
  memHits.clear();
  memConcurrency.clear();
  cachedLimiters = null;
}
