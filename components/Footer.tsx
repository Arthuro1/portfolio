"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 py-8 px-4 text-center bg-white dark:bg-gray-950">
      <p className="text-sm text-gray-400 dark:text-gray-500">
        © {new Date().getFullYear()} Paul Arthur Meteng · {t.footer}
      </p>
    </footer>
  );
}
