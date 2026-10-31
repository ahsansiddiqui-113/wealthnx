import styles from './PartnerStrip.module.css';

/* Data-partner logo strip shown under page heroes. The track repeats the artwork COPIES times and slides by exactly
   one copy, so it loops without a jump and still covers screens up to (COPIES - 1) * 705px wide. */
const COPIES = 6;
const LOGOS = [['nasdaq', 434], ['morningstar', 424], ['fmp', 367], ['coingecko', 426]];

export default function PartnerStrip({ className = '' }) {
  return (
    <section className={`${styles.strip} ${className}`.trim()} aria-label="Data partners: Nasdaq, Morningstar, FMP, CoinGecko">
      <div className={styles.track} aria-hidden="true">
        {Array.from({ length: COPIES }, (_, i) => LOGOS.map(([n, w]) => <img key={i + n} src={`/assets/home-partner-${n}.webp`} alt="" width={w} height={234} decoding="async" />))}
      </div>
    </section>
  );
}
