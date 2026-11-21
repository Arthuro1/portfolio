/**
 * Builds the short conversation memory the chat widget sends as `history`.
 * The server validates and caps it again (lib/chat-validation.ts); this only
 * keeps a normal visitor's requests inside those limits.
 */

import { capHistory, checkText, MAX_HISTORY_ASSISTANT_CHARS, type ChatTurn } from "./chat-validation";

/** The server defaults in lib/chat-config.ts. A server set lower trims further itself. */
export const HISTORY_LIMITS = {
  maxMessages: 6,
  maxMessageLength: 1500,
  maxTotalCharacters: 8000,
};

/**
 * The newest complete question/answer pairs of `transcript` that fit the
 * limits alongside `question`. A question without an answer (the request
 * failed) is skipped, long answers are shortened to the server's cap, and a
 * pair the server would reject is left out rather than breaking every later
 * request.
 */
export function buildHistory(
  transcript: ChatTurn[],
  question: string,
  limits = HISTORY_LIMITS,
): ChatTurn[] {
  const pairs: ChatTurn[] = [];
  for (let i = 0; i + 1 < transcript.length; i++) {
    const asked = transcript[i];
    const answered = transcript[i + 1];
    if (asked.role !== "user" || answered.role !== "assistant") continue;
    i++;
    const q = checkText(asked.content, limits.maxMessageLength);
    const a = checkText(answered.content.slice(0, MAX_HISTORY_ASSISTANT_CHARS), MAX_HISTORY_ASSISTANT_CHARS);
    if (q.ok && a.ok) {
      pairs.push({ role: "user", content: q.text }, { role: "assistant", content: a.text });
    }
  }
  return capHistory(pairs, question.trim().length, limits);
}
