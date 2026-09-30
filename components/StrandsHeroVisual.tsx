"use client";

import { motion } from "framer-motion";
import SketchPhone from "./SketchPhone";

// Sizing jumps at sm: (covers phone → tablet, ~640-1023px) and lg: (1024px+, full size) — deliberately not
// md:, since at exactly 768px the md: sizes plus container padding would overflow and clip the last phone.
const phones = [
  {
    w: "w-16 sm:w-24 lg:w-40",
    top: "top-6 sm:top-8 lg:top-6",
    rotate: "-rotate-6",
    seed: "phone-a",
    heroKind: "image" as const,
    annotations: [{ from: [195, 200] as [number, number], to: [166, 226] as [number, number], label: "state" }],
  },
  {
    w: "w-[4.5rem] sm:w-28 lg:w-44",
    top: "top-1 sm:top-2 lg:top-0",
    rotate: "-rotate-2",
    seed: "phone-b",
    annotations: [{ from: [196, 388] as [number, number], to: [160, 440] as [number, number], label: "CTA" }],
  },
  {
    w: "w-[4.5rem] sm:w-28 lg:w-44",
    top: "top-3 sm:top-4 lg:top-4",
    rotate: "rotate-2",
    seed: "phone-c",
    heroKind: "image" as const,
    annotations: [
      { from: [200, 258] as [number, number], to: [172, 270] as [number, number], label: "flow" },
      { from: [205, 100] as [number, number], to: [178, 92] as [number, number], label: "empty state" },
    ],
  },
  {
    w: "w-16 sm:w-24 lg:w-40",
    top: "top-8 sm:top-10 lg:top-10",
    rotate: "rotate-6",
    seed: "phone-d",
    annotations: [
      { from: [196, 20] as [number, number], to: [214, 34] as [number, number], label: "nav" },
      { from: [195, 442] as [number, number], to: [165, 458] as [number, number], label: "edge case" },
    ],
  },
];

// A longer connector between phone B and C — the two center screens are consistently the ones with the
// gap between them across breakpoints (flex justify-center), so a percentage-based arc reliably bridges
// them without needing pixel-perfect alignment to either phone's own internal SVG coordinates.
function JourneyConnector() {
  return (
    <motion.svg
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      viewBox="0 0 1000 450"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-10 hidden sm:block"
      fill="none"
      aria-hidden
    >
      <motion.path
        d="M 468 150 Q 500 110, 532 148"
        stroke="var(--accent-warm)"
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        variants={{
          hidden: { pathLength: 0 },
          visible: { pathLength: 1, transition: { duration: 0.6, delay: 2.4, ease: "easeInOut" } },
        }}
      />
      <motion.path
        d="M 524 140 L 533 148 L 521 154"
        stroke="var(--accent-warm)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { duration: 0.2, delay: 2.95 } },
        }}
      />
      <motion.text
        x={500}
        y={100}
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontStyle="italic"
        fontSize={17}
        fill="var(--accent-warm)"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.3, delay: 3.05 } },
        }}
      >
        next
      </motion.text>
    </motion.svg>
  );
}

// Strands showcase app, standing in: hand-drawn wireframe phones (structure only) since the real UI is under
// NDA — sketched, not a clean library mockup, so it reads as working wireframes rather than a placeholder.
// A designer's own notes sit on top: circled annotations, an image placeholder, a journey arrow between two
// screens, and a loose margin note — the mix of gray structure and orange annotation is active, in-progress
// work, not a finished mockup.
export default function StrandsHeroVisual() {
  return (
    <div className="relative flex aspect-[21/9] items-center justify-center gap-2 overflow-hidden bg-[radial-gradient(ellipse_at_50%_30%,#ffffff_0%,#ffffff_55%,#f4f4f3_100%)] px-4 text-ink sm:gap-4 sm:px-6 lg:gap-8">
      {phones.map((p, i) => (
        <div key={p.seed} className={`relative ${p.w} ${p.top} ${p.rotate}`}>
          <SketchPhone seed={p.seed} delay={i * 0.25} annotations={p.annotations} heroKind={p.heroKind} />
        </div>
      ))}

      <JourneyConnector />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4, delay: 3.3 }}
        className="pointer-events-none absolute bottom-3 left-4 -rotate-3 font-serif text-sm italic text-accent-warm/70 sm:bottom-4 sm:left-6"
      >
        tighten spacing?
      </motion.p>
    </div>
  );
}
