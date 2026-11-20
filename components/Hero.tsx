"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { STOPS, useJourney } from "@/context/JourneyContext";
import { openChat } from "@/lib/chat-events";
import Rich from "@/components/Rich";
import { GitHubIcon, LinkedInIcon, MailIcon, SparkleIcon } from "@/components/icons";

const ROTATE_MS = 2200;

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;
  const [word, setWord] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Cycles through the phrases once, then stops; the word stays clickable.
  useEffect(() => {
    if (!autoplay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let steps = 0;
    const id = setInterval(() => {
      steps += 1;
      setWord((w) => (w + 1) % h.rotating.length);
      if (steps >= h.rotating.length) clearInterval(id);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [autoplay, h.rotating.length]);

  const shuffle = () => {
    setAutoplay(false);
    setWord((w) => (w + 1) % h.rotating.length);
  };

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div className="ndop-lattice -left-1/4 top-0 w-[150%] h-full opacity-50" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto w-full grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div>
          <p className="rise font-mono text-xs uppercase tracking-[0.25em] text-accent" style={{ animationDelay: "0ms" }}>
            {h.badge}
          </p>
          <h1 className="rise font-display font-extrabold tracking-tight leading-[0.95] text-6xl sm:text-7xl mt-5" style={{ animationDelay: "120ms" }}>
            Paul Arthur
            <br />
            <span className="text-brand">Meteng</span>
            <span className="text-accent-bright">.</span>
          </h1>

          <p className="rise font-display text-2xl sm:text-3xl font-semibold text-ink mt-8 min-h-[2.5em] sm:min-h-0" style={{ animationDelay: "240ms" }}>
            {h.lead}{" "}
            <button
              type="button"
              onClick={shuffle}
              aria-label={`${h.rotating[word]} — ${h.shuffle}`}
              title={h.shuffle}
              className="group inline-flex items-baseline gap-2 text-accent underline decoration-dashed decoration-2 underline-offset-[6px] hover:decoration-solid focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-bright rounded"
            >
              <span key={word} className="word-in" aria-live="polite">
                {h.rotating[word]}
              </span>
              <svg className="w-5 h-5 self-center transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </p>

          <p className="rise text-lg sm:text-xl text-muted max-w-xl mt-6 leading-relaxed" style={{ animationDelay: "360ms" }}>
            <Rich text={h.description} />
          </p>

          <div className="rise flex flex-wrap gap-3 mt-10" style={{ animationDelay: "480ms" }}>
            <a
              href="#about"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-fill px-6 py-3 font-bold text-white shadow-[0_10px_30px_-10px_rgb(var(--brand-fill)/0.8)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bright"
            >
              {h.cta1}
              <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
            <button
              type="button"
              onClick={openChat}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-6 py-3 font-bold text-ink transition-colors hover:border-accent-bright hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bright"
            >
              <SparkleIcon className="w-4 h-4" />
              {h.cta2}
            </button>
          </div>

          <div className="rise flex gap-5 mt-10 text-muted" style={{ animationDelay: "600ms" }}>
            <a href="https://github.com/Arthuro1" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors" aria-label="GitHub">
              <GitHubIcon className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/paul-arthur-meteng-kamdem-06b922125" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors" aria-label="LinkedIn">
              <LinkedInIcon className="w-6 h-6" />
            </a>
            <a href="mailto:arthur.meteng@yahoo.com" className="hover:text-accent transition-colors" aria-label="Email">
              <MailIcon className="w-6 h-6" />
            </a>
          </div>
        </div>

        <JourneyMap />
      </div>
    </section>
  );
}

// Section stops laid out on a pentagon around the centre, in % of the box.
const STOP_POS = STOPS.map((_, i) => {
  const angle = ((-90 + i * 72) * Math.PI) / 180;
  return { x: 50 + 38 * Math.cos(angle), y: 50 + 38 * Math.sin(angle) };
});

// Small unlabeled "knowledge" nodes, each tied to a stop index.
const MINOR: { x: number; y: number; to: number }[] = [
  { x: 30, y: 17, to: 0 },
  { x: 70, y: 15, to: 0 },
  { x: 95, y: 58, to: 1 },
  { x: 74, y: 52, to: 1 },
  { x: 88, y: 92, to: 2 },
  { x: 50, y: 95, to: 3 },
  { x: 12, y: 92, to: 3 },
  { x: 5, y: 58, to: 4 },
  { x: 30, y: 56, to: 4 },
];

function JourneyMap() {
  const { t } = useLanguage();
  const { active, visited } = useJourney();
  const labels = [t.nav.about, t.nav.skills, t.nav.projects, t.nav.experience, t.nav.contact];
  const complete = visited.size === STOPS.length;

  return (
    <nav aria-label={t.journey.map} className="relative hidden lg:block">
      <div className="float-slow relative aspect-square w-full max-w-[440px] mx-auto">
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" aria-hidden="true">
          {MINOR.map((m, i) => (
            <path
              key={`m${i}`}
              d={`M${m.x} ${m.y} L${STOP_POS[m.to].x} ${STOP_POS[m.to].y}`}
              pathLength={1}
              className="edge-draw stroke-line"
              strokeWidth={0.35}
              style={{ animationDelay: `${900 + i * 60}ms` }}
            />
          ))}
          {STOP_POS.map((p, i) => {
            const n = STOP_POS[(i + 1) % STOP_POS.length];
            return (
              <path key={`r${i}`} d={`M${p.x} ${p.y} L${n.x} ${n.y}`} className="stroke-brand/30" strokeWidth={0.3} strokeDasharray="1.2 1.2" fill="none" />
            );
          })}
          {STOP_POS.map((p, i) => (
            <path
              key={`c${i}`}
              d={`M50 50 L${p.x} ${p.y}`}
              pathLength={1}
              className={`edge-draw ${visited.has(STOPS[i]) ? "stroke-accent-bright" : "stroke-brand/60"} transition-colors duration-700`}
              strokeWidth={0.6}
              style={{ animationDelay: `${500 + i * 120}ms` }}
            />
          ))}
          {MINOR.map((m, i) => (
            <circle key={`d${i}`} cx={m.x} cy={m.y} r={1.1} className="fill-brand/50" />
          ))}
        </svg>

        <div
          className={`node-pop absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-20 w-20 items-center justify-center rounded-full border-2 bg-surface font-display text-2xl font-extrabold transition-shadow duration-700 ${
            complete ? "border-accent-bright text-accent shadow-[0_0_40px_rgb(var(--accent-bright)/0.5)]" : "border-brand text-brand"
          }`}
          style={{ animationDelay: "300ms" }}
          aria-hidden="true"
        >
          PM
        </div>

        {STOPS.map((stop, i) => {
          const isVisited = visited.has(stop);
          const isActive = active === stop;
          return (
            <a
              key={stop}
              href={`#${stop}`}
              className="node-pop group absolute -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-bright"
              style={{ left: `${STOP_POS[i].x}%`, top: `${STOP_POS[i].y}%`, animationDelay: `${700 + i * 120}ms` }}
              aria-current={isActive ? "location" : undefined}
            >
              <span
                className={`block h-5 w-5 rotate-45 border-2 transition-all duration-300 group-hover:scale-125 ${
                  isVisited ? "border-accent-bright bg-accent-bright" : "border-brand bg-bg group-hover:bg-brand/30"
                } ${isActive ? "ring-4 ring-accent-bright/30" : ""}`}
              />
              <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-surface/90 px-3 py-1 font-mono text-xs text-ink transition-colors group-hover:border-accent-bright">
                {labels[i]}
              </span>
            </a>
          );
        })}
      </div>
      <p className="mt-6 text-center font-mono text-xs text-muted">
        ↳ {t.hero.mapHint} · {visited.size}/{STOPS.length}
      </p>
    </nav>
  );
}
