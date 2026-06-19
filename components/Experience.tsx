const experiences = [
  {
    role: "IT Consultant",
    company: "Vision Consulting GmbH",
    period: "Jan 2024 – present",
    description:
      "Migration of the StundE project from ISA-Dialog to Java (KDialog). UI development, rebuilding frontend logic, and implementing tests with JUnit.",
    tags: ["Java", "KDialog", "JUnit", "Jenkins", "Maven", "Jira"],
  },
  {
    role: "Java Developer",
    company: "Cosinex GmbH",
    period: "May 2023 – Nov 2023",
    description:
      "Maintenance and development of the procurement marketplace platform (VMP) with the latest EU reforms. Spring backend, Wicket frontend, Oracle/MySQL databases.",
    tags: ["Java", "Spring", "Wicket", "Oracle", "MySQL", "Liquibase", "Docker"],
  },
  {
    role: "Web Developer",
    company: "Adesso SE",
    period: "Apr 2021 – Mar 2023",
    description:
      "Developed the Fedorov platform for online self-diagnosis of eye diseases. Spring Boot backend, Angular frontend, PostgreSQL, deployment on Azure.",
    tags: ["Spring Boot", "Angular", "TypeScript", "PostgreSQL", "Azure", "Jenkins"],
  },
  {
    role: "Web Developer — Conversational AI",
    company: "Publicplan GmbH",
    period: "Dec 2018 – Feb 2021",
    description:
      "Designed, implemented, and deployed customised conversational AI solutions (chatbots) for municipalities across Germany. Responsible for requirements analysis, conversation design, and NLU logic. Continuous optimisation of chatbot dialogs and coordination of change requests.",
    tags: ["Cognigy", "Botpress", "React", "Redux", "Node.js", "NLP", "Docker", "Kubernetes", "Elasticsearch"],
  },
];

const education = [
  {
    degree: "M.Sc. Applied Computer Science",
    institution: "University of Duisburg-Essen",
    period: "2019 – 2023",
  },
  {
    degree: "B.Sc. Computer Science",
    institution: "University of Duisburg-Essen",
    period: "2014 – 2018",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Experience</h2>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200 hidden sm:block" />
          <div className="space-y-10">
            {experiences.map((exp) => (
              <div key={exp.role + exp.company} className="sm:pl-12 relative">
                <div className="hidden sm:block absolute left-0 top-1.5 w-8 h-8 rounded-full bg-white border-2 border-blue-700 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-700" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-sm text-blue-700 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-400 shrink-0">{exp.period}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{exp.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
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

        <h2 className="text-3xl font-bold text-gray-900 mt-20 mb-10">Education</h2>
        <div className="space-y-6">
          {education.map((edu) => (
            <div key={edu.degree} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-gray-200 pb-6">
              <div>
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-sm text-gray-500">{edu.institution}</p>
              </div>
              <span className="text-sm text-gray-400 shrink-0">{edu.period}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
