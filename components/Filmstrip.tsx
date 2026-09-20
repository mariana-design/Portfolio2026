"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, revealViewport, staggerContainer } from "@/lib/motion";

type Frame = { src?: string; alt?: string; caption: string };

// Frames without a `src` render a placeholder tile, so a state sequence can be laid out before the screens exist.
export default function Filmstrip({ frames, className = "" }: { frames: Frame[]; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={staggerContainer}
      style={{ gridTemplateColumns: `repeat(${frames.length}, minmax(0, 1fr))` }}
      className={`grid gap-2 md:gap-3 ${className}`}
    >
      {frames.map((f) => (
        <motion.figure key={f.caption} variants={fadeUp}>
          <div className="aspect-[7/14] overflow-hidden rounded-lg border border-ink/10 bg-white">
            {f.src ? (
              <Image src={f.src} alt={f.alt ?? f.caption} width={700} height={1400} className="h-full w-full object-cover object-top" />
            ) : (
              <div className="flex h-full items-center justify-center border border-dashed border-ink/20 bg-ink/[0.03] p-1 text-center text-[9px] text-ink-soft md:text-[10px]">
                (visual: {f.caption.toLowerCase()})
              </div>
            )}
          </div>
          <figcaption className="mt-2 text-[9px] font-medium uppercase tracking-wide text-ink-soft md:text-[11px]">
            {f.caption}
          </figcaption>
        </motion.figure>
      ))}
    </motion.div>
  );
}
