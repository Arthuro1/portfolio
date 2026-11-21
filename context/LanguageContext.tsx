"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Lang, translations, Translations } from "@/lib/translations";
import { LANG_COOKIE, langFromPath, pathForLang } from "@/lib/i18n";
import { SITE_META } from "@/lib/site-meta";
const typedTranslations = translations as unknown as Record<Lang, Translations>;

type LanguageContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en as unknown as Translations,
});

export function rememberLang(lang: Lang) {
  document.cookie = `${LANG_COOKIE}=${lang}; Max-Age=31536000; Path=/; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`;
}

// Rendered by the root layout so the server HTML already carries the page's language.
export function LangHtml({ className, children }: { className: string; children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <html lang={langFromPath(pathname)} className={className} suppressHydrationWarning>
      {children}
    </html>
  );
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [lang, setLangState] = useState<Lang>(() => langFromPath(pathname));
  const [syncedPath, setSyncedPath] = useState(pathname);

  // Back/forward can change the URL without the switcher; follow it.
  if (pathname !== syncedPath) {
    setSyncedPath(pathname);
    setLangState(langFromPath(pathname));
  }

  // Metadata is only resolved on a full load, so in-place switches (and back/forward) update the tab title here.
  const titleLang = useRef(lang);
  useEffect(() => {
    if (titleLang.current === lang) return;
    titleLang.current = lang;
    document.title = SITE_META[lang].title;
  }, [lang]);

  // Switches in place: Next.js syncs usePathname (and so <html lang>) with replaceState.
  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    const { search, hash } = window.location;
    window.history.replaceState(null, "", pathForLang(next) + search + hash);
    rememberLang(next);
  }, []);

  // Native #anchor links add history entries with no state, which Next.js ignores on back/forward,
  // so usePathname (and <html lang>) would keep a language the URL no longer has. Re-sync the router.
  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      if (!event.state && langFromPath(window.location.pathname) !== lang) {
        window.history.replaceState(null, "", window.location.href);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: typedTranslations[lang] as unknown as Translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
