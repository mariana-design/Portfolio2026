"use client";

import { motion } from "framer-motion";
import { fadeUp, revealViewport } from "@/lib/motion";

type QuoteBlockProps = {
  quote: string;
  className?: string;
};

export default function QuoteBlock({ quote, className = "" }: QuoteBlockProps) {
  return (
    <motion.blockquote
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={fadeUp}
      className={`mx-auto max-w-2xl py-16 text-center font-display text-2xl font-semibold leading-snug tracking-tight md:text-3xl ${className}`}
    >
      “{quote}”
    </motion.blockquote>
  );
}
