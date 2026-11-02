'use client';

import React from 'react';
import './FeatureDetailTemplate.css';
import './HomeRedesign.css';
import './HomeAsk.css';
import './HomeProtect.css';
import './HomeConnect.css';
import './HomeFrag.css';
import './HomePortfolio.css';
import HomeWhy from './HomeWhy';
import SwipeDots from './SwipeDots';
import HomePortfolio from './HomePortfolio';
import HomeVoices from './HomeVoices';
import HomeDownload from './HomeDownload';
import HomeFaq from './HomeFaq';
import HeroAudience from './HeroAudience';
import { homeFaqs } from './homeFaqs';
import './HomeDownload.css';
import './HomeVoices.css';
import './HeroCore.css';
import { heroCoreProps } from './heroCore';
import './HomeNew.css';
import { APPLE_STORE_URL, openStore } from '@/app/components/useStoreUrl';
import PartnerStrip from '@/app/components/PartnerStrip';
import Link from 'next/link';
import SiteFooter from '@/app/components/SiteFooter';

const asset = {
  logo: '/assets/logo.svg',
  hero: '/assets/herosection.png',
  providers: '/assets/nasdaq.png',
  portfolio: '/assets/portfoliofeature.png',
  insights: '/assets/home-insights.webp',
  final: '/assets/financialclarity.png',
};

const Arrow = () => <span aria-hidden="true">→</span>;
const Check = () => <span className="hr-check" aria-hidden="true">✓</span>;
const AppleIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.8 12.7c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.7-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.8 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.2-1.7 2.8-.4 6.9 1.2 9.1.8 1.1 1.7 2.3 2.9 2.2 1.2 0 1.6-.7 3.1-.7 1.4 0 1.8.7 3.1.7 1.3 0 2.1-1.1 2.9-2.2.9-1.3 1.3-2.6 1.3-2.7-.1 0-3-.9-3-3.5Zm-2.2-6.6c.7-.8 1.1-1.8 1-2.9-1 .1-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.8 1 .1 2.1-.5 2.8-1.4Z" /></svg>;
const AndroidIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.3 8.4 5.9 6l.8-.5 1.5 2.5a8 8 0 0 1 7.6 0l1.5-2.5.8.5-1.4 2.4A5.7 5.7 0 0 1 19 13H5a5.7 5.7 0 0 1 2.3-4.6ZM8.5 10.6a.8.8 0 1 0 0-1.6.8.8 0 0 0 0 1.6Zm7 0a.8.8 0 1 0 0-1.6.8.8 0 0 0 0 1.6ZM5.5 14h13v5.1c0 .8-.6 1.4-1.4 1.4H6.9c-.8 0-1.4-.6-1.4-1.4V14Zm-2.2.4c.6 0 1 .5 1 1v3.4c0 .6-.4 1-1 1-.5 0-1-.4-1-1v-3.4c0-.5.5-1 1-1Zm17.4 0c.5 0 1 .5 1 1v3.4c0 .6-.5 1-1 1-.6 0-1-.4-1-1v-3.4c0-.5.4-1 1-1Z" /></svg>;

const askCards = [
  { title: 'What you own, in one place', body: 'Bank accounts, cards, stocks, crypto, retirement and property, together in one net worth.', img: '/assets/home-ask-investments.webp', tone: 'crypto' },
  { title: 'Know where your money goes', body: 'See your spending by category and month, and how money flows in and out.', img: '/assets/home-ask-everyday.webp', tone: 'accountant' },
  { title: 'Know what matters, before you ask', body: 'Wealth Genie keeps an eye on your financial life, automatically delivering AI insights that matter to you.', img: '/assets/home-ask-proactive.webp', tone: 'proactive' },
  { title: 'A Wealth Genie for your money questions', body: 'Ask a specialized AI Genie, with questions about your spending, portfolio or market opportunities.', img: '/assets/home-ask-stock.webp', tone: 'stock' },
  { title: 'Just ask. Out loud.', body: 'Have a voice to voice conversation, whenever a money question comes up: in the car, on a walk, between meetings.', img: '/assets/home-ask-voice.webp', tone: 'voice' },
  { title: 'Market intelligence', body: 'Premium market data on investments, explained in plain English. For information only.', img: '/assets/home-ask-markets.webp', tone: 'build' },
];

