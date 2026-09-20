"use client";

import { motion } from "framer-motion";
import { fadeUp, revealViewport } from "@/lib/motion";
import { ndaNote } from "@/content/shared";

export default function NDANote({ text = ndaNote }: { text?: string }) {
  return (
    <section className="px-6 pb-24 md:px-12">
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={fadeUp}
        className="max-w-3xl font-serif text-lg italic leading-relaxed text-ink-soft md:text-xl"
      >
        {text}
      </motion.p>
    </section>
  );
}
