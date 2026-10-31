import TopBar from '@/app/components/TopBar';
import SiteFooter from '@/app/components/SiteFooter';
import HomeDownload from '@/src/page-components/HomeDownload';
import '@/src/page-components/HomeDownload.css';
import styles from './light.module.css';

/* Shared light-theme shell for the calculator pages: white TopBar, left teal glow, centered hero text,
   chips, then the calculator body (children), then the dark download band and the site footer. */
export default function LightShell({ eyebrow, title, sub, chips = ['Instant result', 'No bank login', 'Runs in your browser'], children }) {
  return (
    <>
      <TopBar />
      <main className={styles.page}>
        <span className={styles.glow} aria-hidden="true" />
        <div className={styles.shell}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.sub}>{sub}</p>
          <ul className={styles.chips}>{chips.map((c) => <li key={c}>{c}</li>)}</ul>
          <div className={styles.stack}>{children}</div>
        </div>
        <div className={`home-redesign ${styles.download}`}>
          <HomeDownload light />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
