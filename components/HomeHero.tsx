"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useSectionObserver } from "@/lib/section-observer";
import { fadeUp, revealViewport } from "@/lib/motion";
import HoverLetters from "./HoverLetters";
import WordCycler from "./WordCycler";

type HomeHeroProps = {
  eyebrow: string;
  name: string;
  introLead: string;
  words: string[];
  footer: string;
};

export default function HomeHero({ eyebrow, name, introLead, words, footer }: HomeHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { register } = useSectionObserver();

  useEffect(() => {
    if (!ref.current) return;
    return register("hero", ref.current, false);
  }, [register]);

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-20 md:px-12 md:py-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="relative w-full"
      >
        <motion.p variants={fadeUp} className="text-xs font-medium tracking-wide text-ink-soft md:text-sm">
          {eyebrow}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="mt-6 whitespace-nowrap font-display text-[11.4vw] font-bold leading-[0.92] tracking-[-0.045em]"
        >
          <HoverLetters text={name} />
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-10 max-w-4xl text-2xl text-ink-soft md:text-4xl md:leading-[1.25]">
          {introLead} <WordCycler words={words} />.
        </motion.p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={revealViewport}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative mt-16 w-full text-xs tracking-wide text-ink-soft"
      >
        {footer}
      </motion.p>
    </section>
  );
}
