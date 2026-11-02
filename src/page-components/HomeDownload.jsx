'use client';

import React from 'react';
import { APPLE_STORE_URL, GOOGLE_PLAY_URL, openStore } from '@/app/components/useStoreUrl';
import { AppleStoreIcon, AndroidStoreIcon } from './StoreIcons';

/* "Your Financial clarity starts here" home download section (hd- styles in HomeDownload.css).
   The three phones, glow and Ask-AI card are the real Figma exports (hd-*.png/webp);
   the five floating pills are live HTML/CSS (the Figma pill PNGs are not used). Copy is verbatim from the design (typo "al,all" kept). */

const Check = () => (
  <svg viewBox="0 0 12 12" aria-hidden="true">
    <path d="M2.2 6.3 4.8 8.9 9.8 3.3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const pills = [
  ['top', 'Clear AI Answers'],
  ['crypto', 'Crypto Insights'],
  ['net', 'Track Net Worth'],
  ['stocks', 'Analyze Stocks'],
  ['accounts', 'Connect Accounts'],
];

/* light: the home page uses one composite picture (phones + pills baked in); features pages keep the live dark phones and pills. */
export default function HomeDownload({ light = false, titleLines = ['Your Financial', 'clarity starts here'], textLines = ['Connect accounts, track net worth, analyze', 'stock, crypto and get clear insights with AI,', 'all in one place.'], trial = false, wrap = false }) {
  return (
    <section className={`hd${light ? ' hd--light' : ''}${wrap ? ' hd--wrap' : ''}`} aria-labelledby="hd-title">
      <div className="hd-inner">
        <div className="hd-stage">
          <div className="hd-copy">
            <h2 id="hd-title" className="hd-title" data-reveal>
              {titleLines.map((l, i) => <React.Fragment key={l}>{i > 0 && ' '}<span>{l}</span></React.Fragment>)}
            </h2>
            <p className="hd-text" data-reveal style={{ "--i": 1 }}>
              {textLines.map((l, i) => <React.Fragment key={l}>{i > 0 && ' '}<span>{l}</span></React.Fragment>)}
            </p>
            <div className="hd-actions" data-reveal style={{ "--i": 2 }}>
              {trial && <a className="hd-btn hd-btn--trial" href="https://wealthnx.ai/get" target="_blank" rel="noopener noreferrer"><span>Start Your 7-Day Free Trial</span></a>}
              <a className="hd-btn hd-btn--ios" href={APPLE_STORE_URL} onClick={openStore}>
                <AppleStoreIcon />
                <span>Download for iphone</span>
              </a>
              <a className="hd-btn hd-btn--android" href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer">
                <AndroidStoreIcon />
                <span>Get it on Android</span>
              </a>
            </div>
          </div>

          <div className="hd-phones" data-reveal="fade" data-tilt>
            {light ? (
              <picture>
                <source media="(max-width: 760px)" srcSet="/assets/home-download-bottom-mob.webp" width="1000" height="994" />
                <img className="hd-bottom" src="/assets/home-download-bottom.webp" alt="WealthNX app screens: Clear AI Answers, Crypto Insights, Track Net Worth, Analyze Stocks, Connect Accounts" width="1600" height="1031" loading="lazy" decoding="async" />
              </picture>
            ) : (
              <>
              <img className="hd-ph hd-ph--glow" src="/assets/hd-glow-2.webp" alt="" width="512" height="512" loading="lazy" />
              <div className="hd-phones__art">
                <img className="hd-ph hd-ph--left" src="/assets/hd-phone-left.png" alt="WealthNX bitcoin price chart screen" width="492" height="691" loading="lazy" />
                <img className="hd-ph hd-ph--right" src="/assets/hd-phone-right.png" alt="WealthNX connect your financials screen" width="510" height="716" loading="lazy" />
                <img className="hd-ph hd-ph--centre" src="/assets/hd-phone-centre.png" alt="WealthNX net worth screen" width="335" height="682" loading="lazy" />
                <img className="hd-ph hd-ph--card" src="/assets/hd-ask-card.png" alt="Ask AI about your money" width="384" height="188" loading="lazy" />
              </div>
              {pills.map(([k, label]) => (
                <span key={k} className={`hd-pill hd-pill--${k}`}>
                  <Check />
                  <b>{label}</b>
                </span>
              ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
