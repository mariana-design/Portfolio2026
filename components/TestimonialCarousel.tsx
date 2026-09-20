"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { easeEditorial } from "@/lib/motion";
import type { Testimonial } from "@/content/testimonials";

type TestimonialCarouselProps = {
  items: Testimonial[];
  linkedinHref?: string;
  className?: string;
};

const SWIPE = 80;

const slide = {
  enter: (dir: number) => ({ x: dir * 60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -60, opacity: 0 }),
};

function Quote({ text, emphasis }: { text: string; emphasis: string }) {
  const at = text.indexOf(emphasis);
  if (at === -1) return <>“{text}”</>;
  return (
    <>
      “{text.slice(0, at)}
      <em className="font-serif font-normal italic text-accent-warm">{emphasis}</em>
      {text.slice(at + emphasis.length)}”
    </>
  );
}

// 3 cards on desktop, 2 on tablet, 1 on mobile.
function usePerPage() {
  const [n, setN] = useState(3);
  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const md = window.matchMedia("(min-width: 768px)");
    const update = () => setN(lg.matches ? 3 : md.matches ? 2 : 1);
    update();
    lg.addEventListener("change", update);
    md.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      md.removeEventListener("change", update);
    };
  }, []);
  return n;
}

export default function TestimonialCarousel({
  items,
  linkedinHref = "#linkedin-profile",
  className = "",
}: TestimonialCarouselProps) {
  const perPage = usePerPage();
  const pages = Math.ceil(items.length / perPage);
  const [[rawPage, dir], setState] = useState<[number, number]>([0, 1]);
  const page = Math.min(rawPage, pages - 1);

  const go = useCallback(
    (d: number) => setState(([p]) => [(Math.min(p, pages - 1) + d + pages) % pages, d]),
    [pages]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const visible = items.slice(page * perPage, page * perPage + perPage);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className={className}>
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={`${page}-${perPage}`}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: easeEditorial }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE) go(1);
              else if (info.offset.x > SWIPE) go(-1);
            }}
            className="grid cursor-grab touch-pan-y grid-cols-1 gap-5 active:cursor-grabbing md:grid-cols-2 lg:grid-cols-3"
          >
            {visible.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-2xl border border-ink/10 bg-ink/[0.025] p-7 md:p-8"
              >
                <blockquote className="font-serif text-lg leading-relaxed md:text-xl md:leading-relaxed">
                  <Quote text={t.short} emphasis={t.emphasis} />
                </blockquote>
                <figcaption className="mt-auto pt-8">
                  <p className="font-display text-base font-bold">{t.name}</p>
                  <p className="mt-1 text-sm text-ink-soft">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="flex gap-3">
            {[
              { d: -1, label: "Previous testimonials", glyph: "←" },
              { d: 1, label: "Next testimonials", glyph: "→" },
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
            {pad(page + 1)}/{pad(pages)}
          </p>
        </div>

        <a
          href={linkedinHref}
          className="group text-sm font-medium"
        >
          <span className="bg-gradient-to-r from-accent-warm to-accent-warm bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_2px]">
            See more recommendations on LinkedIn →
          </span>
        </a>
      </div>
    </div>
  );
}
