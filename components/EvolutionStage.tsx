"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { easeEditorial } from "@/lib/motion";
import { phoneFrame } from "@/lib/mockup";
import Stage from "./Stage";

// Illustrative, not a screenshot: two abstract UI states crossfading inside the same phone frame used everywhere
// else in the case study — the chat-first dark app dissolving into the light, email-native one. Runs once it
// scrolls into view, then loops gently while visible, so it reads as the "most polished moment" of the case study.
const STATES = [
  { key: "chat", label: "Chat-first · iOS only" },
  { key: "email", label: "Email-native · iOS + Web" },
] as const;

function ChatFace() {
  return (
    <div className="flex h-full w-full flex-col bg-[#15171c] px-4 pt-9 text-white">
      <div className="flex items-center justify-between">
        <span className="font-display text-[13px] font-bold tracking-tight">darma</span>
        <span className="h-2 w-2 rounded-full bg-white/30" />
      </div>
      <div className="mt-7 space-y-2">
        <motion.div
          initial={{ width: "40%" }}
          animate={{ width: "62%" }}
          transition={{ duration: 1.1, ease: easeEditorial }}
          className="h-2.5 rounded-full bg-white/25"
        />
        <motion.div
          initial={{ width: "70%" }}
          animate={{ width: "40%" }}
          transition={{ duration: 1.1, ease: easeEditorial, delay: 0.08 }}
          className="h-2.5 rounded-full bg-white/15"
        />
      </div>
      <div className="mt-auto mb-8 flex flex-col gap-2">
        <div className="ml-auto max-w-[78%] rounded-2xl rounded-br-sm bg-[#FFC533] px-3 py-2 text-[10px] leading-snug text-[#15171c]">
          When's my next free slot?
        </div>
        <div className="max-w-[78%] rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2 text-[10px] leading-snug text-white/80">
          Wed 29 Apr, 13:00 works.
        </div>
      </div>
    </div>
  );
}

function EmailFace() {
  return (
    <div className="flex h-full w-full flex-col bg-white px-4 pt-9">
      <div className="flex items-center justify-between">
        <span className="font-display text-[13px] font-bold tracking-tight text-ink">darma</span>
        <span className="h-2 w-2 rounded-full bg-[#1D4ED8]" />
      </div>
      <div className="mt-7 rounded-lg border border-ink/10 bg-ink/[0.02] p-2.5">
        <div className="h-1.5 w-3/4 rounded-full bg-ink/15" />
        <div className="mt-2 h-1.5 w-1/2 rounded-full bg-ink/10" />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: easeEditorial }}
          style={{ transformOrigin: "left" }}
          className="mt-3 h-1.5 w-full rounded-full bg-[#1D4ED8]/50"
        />
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="h-1.5 w-full rounded-full bg-ink/8" />
        <div className="h-1.5 w-5/6 rounded-full bg-ink/8" />
        <div className="h-1.5 w-2/3 rounded-full bg-ink/8" />
      </div>
      <div className="mt-auto mb-8 flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-wide text-[#1D4ED8]">
        <svg width="10" height="10" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M4 6l6 5 6-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Agreement reached
      </div>
    </div>
  );
}

export default function EvolutionStage({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setI((n) => (n + 1) % STATES.length), i === 0 ? 2600 : 3000);
    return () => clearTimeout(id);
  }, [inView, i]);

  return (
    <div ref={ref} className={`flex flex-col items-center ${className}`}>
      <Stage className="h-[22rem] w-full md:h-[26rem]">
        <div style={{ width: 190 }} className={`relative ${phoneFrame}`}>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={STATES[i].key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0.2 : 0.5, ease: easeEditorial }}
              className="absolute inset-0"
            >
              {STATES[i].key === "chat" ? <ChatFace /> : <EmailFace />}
            </motion.div>
          </AnimatePresence>
        </div>
      </Stage>
      <p className="mt-5 text-xs font-medium uppercase tracking-wide text-ink-soft" aria-live="polite">
        {STATES.map((s, n) => (
          <span key={s.key} className={n === i ? "text-accent-warm" : ""}>
            {s.label}
            {n < STATES.length - 1 ? "  →  " : ""}
          </span>
        ))}
      </p>
    </div>
  );
}
