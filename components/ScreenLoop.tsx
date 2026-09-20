"use client";

import Image from "next/image";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type ScreenLoopProps = {
  frames: string[];
  alt: string;
  /** Time each screen stays visible, in ms. */
  dwell?: number;
  /** Crossfade between screens, in ms. */
  fade?: number;
  className?: string;
};

// Decorative silent loop: screens crossfade inside a simple phone frame. No controls, not interactive.
export default function ScreenLoop({ frames, alt, dwell = 1800, fade = 400, className = "" }: ScreenLoopProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [i, setI] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!inView || reduced) return;
    const id = setInterval(() => setI((n) => (n + 1) % frames.length), dwell);
    return () => clearInterval(id);
  }, [inView, reduced, dwell, frames.length]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={alt}
      className={`pointer-events-none relative aspect-[480/984] w-full select-none overflow-hidden rounded-[1.6rem] border-[5px] border-ink bg-white shadow-[0_18px_40px_-18px_rgba(0,0,0,0.4)] ${className}`}
    >
      {frames.map((src, n) => (
        <Image
          key={src}
          src={src}
          alt=""
          width={480}
          height={984}
          sizes="200px"
          aria-hidden
          style={{ opacity: n === i ? 1 : 0, transition: `opacity ${fade}ms ease-in-out` }}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      ))}
    </div>
  );
}
