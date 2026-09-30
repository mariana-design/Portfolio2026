"use client";

import DiagramFlow from "./DiagramFlow";
import WordCycler from "./WordCycler";

// The hero's own thing, not a screenshot: a tap looks like one interaction, but behind it is the system of
// decisions the whole case study is about — the same "layers" language panel 01 unpacks in detail, told here
// through the site's own visual language (serif italic, terracotta, the hand-drawn DiagramFlow).
export default function CaixaBankHeroVisual({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center bg-ink/[0.03] px-6 py-12 text-center md:py-16 ${className}`}>
      <p className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
        A tap looks simple. Seven layers make it{" "}
        <WordCycler words={["safe.", "legal.", "valid.", "real."]} className="text-3xl md:text-5xl" />
      </p>
      <DiagramFlow
        steps={["Customer", "Business rules", "Regulation", "Technical dependencies", "Validation", "Error states", "Design"]}
        className="mt-10 w-full max-w-4xl"
      />
    </div>
  );
}
