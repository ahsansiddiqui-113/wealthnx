/**
 * Premium Motion System Configuration
 * Centralized animation timing, easing, and configuration for consistent cinematic feel
 */

export const motionConfig = {
  // Easing functions for smooth, premium feel
  easing: {
    smooth: [0.34, 1.56, 0.64, 1],
    bouncy: [0.68, -0.55, 0.265, 1.55],
    smooth4: [0.4, 0, 0.2, 1],
    easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
    easeOutCubic: [0.215, 0.61, 0.355, 1],
    easeInCubic: [0.55, 0.055, 0.675, 0.19],
  },

  // Standard animation durations
  duration: {
    micro: 0.2,
    fast: 0.3,
    standard: 0.4,
    medium: 0.6,
    slow: 0.8,
    slower: 1.0,
  },

  // Stagger delays for child elements
  stagger: {
    micro: 0.03,
    small: 0.05,
    medium: 0.08,
    large: 0.1,
  },

  // Transition variants for Framer Motion
  variants: {
    fadeInUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 30 },
    },
    fadeInDown: {
      initial: { opacity: 0, y: -30 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -30 },
    },
    fadeInLeft: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -30 },
    },
    fadeInRight: {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 30 },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.92 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.92 },
    },
    blurReveal: {
      initial: { opacity: 0, filter: 'blur(12px)' },
      animate: { opacity: 1, filter: 'blur(0)' },
      exit: { opacity: 0, filter: 'blur(12px)' },
    },
  },

  // Viewport configuration for scroll animations
  viewport: {
    once: true,
    amount: 0.3,
    margin: '-100px',
  },
};

export type MotionConfig = typeof motionConfig;
