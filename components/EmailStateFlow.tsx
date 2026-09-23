"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Same idea as DiagramFlow's node chain, but shown as a single email card moving through the 5 states —
// User → Email thread → Darma → Negotiation → Agreement — instead of abstract ovals. Loops once in view.
const DWELL = 1500;
const FADE = 0.35;

export default function EmailStateFlow({ steps, className = "" }: { steps: string[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [i, setI] = useState(0);
  const last = steps.length - 1;

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setI((n) => (n >= last ? 0 : n + 1)), i === last ? DWELL * 1.8 : DWELL);
    return () => clearTimeout(id);
  }, [inView, i, last]);

  const stage = steps[i];
  const isUser = stage === steps[0];
  const isThread = i === 1;
  const isDarma = i === 2;
  const isNegotiation = i === 3;
  const isAgreement = i === last;

  return (
    <div ref={ref} className={className}>
      <div className="overflow-hidden rounded-lg border border-ink/10 bg-white/70 shadow-sm">
        <div className="flex items-center justify-between border-b border-ink/10 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-ink/15" />
            <span className="h-2 w-2 rounded-full bg-ink/15" />
            <span className="h-2 w-2 rounded-full bg-ink/15" />
          </div>
          <motion.span
            key={stage}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-full bg-accent-warm/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent-warm"
          >
            {stage}
          </motion.span>
        </div>

        <div className="space-y-2 px-4 py-4">
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ opacity: isUser || isThread ? 1 : 0.35 }}
              transition={{ duration: FADE }}
              className="text-[10px] font-medium text-ink-soft"
            >
              From: {isUser ? "you@company.com" : "ea@askdarma.ai"}
            </motion.span>
          </div>
          <div className="h-1.5 w-2/3 rounded-full bg-ink/10" />
          <div className="h-1.5 w-1/2 rounded-full bg-ink/10" />

          <div className="mt-3 space-y-1.5 border-t border-ink/10 pt-3">
            <motion.div
              animate={{ opacity: isDarma || isNegotiation || isAgreement ? 1 : 0.25 }}
              transition={{ duration: FADE }}
              className="flex items-center gap-1.5 text-[10px] font-medium text-accent-warm"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-warm" />
              Darma is reading the thread
            </motion.div>
            <motion.div
              animate={{ opacity: isNegotiation || isAgreement ? 1 : 0.15 }}
              transition={{ duration: FADE }}
              className="ml-3 flex items-center gap-2"
            >
              <span className="h-1.5 w-1/3 rounded-full bg-ink/10" />
              <span className="text-[9px] text-ink-soft">↔</span>
              <span className="h-1.5 w-1/4 rounded-full bg-ink/10" />
            </motion.div>
            <motion.div
              animate={{ opacity: isAgreement ? 1 : 0, y: isAgreement ? 0 : -3 }}
              transition={{ duration: FADE }}
              className="flex items-center gap-1.5 pt-1 text-[10px] font-medium text-ink"
            >
              <svg width="12" height="12" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Meeting confirmed
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-1 gap-y-1 text-[10px] font-medium uppercase tracking-wide text-ink-soft" aria-live="polite">
        {steps.map((s, n) => (
          <span key={s} className={n === i ? "text-accent-warm" : ""}>
            {s}
            {n < last ? <span className="mx-1 text-ink-soft/50">→</span> : null}
          </span>
        ))}
      </div>
    </div>
  );
}
