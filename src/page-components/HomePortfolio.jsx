'use client';

import React, { useState } from 'react';

/* "Your Entire Portfolio. One View" home section (hpf- styles in HomePortfolio.css).
   Client component only for the list: hovering / focusing / clicking a card makes it the active (teal) one. */

const G = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };

const Icons = {
  retirement: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2.2" y="5" width="16.5" height="15.5" rx="1.6" fill="currentColor" />
      <rect x="4" y="9.6" width="12.9" height="9" rx=".6" fill="#f6f6f6" />
      <path d="M4.6 12.5h11.7M4.6 15.5h11.7M8.2 10v8.4M12.6 10v8.4" stroke="currentColor" strokeWidth="1.1" />
      <path d="M6 2.6v4M15 2.6v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="19" cy="9" r="3.2" fill="currentColor" />
    </svg>
  ),
  crypto: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path {...G} d="M4.2 10.4A8 8 0 0 1 17.6 6.2M19.8 13.6A8 8 0 0 1 6.4 17.8" />
      <path d="m18.6 2.6-.6 4.5-4.4-1.1ZM5.4 21.4l.6-4.5 4.4 1.1Z" fill="currentColor" />
      <circle cx="12" cy="12" r="4.6" {...G} strokeWidth="1.4" />
      <path {...G} strokeWidth="1.3" d="M13.5 10.4c-.4-.7-1.1-.9-1.6-.9-.9 0-1.5.5-1.5 1.1 0 1.7 3.2.7 3.2 2.4 0 .7-.7 1.2-1.7 1.2-.8 0-1.5-.3-1.8-1M12 8.4v.9M12 14.7v.9" />
    </svg>
  ),
  stocks: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.4 2.6c.9.9 2.1 1.1 3.6.4 1.5.7 2.7.5 3.6-.4l-1.7 3.4c1.9 1 6.6 4.8 6.6 10.2 0 3.7-2.7 5.6-8.5 5.6S3.5 19.900 3.500 16.200c0-5.400 4.700-9.200 6.600-10.200Z" fill="currentColor" />
      <path d="M12 9.2v10.4M14.700 11.700c-.4-.9-1.400-1.300-2.600-1.300-1.500 0-2.500.8-2.500 1.900 0 2.700 5.100 1.200 5.100 3.900 0 1.200-1.200 2-2.800 2-1.300 0-2.400-.5-2.900-1.600" fill="none" stroke="#43b9ab" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  realestate: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path {...G} strokeWidth="2.1" d="M19.800 14.200A9 9 0 1 1 9.800 3.300" />
      <path {...G} strokeWidth="2" d="M16.100 14.400A5.200 5.200 0 1 1 10 7.300" />
      <circle cx="12" cy="12" r="1.9" fill="currentColor" />
      <path {...G} strokeWidth="1.6" d="m12.200 11.800 8-8" />
      <path d="M15 3h6v6l-2-1.2V5l-1.200 1.300-1.600-1.600L17 3.400Z" fill="currentColor" />
    </svg>
  ),
  rsu: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path {...G} strokeWidth="1.5" d="M5 3.600h10.700a2.300 2.300 0 0 1 2.300 2.300v13l-1.700-1-1.600 1-1.500-1-1.600 1-1.600-1-1.600 1-1.500-1-1.500 1V5.900A2.300 2.300 0 0 1 5 3.600Z" />
      <path {...G} strokeWidth="1.5" d="M8 8h6.500M8 11.200h6.500M8 14.400h4M18 8h1.600a1.800 1.800 0 0 1 1.800 1.800" />
    </svg>
  ),
  multi: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11.500" cy="12.500" r="6.800" fill="currentColor" />
      <circle cx="11.500" cy="12.500" r="4.500" fill="none" stroke="#f6f6f6" strokeWidth="1.2" />
      <path d="M12.800 10.800c-.3-.6-.8-.8-1.400-.8-.8 0-1.300.4-1.300 1 0 1.500 2.900.6 2.900 2.100 0 .6-.6 1.100-1.500 1.100-.7 0-1.300-.3-1.600-.9M11.500 9.200v.9M11.500 14.300v.9" fill="none" stroke="#f6f6f6" strokeWidth="1.1" strokeLinecap="round" />
      <path d="m19.500 2.800 1.800 1.800-1.800 1.800-1.800-1.800ZM4.400 19.300l1.500 1.500-1.500 1.500-1.500-1.500Z" fill="currentColor" />
    </svg>
  ),
  forecasting: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" {...G} strokeWidth="1.3" />
      <path d="M16.400 7.600 13.300 16.700l-1.800-4.200-4.200-1.800Z" fill="currentColor" />
    </svg>
  ),
  analysis: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 14.500h2.200v7H3ZM7.200 12.500h2.200v9H7.200ZM11.400 14h2.200v7.500h-2.200ZM15.600 11h2.200v10.500h-2.200ZM19.800 9h2.200v12.500h-2.200Z" fill="currentColor" />
      <path {...G} strokeWidth="1.5" d="m3 11 4.500-3 3.600 2.200L18 5.400" />
      <path d="M14.500 5.300 19 3.800l-.9 4.600Z" fill="currentColor" />
      <rect x="3" y="2" width="5" height="5" rx=".8" fill="currentColor" />
      <path d="M5.500 3.200v1.700M5.500 5.700v.2" stroke="#f6f6f6" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),
};

