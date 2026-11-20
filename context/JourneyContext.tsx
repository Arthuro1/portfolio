"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const STOPS = ["about", "skills", "projects", "experience", "contact"] as const;
export type Stop = (typeof STOPS)[number];

// The section currently in view, for the navbar's active link.
const JourneyContext = createContext<{ active: Stop | null }>({ active: null });

export function JourneyProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<Stop | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) {
        setActive(STOPS[STOPS.length - 1]);
        return;
      }
      // The active section is the last one whose top has passed mid-screen.
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

  return <JourneyContext.Provider value={{ active }}>{children}</JourneyContext.Provider>;
}

export const useJourney = () => useContext(JourneyContext);
