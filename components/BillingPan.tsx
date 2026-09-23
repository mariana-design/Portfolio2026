"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easeEditorial } from "@/lib/motion";
import { phoneFrame } from "@/lib/mockup";

type Frame = { src: string; alt: string; width: number; height: number };

const FRAME_W = 200;

// The real screenshot at its real proportions — full width, nothing cropped off the sides, nothing escaping the
// frame. It settles in, then breathes gently while in view: a small, honest sign of life instead of a pan that
// would have to zoom past the screen's own edges to find room to move, cutting into real text to do it.
export default function BillingPan({ visual, className = "" }: { visual: Frame; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: easeEditorial }}
      style={{ width: FRAME_W }}
      className={`relative bg-white ${phoneFrame} ${className}`}
    >
      <motion.div
        animate={inView ? { y: [0, -6, 0] } : { y: 0 }}
        transition={inView ? { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 } : { duration: 0 }}
      >
        <Image src={visual.src} alt={visual.alt} width={visual.width} height={visual.height} sizes="220px" className="h-auto w-full" />
      </motion.div>
    </motion.div>
  );
}
