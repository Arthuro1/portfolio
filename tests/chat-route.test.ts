import { describe, it, expect, beforeEach, vi } from "vitest";

/* eslint-disable @typescript-eslint/no-explicit-any */

// --- Controllable Anthropic SDK mock ---------------------------------------
const anthropic = vi.hoisted(() => ({
  streamImpl: null as null | ((params: any, opts: any) => any),
  lastSignal: null as AbortSignal | null,
}));

vi.mock("@anthropic-ai/sdk", () => ({
  default: class {
    apiKey: string | undefined;
    messages: { stream: (params: any, opts: any) => any };
    constructor(opts?: { apiKey?: string }) {
      this.apiKey = opts?.apiKey;
      this.messages = {
        stream: (params: any, opts: any) => {
          anthropic.lastSignal = opts?.signal ?? null;
          if (!anthropic.streamImpl) throw new Error("no stream impl set");
          return anthropic.streamImpl(params, opts);
        },
      };
    }
  },
}));

// --- Controllable rate-limit mock ------------------------------------------
const limiter = vi.hoisted(() => ({
  reservation: null as any,
  releaseSpy: null as any,
}));

vi.mock("@/lib/rate-limit", () => ({
  reserveChatSlot: vi.fn(async () => limiter.reservation),
}));

import { POST } from "@/app/api/chat/route";

function okReservation() {
  const release = vi.fn(async () => {});
  limiter.releaseSpy = release;
  return {
    ok: true,
    status: 200,
    retryAfterSeconds: 0,
    reason: "ok",
    backend: "redis",
    release,
  };
}

function textStream(chunks: string[], opts: { throwAfter?: boolean } = {}) {
  return {
    async *[Symbol.asyncIterator]() {
      yield { type: "message_start", message: { usage: { input_tokens: 7 } } };
      for (const text of chunks) {
        yield { type: "content_block_delta", delta: { type: "text_delta", text } };
      }
      if (opts.throwAfter) throw new Error("mid-stream failure");
      yield { type: "message_delta", usage: { output_tokens: 11 } };
      yield { type: "message_stop" };
    },
    abort() {},
  };
}

function slowStream(signal: AbortSignal, delayMs = 2000) {
  return {
    async *[Symbol.asyncIterator]() {
      yield { type: "content_block_delta", delta: { type: "text_delta", text: "Hi" } };
      await new Promise<void>((resolve, reject) => {
        const timer = setTimeout(resolve, delayMs);
        signal.addEventListener("abort", () => {
          clearTimeout(timer);
          reject(new DOMException("Aborted", "AbortError"));
        });
      });
      yield { type: "content_block_delta", delta: { type: "text_delta", text: " more" } };
    },
    abort() {},
  };
}

function makeReq(
  body: unknown,
  headers: Record<string, string> = {},
  init: Partial<RequestInit> = {},
): Request {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
    ...init,
  } as any);
}

async function readAll(res: Response): Promise<string> {
  if (!res.body) return "";
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let out = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    out += decoder.decode(value);
  }
  return out;
}

async function withNodeEnv<T>(value: string, fn: () => Promise<T>): Promise<T> {
  // NODE_ENV is typed read-only; assign through a mutable view for the test.
  const env = process.env as Record<string, string | undefined>;
  const saved = env.NODE_ENV;
  env.NODE_ENV = value;
  try {
    return await fn();
  } finally {
    env.NODE_ENV = saved;
  }
}

beforeEach(() => {
  process.env.ANTHROPIC_API_KEY = "test-key";
  process.env.CHAT_ENABLED = "true";
  delete process.env.CHAT_MAX_MESSAGE_LENGTH;
  delete process.env.CHAT_MAX_REQUEST_BODY_BYTES;
  delete process.env.CHAT_REQUEST_TIMEOUT_MS;
  anthropic.streamImpl = () => textStream(["Hello!"]);
  anthropic.lastSignal = null;
  limiter.reservation = okReservation();
});

