"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useSectionObserver } from "@/lib/section-observer";
import { fadeIn, revealViewport } from "@/lib/motion";

type HeroEntryProps = {
  rows: string[];
  cursorPhoto: string;
  scrollCue: string;
};

const DIRECTIONS: (1 | -1)[] = [-1, 1, -1];
// px/ms at normal speed.
const BASE_SPEED = 0.17;
// How much a row slows down while hovered (fraction of normal speed) — near-zero so the brake reads as a real stop.
const HOVER_FACTOR = 0.015;
// How quickly current speed eases toward its target (per-frame lerp) — higher = snappier brake/release.
const SPEED_EASE = 0.09;

function MarqueeRow({ text, direction }: { text: string; direction: 1 | -1 }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  const speed = useRef(1);
  const targetSpeed = useRef(1);
  const half = useRef(0);
  const lastT = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      half.current = track.scrollWidth / 2;
      if (direction === 1 && pos.current === 0) pos.current = -half.current;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    let raf = 0;
    const tick = (t: number) => {
      if (lastT.current == null) lastT.current = t;
      const dt = Math.min(t - lastT.current, 48);
      lastT.current = t;

      speed.current += (targetSpeed.current - speed.current) * SPEED_EASE;
      pos.current += direction * BASE_SPEED * dt * speed.current;

      const h = half.current;
      if (h > 0) {
        if (pos.current <= -h) pos.current += h;
        if (pos.current >= 0) pos.current -= h;
      }
      track.style.transform = `translate3d(${pos.current}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [direction]);

  const words = text.split(" ");
  const repeated = Array.from({ length: 6 }, () => words).flat();

  const renderWords = (dup: number) => (
    <span className="flex shrink-0">
      {repeated.map((w, i) => (
        <span
          key={`${dup}-${i}`}
          className="mr-[0.35em] inline-block transition-colors duration-150 hover:text-accent-warm"
        >
          {w}
        </span>
      ))}
    </span>
  );

  return (
    <div
      className="flex select-none overflow-hidden whitespace-nowrap py-1 md:py-2"
      onMouseEnter={() => (targetSpeed.current = HOVER_FACTOR)}
      onMouseLeave={() => (targetSpeed.current = 1)}
    >
      <div
        ref={trackRef}
        className="flex shrink-0 font-display text-[13vw] font-bold leading-none tracking-[-0.03em] text-ink md:text-[9vw]"
      >
        {renderWords(0)}
        {renderWords(1)}
      </div>
    </div>
  );
}

// Consecutive-mousemove speed (px/ms) above which the portrait starts glitching.
const GLITCH_VELOCITY = 1.1;
const GLITCH_HOLD_MS = 160;

export default function HeroEntry({ rows, cursorPhoto, scrollCue }: HeroEntryProps) {
  const ref = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const { register } = useSectionObserver();

  useEffect(() => {
    if (!ref.current) return;
    return register("top", ref.current, false);
  }, [register]);

  useEffect(() => {
    const section = ref.current;
    const photo = photoRef.current;
    if (!section || !photo) return;
    // No pointer to glitch off of on touch devices — skip entirely rather than relying on screen width.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let last: { x: number; y: number; t: number } | null = null;
    let glitchTimeout: ReturnType<typeof setTimeout> | null = null;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (last) {
        const dt = Math.max(now - last.t, 1);
        const dist = Math.hypot(e.clientX - last.x, e.clientY - last.y);
        if (dist / dt > GLITCH_VELOCITY) {
          photo.classList.add("is-glitching");
          if (glitchTimeout) clearTimeout(glitchTimeout);
          glitchTimeout = setTimeout(() => photo.classList.remove("is-glitching"), GLITCH_HOLD_MS);
        }
      }
      last = { x: e.clientX, y: e.clientY, t: now };
    };

    section.addEventListener("mousemove", onMove);
    return () => {
      section.removeEventListener("mousemove", onMove);
      if (glitchTimeout) clearTimeout(glitchTimeout);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-paper"
    >
      <div className="absolute inset-0 z-0 flex flex-col justify-center gap-4 md:gap-6">
        {rows.map((text, i) => (
          <MarqueeRow key={text} text={text} direction={DIRECTIONS[i % DIRECTIONS.length]} />
        ))}
      </div>

      <motion.div
        ref={photoRef}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={fadeIn}
        className="hero-cursor pointer-events-none absolute left-1/2 top-1/2 z-10 aspect-[573/900] w-[130px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md shadow-[0_12px_30px_-8px_rgba(20,20,20,0.4)] md:w-[150px]"
        style={{ "--cursor-bg": `url(${cursorPhoto})` } as React.CSSProperties}
      >
        <Image src={cursorPhoto} alt="Mariana Benítez" fill sizes="150px" className="object-cover grayscale contrast-125" priority />
      </motion.div>

      <p className="pointer-events-none absolute inset-x-0 bottom-10 z-10 flex flex-col items-center gap-2 text-xs tracking-wide text-ink-soft md:bottom-14">
        <span>{scrollCue}</span>
        <span className="animate-bounce-slow text-base">↓</span>
      </p>
    </section>
  );
}
