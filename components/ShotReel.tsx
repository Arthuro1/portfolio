"use client";

import { useEffect, useRef, useState } from "react";

export type Shot = { src: string; caption: string };

const FIRST_STEP_MS = 700;
const STEP_MS = 2200;

/**
 * A project's screenshots. The first one is the cover; while the card (the
 * closest `[data-reel-host]`) is hovered or focused, the reel crossfades
 * through the others. Touch screens have no hover, so there it plays while
 * the card is on screen. Reduced-motion users step through with the dots.
 */
export default function ShotReel({ shots, label, className = "" }: { shots: Shot[]; label: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  // Only the cover loads up front; the rest load on the first activation.
  const [armed, setArmed] = useState(false);
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
    if (!active) {
      setIndex(0);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = window.setTimeout(function step() {
      setIndex((i) => (i + 1) % shots.length);
      timer = window.setTimeout(step, STEP_MS);
    }, FIRST_STEP_MS);
    return () => window.clearTimeout(timer);
  }, [active, shots.length]);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-raised ${className}`}>
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
            // Quick crossfade, slow drift: the shown image zooms in a little.
            style={{ transition: "opacity 500ms ease, transform 2600ms ease-out" }}
            className={`absolute inset-0 h-full w-full object-cover object-top motion-reduce:!transition-none ${
              i === index ? "opacity-100" : "opacity-0"
            } ${active && i === index ? "motion-safe:scale-[1.03]" : ""}`}
          />
        ) : null,
      )}

      {many && (
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-4 pb-3 pt-10">
          <p
            className={`min-w-0 truncate rounded-full bg-black/45 px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-white backdrop-blur-sm transition-opacity duration-300 ${
              active || index > 0 ? "opacity-100" : "opacity-0"
            }`}
            aria-live="polite"
          >
            {shots[index].caption}
          </p>
          <div className="flex shrink-0 gap-1.5">
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
    </div>
  );
}
