import type { Lang } from "@/lib/translations";

export const LANGS: readonly Lang[] = ["en", "de", "fr"];

export const LANG_COOKIE = "lang";

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}

/** English is the default language and lives at "/"; the others at "/de" and "/fr". */
export function pathForLang(lang: Lang): string {
  return lang === "en" ? "/" : `/${lang}`;
}

/** Only the two language routes themselves; every other path (including 404s) is English. */
export function langFromPath(pathname: string): Lang {
  if (pathname === "/de") return "de";
  if (pathname === "/fr") return "fr";
  return "en";
}

/**
 * The supported language the Accept-Language header ranks highest, or null if it names none.
 * "de-CH" counts as "de"; q=0 and malformed q values are ignored; on equal q the earlier entry wins.
 */
export function preferredLang(acceptLanguage: string | null | undefined): Lang | null {
  if (!acceptLanguage) return null;
  let best: Lang | null = null;
  let bestQ = 0;
  for (const entry of acceptLanguage.split(",")) {
    const [range, ...params] = entry.split(";");
    const primary = range.trim().toLowerCase().split("-")[0];
    if (!isLang(primary)) continue;
    let q = 1;
    for (const param of params) {
      const [key, value = ""] = param.split("=");
      if (key.trim().toLowerCase() === "q") q = value.trim() === "" ? NaN : Number(value);
    }
    if (!(q > 0 && q <= 1)) continue;
    if (q > bestQ) {
      best = primary;
      bestQ = q;
    }
  }
  return best;
}

/**
 * Where a request for "/" should be redirected, or null to serve English.
 * A stored choice (the `lang` cookie) wins, and "en" keeps English; without a valid cookie,
 * the browser's Accept-Language decides.
 */
export function rootRedirectPath(cookie: string | undefined, acceptLanguage: string | null | undefined): string | null {
  const lang = isLang(cookie) ? cookie : preferredLang(acceptLanguage);
  return lang && lang !== "en" ? pathForLang(lang) : null;
}
