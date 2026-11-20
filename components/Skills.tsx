"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";

// One icon per category, in the order of t.skills.categories.
const ICONS = [
  "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z",
  "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
  "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
  "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
  "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
  "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
];

export default function Skills() {
  const { t } = useLanguage();
  const s = t.skills;
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const group = s.categories[selected];

  const select = (i: number) => {
    const next = (i + s.categories.length) % s.categories.length;
    setSelected(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const moves: Record<string, number> = {
      ArrowRight: selected + 1,
      ArrowDown: selected + 1,
      ArrowLeft: selected - 1,
      ArrowUp: selected - 1,
      Home: 0,
      End: s.categories.length - 1,
    };
    if (e.key in moves) {
      e.preventDefault();
      select(moves[e.key]);
    }
  };

  return (
    <Section id="skills" index={2} kicker={s.kicker} title={s.title} intro={s.intro} next={{ href: "#projects", label: t.nav.projects }}>
      <Reveal>
        <div role="tablist" aria-label={s.title} onKeyDown={onKeyDown} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {s.categories.map((c, i) => {
            const isOn = i === selected;
            return (
              <button
                key={c.category}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`skills-tab-${i}`}
                aria-selected={isOn}
                aria-controls="skills-panel"
                tabIndex={isOn ? 0 : -1}
                onClick={() => setSelected(i)}
                className={`group relative flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-bright ${
                  isOn
                    ? "border-accent-bright bg-raised shadow-[0_8px_30px_-12px_rgb(var(--accent-bright)/0.5)] -translate-y-0.5"
                    : "border-line bg-surface/60 hover:border-brand/60 hover:-translate-y-0.5"
                }`}
              >
                <span className="flex w-full items-center justify-between">
                  <svg className={`w-6 h-6 ${isOn ? "text-accent" : "text-brand"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d={ICONS[i]} />
                  </svg>
                  <span className="font-mono text-[11px] text-muted">{c.core.length + c.more.length}</span>
                </span>
                <span className={`font-display text-sm font-semibold leading-tight ${isOn ? "text-ink" : "text-ink/80"}`}>{c.category}</span>
              </button>
            );
          })}
        </div>

        <div
          key={selected}
          id="skills-panel"
          role="tabpanel"
          aria-labelledby={`skills-tab-${selected}`}
          className="panel-in relative mt-6 overflow-hidden rounded-2xl border border-line bg-surface/80 p-6 sm:p-10 sm:min-h-[360px]"
        >
          <div className="ndop-lattice opacity-70 inset-auto -right-20 -top-20 w-80 h-80" aria-hidden="true" />
          <div className="relative">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">{group.category}</h3>
            <p className="mt-2 text-lg text-muted">{group.blurb}</p>

            <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-accent">{s.coreLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-3">
              {group.core.map((skill) => (
                <li key={skill} className="rounded-full border border-brand/40 bg-brand/10 px-4 py-2 text-base font-bold text-ink">
                  {skill}
                </li>
              ))}
            </ul>

            <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">{s.moreLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.more.map((skill) => (
                <li key={skill} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
