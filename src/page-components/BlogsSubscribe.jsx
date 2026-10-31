'use client';

import React, { useId, useState } from 'react';
import { subscribe } from './blogApi';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Newsletter form used twice: hero (variant "hero", source "hero") and the bottom card (variant "footer", source "footer-form").
   Non-design strings: validation/success/error messages (status line). */
export function SubscribeForm({ variant, source }) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [state, setState] = useState({ kind: '', text: '' });
  const [busy, setBusy] = useState(false);
  const footer = variant === 'footer';

  const onSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;
    if (!EMAIL_RE.test(email.trim())) { setState({ kind: 'error', text: 'Please enter a valid email address.' }); return; }
    setBusy(true);
    const res = await subscribe({ email: email.trim(), source, website });
    setBusy(false);
    if (res.ok) { setState({ kind: 'ok', text: 'Thanks for subscribing!' }); setEmail(''); }
    else setState({ kind: 'error', text: res.error });
  };

  return (
    <form className={`bl-sub bl-sub--${variant}`} onSubmit={onSubmit} noValidate>
      {footer && <label className="bl-sub__label" htmlFor={id}>Email address</label>}
      <input id={id} className="bl-sub__input" type="email" name="email" autoComplete="email" value={email}
        onChange={(e) => { setEmail(e.target.value); if (state.kind) setState({ kind: '', text: '' }); }}
        placeholder={footer ? 'Enter your email address' : 'Enter your email'} aria-label={footer ? undefined : 'Email address'} />
      <input className="bl-hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(e) => setWebsite(e.target.value)} />
      <button className="bl-sub__btn" type="submit" disabled={busy}>Subscribe</button>
      {footer && <p className="bl-sub__note">Unsubscribe anytime. <a href="/privacy-policy/">Privacy Policy</a></p>}
      <p className={`bl-sub__status bl-sub__status--${state.kind}`} role="status">{state.text}</p>
    </form>
  );
}

const MailIcon = () => (
  <svg viewBox="0 0 80 64" aria-hidden="true" fill="none" stroke="#1a1a1a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="36" cy="40" r="26" fill="#d3f0ea" stroke="none" />
    <path d="M12 26 58 20l5 22-46 6z" fill="#fff" />
    <path d="m13 27 25 15 24-21" />
    <path d="M63 6l-3 7M68 14l-7 3" stroke="#2aa3b8" />
  </svg>
);

export default function BlogsSubscribe({ text = 'Get latest posts in your email' }) {
  return (
    <section className="bl-subs" aria-labelledby="bl-subs-title">
      <div className="bl-c">
        <div className="bl-subs__card">
          <div className="bl-subs__icon"><MailIcon /></div>
          <div className="bl-subs__copy">
            <h2 id="bl-subs-title" className="bl-subs__title">Subscribe to our blog</h2>
            <p className="bl-subs__text">{text}</p>
          </div>
          <SubscribeForm variant="footer" source="footer-form" />
        </div>
      </div>
    </section>
  );
}
