 'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import TopBar from '@/app/components/TopBar';
import { featureTabs } from '@/app/features/featureRegistry';
import { AppleStoreIcon, AndroidStoreIcon } from './StoreIcons';
import { APPLE_STORE_URL, GOOGLE_PLAY_URL } from '@/app/components/useStoreUrl';
import './FeatureDetailTemplate.css';
import './FeatureCarousel.css';
import './FeatureCarouselFix.css';
import './FeatureOrbitRail.css';
import './FeatureOrbitOverlapFix.css';
import './FeatureArcScale.css';
import './FeatureArcReference.css';
import './FeatureArcExact.css';
import './FeatureArcFinal.css';
import './FeatureResponsiveFix.css';
import './HomeRedesign.css';
import './HomeDownload.css';
import './FeatureMobile.css';
import './HeroCore.css';
import { heroCoreProps } from './heroCore';
import './FeaturesCompare.css';
import HomeDownload from './HomeDownload';
import PartnerStrip from '@/app/components/PartnerStrip';
import SiteFooter from '@/app/components/SiteFooter';

const CMP_BEFORE = [
  'A budget app to track spending',
  'Bill reminders or a calendar',
  'A spreadsheet for your net worth',
  'Separate brokerage and crypto apps to check holdings',
  'Stock news, earnings and filing sites',
  'Online searches to understand your numbers',
];
const CMP_AFTER = [
  'Transactions, Budgets and Cash Flow',
  'Bills and Subscriptions',
  'Net Worth and Assets, based on your connected accounts',
  'Members, with shared budgets and goals',
  'One Portfolio view of stocks, ETFs, crypto and retirement accounts',
  'Markets: earnings dates, insider trades and news sentiment',
  'Wealth Genie, which answers from your own accounts (Plus plan)',
];

const AUTO_ROTATE_MS = 1000;
const AUTO_ROTATE_MOBILE_MS = 2000;

