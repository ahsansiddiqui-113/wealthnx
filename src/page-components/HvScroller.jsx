'use client';

import React, { useLayoutEffect, useRef } from 'react';

/* Horizontal scroller for the HomeVoices card rows. The Figma frame shows each row already scrolled a little
   (first card cut at the left edge), so the initial scroll position is `start` design units (1u = stage width / 893),
   centred on narrow screens. Mouse users can also drag the row; touch and trackpad scroll natively. */
export default function HvScroller({ className = '', start = 0, label, nav = false, children }) {
  const ref = useRef(null);
  const drag = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const stage = el?.closest('.hv-stage');
    if (!el || !stage) return;
    /* phones: the rows are re-laid out as plain swipe rows (HomeVoices.css), so start at the first card */
    if (window.matchMedia('(max-width: 560px)').matches) { el.scrollLeft = 0; return; }
    const u = stage.offsetWidth / 893;
    el.scrollLeft = start * u + Math.max(0, (stage.offsetWidth - el.clientWidth) / 2);
  }, [start]);

  const onPointerDown = (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    drag.current = { x: event.clientX, left: ref.current.scrollLeft };
    ref.current.classList.add('is-dragging');
  };
  const onPointerMove = (event) => {
    if (!drag.current) return;
    ref.current.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
  };
  const endDrag = () => {
    drag.current = null;
    ref.current?.classList.remove('is-dragging');
  };

  const step = (dir) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.6, 160), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return (
    <>
    <div
      ref={ref}
      className={`hv-scroll ${className}`}
      role="region" data-reveal
      aria-label={label}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
    >
      <div className="hv-track">{children}</div>
    </div>
    {nav && (
      <div className="hv-nav">
        <button type="button" className="hv-nav__btn" aria-label="Previous" onClick={() => step(-1)}>‹</button>
        <button type="button" className="hv-nav__btn is-next" aria-label="Next" onClick={() => step(1)}>›</button>
      </div>
    )}
    </>
  );
}
