// @ts-check
/**
 * Single source of truth for the site's security response headers and
 * Content-Security-Policy.
 *
 * This file is plain CommonJS on purpose so it can be `require()`d from
 * `next.config.js` (evaluated at build time) *and* imported from the Vitest
 * test-suite, which asserts that the production policy never ships
 * `'unsafe-eval'`.
 *
 * Design decisions:
 *  - `'unsafe-eval'` is added ONLY in development, where Next.js needs it for
 *    React Fast Refresh / HMR. Production builds never emit it.
 *  - `'unsafe-inline'` is kept for `style-src` (Tailwind + styled-jsx emit
 *    inline styles) and for `script-src` (the static JSON-LD <script> and the
 *    Vercel Speed Insights bootstrap are inline). Nonces were deliberately NOT
 *    used: they force every route into dynamic rendering, which is the wrong
 *    trade-off for a fully static portfolio. See docs/SECURITY_DEPLOYMENT.md.
 *  - Third-party origins are an explicit narrow allowlist (Vercel Speed
 *    Insights + Google Fonts), never a broad `https:`.
 */

// Google Fonts is pulled in via an @import in app/globals.css. The stylesheet
// itself is fetched from fonts.googleapis.com (a style resource) and the woff2
// files from fonts.gstatic.com (font resources).
const GOOGLE_FONTS_STYLE = "https://fonts.googleapis.com";
const GOOGLE_FONTS_FILES = "https://fonts.gstatic.com";
const VERCEL_INSIGHTS_SCRIPT = "https://va.vercel-scripts.com";
const VERCEL_INSIGHTS_BEACON = "https://vitals.vercel-insights.com";

/**
 * Build the Content-Security-Policy string.
 * @param {boolean} isDev - true only during `next dev`.
 * @returns {string}
 */
function buildCsp(isDev) {
  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    // HMR / React Refresh only. Never included in production builds.
    isDev ? "'unsafe-eval'" : null,
    VERCEL_INSIGHTS_SCRIPT,
  ].filter(Boolean);

  const directives = [
    "default-src 'self'",
    `script-src ${scriptSrc.join(" ")}`,
    `style-src 'self' 'unsafe-inline' ${GOOGLE_FONTS_STYLE}`,
    "img-src 'self' data:",
    `font-src 'self' data: ${GOOGLE_FONTS_FILES}`,
    `connect-src 'self' ${VERCEL_INSIGHTS_SCRIPT} ${VERCEL_INSIGHTS_BEACON}`,
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "frame-src 'none'",
    "upgrade-insecure-requests",
  ];

  return directives.join("; ");
}

/**
 * Build the full list of security response headers.
 * @param {boolean} isDev
 * @returns {{ key: string, value: string }[]}
 */
function buildSecurityHeaders(isDev) {
  return [
    { key: "Content-Security-Policy", value: buildCsp(isDev) },
    // Legacy clickjacking control; superseded by frame-ancestors but harmless
    // and still honoured by older browsers.
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      // interest-cohort (FLoC) is dead; browsing-topics is the current
      // Topics-API opt-out.
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
    },
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    },
  ];
}

module.exports = { buildCsp, buildSecurityHeaders };
