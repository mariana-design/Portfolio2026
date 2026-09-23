"use client";

import DiagramFlow from "./DiagramFlow";
import WordCycler from "./WordCycler";

// The hero's own thing, not a preview of the panels below: the core idea of Darma — an email that gets read,
// negotiated and closed without a human writing a reply — told through the site's own language (serif italic,
// terracotta, the hand-drawn DiagramFlow) instead of a product screenshot repeated from panel 05.
export default function DarmaHeroVisual({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center bg-ink/[0.03] px-6 py-20 text-center md:py-28 ${className}`}>
      <p className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
        An email arrives. Darma{" "}
        <WordCycler words={["reads it.", "proposes.", "negotiates.", "confirms."]} className="text-3xl md:text-5xl" />
      </p>
      <DiagramFlow
        steps={["Email arrives", "Darma reads it", "Proposes 3 times", "Guest replies", "Agreement confirmed"]}
        className="mt-14 w-full max-w-4xl"
      />
    </div>
  );
}
