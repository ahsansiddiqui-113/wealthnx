'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import './HomeWhy.css';

const tabs = [
  { id: 'proactive', label: 'AI Insights', img: '/assets/home-why-proactive.webp', w: 1500, h: 768, mob: '/assets/home-why-mob-proactive-s.webp', mw: 720, mh: 923, alt: 'Proactive AI: a heads-up on upcoming bills, spending and budgets before you need it' },
  { id: 'all-in-one', label: 'All-in-one', img: '/assets/home-why-all-in-one.webp', w: 1500, h: 802, mob: '/assets/home-why-mob-all-in-one-s.webp', mw: 720, mh: 1064, alt: 'All-in-one: your bank accounts, budgets, investments and crypto in one app' },
  { id: 'voice-to-voice', label: 'Voice-to-Voice', img: '/assets/home-why-voice-to-voice.webp', w: 1500, h: 674, mob: '/assets/home-why-mob-voice-to-voice-s.webp', mw: 720, mh: 1327, alt: 'Voice-to-Voice: ask Wealth Genie out loud and hear the answer' },
  { id: 'voice-to-action', label: 'Voice-to-Action', img: '/assets/home-why-voice-to-action-v2.webp', w: 2000, h: 848, mob: '/assets/home-why-mob-voice-to-action-v3.webp', mw: 900, mh: 1358, alt: 'Voice-to-Action: ask Wealth Genie about a savings goal and explore the numbers' },
  { id: 'multi-assistants', label: 'Multi Assistants', img: '/assets/home-why-multi-assistants.webp', w: 1400, h: 837, mob: '/assets/home-why-mob-multi-assistants-s.webp', mw: 720, mh: 1198, alt: 'Multi Assistants: separate assistants for spending, stocks, crypto and custom views' },
];

