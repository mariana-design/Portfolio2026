"use client";

import { motion } from "framer-motion";
import { fadeIn, revealViewport } from "@/lib/motion";

type VisualPlaceholderProps = {
  label: string;
  aspect?: "video" | "square" | "wide";
  dark?: boolean;
  className?: string;
};

const aspectClass: Record<NonNullable<VisualPlaceholderProps["aspect"]>, string> = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
};

export default function VisualPlaceholder({
  label,
  aspect = "video",
  dark = false,
  className = "",
}: VisualPlaceholderProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={fadeIn}
      className={`flex items-center justify-center rounded-lg border border-dashed p-6 text-center text-sm ${
        dark
          ? "border-ink-dark/20 bg-ink-dark/[0.06] text-ink-dark/70"
          : "border-ink/20 bg-ink/[0.03] text-ink-soft"
      } ${aspectClass[aspect]} ${className}`}
    >
      (visual: {label})
    </motion.div>
  );
}
