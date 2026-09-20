"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, revealViewport, staggerContainer } from "@/lib/motion";

type Frame = { src?: string; alt?: string; caption: string };

type FilmstripProps = {
  frames: Frame[];
  /** Frosted-glass overlay + lock icon for interfaces under NDA (scaled for small frames). */
  locked?: boolean;
  captionPosition?: "top" | "bottom";
  /** An extra card of a different kind, placed last after a thin divider. */
  trailing?: { caption: string; node: ReactNode };
  className?: string;
};

// Frames without a `src` render a placeholder tile, so a state sequence can be laid out before the screens exist.
export default function Filmstrip({ frames, locked = false, captionPosition = "bottom", trailing, className = "" }: FilmstripProps) {
  const caption = (text: string, pos: "top" | "bottom") => (
    <figcaption
      className={`${pos === "top" ? "mb-2" : "mt-2"} text-[9px] font-medium uppercase tracking-wide text-ink-soft md:text-[10px]`}
    >
      {text}
    </figcaption>
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={staggerContainer}
      style={{
        gridTemplateColumns: `repeat(${frames.length}, minmax(0, 1fr))${trailing ? " 9px minmax(0, 1fr)" : ""}`,
      }}
      className={`grid gap-2 md:gap-3 ${className}`}
    >
      {frames.map((f) => (
        <motion.figure key={f.caption} variants={fadeUp}>
          {captionPosition === "top" && caption(f.caption, "top")}
          <div className="group relative aspect-[7/14] overflow-hidden rounded-lg border border-ink/10 bg-white">
            {f.src ? (
              <Image src={f.src} alt={f.alt ?? f.caption} width={700} height={1400} className="h-full w-full object-cover object-top" />
            ) : (
              <div className="flex h-full items-center justify-center border border-dashed border-ink/20 bg-ink/[0.03] p-1 text-center text-[9px] text-ink-soft md:text-[10px]">
                (visual: {f.caption.toLowerCase()})
              </div>
            )}
            {locked && f.src && (
              <>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-white/[0.06] backdrop-blur-[1.5px] transition-[backdrop-filter] duration-300 ease-out group-hover:backdrop-blur-[1px]"
                />
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute right-1 top-1 h-3 w-3 rounded-full bg-white/50 p-[1.5px] text-ink/60 opacity-70 transition-opacity duration-300 ease-out group-hover:opacity-100"
                >
                  <rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke="currentColor" strokeWidth="2.4" />
                  <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </>
            )}
          </div>
          {captionPosition === "bottom" && caption(f.caption, "bottom")}
        </motion.figure>
      ))}

      {trailing && (
        <>
          <div aria-hidden className="mx-auto w-px self-stretch bg-ink/15" />
          <motion.figure variants={fadeUp}>
            {captionPosition === "top" && caption(trailing.caption, "top")}
            {trailing.node}
            {captionPosition === "bottom" && caption(trailing.caption, "bottom")}
          </motion.figure>
        </>
      )}
    </motion.div>
  );
}
