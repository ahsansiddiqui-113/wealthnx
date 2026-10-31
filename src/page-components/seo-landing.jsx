import Link from 'next/link';
import TopBar from '@/app/components/TopBar';
import PageContainer from '@/app/components/PageContainer';
import Footer from '@/app/components/Footer';

const CTA = ({ children, href = 'https://app.wealthnx.ai/signup' }) => (
  <a className="seo-landing-cta" href={href}>{children}</a>
);

const pages = {
  netWorth: {
    eyebrow: 'Net Worth Tracker',
    title: 'Net Worth Tracker for All Your Accounts',
    intro: 'See connected assets and liabilities together, track your net worth over time, and understand what changed from one clear dashboard.',
    cta: 'Track My Net Worth',
    sections: [
      ['See your net worth in one clear view.', 'Bring connected account balances together so you can see the relationship between what you own, what you owe and your overall net worth.'],
      ['How your net worth is calculated', 'Net worth is the value of your tracked assets minus your tracked liabilities. WealthNX organizes the balances available from your connected accounts so the total is easier to review in one place.'],
      ['Track changes over time', 'Use net worth history to compare periods and see which account balances contributed to the change. WealthNX shows historical movement without predicting what will happen next.'],
      ['Connected accounts, one dashboard', 'Review supported bank, card, loan and other connected account balances from one dashboard.'],
      ['Read-only by design', 'Connected financial data is used for tracking and display. WealthNX does not move funds, place trades or make financial decisions for you.'],
    ],
  },
  cashFlow: {
    eyebrow: 'Cash Flow Tracker', title: 'Cash Flow Tracker for Income and Expenses',
    intro: 'See money in, money out and month-to-month changes across your connected accounts without piecing together separate statements.',
    cta: 'See My Cash Flow', sections: [
      ['Know what came in and what went out.', 'WealthNX organizes connected transactions so you can review income and expenses together and see the shape of your cash flow for the selected period.'],
      ['See spending by category', 'Review categorized transactions and compare where spending appeared across the accounts you connected. Category quality depends on the underlying transaction data and any edits you make.'],
      ['Compare month to month', 'Use historical comparisons to see whether income, expenses or category totals changed from one period to another. WealthNX reports what changed; it does not predict future cash flow.'],
      ['Ask Wealth Genie about a change', 'Ask questions such as “Which categories increased this month?” or “Summarize the biggest changes in my cash flow.” Responses explain available data and are not personalized financial advice.'],
    ],
  },
  recurring: {
    eyebrow: 'Recurring Expense Tracker', title: 'Recurring Expense Tracker for Subscriptions and Bills',
    intro: 'See recurring charges across connected accounts in one organized view, with payment timing and monthly changes that are easier to review.',
    cta: 'Find My Recurring Expenses', sections: [
      ['Everything recurring, one list', 'WealthNX groups detected recurring transactions so you can review subscriptions, bills and other repeating charges without searching account by account.'],
      ['See what is coming up', 'Use the recurring calendar to review expected payment dates based on detected transaction patterns. Dates can change depending on the merchant and posting schedule.'],
      ['Spot changes in recurring charges', 'Compare recurring amounts over time and surface increases or changes that may deserve a closer look.'],
      ['Review before you decide', 'WealthNX helps you identify and review recurring charges. It does not cancel subscriptions or negotiate bills unless those features are explicitly available and disclosed.'],
    ],
  },
};

export function SeoLandingPage({ type }) {
  const page = pages[type];
  return <><TopBar /><PageContainer className="seo-landing-page">
    <div className="seo-promo">Founding Member Offer - 50% off your first year. <a href="https://app.wealthnx.ai/signup">Start free for 7 days →</a></div>
    <main>
      <section className="seo-landing-hero"><p className="seo-eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.intro}</p><div className="seo-landing-actions"><CTA>{page.cta}</CTA><Link href="/how-it-works/">See How It Works</Link></div></section>
      <section className="seo-landing-grid">{page.sections.map(([heading, body]) => <article key={heading}><h2>{heading}</h2><p>{body}</p></article>)}</section>
      <section className="seo-disclaimer"><strong>Read-only access</strong><p>Connected account access is read-only. WealthNX cannot move money or place trades through connected accounts. Values reflect the latest data available from connected sources and may not update at the same time across every account.</p></section>
      <section className="seo-final-cta"><h2>Your financial clarity starts here.</h2><p>Connect your accounts, track your financial picture and ask WealthNX questions about the data you already have.</p><CTA>Start 7-Day Free Trial</CTA></section>
    </main><Footer />
  </PageContainer></>;
}

export function SignupPage() { return <><TopBar /><PageContainer className="seo-landing-page"><main className="seo-landing-hero seo-auth-page"><p className="seo-eyebrow">WealthNX signup</p><h1>Start Your 7-Day Free Trial</h1><p>Create your WealthNX account, connect supported accounts with read-only access, and see your financial picture in one place.</p><div className="seo-auth-options"><a className="seo-landing-cta" href="https://app.wealthnx.ai/signup">Continue with Google</a><a className="seo-landing-secondary" href="https://app.wealthnx.ai/signup">Continue with email</a></div><p className="seo-trust">Read-only connections • No trading • Privacy-first</p><p>Already have an account? <a href="https://app.wealthnx.ai/login">Log in</a></p></main><Footer /></PageContainer></> }

export function DownloadPage() { return <><TopBar /><PageContainer className="seo-landing-page"><main><section className="seo-landing-hero"><p className="seo-eyebrow">Download WealthNX</p><h1>Download WealthNX for iPhone, Android and Web</h1><p>Use WealthNX on the device that fits your workflow and keep your connected financial view available wherever you review it.</p></section><section className="seo-download-grid"><article><h2>Web</h2><p>Open WealthNX in your browser - no app download required.</p><CTA href="https://app.wealthnx.ai/login">Open WealthNX</CTA></article><article><h2>iPhone</h2><p>Download WealthNX from the Apple App Store.</p><a href="https://apps.apple.com/us/app/wealthnx-ai/id6753972698" className="seo-landing-secondary">Download on the App Store</a></article><article><h2>Android</h2><p>Download WealthNX from Google Play.</p><a href="https://play.google.com/store/apps/details?id=com.inexor.wealthnx.ai&pcampaignid=web_share" className="seo-landing-secondary">Get it on Google Play</a></article></section></main><Footer /></PageContainer></> }
