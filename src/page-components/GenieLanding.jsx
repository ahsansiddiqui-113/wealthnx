import React from 'react';
import TopBar from '@/app/components/TopBar';
import { APPLE_STORE_URL } from '@/app/components/useStoreUrl';
import GenieTeam from './GenieTeam';
import './FeatureDetailTemplate.css';
import './GenieLanding.css';
import './HomeRedesign.css';
import './HomeDownload.css';
import './FeatureMobile.css';
import HomeDownload from './HomeDownload';
import './GenieMobile.css';
import './HeroCore.css';
import { heroCoreProps } from './heroCore';
import SiteFooter from '@/app/components/SiteFooter';
import PartnerStrip from '@/app/components/PartnerStrip';
const DEMO_VIDEO_URL = 'https://www.youtube.com/watch?v=npaG1AtRbNw';


/** Wealth Genie landing page: server-rendered shell (hero + footer) around the interactive <GenieTeam /> island.
 *  The /features/<assistant>/ pages reuse it: `agent` opens that assistant, `hero` swaps the headline and blurb. */
export default function GenieLanding({ agent, hero }) {
  return (
    <div className={`feature-detail-template fdt-mobile genie-mobile gl-page${agent === "crypto" || agent === "build-mode" ? " gl-hero-sm" : ""}`}>
      <TopBar />
      <div className="gl-main">
        <section className="fdt-hero" aria-labelledby="genie-hero-title">
          <div className="fdt-hero__copy">
            {!hero && <span className="fdt-offer"><i /> Get 50% Off - Limited Time Offer</span>}
            <h1 id="genie-hero-title">{hero ? <>{hero.headline.replace(/:\s*$/, "")} <em>{hero.accent}</em></> : <>One AI wealth assistant for <em>spending, stocks and crypto.</em></>}</h1>
          </div>
          <div className="fdt-hero__visual" aria-hidden="true">
            <div className="fdt-hero__glow" />
            <img src="/assets/feature-wealth-genie-hero.webp" alt="" width={884} height={965} className="fdt-hero-phone" {...heroCoreProps("/assets/feature-wealth-genie-hero.webp")} />
          </div>
          <div className="fdt-hero__aside">
            <p>{hero ? hero.blurb : 'Questions about spending, stocks, crypto or net worth, answered from your own accounts by text or voice.'}</p>
            <div className="fdt-hero__actions">
              <a href={APPLE_STORE_URL} target="_blank" rel="noreferrer">Start Your 7-Day Free Trial</a>
              <a href={DEMO_VIDEO_URL} target="_blank" rel="noreferrer" className="gl-play" aria-label="Watch the WealthNX introduction"><span className="fdt-play-icon" aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        {/* phone-only (hidden above 700px by GenieMobile.css): data-partner strip under the hero */}
        <PartnerStrip className="gl-mobile-only" />

        <GenieTeam initialAgent={agent} />

        {/* phone-only: shared home download block (same as /features) */}
        <div className="home-redesign fdt-hd gl-mobile-only"><HomeDownload light /></div>
      </div>

      <SiteFooter />
    </div>
  );
}
