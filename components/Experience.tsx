"use client";

import { useLanguage } from "@/context/LanguageContext";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import TechChip from "@/components/TechChip";
import LogoTile, { TILE_MOTION } from "@/components/LogoTile";
import { ExternalIcon, PaperIcon } from "@/components/icons";

// Logo and tech stack per job, in the order of t.experience.items.
const JOBS: { logo: string; tile?: string; stack: string[] }[] = [
  {
    logo: "/logos/vision-consulting.png",
    stack: ["Java", "KDialog", "JUnit", "UIBot", "Maven", "Jenkins", "GitLab", "Apache CXF", "SoapUI", "Postman", "Jira"],
  },
  {
    logo: "/logos/cosinex.png",
    stack: ["Java", "Spring", "JPA", "Wicket", "Oracle", "MySQL", "Liquibase", "JBoss", "GitLab", "Docker", "JUnit"],
  },
  {
    logo: "/logos/adesso.svg",
    tile: "bg-white p-1.5 ring-1 ring-line",
    stack: ["Spring Boot", "Hibernate", "Angular", "TypeScript", "PostgreSQL", "Flyway", "JUnit", "Mockito", "Jasmine", "Maven", "Jenkins", "Azure"],
  },
  {
    logo: "/logos/publicplan.png",
    stack: ["Cognigy", "Botpress", "React", "Redux", "Node.js", "Express", "Elasticsearch", "Swagger", "Java", "JavaFX", "Gradle", "Docker", "Kubernetes"],
  },
];

const TRAINING_LOGO = "/logos/turing-college.png";
// The UDE mark is white, so it sits on the university's blue.
const UDE = { logo: "/logos/ude.png", tile: "bg-[#004c93] p-1.5" };
const EDUCATION_PAPERS = ["https://doi.org/10.1145/3636555.3636881", ""];
// In the order of t.experience.certificates. Images are 1200x900 captures of the linked pages.
const CERTIFICATES = [
  {
    link: "https://www.deeplearning.ai/certificates/98a9e277-7ceb-4086-aab4-7bc971e7de3f",
    image: "/certificates/rag.webp",
  },
  {
    link: "https://www.deeplearning.ai/accomplishments/9812139b-c2ff-493e-a8a9-af43d684f750",
    image: "/certificates/knowledge-graphs-rag.webp",
  },
];
const BADGE_GLYPH =
  "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z";

const CARD = "group rounded-2xl border border-line bg-surface/90 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40";

