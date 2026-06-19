"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-gray-100 py-8 px-4 text-center">
      <p className="text-sm text-gray-400">
        © {new Date().getFullYear()} Paul Arthur Meteng · {t.footer}
      </p>
    </footer>
  );
}
