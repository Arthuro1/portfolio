"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="px-4 sm:px-6 lg:px-8 pb-10 pt-6">
      <div className="ndop-band mx-auto max-w-5xl" aria-hidden="true" />
      <div className="mx-auto mt-6 flex max-w-5xl flex-col items-center justify-between gap-3 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} Paul Arthur Meteng · {t.footer.built}
        </p>
        <a href="#top" className="group inline-flex items-center gap-1.5 font-bold text-ink hover:text-accent transition-colors">
          <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          {t.footer.top}
        </a>
      </div>
    </footer>
  );
}
