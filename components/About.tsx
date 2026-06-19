export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">About me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <p>
              I&apos;m a software engineer based in Germany with a Master&apos;s in Applied
              Computer Science from the University of Duisburg-Essen. Over 6 years,
              I&apos;ve built web applications, conversational AI bots, and recommendation
              systems — and I&apos;m now focusing entirely on AI Engineering.
            </p>
            <p>
              My hands-on experience with LLMs, RAG architectures, knowledge graphs
              (Neo4J), and AI platforms like Cognigy and Botpress gives me a practical
              edge: I know how to design, build, and ship AI systems end-to-end.
            </p>
            <p>
              I&apos;m curious, collaborative, and driven by the challenge of making AI
              useful for real people.
            </p>
          </div>
          <div className="space-y-4">
            <InfoRow label="Location" value="Germany" />
            <InfoRow label="Education" value="M.Sc. Applied Computer Science — Uni Duisburg-Essen" />
            <InfoRow label="Languages" value="French (native) · German (C2) · English (C2)" />
            <InfoRow label="Interests" value="AI · NLP · Knowledge Graphs · Recommendation Systems · Chatbots" />
            <InfoRow label="GitHub" value="github.com/Arthuro1" href="https://github.com/Arthuro1" />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="text-sm font-semibold text-gray-400 w-28 shrink-0 pt-0.5">{label}</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-700 hover:underline"
        >
          {value}
        </a>
      ) : (
        <span className="text-sm text-gray-700">{value}</span>
      )}
    </div>
  );
}
