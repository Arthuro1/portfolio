/**
 * Validated, environment-driven configuration for the chat endpoint.
 *
 * Every value is read lazily (on each call) so that operators can flip limits
 * or the kill switch via Vercel environment variables without a rebuild, and
 * so tests can override `process.env` between cases. All numeric inputs are
 * validated and clamped to a safe range; malformed values fall back to a
 * secure default instead of disabling a control.
 */

export type ChatConfig = {
  /** Master kill switch. When false the endpoint returns 503 without work. */
  enabled: boolean;
  /** Per-client requests allowed per rolling 60s window. */
  maxRequestsPerMinute: number;
  /** Reserved for a future server-side history contract (turns per session). */
  maxMessages: number;
  /** Hard cap on a single user message, in characters (after trim). */
  maxMessageLength: number;
  /** Absolute upper bound on decoded message characters (defense in depth). */
  maxTotalCharacters: number;
  /** Cap passed to the model as max_tokens. */
  maxOutputTokens: number;
  /** Reject request bodies larger than this many bytes with 413. */
  maxRequestBodyBytes: number;
  /** Abort the upstream model call after this many milliseconds. */
  requestTimeoutMs: number;
  /** Concurrent in-flight generations allowed per client. */
  maxConcurrentPerClient: number;
  /** Global safety cap on generations per day (0 disables it). */
  globalDailyLimit: number;
};

type IntBounds = { min: number; max: number; fallback: number };

function readInt(name: string, bounds: IntBounds): number {
  const raw = process.env[name];
  if (raw === undefined || raw.trim() === "") return bounds.fallback;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) {
    return bounds.fallback;
  }
  if (parsed < bounds.min) return bounds.min;
  if (parsed > bounds.max) return bounds.max;
  return parsed;
}

function readBool(name: string, fallback: boolean): boolean {
  const raw = process.env[name];
  if (raw === undefined || raw.trim() === "") return fallback;
  return !/^(false|0|off|no|disabled)$/i.test(raw.trim());
}

export function getChatConfig(): ChatConfig {
  return {
    enabled: readBool("CHAT_ENABLED", true),
    maxRequestsPerMinute: readInt("CHAT_MAX_REQUESTS_PER_MINUTE", {
      min: 1,
      max: 240,
      fallback: 8,
    }),
    maxMessages: readInt("CHAT_MAX_MESSAGES", {
      min: 1,
      max: 100,
      fallback: 10,
    }),
    maxMessageLength: readInt("CHAT_MAX_MESSAGE_LENGTH", {
      min: 1,
      max: 20000,
      fallback: 1500,
    }),
    maxTotalCharacters: readInt("CHAT_MAX_TOTAL_CHARACTERS", {
      min: 1,
      max: 100000,
      fallback: 8000,
    }),
    maxOutputTokens: readInt("CHAT_MAX_OUTPUT_TOKENS", {
      min: 16,
      max: 4096,
      fallback: 400,
    }),
    maxRequestBodyBytes: readInt("CHAT_MAX_REQUEST_BODY_BYTES", {
      min: 256,
      max: 1_000_000,
      fallback: 32_000,
    }),
    requestTimeoutMs: readInt("CHAT_REQUEST_TIMEOUT_MS", {
      min: 1000,
      max: 120_000,
      fallback: 20_000,
    }),
    maxConcurrentPerClient: readInt("CHAT_MAX_CONCURRENT_PER_CLIENT", {
      min: 1,
      max: 20,
      fallback: 2,
    }),
    globalDailyLimit: readInt("CHAT_GLOBAL_DAILY_LIMIT", {
      min: 0,
      max: 10_000_000,
      fallback: 2000,
    }),
  };
}
