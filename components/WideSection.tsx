"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { fadeUp } from "@/lib/motion";

// Not the shared `revealViewport` (amount: 0.25): this wrapper spans the whole section, heading *and*
// children, and some sections (e.g. the mobile personality feed) are far taller than any viewport — 25%
// of that height can never be on-screen at once, so the trigger would never fire and the heading would
// stay invisible forever. A small amount fires as soon as the section's top edge appears, regardless of
// how tall its content is.
const sectionViewport = { once: true, amount: 0.05 } as const;
import { useSectionObserver } from "@/lib/section-observer";
import { renderEmphasis } from "@/lib/emphasis";

type WideSectionProps = {
  id: string;
  anchor?: string;
  number: string;
  label: string;
  title: string;
  align?: "left" | "center";
  dark?: boolean;
  children?: ReactNode;
  className?: string;
};

// Full-width section: the number stays as the signature, the layout around it is free.
export default function WideSection({
  id,
  anchor,
  number,
  label,
  title,
  align = "left",
  dark = false,
  children,
  className = "",
}: WideSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { register } = useSectionObserver();

  useEffect(() => {
    if (!ref.current) return;
    return register(id, ref.current, dark);
  }, [id, dark, register]);

  const center = align === "center";

  return (
    <section
      ref={ref}
      id={anchor}
      className={`px-6 py-14 md:px-12 md:py-28 ${dark ? "bg-paper-dark text-ink-dark" : "bg-paper text-ink"} ${className}`}
    >
      <motion.div initial="hidden" whileInView="visible" viewport={sectionViewport} variants={fadeUp}>
        <div className={`mb-12 flex flex-col gap-3 md:flex-row md:items-end md:gap-8 ${center ? "items-center text-center md:flex-col md:items-center" : ""}`}>
          <div className={center ? "flex flex-col items-center" : ""}>
            <p className="font-serif text-6xl italic leading-none text-accent-warm md:text-7xl">{number}</p>
            <p className={`mt-3 text-xs font-medium uppercase tracking-wide ${dark ? "text-ink-dark/60" : "text-ink-soft"}`}>
              {label}
            </p>
          </div>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">{renderEmphasis(title)}</h2>
        </div>
        {children}
      </motion.div>
    </section>
  );
}
