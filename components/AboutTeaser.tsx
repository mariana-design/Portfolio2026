"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, revealViewport } from "@/lib/motion";
import { renderEmphasis } from "@/lib/emphasis";
import VisualPlaceholder from "./VisualPlaceholder";

type AboutTeaserProps = {
  title: string;
  body: string;
  cta: string;
  href: string;
};

export default function AboutTeaser({ title, body, cta, href }: AboutTeaserProps) {
  return (
    <section className="px-6 py-28 md:px-12">
      <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp}>
        <Link
          href={href}
          className="group grid grid-cols-1 items-center gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-20"
        >
          <div>
            <h2 className="font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
              {renderEmphasis(title)}
            </h2>
            <p className="mt-8 max-w-xl text-xl text-ink-soft md:text-2xl md:leading-snug">{body}</p>
            <p className="mt-10 text-base font-medium">
              <span className="bg-gradient-to-r from-accent-warm to-accent-warm bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_2px]">
                {cta} →
              </span>
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl transition-transform duration-500 ease-out group-hover:-rotate-1 group-hover:scale-[1.02]">
            <VisualPlaceholder label="photo of Mariana" className="aspect-auto! h-[26rem] md:h-[34rem]" />
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
