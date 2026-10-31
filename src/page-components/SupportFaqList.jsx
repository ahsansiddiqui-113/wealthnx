'use client';

import React, { useMemo, useState } from 'react';
import PremiumCard from '@/app/components/PremiumCard';

export default function SupportFaqList() {
  const [active, setActive] = useState(null);

  const items = useMemo(
    () => [
      {
        q: 'How do I create an account?',
        a: 'Open the app, choose Create Account, complete profile details, and verify your email.'
      },
      {
        q: 'How do I reset my password?',
        a: 'Use Forgot Password on login. A reset code is sent to your registered email.'
      },
      {
        q: 'Can I recover a deleted account?',
        a: 'Yes, if within the recovery period. Contact support immediately.'
      },
      {
        q: 'How do I update my profile information?',
        a: 'Go to profile settings, edit your details, and save changes.'
      }
    ],
    []
  );

  return (
    <div className="faq-grid">
      {items.map((item, i) => {
        const isOpen = active === i;
        return (
          <PremiumCard key={item.q} className="faq-item">
            <button onClick={() => setActive(isOpen ? null : i)}>
              <span>{item.q}</span>
              <span>{isOpen ? '-' : '+'}</span>
            </button>
            {isOpen ? <p>{item.a}</p> : null}
          </PremiumCard>
        );
      })}
    </div>
  );
}
