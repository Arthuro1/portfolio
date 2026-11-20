"use client";

import { useEffect, useState } from "react";
import { useRevealOnScroll } from "@/components/Reveal";

const DURATION_MS = 1400;

// Counts from 0 to `value` the first time it scrolls into view.
export default function CountUp({ value, className = "" }: { value: number; className?: string }) {
  const { ref, phase } = useRevealOnScroll<HTMLSpanElement>();
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (phase === "pending") setShown(0);
    if (phase !== "in") return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phase, value]);

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}
