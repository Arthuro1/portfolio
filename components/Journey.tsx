"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { STOPS, useJourney } from "@/context/JourneyContext";
import { openChat } from "@/lib/chat-events";

const DONE_KEY = "journey-complete-shown";
const DONE_AUTOHIDE_MS = 12000;

// Ochre lozenges that fly out of the completion card.
const SPARKS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  return { dx: `${Math.cos(angle) * 90}px`, dy: `${Math.sin(angle) * 60 - 20}px` };
});

export default function Journey() {
  const { t } = useLanguage();
  const { active, visited } = useJourney();
  const [done, setDone] = useState(false);
  const labels = [t.nav.about, t.nav.skills, t.nav.projects, t.nav.experience, t.nav.contact];

  useEffect(() => {
    if (visited.size < STOPS.length) return;
    try {
      if (sessionStorage.getItem(DONE_KEY)) return;
      sessionStorage.setItem(DONE_KEY, "1");
    } catch {
      // Storage blocked: still celebrate, just not remembered.
    }
    setDone(true);
    const timer = setTimeout(() => setDone(false), DONE_AUTOHIDE_MS);
    return () => clearTimeout(timer);
  }, [visited]);

  return (
    <>
      <nav
        aria-label={t.journey.map}
        className={`fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-500 xl:block ${
          active ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ol className="relative flex flex-col gap-6">
          <span className="absolute bottom-2 left-[7px] top-2 w-0.5 bg-line" aria-hidden="true" />
          {STOPS.map((stop, i) => {
            const isActive = active === stop;
            const isVisited = visited.has(stop);
            return (
              <li key={stop}>
                <a href={`#${stop}`} className="group relative flex items-center" aria-label={labels[i]} aria-current={isActive ? "location" : undefined}>
                  <span
                    className={`block h-4 w-4 rotate-45 border-2 transition-all duration-300 ${
                      isActive
                        ? "scale-110 border-accent-bright bg-accent-bright"
                        : isVisited
                          ? "border-accent-bright bg-surface"
                          : "border-line bg-bg group-hover:border-brand"
                    }`}
                  />
                  <span
                    className={`absolute left-7 whitespace-nowrap rounded-full border border-line bg-surface px-2.5 py-0.5 font-mono text-[11px] text-ink transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 ${
                      isActive ? "opacity-0 2xl:opacity-100" : "opacity-0"
                    }`}
                  >
                    {labels[i]}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
        <p className="mt-6 font-mono text-[11px] text-muted">
          {visited.size}/{STOPS.length}
        </p>
      </nav>

      {done && (
        <div role="status" className="toast-in fixed bottom-24 left-4 right-4 z-50 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm">
          <div className="relative rounded-2xl border border-accent-bright bg-surface p-5 shadow-2xl">
            <span className="pointer-events-none absolute left-10 top-6" aria-hidden="true">
              {SPARKS.map((s, i) => (
                <span
                  key={i}
                  className="burst absolute h-2 w-2 bg-accent-bright"
                  style={{ "--dx": s.dx, "--dy": s.dy, animationDelay: `${i * 15}ms` } as React.CSSProperties}
                />
              ))}
            </span>
            <button
              type="button"
              onClick={() => setDone(false)}
              aria-label={t.journey.close}
              className="absolute right-3 top-3 rounded-full p-1 text-muted hover:text-ink"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <p className="pr-6 font-display text-lg font-bold text-ink">✦ {t.journey.doneTitle}</p>
            <p className="mt-1 text-sm text-muted">{t.journey.doneBody}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href="mailto:arthur.meteng@yahoo.com" className="rounded-full bg-brand-fill px-4 py-2 text-sm font-bold text-white">
                {t.journey.sayHello}
              </a>
              <button
                type="button"
                onClick={() => {
                  setDone(false);
                  openChat();
                }}
                className="rounded-full border border-line px-4 py-2 text-sm font-bold text-ink hover:border-accent-bright hover:text-accent"
              >
                {t.journey.ask}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
