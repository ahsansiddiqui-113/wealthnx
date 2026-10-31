import React from 'react';
import WhyFaqList from './WhyFaqList';
import './WhyFaq.css';

// "ai" lowercase is as drawn in the design.
const ITEMS = [
  { q: 'Can I see all my accounts in one app?', a: '' },
  {
    q: 'Is WealthNX a personal finance app with ai assistant features?',
    a: 'Yes. Wealth Genie can explain available financial information and help you explore it. It does not independently make financial decisions or place trades for you.',
  },
];

export default function WhyFaq() {
  return (
    <section className="wp-faq" aria-labelledby="wp-faq-title">
      <div className="wp-faq-in">
        <h2 id="wp-faq-title" data-reveal>Frequently Asked Questions</h2>
        <WhyFaqList items={ITEMS} openIndex={1} />
      </div>
    </section>
  );
}
