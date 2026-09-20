"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp, revealViewport } from "@/lib/motion";

type Stat = {
  value: string;
  label: string;
};

type StatBlockProps = {
  stats: Stat[];
  className?: string;
};

const colsByCount: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

export default function StatBlock({ stats, className = "" }: StatBlockProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={staggerContainer}
      className={`grid grid-cols-2 gap-8 ${
        colsByCount[stats.length] ?? "md:grid-cols-4"
      } ${className}`}
    >
      {stats.map((stat) => (
        <motion.div key={stat.label} variants={fadeUp}>
          <p className="font-display text-4xl font-bold tracking-tight text-accent-warm md:text-5xl">
            {stat.value}
          </p>
          <p className="mt-2 text-sm text-ink-soft">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
