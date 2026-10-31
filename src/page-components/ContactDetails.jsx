import React from 'react';

const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=424+E+Central+Blvd+Ste+248+Orlando+FL+32801';

const arrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

const icons = {
  email: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 8 8 6 8-6" /></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>,
  pin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>,
};

/** Company contact details: three equal info cards. Server component, no client JS. */
export default function ContactDetails() {
  return (
    <section className="ct-reach" aria-labelledby="ct-reach-title">
      <h2 id="ct-reach-title" className="ct-reach__title">Contact details</h2>
      <ul className="ct-reach__list">
        <li>
          <a className="ct-reach__card" href="mailto:support@wealthnx.ai">
            <span className="ct-reach__icon">{icons.email}</span>
            <span className="ct-reach__label">Email</span>
            <span className="ct-reach__value">support@wealthnx.ai</span>
            <span className="ct-reach__cta">Email us {arrow}</span>
          </a>
        </li>
        <li>
          <a className="ct-reach__card" href="tel:+14076004801">
            <span className="ct-reach__icon">{icons.phone}</span>
            <span className="ct-reach__label">Phone</span>
            <span className="ct-reach__value">+1 407-600-4801</span>
            <span className="ct-reach__cta">Call us {arrow}</span>
          </a>
        </li>
        <li>
          <a className="ct-reach__card" href={MAPS_URL} target="_blank" rel="noopener noreferrer" aria-label="Get directions to the WealthNX office (opens in a new tab)">
            <span className="ct-reach__icon">{icons.pin}</span>
            <span className="ct-reach__label">Office</span>
            <address className="ct-reach__value">424 E Central Blvd, Ste 248, Orlando, FL 32801, United States</address>
            <span className="ct-reach__cta">Get directions {arrow}</span>
          </a>
        </li>
      </ul>
    </section>
  );
}
