"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { worldBase, worldCountries, worldSize } from "@/content/worldMap";

type WorldMapVisitedProps = {
  countries: string[];
  className?: string;
};

const STEP_MS = 1400;
const HOLD_MS = 2400;

export default function WorldMapVisited({ countries, className = "" }: WorldMapVisitedProps) {
  const n = countries.length;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  // step = how many countries are drawn (1..n). At n it rests before the loop restarts.
  const [step, setStep] = useState(1);

  // Time-driven loop; it only ticks while the map is on screen and is never paused by the mouse.
  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setStep((s) => (s >= n ? 1 : s + 1)), step >= n ? HOLD_MS : STEP_MS);
    return () => clearTimeout(id);
  }, [step, inView, n]);

  const current = countries[step - 1];
  const drawn = countries.slice(0, step);
  const pos = current ? worldCountries[current] : undefined;

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox={`0 0 ${worldSize.w} ${worldSize.h}`}
        className="h-auto w-full"
        role="img"
        aria-label={`World map, ${n} visited countries drawn one by one`}
      >
        <path d={worldBase} fill="var(--ink)" fillOpacity={0.06} stroke="var(--paper)" strokeWidth={0.5} />

        {drawn.map((name) => {
          const c = worldCountries[name];
          if (!c) return null;
          const isCurrent = name === current;
          return (
            <motion.path
              key={name}
              d={c.d}
              fill="var(--ink)"
              stroke="var(--ink)"
              strokeWidth={isCurrent ? 1.4 : 0.8}
              strokeLinejoin="round"
              initial={{ pathLength: 0, fillOpacity: 0, strokeOpacity: 0.9 }}
              animate={{
                pathLength: 1,
                fillOpacity: isCurrent ? 0.5 : 0.2,
                strokeOpacity: isCurrent ? 0.9 : 0.45,
              }}
              transition={{
                pathLength: { duration: 1, ease: "easeInOut" },
                fillOpacity: { duration: 0.6, delay: 0.55, ease: "easeOut" },
                strokeOpacity: { duration: 0.5 },
              }}
            />
          );
        })}

        {pos && (
          <g key={current}>
            <motion.circle
              cx={pos.cx}
              cy={pos.cy}
              fill="none"
              stroke="var(--ink)"
              strokeWidth={1.2}
              initial={{ r: 3, opacity: 0.6 }}
              animate={{ r: 26, opacity: 0 }}
              transition={{ duration: 1.3, ease: "easeOut" }}
            />
            <circle cx={pos.cx} cy={pos.cy} r={3.5} fill="var(--ink)" stroke="white" strokeWidth={1.2} />
          </g>
        )}
      </svg>

      <div className="mt-6 flex items-baseline justify-between gap-6">
        <p className="font-display text-2xl font-bold uppercase tracking-tight md:text-3xl" aria-live="polite">
          {current}
        </p>
        <p className="font-serif text-lg italic tabular-nums text-ink-soft">
          {String(step).padStart(2, "0")}/{String(n).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
