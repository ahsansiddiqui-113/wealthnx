'use client';

import React, { useEffect, useRef, useState } from 'react';

/* Pager dots for a mobile swipe row. Render it right after the row (as its next sibling): it reads that row's
   children, highlights the card closest to the row's centre while it scrolls, and scrolls to a card when a dot is
   tapped. Hidden above 700px (see MobileSwipe.css), where the rows are normal grids. */
export default function SwipeDots({ light = false }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const row = ref.current?.previousElementSibling;
    if (!row) return undefined;
    const sync = () => {
      const kids = Array.from(row.children);
      setCount(kids.length);
      if (!kids.length) return;
      if (row.scrollLeft + row.clientWidth >= row.scrollWidth - 2) { setActive(kids.length - 1); return; }
      const r = row.getBoundingClientRect();
      const mid = r.left + r.width / 2;
      let best = 0;
      let bestDist = Infinity;
      kids.forEach((k, i) => {
        const kr = k.getBoundingClientRect();
        const d = Math.abs(kr.left + kr.width / 2 - mid);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      setActive(best);
    };
    sync();
    row.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      row.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);

  const go = (i) => {
    const row = ref.current?.previousElementSibling;
    const kid = row?.children[i];
    if (!row || !kid) return;
    const rr = row.getBoundingClientRect();
    const kr = kid.getBoundingClientRect();
    row.scrollBy({ left: kr.left + kr.width / 2 - (rr.left + rr.width / 2), behavior: 'smooth' });
  };

  return (
    <div ref={ref} className={`swipe-dots${light ? ' swipe-dots--light' : ''}`} role="group" aria-label="Slides">
      {Array.from({ length: count }, (_, i) => (
        <button key={i} type="button" className={i === active ? 'is-active' : ''} aria-label={`Slide ${i + 1}`} aria-current={i === active} onClick={() => go(i)} />
      ))}
    </div>
  );
}
