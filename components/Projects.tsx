"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import TechChip from "@/components/TechChip";
import Rich from "@/components/Rich";
import LogoTile, { TILE_MOTION } from "@/components/LogoTile";
import { ExternalIcon, GitHubIcon, PaperIcon } from "@/components/icons";

type Filter = "featured" | "ai" | "apps" | "work" | "uni" | "all";
const FILTERS: Filter[] = ["featured", "ai", "apps", "work", "uni", "all"];
const VISIBLE_TAGS = 4;

// A project's own logo (from public/), or an outline glyph for projects
// without one. `tile` is a background for logos that need one (see LogoTile).
type Emblem = { src: string; tile?: string } | { path: string };
const GLYPH = {
  graph:
    "M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z",
  cap: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
  search: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  map: "M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z",
  chat: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155",
  book: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
};

// Per-project data, in the order of t.projects.items.
// `shot` is a screenshot from public/projects/shots (960x600).
const PROJECTS: { emblem: Emblem; tags: string[]; groups: Filter[]; shot?: string; live?: string; code?: string; paper?: string }[] = [
  {
    emblem: { path: GLYPH.graph },
    tags: ["Python", "LangChain", "Neo4J", "ChromaDB", "FastAPI", "LLM-as-Judge", "Evaluation", "Docker"],
    groups: ["featured", "ai"],
    shot: "/projects/shots/knowledge-graph-rag.webp",
    code: "https://github.com/Arthuro1/knowledge-graph-rag",
  },
  {
    emblem: { src: "/favicon.svg" },
    tags: ["Next.js", "TypeScript", "Claude API", "TailwindCSS", "Vercel", "Prompt Engineering"],
    groups: ["featured", "ai", "apps"],
    shot: "/projects/shots/portfolio.webp",
    live: "https://paulmeteng.space",
    code: "https://github.com/Arthuro1/portfolio",
  },
  {
    emblem: { src: "/projects/qetoret.svg" },
    tags: ["React", "Claude API", "Supabase", "Android", "PWA", "Tailwind CSS", "Zustand", "Vite", "Vitest", "Playwright", "Vercel"],
    groups: ["featured", "ai", "apps"],
    shot: "/projects/shots/qetoret.webp",
    live: "https://qetoret.com",
  },
  {
    emblem: { src: "/projects/my-goals.svg" },
    tags: ["React 19", "TypeScript", "Supabase", "IndexedDB", "PWA", "Vite", "Vitest", "GitHub Actions", "Vercel"],
    groups: ["featured", "apps"],
    shot: "/projects/shots/my-goals.webp",
    live: "https://my-goals-pwa.vercel.app",
  },
  {
    emblem: { src: "/projects/ghomala.svg" },
    tags: ["Claude Code", "Codex", "React", "TypeScript", "Supabase", "Python", "Playwright", "Vite", "PWA", "Web Audio", "i18n"],
    groups: ["featured", "ai", "apps"],
    shot: "/projects/shots/parlons-ghomala.webp",
  },
  {
    emblem: { src: "/projects/wach-auf.png", tile: "bg-[#fffaf0] p-1 ring-1 ring-line" },
    tags: ["HTML", "CSS", "JavaScript", "Python", "Cloudflare Workers", "i18n"],
    groups: ["apps", "work"],
  },
  {
    emblem: { path: GLYPH.cap },
    tags: ["Python", "Flask", "Neo4J", "Angular", "NLP", "Machine Learning", "Knowledge Graph"],
    groups: ["ai", "uni"],
    paper: "https://doi.org/10.1145/3636555.3636881",
  },
  {
    emblem: { path: GLYPH.search },
    tags: ["Python", "React", "Elasticsearch", "NLP", "Chatbot", "NoSQL"],
    groups: ["ai", "uni"],
  },
  {
    emblem: { path: GLYPH.map },
    tags: ["Python", "Flask", "Elasticsearch", "MongoDB", "Machine Learning"],
    groups: ["uni"],
    code: "https://github.com/Arthuro1/Courses_Recommender",
  },
  {
    emblem: { path: GLYPH.chat },
    tags: ["Cognigy", "Botpress", "React", "Redux", "Node.js", "NLP", "Docker", "Kubernetes"],
    groups: ["ai", "work"],
  },
  {
    emblem: { path: GLYPH.book },
    tags: ["React", "Redux", "TypeScript", "Node.js", "Express", "MongoDB"],
    groups: ["apps", "uni"],
    code: "https://github.com/Arthuro1/AWT_Project",
  },
];

