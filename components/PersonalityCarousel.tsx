"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { easeEditorial } from "@/lib/motion";
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

// Mobile: a horizontal swipeable card row — native scroll-snap, one card at a time, no custom drag math
// and nothing fighting the page's own vertical scroll.
function MobileFeed({ items }: { items: PersonalityItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const pad = (n: number) => String(n).padStart(2, "0");

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.scrollWidth / items.length;
    setActive(Math.round(track.scrollLeft / cardWidth));
  }, [items.length]);

  return (
    <div className="md:hidden">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-6 pb-2 pl-6 pr-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <div
            key={item.text}
            className="w-[82vw] shrink-0 snap-start rounded-2xl border border-ink/10 bg-ink/[0.02] p-5"
          >
            {item.photos && item.photos.length > 0 && (
              // One fixed-aspect frame per card, sliced into equal columns for however many photos
              // there are — so a 1-photo and a 2-or-3-photo card take up the exact same size/shape,
              // instead of multi-photo cards shrinking to half-height and looking out of place.
              <div
                className="mb-5 grid aspect-[3/4] gap-1 overflow-hidden rounded-xl shadow-[0_10px_24px_-12px_rgba(0,0,0,0.35)]"
                style={{ gridTemplateColumns: `repeat(${item.photos.length}, 1fr)` }}
              >
                {item.photos.map((p) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={p.src} src={p.src} alt={p.alt} className="h-full w-full object-cover" />
                ))}
              </div>
            )}
            <p className="font-display text-xl font-bold leading-[1.2] tracking-tight">{renderEmphasis(item.text)}</p>
          </div>
        ))}
      </div>

      <p className="mt-5 pl-6 font-serif text-lg italic tabular-nums text-ink-soft" aria-live="polite">
        {pad(active + 1)}/{pad(items.length)}
      </p>
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
