import React from 'react';
import TopBar from '@/app/components/TopBar';
import SiteFooter from '@/app/components/SiteFooter';
import './FeatureDetailTemplate.css';
import './CompareLanding.css';

/** Temporary page for /compare/<slug>/ until the real comparison designs and approved copy are supplied. */
export default function ComparePlaceholder({ name }) {
  return (
    <div className="feature-detail-template cp-page">
      <TopBar />
      <section className="cp-ph" aria-labelledby="cp-ph-title">
        <h1 id="cp-ph-title">WealthNX vs {name}</h1>
        <p>Detailed comparison coming soon.</p>
        <a className="cp-btn" href="/comparison/">Back to all comparisons</a>
      </section>
      <SiteFooter />
    </div>
  );
}
