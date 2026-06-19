const projects = [
  {
    title: "Knowledge Graph RAG System",
    date: "2026 – present",
    type: "Personal Project",
    description:
      "Hybrid RAG system combining Neo4J knowledge graph traversal with semantic vector search (ChromaDB). Automatic entity and relation extraction from raw text via LLM. REST API with FastAPI, streaming support, and an integrated web UI.",
    tags: ["Python", "LangChain", "Neo4J", "ChromaDB", "FastAPI", "Claude API", "Docker", "spaCy"],
    github: "https://github.com/Arthuro1",
    highlight: true,
  },
  {
    title: "Learning Resource Recommendation (Master's Thesis)",
    date: "2022 – 2023",
    type: "University · Duisburg-Essen",
    description:
      "Personalised recommendation system for a MOOC platform based on Knowledge Graphs and Graph Neural Networks. Models the learner's knowledge state to recommend Wikipedia articles and YouTube videos for difficult concepts.",
    tags: ["Python", "Flask", "Neo4J", "Angular", "NLP", "Machine Learning", "Knowledge Graph"],
    highlight: true,
  },
  {
    title: "VACOS — Dialog-based Object Search",
    date: "2021",
    type: "University · Duisburg-Essen",
    description:
      "Extended a text-based search engine with natural-language, dialog-oriented interaction. NLP processing of negations and modifiers using Elasticsearch as the backend.",
    tags: ["Python", "React", "Elasticsearch", "NLP", "Chatbot", "NoSQL"],
  },
  {
    title: "Course Recommendation System",
    date: "2020 – 2021",
    type: "University · Duisburg-Essen",
    description:
      "Web application recommending lectures to students based on their interests and study programme. Built with Python/Flask, Elasticsearch, and machine learning models.",
    tags: ["Python", "Flask", "Elasticsearch", "Machine Learning", "MongoDB"],
  },
  {
    title: "GovBot — Conversational AI for Public Sector",
    date: "2018 – 2021",
    type: "Publicplan GmbH",
    description:
      "Designed and implemented customised chatbots for municipalities across Germany using Cognigy AI and Botpress. Responsible for conversation design, NLU modelling, and ongoing optimisation.",
    tags: ["Cognigy", "Botpress", "React", "Redux", "Node.js", "NLP", "Docker", "Kubernetes"],
  },
  {
    title: "Bookiz — Book Search App",
    date: "2019",
    type: "University Project",
    description:
      "Web app helping students find recommended books for their courses, with ratings and discussion. Built with the MERN stack.",
    tags: ["React", "Redux", "TypeScript", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/Arthuro1",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Projects</h2>
        <p className="text-gray-500 mb-12">AI projects, university research, and professional work.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div
              key={p.title}
              className={`rounded-xl border p-6 flex flex-col gap-4 transition-shadow hover:shadow-md ${
                p.highlight ? "border-blue-200 bg-blue-50/40" : "border-gray-200 bg-white"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 text-base leading-snug">{p.title}</h3>
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-gray-400 hover:text-gray-700 transition-colors"
                      aria-label="GitHub"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </a>
                  )}
                </div>
                <p className="text-xs text-gray-400">{p.type} · {p.date}</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-white border border-gray-200 text-gray-600 rounded-full"
                  >
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
