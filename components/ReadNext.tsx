"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, revealViewport } from "@/lib/motion";

type ReadNextProps = {
  href: string;
  title: string;
  description: string;
  className?: string;
};

export default function ReadNext({
  href,
  title,
  description,
  className = "",
}: ReadNextProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={fadeUp}
      className={className}
    >
      <Link
        href={href}
        className="group block border-t border-ink/10 py-12 transition-colors hover:bg-ink/[0.02]"
      >
        <p className="text-sm uppercase tracking-wide text-ink-soft">
          Read next
        </p>
        <h3 className="mt-2 font-display text-2xl font-bold tracking-tight underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-accent-warm md:text-3xl">
          {title} →
        </h3>
        <p className="mt-2 max-w-lg text-ink-soft">{description}</p>
      </Link>
    </motion.div>
  );
}
