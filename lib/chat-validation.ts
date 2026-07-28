/**
 * Strict schema validation for the chat request body.
 *
 * The wire contract is intentionally tiny and closed:
 *
 *     { "message": string }
 *
 * Anything else — extra fields, wrong types, nested objects, empty or
 * whitespace-only strings, control characters, absurd repetition, or content
 * over the configured length — is rejected. The client is never sent the
 * failure `code`; the route maps it to a generic, safe message.
 */

import type { ChatConfig } from "./chat-config";

export type ValidationFailure =
  | "not_object"
  | "extra_fields"
  | "missing_message"
  | "empty_message"
  | "too_long"
  | "invalid_chars"
  | "repetition";

export type ValidationResult =
  | { ok: true; message: string }
  | { ok: false; code: ValidationFailure };

/**
 * Reject C0 control chars (except tab, newline, carriage-return), DEL, and C1
 * control chars. These have no legitimate place in a chat question and are a
 * common vector for log injection / terminal escape sequences. Implemented as
 * a code-point scan rather than a regex to keep the source free of literal
 * control bytes.
 */
function hasDisallowedControlChar(input: string): boolean {
  for (let i = 0; i < input.length; i++) {
    const code = input.charCodeAt(i);
    if (code === 0x09 || code === 0x0a || code === 0x0d) continue; // \t \n \r
    if (code <= 0x1f) return true; // other C0 controls
    if (code >= 0x7f && code <= 0x9f) return true; // DEL + C1 controls
  }
  return false;
}

// 50+ of the same character in a row is not a real question — it is a token /
// cost amplification attempt.
const EXCESSIVE_RUN = /(.)\1{49,}/;

export function validateChatBody(
  value: unknown,
  cfg: ChatConfig,
): ValidationResult {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return { ok: false, code: "not_object" };
  }

  // Closed schema: reject any field other than `message`.
  const keys = Object.keys(value as Record<string, unknown>);
  for (const key of keys) {
    if (key !== "message") return { ok: false, code: "extra_fields" };
  }

  const raw = (value as { message?: unknown }).message;
  if (typeof raw !== "string") {
    return { ok: false, code: "missing_message" };
  }

  if (hasDisallowedControlChar(raw)) {
    return { ok: false, code: "invalid_chars" };
  }

  const message = raw.trim();
  if (message.length === 0) {
    return { ok: false, code: "empty_message" };
  }

  const maxLength = Math.min(cfg.maxMessageLength, cfg.maxTotalCharacters);
  if (message.length > maxLength) {
    return { ok: false, code: "too_long" };
  }

  if (EXCESSIVE_RUN.test(message)) {
    return { ok: false, code: "repetition" };
  }

  return { ok: true, message };
}
