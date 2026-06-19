const skillGroups = [
  {
    category: "AI & LLM",
    skills: ["LangChain", "RAG Systems", "Neo4J / Knowledge Graphs", "Claude API", "Prompt Engineering", "ChromaDB", "spaCy", "NLP / NLU"],
  },
  {
    category: "Conversational AI",
    skills: ["Cognigy AI", "Botpress", "NLU Models", "Conversation Design", "Chatbot Lifecycle", "Elasticsearch"],
  },
  {
    category: "Backend",
    skills: ["Python", "FastAPI", "Java / Spring Boot", "Node.js / Express", "REST APIs", "Flask"],
  },
  {
    category: "Frontend",
    skills: ["React / Redux", "Angular", "TypeScript", "JavaScript", "HTML / CSS", "TailwindCSS"],
  },
  {
    category: "DevOps & Tools",
    skills: ["Docker", "Kubernetes", "Azure", "Jenkins", "Git", "PostgreSQL", "MongoDB", "MySQL", "Oracle"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Skills</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-blue-700 mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm bg-white border border-gray-200 text-gray-700 rounded-full shadow-sm"
                  >
                    {skill}
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
