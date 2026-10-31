'use client';

import React, { useId, useState } from 'react';
import { comparisonCategories } from './pricingComparisonData.js';

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="m8 12.3 2.8 2.8L16.2 9.5" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const CrossIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="m9 9 6 6M15 9l-6 6" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

function Cell({ value, plan }) {
  if (value === 'Partial') {
    return <span className="pr-cmp__partial">Partial</span>;
  }
  return value ? (
    <span className="pr-cmp__yes">
      <CheckIcon />
      <span className="pr-sr">{plan} includes this</span>
    </span>
  ) : (
    <span className="pr-cmp__no">
      <CrossIcon />
      <span className="pr-sr">{plan} does not include this</span>
    </span>
  );
}

/** "Find the right WealthNX plan for you" - collapsible comparison table (collapsed by default). */
export default function PricingComparison() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <section className={`pr-cmp ${open ? 'is-open' : ''}`} aria-labelledby="pr-cmp-title">
      <h2 className="pr-cmp__title" id="pr-cmp-title">
        <button
          type="button"
          className="pr-cmp__toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
        >
          <span>Find the right WealthNX plan for you</span>
          <span className="pr-cmp__chevron" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>
      </h2>

      <div className="pr-cmp__collapse" id={panelId} inert={!open}>
        <div className="pr-cmp__collapse-inner">
          <div className="pr-cmp__scroll" tabIndex={open ? 0 : -1} role="region" aria-label="Plan comparison table">
            <table className="pr-cmp__table">
              <thead>
                <tr>
                  <th scope="col" className="pr-cmp__feature-head">Features</th>
                  <th scope="col">Core</th>
                  <th scope="col" className="pr-cmp__plus-head">Plus</th>
                </tr>
              </thead>
              {comparisonCategories.map((category) => (
                <tbody key={category.title}>
                  <tr className="pr-cmp__category">
                    <th scope="colgroup" colSpan={3}>{category.title}</th>
                  </tr>
                  {category.rows.map((row, index) => (
                    <tr key={`${category.title}-${index}`}>
                      <th scope="row" className="pr-cmp__label">{row.label}</th>
                      <td><Cell value={row.core} plan="Core" /></td>
                      <td><Cell value={row.plus} plan="Plus" /></td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
