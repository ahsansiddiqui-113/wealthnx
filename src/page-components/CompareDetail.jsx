import React from 'react';
import TopBar from '@/app/components/TopBar';
import SiteFooter from '@/app/components/SiteFooter';
import HomeDownload from './HomeDownload';
import { FitBoxes, FaqList } from './CompareDetailIslands';
import { getCompareDetail } from './compareDetailData';
import './FeatureDetailTemplate.css';
import './HomeRedesign.css';
import './HomeDownload.css';
import './CompareDetail.css';

/* /compare/<slug>/ (server component; interactive islands live in CompareDetailIslands.jsx).
   Copy and values come from compareDetailData.js. Unreadable design text is the literal "TBD". */

const Txt = ({ v }) => (v === 'TBD' ? <span className="mc-tbd">TBD</span> : v);

const iconProps = { viewBox: '0 0 48 48', width: 48, height: 48, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
const icons = {
  hand: (
    <svg {...iconProps}>
      <circle cx="24" cy="11" r="8" />
      <path d="M24 6.5v9M26.4 8.6c-.7-.7-1.500-1-2.400-1-1.400 0-2.600.7-2.600 1.900s1.200 1.700 2.600 1.900 2.600.7 2.600 1.900-1.200 1.900-2.600 1.900c-.9 0-1.700-.3-2.400-1" />
      <path d="M4 29h6v13H4zM10 31.500l9.500-1.500 8 2.500c2.200.7 1.900 3.300-.4 3.300H20.500M10 40l10 3 15-4.500 9-6.500c1.300-1.200-.3-3.200-1.900-2.200l-6.600 4" />
    </svg>
  ),
  candles: (
    <svg {...iconProps}>
      <rect x="4" y="19" width="7" height="14" rx="3" />
      <path d="M7.500 12v7M7.500 33v8" />
      <rect x="15.500" y="11" width="7" height="14" rx="3" />
      <path d="M19 4v7M19 25v6" />
      <rect x="27" y="22" width="7" height="14" rx="3" />
      <path d="M30.500 15v7M30.500 36v7" />
      <rect x="38.500" y="8" width="6" height="12" rx="3" />
      <path d="M41.500 3v5M41.500 20v6" />
    </svg>
  ),
  sparkle: <img src="/assets/genienew.png" alt="" width="48" height="48" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }} />,
};

const Shield = () => (
  <svg viewBox="0 0 48 56" aria-hidden="true">
    <path d="M24 1 3 9.500v15.600c0 13 8.700 24.200 21 29.400 12.300-5.200 21-16.400 21-29.400V9.500z" fill="#0b0b0b" />
    <path d="m15.500 28.500 6 6 11-12.500" fill="none" stroke="#fff" strokeWidth="4.200" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Command = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="#fff" strokeWidth="1.800" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 9h6v6H9zM9 9V6.500A2.500 2.500 0 1 0 6.500 9H9M15 9h2.500A2.500 2.500 0 1 0 15 6.500zM9 15H6.500A2.500 2.500 0 1 0 9 17.500zM15 15v2.500a2.500 2.500 0 1 0 2.500-2.500z" />
  </svg>
);

const Bot = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="#fff" strokeWidth="1.800" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="8" width="16" height="11" rx="4" />
    <path d="M12 8V5M9.500 13.500v1M14.500 13.500v1" />
  </svg>
);

/** A card body block: real text, or skeleton lines while the copy is still TBD. */
function Block({ block }) {
  if (Array.isArray(block.p)) {
    return (
      <p className="mc-card__p">
        {block.p.map((part, i) => (typeof part === 'string' ? part : <strong key={i}>{part.b}</strong>))}
      </p>
    );
  }
  if (block.p) return <p className="mc-card__p">{block.p}</p>;
  if (block.ul) return <ul className="mc-card__ul">{block.ul.map((t) => <li key={t}>{t}</li>)}</ul>;
  if (block.ulTbd) {
    return (
      <ul className="mc-card__ul mc-card__ul--tbd" aria-hidden="true">
        {Array.from({ length: block.ulTbd }, (_, i) => <li key={i}><i className="mc-skel" /></li>)}
      </ul>
    );
  }
  return (
    <p className="mc-card__p mc-card__p--tbd" aria-hidden="true">
      {Array.from({ length: block.tbd }, (_, i) => <i key={i} className="mc-skel" />)}
    </p>
  );
}

