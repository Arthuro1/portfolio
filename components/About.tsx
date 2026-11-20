"use client";

import { useLanguage } from "@/context/LanguageContext";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Rich from "@/components/Rich";

const FACT_ICONS = [
  "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
  "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
  "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129",
  "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
  "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
];

export default function About() {
  const { t } = useLanguage();
  const a = t.about;
  const facts = [
    { label: a.location, value: a.locationValue },
    { label: a.education, value: a.educationValue },
    { label: a.languages, value: a.languagesValue },
    { label: a.interests, value: a.interestsValue },
    { label: a.engagement, value: a.engagementValue },
  ];

  return (
    <Section id="about" index={1} kicker={a.kicker} title={a.title} next={{ href: "#skills", label: t.nav.skills }}>
      <div className="grid md:grid-cols-[1.25fr_1fr] gap-10 items-start">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted max-w-prose">
          <p>
            <Rich text={a.bio1} />
          </p>
          <p>
            <Rich text={a.bio2} />
          </p>
          <p>
            <Rich text={a.bio3} />
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-2xl border border-line bg-surface/80 p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{a.factsTitle}</p>
            <dl className="mt-5 space-y-4">
              {facts.map((f, i) => (
                <div key={f.label} className="flex gap-3">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={FACT_ICONS[i]} />
                  </svg>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wide text-muted">{f.label}</dt>
                    <dd className="mt-0.5 text-ink">{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>

      <ul className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {a.stats.map((stat, i) => (
          <li key={stat.label}>
            <Reveal delay={i * 100} className="h-full">
              <div className="group h-full rounded-2xl border border-line bg-surface/60 p-5 transition-colors hover:border-accent-bright">
                <CountUp value={stat.value} className="block font-display text-4xl sm:text-5xl font-extrabold text-accent tabular-nums" />
                <span className="mt-2 block text-sm text-muted">{stat.label}</span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
