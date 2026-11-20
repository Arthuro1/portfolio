"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "static" | "pending" | "in";

// Hook for elements that should animate in once they scroll into view.
// Anything already on screen at mount stays put, and reduced-motion users and
// server-rendered HTML always see the content.
export function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [phase, setPhase] = useState<Phase>("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setPhase("pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("in");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, phase };
}

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, phase } = useRevealOnScroll<HTMLDivElement>();
  const phaseClass = phase === "pending" ? "reveal-pending" : phase === "in" ? "reveal-in" : "";
  return (
    <div ref={ref} className={`${phaseClass} ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}
