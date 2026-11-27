"use client";

import { useLanguage } from "@/context/LanguageContext";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import Rich from "@/components/Rich";
import { openChat } from "@/lib/chat-events";
import EmailLink from "@/components/EmailLink";
import { CheckIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, SparkleIcon } from "@/components/icons";

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;

  return (
    <Section id="contact" index={4} hue="accent" kicker={c.kicker} title={c.title}>
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/90 px-6 py-8 sm:px-12 sm:py-12 text-center shadow-card">
          <div className="ndop-lattice opacity-70" aria-hidden="true" />
          <div className="relative">
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-ink sm:text-xl">
              <Rich text={c.subtitle} />
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <EmailLink className="inline-flex items-center gap-2 rounded-full bg-brand-fill px-6 py-3 font-bold text-white shadow-[0_10px_30px_-10px_rgb(var(--brand-fill)/0.8)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                {(copied) => (
                  <>
                    {copied ? <CheckIcon className="w-4 h-4" /> : <MailIcon className="w-4 h-4" />}
                    <span aria-live="polite">{copied ? c.copied : c.email}</span>
                  </>
                )}
              </EmailLink>
              <a
                href={t.hero.cvFile}
                download
                className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/40 px-6 py-3 font-bold text-ink transition-colors hover:border-accent-bright hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <DownloadIcon className="w-4 h-4" />
                {t.hero.cv}
              </a>
              <button
                type="button"
                onClick={openChat}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/40 px-6 py-3 font-bold text-ink transition-colors hover:border-accent-bright hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <SparkleIcon className="w-4 h-4" />
                {c.ask}
              </button>
            </div>

            <div className="mt-8 grid gap-4 text-left sm:mt-12 sm:grid-cols-3">
              <EmailLink className={`${CARD} text-left`}>
                {(copied, address) => (
                  <CardBody icon={copied ? <CheckIcon className="w-5 h-5" /> : <MailIcon className="w-5 h-5" />} label={copied ? c.copied : c.emailLabel} value={address ?? c.showEmail} />
                )}
              </EmailLink>
              <ContactCard
                icon={<LinkedInIcon className="w-5 h-5" />}
                label="LinkedIn"
                value="paul-arthur-meteng-kamdem"
                href="https://www.linkedin.com/in/paul-arthur-meteng-kamdem-06b922125/"
              />
              <ContactCard icon={<GitHubIcon className="w-5 h-5" />} label="GitHub" value="github.com/Arthuro1" href="https://github.com/Arthuro1" />
            </div>

            <div className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-ink/80 sm:mt-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{c.outside}</p>
              <p className="mt-2">{c.interests}</p>
              <p className="mt-1">
                <Rich text={c.volunteering} />
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

const CARD = "group flex items-start gap-4 rounded-xl border border-line bg-surface p-4 shadow-card sm:p-5 transition-all hover:-translate-y-0.5 hover:border-brand/40";

function ContactCard({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={CARD}>
      <CardBody icon={icon} label={label} value={value} />
    </a>
  );
}

function CardBody({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">{icon}</span>
      <span className="min-w-0">
        <span className="block font-mono text-xs text-muted" aria-live="polite">
          {label}
        </span>
        <span className="block break-all text-sm font-bold text-ink">{value}</span>
      </span>
    </>
  );
}
