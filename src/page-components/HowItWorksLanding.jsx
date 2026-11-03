import React from 'react';
import TopBar from '@/app/components/TopBar';
import { SIGNUP_URL, hero, steps } from './howItWorksData';
import './FeatureDetailTemplate.css';
import './HowItWorksLanding.css';
import './HomeDownload.css';
import HomeDownload from './HomeDownload';
import SiteFooter from '@/app/components/SiteFooter';
import HowItWorksFaq from './HowItWorksFaq';
import HowItWorksPlaid from './HowItWorksPlaid';

const Check = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    <circle cx="8" cy="8" r="6.6" />
    <path d="M5.2 8.2l2 2 3.6-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Arrow = () => (
  <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2.5 8h11M9 3.5L13.5 8 9 12.5" />
  </svg>
);

const PAD = 80; /* css px of blended glow baked around every art crop */

/** /how-it-works/ page shell (server component). The arrow is a plain hash link. */
export default function HowItWorksLanding() {
  return (
    <div className="feature-detail-template hw-page">
      <TopBar />
      <main className="hw-main">
        <section className="hw-hero" aria-labelledby="hw-title">
          <div className="hw-hero__band" aria-hidden="true">
            <i className="hw-hero__ribs hw-hero__ribs--l" />
            <i className="hw-hero__ribs hw-hero__ribs--r" />
          </div>
          <i className="hw-blob hw-blob--l" aria-hidden="true" />
          <i className="hw-blob hw-blob--r" aria-hidden="true" />
          <div className="hw-hero__inner">
            <h1 id="hw-title"><span>{hero.title[0]}</span> <span>{hero.title[1]}</span></h1>
            <p>
              {hero.text.map((line, i) => (
                <React.Fragment key={i}>{i > 0 && <br className="hw-br" />}{i > 0 && ' '}{line}</React.Fragment>
              ))}
            </p>
          </div>
          <a className="hw-down" href="#hw-steps" aria-label="Scroll to the steps">
            <span>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v15M5.5 12.5 12 19l6.5-6.5" /></svg>
            </span>
          </a>
        </section>

        <section className="hw-steps" id="hw-steps" aria-label="How WealthNX works">
          <ol className="hw-steps__list">
            {steps.map((s, i) => {
              const left = i % 2 === 0;
              const a = s.art;
              return (
                <li
                  key={s.id}
                  className={`hw-step hw-step--${s.id} hw-step--${left ? 'text-left' : 'text-right'}`}
                  style={{
                    '--tx': `${left ? 372 - 960 : 1129 - 960}px`,
                    '--top': `${s.top}px`,
                    '--ax': `${a.x - (a.pad ?? PAD) - 960}px`,
                    '--ay': `${a.y - (a.pad ?? PAD)}px`,
                    '--aw': `${a.w / 2}px`,
                    '--ar': a.w / 2 / (a.w / 2 - 2 * (a.pad ?? PAD)),
                  }}
                  data-reveal
                >
                  <div className="hw-step__copy">
                    <h2>{s.title}</h2>
                    <p className="hw-step__lead">{s.lead.map((l, k) => <React.Fragment key={k}>{k > 0 && <br className="hw-br" />}{k > 0 && ' '}{l}</React.Fragment>)}</p>
                    <p className="hw-step__body">{s.body.map((part, k) => (typeof part === 'string' ? <React.Fragment key={k}>{part}</React.Fragment> : <strong key={k}>{part.bold}</strong>))}</p>
                    {s.bullets.length > 0 && (
                      <ul className="hw-step__bullets">{s.bullets.map((b) => <li key={b}><Check /><span>{b}</span></li>)}</ul>
                    )}
                    {s.note && <p className="hw-step__note">{s.note}</p>}
                    {s.button && (
                      <a className="hw-btn" href={SIGNUP_URL} target="_blank" rel="noreferrer">
                        {s.button.label}{s.button.arrow && <Arrow />}
                      </a>
                    )}
                  </div>
                  <div className="hw-step__node" aria-hidden="true"><span>{i + 1}</span></div>
                  <div className="hw-step__visual">
                    <img src={a.src} width={a.w / 2} height={a.h / 2} alt={a.alt} loading="lazy" decoding="async" />
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <HowItWorksFaq />
        <HowItWorksPlaid />

        <div className="home-redesign fdt-hd"><HomeDownload light /></div>
      </main>

      <SiteFooter />
    </div>
  );
}
