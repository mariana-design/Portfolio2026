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
  /** Frosted-glass overlay + lock icon for interfaces under NDA; eases up a little on hover, never fully sharp. */
  locked?: boolean;
  className?: string;
};

// Decorative silent loop: screens crossfade inside a simple phone frame. No controls, not interactive.
export default function ScreenLoop({ frames, alt, dwell = 1800, fade = 400, locked = false, className = "" }: ScreenLoopProps) {
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
      className={`group relative aspect-[480/984] w-full select-none overflow-hidden rounded-[1.6rem] border-[5px] border-ink bg-white shadow-[0_18px_40px_-18px_rgba(0,0,0,0.4)] ${locked ? "cursor-default" : "pointer-events-none"} ${className}`}
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

      {locked && (
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-white/[0.06] backdrop-blur-[3px] transition-[backdrop-filter] duration-300 ease-out group-hover:backdrop-blur-[2px]"
          />
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            className="absolute right-2 top-2 h-[18px] w-[18px] rounded-full bg-white/50 p-[3px] text-ink/60 opacity-70 transition-opacity duration-300 ease-out group-hover:opacity-100"
          >
            <rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </>
      )}
    </div>
  );
}
