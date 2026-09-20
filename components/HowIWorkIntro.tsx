"use client";

import { motion } from "framer-motion";
import { fadeUp, revealViewport } from "@/lib/motion";
import { renderEmphasis } from "@/lib/emphasis";
import { howIWork } from "@/content/shared";
import DiagramFlow from "./DiagramFlow";

export default function HowIWorkIntro() {
  return (
    <section className="px-6 py-24 md:px-12">
      <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp}>
        <h2 className="mb-10 font-display text-3xl font-bold tracking-tight md:text-5xl">
          {renderEmphasis(howIWork.title)}
        </h2>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8">
          {howIWork.items.map((item, i) => (
            <div key={item.n} className="border-t border-ink/15 pt-6">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">{item.n}</p>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-base text-ink-soft">{item.body}</p>
              {i === 0 ? (
                <DiagramFlow steps={item.flow} compact className="mt-6" />
              ) : (
                <p className="mt-6 text-sm font-medium uppercase tracking-wide text-ink-soft">
                  {item.flow.join(" → ")}
                </p>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
