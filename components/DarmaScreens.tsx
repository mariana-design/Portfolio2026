"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { easeEditorial } from "@/lib/motion";
import { phoneFrame } from "@/lib/mockup";

type Frame = { src: string; alt: string; width: number; height: number };

type DarmaScreensProps = {
  iosScroll: Frame;
  iosTabBar: Frame;
  web: Frame[];
  className?: string;
};

const PHONE_W = 180;
const PHONE_H = Math.round((PHONE_W * 984) / 480);

// Real screens, not simulated: the web mockup crossfades between actual captured screens from the "resolving
// an overlap" flow. The iOS mockup is one real, tall screenshot — there's no separate "resolve" screen to show,
// so instead it scrolls down through the real page, from the conflict card into the real Email scheduling
// states (Needs your reply / In progress / Booked). The tab bar is docked at the bottom like a real iOS tab
// bar — cropped out of the same screenshot and rendered as a fixed layer — instead of scrolling with the
// content and clipping against the frame's rounded corner.
function useLoop(count: number, dwell = 2400, fade = 300) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setI((n) => (n + 1) % count), dwell);
    return () => clearTimeout(id);
  }, [inView, dwell, i, count]);

  return { ref, i, fade };
}

export default function DarmaScreens({ iosScroll, iosTabBar, web, className = "" }: DarmaScreensProps) {
  const webLoop = useLoop(web.length);
  const iosRef = useRef<HTMLDivElement>(null);
  const iosInView = useInView(iosRef, { amount: 0.3 });

  const tabBarH = Math.round((PHONE_W * iosTabBar.height) / iosTabBar.width);
  const viewportH = PHONE_H - tabBarH;
  const scrollImgH = Math.round((PHONE_W * iosScroll.height) / iosScroll.width);
  const scrollDistance = Math.max(0, scrollImgH - viewportH);

  return (
    <div className={`grid grid-cols-[180px_1fr] items-end gap-x-8 gap-y-2 ${className}`} style={{ gridTemplateRows: "auto auto" }}>
      <motion.div
        ref={iosRef}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: easeEditorial }}
        className={`relative mx-auto self-end overflow-hidden bg-white ${phoneFrame}`}
        style={{ width: PHONE_W, gridColumn: 1, gridRow: 1 }}
      >
        <div className="absolute inset-x-0 top-0 overflow-hidden" style={{ height: viewportH }}>
          <motion.div
            animate={iosInView ? { y: [0, -scrollDistance, -scrollDistance, 0] } : { y: 0 }}
            transition={
              iosInView
                ? { duration: 7, times: [0, 0.42, 0.85, 1], repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }
                : { duration: 0 }
            }
          >
            <Image src={iosScroll.src} alt={iosScroll.alt} width={iosScroll.width} height={iosScroll.height} sizes="220px" className="h-auto w-full" />
          </motion.div>
        </div>
        <div className="absolute inset-x-0 bottom-0" style={{ height: tabBarH }}>
          <Image src={iosTabBar.src} alt={iosTabBar.alt} width={iosTabBar.width} height={iosTabBar.height} sizes="220px" className="h-full w-full object-cover object-top" />
        </div>
      </motion.div>

      <motion.div
        ref={webLoop.ref}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, delay: 0.1, ease: easeEditorial }}
        className="relative max-w-[440px] self-end overflow-hidden rounded-lg border border-ink/10 bg-white shadow-[0_1px_2px_rgba(30,20,10,0.08),0_18px_34px_-16px_rgba(30,20,10,0.28)]"
        style={{ gridColumn: 2, gridRow: 1 }}
      >
        <div className="flex items-center gap-1.5 border-b border-ink/10 bg-ink/[0.03] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
        </div>
        <div className="relative aspect-[1100/900] w-full">
          {web.map((frame, n) => (
            <Image
              key={frame.src}
              src={frame.src}
              alt={n === webLoop.i ? frame.alt : ""}
              width={frame.width}
              height={frame.height}
              sizes="600px"
              aria-hidden={n !== webLoop.i}
              style={{ opacity: n === webLoop.i ? 1 : 0, transition: `opacity ${webLoop.fade}ms ease-in-out` }}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          ))}
        </div>
      </motion.div>

      <p className="self-start whitespace-nowrap text-center text-[10px] font-medium uppercase tracking-wide text-ink-soft" style={{ gridColumn: 1, gridRow: 2 }}>
        iOS — command &amp; control
      </p>
      <p className="self-start whitespace-nowrap text-[10px] font-medium uppercase tracking-wide text-ink-soft" style={{ gridColumn: 2, gridRow: 2 }}>
        Web app — resolving an overlap
      </p>
    </div>
  );
}
