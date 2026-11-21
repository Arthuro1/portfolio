import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { langFromPath, pathForLang, preferredLang, rootRedirectPath } from "@/lib/i18n";
import { middleware } from "@/middleware";
import { pageMetadata } from "@/lib/site-meta";
import sitemap from "@/app/sitemap";

describe("language paths", () => {
  it("maps languages to their routes and back", () => {
    expect(pathForLang("en")).toBe("/");
    expect(pathForLang("de")).toBe("/de");
    expect(pathForLang("fr")).toBe("/fr");
    expect(langFromPath("/")).toBe("en");
    expect(langFromPath("/de")).toBe("de");
    expect(langFromPath("/fr")).toBe("fr");
  });

  it("treats every other path as English", () => {
    for (const path of ["/de/unknown", "/deutsch", "/es", "/_not-found", ""]) {
      expect(langFromPath(path)).toBe("en");
    }
  });
});

describe("preferredLang", () => {
  it.each([
    ["de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7", "de"],
    ["fr-FR,fr;q=0.9,en;q=0.8", "fr"],
    ["en-US,en;q=0.9,de;q=0.8", "en"],
    ["de-CH", "de"],
    ["DE", "de"],
    ["es-ES,es;q=0.9,fr;q=0.5", "fr"],
    ["en;q=0.5,de;q=0.8", "de"],
    ["de;q=0.8,fr;q=0.8", "de"],
    ["fr;q=0.8,de;q=0.8", "fr"],
    ["de;q=0,en;q=0.1", "en"],
    ["de;q=abc,fr;q=0.3", "fr"],
    ["de;q=,fr;q=0.3", "fr"],
    ["de;q=2,en;q=0.3", "en"],
    [" de ; q=0.9 , en ; q=0.8 ", "de"],
  ])("%s -> %s", (header, expected) => {
    expect(preferredLang(header)).toBe(expected);
  });

  it.each([null, undefined, "", "*", "es-ES,es;q=0.9", "deutsch", ",,;"])("%s names no supported language", (header) => {
    expect(preferredLang(header)).toBeNull();
  });
});

describe("rootRedirectPath", () => {
  it("follows a stored de/fr choice, whatever the browser prefers", () => {
    expect(rootRedirectPath("de", "en-US,en;q=0.9")).toBe("/de");
    expect(rootRedirectPath("fr", null)).toBe("/fr");
  });

  it("keeps English for an explicit en cookie, even when the browser prefers German", () => {
    expect(rootRedirectPath("en", "de-DE,de;q=0.9")).toBeNull();
  });

  it("uses Accept-Language without a valid cookie", () => {
    expect(rootRedirectPath(undefined, "de-DE,de;q=0.9,en;q=0.8")).toBe("/de");
    expect(rootRedirectPath(undefined, "fr")).toBe("/fr");
    expect(rootRedirectPath("es", "fr")).toBe("/fr");
    expect(rootRedirectPath(undefined, "en-GB,en;q=0.9,de;q=0.8")).toBeNull();
    expect(rootRedirectPath(undefined, "es")).toBeNull();
    expect(rootRedirectPath(undefined, null)).toBeNull();
  });
});

describe("middleware", () => {
  const request = (headers: Record<string, string>, url = "https://paulmeteng.space/") => new NextRequest(url, { headers });

  it("redirects with 307 to the preferred language and keeps the query string", () => {
    const res = middleware(request({ "accept-language": "de-DE,de;q=0.9,en;q=0.8" }, "https://paulmeteng.space/?ref=cv"));
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("https://paulmeteng.space/de?ref=cv");
  });

  it("follows the lang cookie", () => {
    const res = middleware(request({ cookie: "lang=fr", "accept-language": "en" }));
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("https://paulmeteng.space/fr");
  });

  it("serves English for lang=en and for English browsers", () => {
    const cases: Record<string, string>[] = [{ cookie: "lang=en", "accept-language": "de" }, { "accept-language": "en-US" }, {}];
    for (const headers of cases) {
      const res = middleware(request(headers));
      expect(res.headers.get("location")).toBeNull();
      expect(res.headers.get("x-middleware-next")).toBe("1");
    }
  });
});

describe("page metadata", () => {
  it("gives each language its canonical, hreflang alternates and Open Graph locale", () => {
    const de = pageMetadata("de");
    expect(de.alternates?.canonical).toBe("/de");
    expect(de.alternates?.languages).toEqual({ en: "/", de: "/de", fr: "/fr", "x-default": "/" });
    expect(de.openGraph).toMatchObject({ locale: "de_DE", alternateLocale: ["en_US", "fr_FR"], url: "/de" });
    expect(pageMetadata("en").alternates?.canonical).toBe("/");
    expect(pageMetadata("fr").openGraph).toMatchObject({ locale: "fr_FR" });
  });

  it("lists all three language routes in the sitemap with alternates", () => {
    const entries = sitemap();
    expect(entries.map((e) => e.url)).toEqual([
      "https://paulmeteng.space",
      "https://paulmeteng.space/de",
      "https://paulmeteng.space/fr",
    ]);
    for (const entry of entries) {
      expect(entry.alternates?.languages).toEqual({
        en: "https://paulmeteng.space",
        de: "https://paulmeteng.space/de",
        fr: "https://paulmeteng.space/fr",
        "x-default": "https://paulmeteng.space",
      });
    }
  });
});