export default function Projects() {
  const { t } = useLanguage();
  const p = t.projects;
  const [filter, setFilter] = useState<Filter>("featured");
  const [openTags, setOpenTags] = useState<ReadonlySet<number>>(() => new Set());

  const count = (f: Filter) => (f === "all" ? PROJECTS.length : PROJECTS.filter((d) => d.groups.includes(f)).length);
  const shown = p.items
    .map((item, i) => ({ item, i, data: PROJECTS[i] }))
    .filter(({ data }) => filter === "all" || data.groups.includes(filter));

  return (
    <Section id="projects" index={3} hue="teal" kicker={p.kicker} title={p.title} intro={p.subtitle}>
      <Reveal>
        <div className="flex flex-wrap gap-2" role="group" aria-label={p.title}>
          {FILTERS.map((f) => {
            const isOn = f === filter;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={isOn}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-bright ${
                  isOn ? "border-transparent bg-brand-fill text-white shadow-card" : "border-line bg-surface/80 text-ink shadow-card hover:border-brand/40"
                }`}
              >
                {p.filters[f]}
                <span className={`font-mono text-xs ${isOn ? "text-white/75" : "text-muted"}`}>{count(f)}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <div key={filter} className="mt-8 grid md:grid-cols-2 gap-5">
        {shown.map(({ item, i, data }, pos) => {
          const wide = pos === 0 && shown.length % 2 === 1;
          const tagsOpen = openTags.has(i);
          const tags = tagsOpen ? data.tags : data.tags.slice(0, VISIBLE_TAGS);
          const hidden = data.tags.length - VISIBLE_TAGS;
          return (
            <article
              key={item.title}
              className={`panel-in group relative flex flex-col rounded-2xl border border-line bg-surface/90 p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 ${
                wide ? "md:col-span-2" : ""
              }`}
              style={{ animationDelay: `${pos * 60}ms` }}
            >
              {data.shot && (
                <div className={`-mx-6 -mt-6 mb-6 overflow-hidden rounded-t-2xl border-b border-line bg-raised ${wide ? "aspect-[16/6]" : "aspect-[16/10]"}`}>
                  <Image
                    src={data.shot}
                    alt={item.title}
                    width={960}
                    height={600}
                    unoptimized
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              )}
              <div className="flex items-start gap-4">
                <ProjectEmblem emblem={data.emblem} />
                <div className="min-w-0">
                  <p className="font-mono text-xs text-muted">
                    {item.type} · {item.date}
                  </p>
                  <h3 className={`font-display font-bold text-ink mt-1 leading-snug ${wide ? "text-2xl" : "text-xl"}`}>{item.title}</h3>
                </div>
              </div>
              <p className="mt-4 text-ink/90 leading-relaxed">
                <Rich text={item.summary} />
              </p>

              {item.highlights.length > 0 && (
                <ul className={`mt-4 gap-x-8 gap-y-2 text-sm text-ink/75 leading-relaxed ${wide ? "grid md:grid-cols-3" : "grid"}`}>
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

              <div className="mt-auto pt-6 flex flex-wrap items-end justify-between gap-4">
                <ul className="flex flex-wrap gap-1.5" aria-label="Tech">
                  {tags.map((tag) => (
                    <li key={tag}>
                      <TechChip name={tag} className="border-line bg-bg/50" />
                    </li>
                  ))}
                  {hidden > 0 && !tagsOpen && (
                    <li>
                      <button
                        type="button"
                        onClick={() => setOpenTags((prev) => new Set(prev).add(i))}
                        aria-label={p.showTags}
                        title={p.showTags}
                        className="rounded-full border border-dashed border-brand/50 px-2.5 py-1 text-xs font-bold text-brand hover:border-solid"
                      >
                        +{hidden}
                      </button>
                    </li>
                  )}
                </ul>

                <div className="flex gap-2">
                  {data.live && <LinkPill href={data.live} label={p.links.live} icon={<ExternalIcon className="w-4 h-4" />} primary />}
                  {data.code && <LinkPill href={data.code} label={p.links.code} icon={<GitHubIcon className="w-4 h-4" />} />}
                  {data.paper && <LinkPill href={data.paper} label={p.links.paper} icon={<PaperIcon className="w-4 h-4" />} primary />}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

function ProjectEmblem({ emblem }: { emblem: Emblem }) {
  if ("src" in emblem) return <LogoTile src={emblem.src} tile={emblem.tile} />;
  return (
    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-raised text-brand ${TILE_MOTION}`} aria-hidden="true">
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d={emblem.path} />
      </svg>
    </span>
  );
}

function LinkPill({ href, label, icon, primary = false }: { href: string; label: string; icon: React.ReactNode; primary?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bright ${
        primary ? "bg-brand-fill text-white" : "border border-line bg-surface text-ink hover:border-brand/50"
      }`}
    >
      {icon}
      {label}
    </a>
  );
}