/* tx = per-card nudge of the text column (the Figma frame places titles at slightly different x). */
const cards = [
  // { key: 'retirement', title: 'Retirement Accounts', body: 'Spend smarter, every month.', tx: 0 },
  { key: 'crypto', title: 'Crypto', body: 'Track your crypto holdings and monitor their value.', tx: 0 },
  { key: 'stocks', title: 'Stocks', body: 'Follow stock prices and track your portfolio\'s performance.', tx: -4 },
  { key: 'realestate', title: 'Real Estate', body: 'Track the estimated value of your properties.', tx: 0 },
  // { key: 'rsu', title: 'RSU', body: 'Track RSUs and key dates.', tx: -6 },
  { key: 'multi', title: 'Multiple Assets', body: 'Manage vehicles, real estate, collectibles, and more in one place.', tx: 0 },
  { key: 'forecasting', title: 'Forecasting', body: 'See how your net worth could grow over time.', tx: 2 },
  { key: 'analysis', title: 'Portfolio Analysis', body: 'Understand your portfolio\'s performance and asset allocation.', tx: -4 },
];

const DECO_DOTS = [
  [-7, -31, '#ff8f8f'], [-62, 14, '#ff9a9a'], [108, -6, '#ffb2b2'], [289, -31, '#7cc4ff'], [394, -7, '#7cc4ff'],
  [-7, 123, '#79d9d0'], [-58, 98, '#ffb2b2'], [414, 17, '#ffb2b2'], [346, -35, '#b9d8ff'], [380, 6, '#ffb2b2'],
];

/* Right-hand pictures exist for these four cards only; activating any other card keeps the last picture. */
const PICS = {
  stocks: ['/assets/home-portfolio-stocks.webp', 1100, 796],
  crypto: ['/assets/home-portfolio-crypto.webp', 1100, 796],
  forecasting: ['/assets/home-portfolio-forecasting.webp', 1100, 796],
  multi: ['/assets/home-portfolio-multi.webp', 1100, 796],
  realestate: ['/assets/home-portfolio-realestate.webp', 1100, 796],
  analysis: ['/assets/home-portfolio-analysis.webp', 1100, 796],
};

function PortfolioList({ onSelect }) {
  const [active, setActive] = useState('stocks');
  const select = (key) => { setActive(key); onSelect(key); };
  return (
    <ul className="hpf-list">
      {cards.map(({ key, title, body, tx }) => (
        <li key={key}>
          <button
            type="button"
            className={`hpf-card${active === key ? ' is-active' : ''}`}
            aria-pressed={active === key}
            style={{ '--tx': `calc(${tx} * var(--u))` }}
            onMouseEnter={() => select(key)}
            onFocus={() => select(key)}
            onClick={() => select(key)}
          >
            <span className="hpf-card__icon">{Icons[key]}</span>
            <span className="hpf-card__text">
              <span className="hpf-card__title">{title}</span>
              <span className="hpf-card__body">{body}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function HomePortfolio() {
  const [shown, setShown] = useState('stocks');
  return (
    <section className="hpf-section" aria-labelledby="portfolio-title">
      <div className="hpf-bg" aria-hidden="true" />
      <div className="hpf-inner">
        <div className="hpf-stage">
          <h3 id="portfolio-title" className="hpf-title" data-reveal>Your<em> Entire<br className="hpf-br-d"/>Portfolio</em><br className="hpf-br-m"/> in One View</h3>

          <PortfolioList onSelect={setShown} />

          <div className="hpf-visual">
            <div className="hpf-deco" aria-hidden="true">
              <div className="hpf-glow" />
              <svg viewBox="0 0 366 411" preserveAspectRatio="none">
                <circle cx="183" cy="206" r="240" fill="none" stroke="#dde2e2" strokeWidth="1" />
                <circle cx="183" cy="206" r="200" fill="none" stroke="#d3e3e1" strokeWidth="1" strokeOpacity=".7" />
                {DECO_DOTS.map(([x, y, c]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill={c} />)}
              </svg>
            </div>

            <div className="hpf-frame">
              {Object.entries(PICS).map(([key, [src, w, h]]) => (
                <img key={key} className={`hpf-pic${shown === key ? ' is-shown' : ''}`} src={src} width={w} height={h} alt={shown === key ? `${key} holdings` : ''} aria-hidden={shown !== key} loading="lazy" decoding="async" />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
