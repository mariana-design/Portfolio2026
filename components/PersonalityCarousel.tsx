"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { easeEditorial, fadeUp, revealViewport } from "@/lib/motion";
import { renderEmphasis } from "@/lib/emphasis";

type PersonalityPhoto = { src: string; alt: string };
type PersonalityItem = { text: string; photos?: PersonalityPhoto[] };

type PersonalityCarouselProps = {
  items: PersonalityItem[];
  className?: string;
};

const SWIPE = 80;
const slide = {
  enter: (dir: number) => ({ x: dir * 70, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -70, opacity: 0 }),
};

// Desktop: one card at a time, horizontal drag/arrows — plenty of room to linger on a single thought.
function DesktopCarousel({ items }: { items: PersonalityItem[] }) {
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
  const current = items[index];

  return (
    <div className="hidden md:block">
      <div className="relative min-h-[30rem] overflow-hidden md:min-h-[34rem]">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
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
            className="cursor-grab touch-pan-y active:cursor-grabbing"
          >
            {current.photos && current.photos.length > 0 && (
              <div className="mb-8 flex gap-4">
                {current.photos.map((p) => (
                  <div key={p.src} className="h-44 w-36 shrink-0 overflow-hidden rounded-xl shadow-[0_10px_24px_-12px_rgba(0,0,0,0.35)] md:h-64 md:w-52">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.src} alt={p.alt} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            )}
            <p className="max-w-4xl font-display text-2xl font-bold leading-[1.15] tracking-tight md:text-5xl">
              {renderEmphasis(current.text)}
            </p>
          </motion.div>
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

// Mobile: a stacked card feed, part of normal page scroll — no nested scroll container to trap a swipe in,
// just cards you scroll/swipe past the way you'd scroll any feed. Each card reveals on its own as it enters
// view (not the stack as a whole) — with 12 cards the stack is far taller than the viewport, so a single
// whileInView on the container would need an impossible fraction of it on-screen at once and never fire.
function MobileFeed({ items }: { items: PersonalityItem[] }) {
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex flex-col gap-5 md:hidden">
      {items.map((item, i) => (
        <motion.div
          key={item.text}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={fadeUp}
          className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-5"
        >
          {item.photos && item.photos.length > 0 && (
            <div className="mb-5 flex gap-2 xs:gap-3">
              {item.photos.map((p) => (
                <div
                  key={p.src}
                  className="aspect-[3/4] w-full min-w-0 shrink overflow-hidden rounded-xl shadow-[0_10px_24px_-12px_rgba(0,0,0,0.35)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.alt} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}
          <p className="font-display text-xl font-bold leading-[1.2] tracking-tight">{renderEmphasis(item.text)}</p>
          <p className="mt-4 font-serif text-sm italic tabular-nums text-ink-soft">{pad(i + 1)}/{pad(items.length)}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default function PersonalityCarousel({ items, className = "" }: PersonalityCarouselProps) {
  return (
    <div className={className}>
      <DesktopCarousel items={items} />
      <MobileFeed items={items} />
    </div>
  );
}
