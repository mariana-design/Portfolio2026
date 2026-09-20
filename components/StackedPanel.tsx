"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { usePanelObserver } from "@/lib/panel-observer";
import { useSectionObserver } from "@/lib/section-observer";
import { renderEmphasis } from "@/lib/emphasis";

type StackedPanelProps = {
  index: number;
  number: string;
  label: string;
  title: string;
  children?: ReactNode;
  dark?: boolean;
  last?: boolean;
  /** Wider content column, for panels with side-by-side layouts. */
  wide?: boolean;
};

// Every panel costs the same scroll: SLIDE_VH to arrive + HOLD_VH to read = STEP_VH, regardless of content.
// Runways overlap by OVERLAP_VH so the next panel slides in while this one is still pinned (no blank screen).
// The first panel arrives by normal page scroll, so its "slide" is that arrival and it only needs the hold.
const SLIDE_VH = 100;
const HOLD_VH = 60;
const OVERLAP_VH = 200;
const STEP_VH = SLIDE_VH + HOLD_VH;

export default function StackedPanel({
  index,
  number,
  label,
  title,
  children,
  dark = false,
  last = false,
  wide = false,
}: StackedPanelProps) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const { activate } = usePanelObserver();
  const { setPanelActive } = useSectionObserver();
  const isOn = useRef(false);

  const step = index === 0 ? HOLD_VH : STEP_VH;
  const runway = last ? OVERLAP_VH + HOLD_VH : step + OVERLAP_VH;
  const slideEnd = SLIDE_VH / runway;

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end start"],
  });

  // The first panel has nothing beneath it, so it never slides over a blank screen.
  const x = useTransform(
    scrollYProgress,
    [0, slideEnd],
    index === 0 ? ["0%", "0%"] : ["100%", "0%"]
  );

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const on = index === 0 ? p > 0 : p >= slideEnd * 0.5;
    if (on === isOn.current) return;
    isOn.current = on;
    activate(index, { number, label }, on);
    setPanelActive(index, number, dark, on);
  });

  return (
    <div
      ref={runwayRef}
      style={{ height: `${runway}vh`, marginBottom: last ? 0 : `-${OVERLAP_VH}vh` }}
      className="relative"
    >
      <motion.div
        style={{ x, zIndex: index + 1 }}
        className={`sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden px-6 py-16 border-l border-current/10 shadow-[-4px_0_12px_-8px_rgba(0,0,0,0.12)] md:px-16 ${
          dark ? "bg-paper-dark text-ink-dark" : "bg-paper text-ink"
        }`}
      >
        <div className={`mx-auto w-full ${wide ? "max-w-5xl" : "max-w-2xl"}`}>
          <h2 className="mb-6 font-display text-3xl font-bold tracking-tight md:text-5xl">
            {renderEmphasis(title)}
          </h2>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
