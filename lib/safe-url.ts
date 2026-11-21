/**
 * Link allowlist for model-generated Markdown.
 *
 * Model output is treated as hostile. A link is only rendered as a clickable
 * anchor when it is either:
 *   - a same-page anchor (`#projects`) from the known section id list,
 *   - an `https:` URL whose host is on Paul's known allowlist, or
 *   - a `mailto:` link to one of Paul's known addresses.
 *
 * Everything else (other schemes such as javascript:, data:, http:, unknown
 * hosts or anchors, relative paths, malformed URLs) is reported unsafe so the
 * caller can render it as plain text. This module is import-safe in the
 * browser bundle — it uses only the WHATWG `URL` API and no Node built-ins.
 */

/** Section ids the page renders and the assistant may link to as evidence. */
export const PAGE_ANCHORS = [
  "projects",
  "project-knowledge-graph-rag",
  "project-qetoret",
  "project-coursemapper",
  "experience",
  "skills",
  "more-projects",
  "contact",
] as const;

const ALLOWED_ANCHORS = new Set<string>(PAGE_ANCHORS);

const ALLOWED_HTTPS_HOSTS = new Set<string>([
  "paulmeteng.space",
  "www.paulmeteng.space",
  "github.com",
  "www.github.com",
  "linkedin.com",
  "www.linkedin.com",
  "pray4me.space",
  "www.pray4me.space",
  "qetoret.com",
  "my-goals-pwa.vercel.app",
  // The LAK '24 paper.
  "doi.org",
  // CourseMapper project page (Master's thesis).
  "www.uni-due.de",
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

  if (trimmed.startsWith("#")) {
    if (ALLOWED_ANCHORS.has(trimmed.slice(1))) {
      return { safe: true, href: trimmed, external: false };
    }
    return { safe: false };
  }

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
