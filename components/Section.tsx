"use client";

import Reveal from "@/components/Reveal";
import { useLanguage } from "@/context/LanguageContext";

type Props = {
  id: string;
  index: number;
  kicker: string;
  title: string;
  intro?: string;
  next?: { href: string; label: string };
  children: React.ReactNode;
};

// One stop of the journey: numbered kicker, title, optional intro, content and
// a "Next stop" hand-off to the following section.
export default function Section({ id, index, kicker, title, intro, next, children }: Props) {
  const { t } = useLanguage();

  return (
    <section id={id} className="relative scroll-mt-16 px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span className="inline-block w-2.5 h-2.5 rotate-45 border-2 border-accent-bright" aria-hidden="true" />
            {String(index).padStart(2, "0")} · {kicker}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-ink mt-3">{title}</h2>
          {intro && <p className="mt-4 text-lg text-muted max-w-2xl leading-relaxed">{intro}</p>}
        </Reveal>

        <div className="mt-12">{children}</div>

        {next && (
          <div className="mt-20 flex justify-center">
            <a
              href={next.href}
              className="group inline-flex flex-col items-center gap-1 text-center rounded-xl px-6 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-bright"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{t.journey.next}</span>
              <span className="font-display text-xl font-semibold text-ink group-hover:text-brand transition-colors">{next.label}</span>
              <svg className="w-5 h-5 text-accent mt-1 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
