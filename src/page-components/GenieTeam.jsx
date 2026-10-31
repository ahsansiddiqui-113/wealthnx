'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { genieAgents, GENIE_AGENT_ORDER } from './genieAgents';

const HOW_IT_WORKS_VIDEO_URL = 'https://www.youtube.com/watch?v=npaG1AtRbNw';
const HOW_IT_WORKS_THUMBNAIL = 'https://img.youtube.com/vi/npaG1AtRbNw/maxresdefault.jpg';
const COMPLIANCE_LINE = 'Information and explanations only. WealthNX does not provide personalized financial advice, trading signals, investment recommendations or transaction execution.';

/* ── Case-study icons (keyed by the string stored in genieAgents.js) ── */
const Svg = ({ children }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const ICONS = {
  SpendingBreakdown: <Svg><path d="M12 2a10 10 0 0 1 10 10" /><path d="M12 12 2 12a10 10 0 0 0 10 10z" /><path d="M12 12V2a10 10 0 0 0-7.07 17.07L12 12z" /></Svg>,
  CashFlow: <Svg><path d="M7 16V4m0 0L3 8m4-4 4 4" /><path d="M17 8v12m0 0 4-4m-4 4-4-4" /></Svg>,
  Anomaly: <Svg><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></Svg>,
  Trend: <Svg><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></Svg>,
  GoalProgress: <Svg><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></Svg>,
  Subscription: <Svg><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M3 21v-5h5" /></Svg>,
  PriceMovement: <Svg><rect x="3" y="3" width="18" height="18" rx="2" /><polyline points="7 14 10 10 13 13 17 8" /></Svg>,
  RiskReport: <Svg><path d="M12 2C8 2 4 4 4 4v8c0 6 8 10 8 10s8-4 8-10V4s-4-2-8-2z" /><polyline points="9 12 11 14 15 10" /></Svg>,
  Earnings: <Svg><rect x="5" y="3" width="14" height="18" rx="2" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="12" y2="16" /></Svg>,
  SectorCompare: <Svg><rect x="2" y="14" width="4" height="7" rx="1" /><rect x="9" y="9" width="4" height="12" rx="1" /><rect x="16" y="5" width="4" height="16" rx="1" /></Svg>,
  TopInvestor: <Svg><circle cx="12" cy="7" r="4" /><path d="M5.5 20a7 7 0 0 1 13 0" /><polyline points="15 11 17 13 21 9" /></Svg>,
  Technical: <Svg><polyline points="4 19 8 13 12 15 16 9 20 6" /><line x1="4" y1="19" x2="20" y2="19" /></Svg>,
  TokenCompare: <Svg><circle cx="8" cy="12" r="5" /><circle cx="16" cy="12" r="5" /></Svg>,
  Exposure: <Svg><circle cx="12" cy="12" r="10" /><path d="M12 2a10 10 0 0 1 7 17" /><path d="M12 12h8" /></Svg>,
  PriceBreakdown: <Svg><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></Svg>,
  Sentiment: <Svg><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></Svg>,
  OnChain: <Svg><rect x="2" y="7" width="6" height="6" rx="1" /><rect x="16" y="7" width="6" height="6" rx="1" /><rect x="9" y="3" width="6" height="6" rx="1" /><rect x="9" y="15" width="6" height="6" rx="1" /><line x1="8" y1="10" x2="9" y2="10" /><line x1="15" y1="10" x2="16" y2="10" /><line x1="12" y1="9" x2="12" y2="15" /></Svg>,
  DeFi: <Svg><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" /></Svg>,
  Dashboard: <Svg><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></Svg>,
  SpendIncome: <Svg><rect x="2" y="10" width="4" height="10" rx="1" /><rect x="9" y="6" width="4" height="14" rx="1" /><rect x="16" y="13" width="4" height="7" rx="1" /><line x1="2" y1="20" x2="20" y2="20" /></Svg>,
  Portfolio: <Svg><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></Svg>,
  GoalTracker: <Svg><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></Svg>,
  Watchlist: <Svg><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></Svg>,
  MonthlyReport: <Svg><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="8" y1="14" x2="16" y2="14" /><line x1="8" y1="18" x2="12" y2="18" /></Svg>,
  Concept: <Svg><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></Svg>,
  CrossAccount: <Svg><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /><line x1="6" y1="15" x2="10" y2="15" /></Svg>,
  DebtStrategy: <Svg><polyline points="17 11 21 7 17 3" /><line x1="21" y1="7" x2="9" y2="7" /><polyline points="7 21 3 17 7 13" /><line x1="3" y1="17" x2="15" y2="17" /></Svg>,
  InvestBasics: <Svg><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></Svg>,
  TaxQuestion: <Svg><rect x="4" y="4" width="16" height="16" rx="2" /><line x1="9" y1="15" x2="15" y2="9" /><circle cx="9.5" cy="9.5" r=".8" /><circle cx="14.5" cy="14.5" r=".8" /></Svg>,
};

const PANELS = ['about', 'how', 'faq', 'cases', 'feedback'];
const PANEL_LABELS = {
  about: 'About',
  how: 'How it works',
  faq: 'FAQ',
  cases: 'Use Cases',
  feedback: 'Feedback',
};

/* phone (<=700px): How it works / FAQ / Use Cases / Feedback are collapsed accordion rows */
const ACCORDION_PANELS = ['how', 'faq', 'cases', 'feedback'];
const MOBILE_QUERY = '(max-width: 700px)';

const clamp01 = (n) => Math.min(1, Math.max(0, n));

/* initialAgent: which assistant is open first (the /features/<assistant>/ pages open straight on theirs). */
export default function GenieTeam({ initialAgent }) {
  const startKey = GENIE_AGENT_ORDER.includes(initialAgent) ? initialAgent : GENIE_AGENT_ORDER[0];
  const [activeKey, setActiveKey] = useState(startKey);
  const [activePanel, setActivePanel] = useState('about');
  const [openFaq, setOpenFaq] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mOpen, setMOpen] = useState(null);

  const [feedbackAgent, setFeedbackAgent] = useState(genieAgents[startKey].label);
  const [feedbackRating, setFeedbackRating] = useState(4);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const panelRefs = useRef({});
  const barRefs = useRef({});
  const tabsRef = useRef(null);
  const rowRefs = useRef({});
  const anchorRef = useRef(null);
  const [mActive, setMActive] = useState('about');
  const activePanelRef = useRef('about');
  const msgTimer = useRef(null);

  const agent = genieAgents[activeKey];

  /* ── scroll-spy: the panel crossing a band near the viewport middle is active ── */
  useEffect(() => {
    const els = PANELS.map((id) => panelRefs.current[id]).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.panel;
            activePanelRef.current = id;
            setActivePanel(id);
          }
        });
      },
      { rootMargin: '-38% 0px -52% 0px', threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── progress bar under the active sidebar item = how far through the panel you are ── */
  const updateProgress = useCallback(() => {
    if (window.matchMedia(MOBILE_QUERY).matches) return;
    const id = activePanelRef.current;
    const el = panelRefs.current[id];
    const bar = barRefs.current[id];
    if (!el || !bar) return;
    const rect = el.getBoundingClientRect();
    const focusLine = window.innerHeight * 0.38;
    bar.style.width = `${Math.round(clamp01((focusLine - rect.top) / rect.height) * 100)}%`;
  }, []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProgress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [updateProgress]);

  useEffect(() => { updateProgress(); }, [activePanel, updateProgress]);
  useEffect(() => () => clearTimeout(msgTimer.current), []);

  /* track the phone breakpoint (only used for accordion aria + click behaviour) */
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia(MOBILE_QUERY);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener ? mq.addEventListener('change', sync) : mq.addListener(sync);
    return () => { mq.removeEventListener ? mq.removeEventListener('change', sync) : mq.removeListener(sync); };
  }, []);

  /* phone: keep the active assistant tab centred in the horizontally scrolling row (scrolls the row only, never the page) */
  useEffect(() => {
    const row = tabsRef.current;
    if (!row || row.scrollWidth <= row.clientWidth) return;
    const tab = row.querySelector('.gl-tab.is-active');
    if (!tab) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const left = tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2;
    row.scrollTo({ left: Math.max(0, left), behavior: reduce ? 'auto' : 'smooth' });
  }, [activeKey]);

  /* phone: follow the scroll like the web version. The row crossing a focus line becomes active: its panel opens (How it
     works / FAQ / Case Studies / Feedback), the "Why" row expands with its progress bar, and the previous one closes.
     Opening/closing above the viewport would shift the page, so the newly active row is pinned in place right after
     the layout change (see the layout effect below). */
  useEffect(() => {
    if (!isMobile) return undefined;
    let frame = 0;
    let settle = 0;
    let pending = null;
    const tick = () => {
      frame = 0;
      const focus = window.innerHeight * 0.45;
      let current = PANELS[0];
      PANELS.forEach((id) => {
        const el = rowRefs.current[id];
        if (el && el.getBoundingClientRect().top <= focus) current = id;
      });
      /* a short settle delay so rows don't flick open/closed while scrolling fast (lazier, calmer feel) */
      if (pending !== current) {
        pending = current;
        clearTimeout(settle);
        settle = setTimeout(() => {
          const target = pending;
          setMActive((prev) => {
            if (prev === target) return prev;
            const el = rowRefs.current[target];
            if (el) anchorRef.current = { el, top: el.getBoundingClientRect().top };
            return target;
          });
        }, 320);
      }
      const why = rowRefs.current.why;
      const next = rowRefs.current.how;
      const bar = barRefs.current.why;
      if (why && next && bar) {
        const top = why.getBoundingClientRect().top;
        const span = next.getBoundingClientRect().top - top;
        bar.style.width = `${Math.round(clamp01(span > 0 ? (focus - top) / span : 0) * 100)}%`;
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(tick); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isMobile]);

  useEffect(() => { setMOpen(isMobile && ACCORDION_PANELS.includes(mActive) ? mActive : null); }, [isMobile, mActive]);

  useLayoutEffect(() => {
    const a = anchorRef.current;
    anchorRef.current = null;
    if (!a || !a.el.isConnected) return;
    const delta = a.el.getBoundingClientRect().top - a.top;
    if (Math.abs(delta) > 1) window.scrollBy(0, delta);
  }, [mActive, mOpen]);

  const goToPanel = (id) => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia(MOBILE_QUERY).matches) {
      const row = rowRefs.current[id];
      if (row) {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: window.scrollY + row.getBoundingClientRect().top - window.innerHeight * 0.3, behavior: reduce ? 'auto' : 'smooth' });
      }
      return;
    }
    const el = panelRefs.current[id];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectAgent = (key) => {
    setActiveKey(key);
    setOpenFaq(null);
    setFeedbackAgent(genieAgents[key].label);
  };

  const flashMessage = (text, ms) => {
    setFeedbackMsg(text);
    clearTimeout(msgTimer.current);
    msgTimer.current = setTimeout(() => setFeedbackMsg(''), ms);
  };

  const submitFeedback = async () => {
    if (!feedbackText.trim()) {
      flashMessage('Please write something before submitting.', 3000);
      return;
    }
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent: feedbackAgent,
          rating: feedbackRating,
          message: feedbackText.trim(),
          page: '/wealth-genie',
        }),
      });
      if (res.ok) {
        setFeedbackText('');
        setFeedbackRating(4);
        flashMessage('✓ Thank you! Your feedback has been submitted.', 4000);
      } else {
        flashMessage('Something went wrong. Please try again.', 4000);
      }
    } catch {
      flashMessage('Something went wrong. Please try again.', 4000);
    }
  };

  const setPanelRef = (id) => (el) => { panelRefs.current[id] = el; };
  const setBarRef = (id) => (el) => { barRefs.current[id] = el; };

  const sidebarItems = PANELS.map((id) => ({
    id,
    label: PANEL_LABELS[id],
    desc: id === 'about' ? agent.aboutDesc : '',
  }));

  const disclaimerText = agent.disclaimer.replace(/^Disclaimer:\s*/i, '');
  const ratingLabel = feedbackRating >= 5 ? 'Excellent' : feedbackRating >= 4 ? 'Good' : feedbackRating >= 3 ? 'Okay' : 'Poor';

  return (
    <section className="gl-team" aria-labelledby="gl-team-title">
      <h2 id="gl-team-title" className="gl-team__title">Meet Wealth Genie, Your <em>AI Personal Finance Assistant</em></h2>

      <div className="gl-tabs" role="tablist" ref={tabsRef} aria-label="Choose an AI assistant">
        {GENIE_AGENT_ORDER.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            id={`gl-tab-${key}`}
            aria-selected={activeKey === key}
            aria-controls="gl-panels"
            className={`gl-tab${activeKey === key ? ' is-active' : ''}`}
            onClick={() => selectAgent(key)}
          >
            {genieAgents[key].label}
          </button>
        ))}
      </div>
      <p className="gl-compliance">{COMPLIANCE_LINE}</p>

      <div className="gl-body">
        <nav className="gl-side" aria-label="Section navigation">
          <ul>
            {sidebarItems.map((item) => {
              const isActive = activePanel === item.id;
              return (
                <li key={item.id} ref={(el) => { rowRefs.current[item.id] = el; }} className={`gl-item--${item.id}${isActive ? ' is-active' : ''}${mOpen === item.id ? ' is-m-open' : ''}${isMobile && mActive === item.id ? ' is-m-active' : ''}`}>
                  <button type="button" aria-current={isActive ? 'true' : undefined} aria-expanded={isMobile && ACCORDION_PANELS.includes(item.id) ? mOpen === item.id : undefined} onClick={() => goToPanel(item.id)}>
                    <span className="gl-side__label">{item.label}</span>
                    {isActive && item.desc ? <span className="gl-side__desc">{item.desc}</span> : null}
                  </button>
                  {isActive ? <span className="gl-side__track" aria-hidden="true"><span className="gl-side__bar" ref={setBarRef(item.id)} /></span> : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="gl-panels" id="gl-panels" role="tabpanel" aria-labelledby={`gl-tab-${activeKey}`}>
          {/* 1 · About */}
          <article className="gl-panel gl-panel--about" id="genie-about" data-panel="about" ref={setPanelRef('about')} aria-label="About">
            <img src={agent.aboutImg} alt={`${agent.title} in the WealthNX app`} loading="lazy" />
          </article>

          {/* 3 · How it works */}
          <article className={`gl-panel gl-panel--video${mOpen === 'how' ? ' is-m-open' : ''}`} id="genie-how" data-panel="how" ref={setPanelRef('how')} aria-label="How it works">
            <a
              className="gl-video"
              href={HOW_IT_WORKS_VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Watch how it works on YouTube"
              style={{ backgroundImage: `url(${HOW_IT_WORKS_THUMBNAIL})` }}
            >
              <span className="gl-video__play" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 6.8V17.2C8 18 8.8 18.48 9.46 18.06L17.6 12.86C18.2 12.47 18.2 11.53 17.6 11.14L9.46 5.94C8.8 5.52 8 6 8 6.8Z" /></svg>
              </span>
            </a>
          </article>

          {/* 4 · FAQ */}
          <article className={`gl-panel gl-panel--faq${mOpen === 'faq' ? ' is-m-open' : ''}`} id="genie-faq" data-panel="faq" ref={setPanelRef('faq')} aria-label="FAQ">
            <div className="gl-faq">
              {agent.faq.map((item, i) => {
                const open = openFaq === i;
                return (
                  <div key={item.q} className={`gl-faq__item${open ? ' is-open' : ''}`}>
                    <button type="button" className="gl-faq__q" aria-expanded={open} onClick={() => setOpenFaq(open ? null : i)}>
                      <span>{item.q}</span>
                      <span className="gl-faq__icon" aria-hidden="true">{open ? '−' : '+'}</span>
                    </button>
                    {open ? <p className="gl-faq__a">{item.a}</p> : null}
                  </div>
                );
              })}
            </div>
          </article>

          {/* 5 · Use cases */}
          <article className={`gl-panel gl-panel--cases${mOpen === 'cases' ? ' is-m-open' : ''}`} id="genie-cases" data-panel="cases" ref={setPanelRef('cases')} aria-label="Use Cases">
            <div className="gl-cases">
              {agent.useCases.map((cs) => (
                <div key={cs.title} className="gl-case">
                  <span className="gl-case__icon">{ICONS[cs.icon] || null}</span>
                  <h3>{cs.title}</h3>
                  <p>{cs.desc}</p>
                </div>
              ))}
            </div>
            <p className="gl-disclaimer"><b>Disclaimer</b><span>{disclaimerText}</span></p>
          </article>

          {/* 6 · Feedback */}
          <article className={`gl-panel gl-panel--feedback${mOpen === 'feedback' ? ' is-m-open' : ''}`} id="genie-feedback" data-panel="feedback" ref={setPanelRef('feedback')} aria-label="Feedback">
            <div className="gl-fb__left">
              <h3>Share your feedback</h3>
              <p>Your experience shapes what&apos;s next. Tell us what&apos;s working and what could be better. All feedback is reviewed by the WealthNX team.</p>
              <div className="gl-fb__field">
                <span className="gl-fb__label" id="gl-fb-agent">Which agent?</span>
                <div className="gl-fb__chips" role="group" aria-labelledby="gl-fb-agent">
                  {GENIE_AGENT_ORDER.map((key) => {
                    const label = genieAgents[key].label;
                    return (
                      <button key={key} type="button" aria-pressed={feedbackAgent === label} className={`gl-chip${feedbackAgent === label ? ' is-active' : ''}`} onClick={() => setFeedbackAgent(label)}>
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="gl-fb__field">
                <span className="gl-fb__label">Your rating</span>
                <div className="gl-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" className={`gl-star${star <= feedbackRating ? ' is-active' : ''}`} onClick={() => setFeedbackRating(star)} aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}>★</button>
                  ))}
                  <span className="gl-stars__label">{ratingLabel}</span>
                </div>
              </div>
            </div>
            <div className="gl-fb__right">
              <label className="gl-fb__label" htmlFor="gl-fb-text">What can we improve?</label>
              <textarea
                id="gl-fb-text"
                className="gl-fb__textarea"
                placeholder="Describe your experience or suggest an improvement..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                rows={5}
              />
              {feedbackMsg ? <p className="gl-fb__msg" role="status">{feedbackMsg}</p> : null}
              <button type="button" className="gl-fb__submit" onClick={submitFeedback}>Send Feedback</button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
