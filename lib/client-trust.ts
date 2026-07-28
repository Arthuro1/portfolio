/**
 * Browser/origin request validation — defense in depth, NOT authentication.
 *
 * Origin and Sec-Fetch-Site are trivially absent on command-line / bot traffic,
 * so these checks only ever supplement the real controls (rate limiting, body
 * limits, strict validation). They exist to cheaply reject obvious cross-site
 * abuse from real browsers.
 */

const DEFAULT_PROD_ORIGINS = [
  "https://paulmeteng.space",
  "https://www.paulmeteng.space",
];

function allowlistedOrigins(): Set<string> {
  const extra = (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  return new Set([...DEFAULT_PROD_ORIGINS, ...extra]);
}

/**
 * Extract the client IP from Vercel's trusted proxy headers. On Vercel these
 * headers are set by the platform and can be trusted; on arbitrary infra they
 * can be spoofed, which is why IP is only ever used as a rate-limit key (after
 * hashing), never as an identity.
 */
export function getClientIp(req: Request): string {
  const realIp = req.headers.get("x-real-ip");
  if (realIp && realIp.trim()) return realIp.trim();
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return "unknown";
}

export type OriginCheck = { ok: true } | { ok: false; reason: string };

export function checkRequestOrigin(
  req: Request,
  isProduction: boolean,
): OriginCheck {
  // Local development: approved localhost origins only, so skip the allowlist.
  if (!isProduction) return { ok: true };

  // A real browser making a cross-site request advertises it. Reject those
  // outright; leave same-origin/same-site/none and non-browser (header absent)
  // to the checks below.
  const secFetchSite = req.headers.get("sec-fetch-site");
  if (secFetchSite === "cross-site") {
    return { ok: false, reason: "cross_site" };
  }

  const origin = req.headers.get("origin");
  // Missing Origin: legitimate for non-browser clients. Not proof of anything,
  // so allow and rely on rate limiting + validation.
  if (origin === null) return { ok: true };

  if (allowlistedOrigins().has(origin)) return { ok: true };
  return { ok: false, reason: "bad_origin" };
}
