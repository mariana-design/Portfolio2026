"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

type CoverVideoProps = {
  src: string;
  poster?: string;
  alt: string;
  className?: string;
};

// Plays only while scrolled into view — no native play button, no eager autoplay on load.
export default function CoverVideo({ src, poster, alt, className = "" }: CoverVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (inView) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [inView]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="auto"
      aria-label={alt}
      className={className}
    />
  );
}
