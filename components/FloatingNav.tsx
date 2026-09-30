"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSectionObserver } from "@/lib/section-observer";

const links = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
];

// Placeholder avatar — swap the initials div below for a real headshot <Image> once one is provided.
function Avatar() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-warm/25 font-display text-xs font-bold text-ink">
      MB
    </span>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="2" y="4" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 5l6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function FloatingNav({ showBack = true }: { showBack?: boolean }) {
  const { activeDark } = useSectionObserver();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Close the mobile panel on Escape, and if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Real "back" when we got here by navigating within the site; otherwise (shared link, new tab) land
    // on the work section rather than the empty top of the home page.
    if (window.history.length > 1 && document.referrer.includes(window.location.host)) {
      router.back();
    } else {
      router.push("/#work");
    }
  };

  const theme = activeDark ? "text-ink-dark" : "text-ink";
  const border = activeDark ? "border-ink-dark/30" : "border-ink/20";
  const pillBg = activeDark ? "bg-paper-dark" : "bg-paper";

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-colors duration-300 ${
        activeDark ? "bg-paper-dark/70" : "bg-paper/70"
      } ${theme}`}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-3 md:px-12">
        <div className="w-16 shrink-0">
          {showBack && (
            <a href="/#work" onClick={handleBack} className="text-sm font-medium hover:opacity-70">
              ← Back
            </a>
          )}
        </div>

        {/* Desktop pill: avatar + links + CTA */}
        <div className={`hidden items-center gap-6 rounded-full px-3 py-1.5 shadow-[0_1px_2px_rgba(20,20,20,0.06),0_8px_20px_-10px_rgba(20,20,20,0.15)] md:flex ${pillBg}`}>
          <Link href="/" aria-label="Home">
            <Avatar />
          </Link>
          {links.map((l) => (
            <Link key={l.label} href={l.href} className="group relative text-sm font-medium">
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent-warm transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
          <a
            href="mailto:marianabenitezcorona@gmail.com"
            className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-accent-warm"
          >
            <MailIcon />
            Work with me
          </a>
        </div>

        <div className="flex w-16 shrink-0 justify-end md:hidden">
          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-10 flex h-8 w-8 items-center justify-center"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-full rounded-full bg-current transition-transform duration-300 ease-out ${open ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-current transition-transform duration-300 ease-out ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>

        {/* Desktop-only: keep the layout balanced when Back is hidden but nothing else sits on the right */}
        <div className="hidden w-16 shrink-0 md:block" />
      </div>

      {/* Mobile panel */}
      <div
        className={`grid overflow-hidden px-6 transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          open ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
        }`}
      >
        <div className="flex min-h-0 min-w-0 flex-col gap-1 overflow-hidden">
          <Link href="/" onClick={() => setOpen(false)} aria-label="Home" className={`flex items-center border-b py-3 ${border}`}>
            <Avatar />
          </Link>
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`border-b py-3 text-base font-medium ${border}`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="mailto:marianabenitezcorona@gmail.com"
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper"
          >
            <MailIcon />
            Work with me
          </a>
        </div>
      </div>
    </nav>
  );
}
