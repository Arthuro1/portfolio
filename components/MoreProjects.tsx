"use client";

import { useId, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import Rich from "@/components/Rich";
import ShotReel from "@/components/ShotReel";
import LogoTile from "@/components/LogoTile";
import { PaperIcon } from "@/components/icons";
import { LinkRow, ProjectEmblem, TagList, type Emblem, type ProjectLink } from "@/components/ProjectParts";
import { useFindable } from "@/lib/use-findable";
import type { Translations } from "@/lib/translations";

const GLYPH = {
  search: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  map: "M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z",
  chat: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155",
  book: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
};

// Per-project data, in the order of t.projects.more. `shots` are 960x600
// screenshots from public/projects/shots, cover first; their captions are the
// item's `shots` in lib/translations.ts (checked by tests/project-shots.test.ts).
type Project = { emblem: Emblem; tags: string[]; shots?: string[]; links: ProjectLink[] };
const MORE: Project[] = [
  {
    emblem: { src: "/projects/my-goals.svg" },
    tags: ["React 19", "TypeScript", "Supabase", "IndexedDB", "PWA", "Vite", "Vitest", "GitHub Actions", "Vercel"],
    shots: [
      "/projects/shots/my-goals/01-today.webp",
      "/projects/shots/my-goals/02-progress.webp",
      "/projects/shots/my-goals/03-goal-setup.webp",
      "/projects/shots/my-goals/04-rewards-highlights.webp",
      "/projects/shots/my-goals/05-purpose-review.webp",
    ],
    links: [{ kind: "live", href: "https://my-goals-pwa.vercel.app", colors: { bg: "#c8f53c", fg: "#0f100d" } }],
  },
  {
    emblem: { src: "/projects/ghomala.svg" },
    tags: ["Claude Code", "Codex", "React", "TypeScript", "Supabase", "Python", "Playwright", "Vite", "PWA", "Web Audio", "i18n"],
    shots: [
      "/projects/shots/parlons-ghomala/01-landing.webp",
      "/projects/shots/parlons-ghomala/02-lesson-video.webp",
      "/projects/shots/parlons-ghomala/03-picture-words.webp",
      "/projects/shots/parlons-ghomala/04-tone-grid.webp",
      "/projects/shots/parlons-ghomala/05-dialect-map.webp",
    ],
    links: [],
  },
  {
    emblem: { path: GLYPH.chat },
    tags: ["Cognigy", "Botpress", "React", "Redux", "Node.js", "NLP", "Docker", "Kubernetes"],
    links: [],
  },
  {
    emblem: { src: "/projects/wach-auf.png", tile: "bg-[#fffaf0] p-1 ring-1 ring-line" },
    tags: ["HTML", "CSS", "JavaScript", "Python", "Cloudflare Workers", "i18n"],
    links: [],
  },
  {
    emblem: { src: "/favicon.svg" },
    tags: ["Next.js", "TypeScript", "DeepSeek", "OpenRouter", "TailwindCSS", "Vercel", "Prompt Engineering"],
    links: [
      { kind: "live", href: "https://paulmeteng.space", colors: { bg: "#2b3593", fg: "#f7f5ef" } },
      { kind: "code", href: "https://github.com/Arthuro1/portfolio" },
    ],
  },
  {
    emblem: { path: GLYPH.search },
    tags: ["Python", "React", "Elasticsearch", "NLP", "Chatbot", "NoSQL"],
    links: [],
  },
  {
    emblem: { path: GLYPH.map },
    tags: ["Python", "Flask", "Elasticsearch", "MongoDB", "Machine Learning"],
    links: [{ kind: "code", href: "https://github.com/Arthuro1/Courses_Recommender" }],
  },
  {
    emblem: { path: GLYPH.book },
    tags: ["React", "Redux", "TypeScript", "Node.js", "Express", "MongoDB"],
    links: [{ kind: "code", href: "https://github.com/Arthuro1/AWT_Project" }],
  },
];
const VISIBLE_MORE = 4;
// Below md the cards stack in one column, so phones show only the first two before the toggle.
const VISIBLE_MORE_MOBILE = 2;

// Education (t.experience.education) closes this section, after the projects.
// The UDE mark is white, so it sits on the university's blue.
const UDE = { logo: "/logos/ude.png", tile: "bg-[#004c93] p-1.5" };
const EDUCATION_PAPERS = ["https://doi.org/10.1145/3636555.3636881", ""];
const EDUCATION_CARD = "group rounded-2xl border border-line bg-surface/90 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40";

export default function MoreProjects() {
  const { t } = useLanguage();
  const p = t.projects;
  const ex = t.experience;
  // The cards past the first four stay in the page (hidden="until-found"), so
  // find-in-page for a project name still reaches them. On phones cards 3–4
  // are also hidden (CSS only) until "Show all".
  const { open: showAll, setOpen: setShowAll, ref: restRef } = useFindable<HTMLDivElement>();
  const restId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const cards = p.more.map((item, i) => (
    <ProjectCard
      key={item.title}
      item={item}
      data={MORE[i]}
      labels={p}
      className={!showAll && i >= VISIBLE_MORE_MOBILE && i < VISIBLE_MORE ? "max-md:hidden" : ""}
    />
  ));

  const toggle = () => {
    setShowAll(!showAll);
    requestAnimationFrame(() => {
      // Collapsing removes the cards above the button; keep it on screen.
      if (showAll) toggleRef.current?.scrollIntoView({ block: "nearest" });
      // Expanding reveals them above the button; move focus to the first one so Tab and screen readers continue there.
      else {
        const first = window.matchMedia("(min-width: 768px)").matches ? VISIBLE_MORE : VISIBLE_MORE_MOBILE;
        listRef.current?.querySelectorAll<HTMLElement>("article h3")[first]?.focus();
      }
    });
  };

  return (
    <Section id="more-projects" hue="teal" kicker={p.moreKicker} title={p.moreTitle}>
      <div ref={listRef}>
        <div className="grid gap-5 md:grid-cols-2">{cards.slice(0, VISIBLE_MORE)}</div>
        {/* No margin or padding on this wrapper: hidden="until-found" keeps its box. */}
        <div ref={restRef} id={restId} hidden={!showAll}>
          <div className="grid gap-5 pt-5 md:grid-cols-2">{cards.slice(VISIBLE_MORE)}</div>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          ref={toggleRef}
          type="button"
          onClick={toggle}
          aria-expanded={showAll}
          aria-controls={restId}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface/80 px-5 py-2.5 text-sm font-bold text-ink shadow-card transition-colors hover:border-brand/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {showAll ? p.showFewer : p.showAll.replace("{n}", String(MORE.length))}
          <svg
            className={`h-3.5 w-3.5 text-brand transition-transform motion-reduce:transition-none ${showAll ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <h3 className="mt-12 sm:mt-20 font-display text-2xl sm:text-3xl font-bold text-ink">{ex.educationTitle}</h3>
      <div className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-2">
        {ex.education.map((edu, i) => (
          <Reveal key={edu.degree} delay={i * 100} className="h-full">
            <article className={`${EDUCATION_CARD} flex h-full flex-col p-4 sm:p-6`}>
              <div className="flex items-start gap-4">
                <LogoTile src={UDE.logo} tile={UDE.tile} />
                <div>
                  <span className="font-mono text-xs text-muted">{edu.period}</span>
                  <h4 className="mt-1 font-display text-lg font-bold text-ink">{edu.degree}</h4>
                  <p className="font-bold text-brand">{edu.institution}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/75 sm:mt-4">{edu.thesis}</p>
              {EDUCATION_PAPERS[i] && (
                <a
                  href={EDUCATION_PAPERS[i]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-fill px-3 py-1.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 sm:mt-4"
                >
                  <PaperIcon className="w-4 h-4" />
                  {ex.paperLabel}
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

type Labels = Translations["projects"];

function ProjectCard({ item, data, labels, className = "" }: { item: Labels["more"][number]; data: Project; labels: Labels; className?: string }) {
  return (
    <article
      data-reel-host
      className={`group relative flex flex-col rounded-2xl border border-line bg-surface/90 p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-6 ${className}`}
    >
      {data.shots && (
        <ShotReel
          label={item.title}
          labels={labels.shotViewer}
          shots={data.shots.map((src, s) => ({ src, caption: item.shots?.[s] ?? item.title }))}
          className="-mx-5 -mt-5 mb-5 rounded-t-2xl border-b border-line sm:-mx-6 sm:-mt-6 sm:mb-6"
        />
      )}
      <div className="flex items-start gap-4">
        <ProjectEmblem emblem={data.emblem} />
        <div className="min-w-0">
          <p className="font-mono text-xs text-muted">
            {item.type} · {item.date}
          </p>
          <h3
            tabIndex={-1}
            className="mt-1 rounded-sm font-display text-xl font-bold leading-snug text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {item.title}
          </h3>
        </div>
      </div>
      <p className="mt-4 leading-relaxed text-ink/90">
        <Rich text={item.summary} />
      </p>

      {item.highlights.length > 0 && (
        <ul className="mt-3 grid gap-y-1.5 text-sm leading-relaxed text-ink/70">
          {item.highlights.map((hl) => (
            <li key={hl} className="flex gap-3">
              <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rotate-45 bg-brand/50" aria-hidden="true" />
              <span>
                <Rich text={hl} />
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-5">
        <TagList tags={data.tags} labels={labels} />
        <LinkRow links={data.links} labels={labels.links} className="mt-5 border-t border-line pt-4" />
      </div>
    </article>
  );
}
