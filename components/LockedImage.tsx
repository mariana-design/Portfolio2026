"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import LockOverlay from "./LockOverlay";

type LockedImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
};

// Wide counterpart of the locked phone (e.g. a flow board under NDA): same frosted glass + lock.
// On hover, the zoom follows the cursor (transform-origin tracks the mouse) instead of always
// zooming into the center, so moving over the board reveals whatever is under the pointer.
export default function LockedImage({ src, alt, width, height, sizes = "(min-width: 768px) 480px, 100vw", className = "" }: LockedImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [origin, setOrigin] = useState("50% 50%");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = imgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOrigin("50% 50%")}
      className={`group relative w-full cursor-default select-none overflow-hidden rounded-lg border border-ink/10 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.3),0_14px_30px_-10px_rgba(0,0,0,0.5)] ${className}`}
    >
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        style={{ transformOrigin: origin }}
        className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.35]"
      />
      <LockOverlay variant="wide" />
    </div>
  );
}
