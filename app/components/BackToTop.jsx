'use client';

import { useEffect, useState } from 'react';
import styles from './BackToTop.module.css';

/* Floating "back to top" button, mounted once in layout.jsx. The header is not sticky, so after scrolling down the
   visitor can jump straight back to the top. Appears after one screen of scrolling. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > Math.max(480, window.innerHeight * 0.6));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <button type="button" className={`${styles.btn} ${visible ? styles.show : ''}`.trim()} onClick={toTop} aria-label="Back to top" tabIndex={visible ? 0 : -1}>
      <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 10.5 8 5.5l5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
  );
}
