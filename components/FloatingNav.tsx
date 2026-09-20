"use client";

import Link from "next/link";
import { useSectionObserver } from "@/lib/section-observer";

const links = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
];

export default function FloatingNav({ showBack = true }: { showBack?: boolean }) {
  const { activeDark } = useSectionObserver();

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 px-6 py-4 backdrop-blur-md transition-colors duration-300 md:px-12 ${
        activeDark ? "bg-paper-dark/70 text-ink-dark" : "bg-paper/70 text-ink"
      }`}
    >
      {showBack ? (
        <Link href="/" className="text-sm font-medium hover:opacity-70">
          ← Back
        </Link>
      ) : (
        <Link href="/" className="font-display text-sm font-bold tracking-tight">
          MB.
        </Link>
      )}

      <span
        className={`hidden rounded-full border px-3 py-1 text-xs font-medium tracking-wide lg:inline ${
          activeDark ? "border-ink-dark/30" : "border-ink/20"
        }`}
      >
        Available for work
      </span>

      <div className="flex items-center gap-5 text-sm font-medium md:gap-7">
        {links.map((l) => (
          <Link key={l.label} href={l.href} className="group relative">
            {l.label}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent-warm transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Link>
        ))}
        <Link
          href="/#contact"
          className={`flex items-center gap-2 rounded-full border px-4 py-1.5 transition-colors hover:border-accent-warm hover:text-accent-warm ${
            activeDark ? "border-ink-dark/30" : "border-ink/20"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
            <rect x="2" y="4" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2.5 5l6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Work with me
        </Link>
      </div>
    </nav>
  );
}
