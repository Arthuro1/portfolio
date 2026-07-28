import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  reserveChatSlot,
  isDistributedLimiterConfigured,
  __resetInMemoryLimiterForTests,
} from "@/lib/rate-limit";
import { getChatConfig } from "@/lib/chat-config";

// Fake Upstash so the Redis code path can be exercised without credentials.
const redisState = vi.hoisted(() => ({ counters: new Map<string, number>() }));

vi.mock("@upstash/redis", () => ({
  Redis: class {
    async incr(key: string) {
      const n = (redisState.counters.get(key) ?? 0) + 1;
      redisState.counters.set(key, n);
      return n;
    }
    async expire() {
      return 1;
    }
    async decr(key: string) {
      const n = (redisState.counters.get(key) ?? 1) - 1;
      redisState.counters.set(key, n);
      return n;
    }
  },
}));

vi.mock("@upstash/ratelimit", () => ({
  Ratelimit: class {
    static slidingWindow() {
      return { kind: "sliding" };
    }
    static fixedWindow() {
      return { kind: "fixed" };
    }
    async limit() {
      // Rate/daily always pass here; these tests target the concurrency guard.
      return { success: true, reset: Date.now() + 60_000 };
    }
  },
}));

beforeEach(() => {
  __resetInMemoryLimiterForTests();
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  delete process.env.CHAT_MAX_REQUESTS_PER_MINUTE;
  delete process.env.CHAT_MAX_CONCURRENT_PER_CLIENT;
});

describe("in-memory fallback limiter", () => {
  it("reports that no distributed limiter is configured without Upstash env", () => {
    expect(isDistributedLimiterConfigured()).toBe(false);
  });

  it("allows up to the per-minute limit then blocks with 429", async () => {
    process.env.CHAT_MAX_REQUESTS_PER_MINUTE = "3";
    process.env.CHAT_MAX_CONCURRENT_PER_CLIENT = "10";
    const cfg = getChatConfig();

    const outcomes = [];
    for (let i = 0; i < 4; i++) {
      const r = await reserveChatSlot("client-a", cfg);
      outcomes.push(r);
      await r.release(); // free the concurrency slot so only the rate matters
    }

    expect(outcomes.slice(0, 3).every((r) => r.ok)).toBe(true);
    expect(outcomes[3].ok).toBe(false);
    expect(outcomes[3].status).toBe(429);
    expect(outcomes[3].reason).toBe("rate_limit");
    expect(outcomes[3].retryAfterSeconds).toBeGreaterThan(0);
    expect(outcomes[3].backend).toBe("memory");
  });

  it("enforces the per-client concurrency guard", async () => {
    process.env.CHAT_MAX_REQUESTS_PER_MINUTE = "100";
    process.env.CHAT_MAX_CONCURRENT_PER_CLIENT = "2";
    const cfg = getChatConfig();

    const a = await reserveChatSlot("client-b", cfg);
    const b = await reserveChatSlot("client-b", cfg);
    const c = await reserveChatSlot("client-b", cfg);

    expect(a.ok).toBe(true);
    expect(b.ok).toBe(true);
    expect(c.ok).toBe(false);
    expect(c.reason).toBe("concurrency_limit");

    await a.release();
    const d = await reserveChatSlot("client-b", cfg);
    expect(d.ok).toBe(true);
  });

  it("tracks clients independently", async () => {
    process.env.CHAT_MAX_REQUESTS_PER_MINUTE = "1";
    const cfg = getChatConfig();

    const a = await reserveChatSlot("client-x", cfg);
    await a.release();
    const b = await reserveChatSlot("client-y", cfg);
    await b.release();

    expect(a.ok).toBe(true);
    expect(b.ok).toBe(true);
  });
});

describe("Redis-backed limiter (mocked Upstash)", () => {
  beforeEach(() => {
    __resetInMemoryLimiterForTests();
    redisState.counters.clear();
    process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
    process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";
  });

  afterEach(() => {
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    delete process.env.CHAT_MAX_CONCURRENT_PER_CLIENT;
    __resetInMemoryLimiterForTests();
  });

  it("reports the distributed limiter as configured", () => {
    expect(isDistributedLimiterConfigured()).toBe(true);
  });

  it("uses the redis backend and enforces concurrency via INCR/DECR", async () => {
    process.env.CHAT_MAX_CONCURRENT_PER_CLIENT = "1";
    const cfg = getChatConfig();

    const a = await reserveChatSlot("client-r", cfg);
    expect(a.ok).toBe(true);
    expect(a.backend).toBe("redis");

    const b = await reserveChatSlot("client-r", cfg);
    expect(b.ok).toBe(false);
    expect(b.reason).toBe("concurrency_limit");

    await a.release();
    const c = await reserveChatSlot("client-r", cfg);
    expect(c.ok).toBe(true);
  });
});
