"use client";

import { motion } from "framer-motion";
import { useRef, useState, type PointerEvent } from "react";
import { worldBase, worldCountries, worldSize } from "@/content/worldMap";

type WorldMapVisitedProps = {
  countries: string[];
  className?: string;
};

// Pixels the cursor/finger must travel (in any direction) to reveal one more country —
// makes it feel like tracing/drawing rather than sweeping to an x-position.
const PX_PER_COUNTRY = 55;

export default function WorldMapVisited({ countries, className = "" }: WorldMapVisitedProps) {
  const n = countries.length;
  const ref = useRef<HTMLDivElement>(null);
  // step = how many countries are drawn (0..n). Blank until the visitor moves the mouse/finger over it.
  const [step, setStep] = useState(0);
  const traveled = useRef(0);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const dragging = useRef(false);

  // Mouse reveals on hover, same as before. Touch has no hover, so it only reveals while actively
  // dragging a finger across the map (pointerdown → pointermove → pointerup), which is the touch
  // equivalent of "moving the mouse over it".
  const handleMove = (e: PointerEvent<SVGSVGElement>) => {
    if (e.pointerType === "touch" && !dragging.current) return;
    const point = { x: e.clientX, y: e.clientY };
    if (lastPoint.current) {
      const dx = point.x - lastPoint.current.x;
      const dy = point.y - lastPoint.current.y;
      traveled.current += Math.hypot(dx, dy);
    }
    lastPoint.current = point;
    setStep(Math.min(n, Math.floor(traveled.current / PX_PER_COUNTRY)));
  };

  const handleDown = (e: PointerEvent<SVGSVGElement>) => {
    if (e.pointerType !== "touch") return;
    dragging.current = true;
    lastPoint.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleUp = () => {
    dragging.current = false;
    lastPoint.current = null;
  };

  const handleLeave = (e: PointerEvent<SVGSVGElement>) => {
    if (e.pointerType === "touch") return;
    lastPoint.current = null;
  };

  const current = step > 0 ? countries[step - 1] : undefined;
  const drawn = countries.slice(0, step);
  const pos = current ? worldCountries[current] : undefined;

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox={`0 0 ${worldSize.w} ${worldSize.h}`}
        className="h-auto w-full max-w-full cursor-crosshair touch-none select-none"
        role="img"
        aria-label={`World map, ${n} visited countries — move the mouse, or drag a finger on touch, to reveal them`}
        onPointerMove={handleMove}
        onPointerDown={handleDown}
        onPointerUp={handleUp}
        onPointerCancel={handleUp}
        onPointerLeave={handleLeave}
      >
        <path d={worldBase} fill="#d4d4d8" stroke="#a1a1aa" strokeWidth={0.4} />

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
        <p className="text-sm text-ink-soft">Move the mouse, or drag a finger, to discover where I've traveled</p>
        <p className="font-serif text-lg italic tabular-nums text-ink-soft" aria-live="polite">
          {String(step).padStart(2, "0")}/{String(n).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
