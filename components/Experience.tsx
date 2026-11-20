"use client";

import { useLanguage } from "@/context/LanguageContext";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { PaperIcon } from "@/components/icons";

// Tech stack per job, in the order of t.experience.items.
const STACKS = [
  ["Java", "KDialog", "JUnit", "UIBot", "Maven", "Jenkins", "GitLab", "Apache CXF", "SoapUI", "Postman", "Jira"],
  ["Java", "Spring", "JPA", "Wicket", "Oracle", "MySQL", "Liquibase", "JBoss", "GitLab", "Docker", "JUnit"],
  ["Spring Boot", "Hibernate", "Angular", "TypeScript", "PostgreSQL", "Flyway", "JUnit", "Mockito", "Jasmine", "Maven", "Jenkins", "Azure"],
  ["Cognigy", "Botpress", "React", "Redux", "Node.js", "Express", "Elasticsearch", "Swagger", "Java", "JavaFX", "Gradle", "Docker", "Kubernetes"],
];

const EDUCATION_PAPERS = ["https://doi.org/10.1145/3636555.3636881", ""];

export default function Experience() {
  const { t } = useLanguage();
  const ex = t.experience;

  return (
    <Section id="experience" index={4} kicker={ex.kicker} title={ex.title} intro={ex.intro} next={{ href: "#contact", label: t.nav.contact }}>
      <ol className="relative space-y-6 sm:pl-12">
        <span className="absolute left-[15px] top-2 bottom-2 hidden w-px bg-gradient-to-b from-accent-bright via-brand/60 to-line sm:block" aria-hidden="true" />
        {ex.items.map((job, i) => (
          <li key={job.company} className="relative">
            <span
              className="absolute -left-12 top-7 hidden h-[31px] w-[31px] items-center justify-center sm:flex"
              aria-hidden="true"
            >
              <span className={`h-3.5 w-3.5 rotate-45 border-2 ${i === 0 ? "border-accent-bright bg-accent-bright" : "border-brand bg-bg"}`} />
            </span>
            <Reveal>
              <article className="rounded-2xl border border-line bg-surface/80 p-6 transition-colors hover:border-brand/60">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink">{job.role}</h3>
                    <p className="font-bold text-brand">{job.company}</p>
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                    <span className="font-mono text-xs text-muted">{job.period}</span>
                    <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">{job.kind}</span>
                  </div>
                </div>

                <p className="mt-4 text-ink/90 leading-relaxed">{job.summary}</p>
                <ul className="mt-3 space-y-2 text-sm text-muted leading-relaxed">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rotate-45 bg-accent-bright" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 border-t border-line pt-4 font-mono text-xs leading-relaxed text-muted">
                  <span className="text-accent">{ex.stackLabel}</span> — {STACKS[i].join(" · ")}
                </p>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>

      <h3 className="mt-20 font-display text-2xl sm:text-3xl font-bold text-ink">{ex.trainingTitle}</h3>
      {ex.training.map((tr) => (
        <Reveal key={tr.program} className="mt-6">
          <article className="relative overflow-hidden rounded-2xl border border-accent-bright/50 bg-surface/80 p-6 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="flex flex-wrap items-center gap-3">
                  <span className="font-display text-xl font-bold text-ink">{tr.program}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-bright/15 px-2.5 py-0.5 text-xs font-bold text-accent">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-bright motion-reduce:animate-none" aria-hidden="true" />
                    {tr.status}
                  </span>
                </p>
                <p className="mt-1 font-bold text-brand">{tr.institution}</p>
              </div>
              <span className="shrink-0 font-mono text-xs text-muted">{tr.period}</span>
            </div>

            <p className="mt-5 text-muted">{tr.description}</p>
            <ol className="relative mt-4 grid gap-4 sm:grid-cols-4">
              <span className="absolute left-4 right-4 top-4 hidden h-px bg-line sm:block" aria-hidden="true" />
              {tr.steps.map((step, i) => (
                <li key={step} className="relative flex items-center gap-3 sm:flex-col sm:items-start">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-mono text-xs font-bold ${
                      i === tr.steps.length - 1 ? "border-accent-bright bg-accent-bright text-[rgb(9_13_31)]" : "border-brand bg-surface text-brand"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm font-bold text-ink">{step}</span>
                </li>
              ))}
            </ol>
          </article>
        </Reveal>
      ))}

      <h3 className="mt-20 font-display text-2xl sm:text-3xl font-bold text-ink">{ex.educationTitle}</h3>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {ex.education.map((edu, i) => (
          <Reveal key={edu.degree} delay={i * 100} className="h-full">
            <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/80 p-6">
              <span className="font-mono text-xs text-muted">{edu.period}</span>
              <h4 className="mt-2 font-display text-lg font-bold text-ink">{edu.degree}</h4>
              <p className="font-bold text-brand">{edu.institution}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{edu.thesis}</p>
              {EDUCATION_PAPERS[i] && (
                <a
                  href={EDUCATION_PAPERS[i]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm font-bold text-ink transition-colors hover:border-accent-bright hover:text-accent"
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
