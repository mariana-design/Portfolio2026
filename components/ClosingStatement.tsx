"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { fadeUp, revealViewport } from "@/lib/motion";
import { useSectionObserver } from "@/lib/section-observer";
import { renderEmphasis } from "@/lib/emphasis";

type ClosingStatementProps = {
  id: string;
  anchor?: string;
  number: string;
  label: string;
  title: string;
  body: string;
  links: { label: string; href: string }[];
};

// The last word of the page: one oversized sentence, a short paragraph, one primary action and two quiet ones.
export default function ClosingStatement({ id, anchor, number, label, title, body, links }: ClosingStatementProps) {
  const ref = useRef<HTMLElement>(null);
  const { register } = useSectionObserver();

  useEffect(() => {
    if (!ref.current) return;
    return register(id, ref.current, true);
  }, [id, register]);

  const [primary, ...rest] = links;

  return (
    <section ref={ref} id={anchor} className="bg-paper-dark px-6 pb-16 pt-32 text-ink-dark md:px-12 md:pt-44">
      <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp}>
        <div className="flex items-end gap-5">
          <p className="font-serif text-6xl italic leading-none text-accent-warm md:text-7xl">{number}</p>
          <p className="pb-1 text-xs font-medium uppercase tracking-wide text-ink-dark/60">{label}</p>
        </div>
        <h2 className="mt-10 max-w-[15ch] font-display text-[13vw] font-bold leading-[0.95] tracking-[-0.04em] md:max-w-[17ch] md:text-[7.4vw]">
          {renderEmphasis(title)}
        </h2>
        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-[1fr_auto] md:items-end md:gap-20">
          <p className="max-w-xl text-xl text-ink-dark/75 md:text-2xl md:leading-snug">{body}</p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={primary.href}
              className="rounded-full bg-ink-dark px-8 py-4 text-base font-medium text-paper-dark transition-colors hover:bg-accent-warm"
            >
              {primary.label} ↗
            </a>
            {rest.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="rounded-full border border-ink-dark/30 px-6 py-3.5 text-sm font-medium transition-colors hover:border-accent-warm hover:text-accent-warm"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
