"use client";

import { motion } from "framer-motion";
import { fadeUp, revealViewport, staggerContainer } from "@/lib/motion";

type Photo = { src?: string; alt?: string; label?: string };

type PolaroidScatterProps = {
  photos: Photo[];
  className?: string;
};

// Deterministic "random" angle in [-8, 8] so server and client render the same.
const angle = (i: number) => ((i * 37 + 11) % 17) - 8;
const lift = (i: number) => ((i * 23 + 5) % 5) * 6 - 12;

export default function PolaroidScatter({ photos, className = "" }: PolaroidScatterProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={staggerContainer}
      className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-8 py-6 md:gap-0 ${className}`}
    >
      {photos.map((p, i) => (
        <motion.figure
          key={i}
          variants={fadeUp}
          style={{ rotate: angle(i), y: lift(i), zIndex: i }}
          className="relative w-[42vw] max-w-44 shrink-0 bg-white p-3 pb-16 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] transition-[transform,box-shadow] duration-300 hover:!z-50 hover:scale-105 hover:!rotate-0 md:-ml-10 md:w-60 md:max-w-none md:pb-10 md:first:ml-0"
        >
          {p.src ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={p.alt ?? ""} className="aspect-square w-full object-cover" />
              {p.label && (
                <figcaption className="absolute inset-x-3 bottom-3 text-center font-serif text-sm italic text-ink-soft">
                  {p.label}
                </figcaption>
              )}
            </>
          ) : (
            <div className="flex aspect-square w-full items-center justify-center border border-dashed border-ink/20 bg-ink/[0.03] p-3 text-center text-xs text-ink-soft">
              (visual: {p.label ?? `photo ${i + 1}`})
            </div>
          )}
        </motion.figure>
      ))}
    </motion.div>
  );
}
