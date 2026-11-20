"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { ExternalIcon, GitHubIcon, PaperIcon } from "@/components/icons";

type Filter = "featured" | "ai" | "apps" | "work" | "uni" | "all";
const FILTERS: Filter[] = ["featured", "ai", "apps", "work", "uni", "all"];
const VISIBLE_TAGS = 4;

// Per-project data, in the order of t.projects.items.
const PROJECTS: { tags: string[]; groups: Filter[]; live?: string; code?: string; paper?: string }[] = [
  {
    tags: ["Python", "LangChain", "Neo4J", "ChromaDB", "FastAPI", "LLM-as-Judge", "Evaluation", "Docker"],
    groups: ["featured", "ai"],
    code: "https://github.com/Arthuro1/knowledge-graph-rag",
  },
  {
    tags: ["Next.js", "TypeScript", "Claude API", "Prompt Engineering", "TailwindCSS", "Vercel"],
    groups: ["featured", "ai", "apps"],
    live: "https://paulmeteng.space",
    code: "https://github.com/Arthuro1/portfolio",
  },
  {
    tags: ["React", "Claude API", "Supabase", "Android", "PWA", "Tailwind CSS", "Zustand", "Vite", "Vitest", "Playwright", "Vercel"],
    groups: ["featured", "ai", "apps"],
    live: "https://qetoret.com",
  },
  {
    tags: ["React 19", "TypeScript", "IndexedDB", "Supabase", "PWA", "Vite", "Vitest", "GitHub Actions", "Vercel"],
    groups: ["featured", "apps"],
    live: "https://my-goals-pwa.vercel.app",
  },
  {
    tags: ["Claude Code", "Codex", "React", "TypeScript", "Supabase", "Python", "Playwright", "Vite", "PWA", "Web Audio", "i18n"],
    groups: ["featured", "ai", "apps"],
  },
  {
    tags: ["HTML", "CSS", "JavaScript", "Python", "Cloudflare Workers", "i18n"],
    groups: ["apps", "work"],
  },
  {
    tags: ["Python", "Flask", "Neo4J", "Angular", "NLP", "Machine Learning", "Knowledge Graph"],
    groups: ["ai", "uni"],
    paper: "https://doi.org/10.1145/3636555.3636881",
  },
  {
    tags: ["Python", "React", "Elasticsearch", "NLP", "Chatbot", "NoSQL"],
    groups: ["ai", "uni"],
  },
  {
    tags: ["Python", "Flask", "Elasticsearch", "Machine Learning", "MongoDB"],
    groups: ["uni"],
    code: "https://github.com/Arthuro1/Courses_Recommender",
  },
  {
    tags: ["Cognigy", "Botpress", "React", "Redux", "Node.js", "NLP", "Docker", "Kubernetes"],
    groups: ["ai", "work"],
  },
  {
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
    <Section id="projects" index={3} kicker={p.kicker} title={p.title} intro={p.subtitle} next={{ href: "#experience", label: t.nav.experience }}>
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
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-bright ${
                  isOn ? "border-accent-bright bg-accent-bright text-[rgb(9_13_31)]" : "border-line bg-surface/60 text-ink hover:border-brand/60"
                }`}
              >
                {p.filters[f]}
                <span className={`font-mono text-xs ${isOn ? "opacity-70" : "text-muted"}`}>{count(f)}</span>
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
              className={`panel-in group flex flex-col rounded-2xl border border-line bg-surface/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_18px_40px_-20px_rgb(var(--brand)/0.45)] ${
                wide ? "md:col-span-2" : ""
              }`}
              style={{ animationDelay: `${pos * 60}ms` }}
            >
              <p className="font-mono text-xs text-muted">
                {item.type} · {item.date}
              </p>
              <h3 className={`font-display font-bold text-ink mt-2 leading-snug ${wide ? "text-2xl" : "text-xl"}`}>{item.title}</h3>
              <p className="mt-3 text-ink/90 leading-relaxed">{item.summary}</p>

              {item.highlights.length > 0 && (
                <ul className={`mt-4 gap-x-8 gap-y-2 text-sm text-muted leading-relaxed ${wide ? "grid md:grid-cols-3" : "grid"}`}>
                  {item.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rotate-45 bg-accent-bright" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto pt-6 flex flex-wrap items-end justify-between gap-4">
                <ul className="flex flex-wrap gap-1.5" aria-label="Tech">
                  {tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">
                      {tag}
                    </li>
                  ))}
                  {hidden > 0 && !tagsOpen && (
                    <li>
                      <button
                        type="button"
                        onClick={() => setOpenTags((prev) => new Set(prev).add(i))}
                        aria-label={p.showTags}
                        title={p.showTags}
                        className="rounded-full border border-dashed border-brand/50 px-2.5 py-0.5 font-mono text-[11px] text-brand hover:border-brand"
                      >
                        +{hidden}
                      </button>
                    </li>
                  )}
                </ul>

                <div className="flex gap-2">
                  {data.live && <LinkPill href={data.live} label={p.links.live} icon={<ExternalIcon className="w-4 h-4" />} />}
                  {data.code && <LinkPill href={data.code} label={p.links.code} icon={<GitHubIcon className="w-4 h-4" />} />}
                  {data.paper && <LinkPill href={data.paper} label={p.links.paper} icon={<PaperIcon className="w-4 h-4" />} />}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

function LinkPill({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/40 px-3 py-1.5 text-sm font-bold text-ink transition-colors hover:border-accent-bright hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-bright"
    >
      {icon}
      {label}
    </a>
  );
}
