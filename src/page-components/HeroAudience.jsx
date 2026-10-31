'use client';

import React, { useEffect, useState } from 'react';

/* Home hero: the last words of the headline ("All-in-One AI Powered Wealth Assistant for ...") rotate through the audiences.
   The server-rendered first word is what crawlers and no-JS visitors see; reduced-motion users keep it too. */
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
const FADE_MS = 350;

export default function HeroAudience() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let swap;
    const timer = setInterval(() => {
      setVisible(false);
      swap = setTimeout(() => {
        setIndex((i) => (i + 1) % HERO_AUDIENCES.length);
        setVisible(true);
      }, FADE_MS);
    }, HOLD_MS);
    return () => { clearInterval(timer); clearTimeout(swap); };
  }, []);

  return (
    <em className="hr-audience" style={{ opacity: visible ? 1 : 0, transition: `opacity ${FADE_MS}ms ease` }}>
      {HERO_AUDIENCES[index]}
    </em>
  );
}
