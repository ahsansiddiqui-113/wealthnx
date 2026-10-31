import React from 'react';
import TopBar from '@/app/components/TopBar';
import SiteFooter from '@/app/components/SiteFooter';
import HomeDownload from './HomeDownload';
import WhyTop from './WhyTop';
import WhyMid from './WhyMid';
import WhyFaq from './WhyFaq';
import './FeatureDetailTemplate.css';
import './HomeRedesign.css';
import './HomeDownload.css';

/* /why-wealthnx/ — composed from three section groups, each in its own file + CSS (prefix wp-):
   WhyTop (hero + "One Place For More Of Your Financial Life"), WhyMid (Less Switching / Ask better questions /
   Connected doesn't mean controlled), WhyFaq (FAQ). Download + footer are the shared components. */
export default function WhyPage() {
  return (
    <div className="feature-detail-template why-page">
      <TopBar />
      <main>
        <WhyTop />
        <WhyMid />
        <WhyFaq />
        <div className="home-redesign"><HomeDownload light /></div>
      </main>
      <SiteFooter />
    </div>
  );
}
