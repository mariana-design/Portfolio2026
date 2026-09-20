"use client";

import { motion } from "framer-motion";
import { easeEditorial } from "@/lib/motion";

type DiagramFlowProps = {
  steps: string[];
  className?: string;
  /** Smaller nodes and shorter arrows, for narrow columns. */
  compact?: boolean;
};

const SIZES = {
  regular: { nodeH: 46, gap: 44, pad: 6, charW: 7.4, minW: 72, padW: 36, font: 13, head: 5, minSvg: 520 },
  compact: { nodeH: 38, gap: 22, pad: 4, charW: 6.3, minW: 54, padW: 24, font: 11, head: 4, minSvg: 0 },
};

function seeded(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Wobbly, slightly overshooting ellipse, smoothed with Catmull-Rom so it reads as hand-drawn.
function sketchEllipse(cx: number, cy: number, rx: number, ry: number, seed: string) {
  const rnd = seeded(seed);
  const n = 12;
  const start = -Math.PI * 0.62;
  const sweep = Math.PI * 2 + 0.28;
  const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const a = start + (sweep * i) / n;
    const j = 1 + (rnd() - 0.5) * 0.07;
    const drift = i / n;
    pts.push([
      cx + Math.cos(a) * rx * j + drift * 1.6,
      cy + Math.sin(a) * ry * j + (rnd() - 0.5) * 1.4,
    ]);
  }
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

export default function DiagramFlow({ steps, className = "", compact = false }: DiagramFlowProps) {
  const { nodeH: NODE_H, gap: GAP, pad: PAD, charW, minW, padW, font, head, minSvg } = SIZES[compact ? "compact" : "regular"];
  const widths = steps.map((s) => Math.max(minW, s.length * charW + padW));
  const total = widths.reduce((a, b) => a + b, 0) + GAP * (steps.length - 1) + PAD * 2;
  const height = NODE_H + PAD * 2;
  const cy = height / 2;

  let x = PAD;
  const nodes = steps.map((label, i) => {
    const w = widths[i];
    const node = { label, cx: x + w / 2, left: x, right: x + w, w };
    x += w + GAP;
    return node;
  });

  return (
    <div className={`overflow-x-auto ${className}`}>
      <motion.svg
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        viewBox={`0 0 ${total} ${height}`}
        style={{ minWidth: Math.min(total, minSvg), maxWidth: total * 1.25 }}
        className="h-auto w-full"
        fill="none"
        role="img"
        aria-label={steps.join(", ")}
      >
        {nodes.map((n, i) => {
          const delay = i * 0.28;
          const next = nodes[i + 1];
          const y1 = cy + 1;
          const bend = (i % 2 === 0 ? -1 : 1) * 3;
          return (
            <g key={`${n.label}-${i}`}>
              <motion.path
                d={sketchEllipse(n.cx, cy, n.w / 2 - 2, NODE_H / 2 - 2, `${n.label}${i}`)}
                stroke="var(--accent-warm)"
                strokeWidth={1.5}
                strokeLinecap="round"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.7, delay, ease: easeEditorial } },
                }}
              />
              <motion.text
                x={n.cx}
                y={cy}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={font}
                fontWeight={500}
                fill="currentColor"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.4, delay: delay + 0.3 } },
                }}
              >
                {n.label}
              </motion.text>
              {next && (
                <motion.g
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { delay: delay + 0.55 } },
                  }}
                >
                  <motion.path
                    d={`M ${n.right + 1} ${y1} Q ${(n.right + next.left) / 2} ${y1 + bend} ${next.left - head} ${y1}`}
                    stroke="var(--accent-warm)"
                    strokeWidth={1.4}
                    strokeLinecap="round"
                    variants={{
                      hidden: { pathLength: 0 },
                      visible: { pathLength: 1, transition: { duration: 0.45, delay: delay + 0.55, ease: easeEditorial } },
                    }}
                  />
                  <path
                    d={`M ${next.left - head - 6} ${y1 - head} L ${next.left - head + 1} ${y1} L ${next.left - head - 6} ${y1 + head}`}
                    stroke="var(--accent-warm)"
                    strokeWidth={1.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.g>
              )}
            </g>
          );
        })}
      </motion.svg>
    </div>
  );
}
