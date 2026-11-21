import type { MetadataRoute } from "next";
import { LANGS, pathForLang } from "@/lib/i18n";
import { LANGUAGE_ALTERNATES, SITE_URL } from "@/lib/site-meta";

const absolute = (path: string) => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    Object.entries(LANGUAGE_ALTERNATES).map(([lang, path]) => [lang, absolute(path)]),
  );
  return LANGS.map((lang) => ({
    url: absolute(pathForLang(lang)),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
