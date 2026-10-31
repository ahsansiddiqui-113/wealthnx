import React from 'react';
import ShowcasePage from '@/app/components/ShowcasePage';

export default function DashboardPreviewPage() {
  return (
    <ShowcasePage
      title="Dashboard Preview"
      subtitle="Product preview page following the same proportion and visual rhythm as the reference ecosystem."
      cards={[
        { title: 'Net Worth View', description: 'Portfolio and account snapshots in one space.', placeholder: 'Net worth preview missing' },
        { title: 'Cash Flow', description: 'Recurring trends and spending highlights.', placeholder: 'Cash flow visual missing' },
        { title: 'Allocation', description: 'Cross-asset distribution and performance.', placeholder: 'Allocation panel missing' }
      ]}
      ctaText="Open Dashboard"
    />
  );
}
