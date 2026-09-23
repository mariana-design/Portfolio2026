"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { easeEditorial } from "@/lib/motion";
import { phoneFrame } from "@/lib/mockup";

type Frame = { src: string; alt: string; width: number; height: number };

const FRAME_W = 200;

// Real screens, not a moving one: the actual billing flow — free plan at its limit, Premium active, Premium
// set to downgrade — crossfading in place. No pan, no float, nothing sliding around inside the frame.
export default function BillingPan({ visuals, className = "" }: { visuals: Frame[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setI((n) => (n + 1) % visuals.length), 2400);
    return () => clearTimeout(id);
  }, [inView, i, visuals.length]);

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
      {visuals.map((visual, n) => (
        <Image
          key={visual.src}
          src={visual.src}
          alt={n === i ? visual.alt : ""}
          width={visual.width}
          height={visual.height}
          sizes="220px"
          aria-hidden={n !== i}
          style={{ opacity: n === i ? 1 : 0, transition: "opacity 300ms ease-in-out" }}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      ))}
    </motion.div>
  );
}
