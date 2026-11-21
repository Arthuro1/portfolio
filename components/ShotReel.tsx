"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronIcon, CloseIcon, ExpandIcon } from "@/components/icons";

export type Shot = { src: string; caption: string };
type Labels = { open: string; close: string; prev: string; next: string };

const FIRST_STEP_MS = 700;
const STEP_MS = 2200;

/**
 * A project's screenshots, shown whole at their own 16:10 ratio. The first one
 * is the cover; while the card (the closest `[data-reel-host]`) is hovered or
 * focused, the reel crossfades through the others. Touch screens have no
 * hover, so there it plays while the card is on screen. Reduced-motion users
 * step through with the dots. A click opens the shot full size.
 */
export default function ShotReel({ shots, label, labels, className = "" }: { shots: Shot[]; label: string; labels: Labels; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  // Only the cover loads up front; the rest load on the first activation.
  const [armed, setArmed] = useState(false);
  const [viewing, setViewing] = useState<number | null>(null);
  const many = shots.length > 1;

  useEffect(() => {
    const el = ref.current;
    if (!el || !many) return;
    const host = el.closest<HTMLElement>("[data-reel-host]") ?? el;
    const on = () => {
      setArmed(true);
      setActive(true);
    };
    const off = () => setActive(false);
    const offIfOutside = (e: FocusEvent) => {
      if (!host.contains(e.relatedTarget as Node | null)) off();
    };

    if (window.matchMedia("(hover: none)").matches) {
      const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? on() : off()), { threshold: 0.6 });
      observer.observe(el);
      return () => observer.disconnect();
    }

    host.addEventListener("pointerenter", on);
    host.addEventListener("pointerleave", off);
    host.addEventListener("focusin", on);
    host.addEventListener("focusout", offIfOutside);
    return () => {
      host.removeEventListener("pointerenter", on);
      host.removeEventListener("pointerleave", off);
      host.removeEventListener("focusin", on);
      host.removeEventListener("focusout", offIfOutside);
    };
  }, [many]);

  useEffect(() => {
    if (!active || viewing !== null) {
      if (!active) setIndex(0);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = window.setTimeout(function step() {
      setIndex((i) => (i + 1) % shots.length);
      timer = window.setTimeout(step, STEP_MS);
    }, FIRST_STEP_MS);
    return () => window.clearTimeout(timer);
  }, [active, viewing, shots.length]);

  const open = () => {
    setViewing(index);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = (by: number) => setViewing((v) => (v === null ? v : (v + by + shots.length) % shots.length));

  return (
    <div ref={ref} className={`relative aspect-[16/10] overflow-hidden bg-raised ${className}`}>
      {shots.map((shot, i) =>
        i === 0 || armed ? (
          // eslint-disable-next-line @next/next/no-img-element -- static webp, already sized
          <img
            key={shot.src}
            src={shot.src}
            alt={i === 0 ? label : ""}
            width={960}
            height={600}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 motion-reduce:transition-none ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : null,
      )}

      <button
        type="button"
        onClick={open}
        aria-label={`${labels.open}: ${shots[index].caption}`}
        className="group/zoom absolute inset-0 cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent-bright"
      >
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100 [@media(hover:none)]:opacity-100">
          <ExpandIcon className="h-4 w-4" />
        </span>
      </button>

      {many && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-4 pb-3 pt-10">
          <p
            className={`min-w-0 truncate rounded-full bg-black/45 px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-white backdrop-blur-sm transition-opacity duration-300 ${
              active || index > 0 ? "opacity-100" : "opacity-0"
            }`}
            aria-live="polite"
          >
            {shots[index].caption}
          </p>
          <div className="pointer-events-auto flex shrink-0 gap-1.5">
            {shots.map((shot, i) => (
              <button
                key={shot.src}
                type="button"
                onClick={() => {
                  setArmed(true);
                  setIndex(i);
                }}
                aria-label={shot.caption}
                aria-current={i === index}
                className="group/dot flex h-6 items-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-white" : "w-1.5 bg-white/55 group-hover/dot:bg-white/85"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <dialog
        ref={dialogRef}
        onClose={() => setViewing(null)}
        // A click on the backdrop lands on the dialog element itself.
        onClick={(e) => e.target === e.currentTarget && close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        aria-label={label}
        className="w-[min(1100px,calc(100vw-2rem))] max-w-none overflow-hidden rounded-2xl border border-line bg-surface p-0 text-ink shadow-2xl backdrop:bg-black/75 backdrop:backdrop-blur-sm"
      >
        {viewing !== null && (
          <>
            <div className="flex items-center justify-between gap-4 px-5 py-3">
              <p className="min-w-0 truncate text-sm">
                <span className="font-bold">{label}</span>
                <span className="text-muted"> · {shots[viewing].caption}</span>
              </p>
              <div className="flex shrink-0 items-center gap-2">
                {many && (
                  <span className="font-mono text-xs text-muted">
                    {viewing + 1} / {shots.length}
                  </span>
                )}
                <button
                  type="button"
                  onClick={close}
                  aria-label={labels.close}
                  className="rounded-lg border border-line p-2 text-muted transition-colors hover:border-accent-bright hover:text-accent"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="relative bg-raised">
              {/* eslint-disable-next-line @next/next/no-img-element -- static webp, already sized */}
              <img
                src={shots[viewing].src}
                alt={shots[viewing].caption}
                width={960}
                height={600}
                className="mx-auto h-auto max-h-[calc(100dvh-8rem)] w-full object-contain"
              />
              {many && (
                <>
                  <ViewerArrow label={labels.prev} onClick={() => step(-1)} className="left-3 rotate-180" />
                  <ViewerArrow label={labels.next} onClick={() => step(1)} className="right-3" />
                </>
              )}
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}

function ViewerArrow({ label, onClick, className }: { label: string; onClick: () => void; className: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-bright ${className}`}
    >
      <ChevronIcon className="h-5 w-5" />
    </button>
  );
}
