import React from 'react';
import './SiteFooter.css';
import { comparePages, comparePageHref } from '../compare/comparePages';

/**
 * The one shared WealthNX footer (server component, no client JS).
 * Self-contained: styles live in SiteFooter.css under the `sf-` prefix and do not
 * depend on any page wrapper. Rendered by every page; app/components/Footer.jsx re-exports it.
 */
const SOCIALS = [
  {
    key: 'facebook',
    url: 'https://www.facebook.com/wealthnxai',
    label: 'WealthNX on Facebook',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.6V3.4c-.3 0-1.2-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.4H7.6V13h2.7v8z" /></svg>
    ),
  },
  {
    key: 'linkedin',
    url: 'https://www.linkedin.com/company/wealthnxai/',
    label: 'WealthNX on LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.2 9.2h3V19h-3zM6.7 4.6a1.7 1.7 0 1 1 0 3.5 1.7 1.7 0 0 1 0-3.5zM10.3 9.2h2.9v1.3c.4-.8 1.4-1.5 2.9-1.5 3.1 0 3.7 2 3.7 4.7V19h-3v-4.7c0-1.1 0-2.5-1.6-2.5s-1.8 1.2-1.8 2.4V19h-3z" /></svg>
    ),
  },
  {
    key: 'instagram',
    url: 'https://www.instagram.com/wealthnx.ai',
    label: 'WealthNX on Instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4.5" /><circle cx="12" cy="12" r="3.6" /><circle cx="16.8" cy="7.2" r=".6" fill="currentColor" /></svg>
    ),
  },
  {
    key: 'x',
    url: 'https://x.com/wealthnxai',
    label: 'WealthNX on X',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 4h2.9l-6.3 7.2L21.5 20h-5.8l-4.5-5.9L6 20H3.1l6.7-7.7L2.7 4h5.9l4.1 5.4zm-1 14.3h1.6L7.7 5.6H6z" /></svg>
    ),
  },
];

const CALCULATOR_LINKS = [
  { href: '/calculators/financial-health-score/', label: 'Financial Health Score' },
  { href: '/calculators/financial-health-xray/', label: 'Financial X-Ray' },
  { href: '/calculators/401k-calculator/', label: '401(k) Calculator' },
  { href: '/calculators/fire-calculator/', label: 'Fire Calculator' },
  { href: '/calculators/mortgage-calculator/', label: 'Mortgage Calculator' },
];

export default function SiteFooter() {
  return (
    <footer className="sf-footer">
      <img className="sf-footer__logo" src="/assets/logo-nav.webp" alt="WealthNX" width="138" height="51" />
      <h2 className="sf-footer__title">Know <em>where</em> you stand</h2>

      <div className="sf-footer__columns">
        <div>
          <b>Explore</b>
          <a href="/about-us/">About Us</a>
          <a href="/features/">Features</a>
          <a href="/pricing/">Pricing</a>
          <a href="/contact/">Contact</a>
        </div>
        {/* <div>
          <a className="sf-footer__heading" href="/compare/">Compare</a>
          {comparePages.map(({ slug, short }) => (
            <a key={slug} href={comparePageHref(slug)}>{short}</a>
          ))}
        </div> */}
        <div>
          <a className="sf-footer__heading" href="/calculators/">Calculators</a>
          {CALCULATOR_LINKS.map(({ href, label }) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>
        <div>
          <b>Others</b>
          <a href="/blogs/">Blog</a>
          <a href="/referral-terms/">Referral Terms</a>
          <a href="/support/">FAQ</a>
        </div>
        <div className="sf-footer__contact">
          <b>Contact us</b>
          <a href="tel:+14076004801">+1 407-600-4801</a>
          <a href="mailto:support@wealthnx.ai">support@wealthnx.ai</a>
          <span>424 E Central Blvd, Ste 248, Orlando<br />FL 32801 United States</span>
        </div>
      </div>

      <div className="sf-footer__social">
        {SOCIALS.map(({ key, url, label, icon }) => (
          <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>{icon}</a>
        ))}
      </div>

      <div className="sf-footer__bottom">
        <span>© 2026 WealthNX. All rights reserved.</span>
        <span className="sf-footer__legal">
          <a href="/privacy-policy/">Privacy Policy</a>
          <i aria-hidden="true" />
          <a href="/terms-and-conditions/">Terms & Conditions</a>
        </span>
      </div>
    </footer>
  );
}
