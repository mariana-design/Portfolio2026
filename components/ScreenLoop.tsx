"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type ScreenLoopProps = {
  frames: string[];
  alt: string;
  /** Time each screen stays visible, in ms. */
  dwell?: number;
  /** Optional per-screen times (overrides `dwell`), e.g. to linger on a key decision. */
  dwells?: number[];
  /** Crossfade / slide duration between screens, in ms. */
  fade?: number;
  /** "fade" crossfades in place; "slide" moves the next screen in horizontally, left to right. */
  transition?: "fade" | "slide";
  /** Frosted-glass overlay + lock icon for interfaces under NDA; eases up a little on hover, never fully sharp. */
  locked?: boolean;
  /** Called with the index of the screen that becomes visible. */
  onIndexChange?: (index: number) => void;
  /** "phone" is the framed phone; "card" matches the small filmstrip cards (same size, blur and lock). */
  variant?: "phone" | "card";
  className?: string;
};

// Decorative silent loop: screens crossfade inside a simple phone frame. No controls, not interactive.
export default function ScreenLoop({ frames, alt, dwell = 1800, dwells, fade = 400, transition = "fade", locked = false, onIndexChange, variant = "phone", className = "" }: ScreenLoopProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [i, setI] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    onIndexChange?.(i);
  }, [i, onIndexChange]);

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setI((n) => (n + 1) % frames.length), dwells?.[i] ?? dwell);
    return () => clearTimeout(id);
  }, [inView, dwell, dwells, i, frames.length]);

  // Reduced motion keeps the opacity crossfades (they are gentle) but drops the horizontal slide.
  const mode = reduced ? "fade" : transition;
  const card = variant === "card";

  return (
    <div
      ref={ref}
      role="img"
      aria-label={alt}
      className={`group relative w-full select-none overflow-hidden bg-white ${
        card
          ? "aspect-[7/14] rounded-lg border border-ink/10"
          : "aspect-[480/984] rounded-[1.6rem] border-[5px] border-ink shadow-[0_18px_40px_-18px_rgba(0,0,0,0.4)]"
      } ${locked ? "cursor-default" : "pointer-events-none"} ${className}`}
    >
      {mode === "fade" &&
        frames.map((src, n) => (
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

      {mode === "slide" && (
        <>
          {/* Preload every screen so the slide never waits on the network. */}
          <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
            {frames.map((src) => (
              <Image key={src} src={src} alt="" width={480} height={984} sizes="200px" loading="eager" />
            ))}
          </div>
          <AnimatePresence initial={false}>
            <motion.div
              key={i}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: fade / 1000, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={frames[i]}
                alt=""
                width={480}
                height={984}
                sizes="200px"
                aria-hidden
                className="h-full w-full object-cover object-top"
              />
            </motion.div>
          </AnimatePresence>
        </>
      )}

      {locked && (
        <>
          <div
            aria-hidden
            className={`absolute inset-0 bg-white/[0.06] transition-[backdrop-filter] duration-300 ease-out ${
              card ? "backdrop-blur-[1.5px] group-hover:backdrop-blur-[1px]" : "backdrop-blur-[3px] group-hover:backdrop-blur-[2px]"
            }`}
          />
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            className={`absolute rounded-full bg-white/50 text-ink/60 opacity-70 transition-opacity duration-300 ease-out group-hover:opacity-100 ${
              card ? "right-1 top-1 h-3 w-3 p-[1.5px]" : "right-2 top-2 h-[18px] w-[18px] p-[3px]"
            }`}
          >
            <rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </>
      )}
    </div>
  );
}
