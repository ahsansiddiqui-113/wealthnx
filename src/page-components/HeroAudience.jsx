'use client';

import React, { useEffect, useState } from 'react';

/* Home hero: the last words of the headline ("All-in-One AI Powered Wealth Assistant for ...") are typed out one letter
   at a time, held, deleted in reverse, then the next audience is typed (the "typewriter" effect).
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

const TYPE_MS = 75;
const DELETE_MS = 40;
const HOLD_MS = 1700;
const GAP_MS = 350;

export default function HeroAudience() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(HERO_AUDIENCES[0]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let timer;
    let i = 0;
    let shown = HERO_AUDIENCES[0];
    let deleting = false;
    const tick = () => {
      const word = HERO_AUDIENCES[i];
      if (!deleting) {
        if (shown.length < word.length) {
          shown = word.slice(0, shown.length + 1);
          setText(shown);
          timer = setTimeout(tick, TYPE_MS);
        } else {
          deleting = true; // whole word typed: hold it, then erase
          timer = setTimeout(tick, HOLD_MS);
        }
      } else if (shown.length > 0) {
        shown = shown.slice(0, -1);
        setText(shown);
        timer = setTimeout(tick, DELETE_MS);
      } else {
        deleting = false; // erased: move on to the next audience
        i = (i + 1) % HERO_AUDIENCES.length;
        setIndex(i);
        timer = setTimeout(tick, GAP_MS);
      }
    };
    timer = setTimeout(tick, HOLD_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <em className="hr-audience hr-audience--type" aria-label={HERO_AUDIENCES[index]}>
      <span aria-hidden="true">{text || '​'}</span>
      <span className="hr-caret" aria-hidden="true" />
    </em>
  );
}
