"use client";

import { createContext, useContext, useState } from "react";
import { Lang, translations, Translations } from "@/lib/translations";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: typedTranslations[lang] as unknown as Translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
