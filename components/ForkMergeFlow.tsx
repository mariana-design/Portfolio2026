"use client";

import { motion } from "framer-motion";
import { easeEditorial } from "@/lib/motion";

type Step = { label: string; sub?: string };

type ForkMergeFlowProps = {
  linear: string[];
  holdLabel: string;
  holdSub: string;
  askLabel: string;
  askSub: string;
  mergeLabel: string;
  returnLabel: string;
  agreementLabel: string;
  dark?: boolean;
  className?: string;
};

const pillCls = (dark: boolean, accent = false) =>
  `inline-flex flex-col items-start rounded-lg border px-3.5 py-2 text-left ${
    accent
      ? "border-accent-warm bg-accent-warm/10"
      : dark
        ? "border-ink-dark/25 bg-ink-dark/[0.05]"
        : "border-ink/15 bg-ink/[0.02]"
  }`;

const Pill = ({ step, dark, accent, delay }: { step: Step; dark: boolean; accent?: boolean; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.4, delay, ease: easeEditorial }}
    className={pillCls(dark, accent)}
  >
    <span className={`text-[13px] font-semibold ${accent ? "text-accent-warm" : dark ? "text-ink-dark" : "text-ink"}`}>{step.label}</span>
    {step.sub && <span className={`mt-0.5 text-[11px] ${dark ? "text-ink-dark/55" : "text-ink-soft"}`}>{step.sub}</span>}
  </motion.div>
);

const SimplePill = ({ label, dark, delay }: { label: string; dark: boolean; delay: number }) => (
  <motion.span
    initial={{ opacity: 0, y: 6 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ duration: 0.4, delay, ease: easeEditorial }}
    className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium ${
      dark ? "border-ink-dark/25 bg-ink-dark/[0.05] text-ink-dark" : "border-ink/15 bg-ink/[0.02] text-ink"
    }`}
  >
    {label}
  </motion.span>
);

const RightArrow = ({ delay }: { delay: number }) => (
  <motion.svg viewBox="0 0 20 12" className="h-3 w-5 shrink-0" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }}>
    <motion.path
      d="M1 6 L17 6 M12 1 L17 6 L12 11"
      stroke="var(--accent-warm)"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 0.3, delay, ease: easeEditorial } } }}
    />
  </motion.svg>
);

// A real fork: after "Guest rejects", the path splits into two things happening at once — Darma stalling the
// guest (a side note, going nowhere else) and Darma checking with the organizer. Only the organizer branch
// carries the negotiation forward, so only that line continues down into the rest of the flow.
export default function ForkMergeFlow({ linear, holdLabel, holdSub, askLabel, askSub, mergeLabel, returnLabel, agreementLabel, dark = false, className = "" }: ForkMergeFlowProps) {
  const line = dark ? "rgba(242,240,236,0.35)" : "rgba(26,26,26,0.25)";

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
        {linear.map((step, i) => (
          <SimplePill key={step} label={step} dark={dark} delay={i * 0.15} />
        ))}
      </div>

      {/* Fork: one line splitting into two. */}
      <motion.svg viewBox="0 0 300 48" preserveAspectRatio="none" className="h-10 w-full max-w-[280px]" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }}>
        <motion.path
          d="M 150 0 C 150 22, 55 26, 55 46"
          stroke={line}
          strokeWidth={2}
          strokeLinecap="round"
          fill="none"
          variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 0.45, delay: 0.5, ease: easeEditorial } } }}
        />
        <motion.path
          d="M 150 0 C 150 22, 245 26, 245 46"
          stroke={line}
          strokeWidth={2}
          strokeLinecap="round"
          fill="none"
          variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 0.45, delay: 0.5, ease: easeEditorial } } }}
        />
      </motion.svg>

      <div className="grid max-w-[280px] grid-cols-2 gap-3">
        <Pill step={{ label: holdLabel, sub: holdSub }} dark={dark} delay={0.85} />
        <Pill step={{ label: askLabel, sub: askSub }} dark={dark} accent delay={0.95} />
      </div>

      {/* Only the organizer branch continues — the guest-hold note is a dead end, so no line comes out of it. */}
      <motion.svg viewBox="0 0 300 48" preserveAspectRatio="none" className="h-10 w-full max-w-[280px]" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }}>
        <motion.path
          d="M 245 0 C 245 24, 55 22, 55 46"
          stroke="var(--accent-warm)"
          strokeWidth={2}
          strokeLinecap="round"
          fill="none"
          variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5, delay: 1.45, ease: easeEditorial } } }}
        />
        <motion.path
          d="M 49 40 L 55 47 L 61 40"
          stroke="var(--accent-warm)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 1.9 } } }}
        />
      </motion.svg>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
        <SimplePill label={mergeLabel} dark={dark} delay={2.0} />
        <RightArrow delay={2.35} />
        <SimplePill label={returnLabel} dark={dark} delay={2.45} />
        <RightArrow delay={2.8} />
        <SimplePill label={agreementLabel} dark={dark} delay={2.9} />
      </div>
    </div>
  );
}
