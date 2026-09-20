"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

type ScrollScrubVideoProps = {
  src: string;
  /** Height of the scroll track, e.g. "300vh". More height = slower scrub. */
  trackHeight?: string;
  className?: string;
};

export default function ScrollScrubVideo({
  src,
  trackHeight = "280vh",
  className = "",
}: ScrollScrubVideoProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    video.currentTime = progress * duration;
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onLoaded = () => setDuration(video.duration);
    video.addEventListener("loadedmetadata", onLoaded);
    if (video.readyState >= 1) onLoaded();
    return () => video.removeEventListener("loadedmetadata", onLoaded);
  }, []);

  return (
    <div ref={trackRef} style={{ height: trackHeight }} className={className}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-paper-dark">
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          className="max-h-full max-w-full"
        />
      </div>
    </div>
  );
}
