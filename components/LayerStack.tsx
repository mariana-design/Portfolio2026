"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STEP = 650; // ms each node stays lit
const REST = 1300; // ms the chain rests on its last node before starting over

// Horizontal row of pills with a highlight that travels node by node, left to right, on a continuous loop.
// It only runs while the row is on screen, so the panel feels alive while the text beside it is read.
// All nodes stay visible the whole time; the last one (the outcome) keeps its accent outline.
export default function LayerStack({ layers, className = "" }: { layers: string[]; className?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduced = useReducedMotion();
  const [active, setActive] = useState(-1);
  const last = layers.length - 1;

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setActive((a) => (a >= last ? 0 : a + 1)), active === last ? REST : active < 0 ? 400 : STEP);
    return () => clearTimeout(id);
  }, [inView, active, last]);

  return (
    <ol ref={ref} className={`flex flex-wrap items-center gap-x-2 gap-y-3 ${className}`}>
      {layers.map((l, i) => {
        const on = active === i;
        const isLast = i === last;
        return (
          <li key={l} className="flex items-center gap-2">
            <span
              className={`inline-block whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition-[color,border-color,transform,background-color] duration-300 ease-out ${
                on
                  ? `border-accent-warm bg-accent-warm/10 text-accent-warm ${reduced ? "" : "scale-[1.06]"}`
                  : "border-ink/20 text-ink"
              }`}
            >
              {l}
            </span>
            {!isLast && (
              <span
                aria-hidden
                className={`text-sm leading-none text-accent-warm transition-opacity duration-300 ${
                  active === i ? "opacity-100" : "opacity-40"
                }`}
              >
                →
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
