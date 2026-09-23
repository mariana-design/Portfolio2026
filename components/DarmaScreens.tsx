"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { easeEditorial } from "@/lib/motion";
import { phoneFrame } from "@/lib/mockup";
import TapCursor from "./TapCursor";

type Frame = { src: string; alt: string; width: number; height: number };

type DarmaScreensProps = {
  ios: Frame;
  web: Frame;
  className?: string;
};

// Real screens, not screenshots sitting static: a small cursor taps through the real option rows and lands on
// the real confirm / progress element, in both frames — the actual "resolving an overlap" interaction, in
// Darma's own blue. No fabricated second screen, no colour block sitting on top — just the one real capture.
const IOS_STOPS = [
  { x: 7.1, y: 25.7 },
  { x: 7.1, y: 34.2 },
  { x: 7.1, y: 42.6 },
  { x: 7.1, y: 51.0 },
  { x: 50, y: 97.9 },
];

const WEB_STOPS = [
  { x: 37.3, y: 26.8 },
  { x: 37.3, y: 40.6 },
  { x: 50, y: 56.2 },
];

export default function DarmaScreens({ ios, web, className = "" }: DarmaScreensProps) {
  return (
    <div className={`grid grid-cols-[180px_1fr] items-end gap-x-8 gap-y-2 ${className}`} style={{ gridTemplateRows: "auto auto" }}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: easeEditorial }}
        className={`relative mx-auto self-end bg-white ${phoneFrame}`}
        style={{ width: 180, gridColumn: 1, gridRow: 1 }}
      >
        <Image src={ios.src} alt={ios.alt} width={ios.width} height={ios.height} sizes="240px" className="h-full w-full object-cover object-top" />
        <TapCursor stops={IOS_STOPS} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, delay: 0.1, ease: easeEditorial }}
        className="relative max-w-[440px] self-end overflow-hidden rounded-lg border border-ink/10 bg-white shadow-[0_1px_2px_rgba(30,20,10,0.08),0_18px_34px_-16px_rgba(30,20,10,0.28)]"
        style={{ gridColumn: 2, gridRow: 1 }}
      >
        <div className="flex items-center gap-1.5 border-b border-ink/10 bg-ink/[0.03] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
        </div>
        <div className="relative">
          <Image src={web.src} alt={web.alt} width={web.width} height={web.height} sizes="600px" className="h-auto w-full" />
          <TapCursor stops={WEB_STOPS} />
        </div>
      </motion.div>

      <p className="self-start whitespace-nowrap text-center text-[10px] font-medium uppercase tracking-wide text-ink-soft" style={{ gridColumn: 1, gridRow: 2 }}>
        iOS — resolving an overlap
      </p>
      <p className="self-start whitespace-nowrap text-[10px] font-medium uppercase tracking-wide text-ink-soft" style={{ gridColumn: 2, gridRow: 2 }}>
        Web app — resolving an overlap
      </p>
    </div>
  );
}