export default function Experience() {
  const { t } = useLanguage();
  const ex = t.experience;

  return (
    <Section id="experience" index={4} hue="brand" kicker={ex.kicker} title={ex.title} intro={ex.intro}>
      <ol className="relative space-y-6 sm:pl-12">
        <span className="absolute left-[15px] top-2 bottom-2 hidden w-0.5 bg-gradient-to-b from-accent-bright via-brand/40 to-line sm:block" aria-hidden="true" />
        {ex.items.map((job, i) => (
          <li key={job.company} className="relative">
            <span className="absolute -left-12 top-7 hidden h-[33px] w-[33px] items-center justify-center sm:flex" aria-hidden="true">
              <span className={`h-4 w-4 rotate-45 border-2 ring-4 ring-bg ${i === 0 ? "border-accent-bright bg-accent-bright" : "border-brand bg-bg"}`} />
            </span>
            <Reveal>
              <article className={`${CARD} p-6`}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <LogoTile src={JOBS[i].logo} tile={JOBS[i].tile} />
                    <div>
                      <h3 className="font-display text-xl font-bold text-ink">{job.role}</h3>
                      <p className="font-bold text-brand">{job.company}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                    <span className="font-mono text-xs font-medium text-ink/70">{job.period}</span>
                    <span className="rounded-full border border-line px-2.5 py-0.5 text-xs font-bold text-ink/70">{job.kind}</span>
                  </div>
                </div>

                <p className="mt-4 text-ink/90 leading-relaxed">{job.summary}</p>
                <ul className="mt-3 space-y-2 text-sm text-ink/75 leading-relaxed">
                  {job.highlights.map((hl) => (
                    <li key={hl} className="flex gap-3">
                      <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rotate-45 bg-brand/50" aria-hidden="true" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 border-t border-line pt-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{ex.stackLabel}</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {JOBS[i].stack.map((tech) => (
                      <li key={tech}>
                        <TechChip name={tech} className="border-line bg-bg/50" />
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>

      <h3 className="mt-20 font-display text-2xl sm:text-3xl font-bold text-ink">{ex.trainingTitle}</h3>
      {ex.training.map((tr) => (
        <Reveal key={tr.program} className="mt-6">
          <article className={`${CARD} p-6 sm:p-8`}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <LogoTile src={TRAINING_LOGO} />
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
              </div>
              <span className="shrink-0 font-mono text-xs font-medium text-ink/70">{tr.period}</span>
            </div>

            <p className="mt-5 text-ink/80">{tr.description}</p>
            <ol className="relative mt-4 grid gap-4 sm:grid-cols-4">
              <span className="absolute left-4 right-4 top-4 hidden h-px bg-line sm:block" aria-hidden="true" />
              {tr.steps.map((step, i) => {
                const last = i === tr.steps.length - 1;
                return (
                  <li key={step} className="relative flex items-center gap-3 sm:flex-col sm:items-start">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-mono text-xs font-bold ${
                        last ? "border-accent-bright bg-accent-bright text-[rgb(9_13_31)]" : "border-brand bg-surface text-brand"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm font-bold text-ink">{step}</span>
                  </li>
                );
              })}
            </ol>
          </article>
        </Reveal>
      ))}

      <h4 className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{ex.certificatesTitle}</h4>
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        {ex.certificates.map((cert, i) => (
          <Reveal key={cert.name} delay={i * 100} className="h-full">
            <article className={`${CARD} flex h-full flex-col p-6`}>
              {/* The button below carries the link for keyboard and screen-reader users. */}
              <a href={CERTIFICATES[i].link} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true" className="mb-5 block overflow-hidden rounded-xl border border-line bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element -- static webp, already sized */}
                <img
                  src={CERTIFICATES[i].image}
                  alt=""
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </a>
              <div className="flex items-start gap-4">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-raised text-brand ${TILE_MOTION}`} aria-hidden="true">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d={BADGE_GLYPH} />
                  </svg>
                </span>
                <div>
                  <span className="font-mono text-xs text-muted">{cert.date}</span>
                  <h5 className="mt-1 font-display text-lg font-bold leading-snug text-ink">{cert.name}</h5>
                  <p className="font-bold text-brand">{cert.issuer}</p>
                </div>
              </div>
              <div className="mt-auto pt-5">
                <a
                  href={CERTIFICATES[i].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand/50 bg-brand/[0.07] px-3 py-1.5 text-sm font-bold text-brand transition-all hover:-translate-y-0.5 hover:border-brand hover:bg-brand/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bright"
                >
                  <ExternalIcon className="w-4 h-4" />
                  {ex.certificateLink}
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <h3 className="mt-20 font-display text-2xl sm:text-3xl font-bold text-ink">{ex.educationTitle}</h3>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {ex.education.map((edu, i) => (
          <Reveal key={edu.degree} delay={i * 100} className="h-full">
            <article className={`${CARD} flex h-full flex-col p-6`}>
              <div className="flex items-start gap-4">
                <LogoTile src={UDE.logo} tile={UDE.tile} />
                <div>
                  <span className="font-mono text-xs text-muted">{edu.period}</span>
                  <h4 className="mt-1 font-display text-lg font-bold text-ink">{edu.degree}</h4>
                  <p className="font-bold text-brand">{edu.institution}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink/75">{edu.thesis}</p>
              {EDUCATION_PAPERS[i] && (
                <a
                  href={EDUCATION_PAPERS[i]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-fill px-3 py-1.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
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
