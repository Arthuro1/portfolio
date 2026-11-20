"use client";

import { useLanguage } from "@/context/LanguageContext";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { openChat } from "@/lib/chat-events";
import { GitHubIcon, LinkedInIcon, MailIcon, SparkleIcon } from "@/components/icons";

const EMAIL = "arthur.meteng@yahoo.com";

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;

  return (
    <Section id="contact" index={5} kicker={c.kicker} title={c.title}>
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/80 px-6 py-12 sm:px-12 text-center">
          <div className="ndop-lattice opacity-70" aria-hidden="true" />
          <div className="relative">
            <p className="mx-auto max-w-xl text-xl leading-relaxed text-ink">{c.subtitle}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 rounded-full bg-brand-fill px-6 py-3 font-bold text-white shadow-[0_10px_30px_-10px_rgb(var(--brand-fill)/0.8)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bright"
              >
                <MailIcon className="w-4 h-4" />
                {c.email}
              </a>
              <button
                type="button"
                onClick={openChat}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/40 px-6 py-3 font-bold text-ink transition-colors hover:border-accent-bright hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bright"
              >
                <SparkleIcon className="w-4 h-4" />
                {c.ask}
              </button>
            </div>

            <div className="mt-12 grid gap-4 text-left sm:grid-cols-3">
              <ContactCard icon={<MailIcon className="w-5 h-5" />} label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
              <ContactCard
                icon={<LinkedInIcon className="w-5 h-5" />}
                label="LinkedIn"
                value="paul-arthur-meteng"
                href="https://www.linkedin.com/in/paul-arthur-meteng-kamdem-06b922125/"
              />
              <ContactCard icon={<GitHubIcon className="w-5 h-5" />} label="GitHub" value="github.com/Arthuro1" href="https://github.com/Arthuro1" />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function ContactCard({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  const external = !href.startsWith("mailto");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-start gap-4 rounded-xl border border-line bg-bg/40 p-5 transition-all hover:-translate-y-0.5 hover:border-accent-bright"
    >
      <span className="mt-0.5 text-brand group-hover:text-accent transition-colors">{icon}</span>
      <span className="min-w-0">
        <span className="block font-mono text-xs text-muted">{label}</span>
        <span className="block break-all text-sm font-bold text-ink">{value}</span>
      </span>
    </a>
  );
}
