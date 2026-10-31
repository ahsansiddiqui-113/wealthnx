/**
 * Motion System Showcase Component
 * Demonstrates all premium motion techniques
 */

'use client';

import React from 'react';
import {
  Reveal,
  LayeredCard,
  ParallaxElement,
  StaggeredChildren,
  HoverTilt,
  BlurReveal,
  FloatingElement,
  GlowPulse,
} from './MotionComponents';

interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  delay?: number;
}

const MotionShowcase = () => {
  const showcaseItems: ShowcaseItem[] = [
    {
      id: '1',
      title: 'Reveal Animation',
      description: 'Scroll to reveal content with directional animation',
      delay: 0.1,
    },
    {
      id: '2',
      title: 'Layered Card',
      description: 'Premium card with glow and depth layers',
      delay: 0.2,
    },
    {
      id: '3',
      title: 'Parallax Depth',
      description: 'Scroll-based parallax with depth perception',
      delay: 0.3,
    },
    {
      id: '4',
      title: 'Hover Tilt',
      description: '3D tilt effect on mouse movement',
      delay: 0.4,
    },
  ];

  return (
    <div className="space-y-20 py-20">
      {/* Section 1: Reveal Animations */}
      <section className="section-wrapper">
        <Reveal direction="up" delay={0.1}>
          <h2 className="section-title">Reveal Animations</h2>
        </Reveal>
        <Reveal direction="up" delay={0.2}>
          <p className="section-subtitle">Content reveals as you scroll into view</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {['up', 'down', 'left', 'right'].map((direction, idx) => (
            <Reveal
              key={direction}
              direction={direction as any}
              delay={0.1 + idx * 0.1}
            >
              <div className="premium-card p-6 h-48 flex items-center justify-center">
                <p className="text-center">
                  Reveal from <strong>{direction}</strong>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Section 2: Layered Cards */}
      <section className="section-wrapper">
        <Reveal direction="up" delay={0.1}>
          <h2 className="section-title">Layered Cards</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {showcaseItems.slice(0, 3).map((item) => (
            <LayeredCard
              key={item.id}
              delay={item.delay}
              enableGlow={true}
              className="p-6"
            >
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm opacity-75">{item.description}</p>
            </LayeredCard>
          ))}
        </div>
      </section>

      {/* Section 3: Parallax Elements */}
      <section className="section-wrapper relative overflow-hidden">
        <Reveal direction="up" delay={0.1}>
          <h2 className="section-title">Parallax Depth</h2>
        </Reveal>

        <div className="mt-12 h-96 relative">
          {/* Background Layer */}
          <ParallaxElement offset={60} className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-r from-accent/10 to-transparent rounded-lg" />
          </ParallaxElement>

          {/* Middle Layer */}
          <ParallaxElement offset={40} className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-b from-transparent via-accent/5 to-transparent rounded-lg" />
          </ParallaxElement>

          {/* Foreground Layer */}
          <ParallaxElement offset={20}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="premium-card p-8 max-w-md">
                <h3 className="text-xl font-semibold mb-3">Parallax Layers</h3>
                <p>
                  Each layer moves at different speeds creating depth. Scroll to see the effect!
                </p>
              </div>
            </div>
          </ParallaxElement>
        </div>
      </section>

      {/* Section 4: Hover Tilt 3D */}
      <section className="section-wrapper">
        <Reveal direction="up" delay={0.1}>
          <h2 className="section-title">3D Hover Effects</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <HoverTilt intensity={1} className="premium-card p-8 h-64 flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-3">Tilt Effect</h3>
            <p className="opacity-75">
              Move your mouse over this card to see the 3D tilt effect. The card rotates based on mouse position.
            </p>
          </HoverTilt>

          <HoverTilt intensity={0.5} className="premium-card p-8 h-64 flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-3">Subtle Tilt</h3>
            <p className="opacity-75">
              This card has reduced tilt intensity for a more subtle effect. Great for premium interfaces.
            </p>
          </HoverTilt>
        </div>
      </section>

      {/* Section 5: Blur Reveal */}
      <section className="section-wrapper">
        <Reveal direction="up" delay={0.1}>
          <h2 className="section-title">Blur Reveal</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <BlurReveal delay={0.2}>
            <div className="premium-card p-8 h-56 flex items-center justify-center bg-gradient-to-r from-accent/20 to-transparent">
              <p className="text-center">
                This content blurs in smoothly as it enters the viewport
              </p>
            </div>
          </BlurReveal>

          <BlurReveal delay={0.4}>
            <div className="premium-card p-8 h-56 flex items-center justify-center bg-gradient-to-l from-accent/20 to-transparent">
              <p className="text-center">
                Each section can have its own reveal timing
              </p>
            </div>
          </BlurReveal>
        </div>
      </section>

      {/* Section 6: Floating Elements */}
      <section className="section-wrapper">
        <Reveal direction="up" delay={0.1}>
          <h2 className="section-title">Floating Elements</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[1, 2, 3].map((item) => (
            <FloatingElement
              key={item}
              duration={2 + item * 0.5}
              offset={15 + item * 5}
            >
              <div className="premium-card p-8 h-48 flex items-center justify-center">
                <p className="text-center">
                  Floating Item {item}
                  <br />
                  <small>Duration: {2 + item * 0.5}s</small>
                </p>
              </div>
            </FloatingElement>
          ))}
        </div>
      </section>

      {/* Section 7: Glow Pulse */}
      <section className="section-wrapper">
        <Reveal direction="up" delay={0.1}>
          <h2 className="section-title">Glow Pulse Effect</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <GlowPulse duration={2.5}>
            <div className="premium-card p-8 h-56 flex items-center justify-center">
              <p className="text-center">Breathing Glow Effect</p>
            </div>
          </GlowPulse>

          <GlowPulse duration={1.5}>
            <div className="premium-card p-8 h-56 flex items-center justify-center">
              <p className="text-center">Faster Glow Pulse</p>
            </div>
          </GlowPulse>
        </div>
      </section>

      {/* Section 8: Staggered Children */}
      <section className="section-wrapper">
        <Reveal direction="up" delay={0.1}>
          <h2 className="section-title">Staggered Children</h2>
        </Reveal>

        <StaggeredChildren stagger={0.1} className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="premium-card p-6 h-40 flex items-center justify-center"
            >
              <p className="text-center">Item {idx + 1}</p>
            </div>
          ))}
        </StaggeredChildren>
      </section>

      {/* Section 9: Complex Layered Section */}
      <section className="section-wrapper relative overflow-hidden py-20">
        {/* Background Glow Layers */}
        <ParallaxElement offset={80} className="absolute inset-0 -z-10">
          <GlowPulse duration={3}>
            <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-transparent to-transparent blur-3xl" />
          </GlowPulse>
        </ParallaxElement>

        {/* Content */}
        <div className="relative z-10">
          <Reveal direction="up" delay={0.1}>
            <h2 className="section-title">Complex Layered Section</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <ParallaxElement offset={30}>
              <Reveal direction="left" delay={0.2}>
                <LayeredCard enableGlow={true} className="p-8">
                  <h3 className="text-lg font-semibold mb-3">Layer 1</h3>
                  <p className="opacity-75">
                    This combines parallax, reveal, and layered cards for maximum impact
                  </p>
                </LayeredCard>
              </Reveal>
            </ParallaxElement>

            <ParallaxElement offset={20}>
              <Reveal direction="right" delay={0.3}>
                <LayeredCard enableGlow={true} className="p-8">
                  <h3 className="text-lg font-semibold mb-3">Layer 2</h3>
                  <p className="opacity-75">
                    Multiple animation techniques working together create cinematic feel
                  </p>
                </LayeredCard>
              </Reveal>
            </ParallaxElement>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MotionShowcase;
