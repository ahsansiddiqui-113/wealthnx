'use client';

import { useId, useState } from 'react';

/* Client islands for /compare/<slug>/: the two "May Fit Your Needs If" dropdowns and the FAQ accordion.
   Everything else on the page is server-rendered. 'TBD' strings render as a neutral grey "TBD". */

const Txt = ({ v }) => (v === 'TBD' ? <span className="mc-tbd">TBD</span> : v);

const Chevron = ({ up }) => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={up ? 'M3.5 10.5 8 6l4.5 4.5' : 'M3.5 5.5 8 10l4.5-4.5'} />
  </svg>
);

/** Two dropdown boxes; each toggles independently. */
export function FitBoxes({ boxes }) {
  const baseId = useId();
  const [open, setOpen] = useState(() => boxes.map((b) => !!b.open));
  const toggle = (i) => setOpen((prev) => prev.map((v, j) => (j === i ? !v : v)));

  return (
    <div className="mc-fit__grid">
      {boxes.map((box, i) => {
        const isOpen = open[i];
        const panelId = `${baseId}-fit-${i}`;
        return (
          <div key={box.id} className={`mc-fitbox${isOpen ? ' is-open' : ''}`}>
            <h3 className="mc-fitbox__heading">
              <button type="button" className="mc-fitbox__btn" aria-expanded={isOpen} aria-controls={panelId} onClick={() => toggle(i)}>
                <span>{box.title}</span>
                <Chevron up={isOpen} />
              </button>
            </h3>
            <div className="mc-collapse" id={panelId} role="region" aria-label={box.title} inert={!isOpen}>
              <div className="mc-collapse__inner">
                <ul className="mc-fitbox__list">
                  {box.bullets.map((b, k) => (
                    <li key={k}><Txt v={b} /></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** FAQ accordion: one row open at a time, the design's open row is the initial state. */
export function FaqList({ items, openIndex = null }) {
  const baseId = useId();
  const [open, setOpen] = useState(openIndex);

  return (
    <div className="mc-faq__list">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-faq-${i}`;
        return (
          <div key={i} className={`mc-faqrow${isOpen ? ' is-open' : ''}`}>
            <h3 className="mc-faqrow__heading">
              <button type="button" className="mc-faqrow__q" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? null : i)}>
                <span>{item.q}</span>
                <i className="mc-faqrow__icon" aria-hidden="true" />
              </button>
            </h3>
            <div className="mc-collapse" id={panelId} role="region" aria-label={item.q} inert={!isOpen}>
              <div className="mc-collapse__inner">
                <p className="mc-faqrow__a"><Txt v={item.a} /></p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
