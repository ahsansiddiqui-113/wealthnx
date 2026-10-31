'use client';

import { useId, useState } from 'react';

/** FAQ accordion island: one row open at a time (same behaviour as the Monarch compare FAQ). */
export default function WhyFaqList({ items, openIndex = null }) {
  const baseId = useId();
  const [open, setOpen] = useState(openIndex);
  return (
    <div className="wp-faq-list">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-${i}`;
        return (
          <div key={i} className={`wp-faq-row${isOpen ? ' is-open' : ''}`}>
            <h3 className="wp-faq-h">
              <button type="button" className="wp-faq-q" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? null : i)}>
                <span>{item.q}</span>
                <i className="wp-faq-icon" aria-hidden="true" />
              </button>
            </h3>
            <div className="wp-faq-collapse" id={panelId} role="region" aria-label={item.q} inert={!isOpen}>
              <div className="wp-faq-inner"><p className="wp-faq-a">{item.a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
