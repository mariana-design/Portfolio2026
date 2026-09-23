import Image from "next/image";
import LockOverlay from "./LockOverlay";
import { PHONE_W, phoneFrame, phoneFrameOnDark } from "@/lib/mockup";

type PhoneFrameProps = {
  src: string;
  alt: string;
  /** Frosted glass + lock for NDA interfaces. */
  locked?: boolean;
  onDark?: boolean;
  priority?: boolean;
  /** Override the standard width (px) — only for Home cards that bleed off their stage. */
  width?: number;
  className?: string;
};

// The canonical static phone: same bezel, proportion, width and shadow in every case study.
export default function PhoneFrame({ src, alt, locked = false, onDark = false, priority = false, width = PHONE_W, className = "" }: PhoneFrameProps) {
  return (
    <div
      style={{ width }}
      className={`group relative ${onDark ? phoneFrameOnDark : phoneFrame} ${locked ? "cursor-default select-none" : ""} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={560}
        height={1148}
        sizes={`${Math.round(width * 1.25)}px`}
        priority={priority}
        className="h-full w-full object-cover object-top"
      />
      {locked && <LockOverlay variant="phone" />}
    </div>
  );
}
