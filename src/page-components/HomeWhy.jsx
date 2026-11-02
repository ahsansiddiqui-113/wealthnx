'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import './HomeWhy.css';

const tabs = [
  { id: 'proactive', label: 'AI Insights', img: '/assets/home-why-proactive.webp', w: 1500, h: 602, alt: 'Proactive AI: a heads-up on upcoming bills, spending and budgets before you need it' },
  { id: 'all-in-one', label: 'All-in-one', img: '/assets/home-why-all-in-one.webp', w: 1500, h: 660, alt: 'All-in-one: your bank accounts, budgets, investments and crypto in one app' },
  { id: 'voice-to-voice', label: 'Voice-to-Voice', img: '/assets/home-why-voice-to-voice.webp', w: 1276, h: 521, alt: 'Voice-to-Voice: ask Wealth Genie out loud and hear the answer' },
  { id: 'voice-to-action', label: 'Voice-to-Action', img: '/assets/home-why-voice-to-action.webp', w: 1300, h: 506, alt: 'Voice-to-Action: ask Wealth Genie about a savings goal and explore the numbers' },
  { id: 'multi-assistants', label: 'Multi Assistants', img: '/assets/home-why-multi-assistants.webp', w: 1137, h: 536, alt: 'Multi Assistants: separate assistants for spending, stocks, crypto and custom views' },
];

const AUTO_MS = 6000;

export default function HomeWhy() {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const baseId = useId();
  const tabRefs = useRef([]);
  const sectionRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const active = tabs.find((tab) => tab.id === activeId) || tabs[0];
  const activeIndex = tabs.indexOf(active);

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  // Auto-advance through the tabs while the section is on screen and untouched; restarts after any manual change.
  useEffect(() => {
    if (paused || !visible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setTimeout(() => setActiveId(tabs[(activeIndex + 1) % tabs.length].id), AUTO_MS);
    return () => clearTimeout(timer);
  }, [paused, visible, activeIndex]);

  const onKeyDown = (event, index) => {
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0
      : event.key === 'End' ? tabs.length - 1
        : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    setActiveId(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section ref={sectionRef} className="hw2-section" id="how-it-works" aria-labelledby="why-title" onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="hw2-container">
        <div className="hw2-head">
          <h2 className="hw2-title" id="why-title" data-reveal>Why <b>WealthNX</b></h2>
          <div className="hw2-tabs-wrap">
            <div className="hw2-tabs" role="tablist" aria-label="Why WealthNX">
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
                  onClick={(event) => { setActiveId(tab.id); event.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }}
                  onKeyDown={(event) => onKeyDown(event, index)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div
          className="hw2-stage" data-reveal="fade"
          id={`${baseId}-panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${active.id}`}
          tabIndex={0}
        >
          {tabs.map((tab) => <img key={tab.id} className={tab.id === active.id ? 'is-shown' : undefined} src={tab.img} alt={tab.alt} width={tab.w} height={tab.h} loading="lazy" decoding="async" aria-hidden={tab.id === active.id ? undefined : true} />)}
        </div>
        <div className="hw2-dots">
          {tabs.map((tab, index) => <button key={tab.id} type="button" aria-label={`Show ${tab.label}`} aria-current={index === activeIndex} onClick={() => setActiveId(tab.id)} />)}
        </div>
        <Link className="hw2-viewall" href="/features/">View All Features</Link>
      </div>
    </section>
  );
}
