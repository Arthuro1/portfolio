import { describe, it, expect, beforeEach, vi } from "vitest";

/* eslint-disable @typescript-eslint/no-explicit-any */

// --- Controllable OpenAI SDK mock (the route talks to OpenRouter through it) --
const provider = vi.hoisted(() => ({
  createImpl: null as null | ((body: any, opts: any) => any),
  lastBody: null as any,
  lastSignal: null as AbortSignal | null,
}));

vi.mock("openai", () => ({
  default: class {
    // Shape of the SDK's API error: HTTP status plus the parsed error body.
    static APIError = class extends Error {
      code: unknown;
      type: unknown;
      constructor(
        public status: number | undefined,
        public error: any,
      ) {
        super(`status ${status}`);
        this.code = error?.code;
        this.type = error?.type;
      }
    };
    chat = {
      completions: {
        create: async (body: any, opts: any) => {
          provider.lastBody = body;
          provider.lastSignal = opts?.signal ?? null;
          if (!provider.createImpl) throw new Error("no create impl set");
          return provider.createImpl(body, opts);
        },
      },
    };
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

function textStream(chunks: string[], opts: { throwAfter?: unknown } = {}) {
  return {
    async *[Symbol.asyncIterator]() {
      for (const text of chunks) {
        yield { choices: [{ index: 0, delta: { content: text }, finish_reason: null }] };
      }
      if (opts.throwAfter) throw opts.throwAfter;
      yield { choices: [{ index: 0, delta: {}, finish_reason: "stop" }] };
      yield { choices: [], usage: { prompt_tokens: 7, completion_tokens: 11 } };
    },
  };
}

// Like the SDK, the stream ends quietly (no error) once the signal aborts.
function slowStream(signal: AbortSignal, delayMs = 2000) {
  return {
    async *[Symbol.asyncIterator]() {
      yield { choices: [{ index: 0, delta: { content: "Hi" }, finish_reason: null }] };
      const aborted = await new Promise<boolean>((resolve) => {
        const timer = setTimeout(() => resolve(false), delayMs);
        signal.addEventListener("abort", () => {
          clearTimeout(timer);
          resolve(true);
        });
      });
      if (aborted) return;
      yield { choices: [{ index: 0, delta: { content: " more" }, finish_reason: "stop" }] };
    },
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
  process.env.OPENROUTER_API_KEY = "test-key";
  process.env.CHAT_ENABLED = "true";
  delete process.env.CHAT_MAX_MESSAGE_LENGTH;
  delete process.env.CHAT_MAX_REQUEST_BODY_BYTES;
  delete process.env.CHAT_REQUEST_TIMEOUT_MS;
  provider.createImpl = () => textStream(["Hello!"]);
  provider.lastBody = null;
  provider.lastSignal = null;
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

  it("asks OpenRouter for the open model with reasoning off and no data collection", async () => {
    await readAll(await POST(makeReq({ message: "Hi Paul" })));
    expect(provider.lastBody).toMatchObject({
      model: "deepseek/deepseek-v4.1-flash",
      stream: true,
      max_tokens: 400,
      reasoning: { effort: "none" },
      provider: { data_collection: "deny" },
    });
    expect(provider.lastBody.messages.map((m: any) => m.role)).toEqual(["system", "user"]);
    expect(provider.lastBody.messages[1].content).toBe("Hi Paul");
  });

  it("returns 503 without calling the model when chat is disabled", async () => {
    process.env.CHAT_ENABLED = "false";
    provider.createImpl = () => {
      throw new Error("model must not be contacted");
    };
    const res = await POST(makeReq({ message: "hi" }));
    expect(res.status).toBe(503);
  });

  it("returns 503 when the API key is missing", async () => {
    delete process.env.OPENROUTER_API_KEY;
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
    provider.createImpl = () => {
      throw new Error("provider down");
    };
    const res = await POST(makeReq({ message: "hi" }));
    expect(res.status).toBe(503);
    expect(limiter.releaseSpy).toHaveBeenCalled();
  });

  it("handles a mid-stream provider failure without crashing", async () => {
    provider.createImpl = () => textStream(["Partial "], { throwAfter: new Error("mid-stream failure") });
    const res = await POST(makeReq({ message: "hi" }));
    expect(res.status).toBe(200);
    const body = await readAll(res);
    expect(body).toContain("Partial ");
    expect(body).toContain("interrupted");
  });

  it("logs the provider's HTTP status and error code when the request is refused", async () => {
    const { default: OpenAI } = (await import("openai")) as any;
    provider.createImpl = () => {
      throw new OpenAI.APIError(401, { code: 401, message: "No auth credentials found" });
    };
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await POST(makeReq({ message: "hi" }));
    expect(res.status).toBe(503);
    expect(limiter.releaseSpy).toHaveBeenCalled();
    const line = JSON.parse(errorLog.mock.calls.at(-1)![0] as string);
    expect(line).toMatchObject({ reason: "provider_error", providerHttpStatus: 401, providerErrorType: "401" });
    expect(JSON.stringify(line)).not.toContain("No auth credentials");
    errorLog.mockRestore();
  });

  it("logs the error code when the provider fails mid-stream", async () => {
    const { default: OpenAI } = (await import("openai")) as any;
    provider.createImpl = () =>
      textStream(["Partial "], { throwAfter: new OpenAI.APIError(undefined, { code: 502, message: "Provider returned error" }) });
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
    const body = await readAll(await POST(makeReq({ message: "hi" })));
    expect(body).toContain("interrupted");
    const line = JSON.parse(errorLog.mock.calls.at(-1)![0] as string);
    expect(line).toMatchObject({ providerStatus: "error", providerErrorType: "502" });
    expect(JSON.stringify(line)).not.toContain("Provider returned error");
    errorLog.mockRestore();
  });

  it("aborts the upstream generation when the client disconnects", async () => {
    const ac = new AbortController();
    provider.createImpl = (_b, opts) => slowStream(opts.signal);
    const res = await POST(makeReq({ message: "hi" }, {}, { signal: ac.signal }));
    const reader = res.body!.getReader();
    await reader.read(); // first chunk
    ac.abort(); // client goes away
    await new Promise((r) => setTimeout(r, 20));
    expect(provider.lastSignal?.aborted).toBe(true);
    try {
      await reader.cancel();
    } catch {
      /* ignore */
    }
  });

  it("times out a slow provider and returns the partial stream", async () => {
    process.env.CHAT_REQUEST_TIMEOUT_MS = "1000";
    provider.createImpl = (_b, opts) => slowStream(opts.signal, 3000);
    const res = await POST(makeReq({ message: "hi" }));
    const body = await readAll(res);
    expect(body).toContain("Hi");
    expect(body).toContain("interrupted");
  });
});
