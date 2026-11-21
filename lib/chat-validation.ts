/**
 * Strict schema validation for the chat request body.
 *
 * The wire contract is intentionally small and closed:
 *
 *     { "message": string,
 *       "history"?: [{ "role": "user" | "assistant", "content": string }, ...] }
 *
 * `history` is the visitor's own record of the last few turns. It comes from
 * the browser, so it is untrusted like `message`: every entry passes the same
 * character rules, it must alternate user/assistant starting with a question
 * and ending with an answer, and assistant entries have their own length cap.
 * Only the newest turns that fit CHAT_MAX_MESSAGES and CHAT_MAX_TOTAL_CHARACTERS
 * are kept; older ones are dropped. Anything else — extra fields, wrong types,
 * nested objects, empty strings, control characters, absurd repetition, or
 * content over the configured length — is rejected. The client is never sent
 * the failure `code`; the route maps it to a generic, safe message.
 */

import type { ChatConfig } from "./chat-config";

export type ChatTurn = { role: "user" | "assistant"; content: string };

export type ValidationFailure =
  | "not_object"
  | "extra_fields"
  | "missing_message"
  | "empty_message"
  | "too_long"
  | "invalid_chars"
  | "repetition"
  | "invalid_history"
  | "history_order"
  | "history_content";

export type ValidationResult =
  | { ok: true; message: string; history: ChatTurn[] }
  | { ok: false; code: ValidationFailure };

/**
 * Longest assistant answer accepted back as history. A 400-token answer fits;
 * the widget shortens longer ones before sending them.
 */
export const MAX_HISTORY_ASSISTANT_CHARS = 2000;

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

export type TextCheck =
  | { ok: true; text: string }
  | { ok: false; code: "invalid_chars" | "empty_message" | "too_long" | "repetition" };

/** The character rules every chat text (message or history entry) must pass. */
export function checkText(raw: string, maxLength: number): TextCheck {
  if (hasDisallowedControlChar(raw)) return { ok: false, code: "invalid_chars" };
  const text = raw.trim();
  if (text.length === 0) return { ok: false, code: "empty_message" };
  if (text.length > maxLength) return { ok: false, code: "too_long" };
  if (EXCESSIVE_RUN.test(text)) return { ok: false, code: "repetition" };
  return { ok: true, text };
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readHistory(
  raw: unknown,
  maxUserLength: number,
): { ok: true; turns: ChatTurn[] } | { ok: false; code: ValidationFailure } {
  if (raw === undefined) return { ok: true, turns: [] };
  if (!Array.isArray(raw)) return { ok: false, code: "invalid_history" };

  const turns: ChatTurn[] = [];
  for (let i = 0; i < raw.length; i++) {
    const entry: unknown = raw[i];
    if (!isPlainObject(entry)) return { ok: false, code: "invalid_history" };
    for (const key of Object.keys(entry)) {
      if (key !== "role" && key !== "content") return { ok: false, code: "invalid_history" };
    }
    const { role, content } = entry;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
      return { ok: false, code: "invalid_history" };
    }
    if (role !== (i % 2 === 0 ? "user" : "assistant")) {
      return { ok: false, code: "history_order" };
    }
    const text = checkText(content, role === "user" ? maxUserLength : MAX_HISTORY_ASSISTANT_CHARS);
    if (!text.ok) return { ok: false, code: "history_content" };
    turns.push({ role, content: text.text });
  }
  // The new message is the next question, so the history must end on an answer.
  if (turns.length % 2 !== 0) return { ok: false, code: "history_order" };
  return { ok: true, turns };
}

/**
 * Keep the newest complete question/answer pairs that fit both budgets: at
 * most `maxMessages` entries, and `messageLength` plus every kept entry within
 * `maxTotalCharacters`. Expects alternating pairs, as `validateChatBody`
 * returns them.
 */
export function capHistory(
  turns: ChatTurn[],
  messageLength: number,
  limits: Pick<ChatConfig, "maxMessages" | "maxTotalCharacters">,
): ChatTurn[] {
  let budget = limits.maxTotalCharacters - messageLength;
  let start = turns.length;
  while (start >= 2 && turns.length - start + 2 <= limits.maxMessages) {
    const size = turns[start - 2].content.length + turns[start - 1].content.length;
    if (size > budget) break;
    budget -= size;
    start -= 2;
  }
  return turns.slice(start);
}

export function validateChatBody(
  value: unknown,
  cfg: ChatConfig,
): ValidationResult {
  if (!isPlainObject(value)) {
    return { ok: false, code: "not_object" };
  }

  // Closed schema: reject any field other than `message` and `history`.
  for (const key of Object.keys(value)) {
    if (key !== "message" && key !== "history") return { ok: false, code: "extra_fields" };
  }

  const raw = value.message;
  if (typeof raw !== "string") {
    return { ok: false, code: "missing_message" };
  }

  const maxLength = Math.min(cfg.maxMessageLength, cfg.maxTotalCharacters);
  const message = checkText(raw, maxLength);
  if (!message.ok) return message;

  const history = readHistory(value.history, maxLength);
  if (!history.ok) return history;

  return {
    ok: true,
    message: message.text,
    history: capHistory(history.turns, message.text.length, cfg),
  };
}
