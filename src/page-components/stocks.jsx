import React from 'react';
import './app.css';
import ShowcasePage from '@/app/components/ShowcasePage';

export default function StocksPage() {
  return (
    <ShowcasePage
      title="Stocks Intelligence"
      subtitle="Research-first stock workflows with premium dark visual language and consistent layout rhythm."
      cards={[
        { title: 'Market Movers', description: 'Track top gainers and losers with signal density.', placeholder: 'Stocks dashboard preview' },
        { title: 'Earnings Lens', description: 'Summarize earnings and guidance with AI context.', placeholder: 'Earnings view coming soon' },
        { title: 'Sentiment Board', description: 'Blend news sentiment with market movement.', placeholder: 'Sentiment board preview' }
      ]}
      ctaText="Open Stocks"
    />
  );
}
