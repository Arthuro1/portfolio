import type { Metadata } from "next";
import type { Lang } from "@/lib/translations";
import { LANGS, pathForLang } from "@/lib/i18n";

export const SITE_URL = "https://paulmeteng.space";

export const SITE_META: Record<Lang, { title: string; description: string; ogLocale: string }> = {
  en: {
    title: "Paul Arthur Meteng — AI Engineer",
    description:
      "Portfolio of Paul Arthur Meteng — AI Engineer and Software Engineer focused on LLM applications, RAG and AI agents. Case studies, experience and CV.",
    ogLocale: "en_US",
  },
  de: {
    title: "Paul Arthur Meteng — AI Engineer",
    description:
      "Portfolio von Paul Arthur Meteng — AI Engineer und Softwareentwickler mit Fokus auf LLM-Anwendungen, RAG und KI-Agenten. Fallstudien, Berufserfahrung und Lebenslauf.",
    ogLocale: "de_DE",
  },
  fr: {
    title: "Paul Arthur Meteng — Ingénieur IA",
    description:
      "Portfolio de Paul Arthur Meteng — ingénieur IA et ingénieur logiciel, centré sur les applications LLM, le RAG et les agents IA. Études de cas, expérience et CV.",
    ogLocale: "fr_FR",
  },
};

/** hreflang alternates shared by every language version (relative to metadataBase). */
export const LANGUAGE_ALTERNATES = {
  ...Object.fromEntries(LANGS.map((lang) => [lang, pathForLang(lang)])),
  "x-default": pathForLang("en"),
} as Record<Lang | "x-default", string>;

// app/opengraph-image.tsx (English text in every language). Listed explicitly because a page that
// sets its own openGraph only inherits the file-based image in the segment that holds the file.
const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "Paul Arthur Meteng — AI Engineer" };

export function pageMetadata(lang: Lang): Metadata {
  const { title, description, ogLocale } = SITE_META[lang];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: pathForLang(lang), languages: LANGUAGE_ALTERNATES },
    openGraph: {
      title,
      description,
      url: pathForLang(lang),
      siteName: "Paul Arthur Meteng",
      type: "website",
      locale: ogLocale,
      alternateLocale: LANGS.filter((other) => other !== lang).map((other) => SITE_META[other].ogLocale),
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
