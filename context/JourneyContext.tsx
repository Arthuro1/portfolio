"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const STOPS = ["about", "skills", "projects", "experience", "contact"] as const;
export type Stop = (typeof STOPS)[number];

// A stop only counts as visited after the reader lingers on it, so jumping
// straight to Contact doesn't mark every section passed on the way.
const DWELL_MS = 900;

type Journey = { active: Stop | null; visited: ReadonlySet<Stop> };

const JourneyContext = createContext<Journey>({ active: null, visited: new Set() });

export function JourneyProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<Stop | null>(null);
  const [visited, setVisited] = useState<ReadonlySet<Stop>>(() => new Set());

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) {
        setActive(STOPS[STOPS.length - 1]);
        return;
      }
      // The active stop is the last one whose top has passed mid-screen.
      let current: Stop | null = null;
      for (const id of STOPS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!active || visited.has(active)) return;
    const timer = setTimeout(() => setVisited((prev) => new Set(prev).add(active)), DWELL_MS);
    return () => clearTimeout(timer);
  }, [active, visited]);

  return <JourneyContext.Provider value={{ active, visited }}>{children}</JourneyContext.Provider>;
}

export const useJourney = () => useContext(JourneyContext);
