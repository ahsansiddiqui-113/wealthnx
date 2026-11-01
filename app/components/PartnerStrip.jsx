import styles from './PartnerStrip.module.css';

/* Data-source line shown under page heroes: names only (no logos), stating that the data is sourced from them. */
const SOURCES = ['Nasdaq', 'Morningstar', 'FMP', 'CoinGecko'];

export default function PartnerStrip({ className = '' }) {
  return (
    <section className={`${styles.strip} ${className}`.trim()} aria-label="Data sources: Nasdaq, Morningstar, FMP, CoinGecko">
      <p className={styles.line}>
        <span className={styles.lead}>Market data sourced from</span>
        <span className={styles.names}>
          {SOURCES.map((n) => <b key={n}>{n}</b>)}
        </span>
      </p>
    </section>
  );
}
