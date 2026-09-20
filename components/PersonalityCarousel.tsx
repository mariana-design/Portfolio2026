"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { easeEditorial } from "@/lib/motion";
import { renderEmphasis } from "@/lib/emphasis";

type PersonalityCarouselProps = {
  items: string[];
  className?: string;
};

const SWIPE = 80;
const slide = {
  enter: (dir: number) => ({ x: dir * 70, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -70, opacity: 0 }),
};

export default function PersonalityCarousel({ items, className = "" }: PersonalityCarouselProps) {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);

  const go = useCallback(
    (d: number) => setState(([i]) => [(i + d + items.length) % items.length, d]),
    [items.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className={className}>
      <div className="relative min-h-[15rem] overflow-hidden md:min-h-[18rem]">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.p
            key={index}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: easeEditorial }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE) go(1);
              else if (info.offset.x > SWIPE) go(-1);
            }}
            className="max-w-4xl cursor-grab touch-pan-y font-display text-3xl font-bold leading-[1.15] tracking-tight active:cursor-grabbing md:text-6xl"
          >
            {renderEmphasis(items[index])}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center gap-6">
        <div className="flex gap-3">
          {[
            { d: -1, label: "Previous", glyph: "←" },
            { d: 1, label: "Next", glyph: "→" },
          ].map((b) => (
            <button
              key={b.d}
              type="button"
              aria-label={b.label}
              onClick={() => go(b.d)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-lg transition-colors hover:border-accent-warm hover:text-accent-warm"
            >
              {b.glyph}
            </button>
          ))}
        </div>
        <p className="font-serif text-lg italic tabular-nums text-ink-soft" aria-live="polite">
          {pad(index + 1)}/{pad(items.length)}
        </p>
      </div>
    </div>
  );
}