function PlayIcon() { return <span className="fdt-play-icon" aria-hidden="true" />; }
function AppleIcon() { return <AppleStoreIcon />; }
function AndroidIcon() { return <AndroidStoreIcon />; }
const pad2 = (value) => String(value).padStart(2, '0');
const ChevronIcon = ({ dir }) => <svg viewBox="0 0 16 16" aria-hidden="true"><path d={dir === 'left' ? 'M10 3 5 8l5 5' : 'M6 3l5 5-5 5'} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export default function FeatureDetailTemplate() {
  const [tab, setTab] = useState('money');
  const featureSlides = featureTabs.find((item) => item.id === tab).slides;
  const [rawActive, setActiveFeature] = useState(0);
  // A stale autoplay tick can briefly leave the index past the end of a shorter tab; clamp it.
  const activeFeature = Math.min(rawActive, featureSlides.length - 1);
  const swipeStart = useRef(null);
  const suppressClick = useRef(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true); // carousel on screen and tab in the foreground
  const [touched, setTouched] = useState(false); // touch users cannot hover to pause, so a touch stops autoplay
  const orbitRef = useRef(null);

  useEffect(() => {
    let onScreen = true;
    let foreground = !document.hidden;
    const sync = () => setVisible(onScreen && foreground);
    const io = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; sync(); });
    io.observe(orbitRef.current);
    const onVisibility = () => { foreground = !document.hidden; sync(); };
    document.addEventListener('visibilitychange', onVisibility);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);

  // Auto-rotate; depending on activeFeature restarts the timer after any manual change.
  useEffect(() => {
    if (paused || touched || !visible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setInterval(() => setActiveFeature((index) => (index + 1) % featureSlides.length), window.matchMedia('(max-width: 700px)').matches ? AUTO_ROTATE_MOBILE_MS : AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [paused, touched, visible, activeFeature, tab]);
  const currentFeature = featureSlides[activeFeature];
  const selectFeature = (index) => setActiveFeature((index + featureSlides.length) % featureSlides.length);
  const startSwipe = (event) => {
    if (event.pointerType === 'touch') setTouched(true);
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    // Capturing the pointer on the carousel would swallow clicks on its links and buttons.
    if (event.target.closest('a, button')) return;
    swipeStart.current = { x: event.clientX, id: event.pointerId };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };
  const finishSwipe = (event) => {
    if (swipeStart.current === null) return;
    const distance = event.clientX - swipeStart.current.x;
    if (Math.abs(distance) > 36) {
      suppressClick.current = true;
      selectFeature(activeFeature + (distance < 0 ? 1 : -1));
      window.setTimeout(() => { suppressClick.current = false; }, 0);
    }
    if (event.currentTarget.hasPointerCapture?.(swipeStart.current.id)) event.currentTarget.releasePointerCapture(swipeStart.current.id);
    swipeStart.current = null;
  };
  const activateFeature = (event, index) => {
    if (suppressClick.current) { event.preventDefault(); return; }
    selectFeature(index);
  };

  return (
    <div className="feature-detail-template fdt-mobile fdt-features">
      <TopBar />
      <main>
        <section className="fdt-hero" aria-labelledby="feature-page-title">
          <div className="fdt-hero__copy"><h1 id="feature-page-title">Powerful Features for a <em>Brighter Financial you</em></h1></div>
          <div className="fdt-hero__visual" data-tilt aria-hidden="true"><div className="fdt-hero__glow" /><img src="/assets/home-hero-phone.webp" alt="" width={1400} height={1248} decoding="async" fetchPriority="high" className="fdt-hero-phone" {...heroCoreProps("/assets/home-hero-phone.webp")} /></div>
          <div className="fdt-hero__aside"><p>Everything you need to understand, manage and improve your financial life all in one place.</p><div className="fdt-hero__actions"><a href="https://wealthnx.ai/get" target="_blank" rel="noreferrer">Download Now</a><a className="fdt-play" href="https://www.youtube.com/watch?v=npaG1AtRbNw" target="_blank" rel="noreferrer" aria-label="Watch the WealthNX introduction"><PlayIcon /></a></div></div>
        </section>
        <PartnerStrip />
        <section className="fdt-product" aria-labelledby="net-worth-title">
          <div className="fdt-tabs" aria-label="Feature categories">{featureTabs.map(({ id, label }) => <button key={id} type="button" className={id === tab ? 'is-active' : ''} aria-pressed={id === tab} onClick={() => { setTab(id); setActiveFeature(0); }}>{label}</button>)}</div>
          <div className="fdt-orbit" ref={orbitRef} tabIndex={0} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} aria-label="Swipe or use arrow keys to explore features" onKeyDown={(event) => { if (event.key === 'ArrowRight') selectFeature(activeFeature + 1); if (event.key === 'ArrowLeft') selectFeature(activeFeature - 1); }} onPointerDown={startSwipe} onPointerUp={finishSwipe} onPointerCancel={() => { swipeStart.current = null; }}>
            <div className="fdt-orbit__rings" aria-hidden="true"><i /><i /><i /></div>
            {featureSlides.map((feature, index) => {
              const total = featureSlides.length;
              const offset = (index - activeFeature + total) % total;
              /* 7 slots around the arc, active in the middle (3); a short list is centred instead of wrapped */
              const railPosition = total >= 7 ? (offset + 3) % total : 3 + (offset > total / 2 ? offset - total : offset);
              return <button key={feature.name} type="button" className={`fdt-orbit__badge fdt-orbit__badge--slot-${railPosition} ${index === activeFeature ? 'is-active' : ''}`} style={{ '--feature-color': feature.color }} aria-label={`Show ${feature.name}`} aria-pressed={index === activeFeature} onClick={(event) => activateFeature(event, index)}><img src={feature.icon} alt="" /></button>;
            })}
            <div className="fdt-orbit__heading" key={currentFeature.name} aria-live="polite"><h2 id="net-worth-title">{currentFeature.name}</h2><p>{currentFeature.description}</p></div>
            <img key={currentFeature.image} src={currentFeature.image} alt={`WealthNX ${currentFeature.name} feature preview`} />
            <Link href={currentFeature.href}>{currentFeature.cta || 'Learn more'}</Link>
            <div className="fdt-orbit__dots" aria-label="Choose a feature">{featureSlides.map((feature, index) => <button key={feature.name} type="button" className={index === activeFeature ? 'is-active' : ''} aria-label={`Show ${feature.name}`} aria-pressed={index === activeFeature} onClick={(event) => activateFeature(event, index)} />)}</div>
            <button type="button" className="fdt-orbit__arrow fdt-orbit__arrow--prev" aria-label="Previous feature" onClick={(event) => activateFeature(event, activeFeature - 1)}><ChevronIcon dir="left" /></button>
            <button type="button" className="fdt-orbit__arrow fdt-orbit__arrow--next" aria-label="Next feature" onClick={(event) => activateFeature(event, activeFeature + 1)}><ChevronIcon dir="right" /></button>
            <div className="fdt-orbit__pager"><span aria-live="polite">{pad2(activeFeature + 1)}/{pad2(featureSlides.length)}</span><div><button type="button" aria-label="Previous feature" onClick={(event) => activateFeature(event, activeFeature - 1)}><ChevronIcon dir="left" /></button><button type="button" aria-label="Next feature" onClick={(event) => activateFeature(event, activeFeature + 1)}><ChevronIcon dir="right" /></button></div></div>
          </div>
        </section>
        <section className="fdt-cmp" aria-labelledby="fdt-cmp-title">
          <div className="fdt-cmp__inner">
            <h2 id="fdt-cmp-title" className="fdt-cmp__title" data-reveal>Fewer Apps to Check. <span>More Time to Understand Your Money.</span></h2>
            <p className="fdt-cmp__lead" data-reveal>If you use a different app for each part of your money, here is how those tasks look in WealthNX.</p>
            <div className="fdt-cmp__grid">
              <div className="fdt-cmp__col" data-reveal>
                <h3>If you use this today</h3>
                <ul>{CMP_BEFORE.map((text) => <li key={text}>{text}</li>)}</ul>
              </div>
              <div className="fdt-cmp__col is-with" data-reveal>
                <h3>WealthNX covers it with</h3>
                <ul>{CMP_AFTER.map((text) => <li key={text}>{text}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>
        <div className="home-redesign fdt-hd"><HomeDownload light /></div>
      </main>
      <SiteFooter />
    </div>
  );
}
