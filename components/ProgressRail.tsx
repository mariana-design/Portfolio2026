"use client";

import { useSectionObserver } from "@/lib/section-observer";

type Segment = {
  id: string;
  label: string;
};

type ProgressRailProps = {
  segments: Segment[];
};

export default function ProgressRail({ segments }: ProgressRailProps) {
  const { activeId, activeDark } = useSectionObserver();

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 flex items-center gap-2 px-6 py-4 backdrop-blur-md transition-colors duration-300 md:px-12 ${
        activeDark ? "bg-paper-dark/70 text-ink-dark" : "bg-paper/70 text-ink"
      }`}
    >
      {segments.map((segment) => {
        const isActive = segment.id === activeId;
        return (
          <div key={segment.id} className="flex flex-1 flex-col gap-1.5">
            <div
              className={`h-0.5 w-full rounded-full transition-colors duration-300 ${
                isActive
                  ? "bg-accent-warm"
                  : activeDark
                    ? "bg-ink-dark/20"
                    : "bg-ink/15"
              }`}
            />
            <span
              className={`hidden text-[10px] uppercase tracking-wide transition-opacity duration-300 md:block ${
                isActive ? "opacity-100" : "opacity-40"
              }`}
            >
              {segment.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
