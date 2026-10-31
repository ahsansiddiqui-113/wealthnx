/**
 * Premium Motion Components
 * Reusable Framer Motion components for cinematic animations
 */

'use client';

import React, { ReactNode } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { motionConfig } from '@/lib/motionConfig';

// ═══════════════════════════════════════════════════════════════
// REVEAL COMPONENTS
// ═══════════════════════════════════════════════════════════════

interface RevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const directionVariants = {
    up: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
    down: { initial: { opacity: 0, y: -40 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      variants={directionVariants[direction]}
      transition={{
        duration,
        delay,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// LAYERED CARD COMPONENT
// ═══════════════════════════════════════════════════════════════

interface LayeredCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  enableGlow?: boolean;
}

export const LayeredCard: React.FC<LayeredCardProps> = ({
  children,
  delay = 0,
  className = '',
  enableGlow = false,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={
        isInView ? { opacity: 1, y: 0, scale: 1 } : {}
      }
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeInOut',
      }}
      className={`layered-wrapper ${className}`}
    >
      {children}
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// PARALLAX SCROLL COMPONENT
// ═══════════════════════════════════════════════════════════════

interface ParallaxProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

export const ParallaxElement: React.FC<ParallaxProps> = ({
  children,
  offset = 40,
  className = '',
}) => {
  const ref = useRef(null);
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 1000], [0, -offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// STAGGERED CHILDREN COMPONENT
// ═══════════════════════════════════════════════════════════════

interface StaggeredProps {
  children: ReactNode[];
  stagger?: number;
  className?: string;
}

export const StaggeredChildren: React.FC<StaggeredProps> = ({
  children,
  stagger = 0.08,
  className = '',
}) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// HOVER TILT COMPONENT
// ═══════════════════════════════════════════════════════════════

interface HoverTiltProps {
  children: ReactNode;
  intensity?: number;
  className?: string;
}

export const HoverTilt: React.FC<HoverTiltProps> = ({
  children,
  intensity = 1,
  className = '',
}) => {
  const ref = useRef(null);
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const element = ref.current as HTMLElement;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 8 * intensity;
    const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * 8 * intensity;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// BLUR REVEAL COMPONENT
// ═══════════════════════════════════════════════════════════════

interface BlurRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const BlurReveal: React.FC<BlurRevealProps> = ({
  children,
  delay = 0,
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: 'blur(20px)' }}
      animate={
        isInView ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(20px)' }
      }
      transition={{
        duration: 0.8,
        delay,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// FLOATING ELEMENT COMPONENT
// ═══════════════════════════════════════════════════════════════

interface FloatingProps {
  children: ReactNode;
  duration?: number;
  offset?: number;
  className?: string;
}

export const FloatingElement: React.FC<FloatingProps> = ({
  children,
  duration = 3,
  offset = 20,
  className = '',
}) => {
  return (
    <motion.div
      animate={{
        y: [0, -offset, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// GLOW PULSE COMPONENT
// ═══════════════════════════════════════════════════════════════

interface GlowPulseProps {
  children: ReactNode;
  duration?: number;
  className?: string;
}

export const GlowPulse: React.FC<GlowPulseProps> = ({
  children,
  duration = 2.5,
  className = '',
}) => {
  return (
    <motion.div
      animate={{
        filter: [
          'drop-shadow(0 0 20px rgba(17, 181, 161, 0.3))',
          'drop-shadow(0 0 40px rgba(17, 181, 161, 0.6))',
          'drop-shadow(0 0 20px rgba(17, 181, 161, 0.3))',
        ],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCROLL PROGRESS INDICATOR
// ═══════════════════════════════════════════════════════════════

export const ScrollProgress: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      ref={ref}
      style={{
        scaleX: scrollYProgress,
        transformOrigin: '0%',
      }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent z-50"
    />
  );
};
