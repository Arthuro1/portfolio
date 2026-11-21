"use client";

import { useLanguage } from "@/context/LanguageContext";
import { openChat } from "@/lib/chat-events";
import Rich from "@/components/Rich";
import EmailLink from "@/components/EmailLink";
import { CheckIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, SparkleIcon } from "@/components/icons";

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section className="relative lg:min-h-[100svh] flex items-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <div className="ndop-lattice -left-1/4 top-0 w-[150%] h-full opacity-60" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto w-full grid lg:grid-cols-[1.25fr_1fr] gap-12 items-center">
        <div>
          <p className="rise inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.2em] text-brand" style={{ animationDelay: "0ms" }}>
            <span className="h-1.5 w-1.5 rotate-45 bg-accent-bright" aria-hidden="true" />
            {h.badge}
          </p>
          <h1 className="font-display font-extrabold tracking-tight leading-[0.95] text-6xl sm:text-7xl mt-5">
            Paul Arthur
            <br />
            <span className="text-brand">Meteng</span>
          </h1>

          <p className="font-display text-2xl sm:text-3xl font-semibold leading-snug text-ink mt-8 max-w-xl">{h.headline}</p>

          {/* Below lg this pill stands in for the glance card's availability, location and work-mode entries. */}
          <p className="lg:hidden mt-5 inline-flex items-center gap-2.5 rounded-xl border border-accent-bright/40 bg-accent-bright/10 px-3.5 py-2 text-sm font-bold text-ink">
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-accent-bright motion-reduce:animate-none" aria-hidden="true" />
            {h.availabilityLine}
          </p>

          <p className="text-base sm:text-lg text-muted max-w-xl mt-5 leading-relaxed">
            <Rich text={h.description} />
          </p>

          <ul className="flex flex-wrap gap-2 mt-6" aria-label={h.focusLabel}>
            {h.focus.map((f) => (
              <li key={f} className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-surface/70 px-3 py-1 text-sm font-bold text-ink">
                <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-brand" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          <div className="rise flex flex-wrap gap-3 mt-8" style={{ animationDelay: "120ms" }}>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-fill px-6 py-3 font-bold text-white shadow-[0_10px_30px_-10px_rgb(var(--brand-fill)/0.8)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {h.cta1}
              <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
            <a
              href={h.cvFile}
              download
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-6 py-3 font-bold text-ink transition-colors hover:border-accent-bright hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <DownloadIcon className="w-4 h-4" />
              {h.cv}
            </a>
            <button
              type="button"
              onClick={openChat}
              className="inline-flex items-center gap-2 rounded-full px-4 py-3 font-bold text-muted transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <SparkleIcon className="w-4 h-4" />
              {h.cta2}
            </button>
          </div>

          <div className="rise flex gap-5 mt-8 text-muted" style={{ animationDelay: "200ms" }}>
            <a href="https://github.com/Arthuro1" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors" aria-label="GitHub">
              <GitHubIcon className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/paul-arthur-meteng-kamdem-06b922125" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors" aria-label="LinkedIn">
              <LinkedInIcon className="w-6 h-6" />
            </a>
            <EmailLink className="hover:text-accent transition-colors" label={t.contact.emailLabel}>
              {(copied) => (copied ? <CheckIcon className="w-6 h-6 text-accent" /> : <MailIcon className="w-6 h-6" />)}
            </EmailLink>
          </div>
        </div>

        <Glance />
      </div>
    </section>
  );
}

// The questions a recruiter asks first — availability, location, work mode,
// languages, education — plus three facts that can be checked on this page.
function Glance() {
  const { t } = useLanguage();
  const g = t.hero.glance;
  const rows = [
    { label: g.location, value: g.locationValue, lgOnly: true },
    { label: g.workMode, value: g.workModeValue, lgOnly: true },
    { label: g.languages, value: g.languagesValue },
    { label: g.education, value: g.educationValue },
  ];

  return (
    <aside className="rise relative rounded-2xl border border-line bg-surface/90 p-6 sm:p-8 shadow-card" style={{ animationDelay: "160ms" }} aria-label={g.title}>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{g.title}</p>

      <div className="mt-5 hidden rounded-xl border border-accent-bright/40 bg-accent-bright/10 px-4 py-3 lg:block">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-accent">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent-bright motion-reduce:animate-none" aria-hidden="true" />
          {g.availability}
        </p>
        <p className="mt-1 font-display text-lg font-bold text-ink">{g.availabilityValue}</p>
      </div>

      <dl className="mt-5 grid gap-3">
        {rows.map((r) => (
          <div key={r.label} className={`${r.lgOnly ? "hidden lg:grid" : "grid"} grid-cols-[6rem_1fr] sm:grid-cols-[7.5rem_1fr] gap-3 text-sm`}>
            <dt className="font-bold uppercase tracking-wide text-xs text-muted pt-0.5">{r.label}</dt>
            <dd className="text-ink">{r.value}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-6 grid gap-4 border-t border-line pt-6">
        {g.proof.map((p) => (
          <li key={p.value} className="flex items-baseline gap-4">
            <span className="w-20 shrink-0 whitespace-nowrap font-display text-2xl font-extrabold text-brand">{p.value}</span>
            <span className="text-sm leading-snug text-ink/80">{p.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
