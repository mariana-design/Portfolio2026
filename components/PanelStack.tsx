"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { PanelObserverProvider, usePanelObserver } from "@/lib/panel-observer";
import { useSectionObserver } from "@/lib/section-observer";

function LeftRail() {
  const { active } = usePanelObserver();
  const { activeDark } = useSectionObserver();

  return (
    <div
      className={`sticky top-0 z-[60] hidden h-screen flex-col justify-center px-6 transition-colors duration-300 md:flex ${
        activeDark ? "bg-paper-dark" : ""
      }`}
    >
      <AnimatePresence mode="sync">
        {active && (
          <motion.div
            key={active.number}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "linear" }}
          >
            <p className="font-serif text-7xl italic leading-none text-accent-warm md:text-8xl">
              {active.number.replace(/\s*—\s*$/, "")}
            </p>
            <p
              className={`mt-4 text-xs font-medium uppercase tracking-wide transition-colors duration-300 ${
                activeDark ? "text-ink-dark/70" : "text-ink-soft"
              }`}
            >
              {active.label}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PanelStack({ children }: { children: ReactNode }) {
  return (
    <PanelObserverProvider>
      <div className="grid grid-cols-1 md:grid-cols-[18%_1fr]">
        <LeftRail />
        <div className="relative">{children}</div>
      </div>
    </PanelObserverProvider>
  );
}