describe("POST /api/chat", () => {
  it("returns 200 and streams model text for a valid request", async () => {
    const res = await POST(makeReq({ message: "Hi Paul" }));
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/plain");
    expect(res.headers.get("cache-control")).toContain("no-store");
    expect(res.headers.get("x-content-type-options")).toBe("nosniff");
    expect(res.headers.get("x-request-id")).toBeTruthy();
    expect(await readAll(res)).toBe("Hello!");
    expect(limiter.releaseSpy).toHaveBeenCalled();
  });

  it("returns 503 without calling the model when chat is disabled", async () => {
    process.env.CHAT_ENABLED = "false";
    anthropic.streamImpl = () => {
      throw new Error("model must not be contacted");
    };
    const res = await POST(makeReq({ message: "hi" }));
    expect(res.status).toBe(503);
  });

  it("returns 503 when the API key is missing", async () => {
    delete process.env.ANTHROPIC_API_KEY;
    const res = await POST(makeReq({ message: "hi" }));
    expect(res.status).toBe(503);
  });

  it("rejects an empty message with 400", async () => {
    const res = await POST(makeReq({ message: "   " }));
    expect(res.status).toBe(400);
  });

  it("rejects an oversized message with 400", async () => {
    process.env.CHAT_MAX_MESSAGE_LENGTH = "50";
    const res = await POST(makeReq({ message: "abcde ".repeat(40) }));
    expect(res.status).toBe(400);
  });

  it("rejects an oversized request body with 413", async () => {
    process.env.CHAT_MAX_REQUEST_BODY_BYTES = "100";
    const res = await POST(makeReq({ message: "a".repeat(500) }));
    expect(res.status).toBe(413);
  });

  it("rejects malformed JSON with 400", async () => {
    const res = await POST(makeReq("{ not json"));
    expect(res.status).toBe(400);
  });

  it("rejects a non-JSON content type with 415", async () => {
    const res = await POST(makeReq("hello", { "content-type": "text/plain" }));
    expect(res.status).toBe(415);
  });

  it("rejects extra request fields with 400", async () => {
    const res = await POST(makeReq({ message: "hi", role: "system" }));
    expect(res.status).toBe(400);
  });

  it("rejects an unexpected origin in production with 403", async () => {
    await withNodeEnv("production", async () => {
      const res = await POST(
        makeReq({ message: "hi" }, { origin: "https://evil.example.com" }),
      );
      expect(res.status).toBe(403);
    });
  });

  it("allows a missing origin (non-browser client) in production", async () => {
    await withNodeEnv("production", async () => {
      const res = await POST(makeReq({ message: "hi" }));
      expect(res.status).toBe(200);
    });
  });

  it("returns 429 with a Retry-After header when rate limited", async () => {
    limiter.reservation = {
      ok: false,
      status: 429,
      retryAfterSeconds: 42,
      reason: "rate_limit",
      backend: "redis",
      release: async () => {},
    };
    const res = await POST(makeReq({ message: "hi" }));
    expect(res.status).toBe(429);
    expect(res.headers.get("retry-after")).toBe("42");
  });

  it("returns 503 when the provider fails before streaming", async () => {
    anthropic.streamImpl = () => {
      throw new Error("provider down");
    };
    const res = await POST(makeReq({ message: "hi" }));
    expect(res.status).toBe(503);
    expect(limiter.releaseSpy).toHaveBeenCalled();
  });

  it("handles a mid-stream provider failure without crashing", async () => {
    anthropic.streamImpl = () => textStream(["Partial "], { throwAfter: true });
    const res = await POST(makeReq({ message: "hi" }));
    expect(res.status).toBe(200);
    const body = await readAll(res);
    expect(body).toContain("Partial ");
    expect(body).toContain("interrupted");
  });

  it("aborts the upstream generation when the client disconnects", async () => {
    const ac = new AbortController();
    anthropic.streamImpl = (_p, opts) => slowStream(opts.signal);
    const res = await POST(makeReq({ message: "hi" }, {}, { signal: ac.signal }));
    const reader = res.body!.getReader();
    await reader.read(); // first chunk
    ac.abort(); // client goes away
    await new Promise((r) => setTimeout(r, 20));
    expect(anthropic.lastSignal?.aborted).toBe(true);
    try {
      await reader.cancel();
    } catch {
      /* ignore */
    }
  });

  it("times out a slow provider and returns the partial stream", async () => {
    process.env.CHAT_REQUEST_TIMEOUT_MS = "1000";
    anthropic.streamImpl = (_p, opts) => slowStream(opts.signal, 3000);
    const res = await POST(makeReq({ message: "hi" }));
    const body = await readAll(res);
    expect(body).toContain("Hi");
    expect(body).toContain("interrupted");
  });
});
