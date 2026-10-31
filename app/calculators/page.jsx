import TopBar from '@/app/components/TopBar';
import SiteFooter from '@/app/components/SiteFooter';
import HomeDownload from '@/src/page-components/HomeDownload';
import '@/src/page-components/HomeDownload.css';
import styles from './calculators.module.css';

export const metadata = {
  title: 'Financial Calculators - Health Score, 401(k), FIRE & Mortgage | WealthNX',
  description: 'Free financial calculators from WealthNX: Financial Health Score, Savings Goal, 401(k), FIRE and Mortgage calculators.',
  alternates: {
    canonical: 'https://www.wealthnx.ai/calculators/',
  },
};

const icon = (d) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);

const calculators = [
  {
    slug: 'financial-health-score',
    name: 'Financial Health Score',
    desc: 'Six taps, no submit button — get a live score, grade, and per-area breakdown instantly.',
    icon: icon(<><path d="M4.5 18a8.5 8.5 0 1 1 15 0" /><path d="M12 18l4-5" /><circle cx="12" cy="18" r="1.2" /><path d="M7 9.5l.9.9M12 6.5v1.3M17 9.5l-.9.9" /></>),
  },
  {
    slug: 'savings-goal-calculator',
    name: 'Savings Goal',
    desc: 'See how long a goal takes — projected balance, deposits versus growth, and the monthly amount you would need.',
    icon: icon(<><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v4h4" /><path d="M12.5 10v7M14.3 11.3c-.4-.5-1.1-.8-1.8-.8-1 0-1.8.5-1.8 1.3 0 1.9 3.6.9 3.6 2.8 0 .8-.8 1.4-1.8 1.4-.8 0-1.5-.3-1.9-.9" /></>),
  },
  {
    slug: '401k-calculator',
    name: '401(k) Calculator',
    desc: 'Project your retirement balance from contributions, employer match, and growth.',
    icon: icon(<><path d="M4 20h16" /><path d="M6 20v-5M11 20v-8M16 20v-11" /><path d="M5 9l5-4 3 2 5-4" /><path d="M14.5 3H18v3.5" /></>),
  },
  {
    slug: 'fire-calculator',
    name: 'FIRE Calculator',
    desc: 'Your FIRE number, years to get there, Coast FIRE, and Lean/Fat presets — in one tool.',
    icon: icon(<><path d="M12 2.5c.6 3.2-3.5 4.6-3.5 8.6 0 .9.3 1.7.8 2.3-.1-1.6.7-2.5 1.6-3.2.1 1.6 1.3 2.2 1.9 3.3.4.7.4 1.5.1 2.2" /><path d="M12 2.5c3.4 2.4 6 5.4 6 9.7a6 6 0 0 1-12 0" /><path d="M12 21.5c-1.7 0-3-1.2-3-2.8 0-1.8 1.8-2.4 3-4 1.2 1.6 3 2.2 3 4 0 1.6-1.3 2.8-3 2.8Z" /></>),
  },
  {
    slug: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    desc: 'Your full monthly payment (principal, interest, taxes, insurance, HOA) — plus an optional extra-payment payoff comparison, no second tool needed.',
    wide: true,
    icon: icon(<><path d="M3.5 11.5 12 4l8.5 7.5" /><path d="M5.5 10v10h13V10" /><path d="M10 20v-6h4v6" /></>),
  },
].map((c, i) => ({
  ...c,
  tint: ['#eaf4e4', '#e4f4f1', '#f8f6dc', '#f8e5e4', '#e3eef9'][i],
  href: `/calculators/${c.slug}/`,
}));

export default function CalculatorsPage() {
  return (
    <>
      <TopBar />
      <main className={styles.page}>
        <span className={styles.glow} aria-hidden="true" />
        <div className={styles.shell}>
          <h1 className={styles.title}>Financial Calculators</h1>
          <p className={styles.desc}>Five focused tools, each its own page — pick the one you need.</p>

          <div className={styles.grid}>
            {calculators.map((c) => (
              <a
                key={c.slug}
                className={`${styles.card} ${c.wide ? styles.wide : ''}`.trim()}
                href={c.href}
                style={{ '--tint': c.tint }}
              >
                <span className={styles.icon}>{c.icon}</span>
                <span className={styles.name}>{c.name}</span>
                <span className={styles.cardDesc}>{c.desc}</span>
                <span className={styles.cta}>
                  Open Calculator
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                </span>
              </a>
            ))}
          </div>
        </div>
        <div className={`home-redesign ${styles.download}`}>
          <HomeDownload light />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
