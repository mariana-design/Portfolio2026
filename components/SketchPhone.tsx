"use client";

import { motion } from "framer-motion";

type Annotation = {
  /** [x, y] in the phone's local 240x492 space. */
  from: [number, number];
  to: [number, number];
  label: string;
  /** Which side of the arrowhead the label sits on. */
  labelSide?: "left" | "right";
};

type SketchPhoneProps = {
  seed: string;
  className?: string;
  delay?: number;
  annotations?: Annotation[];
  /** "image" swaps the plain hero card for an image-placeholder tile (frame + X). */
  heroKind?: "plain" | "image";
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

// Catmull-Rom smoothing through a point list — the wobble in the points (not the smoothing) is what
// reads as hand-drawn; this just keeps the wobble from looking jagged.
function smoothPath(pts: [number, number][], closed: boolean) {
  const n = pts.length;
  const get = (i: number) => pts[((i % n) + n) % n];
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  const end = closed ? n : n - 1;
  for (let i = 0; i < end; i++) {
    const p0 = closed ? get(i - 1) : (pts[i - 1] ?? pts[i]);
    const p1 = closed ? get(i) : pts[i];
    const p2 = closed ? get(i + 1) : (pts[i + 1] ?? pts[i]);
    const p3 = closed ? get(i + 2) : (pts[i + 2] ?? p2);
    const c1: [number, number] = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: [number, number] = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  if (closed) d += " Z";
  return d;
}

function jitter(rnd: () => number, amt: number) {
  return (rnd() - 0.5) * amt;
}

// Real arcs for the corners — always perfectly smooth/round, like an actual device bezel, never a spike —
// with only the straight edges given a very slight hand-drawn bow (a shallow quadratic, offset perpendicular
// to the edge by a couple px). Each corner's radius is jittered independently, which reads as hand-drawn
// without ever risking the corner geometry itself: an arc can't overshoot the way a spline through jittered
// points can.
function sketchRect(x: number, y: number, w: number, h: number, r: number, seed: string, amt = 1.7) {
  const rnd = seeded(seed);
  const rMax = Math.min(w, h) / 2 - 1;
  const cornerR = () => Math.max(3, Math.min(rMax, r + jitter(rnd, 3)));
  const [rTL, rTR, rBR, rBL] = [cornerR(), cornerR(), cornerR(), cornerR()];

  const bow = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;
    const off = jitter(rnd, amt);
    const cx = (x1 + x2) / 2 + (-dy / len) * off;
    const cy = (y1 + y2) / 2 + (dx / len) * off;
    return `Q ${cx.toFixed(1)} ${cy.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  };

  const p0: [number, number] = [x + rTL, y];
  const p1: [number, number] = [x + w - rTR, y];
  const p2: [number, number] = [x + w, y + rTR];
  const p3: [number, number] = [x + w, y + h - rBR];
  const p4: [number, number] = [x + w - rBR, y + h];
  const p5: [number, number] = [x + rBL, y + h];
  const p6: [number, number] = [x, y + h - rBL];
  const p7: [number, number] = [x, y + rTL];

  return [
    `M ${p0[0].toFixed(1)} ${p0[1].toFixed(1)}`,
    bow(...p0, ...p1),
    `A ${rTR.toFixed(1)} ${rTR.toFixed(1)} 0 0 1 ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`,
    bow(...p2, ...p3),
    `A ${rBR.toFixed(1)} ${rBR.toFixed(1)} 0 0 1 ${p4[0].toFixed(1)} ${p4[1].toFixed(1)}`,
    bow(...p4, ...p5),
    `A ${rBL.toFixed(1)} ${rBL.toFixed(1)} 0 0 1 ${p6[0].toFixed(1)} ${p6[1].toFixed(1)}`,
    bow(...p6, ...p7),
    `A ${rTL.toFixed(1)} ${rTL.toFixed(1)} 0 0 1 ${p0[0].toFixed(1)} ${p0[1].toFixed(1)}`,
    "Z",
  ].join(" ");
}

// A wireframe image tile: frame + a big hand-drawn X, the classic "image goes here" marker.
function sketchImagePlaceholder(x: number, y: number, w: number, h: number, r: number, seed: string) {
  const frame = sketchRect(x, y, w, h, r, `${seed}-frame`, 1.4);
  const pad = Math.min(w, h) * 0.16;
  const x1 = sketchLine(x + pad, y + pad, x + w - pad, y + h - pad, `${seed}-x1`, 2);
  const x2 = sketchLine(x + w - pad, y + pad, x + pad, y + h - pad, `${seed}-x2`, 2);
  return { frame, x1, x2 };
}

function sketchLine(x1: number, y1: number, x2: number, y2: number, seed: string, amt = 1.3) {
  const rnd = seeded(seed);
  const mx = (x1 + x2) / 2 + jitter(rnd, amt);
  const my = (y1 + y2) / 2 + jitter(rnd, amt);
  return smoothPath([[x1, y1], [mx, my], [x2, y2]], false);
}

// Shaft (wobbly, like the other sketch primitives) plus a small hand-drawn chevron head at the target end.
function sketchArrow(x1: number, y1: number, x2: number, y2: number, seed: string) {
  const rnd = seeded(seed);
  const shaft = sketchLine(x1, y1, x2, y2, `${seed}-shaft`, 3);
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const headLen = 9 + jitter(rnd, 2);
  const spread = 0.5 + jitter(rnd, 0.12);
  const back1 = [x2 - Math.cos(angle - spread) * headLen, y2 - Math.sin(angle - spread) * headLen];
  const back2 = [x2 - Math.cos(angle + spread) * headLen, y2 - Math.sin(angle + spread) * headLen];
  const head = `M ${back1[0].toFixed(1)} ${back1[1].toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)} L ${back2[0].toFixed(1)} ${back2[1].toFixed(1)}`;
  return { shaft, head };
}

// Wobbly ellipse sized to loosely wrap a text label — the "circled note" gesture.
function sketchOval(cx: number, cy: number, rx: number, ry: number, seed: string) {
  const rnd = seeded(seed);
  const n = 11;
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = (Math.PI * 2 * i) / n;
    const j = 1 + (rnd() - 0.5) * 0.16;
    pts.push([cx + Math.cos(a) * rx * j, cy + Math.sin(a) * ry * j]);
  }
  return smoothPath(pts, true);
}

function sketchCircle(cx: number, cy: number, r: number, seed: string) {
  const rnd = seeded(seed);
  const n = 9;
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = (Math.PI * 2 * i) / n;
    const j = 1 + (rnd() - 0.5) * 0.14;
    pts.push([cx + Math.cos(a) * r * j, cy + Math.sin(a) * r * j]);
  }
  return smoothPath(pts, true);
}

const W = 240;
const H = 492;

// Structure only — a savings-app-shaped skeleton (header, hero card, two actions, a list, a button) with
// no real copy, drawn as if sketched by hand rather than laid out in a design tool. The real Strands UI is
// under NDA, so this stands in for it as an intentional wireframe, not a blurred screenshot.
//
// The draw-on is a real trace, not a fade: each path animates pathLength 0→1 (Motion's SVG pathLength is
// stroke-dasharray/stroke-dashoffset under the hood) with opacity held constant, so the line is only ever
// visible where the stroke has actually reached — like watching it get drawn, not watching it materialize.
export default function SketchPhone({ seed, className = "", delay = 0, annotations = [], heroKind = "plain" }: SketchPhoneProps) {
  const ink = "var(--ink)";
  const accent = "var(--accent-warm)";

  const heroShapes: { d: string; opacity: number; sw: number }[] =
    heroKind === "image"
      ? (() => {
          const { frame, x1, x2 } = sketchImagePlaceholder(22, 56, W - 44, 72, 8, `${seed}-hero`);
          return [
            { d: frame, opacity: 0.4, sw: 2 },
            { d: x1, opacity: 0.22, sw: 1.4 },
            { d: x2, opacity: 0.22, sw: 1.4 },
          ];
        })()
      : [{ d: sketchRect(22, 56, W - 44, 72, 12, `${seed}-hero`), opacity: 0.4, sw: 2 }];

  const shapes: { d: string; fill?: boolean; opacity: number; sw: number }[] = [
    { d: sketchRect(6, 6, W - 12, H - 12, 30, `${seed}-body`, 1.2), opacity: 0.55, sw: 2.2 },
    { d: sketchLine(26, 34, 66, 34, `${seed}-h1`), opacity: 0.35, sw: 3 },
    { d: sketchCircle(W - 30, 34, 8, `${seed}-avatar`), opacity: 0.35, sw: 2 },
    ...heroShapes,
    { d: sketchRect(22, 140, 92, 36, 10, `${seed}-btn1`), opacity: 0.3, sw: 1.8 },
    { d: sketchRect(126, 140, 92, 36, 10, `${seed}-btn2`), opacity: 0.3, sw: 1.8 },
    { d: sketchLine(22, 196, 96, 196, `${seed}-label`), opacity: 0.3, sw: 2.5 },

    { d: sketchCircle(38, 226, 12, `${seed}-r1a`), opacity: 0.32, sw: 1.8 },
    { d: sketchLine(58, 220, 168, 220, `${seed}-r1b`), opacity: 0.32, sw: 2.4 },
    { d: sketchLine(58, 233, 118, 233, `${seed}-r1c`), opacity: 0.24, sw: 2.4 },

    { d: sketchCircle(38, 274, 12, `${seed}-r2a`), opacity: 0.32, sw: 1.8 },
    { d: sketchLine(58, 268, 178, 268, `${seed}-r2b`), opacity: 0.32, sw: 2.4 },
    { d: sketchLine(58, 281, 108, 281, `${seed}-r2c`), opacity: 0.24, sw: 2.4 },

    { d: sketchCircle(38, 322, 12, `${seed}-r3a`), opacity: 0.32, sw: 1.8 },
    { d: sketchLine(58, 316, 158, 316, `${seed}-r3b`), opacity: 0.32, sw: 2.4 },
    { d: sketchLine(58, 329, 128, 329, `${seed}-r3c`), opacity: 0.24, sw: 2.4 },

    { d: sketchRect(22, H - 62, W - 44, 34, 17, `${seed}-cta`), opacity: 0.4, sw: 2 },
  ];

  // Arrows draw in last, after the structure — as if the designer sketched the screen first, then came
  // back to annotate it. Drawn slower than the structural lines so each one reads as a distinct gesture.
  const structureEnd = delay + shapes.length * 0.055 + 0.3;
  const arrows = annotations.map((a, i) => {
    const { shaft, head } = sketchArrow(a.from[0], a.from[1], a.to[0], a.to[1], `${seed}-arrow${i}`);
    const arrowDelay = structureEnd + i * 0.35;
    const side = a.labelSide ?? (a.to[0] > W / 2 ? "right" : "left");
    const bubbleCx = a.from[0] + (side === "right" ? 6 : -6) + (side === "right" ? a.label.length * 2.6 : -a.label.length * 2.6);
    const bubble = sketchOval(bubbleCx, a.from[1] - 1, a.label.length * 3.6 + 6, 10, `${seed}-bubble${i}`);
    return { shaft, head, bubble, label: a.label, delay: arrowDelay, from: a.from, side };
  });

  return (
    <motion.svg
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      viewBox={`0 0 ${W} ${H}`}
      className={`h-auto w-full overflow-visible ${className}`}
      fill="none"
      role="img"
      aria-label="Wireframe sketch of an app screen — structure only, no real content"
    >
      {shapes.map((s, i) => (
        <motion.path
          key={i}
          d={s.d}
          stroke={ink}
          strokeWidth={s.sw}
          strokeLinecap="round"
          strokeOpacity={s.opacity}
          variants={{
            hidden: { pathLength: 0 },
            visible: {
              pathLength: 1,
              transition: { duration: 0.7 + i * 0.02, delay: delay + i * 0.055, ease: "easeInOut" },
            },
          }}
        />
      ))}

      {arrows.map((a, i) => (
        <g key={`arrow-${i}`}>
          <motion.path
            d={a.shaft}
            stroke={accent}
            strokeWidth={2}
            strokeLinecap="round"
            variants={{
              hidden: { pathLength: 0 },
              visible: { pathLength: 1, transition: { duration: 0.5, delay: a.delay, ease: "easeInOut" } },
            }}
          />
          <motion.path
            d={a.head}
            stroke={accent}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: { pathLength: 1, opacity: 1, transition: { duration: 0.2, delay: a.delay + 0.5 } },
            }}
          />
          <motion.text
            x={a.from[0] + (a.side === "right" ? 6 : -6)}
            y={a.from[1] + 4}
            textAnchor={a.side === "right" ? "start" : "end"}
            fontFamily="var(--font-serif)"
            fontStyle="italic"
            fontSize={15}
            fill={accent}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.3, delay: a.delay + 0.6 } },
            }}
          >
            {a.label}
          </motion.text>
          <motion.path
            d={a.bubble}
            stroke={accent}
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeOpacity={0.6}
            variants={{
              hidden: { pathLength: 0 },
              visible: { pathLength: 1, transition: { duration: 0.5, delay: a.delay + 0.75, ease: "easeInOut" } },
            }}
          />
        </g>
      ))}
    </motion.svg>
  );
}
