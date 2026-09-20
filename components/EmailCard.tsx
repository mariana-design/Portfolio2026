"use client";

import { motion } from "framer-motion";
import { fadeUp, revealViewport } from "@/lib/motion";

type EmailCardProps = {
  subject: string;
  from: string;
  to: string;
  body: string;
  className?: string;
};

export default function EmailCard({
  subject,
  from,
  to,
  body,
  className = "",
}: EmailCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={fadeUp}
      className={`rounded-lg border border-ink/10 bg-white/60 p-6 shadow-sm ${className}`}
    >
      <p className="font-display text-sm font-semibold">{subject}</p>
      <div className="mt-2 space-y-0.5 text-xs text-ink-soft">
        <p>From: {from}</p>
        <p>To: {to}</p>
      </div>
      <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink">
        {body}
      </p>
    </motion.div>
  );
}
