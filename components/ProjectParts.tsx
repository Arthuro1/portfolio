"use client";

import { useId } from "react";
import TechChip from "@/components/TechChip";
import LogoTile, { TILE_MOTION } from "@/components/LogoTile";
import { ExternalIcon, GitHubIcon, PaperIcon } from "@/components/icons";
import { useFindable } from "@/lib/use-findable";
import type { Translations } from "@/lib/translations";

// Shared by the case studies (components/CaseStudy.tsx) and the smaller
// project cards (components/MoreProjects.tsx).

// A project's own logo (from public/), or an outline glyph for projects
// without one. `tile` is a background for logos that need one (see LogoTile).
export type Emblem = { src: string; tile?: string } | { path: string };

export type LinkKind = keyof Translations["projects"]["links"];
// `colors` fills a Live link with the colours of the project's logo.
export type ProjectLink = { kind: LinkKind; href: string; colors?: { bg: string; fg: string } };

const VISIBLE_TAGS = 4;

export function ProjectEmblem({ emblem }: { emblem: Emblem }) {
  if ("src" in emblem) return <LogoTile src={emblem.src} tile={emblem.tile} />;
  return (
    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-raised text-brand ${TILE_MOTION}`} aria-hidden="true">
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d={emblem.path} />
      </svg>
    </span>
  );
}

/**
 * Tech tags: the first four, then a "+N" toggle. The collapsed tags stay in
 * the page (hidden="until-found"), so find-in-page still reaches them. Tags
 * carry their spacing as margins: a collapsed item keeps no gap around it.
 */
export function TagList({ tags, labels }: { tags: string[]; labels: Translations["projects"] }) {
  const { open, setOpen, ref } = useFindable<HTMLUListElement>();
  const id = useId();
  // Hiding a single tag behind a button saves no room.
  const extra = tags.length > VISIBLE_TAGS + 1 ? tags.length - VISIBLE_TAGS : 0;

  return (
    <ul ref={ref} id={id} aria-label={labels.techLabel} className="-mb-1.5 flex flex-wrap items-center">
      {tags.map((tag, i) => (
        <li key={tag} hidden={!open && extra > 0 && i >= VISIBLE_TAGS}>
          <TechChip name={tag} flat className="mb-1.5 mr-1.5 bg-raised/70" />
        </li>
      ))}
      {extra > 0 && (
        <li className="mb-1.5">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls={id}
            className="-my-2.5 inline-flex min-h-10 items-center gap-1 rounded-full px-2.5 text-xs font-bold text-brand transition-colors hover:bg-brand/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            {open ? (
              labels.tagsLess
            ) : (
              <>
                +{extra}
                <span className="sr-only"> {labels.tagsMore}</span>
              </>
            )}
            <svg className={`h-3 w-3 transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </li>
      )}
    </ul>
  );
}

const ICONS: Record<LinkKind, React.ReactNode> = {
  live: <ExternalIcon className="h-4 w-4" />,
  code: <GitHubIcon className="h-4 w-4" />,
  paper: <PaperIcon className="h-4 w-4" />,
  page: <ExternalIcon className="h-4 w-4" />,
  report: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20V13m6 7V8m6 12V4M3 20h18" />
    </svg>
  ),
};

// A Live link is filled in the logo's colours; every other link is outlined
// in the brand colour, unlike the flat tags.
export function LinkRow({ links, labels, className = "" }: { links: ProjectLink[]; labels: Translations["projects"]["links"]; className?: string }) {
  if (links.length === 0) return null;
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {links.map(({ kind, href, colors }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={colors ? { backgroundColor: colors.bg, color: colors.fg } : undefined}
          className={`inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
            colors ? "shadow-card hover:brightness-110" : "border border-brand/50 bg-brand/[0.07] text-brand hover:border-brand hover:bg-brand/15"
          }`}
        >
          {ICONS[kind]}
          {labels[kind]}
        </a>
      ))}
    </div>
  );
}
