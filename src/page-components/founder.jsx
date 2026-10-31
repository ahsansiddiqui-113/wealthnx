import React from 'react';
import ShowcasePage from '@/app/components/ShowcasePage';

export default function FounderPage() {
  return (
    <ShowcasePage
      title="Founder Story"
      subtitle="About/founder narrative page using the same premium dark design language and layout discipline."
      cards={[
        { title: 'Mission', description: 'Why WealthNX exists and what it solves.', placeholder: 'Founder image missing' },
        { title: 'Principles', description: 'Values behind product and decision quality.', placeholder: 'Principles visual missing' },
        { title: 'Roadmap', description: 'Where the platform is headed next.', placeholder: 'Roadmap visual missing' }
      ]}
      ctaText="Read Story"
    />
  );
}
