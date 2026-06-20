"use client";

import { useLanguage } from "@/context/LanguageContext";

const expTags = [
  ["Java", "KDialog", "JUnit", "Jenkins", "Maven", "Jira"],
  ["Java", "Spring", "Wicket", "Oracle", "MySQL", "Liquibase", "Docker"],
  ["Spring Boot", "Angular", "TypeScript", "PostgreSQL", "Azure", "Jenkins"],
  ["Cognigy", "Botpress", "React", "Redux", "Node.js", "NLP", "Docker", "Kubernetes", "Elasticsearch"],
];

export default function Experience() {
  const { t } = useLanguage();
  const ex = t.experience;

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-12">{ex.title}</h2>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block" />
          <div className="space-y-10">
            {ex.items.map((exp, i) => (
              <div key={i} className="sm:pl-12 relative">
                <div className="hidden sm:flex absolute left-0 top-1.5 w-8 h-8 rounded-full bg-white dark:bg-gray-900 border-2 border-blue-700 dark:border-blue-500 items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-700 dark:bg-blue-500" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{exp.role}</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-400 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-400 dark:text-gray-500 shrink-0">{exp.period}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">{exp.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {expTags[i].map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-20 mb-10">{ex.educationTitle}</h2>
        <div className="space-y-6">
          {ex.education.map((edu, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-gray-200 dark:border-gray-700 pb-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{edu.degree}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{edu.institution}</p>
              </div>
              <span className="text-sm text-gray-400 dark:text-gray-500 shrink-0">{edu.period}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
