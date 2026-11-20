"use client";

import { useLanguage } from "@/context/LanguageContext";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import TechChip from "@/components/TechChip";

// One icon per category, in the order of t.skills.categories.
const ICONS = [
  "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z",
  "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
  "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
  "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
  "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
  "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
];

// Every category is on the page at once, so a reader scanning for one
// technology (or searching the page for it) always finds it.
export default function Skills() {
  const { t } = useLanguage();
  const s = t.skills;

  return (
    <Section id="skills" index={2} hue="plum" kicker={s.kicker} title={s.title} intro={s.intro}>
      <div className="grid gap-5 md:grid-cols-2">
        {s.categories.map((c, i) => (
          <Reveal key={c.category} delay={(i % 2) * 80} className="h-full">
            <article className="h-full rounded-2xl border border-line bg-surface/90 p-6 shadow-card">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d={ICONS[i]} />
                  </svg>
                </span>
                <h3 className="font-display text-xl font-bold text-ink">{c.category}</h3>
              </div>
              <p className="mt-3 text-ink/75">{c.blurb}</p>

              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-brand">{s.coreLabel}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {c.core.map((skill) => (
                  <li key={skill}>
                    <TechChip name={skill} size="more" className="border-line bg-surface font-bold text-ink shadow-card" />
                  </li>
                ))}
              </ul>

              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{s.moreLabel}</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {c.more.map((skill) => (
                  <li key={skill}>
                    <TechChip name={skill} className="border-line bg-bg/50" />
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
