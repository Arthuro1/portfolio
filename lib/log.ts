/**
 * Minimal, privacy-preserving structured logging for security-relevant events
 * on the chat endpoint.
 *
 * Rules enforced by construction:
 *  - Never logs prompts, model output, API keys, Redis credentials, auth
 *    headers, or full IP addresses.
 *  - Client identifiers are one-way hashed and truncated.
 *  - Emits a single JSON line per event so it is greppable and ingestible by
 *    Vercel / log drains without leaking free-form text.
 */

import { createHash, randomUUID } from "node:crypto";

export type SecurityEvent = {
  requestId: string;
  route: string;
  /** High-level outcome category, e.g. "ok", "rejected", "error". */
  result: string;
  /** Machine-readable reason, e.g. "rate_limit", "validation", "kill_switch". */
  reason?: string;
  /** HTTP status returned to the client. */
  status?: number;
  /** Hashed+truncated client identifier (never the raw IP). */
  client?: string;
  /** Rate-limit backend actually used ("redis" | "memory"). */
  limiter?: string;
  /** Upstream provider latency in ms. */
  providerMs?: number;
  /** Upstream provider status category ("ok" | "timeout" | "error"). */
  providerStatus?: string;
  /** Approximate token usage when available. */
  inputTokens?: number;
  outputTokens?: number;
  /** True when the client disconnected / request was aborted. */
  aborted?: boolean;
  /** Validation failure category (never the offending content). */
  validation?: string;
};

/** Cryptographically strong request identifier for correlation. */
export function newRequestId(): string {
  return randomUUID();
}

/**
 * One-way hash a client identifier (typically an IP) so it can be used as a
 * rate-limit key and appear in logs without storing the raw address. A
 * per-deployment salt (IP_HASH_SALT) makes the digest non-reversible across
 * deployments; a constant fallback keeps it working if the salt is unset.
 */
export function hashClientId(value: string): string {
  const salt = process.env.IP_HASH_SALT || "portfolio-chat-static-salt";
  return createHash("sha256")
    .update(`${salt}:${value}`)
    .digest("hex")
    .slice(0, 16);
}

export function logSecurityEvent(event: SecurityEvent): void {
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    kind: "security",
    ...event,
  });
  // Route errors to stderr so alerting can key off log level; everything else
  // to stdout.
  if (event.result === "error") {
    console.error(line);
  } else {
    console.log(line);
  }
}
