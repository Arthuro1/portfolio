import { describe, it, expect } from "vitest";
import { resolveSafeHref } from "@/lib/safe-url";

describe("resolveSafeHref (Markdown link allowlist)", () => {
  it("allows allowlisted https hosts as external links", () => {
    expect(resolveSafeHref("https://github.com/Arthuro1")).toEqual({
      safe: true,
      href: "https://github.com/Arthuro1",
      external: true,
    });
  });

  it("rejects non-allowlisted https hosts", () => {
    expect(resolveSafeHref("https://evil.example.com")).toEqual({ safe: false });
  });

  it("rejects dangerous and non-https schemes", () => {
    expect(resolveSafeHref("javascript:alert(1)").safe).toBe(false);
    expect(resolveSafeHref("data:text/html,<script>alert(1)</script>").safe).toBe(false);
    expect(resolveSafeHref("http://github.com").safe).toBe(false);
    expect(resolveSafeHref("vbscript:msgbox(1)").safe).toBe(false);
  });

  it("allows Paul's mailto addresses only", () => {
    expect(resolveSafeHref("mailto:arthur.meteng@gmail.com")).toEqual({
      safe: true,
      href: "mailto:arthur.meteng@gmail.com",
      external: false,
    });
    expect(resolveSafeHref("mailto:attacker@evil.com").safe).toBe(false);
  });

  it("rejects empty and non-string input", () => {
    expect(resolveSafeHref("").safe).toBe(false);
    expect(resolveSafeHref("   ").safe).toBe(false);
    expect(resolveSafeHref(undefined).safe).toBe(false);
    expect(resolveSafeHref(null).safe).toBe(false);
    expect(resolveSafeHref(42).safe).toBe(false);
  });
});
