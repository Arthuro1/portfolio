"use client";

import { useLanguage } from "@/context/LanguageContext";

const tags = [
  ["Next.js", "TypeScript", "Claude API", "Prompt Engineering", "TailwindCSS", "Vercel"],
  ["Python", "LangChain", "Neo4J", "ChromaDB", "FastAPI", "Claude API", "Docker", "spaCy"],
  ["Python", "Flask", "Neo4J", "Angular", "NLP", "Machine Learning", "Knowledge Graph"],
  ["Python", "React", "Elasticsearch", "NLP", "Chatbot", "NoSQL"],
  ["Python", "Flask", "Elasticsearch", "Machine Learning", "MongoDB"],
  ["Cognigy", "Botpress", "React", "Redux", "Node.js", "NLP", "Docker", "Kubernetes"],
  ["React", "Redux", "TypeScript", "Node.js", "Express", "MongoDB"],
];

const highlights = [true, true, true, false, false, false, false];
const githubLinks = ["https://github.com/Arthuro1/portfolio", "https://github.com/Arthuro1", "", "", "", "", "https://github.com/Arthuro1"];
const liveLinks = ["https://portfolio-blush-rho-65.vercel.app/", "", "", "", "", "", ""];

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">{t.projects.title}</h2>
        <p className="text-gray-500 mb-12">{t.projects.subtitle}</p>
        <div className="grid md:grid-cols-2 gap-6">
          {t.projects.items.map((p, i) => (
            <div
              key={i}
              className={`rounded-xl border p-6 flex flex-col gap-4 transition-shadow hover:shadow-md ${
                highlights[i] ? "border-blue-200 bg-blue-50/40" : "border-gray-200 bg-white"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 text-base leading-snug">{p.title}</h3>
                  <div className="flex gap-2">
                  {liveLinks[i] && (
                    <a href={liveLinks[i]} target="_blank" rel="noopener noreferrer" className="shrink-0 text-gray-400 hover:text-blue-700 transition-colors" aria-label="Live">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  {githubLinks[i] && (
                    <a href={githubLinks[i]} target="_blank" rel="noopener noreferrer" className="shrink-0 text-gray-400 hover:text-gray-700 transition-colors" aria-label="GitHub">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </a>
                  )}
                  </div>
                </div>
                <p className="text-xs text-gray-400">{p.type} · {p.date}</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                {tags[i].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-xs bg-white border border-gray-200 text-gray-600 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
