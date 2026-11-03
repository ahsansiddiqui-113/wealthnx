import React from 'react';
import TopBar from '@/app/components/TopBar';
import SiteFooter from '@/app/components/SiteFooter';
import HomeDownload from './HomeDownload';
import HomeVoices from './HomeVoices';
import { getCompareDetail } from './compareDetailData';
import './FeatureDetailTemplate.css';
import './HomeRedesign.css';
import './HomeDownload.css';
import './HomeVoices.css';
import './CompareDetail.css';

/* /comparison/wealthnx-vs-<app>/ (server component).
   Copy comes from compareDetailData.js; the testimonials and the closing band are the shared home sections. */

export default function CompareDetail({ slug, name }) {
  const detail = getCompareDetail(slug);
  if (!detail) return null;
  const { hero, compare, download } = detail;

  return (
    <div className="feature-detail-template mc-page">
      <TopBar />

      {/* 1. Hero (reuses the shared .fdt-hero shell) */}
      <section className="fdt-hero mc-hero" aria-labelledby="mc-title">
        <div className="fdt-hero__copy">
          <h1 id="mc-title">{hero.titleBlack}<em>{hero.titleTeal}</em></h1>
          <p className="mc-hero__text">{hero.text}</p>
        </div>
        <div className="mc-hero__visual" aria-hidden="true">
          <img src={hero.image} alt="" width={hero.imageWidth} height={hero.imageHeight} />
        </div>
      </section>

      {/* 2. WealthNX vs the other app, row by row */}
      <section className="mc-compare mc-vs" aria-labelledby="mc-compare-title">
        <h2 id="mc-compare-title" data-reveal>{compare.title}</h2>
        <p className="mc-vs__lead">{compare.text}</p>
        <div className="mc-tablewrap" data-reveal="fade">
          <table className="mc-table mc-vs__table">
            <caption className="mc-vs__caption">{compare.title}</caption>
            <colgroup><col className="mc-vs__col" /><col className="mc-vs__col" /></colgroup>
            <thead>
              <tr>
                <th scope="col" className="mc-th mc-th--wx">{compare.columns.wealthnx}</th>
                <th scope="col" className="mc-th mc-th--monarch">{compare.columns.other}</th>
              </tr>
            </thead>
            <tbody>
              {compare.rows.map((row) => (
                <tr key={row.wealthnx.title}>
                  <td className="mc-td mc-td--wx">
                    <div className="mc-cell" data-app={compare.columns.wealthnx}>
                      <h3>{row.wealthnx.title}</h3>
                      <p>{row.wealthnx.text}</p>
                    </div>
                  </td>
                  <td className="mc-td mc-td--monarch">
                    <div className="mc-cell" data-app={compare.columns.other}>
                      <h3>{row.other.title}</h3>
                      <p>{row.other.text}</p>
                    </div>
                  </td>
                </tr>
              ))}
              <tr className="mc-tail" aria-hidden="true"><td className="mc-td--wx" /><td className="mc-td--monarch" /></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Testimonials (shared home section) */}
      <div className="home-redesign mc-voices">
        <HomeVoices sayOnly />
      </div>

      {/* 4. Closing band (shared home section) */}
      <div className="home-redesign mc-dl">
        <HomeDownload light titleLines={download.titleLines} textLines={download.textLines} />
      </div>

      {/* 5. Footer */}
      <SiteFooter />
    </div>
  );
}
