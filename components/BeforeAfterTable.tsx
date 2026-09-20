"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp, revealViewport } from "@/lib/motion";

type BeforeAfterRow = {
  before: string;
  after: string;
};

type BeforeAfterTableProps = {
  rows: BeforeAfterRow[];
  className?: string;
};

export default function BeforeAfterTable({
  rows,
  className = "",
}: BeforeAfterTableProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={staggerContainer}
      className={`divide-y divide-ink/10 border-y border-ink/10 ${className}`}
    >
      {rows.map((row) => (
        <motion.div
          key={row.before}
          variants={fadeUp}
          className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-4 transition-colors hover:bg-ink/[0.03]"
        >
          <span className="text-ink-soft">{row.before}</span>
          <span className="text-accent-warm">→</span>
          <span className="font-medium text-ink">{row.after}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
