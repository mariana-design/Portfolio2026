"use client";

import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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
  `inline-flex flex-col items-start rounded-lg border px-3.5 py-1 text-left ${
    accent
      ? "border-accent-warm bg-accent-warm/10"
      : dark
        ? "border-ink-dark/25 bg-ink-dark/[0.05]"
        : "border-ink/15 bg-ink/[0.02]"
  }`;

const Pill = forwardRef<HTMLDivElement, { step: Step; dark: boolean; accent?: boolean; delay: number }>(
  ({ step, dark, accent, delay }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4, delay, ease: easeEditorial }}
      className={pillCls(dark, accent)}
    >
      <span className={`text-[13px] font-semibold ${accent ? "text-accent-warm" : dark ? "text-ink-dark" : "text-ink"}`}>{step.label}</span>
      {step.sub && <span className={`mt-0.5 text-[11px] ${dark ? "text-ink-dark/55" : "text-ink-soft"}`}>{step.sub}</span>}
    </motion.div>
  ),
);
Pill.displayName = "Pill";

const SimplePill = forwardRef<HTMLSpanElement, { label: string; dark: boolean; delay: number }>(
  ({ label, dark, delay }, ref) => (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.4, delay, ease: easeEditorial }}
      className={`inline-flex items-center rounded-full border px-3.5 py-1 text-sm font-medium ${
        dark ? "border-ink-dark/25 bg-ink-dark/[0.05] text-ink-dark" : "border-ink/15 bg-ink/[0.02] text-ink"
      }`}
    >
      {label}
    </motion.span>
  ),
);
SimplePill.displayName = "SimplePill";

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

type Anchor = { el: HTMLElement | null; side: "top" | "bottom" };
type ConnectorDef = { from: Anchor; to: Anchor; color: string; delay: number };
type ConnectorGeo = { d: string; ax: number; ay: number; color: string; delay: number };

// An orthogonal "elbow" connector — drop, turn, cross, turn, drop — with rounded corners, built from measured
// DOM positions so it holds at any reflow instead of a fixed coordinate grid. A smooth S-curve looks fine when
// the source and target are roughly stacked, but once the row above reflows to one line the source can end up
// far to one side with barely any vertical room, and a curve stretched that flat just reads as a crooked
// diagonal. Routing it as two clean right-angle turns keeps it reading as a tidy flowchart line at any ratio.
function flowCurve(sx: number, sy: number, tx: number, ty: number) {
  const dir = tx > sx ? 1 : tx < sx ? -1 : 0;
  if (dir === 0) return `M ${sx.toFixed(1)} ${sy.toFixed(1)} L ${tx.toFixed(1)} ${ty.toFixed(1)}`;
  const my = sy + (ty - sy) * 0.5;
  const r = Math.max(0, Math.min(10, (ty - sy) / 2 - 1, Math.abs(tx - sx) / 2));
  if (r < 1) return `M ${sx.toFixed(1)} ${sy.toFixed(1)} C ${sx.toFixed(1)} ${my.toFixed(1)}, ${tx.toFixed(1)} ${my.toFixed(1)}, ${tx.toFixed(1)} ${ty.toFixed(1)}`;
  const p = (n: number) => n.toFixed(1);
  return (
    `M ${p(sx)} ${p(sy)} L ${p(sx)} ${p(my - r)} ` +
    `Q ${p(sx)} ${p(my)} ${p(sx + r * dir)} ${p(my)} ` +
    `L ${p(tx - r * dir)} ${p(my)} ` +
    `Q ${p(tx)} ${p(my)} ${p(tx)} ${p(my + r)} ` +
    `L ${p(tx)} ${p(ty)}`
  );
}

function measure(defs: ConnectorDef[], container: HTMLElement): ConnectorGeo[] {
  const cRect = container.getBoundingClientRect();
  const geos: ConnectorGeo[] = [];
  for (const { from, to, color, delay } of defs) {
    if (!from.el || !to.el) continue;
    const fr = from.el.getBoundingClientRect();
    const tr = to.el.getBoundingClientRect();
    const sx = fr.left + fr.width / 2 - cRect.left;
    const sy = (from.side === "top" ? fr.top : fr.bottom) - cRect.top;
    const tx = tr.left + tr.width / 2 - cRect.left;
    const ty = (to.side === "top" ? tr.top : tr.bottom) - cRect.top;
    geos.push({ d: flowCurve(sx, sy, tx, ty), ax: tx, ay: ty, color, delay });
  }
  return geos;
}

