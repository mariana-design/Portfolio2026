import Image from "next/image";
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
export default function LockedImage({ src, alt, width, height, sizes = "(min-width: 768px) 480px, 100vw", className = "" }: LockedImageProps) {
  return (
    <div className={`group relative w-full cursor-default select-none overflow-hidden rounded-lg border border-ink/10 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.3),0_14px_30px_-10px_rgba(0,0,0,0.5)] ${className}`}>
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className="h-auto w-full" />
      <LockOverlay variant="wide" />
    </div>
  );
}
