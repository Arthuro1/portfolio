"use client";

import Reveal from "@/components/Reveal";
import { HUE, type Hue } from "@/lib/hues";

type Props = {
  id: string;
  index?: number;
  hue: Hue;
  kicker: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
};

// One page section: kicker (numbered when `index` is given), title and optional
// intro in the section's colour, then its content.
export default function Section({ id, index, hue, kicker, title, intro, children }: Props) {
  const h = HUE[hue];

  return (
    <section id={id} className="relative scroll-mt-16 px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-12">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className={`flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.2em] ${h.text}`}>
            <span className={`inline-block w-2.5 h-2.5 rotate-45 ${h.bg}`} aria-hidden="true" />
            {index !== undefined && `${String(index).padStart(2, "0")} · `}
            {kicker}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-ink mt-3">{title}</h2>
          <span className={`mt-4 block h-1 w-16 rounded-full ${h.bg}`} aria-hidden="true" />
          {intro && <p className="mt-5 text-lg text-ink/75 max-w-2xl leading-relaxed">{intro}</p>}
        </Reveal>

        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
