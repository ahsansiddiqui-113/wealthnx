import React from 'react';
import Link from 'next/link';
import PageContainer from './PageContainer';
import SectionWrapper from './SectionWrapper';
import ImagePlaceholder from './ImagePlaceholder';
import Footer from './Footer';

const ShowcasePage = ({ title, subtitle, cards = [], ctaText = 'Start now', embedded = false }) => {
  const content = (
    <SectionWrapper className="generic-page showcase-page">
      <div className="page-header">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="page-panel">
        <div className="feature-grid">
          {cards.map((card) => (
            <div key={card.title} className="premium-card feature-tile">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <ImagePlaceholder label={card.placeholder || 'Screenshot unavailable'} ratio="16 / 10" />
            </div>
          ))}
        </div>
      </div>

      <div className="page-panel" style={{ marginTop: '14px', textAlign: 'center' }}>
        <h2 style={{ marginTop: 0 }}>Launch-ready section</h2>
        <p style={{ marginBottom: '12px' }}>
          This page follows the shared premium layout system and can be upgraded with exact assets from Figma.
        </p>
        <Link className="btn btn-primary" href="/">{ctaText}</Link>
      </div>
    </SectionWrapper>
  );

  if (embedded) {
    return content;
  }

  return (
    <PageContainer>
      {content}
      <Footer />
    </PageContainer>
  );
};

export default ShowcasePage;
