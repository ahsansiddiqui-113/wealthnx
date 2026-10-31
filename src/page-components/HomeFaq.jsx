'use client';

import React, { useState } from 'react';
import './HomeFaq.css';

/* "Questions People Ask About WealthNX": dark accordion, one answer open at a time. Same questions feed the FAQPage JSON-LD in app/page.jsx. */
export default function HomeFaq({ faqs }) {
  const [open, setOpen] = useState(1);
  return (
    <section className="hq-section" aria-labelledby="hq-title">
      <h2 id="hq-title" className="hq-title" data-reveal>Questions People Ask About WealthNX</h2>
      <div className="hq-list">
        {faqs.map(([q, a], i) => (
          <div className={`hq-item${open === i ? ' is-open' : ''}`} key={q}>
            <h3>
              <button type="button" id={`hq-q-${i}`} aria-expanded={open === i} aria-controls={`hq-a-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{q}</span>
                <i aria-hidden="true" />
              </button>
            </h3>
            <div className="hq-a" id={`hq-a-${i}`} role="region" aria-labelledby={`hq-q-${i}`}><div><p>{a}</p></div></div>
          </div>
        ))}
      </div>
    </section>
  );
}
