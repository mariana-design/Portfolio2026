"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp, revealViewport } from "@/lib/motion";

type MetaItem = {
  label: string;
  value: string;
};

type MetaRowProps = {
  items: MetaItem[];
  className?: string;
};

export default function MetaRow({ items, className = "" }: MetaRowProps) {
  return (
    <motion.dl
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={staggerContainer}
      className={`grid grid-cols-2 gap-6 md:grid-cols-4 ${className}`}
    >
      {items.map((item) => (
        <motion.div key={item.label} variants={fadeUp}>
          <dt className="text-xs uppercase tracking-wide text-ink-soft">
            {item.label}
          </dt>
          <dd className="mt-1 font-display font-semibold">{item.value}</dd>
        </motion.div>
      ))}
    </motion.dl>
  );
}
