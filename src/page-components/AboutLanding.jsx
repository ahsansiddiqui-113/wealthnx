import React from 'react';
import Link from 'next/link';
import TopBar from '@/app/components/TopBar';
import SiteFooter from '@/app/components/SiteFooter';
import './FeatureDetailTemplate.css';
import './AboutLanding.css';

const principles = [
  {
    title: 'Your finances aren’t one-dimensional.',
    text: 'Everyday spending and long-term investments are connected parts of financial life. WealthNX is designed to help you explore both without losing the bigger picture.',
  },
  {
    title: 'Clarity should be useful.',
    text: 'The point isn’t to show you more numbers. It’s to make the information you already have easier to find, follow and understand.',
  },
  {
    title: 'You make the decisions.',
    text: 'WealthNX provides tracking, analysis and explanations. It does not move your money, trade on your behalf or replace your judgment.',
  },
];

/** About page: dark hero, three principles, closing call to action. Server-rendered. */
export default function AboutLanding() {
  return (
    <div className="feature-detail-template ab-page">
      <TopBar tone="dark" />

      <main>
        <section className="ab-hero" aria-labelledby="about-hero-title">
          <div className="ab-hero__glow" aria-hidden="true" />
          <p className="ab-kicker" data-reveal>About WealthNX</p>
          <h1 id="about-hero-title" data-reveal>Built for the bigger <em>financial picture.</em></h1>
          <p className="ab-lead" data-reveal>WealthNX brings money management, portfolio information, market context and AI-powered explanations into one experience.</p>
        </section>

        <section className="ab-principles" aria-label="What we believe">
          <ol className="ab-grid">
            {principles.map((p, i) => (
              <li className="ab-card" style={{ '--i': i }} data-reveal key={p.title}>
                <span className="ab-card__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h2>{p.title}</h2>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="ab-cta" aria-labelledby="about-cta-title">
          <h2 id="about-cta-title" data-reveal>Get to know <em>WealthNX.</em></h2>
          <p data-reveal>Explore the features and see how they fit together.</p>
          <Link className="ab-btn" href="/features/" data-reveal>Explore Features <span aria-hidden="true">→</span></Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
