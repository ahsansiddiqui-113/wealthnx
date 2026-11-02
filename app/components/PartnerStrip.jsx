import React from 'react';
import styles from './PartnerStrip.module.css';

/* Data-source strip shown under page heroes: "Market data sourced from" plus the four provider badges, spaced apart. The unit repeats COPIES times and the track slides by exactly one copy, so it loops without a jump and
   still covers screens up to (COPIES - 1) units wide. */
const COPIES = 6;
const SOURCES = [['nasdaq', 'Nasdaq', 176], ['morningstar', 'Morningstar', 244], ['fmp', 'FMP', 127], ['coingecko', 'CoinGecko', 225]];

export default function PartnerStrip({ className = '' }) {
  return (
    <section className={`${styles.strip} ${className}`.trim()} aria-label="Data sources: Nasdaq, Morningstar, FMP, CoinGecko">
      <div className={styles.track}>
        {Array.from({ length: COPIES }, (_, i) => (
          <div className={styles.unit} key={i} aria-hidden={i > 0 ? 'true' : undefined}>
            <span className={styles.lead}>Market data sourced from</span>
            {SOURCES.map(([key, name, w]) => (
              <React.Fragment key={key}>
                <img src={`/assets/data-source-${key}.webp`} alt={i === 0 ? name : ''} width={w} height={46} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
