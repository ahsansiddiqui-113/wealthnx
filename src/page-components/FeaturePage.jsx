import React from 'react';
import Link from 'next/link';
import TopBar from '@/app/components/TopBar';
import { APPLE_STORE_URL, GOOGLE_PLAY_URL } from '@/app/components/useStoreUrl';
import FeatureIcon from './FeatureIcons';
import { AppleStoreIcon, AndroidStoreIcon } from './StoreIcons';
import './FeatureDetailTemplate.css';
import './FeaturePage.css';
import './FeaturePageSections.css';
import './HomeRedesign.css';
import './HomeDownload.css';
import './HeroCore.css';
import { heroCoreProps } from './heroCore';
import './FeatureMobile.css';
import HomeDownload from './HomeDownload';
import SiteFooter from '@/app/components/SiteFooter';
import PartnerStrip from '@/app/components/PartnerStrip';

const COVER_ICONS = ['bank', 'coins', 'layers', 'link'];
const DEMO_VIDEO_URL = 'https://www.youtube.com/watch?v=npaG1AtRbNw';

/** Generic net-worth style line chart card (decorative). */
function NetWorthChart() {
  return (
    <div className="fp-chart" data-reveal="fade" aria-hidden="true">
      <div className="fp-chart__head">$2,976.15 <small>4%</small></div>
      <svg viewBox="0 0 400 220">
        <defs>
          <linearGradient id="fpg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1bc8bb" stopOpacity=".35" /><stop offset="1" stopColor="#1bc8bb" stopOpacity="0" /></linearGradient>
        </defs>
        <path d="M0 200 L40 170 L70 185 L110 130 L140 150 L180 90 L215 120 L250 70 L285 95 L320 55 L360 40 L400 20 L400 220 L0 220Z" fill="url(#fpg)" />
        <path d="M0 200 L40 170 L70 185 L110 130 L140 150 L180 90 L215 120 L250 70 L285 95 L320 55 L360 40 L400 20" fill="none" stroke="#1bc8bb" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="250" cy="70" r="5" fill="#0b0c0c" stroke="#fff" strokeWidth="2" />
      </svg>
      <div className="fp-chart__tabs"><span>1 M</span><span>3 M</span><span className="is-on">6 M</span><span>1 Y</span><span>YTD</span></div>
    </div>
  );
}

