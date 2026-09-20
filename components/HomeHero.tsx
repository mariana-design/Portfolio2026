"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import DiagramFlow from "./DiagramFlow";
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
  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-16 pt-28 md:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 right-12 hidden w-[520px] opacity-[0.09] lg:block"
      >
        <DiagramFlow steps={["Problem", "People", "Constraints", "Decision", "Interface"]} />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.85 } } }}
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
          {introLead} <WordCycler words={words} />
        </motion.p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative mt-16 w-full text-xs tracking-wide text-ink-soft"
      >
        {footer} ↓
      </motion.p>
    </section>
  );
}
