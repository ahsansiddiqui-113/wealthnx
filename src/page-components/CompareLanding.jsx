import React from 'react';
import TopBar from '@/app/components/TopBar';
import SiteFooter from '@/app/components/SiteFooter';
import { APPLE_STORE_URL, GOOGLE_PLAY_URL } from '@/app/components/useStoreUrl';
import { AppleStoreIcon, AndroidStoreIcon } from './StoreIcons';
import CompareFaq from './CompareFaq';
import { hero, quick, standUp, compareTopics, faqTitle, faqs, download } from './compareData';
import './FeatureDetailTemplate.css';
import './CompareLanding.css';

/** Placeholder brand badge: a monogram in the brand colour. Replace with real logos when supplied. */
export function BrandBadge({ brand, size = 'md' }) {
  if (!brand) {
    return (
      <span className={`cp-badge cp-badge--wx cp-badge--${size}`} aria-hidden="true">
        <img src="/assets/logo.svg" alt="" />
      </span>
    );
  }
  return (
    <span className={`cp-badge cp-badge--${size}`} style={{ '--brand': brand.color }} aria-hidden="true">
      {brand.logo ? <img src={brand.logo} alt="" width="96" height="96" loading="lazy" /> : <b>{brand.mark}</b>}
    </span>
  );
}

const Arrow = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 3l5 5-5 5" />
  </svg>
);

export default function CompareLanding() {
  const [heroA, heroB] = hero.title;
  const [standA, standB, standC] = standUp.title;
  const [topicsA, topicsB] = compareTopics.title;
  const [dlA, dlB, dlC] = download.title;

  return (
    <div className="feature-detail-template cp-page">
      <TopBar />

      {/* 2. Hero */}
      <section className="cp-hero" aria-labelledby="cp-title">
        <div className="cp-hero__glow" aria-hidden="true" />
        <div className="cp-hero__copy">
          <h1 id="cp-title">{heroA}<em>{heroB}</em></h1>
          <p>{hero.text}</p>
        </div>
        <div className="cp-hero__visual" aria-hidden="true">
          <img src="/assets/compare-hero.webp" alt="" width="1200" height="1002" />
        </div>
      </section>

      {/* 3. Quick comparison */}
      <section className="cp-quick" id="cp-quick" aria-labelledby="cp-quick-title">
        <h2 id="cp-quick-title" data-reveal>{quick.title}</h2>
        <p className="cp-quick__sub">{quick.subtitle}</p>
        <div className="cp-quick__grid">
          <div className="cp-qcard cp-qcard--light">
            <h3>{quick.priorityTitle}</h3>
            <ul>
              {quick.priorities.map((text, i) => (
                <li key={text} className={i === quick.priorities.length - 1 ? 'is-accent' : undefined}><span>{text}</span></li>
              ))}
            </ul>
          </div>
          <div className="cp-qcard cp-qcard--teal">
            <h3>{quick.startTitle}</h3>
            <ul>
              {quick.starts.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a href={item.href}><BrandBadge brand={item.brand} size="xs" /><span>{item.label}</span></a>
                  ) : (
                    <span className="cp-qcard__wx"><BrandBadge brand={null} size="xs" /><strong>{item.label}</strong>{item.badge && <em>{item.badge}</em>}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4 + 5. White panel */}
      <div className="cp-panel">
        <section className="cp-stand" aria-labelledby="cp-stand-title">
          <h2 id="cp-stand-title" data-reveal>{standA}<em>{standB}</em>{standC}</h2>
          <ul className="cp-stand__list">
            {standUp.rows.map((row, i) => (
              <li key={row.slug} style={{ "--i": i }} data-reveal>
                <a className="cp-row" href={row.href}>
                  <span className="cp-row__logos" aria-hidden="true">
                    <img src={`/assets/compare-vs-${row.slug}.webp`} alt="" width="286" height="187" />
                  </span>
                  <span className="cp-row__title">WealthNX vs {row.brand.name}</span>
                  <span className="cp-row__desc">{row.description}</span>
                  <span className="cp-row__go" aria-hidden="true"><Arrow /></span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="cp-topics" aria-labelledby="cp-topics-title">
          <h2 id="cp-topics-title" data-reveal>{topicsA}<em>{topicsB}</em></h2>
          <div className="cp-topics__cluster">
            <div className="cp-topics__glow" aria-hidden="true" />
            {compareTopics.cards.map((card, i) => (
              <article key={card.key} className={`cp-tcard cp-tcard--${card.key}`} style={{ "--i": i }} data-reveal>
                <h3>{card.title}</h3>
                <ul>{card.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* 6. FAQ */}
      <section className="cp-faq" aria-labelledby="cp-faq-title">
        <h2 id="cp-faq-title" data-reveal>{faqTitle}</h2>
        <CompareFaq items={faqs} />
      </section>

      {/* 7. Download */}
      <section className="fdt-download" id="download" aria-labelledby="download-title">
        <div className="fdt-download__copy">
          <h2 id="download-title">{dlA}<br />{dlB}<em>{dlC}</em></h2>
          <p>{download.text}</p>
          <div className="fdt-download__actions">
            <a href="https://wealthnx.ai/get" target="_blank" rel="noreferrer">Start Your 7-Day Free Trial</a>
          </div>
        </div>
        <div className="fdt-download__phones" aria-hidden="true">
          <div className="fdt-download__glow" />
          <img src="/assets/compare-download.webp" alt="" width="1400" height="833" />
        </div>
      </section>

      {/* 8. Footer */}
      <SiteFooter />
    </div>
  );
}
