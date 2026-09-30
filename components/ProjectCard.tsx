"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, revealViewport } from "@/lib/motion";
import PhoneFrame from "./PhoneFrame";
import CoverVideo from "./CoverVideo";
import Stage from "./Stage";

export type CardMockup = { src: string; alt: string; locked?: boolean; video?: string; poster?: string; raw?: boolean };

type ProjectCardProps = {
  n: string;
  title: string;
  meta: string;
  href: string;
  mockups: CardMockup[];
  featured?: boolean;
  tone?: "light" | "dark";
  badge?: string;
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

export default function ProjectCard({ n, title, meta, href, mockups, featured = false, tone = "light", badge, className = "" }: ProjectCardProps) {
  const layout = layouts[mockups.length] ?? layouts[1];
  const soleVideo = mockups.length === 1 ? mockups[0].video : undefined;
  const soleRaw = mockups.length === 1 && mockups[0].raw ? mockups[0] : undefined;
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp} className={className}>
      <Link href={href} className="group relative block">
        {badge && (
          <span className="absolute right-4 top-4 z-10 rounded-full bg-paper px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-ink shadow-[0_2px_8px_rgba(20,20,20,0.15)]">
            {badge}
          </span>
        )}
        {soleVideo ? (
          // Raw cover video, no phone frame / tilt / stage gradient — shown exactly as delivered.
          <div className="relative h-[22rem] w-full overflow-hidden rounded-2xl bg-black md:h-[28rem]">
            <CoverVideo src={soleVideo} poster={mockups[0].poster} alt={mockups[0].alt} className="h-full w-full object-contain" />
          </div>
        ) : soleRaw ? (
          // Raw cover image, no phone frame / tilt / stage gradient — shown exactly as delivered.
          <div className="relative h-[22rem] w-full overflow-hidden rounded-2xl bg-black md:h-[28rem]">
            <Image src={soleRaw.src} alt={soleRaw.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        ) : (
          <Stage tone={tone} className="h-[22rem] items-start! justify-start! md:h-[28rem]">
            {mockups.map((m, i) => (
              <div key={m.src} className={`absolute transition-transform duration-500 ease-out ${layout[i].pos}`}>
                <PhoneFrame src={m.src} alt={m.alt} locked={m.locked} onDark={tone === "dark"} width={220} />
              </div>
            ))}
          </Stage>
        )}
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
