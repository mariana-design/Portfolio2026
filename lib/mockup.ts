// One phone, everywhere. Same width and frame in every case study; only the Home cards bleed larger and get cropped.
export const PHONE_W = 200;

// Frame: black rounded bezel + diffuse, layered ambient shadow (contact, mid, long) instead of one hard box-shadow.
export const phoneFrame =
  "aspect-[480/984] overflow-hidden rounded-[1.6rem] border-[5px] border-ink bg-white " +
  "shadow-[0_1px_2px_rgba(30,20,10,0.10),0_10px_22px_-8px_rgba(30,20,10,0.18),0_38px_70px_-26px_rgba(30,20,10,0.38)]";

// Same recipe for the dark stage, where the shadow has to read against near-black.
export const phoneFrameOnDark =
  "aspect-[480/984] overflow-hidden rounded-[1.6rem] border-[5px] border-ink bg-white " +
  "shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_12px_28px_-8px_rgba(0,0,0,0.6),0_42px_80px_-26px_rgba(0,0,0,0.85)]";
