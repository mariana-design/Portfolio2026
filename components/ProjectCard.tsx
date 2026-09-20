"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, revealViewport } from "@/lib/motion";
import VisualPlaceholder from "./VisualPlaceholder";

type ProjectCardProps = {
  n: string;
  title: string;
  meta: string;
  href: string;
  featured?: boolean;
  className?: string;
};

export default function ProjectCard({ n, title, meta, href, featured = false, className = "" }: ProjectCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={fadeUp}
      className={className}
    >
      <Link href={href} className="group block">
        <div className="overflow-hidden rounded-lg transition-transform duration-500 ease-out group-hover:scale-[1.02]">
          <VisualPlaceholder label={`${title} preview`} className="aspect-auto! h-[22rem] md:h-[28rem]" />
        </div>
        <div className="mt-4 flex items-baseline gap-3">
          <span className="font-serif text-2xl italic text-accent-warm">{n}</span>
          <h3
            className={`font-display font-bold tracking-tight ${
              featured ? "text-4xl md:text-5xl" : "text-xl md:text-2xl"
            }`}
          >
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
