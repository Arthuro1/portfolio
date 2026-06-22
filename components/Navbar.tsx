"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { Lang } from "@/lib/translations";

const LANGS: { code: Lang; fi: string; label: string }[] = [
  { code: "en", fi: "gb", label: "English" },
  { code: "de", fi: "de", label: "Deutsch" },
  { code: "fr", fi: "fr", label: "Français" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t, lang, setLang } = useLanguage();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = LANGS.find((l) => l.code === lang)!;

  const links = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur border-b border-gray-100 dark:border-gray-800">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2" aria-label="Home">
          <svg width="36" height="36" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="58" height="58" rx="12" fill="white" stroke="#1d4ed8" strokeWidth="4" className="dark:[fill:#111827] dark:[stroke:#3b82f6]"/>
            <text x="32" y="42" fontFamily="monospace" fontSize="18" fontWeight="700" fill="#1d4ed8" textAnchor="middle" className="dark:[fill:#3b82f6]">&lt;PAM/&gt;</text>
          </svg>
          <span className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100">Paul Meteng</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Language dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors bg-white dark:bg-gray-900"
            >
              <span className={`fi fi-${currentLang.fi} rounded-sm`} />
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
                {LANGS.map(({ code, fi, label }) => (
                  <button
                    key={code}
                    onClick={() => { setLang(code); setDropdownOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                      lang === code ? "text-blue-700 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-950/50" : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span className={`fi fi-${fi} rounded-sm`} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 pb-4">
          <ul className="flex flex-col gap-3 pt-3">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col gap-1 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden w-36">
              {LANGS.map(({ code, fi, label }) => (
                <button
                  key={code}
                  onClick={() => { setLang(code); setOpen(false); }}
                  className={`flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    lang === code ? "text-blue-700 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-950/50" : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <span className={`fi fi-${fi} rounded-sm`} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
            <button
              onClick={toggle}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
