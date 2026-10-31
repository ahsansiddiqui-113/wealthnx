'use client';

import React, { useId, useState } from 'react';

const faqItems = [
  {
    question: 'What Happens When My Free Trial Ends?',
    answer: "Your trial automatically continues into your selected plan unless you cancel before it ends. You won't be charged during the trial.",
  },
  {
    question: 'When I Will Be Charged First Time?',
    answer: 'You will be charged once your trial period is completed and you can cancel anytime before the next billing cycle.',
  },
  {
    question: 'Is My Financial Data Safe?',
    answer: 'Yes, WealthNX uses read-only connections, industry-standard security and is ISO 27001 certified company. We cannot move your money.',
  },
  {
    question: 'Can I Cancel Anytime?',
    answer: 'Yes. Cancel anytime and keep subscribed access through your current billing period.',
  },
  {
    question: 'Do I Need To Connect All My Accounts?',
    answer: 'No. Start with one or more accounts and connect additional accounts anytime.',
  },
  {
    question: 'Can WealthNX Move My Money?',
    answer: 'No. Connections are read-only. WealthNX can analyze your data but cannot transfer funds or make account changes.',
  },
];

function FaqAccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const panelId = `${id}-panel`;

  return (
    <div className={`pr-faq__item ${open ? 'is-open' : ''}`}>
      <h3 className="pr-faq__heading">
        <button
          type="button"
          className="pr-faq__question"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
        >
          <span>{question}</span>
          <span className="pr-faq__icon" aria-hidden="true">{open ? '−' : '+'}</span>
        </button>
      </h3>
      <div className="pr-faq__collapse" id={panelId} role="region" aria-label={question} inert={!open}>
        <div className="pr-faq__collapse-inner">
          <p className="pr-faq__answer">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function PricingFaq() {
  return (
    <section className="pr-faq" aria-labelledby="pr-faq-title">
      <div className="pr-faq__wrap">
        <h2 className="pr-faq__title" id="pr-faq-title">Frequently Asked Questions</h2>
        <div className="pr-faq__list">
          {faqItems.map((item) => (
            <FaqAccordionItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
