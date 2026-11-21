"use client";

import { useId, useRef } from "react";
import Rich from "@/components/Rich";
import ShotReel from "@/components/ShotReel";
import RagDiagram from "@/components/RagDiagram";
import { LinkRow, ProjectEmblem, TagList, type Emblem, type ProjectLink } from "@/components/ProjectParts";
import { useFindable } from "@/lib/use-findable";
import type { Translations } from "@/lib/translations";

type Labels = Translations["projects"];
type Item = Labels["featured"][number];
export type CaseStudyData = {
  id: string;
  emblem: Emblem;
  tags: string[];
  shots: string[];
  links: ProjectLink[];
  // Index of the section (in the item's `sections`) that shows the RAG architecture diagram.
  diagram?: number;
};

const METRIC_COLS: Record<number, string> = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3" };

const TOGGLE_CLASS =
  "group/cs -ml-2 inline-flex min-h-10 items-center gap-2.5 rounded-full py-1 pl-2 pr-3 text-sm font-bold text-brand transition-colors hover:bg-brand/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent";
// Below sm the toggle and the links stack on the left, clear of the chat button in the bottom-right corner.
const BAR_CLASS = "mt-6 flex flex-col items-start gap-x-4 gap-y-3 border-t border-line pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between";

/**
 * A featured project. The closed card already says what it is and what it
 * proves (summary, metric tiles, links); "Read the case study" opens the
 * structured write-up. The write-up stays in the page while closed
 * (hidden="until-found"), so find-in-page and crawlers still reach it.
 */
export default function CaseStudy({ item, data, labels }: { item: Item; data: CaseStudyData; labels: Labels }) {
  const { open, setOpen, ref } = useFindable<HTMLDivElement>();
  const bodyId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  // The end-of-study button disappears on collapse: hand focus to the top toggle and bring it on screen.
  const closeFromEnd = () => {
    toggleRef.current?.focus({ preventScroll: true });
    setOpen(false);
    requestAnimationFrame(() => toggleRef.current?.scrollIntoView({ block: "center" }));
  };
  const sections = item.sections;
  // Span both columns for the diagram section, for a section that would otherwise sit alone in its row
  // (before the diagram, or last), so no row is left half empty.
  let col = 0;
  const spans = sections.map((_, i) => {
    const wide = data.diagram === i || (col === 0 && (data.diagram === i + 1 || i === sections.length - 1));
    col = wide ? 0 : 1 - col;
    return wide;
  });

  return (
    <article id={data.id} className="scroll-mt-20 rounded-2xl border border-line bg-surface/90 p-5 shadow-card sm:p-6">
      <div data-reel-host className="group lg:flex lg:items-start lg:gap-8">
        <ShotReel
          label={item.title}
          labels={labels.shotViewer}
          shots={data.shots.map((src, s) => ({ src, caption: item.shots[s] ?? item.title }))}
          className="-mx-5 -mt-5 mb-5 rounded-t-2xl border-b border-line sm:-mx-6 sm:-mt-6 sm:mb-6 lg:m-0 lg:w-[52%] lg:shrink-0 lg:rounded-xl lg:border"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-4">
            <ProjectEmblem emblem={data.emblem} />
            <div className="min-w-0">
              <p className="font-mono text-xs text-muted">
                {item.type} · {item.date}
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold leading-snug text-ink">{item.title}</h3>
            </div>
          </div>
          <p className="mt-4 leading-relaxed text-ink/90">
            <Rich text={item.summary} />
          </p>

          <ul aria-label={labels.metricsLabel} className={`mt-5 grid gap-2 ${METRIC_COLS[item.metrics.length] ?? ""}`}>
            {item.metrics.map((m) => (
              <li
                key={m.label}
                className="flex items-center gap-3 rounded-xl border border-line bg-raised/50 px-3 py-2 sm:flex-col sm:items-start sm:gap-0 sm:py-3"
              >
                <span className="w-16 shrink-0 font-display text-2xl font-bold leading-none tabular-nums text-ink sm:w-auto">{m.value}</span>
                <span className="min-w-0 hyphens-auto break-words sm:mt-2">
                  <span className="block text-xs leading-snug text-ink/80">{m.label}</span>
                  {m.note && <span className="mt-0.5 block font-mono text-[11px] leading-snug text-muted">{m.note}</span>}
                </span>
              </li>
            ))}
          </ul>
          {item.metricsNote && <p className="mt-2 text-xs text-muted">{item.metricsNote}</p>}

          <div className="mt-5">
            <TagList tags={data.tags} labels={labels} />
          </div>
        </div>
      </div>

      <div className={BAR_CLASS}>
        <button ref={toggleRef} type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={bodyId} className={TOGGLE_CLASS}>
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-brand/40 bg-brand/[0.07] group-hover/cs:border-brand">
            <svg
              className={`h-3.5 w-3.5 transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
          {open ? labels.caseStudy.close : labels.caseStudy.open}
          <span className="sr-only">: {item.title}</span>
        </button>
        <LinkRow links={data.links} labels={labels.links} />
      </div>

      {/* No margin or padding on this wrapper: hidden="until-found" keeps its box. */}
      <div ref={ref} id={bodyId} hidden={!open}>
        <div className="mt-5 grid gap-x-10 gap-y-7 border-t border-line pt-6 md:grid-cols-2">
          {sections.map((section, i) => {
            const figure = data.diagram === i;
            const wide = spans[i];
            return (
              <section key={section.heading} className={wide ? "md:col-span-2" : ""}>
                <h4 className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.16em] text-hue-teal">
                  <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-hue-teal" aria-hidden="true" />
                  {section.heading}
                </h4>
                {section.body && (
                  <p className={`mt-2.5 text-sm leading-relaxed text-ink/85 ${wide ? "max-w-3xl" : ""}`}>
                    <Rich text={section.body} />
                  </p>
                )}
                {section.points && (
                  <ul className={`mt-2.5 grid gap-y-2 text-sm leading-relaxed text-ink/85 ${wide ? "max-w-3xl" : ""}`}>
                    {section.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rotate-45 bg-brand/50" aria-hidden="true" />
                        <span>
                          <Rich text={point} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {figure && (
                  <div className="mt-5 sm:rounded-xl sm:border sm:border-line sm:bg-bg/40 sm:p-5">
                    <RagDiagram labels={labels.diagram} />
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
      {open && (
        <div className={BAR_CLASS}>
          <button type="button" onClick={closeFromEnd} aria-expanded={true} aria-controls={bodyId} className={TOGGLE_CLASS}>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-brand/40 bg-brand/[0.07] group-hover/cs:border-brand">
              <svg className="h-3.5 w-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            {labels.caseStudy.close}
            <span className="sr-only">: {item.title}</span>
          </button>
          <LinkRow links={data.links} labels={labels.links} />
        </div>
      )}
    </article>
  );
}
