"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { easeEditorial } from "@/lib/motion";

type Entry = {
  company: string;
  role: string;
  dates: string;
  body: string;
  bullets?: string[];
};

type ExperienceAccordionProps = {
  label: string;
  items: Entry[];
  className?: string;
};

export default function ExperienceAccordion({ label, items, className = "" }: ExperienceAccordionProps) {
  const [open, setOpen] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className={`grid grid-cols-[auto_1fr] gap-6 md:gap-14 ${className}`}>
      <p className="sticky top-28 h-fit rotate-180 self-start text-xs font-medium uppercase tracking-[0.3em] text-ink-soft [writing-mode:vertical-rl]">
        {label}
      </p>

      <ul className="border-t border-ink/15">
        {items.map((e, i) => {
          const isOpen = open.has(i);
          return (
            <motion.li key={e.company} layout="position" transition={{ duration: 0.4, ease: easeEditorial }} className="border-b border-ink/15">
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className="group flex w-full items-center gap-4 py-6 text-left md:gap-8"
              >
                <span className="grid flex-1 grid-cols-1 gap-1 md:grid-cols-[1fr_1.4fr_auto] md:items-baseline md:gap-8">
                  <span className="font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-accent-warm md:text-3xl">
                    {e.company}
                  </span>
                  <span className="text-ink-soft">{e.role}</span>
                  <span className="text-xs font-medium uppercase tracking-wide text-ink-soft">{e.dates}</span>
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: easeEditorial }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/20 text-xl leading-none transition-colors group-hover:border-accent-warm group-hover:text-accent-warm"
                  aria-hidden
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: easeEditorial }}
                    className="overflow-hidden"
                  >
                    <div className="max-w-2xl pb-8 text-lg text-ink-soft">
                      <p>{e.body}</p>
                      {e.bullets && (
                        <ul className="mt-3 space-y-1">
                          {e.bullets.map((b) => (
                            <li key={b}>— {b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
