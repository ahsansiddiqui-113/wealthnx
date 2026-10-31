import React from 'react';
import TopBar from '@/app/components/TopBar';
import PricingPlans from './PricingPlans';
import PricingFaq from './PricingFaq';
import PricingComparison from './PricingComparison.jsx';
import './FeatureDetailTemplate.css';
import './PricingRedesign.css';
import SiteFooter from '@/app/components/SiteFooter';

const icon = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

const PlaidIcon = () => (
  <svg {...icon}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const ShieldIcon = () => (
  <svg {...icon}>
    <path d="M12 2 4 5v6c0 5.25 3.4 9.74 8 11 4.6-1.26 8-5.75 8-11V5l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const LockIcon = () => (
  <svg {...icon}>
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

const tiles = [
  {
    title: 'Talk to your money',
    text: 'Ask a question out loud and hear the answer back, no typing required.',
    icon: <svg {...icon}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>,
  },
  {
    title: 'Plan decades ahead',
    text: 'Explore retirement and net worth projections built from your connected accounts.',
    icon: <svg {...icon}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>,
  },
  {
    title: 'Skip the manual entry',
    text: 'Scan a receipt and let AI fill in the items and transaction details for you.',
    icon: <svg {...icon}><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M9 8h6M9 12h6" /></svg>,
  },
  {
    title: 'See your assets together',
    text: 'Track cash, stocks, real estate and crypto side by side in one net worth view.',
    icon: <svg {...icon}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>,
  },
];

const institutions = ['Chase', 'Wells Fargo', 'Coinbase', 'Robinhood', 'Discover', 'Amex', 'Mastercard'];
/** /pricing/ page shell (server component). Interactive islands: PricingPlans, PricingFaq, PricingComparison. */
export default function PricingPage() {
  return (
    <div className="feature-detail-template pr-page">
      <TopBar />
      <main className="pr-main">
        <section className="pr-hero" aria-labelledby="pr-title">
          <span className="fdt-offer"><i /> Get 50% Off - Limited Time Offer</span>
          <h1 className="pr-hero__title" id="pr-title">Plans and Pricing</h1>
          <p className="pr-hero__sub">Understand your money better with WealthNX AI</p>

          <PricingPlans />

          <ul className="pr-trust">
            <li><PlaidIcon /> Plaid connected</li>
            <li><ShieldIcon /> ISO 27001 certified</li>
            <li><LockIcon /> 256-bit encryption</li>
          </ul>
        </section>

        <PricingFaq />

        <section className="pr-designed" aria-labelledby="pr-designed-title">
          <div className="pr-designed__panel">
            <p className="pr-kicker"><span aria-hidden="true">✦</span> Get the best of Wealth Genie AI</p>
            <h2 className="pr-designed__title" id="pr-designed-title">
              Designed to help you understand your <em>financial life</em>
            </h2>
            <p className="pr-designed__sub">Let our AI models simplify the heavy lifting of understanding and tracking your finances.</p>
            <ul className="pr-tiles">
              {tiles.map((tile) => (
                <li className="pr-tile" key={tile.title}>
                  <span className="pr-tile__icon">{tile.icon}</span>
                  <h3>{tile.title}</h3>
                  <p>{tile.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="pr-info">
            <article className="pr-info__card">
              <h3>One place to track all your money</h3>
              <p>Connect securely via Plaid or manually to 12,000+ financial institutions.</p>
              <ul className="pr-chips">
                {institutions.map((name) => (
                  <li key={name}>
                    <svg {...icon} width="14" height="14"><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18" /></svg>
                    {name}
                  </li>
                ))}
                <li className="pr-chips__more">and many more</li>
              </ul>
            </article>
            <article className="pr-info__card">
              <h3>Auto-synced and regularly refreshed</h3>
              <p>Secure, read-only connections automatically refresh available account data.</p>
              <p className="pr-status"><LockIcon /> ISO 27001 certified</p>
            </article>
          </div>

          <div className="pr-perks">
            <div>
              <h3>Plus members get priority perks</h3>
              <p>Priority support and Advanced Genie AI are included with your Plus plan.</p>
            </div>
            <ul>
              <li>
                <svg {...icon} width="14" height="14"><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /></svg>
                Priority Support
              </li>
              <li>
                <svg {...icon} width="14" height="14"><path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /></svg>
                Advanced Genie AI
              </li>
            </ul>
          </div>
        </section>

        <PricingComparison />
      </main>

      <SiteFooter />
    </div>
  );
}
