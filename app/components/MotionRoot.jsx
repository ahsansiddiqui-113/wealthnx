'use client';

import { useEffect } from 'react';

/* Mounted once in layout.jsx. Drives [data-reveal] (scroll reveal), [data-count] (count-up) and [data-tilt]
   (pointer tilt) for the whole site; pages only add attributes. See docs/MOTION.md. */
export default function MotionRoot() {
  /* Loading: below-the-fold images are loading="lazy", which only starts a download when they are about to scroll in
     (late pop-in on slower connections). Start them ~2 screens ahead instead, and play the muted review videos only
     while they are near the viewport (they no longer compete with the hero images for bandwidth on load). */
  useEffect(() => {
    const ahead = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        ahead.unobserve(target);
        if (target.tagName === 'IMG') target.loading = 'eager';
      });
    }, { rootMargin: '2200px 0px' });
    const videos = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) { if (target.preload !== 'auto') target.preload = 'auto'; const p = target.play(); if (p && p.catch) p.catch(() => {}); } else target.pause();
      });
    }, { rootMargin: '300px 0px' });
    const seenMedia = new WeakSet();
    const scanMedia = () => {
      document.querySelectorAll('img[loading="lazy"]').forEach((img) => { if (!seenMedia.has(img)) { seenMedia.add(img); ahead.observe(img); } });
      document.querySelectorAll('video[data-lazy-video]').forEach((v) => { if (!seenMedia.has(v)) { seenMedia.add(v); videos.observe(v); } });
    };
    scanMedia();
    const mediaMo = new MutationObserver(scanMedia);
    mediaMo.observe(document.body, { childList: true, subtree: true });
    return () => { ahead.disconnect(); videos.disconnect(); mediaMo.disconnect(); };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return undefined; // no .js-motion => everything stays visible and static
    const seen = new WeakSet();

    const countUp = (el) => {
      const node = el.firstChild;
      const m = node && node.nodeType === 3 && node.nodeValue.match(/^(\d[\d,]*)([\s\S]*)$/);
      if (!m) return;
      const end = Number(m[1].replace(/,/g, ''));
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min((t - t0) / 1200, 1);
        const v = Math.round(end * (1 - (1 - p) ** 3));
        node.nodeValue = (m[1].includes(',') ? v.toLocaleString('en-US') : v) + m[2];
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        io.unobserve(target);
        if (target.hasAttribute('data-reveal')) {
          target.classList.add('is-in');
          // Once shown, hand the element back to its own CSS (hover lifts etc.).
          setTimeout(() => target.removeAttribute('data-reveal'), 1500);
        }
        if (target.hasAttribute('data-count')) countUp(target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });

    const scan = () => {
      document.querySelectorAll('[data-reveal],[data-count]').forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        // Already on screen (or scrolled past) when found: never hide it.
        if (el.hasAttribute('data-reveal') && el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add('is-in');
        io.observe(el);
      });
    };
    scan();
    document.documentElement.classList.add('js-motion');
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    // Tilt: one delegated pointer listener, mouse/pen only, rAF-throttled, springs back via CSS transition.
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const MAX = 7; // degrees
    let cur = null;
    let pt = null;
    let raf = 0;
    const apply = () => {
      raf = 0;
      if (!cur || !pt) return;
      const r = cur.getBoundingClientRect();
      const x = Math.min(Math.max((pt.x - r.left) / r.width, 0), 1) - 0.5;
      const y = Math.min(Math.max((pt.y - r.top) / r.height, 0), 1) - 0.5;
      cur.style.transform = `perspective(1100px) rotateX(${(-y * 2 * MAX).toFixed(2)}deg) rotateY(${(x * 2 * MAX).toFixed(2)}deg)`;
    };
    const release = () => { if (cur) cur.style.transform = ''; cur = null; };
    const onMove = (e) => {
      if (!fine.matches || e.pointerType === 'touch') return;
      const t = e.target.closest ? e.target.closest('[data-tilt]') : null;
      if (t !== cur) { release(); cur = t; }
      if (!cur) return;
      pt = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(apply);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', release);

    return () => {
      io.disconnect();
      mo.disconnect();
      document.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', release);
      document.documentElement.classList.remove('js-motion');
    };
  }, []);
  return null;
}
