"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage, rememberLang } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useJourney } from "@/context/JourneyContext";
import { HUE, STOP_HUES } from "@/lib/hues";
import { Lang } from "@/lib/translations";
import { pathForLang } from "@/lib/i18n";

// Active-link markers, one per stop colour (spelled out for Tailwind).
const MARKERS = ["after:bg-hue-teal", "after:bg-brand", "after:bg-hue-plum", "after:bg-accent-bright"];

const LANGS: { code: Lang; fi: string; label: string }[] = [
  { code: "en", fi: "gb", label: "English" },
  { code: "de", fi: "de", label: "Deutsch" },
  { code: "fr", fi: "fr", label: "Français" },
];

const FOCUS_RING = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent";

// Ctrl/Cmd/Shift/Alt-clicks keep the normal link behaviour (new tab or window); the choice is still remembered.
const isPlainClick = (e: React.MouseEvent) => e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { t, lang, setLang } = useLanguage();
  const { theme, toggle } = useTheme();
  const { active } = useJourney();
  const progressRef = useRef<HTMLDivElement>(null);

  // Reading progress, written straight to the DOM to avoid re-rendering on scroll.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${ratio})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

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
    { label: t.nav.projects, id: "projects" },
    { label: t.nav.experience, id: "experience" },
    { label: t.nav.skills, id: "skills" },
    { label: t.nav.contact, id: "contact" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-bg/80 backdrop-blur-md border-b border-line/70">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#top" className="flex items-center gap-2">
          <svg width="36" height="36" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="2" y="2" width="60" height="60" rx="12" className="fill-brand-fill"/>
            <text x="32" y="42" fontFamily="monospace" fontSize="18" fontWeight="700" fill="#f7f5ef" textAnchor="middle">
              &lt;PAM/&gt;
            </text>
          </svg>
          <span className="font-display text-lg font-bold tracking-tight text-ink">Paul Arthur Meteng</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-8">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? "location" : undefined}
                  className={`relative py-1 text-sm font-bold transition-colors after:absolute after:left-1/2 after:-bottom-1 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:rotate-45 after:transition-opacity ${MARKERS[links.indexOf(l)]} ${FOCUS_RING} ${
                    active === l.id ? `${HUE[STOP_HUES[links.indexOf(l)]].text} after:opacity-100` : "text-ink/75 hover:text-ink after:opacity-0"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            className={`p-2 rounded-lg border border-line text-muted hover:border-accent-bright hover:text-accent transition-colors ${FOCUS_RING}`}
            aria-label={t.nav.theme}
            aria-pressed={theme === "dark"}
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
          <div
            className="relative"
            ref={dropdownRef}
            onKeyDown={(e) => {
              if (e.key !== "Escape" || !dropdownOpen) return;
              e.stopPropagation(); // keeps the chat widget's window-level Escape from also firing
              setDropdownOpen(false);
              langButtonRef.current?.focus();
            }}
            onBlur={(e) => {
              // Close when focus moves to an element outside. A null relatedTarget (Safari blurs on mouse-down over a link) is left to the click handlers.
              if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) setDropdownOpen(false);
            }}
          >
            <button
              ref={langButtonRef}
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm border border-line rounded-lg hover:border-accent-bright transition-colors bg-surface ${FOCUS_RING}`}
              aria-label={`${t.nav.language}: ${currentLang.label}`}
              aria-expanded={dropdownOpen}
              aria-controls="language-menu"
            >
              <span className={`fi fi-${currentLang.fi} rounded-sm`} />
              <svg className="w-3.5 h-3.5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {/* Always in the HTML (hidden while closed) so crawlers find the language links. */}
            <ul
              id="language-menu"
              hidden={!dropdownOpen}
              className="absolute right-0 mt-1 w-36 bg-surface border border-line rounded-lg shadow-lg overflow-hidden z-50"
            >
              {LANGS.map(({ code, fi, label }) => (
                <li key={code}>
                  <a
                    href={pathForLang(code)}
                    hrefLang={code}
                    lang={code}
                    aria-current={lang === code ? "page" : undefined}
                    onClick={(e) => {
                      rememberLang(code);
                      if (!isPlainClick(e)) return;
                      e.preventDefault();
                      setLang(code);
                      setDropdownOpen(false);
                      langButtonRef.current?.focus();
                    }}
                    onAuxClick={(e) => {
                      if (e.button === 1) rememberLang(code);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-raised transition-colors ${FOCUS_RING} focus-visible:-outline-offset-2 ${
                      lang === code ? "text-accent font-bold bg-raised" : "text-ink"
                    }`}
                  >
                    <span className={`fi fi-${fi} rounded-sm`} aria-hidden="true" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          ref={menuButtonRef}
          className={`md:hidden p-2 rounded-md text-muted hover:text-ink ${FOCUS_RING}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label={t.nav.menu}
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
        <div id="mobile-menu" className="md:hidden border-t border-line bg-bg px-4 pb-4">
          <ul className="flex flex-col gap-3 pt-3">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 py-1 text-base font-bold ${FOCUS_RING} ${active === l.id ? HUE[STOP_HUES[links.indexOf(l)]].text : "text-ink hover:text-brand"}`}
                >
                  <span className={`font-mono text-xs ${HUE[STOP_HUES[links.indexOf(l)]].text}`}>0{links.indexOf(l) + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between mt-4">
            <ul className="flex flex-col gap-1 border border-line rounded-lg overflow-hidden w-36">
              {LANGS.map(({ code, fi, label }) => (
                <li key={code}>
                  <a
                    href={pathForLang(code)}
                    hrefLang={code}
                    lang={code}
                    aria-current={lang === code ? "page" : undefined}
                    onClick={(e) => {
                      rememberLang(code);
                      if (!isPlainClick(e)) return;
                      e.preventDefault();
                      setLang(code);
                      setOpen(false);
                      menuButtonRef.current?.focus();
                    }}
                    onAuxClick={(e) => {
                      if (e.button === 1) rememberLang(code);
                    }}
                    className={`flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-raised transition-colors ${FOCUS_RING} focus-visible:-outline-offset-2 ${
                      lang === code ? "text-accent font-bold bg-raised" : "text-ink"
                    }`}
                  >
                    <span className={`fi fi-${fi} rounded-sm`} aria-hidden="true" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <button
              onClick={toggle}
              className={`p-2 rounded-lg border border-line text-muted ${FOCUS_RING}`}
              aria-label={t.nav.theme}
              aria-pressed={theme === "dark"}
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
      <div ref={progressRef} className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-gradient-to-r from-hue-teal via-hue-plum via-50% to-accent-bright" style={{ transform: "scaleX(0)" }} aria-hidden="true" />
    </header>
  );
}
