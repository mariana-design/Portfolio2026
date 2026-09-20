"use client";

import type { MouseEvent } from "react";

type HoverLettersProps = {
  text: string;
  className?: string;
};

export default function HoverLetters({ text, className = "" }: HoverLettersProps) {
  // One delegated listener: moves the dot under the hovered letter to the cursor's x.
  function onMove(e: MouseEvent<HTMLSpanElement>) {
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-hl]");
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--dx", `${Math.min(Math.max(((e.clientX - r.left) / r.width) * 100, 8), 92)}%`);
  }

  const words = text.split(" ");

  return (
    <span className={className} aria-label={text} onMouseMove={onMove}>
      {words.map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap" aria-hidden>
          {[...word].map((ch, i) => (
            <span key={i} data-hl className="hl">
              {ch}
            </span>
          ))}
          {w < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}
