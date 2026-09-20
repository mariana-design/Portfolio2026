"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { fadeUp, revealViewport } from "@/lib/motion";
import { useSectionObserver } from "@/lib/section-observer";
import { renderEmphasis } from "@/lib/emphasis";

type SectionProps = {
  id?: string;
  anchor?: string;
  number?: string;
  label?: string;
  title?: string;
  children?: ReactNode;
  dark?: boolean;
  className?: string;
};

export default function Section({
  id,
  anchor,
  number,
  label,
  title,
  children,
  dark = false,
  className = "",
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { register } = useSectionObserver();
  const sectionId = id ?? number ?? title ?? "";

  useEffect(() => {
    if (!ref.current || !sectionId) return;
    return register(sectionId, ref.current, dark);
  }, [sectionId, dark, register]);

  return (
    <section
      ref={ref}
      id={anchor}
      className={`px-6 py-24 md:px-12 ${
        dark ? "bg-paper-dark text-ink-dark" : "bg-paper text-ink"
      } ${className}`}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={fadeUp}
        className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-[220px_1fr] md:gap-16"
      >
        <div className="self-start md:sticky md:top-28">
          {number && (
            <p className="font-serif text-6xl italic leading-none text-accent-warm md:text-7xl">
              {number.replace(/\s*—\s*$/, "")}
            </p>
          )}
          {label && (
            <p
              className={`mt-3 text-xs font-medium uppercase tracking-wide ${
                dark ? "text-ink-dark/60" : "text-ink-soft"
              }`}
            >
              {label}
            </p>
          )}
        </div>
        <div>
          {title && (
            <h2 className="mb-6 font-display text-3xl font-bold tracking-tight md:text-4xl">
              {renderEmphasis(title)}
            </h2>
          )}
          {children}
        </div>
      </motion.div>
    </section>
  );
}
