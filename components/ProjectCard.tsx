"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, revealViewport } from "@/lib/motion";
import PhoneFrame from "./PhoneFrame";
import Stage from "./Stage";

export type CardMockup = { src: string; alt: string; locked?: boolean };

type ProjectCardProps = {
  n: string;
  title: string;
  meta: string;
  href: string;
  mockups: CardMockup[];
  featured?: boolean;
  className?: string;
};

// Phones are placed, not centred: each sits at its own height and tilt, and the bottom edge of the stage crops them,
// the way a product shot is framed. On hover they lift a little.
const layouts: Record<number, { pos: string }[]> = {
  1: [{ pos: "left-1/2 top-12 -translate-x-1/2 rotate-[-2deg] group-hover:-translate-y-2" }],
  2: [
    { pos: "left-[32%] top-10 -translate-x-1/2 rotate-[-4deg] group-hover:-translate-y-2" },
    { pos: "left-[68%] top-20 -translate-x-1/2 rotate-[3deg] group-hover:-translate-y-3" },
  ],
};

export default function ProjectCard({ n, title, meta, href, mockups, featured = false, className = "" }: ProjectCardProps) {
  const layout = layouts[mockups.length] ?? layouts[1];
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp} className={className}>
      <Link href={href} className="group block">
        <Stage className="h-[22rem] items-start! justify-start! md:h-[28rem]">
          {mockups.map((m, i) => (
            <div key={m.src} className={`absolute transition-transform duration-500 ease-out ${layout[i].pos}`}>
              <PhoneFrame src={m.src} alt={m.alt} locked={m.locked} width={220} />
            </div>
          ))}
        </Stage>
        <div className="mt-5 flex items-baseline gap-3">
          <span className="font-serif text-2xl italic text-accent-warm">{n}</span>
          <h3 className={`font-display font-bold tracking-tight ${featured ? "text-4xl md:text-5xl" : "text-xl md:text-2xl"}`}>
            <span className="bg-gradient-to-r from-current to-current bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_2px]">
              {title}
            </span>
          </h3>
        </div>
        <p className="mt-1 text-sm text-ink-soft">{meta}</p>
      </Link>
    </motion.div>
  );
}
