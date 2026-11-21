import { describe, it, expect, afterEach } from "vitest";
import { buildHistory, HISTORY_LIMITS } from "@/lib/chat-history";
import { MAX_HISTORY_ASSISTANT_CHARS, validateChatBody, type ChatTurn } from "@/lib/chat-validation";
import { getChatConfig } from "@/lib/chat-config";

const user = (content: string): ChatTurn => ({ role: "user", content });
const assistant = (content: string): ChatTurn => ({ role: "assistant", content });

describe("buildHistory", () => {
  it("sends complete question/answer pairs", () => {
    const transcript = [user("Where is Paul based?"), assistant("In the Ruhr area.")];
    expect(buildHistory(transcript, "Remote?")).toEqual(transcript);
  });

  it("skips a question whose answer never arrived", () => {
    const transcript = [user("First?"), user("Second?"), assistant("Answer to second."), user("Failed?")];
    expect(buildHistory(transcript, "Retry")).toEqual([user("Second?"), assistant("Answer to second.")]);
  });

  it("keeps only the newest pairs within the message limit", () => {
    const transcript: ChatTurn[] = [];
    for (let i = 1; i <= 5; i++) transcript.push(user(`Q${i}?`), assistant(`A${i}.`));
    const history = buildHistory(transcript, "Next?");
    expect(history).toHaveLength(HISTORY_LIMITS.maxMessages);
    expect(history[0]).toEqual(user("Q3?"));
    expect(history.at(-1)).toEqual(assistant("A5."));
  });

  it("shortens long answers to the server's cap", () => {
    const long = "word ".repeat(1000).trim();
    const [, answer] = buildHistory([user("Tell me everything"), assistant(long)], "More?");
    expect(answer.content.length).toBeLessThanOrEqual(MAX_HISTORY_ASSISTANT_CHARS);
    expect(long.startsWith(answer.content)).toBe(true);
  });

  it("drops the oldest pairs to stay within the character budget, counting the new question", () => {
    // About 3,400 characters per pair: with the question, only one pair fits in 8,000.
    const big = (n: number) => [user(`Q${n} ` + "x ".repeat(700).trim()), assistant(`A${n} ` + "y ".repeat(990).trim())];
    const transcript = [...big(1), ...big(2), ...big(3)];
    const question = "q ".repeat(700).trim();
    const history = buildHistory(transcript, question);
    const total = question.length + history.reduce((sum, t) => sum + t.content.length, 0);
    expect(total).toBeLessThanOrEqual(HISTORY_LIMITS.maxTotalCharacters);
    expect(history).toEqual(big(3));
  });

  it("leaves out a pair the server would reject instead of failing every later request", () => {
    const transcript = [user("Bad\u0007?"), assistant("ok"), user("Good?"), assistant("Fine."), user("Q?"), assistant("=".repeat(60))];
    expect(buildHistory(transcript, "Next?")).toEqual([user("Good?"), assistant("Fine.")]);
  });

  it("produces history the server accepts unchanged", () => {
    const transcript: ChatTurn[] = [];
    for (let i = 1; i <= 4; i++) transcript.push(user(`Question ${i}?`), assistant("answer ".repeat(400)));
    const history = buildHistory(transcript, "Last one?");
    const result = validateChatBody({ message: "Last one?", history }, getChatConfig());
    expect(result).toEqual({ ok: true, message: "Last one?", history });
  });
});

describe("HISTORY_LIMITS", () => {
  const names = ["CHAT_MAX_MESSAGES", "CHAT_MAX_MESSAGE_LENGTH", "CHAT_MAX_TOTAL_CHARACTERS"];
  const saved = Object.fromEntries(names.map((n) => [n, process.env[n]]));
  afterEach(() => {
    for (const n of names) {
      if (saved[n] === undefined) delete process.env[n];
      else process.env[n] = saved[n];
    }
  });

  it("matches the server defaults", () => {
    for (const n of names) delete process.env[n];
    const cfg = getChatConfig();
    expect(HISTORY_LIMITS).toEqual({
      maxMessages: cfg.maxMessages,
      maxMessageLength: cfg.maxMessageLength,
      maxTotalCharacters: cfg.maxTotalCharacters,
    });
  });
});
