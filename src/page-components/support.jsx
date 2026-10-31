import React from 'react';
import './app.css';
import PageContainer from '@/app/components/PageContainer';
import SectionWrapper from '@/app/components/SectionWrapper';
import SupportFaqList from './SupportFaqList';
import Footer from '@/app/components/Footer';

const Support = () => {
  return (
    <PageContainer>
      <SectionWrapper className="support-page">
        <div className="page-header">
          <h1>Support Center</h1>
          <p>Need help? Browse common answers or email support@wealthnx.ai.</p>
        </div>

        <SupportFaqList />
      </SectionWrapper>
      <Footer />
    </PageContainer>
  );
};

export default Support;