/** Shared layout for every dropdown feature page; only `content` changes per feature. */
export default function FeaturePage({ content }) {
  const { hero, cards, faqs, explore, cta } = content;
  /* layout "compact" (Voice To Voice, Voice To Action, AI Insights): hero, six cards, FAQ, download. No intro / comparison / covers / ask. */
  const compact = content.layout === "compact";
  const intro = compact ? null : content.intro;
  const why = compact ? null : content.why;
  const covers = compact ? null : content.covers;
  const ask = compact ? null : content.ask;
  /* long headlines get a smaller size so they wrap in 3-4 lines (see FeaturePage.css) */
  const hlLen = `${hero.headline.replace(/:\s*$/, "")} ${hero.accent}`.length;
  const exploreAccent = explore?.accent || `${content.label} Tracker?`;

  return (
    <div className={`feature-detail-template feature-page fdt-mobile${compact ? " fp-compact" : ""}`}>
      <TopBar />
      <main>
        <section className="fdt-hero" aria-labelledby="feature-page-title">
          <div className="fdt-hero__copy">
            <h1 id="feature-page-title" data-hl={hlLen >= 65 ? "xl" : hlLen >= 52 ? "lg" : undefined}>{hero.headline.replace(/:\s*$/, "")} <em>{hero.accent}</em></h1>
          </div>
          <div className="fdt-hero__visual" data-tilt aria-hidden="true">
            <div className="fdt-hero__glow" />
            <img src={hero.image} alt="" width={hero.width} height={hero.height} className="fdt-hero-phone" {...heroCoreProps(hero.image)} />
          </div>
          <div className="fdt-hero__aside">
            <p>{hero.blurb}</p>
            <div className="fdt-hero__actions">
              <a href="https://wealthnx.ai/get" target="_blank" rel="noreferrer">Download Now</a>
              <a href={DEMO_VIDEO_URL} target="_blank" rel="noreferrer" className="fp-play" aria-label="Watch the WealthNX introduction"><span className="fdt-play-icon" aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <PartnerStrip />

        {intro && (
          <section className="fp-dark fp-intro" aria-labelledby="fp-intro-title">
            <div data-reveal="fade">
              <h2 id="fp-intro-title" className="fp-h2">{intro.title}</h2>
              {intro.text && <p className="fp-lead">{intro.text}</p>}
            </div>
            {intro.image
              ? <div className="fp-intro__visual" data-reveal="fade"><img src={intro.image.src} alt="" width={intro.image.width} height={intro.image.height} loading="lazy" /></div>
              : <NetWorthChart />}
          </section>
        )}

        {cards?.length > 0 && (
          <section className="fp-dark fp-explore" aria-labelledby="fp-explore-title">
            <h2 id="fp-explore-title" className={`fp-h2 fp-h2--center${compact ? " fp-sr" : ""}`}>{explore?.title || 'What Can You See in the'} <em>{exploreAccent}</em></h2>
            <ul className="fp-features__grid">
              {cards.map((card) => (
                <li key={card.title} className="fp-feature-card">
                  <span className="fp-feature-card__icon"><FeatureIcon name={card.icon} /></span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {why && (
          <section className="fp-light fp-why" aria-labelledby="fp-why-title">
            <h2 id="fp-why-title" className="fp-h2 fp-h2--center">{why.title || 'Why You Need the'} <em>{why.accent}</em></h2>
            {why.lead && <p className="fp-why__lead">{why.lead}</p>}
            <div className="fp-compare">
              <div>
                <h3>{why.withoutTitle || (why.accent ? `Without A ${why.accent}` : 'Without This')}</h3>
                <ul>{(why.without || []).map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
              <div className="is-with">
                <h3>With WealthNX</h3>
                <ul>{(why.with || []).map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            </div>
            {why.note && <p className="fp-why__note">{why.note}</p>}
          </section>
        )}

        {covers && (
          <section className={`fp-dark fp-covers${why ? '' : ' fp-covers--flat'}`} aria-labelledby="fp-covers-title">
            <div>
              <h2 id="fp-covers-title" className="fp-h2">{covers.title}</h2>
              {covers.text && <p className="fp-lead">{covers.text}</p>}
              {covers.note && <p className="fp-covers__note">{covers.note}</p>}
            </div>
            <ul className="fp-covers__grid">
              {(covers.items || []).map((item, i) => (
                <li key={item.title}>
                  <span className="fp-covers__icon"><FeatureIcon name={COVER_ICONS[i % COVER_ICONS.length]} /></span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {ask && (
          <section className="fp-ask-wrap" aria-labelledby="fp-ask-title">
            <div className="fp-ask">
              <div className="fp-ask__copy">
                <h2 id="fp-ask-title" className="fp-h2">{ask.title} <em>{ask.accent}</em></h2>
                {ask.text && <p className="fp-lead">{ask.text}</p>}
                {ask.questions?.length > 0 && <ul className="fp-chips">{ask.questions.map((q) => <li key={q}>{q}</li>)}</ul>}
              </div>
              <div className="fp-ask__visual">
                <img className="fp-ask__genie" src="/assets/feature-genie-phone.webp" alt="" width={483} height={564} loading="lazy" />
                {ask.note && <p className="fp-ask__note">{ask.note}</p>}
                <Link className="fp-ask__cta" href={ask.link?.href || '/wealth-genie/'}>{ask.link?.label || 'Try Wealth Genie'}</Link>
              </div>
            </div>
          </section>
        )}

        {faqs?.length > 0 && (
          <section className="fp-dark fp-faq" aria-labelledby="fp-faq-title">
            <h2 id="fp-faq-title" className="fp-h2 fp-h2--center">{content.faqTitle || 'Frequently Asked Questions'}</h2>
            <div className="fp-faq__list">
              {faqs.map(([q, a], i) => (
                <details key={q} name="fp-faq" open={i === 0}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <div className="home-redesign fdt-hd"><HomeDownload light wrap {...(cta || {})} /></div>
      </main>

      <SiteFooter />
    </div>
  );
}
