'use client';

import React, { useRef, useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9 +()\-.]+$/;
const INITIAL = { firstName: '', lastName: '', email: '', phone: '', message: '', website: '' };
const GENERIC_ERROR = 'Sorry, we could not send your message. Please try again in a moment or email support@wealthnx.ai.';

function validate(values) {
  const errors = {};
  const firstName = values.firstName.trim();
  const lastName = values.lastName.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const message = values.message.trim();

  if (!firstName) errors.firstName = 'Please enter your first name.';
  else if (firstName.length > 100) errors.firstName = 'First name must be 100 characters or fewer.';

  if (!lastName) errors.lastName = 'Please enter your last name.';
  else if (lastName.length > 100) errors.lastName = 'Last name must be 100 characters or fewer.';

  if (!email) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(email) || email.length > 255) errors.email = 'Please enter a valid email address.';

  if (phone && (phone.length > 40 || !PHONE_RE.test(phone))) {
    errors.phone = 'Use digits, spaces and + ( ) - . only (max 40 characters).';
  }

  if (!message) errors.message = 'Please tell us how we can help.';
  else if (message.length < 5) errors.message = 'Your message is a little short. Please add a few more words.';
  else if (message.length > 5000) errors.message = 'Message must be 5000 characters or fewer.';

  return errors;
}

/** Contact form island. POSTs JSON to /api/contact-message (PHP/MySQL backend). */
export default function ContactForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [serverError, setServerError] = useState('');
  const formRef = useRef(null);

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === 'sending') return;

    const found = validate(values);
    setErrors(found);
    setServerError('');
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      setStatus('idle');
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('/api/contact-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          message: values.message.trim(),
          website: values.website,
          page: '/contact',
        }),
      });
      if (!response.ok) {
        let detail = '';
        try { detail = (await response.json())?.error || ''; } catch { /* non-JSON error body */ }
        setServerError(response.status === 400 || response.status === 429 ? (detail || GENERIC_ERROR) : GENERIC_ERROR);
        setStatus('error');
        return;
      }
      setValues(INITIAL);
      setStatus('success');
    } catch {
      setServerError(GENERIC_ERROR);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="ct-success" role="status" aria-live="polite">
        <span className="ct-success__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </span>
        <p>Thanks — we&rsquo;ve received your message and will be in touch soon.</p>
      </div>
    );
  }

  const sending = status === 'sending';
  const field = (name) => ({
    id: `ct-${name}`,
    name,
    value: values[name],
    onChange,
    disabled: sending,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `ct-${name}-error` : undefined,
  });
  const fieldError = (name) => (errors[name] ? <p className="ct-error" id={`ct-${name}-error`}>{errors[name]}</p> : null);

  return (
    <form className="ct-form" ref={formRef} onSubmit={onSubmit} noValidate aria-label="Contact WealthNX">
      <div className="ct-row">
        <div className="ct-field">
          <label className="ct-sr" htmlFor="ct-firstName">First Name</label>
          <input type="text" placeholder="First Name" autoComplete="given-name" maxLength={100} required {...field('firstName')} />
          {fieldError('firstName')}
        </div>
        <div className="ct-field">
          <label className="ct-sr" htmlFor="ct-lastName">Last Name</label>
          <input type="text" placeholder="Last Name" autoComplete="family-name" maxLength={100} required {...field('lastName')} />
          {fieldError('lastName')}
        </div>
      </div>

      <div className="ct-field">
        <label className="ct-sr" htmlFor="ct-email">Email</label>
        <input type="email" placeholder="Email" autoComplete="email" maxLength={255} required {...field('email')} />
        {fieldError('email')}
      </div>

      <div className="ct-field">
        <label className="ct-sr" htmlFor="ct-phone">Phone Number</label>
        <input type="tel" placeholder="Phone Number" autoComplete="tel" maxLength={40} {...field('phone')} />
        {fieldError('phone')}
      </div>

      <div className="ct-field">
        <label className="ct-sr" htmlFor="ct-message">Message</label>
        <textarea placeholder="Message" rows={4} maxLength={5000} required {...field('message')} />
        {fieldError('message')}
      </div>

      {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
      <div className="ct-hp" aria-hidden="true">
        <input type="text" name="website" value={values.website} onChange={onChange} tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' && <p className="ct-alert" role="alert">{serverError || GENERIC_ERROR}</p>}

      <button type="submit" className="ct-submit" disabled={sending} aria-busy={sending}>
        {sending ? 'Sending…' : 'Submit'}
      </button>
    </form>
  );
}
