"use client";

import { useState } from "react";
import ScreenLoop from "./ScreenLoop";

type State = { caption: string; src: string };

type StateLoopProps = {
  states: State[];
  alt: string;
  dwell?: number;
  fade?: number;
  className?: string;
};

// One phone whose screen moves through every state; the names below say what is being shown even when it is blurred.
export default function StateLoop({ states, alt, dwell = 1900, fade = 400, className = "" }: StateLoopProps) {
  const [current, setCurrent] = useState(0);

  return (
    <figure className={className}>
      <ScreenLoop
        frames={states.map((s) => s.src)}
        alt={alt}
        dwell={dwell}
        fade={fade}
        locked
        onIndexChange={setCurrent}
      />
      <figcaption className="mt-4 text-center text-[11px] leading-relaxed tracking-wide text-ink-soft md:text-xs">
        {states.map((s, n) => (
          <span key={s.caption}>
            <span className={`transition-colors duration-300 ${n === current ? "font-semibold text-accent-warm" : ""}`}>
              {s.caption}
            </span>
            {n < states.length - 1 && <span aria-hidden> · </span>}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
