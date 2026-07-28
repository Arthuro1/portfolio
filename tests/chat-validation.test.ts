import { describe, it, expect } from "vitest";
import { validateChatBody } from "@/lib/chat-validation";
import { getChatConfig } from "@/lib/chat-config";

const cfg = getChatConfig();

describe("validateChatBody", () => {
  it("accepts a normal message and trims surrounding whitespace", () => {
    expect(validateChatBody({ message: "  Hello Paul  " }, cfg)).toEqual({
      ok: true,
      message: "Hello Paul",
    });
  });

  it("rejects non-objects, arrays and null", () => {
    expect(validateChatBody("hi", cfg)).toEqual({ ok: false, code: "not_object" });
    expect(validateChatBody(["hi"], cfg)).toEqual({ ok: false, code: "not_object" });
    expect(validateChatBody(null, cfg)).toEqual({ ok: false, code: "not_object" });
  });

  it("rejects unexpected extra fields", () => {
    expect(validateChatBody({ message: "hi", role: "admin" }, cfg)).toEqual({
      ok: false,
      code: "extra_fields",
    });
  });

  it("rejects a missing or non-string message", () => {
    expect(validateChatBody({}, cfg)).toEqual({ ok: false, code: "missing_message" });
    expect(validateChatBody({ message: 5 }, cfg)).toEqual({
      ok: false,
      code: "missing_message",
    });
  });

  it("rejects empty and whitespace-only messages", () => {
    expect(validateChatBody({ message: "" }, cfg)).toEqual({
      ok: false,
      code: "empty_message",
    });
    expect(validateChatBody({ message: "   \t\n" }, cfg)).toEqual({
      ok: false,
      code: "empty_message",
    });
  });

  it("rejects messages over the length limit", () => {
    const long = "x".repeat(cfg.maxMessageLength + 1);
    expect(validateChatBody({ message: long }, cfg)).toEqual({
      ok: false,
      code: "too_long",
    });
  });

  it("rejects control characters", () => {
    expect(validateChatBody({ message: "hi\u0000there" }, cfg)).toEqual({
      ok: false,
      code: "invalid_chars",
    });
  });

  it("rejects excessive character repetition", () => {
    expect(validateChatBody({ message: "a".repeat(60) }, cfg)).toEqual({
      ok: false,
      code: "repetition",
    });
  });
});