const askChips = [
  ['Accountant', <path key="a" d="M7 3.5h8l3 3V20a.8.8 0 0 1-.8.8H7a.8.8 0 0 1-.8-.8V4.3A.8.8 0 0 1 7 3.5ZM9 9h6M9 12.5h6M9 16h3.5" />],
  ['Stocks', <path key="s" d="M8 3.5v3M8 14v3.5M8 6.5H6v7.5h4V6.5H8ZM16.5 6.5V10M16.5 17.5v3M16.5 10h-2v7.5h4V10h-2Z" />],
  ['Crypto', <path key="c" d="M9 5v14M9 5h5a3 3 0 0 1 0 6H9m0 0h5.5a3.5 3.5 0 0 1 0 7H9M11 3v2M14 3v2M11 19v2M14 19v2" />],
  ['Build Mode', <path key="b" d="M12 8.2a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6ZM12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />],
];

const protectCards = [
  { key: 'iso', title: 'ISO 27001 Certified', body: 'WealthNX is certified under ISO 27001, the international standard for information security.', img: '/assets/home-protect-iso.webp' },
  { key: 'encrypted', title: 'Encrypted Data', body: 'Your data is encrypted in transit and at rest.', img: '/assets/home-protect-encrypted.webp' },
  { key: 'readonly', title: 'Read-Only Access', body: 'We connect to your accounts through Plaid with read-only access. WealthNX can’t make payments or transfers from your accounts.', img: '/assets/home-protect-readonly.webp' },
  { key: 'privacy', title: 'Privacy-First Design', body: 'WealthNX is built to keep your financial information private.', img: '/assets/home-protect-privacy.webp' },
];

const connectChips = [
  ['cash', 'Cash'],
  ['investments', 'Investments'],
  ['realestate', 'Real Estate'],
  ['vehicles', 'Vehicles'],
  ['valuables', 'Valuables'],
  ['other', 'Other assets'],
];

const fragCards = [
  { key: 'networth', title: 'Net Worth', body: 'See the full picture of what you own and owe.', img: 'networth', icon: 'networth', size: [1200, 905] },
  { key: 'cashflow', title: 'Cash Flow', body: 'See how much money comes in and goes out.', img: 'cashflow', icon: 'cashflow', size: [1200, 869] },
  { key: 'budget', title: 'Budget', body: 'Plan your spending and stay within your limits.', img: 'budget', icon: 'budget', size: [1200, 847] },
  { key: 'goals', title: 'Goals', body: 'Set financial goals and track your progress.', img: 'goals', icon: 'goals', size: [1200, 797] },
  { key: 'bills', title: 'Bills', body: 'See upcoming bills and know what\u2019s due.', img: 'bills', icon: 'bills', size: [1200, 845] },
  { key: 'transactions', title: 'Transactions', body: 'Track your spending and see where your money goes.', img: 'transactions', icon: 'transactions', size: [1200, 852] },
  { key: 'forecasting', title: 'Forecasting', body: 'Explore how your net worth could change over time.', img: 'forecasting', icon: 'forecasting', size: [1200, 797] },
];


const audience = [
  ['Individual investors', 'Bring your whole financial picture into focus.', 'aboutstock.png'],
  ['Financial teams', 'See the details that matter and make every decision clearer.', 'aboutassistant.png'],
  ['Families', 'Coordinate shared goals without losing your own perspective.', 'aboutgeneral.png'],
  ['Wealth managers', 'Give clients a more connected, more useful view.', 'aboutcrypto.png'],
  ['Curious planners', 'Turn everyday money questions into confident next steps.', 'aboutgeneral.png'],
];

export default function HomeRedesign() {
  const [fragOpen, setFragOpen] = React.useState(null); // phones: card whose picture is open (shown right above that card; none by default)
  const [fragActive, setFragActive] = React.useState(0); // card whose phone picture is shown (hover / focus / tap)
  return (
    <div className="home-redesign">
      <div className="feature-detail-template hr-hero-host">
        <section className="fdt-hero" aria-labelledby="hr-hero-title">
          <div className="fdt-hero__copy">
            <h1 id="hr-hero-title">All-in-One AI Powered Wealth Assistant for <HeroAudience /></h1>
          </div>
          <div className="fdt-hero__visual" data-tilt aria-hidden="true">
            <div className="fdt-hero__glow" />
            <img src="/assets/home-hero-phone.webp" alt="" width={900} height={1031} className="fdt-hero-phone" fetchPriority="high" decoding="async" {...heroCoreProps("/assets/home-hero-phone.webp")} />
          </div>
          <div className="fdt-hero__aside">
            <p>WealthNX brings your accounts, stocks, and crypto together, with AI-powered insights that make your financial picture easier to understand.</p>
            <div className="fdt-hero__actions">
              <a href={APPLE_STORE_URL} onClick={openStore}>Start Your 7-Day Free Trial</a>
              <a className="hr-hero-play" href="https://www.youtube.com/watch?v=npaG1AtRbNw" target="_blank" rel="noreferrer" aria-label="Watch the WealthNX introduction"><span className="fdt-play-icon" aria-hidden="true" /></a>
            </div>
          </div>
        </section>
      </div>

      <PartnerStrip />

      <section className="ha-section" aria-labelledby="ai-title">
        <div className="ha-glow ha-glow--top" aria-hidden="true" />
        <div className="ha-glow ha-glow--corner" aria-hidden="true" />
        <div className="ha-inner">
          <h2 id="ai-title" className="ha-title" data-reveal>One App For <b>Your Money</b><br />See More. Understand More. <b>Ask Better Questions.</b></h2>
          <div className="ha-bar" data-reveal="fade" aria-hidden="true">
            <img className="ha-bar__genie" src="/assets/Vector.png" alt="" width="24" height="24" />
            <span className="ha-bar__placeholder">Ask anything or tag an Assistant</span>
            <span className="ha-bar__plus"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5.5v13M5.5 12h13" /></svg></span>
            <span className="ha-bar__chips">
              {askChips.map(([label, icon]) => (
                <span className="ha-chip" key={label}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                  <span>{label}</span>
                </span>
              ))}
            </span>
            <span className="ha-bar__mic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 10.5v3M8.5 7v10M12 4v16M15.5 8v8M19 10.5v3" /></svg></span>
            <span className="ha-bar__send"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.6 3.6 3.9 10.2a.7.7 0 0 0 0 1.3l6.2 2.4 2.4 6.2a.7.7 0 0 0 1.3 0l6.6-16.7a.7.7 0 0 0-.8-.8Zm-8.3 9.1-1.5-.6 4.7-4.1Z" /></svg></span>
          </div>
          <div className="ha-grid">
            {askCards.map(({ title, body, img, tone }, i) => (
              <article className={`ha-card ha-card--${tone} ha-card--full`} style={{ "--ar": "952 / 808", "--i": i % 3 }} data-reveal key={title}>
                <div className="ha-card__head">
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
                <div className="ha-card__visual"><img src={img} alt="" width={952} height={808} loading="lazy" decoding="async" /></div>
              </article>
            ))}
          </div>
          <SwipeDots />
        </div>
      </section>

      <section className="hp-section" aria-labelledby="protection-title">
        <div className="hp-inner">
          <h2 id="protection-title" className="hp-title" data-reveal><b>We Protect</b> What Matters to You</h2>
          <p className="hp-lede" data-reveal>WealthNX protects your financial data with strong security safeguards. Connected accounts are read-only, and WealthNX cannot move or withdraw money or store your login credentials on its servers.</p>
          <div className="hp-grid">
            {protectCards.map(({ key, title, body, img }, i) => (
              <article className={`hp-card hp-card--${key}`} style={{ "--i": i }} data-reveal key={key}>
                {/* Temporary low-res stand-in crops of the Figma frame; replace with the real exports. */}
                <div className="hp-card__visual"><img src={img} alt="" width={562} height={438} loading="lazy" decoding="async" /></div>
                <div className="hp-card__badges" aria-hidden="true">
                  {key === 'iso' && (
                    <>
                      <img src={asset.logo} alt="" width={40} height={20} loading="lazy" />
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="6" /><path d="M12 6.2l.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3Z" /><path d="M8.6 13.6L7 21l5-2.8 5 2.8-1.6-7.4" /></svg>
                    </>
                  )}
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <SwipeDots light />
          <p className="hp-more"><Link href="/how-it-works/">See How we keep your data safe <Arrow /></Link></p>
        </div>
      </section>

      <section className="hc-section" aria-labelledby="connectivity-title">
        <div className="hc-glow hc-glow--orange" aria-hidden="true" />
        <div className="hc-glow hc-glow--blue" aria-hidden="true" />
        <div className="hc-inner">
          <h2 id="connectivity-title" className="hc-title" data-reveal>Data <b>Connectivity</b></h2>
          <div className="hc-grid">
            <article className="hc-card hc-card--assets" data-reveal>
              <h3>Multi Assets</h3>
              <p className="hc-card__sub">Track assets beyond your bank</p>
              <ul className="hc-chips">
                {connectChips.map(([key, label]) => (
                  <li className="hc-chip" key={key}>
                    <img src={`/assets/home-connect-icon-${key}.png`} alt="" width={32} height={32} loading="lazy" decoding="async" />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
              <p className="hc-card__foot">Furniture, Jewelry, Precious metals<br />and many more...</p>
            </article>

            <article className="hc-card hc-card--plaid" style={{ "--i": 1 }} data-reveal>
              {/* Temporary low-res stand-in crops of the Figma frame; replace with the real exports. */}
              <img className="hc-diagram" src="/assets/home-connect-diagram.png" alt="" width={568} height={244} loading="lazy" decoding="async" />
              <h3 className="hc-plaid__title"><b>12,000+</b> institutions supported<br /><b>Securely with plaid</b></h3>
              <p className="hc-plaid__copy">Securely connect your accounts with encrypted, read-only access and privacy first protection powered by trusted industry standard protocols.</p>
              <div className="hc-powered">
                <span>Powered by</span>
                <img src="/assets/home-connect-powered.png" alt="" width={264} height={120} loading="lazy" decoding="async" />
              </div>
            </article>

            <article className="hc-card hc-card--upload" style={{ "--i": 2 }} data-reveal>
              <h3>PDF &amp; CSV Upload</h3>
              <p className="hc-card__sub">Bring your financial records together</p>
              <div className="hc-drop">
                <img src="/assets/home-connect-upload.png" alt="" width={192} height={192} loading="lazy" decoding="async" aria-hidden="true" />
                <p className="hc-drop__title">Drop your files here</p>
                <p className="hc-drop__hint">PDF or CSV</p>
              </div>
              <p className="hc-upload__foot">Upload statements and transaction files</p>
            </article>
          </div>
          <SwipeDots />
        </div>
      </section>

      <HomeWhy />

      <section className="hf-section" aria-labelledby="fragmented-title">
        <div className="hf-inner">
          <div className="hf-left">
            <h3 className="hf-lead">See your everyday finances clearly</h3>
            <p className="hf-sub">Connect your bank, brokerage, and crypto accounts securely. Access <b>12,000+</b> financial institutions through Plaid.</p>
            <div className="hf-visual" aria-hidden="true">
              {fragCards.map(({ key, img, size }, index) => (
                <img key={key} className={index === fragActive ? 'is-shown' : undefined} src={`/assets/home-frag-${img}.webp?v=2`} alt="" width={size[0]} height={size[1]} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
              ))}
            </div>
          </div>
          <div className="hf-right">
            <h2 id="fragmented-title" className="hf-title" data-reveal>Your Money is <em>Fragmented</em> across<br />too many platforms</h2>
            <ul className="hf-cards">
              {fragCards.map(({ key, title, body, icon, img, size }, index) => (
                <React.Fragment key={key}>
                  {fragOpen === index && (
                    <li className={`hf-pic${index === 0 ? ' hf-pic--first' : ''}`} aria-hidden="true">
                      <img src={`/assets/home-frag-${img}.webp?v=2`} alt="" width={size[0]} height={size[1]} decoding="async" />
                    </li>
                  )}
                <li className={`hf-card${index === 0 ? ' hf-card--first' : ''}${index === fragActive ? ' is-active' : ''}${fragOpen === index ? ' is-open' : ''}`} style={{ "--i": index }} data-reveal tabIndex={0} aria-expanded={fragOpen === index} onMouseEnter={() => setFragActive(index)} onFocus={() => setFragActive(index)} onClick={(event) => { setFragActive(index); if (!event.target.closest('a')) setFragOpen((open) => (open === index ? null : index)); }}>
                  <span className="hf-card__icon" aria-hidden="true">
                    {icon === 'forecasting'
                      ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10.2" /><path d="M16.6 7.4 13.4 16.6l-1.9-4.1-4.1-1.9Z" fill="currentColor" /></svg>
                      : <img src={`/assets/home-frag-icon-${icon}.png`} alt="" width={168} height={144} loading="lazy" decoding="async" />}
                  </span>
                  <span className="hf-card__text">
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </span>
                </li>
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <HomePortfolio />

      <section className="hr-section hr-insights" aria-labelledby="insights-title">
        <div className="hr-insights__visual" data-reveal="fade"><img src={asset.insights} alt="Investment insights across stocks and cryptocurrency" width={1300} height={1107} loading="lazy" /></div><div className="hr-insights__copy"><h2 id="insights-title" data-reveal><em>Get investment insights</em> that explain what changed</h2><div className="hr-ins-list"><div className="hr-ins-item"><span className="hr-ins-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M10 7.5h3.2a1.9 1.9 0 0 1 0 3.8H10m0 0h3.6a2 2 0 0 1 0 4H10m0-7.8v7.8M11.5 6v1.5m0 8.8V18m2-12v1.5m0 8.8V18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg></span><span><b data-count>5M+ Crypto</b><small>Understand allocation across assets and categories</small></span></div><div className="hr-ins-item"><span className="hr-ins-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3.5 9.5 12 4l8.5 5.5M5.5 10v7M9.5 10v7M14.5 10v7M18.5 10v7M3.5 20h17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span><span><b data-count>70,000+ Stocks &amp; ETFs</b><small>View allocation, movement, and historical data over time</small></span></div></div><a href="/features/" className="hr-ins-btn">Learn more <Arrow /></a></div>
      </section>

      <HomeVoices />

      <HomeFaq faqs={homeFaqs} />

      <HomeDownload light wrap titleLines={['Stress Less. Do More', 'With Your Wealth. Live a', 'Better Financial Life']} textLines={['Your net worth, spending, stocks and crypto', 'together, with clear answers from AI', 'whenever you ask.']} trial />

      <SiteFooter />
    </div>
  );
}
