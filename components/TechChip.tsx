import { logoFor, themedColors } from "@/lib/tech";

const SIZES = {
  core: { chip: "gap-2 px-4 py-2 text-base font-bold text-ink", logo: "h-5 w-5", mono: "h-5 min-w-5 text-[9px]" },
  more: { chip: "gap-1.5 px-3 py-1 text-sm text-ink/85", logo: "h-4 w-4", mono: "h-4 min-w-4 text-[8px]" },
  tag: { chip: "gap-1.5 px-2.5 py-1 text-xs text-ink/80", logo: "h-3.5 w-3.5", mono: "h-3.5 min-w-3.5 text-[7px]" },
} as const;

export type ChipSize = keyof typeof SIZES;

/** Brand logo (or monogram) for a technology label; nothing for concepts. */
export function TechLogo({ name, size = "tag" }: { name: string; size?: ChipSize }) {
  const logo = logoFor(name);
  if (!logo) return null;
  const c = themedColors(logo.hex);
  const vars = {
    "--logo-light": c.light,
    "--logo-dark": c.dark,
    "--logo-on-light": c.onLight,
    "--logo-on-dark": c.onDark,
  } as React.CSSProperties;

  if (logo.kind === "icon") {
    return (
      <svg viewBox="0 0 24 24" className={`logo shrink-0 ${SIZES[size].logo}`} style={vars} aria-hidden="true">
        <path d={logo.path} />
      </svg>
    );
  }
  return (
    <span
      className={`logo-mono inline-flex shrink-0 items-center justify-center rounded px-0.5 font-mono font-bold leading-none ${SIZES[size].mono}`}
      style={vars}
      aria-hidden="true"
    >
      {logo.text}
    </span>
  );
}

/** A technology pill: logo plus name. `className` adds border/background. */
export default function TechChip({ name, size = "tag", className = "" }: { name: string; size?: ChipSize; className?: string }) {
  const hasLogo = logoFor(name) !== null;
  return (
    <span className={`inline-flex items-center rounded-full border ${SIZES[size].chip} ${className}`}>
      {hasLogo ? <TechLogo name={name} size={size} /> : <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-current opacity-50" aria-hidden="true" />}
      {name}
    </span>
  );
}
