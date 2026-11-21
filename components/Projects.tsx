"use client";

import { useLanguage } from "@/context/LanguageContext";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import CaseStudy, { type CaseStudyData } from "@/components/CaseStudy";

// Per-project data, in the order of t.projects.featured.
// `shots` are 960x600 screenshots from public/projects/shots, cover first;
// their captions are the item's `shots` in lib/translations.ts (checked by
// tests/project-shots.test.ts). The `id`s are anchors the chat links to.
const FEATURED: CaseStudyData[] = [
  {
    id: "project-knowledge-graph-rag",
    emblem: { src: "/projects/knowledge-graph-rag.svg" },
    tags: ["Python", "LangChain", "Neo4J", "ChromaDB", "FastAPI", "LLM-as-Judge", "Evaluation", "Docker"],
    shots: [
      "/projects/shots/knowledge-graph-rag/02-graph.webp",
      "/projects/shots/knowledge-graph-rag/01-chat-ui.webp",
      "/projects/shots/knowledge-graph-rag/03-api.webp",
    ],
    links: [{ kind: "code", href: "https://github.com/Arthuro1/knowledge-graph-rag" }],
    diagram: 1,
  },
  {
    id: "project-qetoret",
    emblem: { src: "/projects/qetoret.svg" },
    tags: ["React", "Claude API", "Supabase", "Android", "PWA", "Tailwind CSS", "Zustand", "Vite", "Vitest", "Playwright", "Vercel"],
    shots: [
      "/projects/shots/qetoret/01-home.webp",
      "/projects/shots/qetoret/02-prayer-circles.webp",
      "/projects/shots/qetoret/03-prayer-rhythm.webp",
      "/projects/shots/qetoret/04-answered-prayer.webp",
      "/projects/shots/qetoret/05-ai-send-check.webp",
    ],
    links: [
      { kind: "live", href: "https://qetoret.com", colors: { bg: "#4e3d80", fg: "#ffffff" } },
      { kind: "report", href: "https://pagespeed.web.dev/analysis/https-qetoret-com/o2wnrqtvz0?form_factor=mobile" },
    ],
  },
  {
    id: "project-coursemapper",
    emblem: { src: "/projects/coursemapper.svg", tile: "bg-white p-1 ring-1 ring-line" },
    tags: ["Python", "Flask", "Neo4J", "Angular", "NLP", "Machine Learning", "Knowledge Graph"],
    shots: [
      "/projects/shots/coursemapper/02-recommended-videos.webp",
      "/projects/shots/coursemapper/01-wikipedia-articles.webp",
      "/projects/shots/coursemapper/03-feedback.webp",
    ],
    links: [
      { kind: "paper", href: "https://doi.org/10.1145/3636555.3636881" },
      { kind: "page", href: "https://www.uni-due.de/soco/research/projects/coursemapper.php" },
    ],
  },
];

export default function Projects() {
  const { t } = useLanguage();
  const p = t.projects;

  return (
    <Section id="projects" index={1} hue="teal" kicker={p.kicker} title={p.title} intro={p.subtitle}>
      <div className="space-y-8">
        {p.featured.map((item, i) => (
          <Reveal key={FEATURED[i].id}>
            <CaseStudy item={item} data={FEATURED[i]} labels={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
