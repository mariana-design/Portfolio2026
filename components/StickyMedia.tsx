"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, revealViewport } from "@/lib/motion";

type StickyMediaProps = {
  media: ReactNode;
  /** Each block scrolls past the pinned media and reveals on its own. */
  blocks: ReactNode[];
  mediaSide?: "left" | "right";
  className?: string;
};

export default function StickyMedia({
  media,
  blocks,
  mediaSide = "left",
  className = "",
}: StickyMediaProps) {
  const mediaCol = (
    <div className="md:sticky md:top-0 md:flex md:h-screen md:items-center">
      {media}
    </div>
  );

  const textCol = (
    <div className="flex flex-col gap-[40vh] py-[20vh]">
      {blocks.map((block, i) => (
        <motion.div
          key={i}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={fadeUp}
        >
          {block}
        </motion.div>
      ))}
    </div>
  );

  return (
    <div
      className={`grid grid-cols-1 gap-8 px-6 md:grid-cols-2 md:gap-16 md:px-12 ${className}`}
    >
      {mediaSide === "left" ? (
        <>
          {mediaCol}
          {textCol}
        </>
      ) : (
        <>
          {textCol}
          {mediaCol}
        </>
      )}
    </div>
  );
}
