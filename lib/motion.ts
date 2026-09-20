import type { Variants } from "framer-motion";

/** Editorial easing — soft ease-out, no bounce. */
export const easeEditorial = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeEditorial },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: easeEditorial },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

/** Scroll-reveal defaults: trigger once, ~20-30% into view. */
export const revealViewport = { once: true, amount: 0.25 } as const;
