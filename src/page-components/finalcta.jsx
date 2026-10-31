import React from 'react';
import ShowcasePage from '@/app/components/ShowcasePage';

export default function FinalCtaPage() {
  return (
    <ShowcasePage
      title="Final CTA & Support"
      subtitle="Final conversion and support entry page aligned to the same spacing and premium theme."
      cards={[
        { title: 'Get Started', description: 'Primary conversion with app store pathways.', placeholder: 'CTA visual missing' },
        { title: 'Talk to Support', description: 'Help desk and guided onboarding.', placeholder: 'Support panel missing' },
        { title: 'FAQ Bridge', description: 'Top recurring questions before conversion.', placeholder: 'FAQ bridge visual' }
      ]}
      ctaText="Start Free"
    />
  );
}