// Real fork: after "Guest rejects", the path splits into two things happening at once — Darma stalling the
// guest (a dead end) and Darma checking with the organizer. Only the organizer branch carries the negotiation
// forward. All connectors below are drawn from measured element positions (via ResizeObserver), not fixed
// coordinates, so the diagram holds together at any width once the flex rows reflow.
export default function ForkMergeFlow({ linear, holdLabel, holdSub, askLabel, askSub, mergeLabel, returnLabel, agreementLabel, dark = false, className = "" }: ForkMergeFlowProps) {
  const line = dark ? "rgba(242,240,236,0.35)" : "rgba(26,26,26,0.25)";
  const accent = "var(--accent-warm)";

  const lead = linear.slice(0, -2);
  const lastLead = linear[linear.length - 2];
  const rejects = linear[linear.length - 1];

  const containerRef = useRef<HTMLDivElement>(null);
  const leadLastRef = useRef<HTMLSpanElement>(null);
  const lastLeadRef = useRef<HTMLSpanElement>(null);
  const rejectsRef = useRef<HTMLSpanElement>(null);
  const holdRef = useRef<HTMLDivElement>(null);
  const askRef = useRef<HTMLDivElement>(null);
  const mergeRef = useRef<HTMLSpanElement>(null);

  const [geo, setGeo] = useState<ConnectorGeo[]>([]);
  const [ready, setReady] = useState(false);
  const inView = useInView(containerRef, { once: true, amount: 0.4 });
  const playedRef = useRef(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const recompute = () => {
      const defs: ConnectorDef[] = [
        { from: { el: leadLastRef.current, side: "bottom" }, to: { el: lastLeadRef.current, side: "top" }, color: line, delay: 0.9 },
        { from: { el: lastLeadRef.current, side: "bottom" }, to: { el: rejectsRef.current, side: "top" }, color: line, delay: 1.15 },
        { from: { el: rejectsRef.current, side: "bottom" }, to: { el: holdRef.current, side: "top" }, color: line, delay: 1.5 },
        { from: { el: rejectsRef.current, side: "bottom" }, to: { el: askRef.current, side: "top" }, color: line, delay: 1.5 },
        { from: { el: askRef.current, side: "bottom" }, to: { el: mergeRef.current, side: "top" }, color: accent, delay: 2.45 },
      ];
      setGeo(measure(defs, container));
      setReady(true);
    };

    recompute();
    // Pills animate in with a y-offset (framer-motion's initial y:6/8 → 0), which shifts their measured
    // position but doesn't trigger ResizeObserver (transform, not layout). Re-measure a few times while that
    // settles so arrow tips land exactly on the resting edge instead of the pre-animation position.
    const settleTimers = [120, 350, 700, 1200, 2000, 3000, 4200, 5500].map((ms) => setTimeout(recompute, ms));
    const ro = new ResizeObserver(recompute);
    ro.observe(container);
    window.addEventListener("resize", recompute);
    return () => {
      settleTimers.forEach(clearTimeout);
      ro.disconnect();
      window.removeEventListener("resize", recompute);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linear, holdLabel, askLabel, mergeLabel]);

  if (ready && inView) playedRef.current = true;
  const animate = playedRef.current;
  const svgSize = containerRef.current ? { w: containerRef.current.clientWidth, h: containerRef.current.clientHeight } : { w: 0, h: 0 };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" width={svgSize.w} height={svgSize.h}>
        {geo.map((g, i) => (
          <g key={i}>
            <motion.path
              d={g.d}
              stroke={g.color}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={animate ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.45, delay: g.delay, ease: easeEditorial }}
            />
            <motion.path
              d={`M ${(g.ax - 6).toFixed(1)} ${(g.ay - 7).toFixed(1)} L ${g.ax.toFixed(1)} ${g.ay.toFixed(1)} L ${(g.ax + 6).toFixed(1)} ${(g.ay - 7).toFixed(1)}`}
              stroke={g.color}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ opacity: 0 }}
              animate={animate ? { opacity: 1 } : {}}
              transition={{ delay: g.delay + 0.4 }}
            />
          </g>
        ))}
      </svg>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
        {lead.map((step, i) => (
          <span key={step} className="flex items-center gap-2">
            {i > 0 && <RightArrow delay={i * 0.2} />}
            <SimplePill ref={i === lead.length - 1 ? leadLastRef : undefined} label={step} dark={dark} delay={i * 0.2} />
          </span>
        ))}
      </div>

      {/* Spacer: gives the measured connector room to draw between the lead row and the steps below. */}
      <div className="h-14" aria-hidden />

      {/* Narrow, left-anchored column: keeps "Guest rejects" centred directly over the hold/ask fork below
          it, so the fork and merge connectors stay short and symmetric instead of sweeping across the
          full panel width. */}
      <div className="flex max-w-[280px] justify-center">
        <SimplePill ref={lastLeadRef} label={lastLead} dark={dark} delay={lead.length * 0.2 + 0.2} />
      </div>

      <div className="h-7" aria-hidden />

      <div className="flex max-w-[280px] justify-center">
        <SimplePill ref={rejectsRef} label={rejects} dark={dark} delay={lead.length * 0.2 + 0.6} />
      </div>

      <div className="h-8" aria-hidden />

      <div className="grid max-w-[280px] grid-cols-2 gap-2">
        <Pill ref={holdRef} step={{ label: holdLabel, sub: holdSub }} dark={dark} delay={1.85} />
        <Pill ref={askRef} step={{ label: askLabel, sub: askSub }} dark={dark} accent delay={1.95} />
      </div>

      <div className="h-8" aria-hidden />

      <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
        <SimplePill ref={mergeRef} label={mergeLabel} dark={dark} delay={3.0} />
        <RightArrow delay={3.35} />
        <SimplePill label={returnLabel} dark={dark} delay={3.45} />
        <RightArrow delay={3.8} />
        <SimplePill label={agreementLabel} dark={dark} delay={3.9} />
      </div>
    </div>
  );
}
