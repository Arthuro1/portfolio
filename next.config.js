/** @type {import('next').NextConfig} */

// Security headers + CSP live in a single shared module so the production
// policy can be unit-tested (see lib/__tests__/security-headers.test.ts) and
// so `'unsafe-eval'` is provably dev-only.
const { buildSecurityHeaders } = require("./lib/security-headers");

// `next dev` runs with NODE_ENV=development; `next build`/`next start` run with
// NODE_ENV=production. HMR only needs 'unsafe-eval' in development.
const isDev = process.env.NODE_ENV !== "production";

const nextConfig = {
  poweredByHeader: false, // hide the "X-Powered-By: Next.js" fingerprint
  async headers() {
    return [{ source: "/:path*", headers: buildSecurityHeaders(isDev) }];
  },
};

module.exports = nextConfig;
