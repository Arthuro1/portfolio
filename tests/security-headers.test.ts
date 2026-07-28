import { describe, it, expect } from "vitest";
import { buildCsp, buildSecurityHeaders } from "@/lib/security-headers";

describe("Content-Security-Policy", () => {
  it("never ships 'unsafe-eval' in production", () => {
    expect(buildCsp(false)).not.toContain("'unsafe-eval'");
  });

  it("allows 'unsafe-eval' only in development (HMR)", () => {
    expect(buildCsp(true)).toContain("'unsafe-eval'");
  });

  it("keeps the required hardening directives", () => {
    const csp = buildCsp(false);
    for (const directive of [
      "default-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "upgrade-insecure-requests",
      "manifest-src 'self'",
    ]) {
      expect(csp).toContain(directive);
    }
  });

  it("does not use a broad bare 'https:' source", () => {
    // Every external origin must be a specific host (https://host), never a
    // wildcard scheme like `img-src https:`.
    expect(buildCsp(false)).not.toMatch(/\bhttps:(?!\/\/)/);
  });
});

describe("security response headers", () => {
  it("includes every required header", () => {
    const keys = buildSecurityHeaders(false).map((h) => h.key);
    expect(keys).toEqual(
      expect.arrayContaining([
        "Content-Security-Policy",
        "X-Frame-Options",
        "X-Content-Type-Options",
        "Referrer-Policy",
        "Permissions-Policy",
        "Strict-Transport-Security",
      ]),
    );
  });

  it("sets HSTS with a long max-age and X-Frame-Options DENY", () => {
    const headers = buildSecurityHeaders(false);
    const hsts = headers.find((h) => h.key === "Strict-Transport-Security");
    const xfo = headers.find((h) => h.key === "X-Frame-Options");
    expect(hsts?.value).toContain("max-age=63072000");
    expect(xfo?.value).toBe("DENY");
  });
});
