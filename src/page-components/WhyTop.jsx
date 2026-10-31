import React from 'react';
import './WhyTop.css';

/* /why-wealthnx/ sections 1-2: hero (white panel) + "One Place For More Of Your Financial Life" (dark).
   Design has no offer pill / button in the hero, so none is rendered. */
export default function WhyTop() {
  return (
    <>
      <section className="wp-top-hero" aria-labelledby="wp-top-title">
        <div className="wp-top-hero__in">
          <div className="wp-top-hero__copy">
            <h1 id="wp-top-title"><em>Two All-in-One Ideas.</em>Different Areas of Focus.</h1>
            <p>No single finance app fits everyone. WealthNX brings everyday money, investments, crypto, market insights, and AI together in one smarter financial platform.</p>
          </div>
          <img className="wp-top-hero__img" src="/assets/why-top-hero.webp" alt="" width="1400" height="908" />
        </div>
      </section>

      <section className="wp-top-one" aria-labelledby="wp-top-one-title">
        <div className="wp-top-one__in">
          <img className="wp-top-one__swirl" src="/assets/why-top-swirl.svg" alt="" width="1100" height="561" aria-hidden="true" />
          <h2 id="wp-top-one-title" data-reveal>One Place For More Of Your Financial Life</h2>
          <p>Looking for an all in one personal finance app? WealthNX brings supported accounts, spending and market information together. It also works as an investment portfolio tracker app for exploring the holdings and data available through supported connections.</p>
        </div>
      </section>
    </>
  );
}
