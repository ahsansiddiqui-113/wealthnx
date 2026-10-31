import React from 'react';
import './app.css';
import ShowcasePage from '@/app/components/ShowcasePage';

export default function CryptoPage() {
  return (
    <ShowcasePage
      title="Crypto Agent"
      subtitle="Unified crypto analytics and market context in a consistent premium visual framework."
      cards={[
        { title: 'On-chain Snapshot', description: 'Track key indicators and exchange behavior.', placeholder: 'On-chain chart preview' },
        { title: 'Token Watch', description: 'Follow watchlists with alert-ready insights.', placeholder: 'Token list preview' },
        { title: 'Risk Heatmap', description: 'Understand volatility and allocation exposure.', placeholder: 'Risk heatmap preview' }
      ]}
      ctaText="Open Crypto"
    />
  );
}
