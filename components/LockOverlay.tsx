type LockOverlayProps = { variant?: "phone" | "card" | "wide" };

const blur = {
  phone: "backdrop-blur-[3px] group-hover:backdrop-blur-[2px]",
  card: "backdrop-blur-[1.5px] group-hover:backdrop-blur-[1px]",
  wide: "backdrop-blur-[3px] group-hover:backdrop-blur-[2px]",
};

const lock = {
  phone: "right-2 top-2 h-[18px] w-[18px] p-[3px]",
  card: "right-1 top-1 h-3 w-3 p-[1.5px]",
  wide: "right-2.5 top-2.5 h-[22px] w-[22px] p-[4px]",
};

// Frosted glass + lock for interfaces under NDA. Eases up a little on hover, never fully sharp. No gate, no password.
// The parent needs `relative` and `group`.
export default function LockOverlay({ variant = "phone" }: LockOverlayProps) {
  return (
    <>
      <div
        aria-hidden
        className={`absolute inset-0 bg-white/[0.06] transition-[backdrop-filter] duration-300 ease-out ${blur[variant]}`}
      />
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        className={`absolute rounded-full bg-white/50 text-ink/60 opacity-70 transition-opacity duration-300 ease-out group-hover:opacity-100 ${lock[variant]}`}
      >
        <rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </>
  );
}
