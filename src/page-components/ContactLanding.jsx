import React from 'react';
import TopBar from '@/app/components/TopBar';
import ContactForm from './ContactForm';
import ContactDetails from './ContactDetails';
import './FeatureDetailTemplate.css';
import './ContactLanding.css';
import SiteFooter from '@/app/components/SiteFooter';
import { contactFaqs } from './contactFaqs';

// Real profile URLs (same set as app/components/Footer.jsx SOCIAL_LINKS).
const SOCIAL = {
  linkedin: 'https://www.linkedin.com/company/wealthnxai/',
  reddit: 'https://www.reddit.com/r/WealthNX_Official/',
  twitter: 'https://x.com/wealthnxai',
  instagram: 'https://www.instagram.com/wealthnx.ai',
  facebook: 'https://www.facebook.com/wealthnxai',
};

const BUBBLES = [
  {
    key: 'linkedin', cls: 'ct-bubble--linkedin', url: SOCIAL.linkedin, label: 'WealthNX on LinkedIn',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.2 9.2h3V19h-3zM6.7 4.6a1.7 1.7 0 1 1 0 3.5 1.7 1.7 0 0 1 0-3.5zM10.3 9.2h2.9v1.3c.4-.8 1.4-1.5 2.9-1.5 3.1 0 3.7 2 3.7 4.7V19h-3v-4.7c0-1.1 0-2.5-1.6-2.5s-1.8 1.2-1.8 2.4V19h-3z" /></svg>,
  },
  {
    key: 'reddit', cls: 'ct-bubble--reddit', url: SOCIAL.reddit, label: 'WealthNX on Reddit',
    icon: <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M19.14 10a2.06 2.06 0 0 0-3.5-1.47 10.1 10.1 0 0 0-5.46-1.73l.93-4.37 3.03.64a1.47 1.47 0 1 0 .15-.7l-3.38-.71a.35.35 0 0 0-.41.27l-1.03 4.87a10.12 10.12 0 0 0-5.49 1.73 2.06 2.06 0 1 0-2.28 3.33 4.1 4.1 0 0 0-.05.6c0 3.07 3.58 5.56 8 5.56s8-2.49 8-5.56a4.1 4.1 0 0 0-.05-.6A2.06 2.06 0 0 0 19.14 10zm-13.5 1.24a1.24 1.24 0 1 1 1.24 1.24 1.24 1.24 0 0 1-1.24-1.24zm6.93 3.28a4.29 4.29 0 0 1-5.14 0 .35.35 0 0 1 .42-.56 3.6 3.6 0 0 0 4.3 0 .35.35 0 1 1 .42.56zm-.22-2a1.24 1.24 0 1 1 1.24-1.24 1.24 1.24 0 0 1-1.24 1.24z" /></svg>,
  },
  {
    key: 'x', cls: 'ct-bubble--x', url: SOCIAL.twitter, label: 'WealthNX on X',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 4h2.9l-6.3 7.2L21.5 20h-5.8l-4.5-5.9L6 20H3.1l6.7-7.7L2.7 4h5.9l4.1 5.4zm-1 14.3h1.6L7.7 5.6H6z" /></svg>,
  },
  {
    key: 'instagram', cls: 'ct-bubble--instagram', url: SOCIAL.instagram, label: 'WealthNX on Instagram',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4.5" /><circle cx="12" cy="12" r="3.6" /><circle cx="16.8" cy="7.2" r=".7" fill="currentColor" /></svg>,
  },
  {
    key: 'facebook', cls: 'ct-bubble--facebook', url: SOCIAL.facebook, label: 'WealthNX on Facebook',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.6V3.4c-.3 0-1.2-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.4H7.6V13h2.7v8z" /></svg>,
  },
];

/** Contact page: dark hero, "Let's talk" card + form island, shared footer. Server-rendered shell. */
export default function ContactLanding() {
  return (
    <div className="feature-detail-template ct-page">
      <TopBar tone="dark" />

      <main>
        <section className="ct-hero" aria-labelledby="contact-hero-title">
          {/* Background image comes from --ct-hero-image in ContactLanding.css (swap in the final mountain photo there). */}
          <div className="ct-hero__bg" aria-hidden="true">
            <div className="ct-hero__fade" />
          </div>

          <div className="ct-hero__copy">
            <h1 id="contact-hero-title">Contact WealthNX Support and Team</h1>
            <p>Contact WealthNX support about your account, an account connection or a plan. Send a message and we&rsquo;ll help you sort it out.</p>
          </div>

          <a className="ct-scroll" href="#contact-form" aria-label="Scroll down to the contact form">
            <span className="ct-scroll__disc">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5.5 12.5 12 19l6.5-6.5" /></svg>
            </span>
          </a>
        </section>

        <section className="ct-main" id="contact-form" aria-label="Contact WealthNX">
          <div className="ct-grid">
            <div className="ct-talk">
              <div className="ct-talk__stage">
                <div className="ct-talk__copy">
                  <h2>Let&rsquo;s talk</h2>
                  <p>Your wealth doesn&rsquo;t sleep, and neither does our support.</p>
                </div>
                {BUBBLES.map(({ key, cls, url, label, icon }) => (
                  <a key={key} className={`ct-bubble ${cls}`} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>{icon}</a>
                ))}
              </div>
            </div>

            <div className="ct-formcard">
              <ContactForm />
            </div>
          </div>
          <ContactDetails />
        </section>

        <section className="ct-faq" aria-labelledby="ct-faq-title">
          <h2 id="ct-faq-title">Questions About Contacting WealthNX</h2>
          <div className="ct-faq__list">
            {contactFaqs.map(([q, a], i) => (
              <details key={q} name="ct-faq" open={i === 0}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
