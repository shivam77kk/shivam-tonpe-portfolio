import { Variants, Transition } from 'framer-motion';

// ── EASING PRESETS ────────────────────────────────────────────
export const easing = {
  smooth:   [0.25, 0.46, 0.45, 0.94],   // Most UI transitions
  snappy:   [0.34, 1.56, 0.64, 1],       // Elastic, bouncy
  enter:    [0.22, 1, 0.36, 1],           // Content entering
  exit:     [0.55, 0, 1, 0.45],           // Content leaving
  cinematic:[0.76, 0, 0.24, 1],           // Long, dramatic
};

// ── HERO ANIMATIONS ───────────────────────────────────────────
export const heroLetterVariants: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: -90, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
    transition: {
      delay: i * 0.04,
      duration: 0.8,
      ease: easing.snappy,
    },
  }),
};

export const heroWordVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: {
      delay: 0.8 + i * 0.08,
      duration: 0.5,
      ease: easing.smooth,
    },
  }),
};

// ── SECTION REVEAL SYSTEM ─────────────────────────────────────
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 48, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: easing.enter },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const fastStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

// ── CARD ANIMATIONS ───────────────────────────────────────────
export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: easing.smooth },
  },
};

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.018,
    y: -6,
    transition: { type: 'spring', stiffness: 380, damping: 28 },
  },
};

export const featuredCardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.025,
    y: -10,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

// ── SKILL PILL ANIMATIONS ─────────────────────────────────────
export const pillReveal: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: 'spring', stiffness: 400, damping: 22 },
  },
};

// ── MODAL ANIMATIONS ─────────────────────────────────────────
export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } },
};

export const modalPanel: Variants = {
  hidden: { opacity: 0, y: '100vh', scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 32, delay: 0.05 },
  },
  exit: {
    opacity: 0, y: '100vh', scale: 0.95,
    transition: { duration: 0.3, ease: easing.exit },
  },
};

// ── LINE DRAW ANIMATION (SVG paths, Timeline) ─────────────────
export const lineDrawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1, opacity: 1,
    transition: { duration: 1.2, ease: 'easeInOut', delay: 0.2 },
  },
};

// ── COUNTER ANIMATION ─────────────────────────────────────────
export const counterTransition: Transition = {
  duration: 1.8,
  ease: [0.16, 1, 0.3, 1],
  delay: 0.3,
};

// ── HORIZONTAL SCROLL ENTRANCE (Case Studies) ─────────────────
export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: easing.smooth },
  }),
};

// ── NAVBAR ANIMATIONS ────────────────────────────────────────
export const navItem: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: easing.smooth },
  }),
};

// ── FLOATING BADGE (WhatsApp, status) ────────────────────────
export const floatAnimation = {
  y: [-6, 6, -6],
  transition: { duration: 4, ease: 'easeInOut', repeat: Infinity },
};

// ── PAGE TRANSITION ───────────────────────────────────────────
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, ease: easing.smooth } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

// ── SCROLL TRIGGERED BLUR REVEAL (premium) ───────────────────
export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 24 },
  visible: {
    opacity: 1, filter: 'blur(0px)', y: 0,
    transition: { duration: 0.8, ease: easing.cinematic },
  },
};
