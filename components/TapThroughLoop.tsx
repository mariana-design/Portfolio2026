"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { PHONE_W, phoneFrame } from "@/lib/mockup";

type Frame = {
  src: string;
  alt: string;
  /** Where the "tap" ripple lands before this screen advances, as a fraction (0–1) of the image. */
  tap?: { x: number; y: number };
  /**
   * For a screen genuinely taller than the phone viewport: shown at real size/spacing (no scale or
   * whitespace compression), entering on the top, then scrolling down to reveal the rest before advancing.
   * `fraction` is how far to scroll, as a fraction (0–1) of the full image's own rendered height —
   * i.e. 1 − (visible viewport height / full image height).
   */
  scroll?: { fraction: number; durationMs?: number };
};

const HOLD_MS = 1300; // screen sits still, fully readable — "someone using the app", not slides
const TAP_MS = 420; // brief ripple on the button right before it advances
const PUSH_MS = 420; // iOS-style push: new screen slides in, old one gets shoved off left
const SCROLL_START_DELAY_MS = 500; // beat at the top before the read-down starts
const SCROLL_DURATION_MS = 1600; // the scroll itself
const SCROLL_POST_HOLD_MS = 700; // beat at the bottom, CTA visible, before the tap ripple

// Simulates tapping through a real prototype: hold → tap ripple on the CTA → push-transition to the next
// screen, looping. Clicking anywhere on the screen advances it immediately (real tap-to-advance), same as
// the automatic timer would — no crossfade, each screen is fully readable, then physically replaced.
export default function TapThroughLoop({ frames, className = "" }: { frames: Frame[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [index, setIndex] = useState(0);
  const [tapPoint, setTapPoint] = useState<{ x: number; y: number } | null>(null);
  const [reduced, setReduced] = useState(false);

  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const clearTimers = useCallback(() => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    if (tapTimer.current) clearTimeout(tapTimer.current);
  }, []);

  const advance = useCallback(
    (point: { x: number; y: number } | null) => {
      clearTimers();
      setTapPoint(point);
      tapTimer.current = setTimeout(() => {
        setTapPoint(null);
        setIndex((n) => (n + 1) % frames.length);
      }, TAP_MS);
    },
    [clearTimers, frames.length]
  );

  useEffect(() => {
    if (!inView) return;
    const scroll = frames[index].scroll;
    const hold = scroll ? SCROLL_START_DELAY_MS + (scroll.durationMs ?? SCROLL_DURATION_MS) + SCROLL_POST_HOLD_MS : HOLD_MS;
    holdTimer.current = setTimeout(() => {
      advance(frames[index].tap ?? { x: 0.5, y: 0.9 });
    }, hold);
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, index]);

  useEffect(() => clearTimers, [clearTimers]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    advance({ x, y });
  };

  const current = frames[index];

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={`${current.alt} — tap to advance`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") advance(current.tap ?? { x: 0.5, y: 0.9 });
      }}
      style={{ width: PHONE_W }}
      className={`group relative mx-auto cursor-pointer select-none overflow-hidden bg-white ${phoneFrame} ${className}`}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={reduced ? { opacity: 0 } : { x: "100%" }}
          animate={reduced ? { opacity: 1 } : { x: "0%" }}
          exit={reduced ? { opacity: 0 } : { x: "-100%" }}
          transition={{ duration: PUSH_MS / 1000, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
        >
          {current.scroll ? (
            <motion.img
              src={current.src}
              alt=""
              initial={{ y: "0%" }}
              animate={reduced ? { y: "0%" } : { y: `-${current.scroll.fraction * 100}%` }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { delay: SCROLL_START_DELAY_MS / 1000, duration: (current.scroll.durationMs ?? SCROLL_DURATION_MS) / 1000, ease: "easeInOut" }
              }
              className="pointer-events-none absolute left-0 top-0 h-auto w-full"
            />
          ) : (
            <Image src={current.src} alt="" fill sizes="200px" className="pointer-events-none object-cover object-top" />
          )}
        </motion.div>
      </AnimatePresence>

      {!reduced && tapPoint && (
        <motion.span
          aria-hidden
          initial={{ opacity: 0.5, scale: 0.2 }}
          animate={{ opacity: 0, scale: 2.4 }}
          transition={{ duration: TAP_MS / 1000, ease: "easeOut" }}
          style={{
            left: `${tapPoint.x * 100}%`,
            top: `${tapPoint.y * 100}%`,
            translate: "-50% -50%",
          }}
          className="pointer-events-none absolute z-10 h-6 w-6 rounded-full bg-white"
        />
      )}
    </div>
  );
}
