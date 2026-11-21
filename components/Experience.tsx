"use client";

import { useId } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import TechChip from "@/components/TechChip";
import LogoTile, { TILE_MOTION } from "@/components/LogoTile";
import { ExternalIcon } from "@/components/icons";
import { useFindable } from "@/lib/use-findable";

// Logo (or an outline glyph where there is no company) and tech stack per
// entry, in the order of t.experience.items.
type Job = { stack: string[] } & ({ logo: string; tile?: string } | { glyph: string });
const SPARKLES =
  "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z";
const JOBS: Job[] = [
  {
    glyph: SPARKLES,
    stack: ["Python", "LangChain", "Neo4J", "ChromaDB", "FastAPI", "Claude API"],
  },
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
const VISIBLE_STACK = 5;

const TRAINING_LOGO = "/logos/turing-college.png";
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

const CARD = "group rounded-2xl border border-line bg-surface/90 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40";

export default function Experience() {
  const { t } = useLanguage();
  const ex = t.experience;

  return (
    <Section id="experience" index={2} hue="brand" kicker={ex.kicker} title={ex.title} intro={ex.intro}>
      <ol className="relative space-y-6 sm:pl-12">
        <span className="absolute left-[15px] top-2 bottom-2 hidden w-0.5 bg-gradient-to-b from-accent-bright via-brand/40 to-line sm:block" aria-hidden="true" />
        {ex.items.map((job, i) => (
          <li key={job.company} className="relative">
            <span className="absolute -left-12 top-7 hidden h-[33px] w-[33px] items-center justify-center sm:flex" aria-hidden="true">
              <span className={`h-4 w-4 rotate-45 border-2 ring-4 ring-bg ${i === 0 ? "border-accent-bright bg-accent-bright" : "border-brand bg-bg"}`} />
            </span>
            <Reveal>
              <article className={`${CARD} p-5 sm:p-6`}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <JobMark job={JOBS[i]} />
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

                <div className="mt-4 border-line sm:mt-5 sm:border-t sm:pt-4">
                  <p className="sr-only font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:not-sr-only">{ex.stackLabel}</p>
                  <Stack stack={JOBS[i].stack} />
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>

      <h3 className="mt-12 sm:mt-20 font-display text-2xl sm:text-3xl font-bold text-ink">{ex.trainingTitle}</h3>
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
            <ol className="relative mt-4 grid gap-2 sm:grid-cols-4 sm:gap-4">
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
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {ex.certificates.map((cert, i) => (
          <Reveal key={cert.name} delay={i * 100} className="h-full">
            <article className={`${CARD} flex h-full items-center gap-4 p-4`}>
              {/* The link below carries the certificate for keyboard and screen-reader users. */}
              <a
                href={CERTIFICATES[i].link}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden="true"
                className="block w-[88px] shrink-0 overflow-hidden rounded-lg border border-line bg-white"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- static webp, already sized */}
                <img
                  src={CERTIFICATES[i].image}
                  alt=""
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              </a>
              <div className="min-w-0">
                <h5 className="font-display font-bold leading-snug text-ink">{cert.name}</h5>
                <p className="mt-0.5 text-sm">
                  <span className="font-bold text-brand">{cert.issuer}</span>
                  <span className="font-mono text-xs text-muted"> · {cert.date}</span>
                </p>
                <a
                  href={CERTIFICATES[i].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="-ml-1 mt-1 inline-flex min-h-10 items-center gap-1.5 rounded-md px-1 text-sm font-bold text-brand underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <ExternalIcon className="w-4 h-4" />
                  {ex.certificateLink}
                  <span className="sr-only">: {cert.name}</span>
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function JobMark({ job }: { job: Job }) {
  if ("logo" in job) return <LogoTile src={job.logo} tile={job.tile} />;
  return (
    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-raised text-brand ${TILE_MOTION}`} aria-hidden="true">
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d={job.glyph} />
      </svg>
    </span>
  );
}

// The first few technologies, then a "+N" toggle for the rest. Chips carry
// their own margins instead of a flex gap so collapsed items take no space.
function Stack({ stack }: { stack: string[] }) {
  const { t } = useLanguage();
  const ex = t.experience;
  const { open, setOpen, ref } = useFindable<HTMLUListElement>();
  const id = useId();
  // Hiding a single chip behind a button saves no room.
  const extra = stack.length > VISIBLE_STACK + 1 ? stack.length - VISIBLE_STACK : 0;

  return (
    <ul ref={ref} id={id} className="-mb-1.5 mt-2 flex flex-wrap items-center">
      {stack.map((tech, i) => (
        <li key={tech} hidden={!open && extra > 0 && i >= VISIBLE_STACK}>
          <TechChip name={tech} className="mb-1.5 mr-1.5 border-line bg-bg/50" />
        </li>
      ))}
      {extra > 0 && (
        <li className="mb-1.5">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls={id}
            className="-my-2.5 inline-flex min-h-10 items-center rounded-full px-2.5 text-xs font-bold text-brand transition-colors hover:bg-brand/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            {open ? (
              ex.stackLess
            ) : (
              <>
                +{extra}
                <span className="sr-only"> {ex.stackMore}</span>
              </>
            )}
          </button>
        </li>
      )}
    </ul>
  );
}
