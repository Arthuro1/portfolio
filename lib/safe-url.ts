/**
 * Link allowlist for model-generated Markdown.
 *
 * Model output is treated as hostile. A link is only rendered as a clickable
 * anchor when it is either:
 *   - an `https:` URL whose host is on Paul's known allowlist, or
 *   - a `mailto:` link to one of Paul's known addresses.
 *
 * Everything else (other schemes such as javascript:, data:, http:, unknown
 * hosts, malformed URLs) is reported unsafe so the caller can render it as
 * plain text. This module is import-safe in the browser bundle — it uses only
 * the WHATWG `URL` API and no Node built-ins.
 */

const ALLOWED_HTTPS_HOSTS = new Set<string>([
  "paulmeteng.space",
  "www.paulmeteng.space",
  "github.com",
  "www.github.com",
  "linkedin.com",
  "www.linkedin.com",
  "pray4me.space",
  "www.pray4me.space",
]);

const ALLOWED_MAILTO = new Set<string>([
  "arthur.meteng@gmail.com",
  "arthur.meteng@yahoo.com",
]);

export type SafeHref =
  | { safe: false }
  | { safe: true; href: string; external: boolean };

export function resolveSafeHref(href: unknown): SafeHref {
  if (typeof href !== "string") return { safe: false };
  const trimmed = href.trim();
  if (trimmed === "") return { safe: false };

  // mailto: only Paul's known addresses, and drop any query/params.
  if (/^mailto:/i.test(trimmed)) {
    const address = trimmed.slice("mailto:".length).split("?")[0].toLowerCase();
    if (ALLOWED_MAILTO.has(address)) {
      return { safe: true, href: `mailto:${address}`, external: false };
    }
    return { safe: false };
  }

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return { safe: false };
  }

  if (url.protocol !== "https:") return { safe: false };
  if (!ALLOWED_HTTPS_HOSTS.has(url.hostname.toLowerCase())) {
    return { safe: false };
  }

  return { safe: true, href: url.toString(), external: true };
}
