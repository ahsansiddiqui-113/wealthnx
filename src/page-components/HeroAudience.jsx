'use client';

import React, { useEffect, useState } from 'react';

/* Home hero: the last words of the headline ("All-in-One AI Powered Wealth Assistant for ...") rotate through the audiences.
   The server-rendered first word is what crawlers and no-JS visitors see; reduced-motion users keep it too.
   Each change slides the old words up and out, then the new ones up into place (classes in HomeRedesign.css). */
export const HERO_AUDIENCES = [
  'Everyday Savers',
  'Active Investors',
  'Couples & Families',
  'Retirement Planners',
  'Crypto Investors',
  'First-Time Savers',
  'Founders',
  'Solopreneurs',
];

const HOLD_MS = 2600;
const OUT_MS = 320;

export default function HeroAudience() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('in');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let swap;
    const timer = setInterval(() => {
      setPhase('out');
      swap = setTimeout(() => {
        setIndex((i) => (i + 1) % HERO_AUDIENCES.length);
        setPhase('in');
      }, OUT_MS);
    }, HOLD_MS);
    return () => { clearInterval(timer); clearTimeout(swap); };
  }, []);

  return (
    <em className={`hr-audience hr-audience--${phase}`}>
      {HERO_AUDIENCES[index]}
    </em>
  );
}
