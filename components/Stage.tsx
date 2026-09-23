import type { ReactNode } from "react";

type StageProps = {
  /** "light" for regular panels, "dark" for the dark break. */
  tone?: "light" | "dark";
  children: ReactNode;
  className?: string;
};

// Where a mockup lives: never flat white. A warm radial wash, a faint terracotta halo behind the object and a soft
// inner vignette, so the phone reads as an object placed somewhere rather than a screenshot floating on the page.
export default function Stage({ tone = "light", children, className = "" }: StageProps) {
  const dark = tone === "dark";
  return (
    <div
      className={`relative isolate flex items-center justify-center overflow-hidden rounded-2xl ${
        dark
          ? "bg-[radial-gradient(ellipse_at_50%_30%,#2e2925_0%,#1b1917_52%,#121110_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_-50px_90px_-50px_rgba(0,0,0,0.7)]"
          : "bg-[radial-gradient(ellipse_at_50%_28%,#ffffff_0%,#f6f1e9_46%,#eadfd0_100%)] shadow-[inset_0_0_0_1px_rgba(90,70,40,0.07),inset_0_-50px_90px_-50px_rgba(110,80,40,0.18)]"
      } ${className}`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute left-1/2 top-[58%] -z-10 h-[62%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${
          dark ? "bg-accent-warm/15" : "bg-accent-warm/20"
        }`}
      />
      {children}
    </div>
  );
}
