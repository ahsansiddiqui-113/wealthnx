'use client';

import { useId, useState } from 'react';

/** Accordion for the compare page FAQ. Client island: only this needs JS. All rows start collapsed. */
export default function CompareFaq({ items }) {
  const baseId = useId();
  const [open, setOpen] = useState(null);

  return (
    <ul className="cp-faq__list">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <li key={item.q} className={`cp-faq__item${isOpen ? ' is-open' : ''}`}>
            <h3>
              <button
                type="button"
                id={buttonId}
                className="cp-faq__q"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <i className="cp-faq__icon" aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} className="cp-faq__panel" hidden={!isOpen}>
              <p>{item.a}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
