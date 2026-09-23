"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Stop = { x: number; y: number };

// A small cursor tapping through the real option rows and landing on the real confirm/progress element — the
// actual "resolving an overlap" interaction, read the way a product-demo cursor is always read, not a colour
// block sitting on top of the screen. Positions are measured from the real asset. Darma's own blue, not the
// portfolio's terracotta — this lives inside the real product, not the site's own chrome.
export default function TapCursor({ stops, className = "" }: { stops: Stop[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  const n = stops.length;
  const xs = stops.map((s) => `${s.x}%`);
  const ys = stops.map((s) => `${s.y}%`);
  const times = stops.map((_, i) => i / (n - 1));

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <motion.div
        animate={inView ? { left: xs, top: ys } : { left: xs[0], top: ys[0] }}
        transition={inView ? { duration: (n - 1) * 1.05, times, repeat: Infinity, repeatDelay: 0.9, ease: "easeInOut" } : { duration: 0 }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <motion.span
          animate={inView ? { scale: [1, 1.7, 1], opacity: [0.55, 0, 0.55] } : { scale: 1, opacity: 0.4 }}
          transition={inView ? { duration: 1.1, repeat: Infinity, ease: "easeOut" } : { duration: 0 }}
          className="absolute inset-0 -m-1.5 rounded-full bg-[#1D4ED8]"
        />
        <span className="relative block h-3 w-3 rounded-full bg-[#1D4ED8] shadow-[0_0_0_2px_rgba(255,255,255,0.85)]" />
      </motion.div>
    </div>
  );
}