export default function CompareDetail({ slug, name }) {
  const { hero, fitBoxes, table, cards, ask, security, faq } = getCompareDetail(slug, name);
  const { columns, rows } = table;

  return (
    <div className="feature-detail-template mc-page">
      <TopBar />

      {/* 1. Hero (reuses the shared .fdt-hero shell) */}
      <section className="fdt-hero mc-hero" aria-labelledby="mc-title">
        <div className="fdt-hero__copy">
          <span className="fdt-offer"><i /> {hero.offer}</span>
          <h1 id="mc-title"><em>{hero.titleTeal}</em>{hero.titleBlack}</h1>
          <p className="mc-hero__text">{hero.text}</p>
          <div className="fdt-hero__actions"><a href={hero.cta.href}>{hero.cta.label}</a></div>
        </div>
        <div className="mc-hero__visual" aria-hidden="true">
          <img src={hero.image} alt="" width={hero.imageWidth} height={hero.imageHeight} />
        </div>
      </section>

      {/* 2. "May Fit Your Needs If" dropdowns */}
      <section className="mc-fit" aria-label="Which app may fit your needs">
        <FitBoxes boxes={fitBoxes} />
      </section>

      {/* 3. Comparison table */}
      <section className="mc-compare" aria-labelledby="mc-compare-title">
        <h2 id="mc-compare-title" data-reveal>{table.title}</h2>
        <div className="mc-tablewrap" data-reveal="fade">
          <table className="mc-table">
            <colgroup><col className="mc-col mc-col--area" /><col className="mc-col mc-col--monarch" /><col className="mc-col mc-col--wx" /></colgroup>
            <thead>
              <tr>
                <th scope="col" className="mc-th mc-th--area">{columns.area}</th>
                <th scope="col" className="mc-th mc-th--monarch">{columns.other}</th>
                <th scope="col" className="mc-th mc-th--wx">{columns.wealthnx}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.area}>
                  <th scope="row" className="mc-td mc-td--area"><div className="mc-cell"><Txt v={row.area} /></div></th>
                  <td className="mc-td mc-td--monarch"><div className="mc-cell"><Txt v={row.other} /></div></td>
                  <td className="mc-td mc-td--wx"><div className="mc-cell"><Txt v={row.wealthnx} /></div></td>
                </tr>
              ))}
              <tr className="mc-tail" aria-hidden="true"><td className="mc-td--area" /><td className="mc-td--monarch" /><td className="mc-td--wx" /></tr>
            </tbody>
          </table>
        </div>
        <p className="mc-compare__note">{table.footnote}</p>
      </section>

      {/* 4-6. White rounded panel */}
      <div className="mc-panel">
        <div className="mc-panel__in">
          <section className="mc-cards-sec" aria-label="When each app may fit">
            <div className="mc-cards">
              {cards.map((card, i) => (
                <article key={card.key} className={`mc-card mc-card--${card.key}`} style={{ "--i": i }} data-reveal>
                  <span className="mc-card__icon">{icons[card.icon]}</span>
                  <h3 className="mc-card__title">{card.title.map((line) => <span key={line}>{line}</span>)}</h3>
                  <div className="mc-card__body">
                    {card.blocks.map((block, i) => <Block key={i} block={block} />)}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mc-ask" aria-labelledby="mc-ask-title">
            <div className="mc-ask__copy">
              <h2 id="mc-ask-title" className="mc-h2" data-reveal>{ask.title.map((line) => <span key={line}>{line}</span>)}</h2>
              <p className="mc-ask__sub">{ask.subtitle}</p>
            </div>
            <div className="mc-chat" role="group" aria-label="Example questions">
              <span className="mc-chat__cap mc-chat__cap--l">{ask.leftCaption}</span>
              <div className="mc-chat__a">
                <p className="mc-chat__q">{ask.left.question}</p>
                <i className="mc-chat__rule" aria-hidden="true" />
                <p className="mc-chat__note"><Txt v={ask.left.note} /></p>
              </div>
              <span className="mc-chat__btn mc-chat__btn--orange" aria-hidden="true"><Command /></span>
              <div className="mc-chat__b">
                <p className="mc-chat__q">{ask.right.question}</p>
                <i className="mc-chat__rule" aria-hidden="true" />
                <p className="mc-chat__note"><Txt v={ask.right.note} /></p>
              </div>
              <span className="mc-chat__btn mc-chat__btn--teal" aria-hidden="true"><Bot /></span>
              <span className="mc-chat__cap mc-chat__cap--r">{ask.rightCaption}</span>
            </div>
          </section>

          <section className="mc-sec" aria-labelledby="mc-sec-title">
            <div className="mc-sec__vis">
              <p className="mc-sec__cap">{security.caption}</p>
              <i className="mc-sec__plate" aria-hidden="true" />
              <span className="mc-sec__shield" aria-hidden="true"><Shield /></span>
              <ul className="mc-sec__pills">
                {security.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="mc-sec__copy">
              <h2 id="mc-sec-title" className="mc-h2" data-reveal>{security.title}</h2>
              <p>{security.text}</p>
            </div>
          </section>
        </div>
      </div>

      {/* 7. FAQ */}
      <section className="mc-faq" aria-labelledby="mc-faq-title">
        <h2 id="mc-faq-title" data-reveal>{faq.title}</h2>
        <FaqList items={faq.items} openIndex={faq.openIndex} />
      </section>

      {/* 8. Download (shared home section) */}
      <div className="home-redesign mc-dl">
        <HomeDownload light />
      </div>

      {/* 9. Footer */}
      <SiteFooter />
    </div>
  );
}
