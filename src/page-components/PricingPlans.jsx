'use client';

import React, { useId, useState } from 'react';

const PLANS = {
  core: {
    name: 'Core',
    description: 'Everything you need to organize your finances',
    listPrice: '$17.99',
    monthly: { price: '$12.49', caption: 'billed monthly' },
    yearly: { price: '$8.99', caption: 'billed $107.94 annually' },
  },
  plus: {
    name: 'Plus',
    description: 'Everything in Core, plus advanced AI to help you make sense of your money',
    listPrice: '$29.99',
    monthly: { price: '$20.99', caption: 'billed monthly' },
    yearly: { price: '$15.00', caption: 'billed $179.94 annually' },
  },
};

const coreFeatures = [
  {
    title: 'See Your Whole Financial Picture',
    description: 'Link unlimited accounts to see complete net worth, balances and financial picture in one place.',
  },
  {
    title: 'Budget, Save & Track Your Debt',
    description: 'Build budgets and set savings or debt goals to take control of where your money goes.',
  },
  {
    title: 'Ask & Manage With AI',
    description: 'Use accountant and build mode to ask questions, understand your finances, and then act.',
  },
  {
    title: 'Talk & Access On Any Device',
    description: 'Use voice to voice or textual conversation and access your financial picture from both mobile and web.',
  },
  {
    title: 'Plan & Share Together As A Family',
    description: 'Track your financial goals and share your financial picture with a partner or family member.',
  },
];

const plusFeatures = [
  {
    title: 'Ask, Analyze & Explore With Advanced AI',
    description: 'Unlock advanced AI models, higher voice conversations limit, and specialized assistants for deeper financial help.',
  },
  {
    title: 'Explore Your Investments',
    description: 'Use premium data sources, stocks, and crypto assistants, and advanced analysis to better understand investments.',
  },
  {
    title: 'Plan Your Future And Retirement',
    description: 'Explore retirement scenarios and long-term projections using your connected financial information.',
  },
  {
    title: 'Build & Organize Your Financial Life',
    description: 'Use AI to categorize transactions, build budgets, analyze your finances, and high quality visualizations.',
  },
  {
    title: 'Get More Done With Voice-To-Action',
    description: 'Use higher voice-to-action limit, 10,000 credits, and priority support to get more from WealthNX every day.',
  },
];

const SIGNUP_URL = 'https://wealthnx.ai/get';

function FeatureAccordionItem({ title, description }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <li className={`pr-feature ${open ? 'is-open' : ''}`}>
      <button
        type="button"
        className="pr-feature__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="pr-feature__check" aria-hidden="true">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <span className="pr-feature__title">{title}</span>
        <span className="pr-feature__chevron" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </button>
      <div className="pr-feature__panel" id={panelId} role="region" aria-label={title} hidden={!open}>
        <p>{description}</p>
      </div>
    </li>
  );
}

function PlanCard({ plan, cycle, features, selected, featured, onSelect }) {
  const price = plan[cycle].price;

  return (
    <article className={`pr-card ${featured ? 'pr-card--plus' : 'pr-card--core'}${selected ? ' is-selected' : ''}`} style={{ "--i": featured ? 1 : 0 }} data-reveal>
      {featured && (
        <span className="pr-card__badge">
          <span aria-hidden="true">✦</span> Most Popular
        </span>
      )}

      <div className="pr-card__top" onClick={(event) => { if (!event.target.closest('a, button')) onSelect(); }}>
        <h2 className="pr-card__name">
          <button type="button" className="pr-card__select" aria-pressed={selected} onClick={onSelect}>
            <span className={`pr-radio ${selected ? 'is-on' : ''}`} aria-hidden="true" />
            {plan.name}
          </button>
        </h2>
        <p className="pr-card__desc">{plan.description}</p>

        <p className="pr-card__list-price"><s>{plan.listPrice}</s></p>
        <p className="pr-card__price">{price}<span>/month</span></p>
        <p className="pr-card__caption">{plan[cycle].caption}</p>

        <a className="pr-card__cta" href={SIGNUP_URL}>
          Start your 7 days free trial then {price}/month
        </a>
      </div>

      <ul className="pr-features">
        {features.map((item) => (
          <FeatureAccordionItem key={item.title} title={item.title} description={item.description} />
        ))}
      </ul>
    </article>
  );
}

export default function PricingPlans() {
  const [isYearly, setIsYearly] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState('core');
  const cycle = isYearly ? 'yearly' : 'monthly';

  return (
    <>
      <div className="pr-toggle-wrap">
        <div className="pr-toggle" role="group" aria-label="Billing cycle">
          <button
            type="button"
            className={!isYearly ? 'is-active' : ''}
            aria-pressed={!isYearly}
            onClick={() => setIsYearly(false)}
          >
            Monthly
            <span className="pr-toggle__badge">Save 30%</span>
          </button>
          <button
            type="button"
            className={isYearly ? 'is-active' : ''}
            aria-pressed={isYearly}
            onClick={() => setIsYearly(true)}
          >
            Yearly
            <span className="pr-toggle__badge">Save 50%</span>
          </button>
        </div>
      </div>

      <div className="pr-cards">
        <PlanCard plan={PLANS.core} cycle={cycle} features={coreFeatures} selected={selectedPlan === 'core'} onSelect={() => setSelectedPlan('core')} />
        <PlanCard plan={PLANS.plus} cycle={cycle} features={plusFeatures} featured selected={selectedPlan === 'plus'} onSelect={() => setSelectedPlan('plus')} />
      </div>
    </>
  );
}