const AUTO_MS = 6000;
const IMG_SCALE = 0.93; // phones: the picture is a little narrower than its slide
const MOBILE_MQ = '(max-width: 700px)';
const isMobile = () => typeof window !== 'undefined' && window.matchMedia(MOBILE_MQ).matches;
const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function HomeWhy() {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const baseId = useId();
  const tabRefs = useRef([]);
  const sectionRef = useRef(null);
  const tabRowRef = useRef(null);
  const stageRef = useRef(null);
  const activeIndexRef = useRef(0);
  const sizeToRef = useRef(null);
  const tabFadeRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const active = tabs.find((tab) => tab.id === activeId) || tabs[0];
  const activeIndex = tabs.indexOf(active);

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  // Phones: fetch and decode the five small pictures before the section scrolls into view (they sit off-screen in the carousel, so
  // lazy loading would otherwise only start them mid-swipe).
  useEffect(() => {
    if (!isMobile() || !('IntersectionObserver' in window) || !sectionRef.current) return undefined;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((en) => en.isIntersecting)) return;
      io.disconnect();
      const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 200));
      idle(() => tabs.forEach((tab) => { const im = new Image(); im.decoding = 'async'; im.src = tab.mob; if (im.decode) im.decode().catch(() => {}); }));
    }, { rootMargin: '1200px 0px' });
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  // Auto-advance through the tabs while the section is on screen and untouched; restarts after any manual change.
  useEffect(() => {
    if (paused || !visible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setTimeout(() => setActiveId(tabs[(activeIndex + 1) % tabs.length].id), AUTO_MS);
    return () => clearTimeout(timer);
  }, [paused, visible, activeIndex]);

  // Keep the active tab centred by scrolling only the tab row sideways (never the page, so nothing jumps vertically).
  useEffect(() => {
    const btn = tabRefs.current[activeIndex];
    const row = tabRowRef.current;
    if (!btn || !row || row.scrollWidth <= row.clientWidth) return;
    const b = btn.getBoundingClientRect();
    const r = row.getBoundingClientRect();
    const max = row.scrollWidth - row.clientWidth;
    const left = row.scrollLeft + (b.left - r.left) - (row.clientWidth - b.width) / 2;
    row.scrollTo({ left: Math.min(max, Math.max(0, left)), behavior: reducedMotion() ? 'auto' : 'smooth' });
    const t = setTimeout(() => tabFadeRef.current?.(), 700);
    return () => clearTimeout(t);
  }, [activeIndex]);

  // Tab row: show the soft edge fades only on the sides that have more tabs to scroll to.
  useEffect(() => {
    const row = tabRowRef.current;
    const wrap = row?.parentElement;
    if (!row || !wrap) return undefined;
    const update = () => {
      const max = row.scrollWidth - row.clientWidth;
      wrap.toggleAttribute('data-fade-start', row.scrollLeft > 2);
      wrap.toggleAttribute('data-fade-end', max > 2 && row.scrollLeft < max - 2);
    };
    update();
    tabFadeRef.current = update;
    row.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(row);
    return () => { row.removeEventListener('scroll', update); ro.disconnect(); };
  }, []);

  // Phones: the stage is a swipeable scroll-snap carousel (one picture per slide, all at the stage width).
  // Its height follows the visible picture's natural height; it is set once when a slide settles (CSS transition), not on every
  // scroll frame, so swiping never triggers a layout. Changing height only moves content below the stage.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    let settleTimer;
    const sizeTo = () => {
      if (!isMobile()) { stage.style.height = ''; return; }
      const w = stage.clientWidth;
      if (!w) return;
      const tab = tabs[activeIndexRef.current] || tabs[0];
      stage.style.height = `${Math.round(w * IMG_SCALE * (tab.mh / tab.mw))}px`;
    };
    const settle = () => {
      if (!isMobile()) return;
      const w = stage.clientWidth;
      if (!w) return;
      const index = Math.round(stage.scrollLeft / w);
      if (tabs[index]) setActiveId(tabs[index].id);
    };
    const onScroll = () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, 120);
    };
    sizeTo();
    sizeToRef.current = sizeTo;
    stage.addEventListener('scroll', onScroll, { passive: true });
    const ro = new ResizeObserver(() => {
      // Width changed (rotation / resize): keep the current slide aligned and re-size the stage.
      if (isMobile()) stage.scrollLeft = activeIndexRef.current * stage.clientWidth;
      sizeTo();
    });
    ro.observe(stage);
    return () => { stage.removeEventListener('scroll', onScroll); ro.disconnect(); clearTimeout(settleTimer); };
  }, []);

  // Phones: tab clicks, dots and auto-advance slide the carousel sideways to the active picture.
  useEffect(() => {
    activeIndexRef.current = activeIndex;
    const stage = stageRef.current;
    if (!stage || !isMobile()) return undefined;
    sizeToRef.current?.();
    const w = stage.clientWidth;
    if (w && Math.round(stage.scrollLeft / w) !== activeIndex) {
      stage.scrollTo({ left: activeIndex * w, behavior: reducedMotion() ? 'auto' : 'smooth' });
    }
    // Safety net: if no scroll events arrive (background tab, interrupted animation), still settle the height.
    const t = setTimeout(() => sizeToRef.current?.(), 700);
    return () => clearTimeout(t);
  }, [activeIndex]);

  const onKeyDown = (event, index) => {
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0
      : event.key === 'End' ? tabs.length - 1
        : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    setActiveId(tabs[next].id);
    tabRefs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <section ref={sectionRef} className="hw2-section" id="how-it-works" aria-labelledby="why-title" onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="hw2-container">
        <div className="hw2-head">
          <h2 className="hw2-title" id="why-title" data-reveal>Why <b>WealthNX</b></h2>
          <div className="hw2-tabs-wrap">
            <div ref={tabRowRef} className="hw2-tabs" role="tablist" aria-label="Why WealthNX">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  ref={(node) => { tabRefs.current[index] = node; }}
                  id={`${baseId}-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  className="hw2-tab"
                  aria-selected={tab.id === active.id}
                  aria-controls={`${baseId}-panel-${tab.id}`}
                  tabIndex={tab.id === active.id ? 0 : -1}
                  onClick={() => setActiveId(tab.id)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div
          ref={stageRef}
          className="hw2-stage" data-reveal="fade"
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          id={`${baseId}-panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${active.id}`}
          tabIndex={0}
        >
          {tabs.map((tab) => (
            <picture key={tab.id}>
              <source media="(max-width: 700px)" srcSet={tab.mob} width={tab.mw} height={tab.mh} />
              <img className={tab.id === active.id ? 'is-shown' : undefined} src={tab.img} alt={tab.alt} width={tab.w} height={tab.h} loading="lazy" decoding="async" aria-hidden={tab.id === active.id ? undefined : true} />
            </picture>
          ))}
        </div>
        <div className="hw2-dots">
          {tabs.map((tab, index) => <button key={tab.id} type="button" aria-label={`Show ${tab.label}`} aria-current={index === activeIndex} onClick={() => setActiveId(tab.id)} />)}
        </div>
        <Link className="hw2-viewall" href="/features/">View All Features</Link>
      </div>
    </section>
  );
}
