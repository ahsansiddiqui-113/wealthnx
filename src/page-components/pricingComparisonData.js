// Core vs Plus comparison matrix for /pricing/.
// core / plus values were read from the supplied design mockup: true = check, false = cross, 'Partial' = the word "Partial".
// Row labels were read from the design mockup and written out as clean feature names.

export const comparisonCategories = [
  {
    title: 'Account aggregation & data',
    rows: [
      { label: 'Automated bank & brokerage account linking', core: true, plus: true },
      { label: 'Manual entry for assets with no live data feed', core: true, plus: true },
      { label: 'Manual transaction entry', core: true, plus: true },
      { label: 'Multi-currency & multi-country consolidation', core: false, plus: true },
      { label: 'Tag support for transactions', core: true, plus: true },
      { label: 'Read-only account connections', core: true, plus: true },
    ],
  },
  {
    title: 'Budgeting & cash flow',
    rows: [
      { label: 'Category-based budgeting', core: true, plus: true },
      { label: 'Recurring bill & subscription detection', core: true, plus: true },
      { label: 'Receipt scanning', core: true, plus: true },
      { label: 'Custom spending & budget reports', core: true, plus: true },
    ],
  },
  {
    title: 'Net worth, debt & credit',
    rows: [
      { label: 'Net worth dashboard', core: true, plus: true },
      { label: 'Credit score monitoring', core: true, plus: true },
      { label: 'Debt payoff calculator & payoff tracking', core: true, plus: true },
    ],
  },
  {
    title: 'Investing & portfolio',
    rows: [
      { label: 'Brokerage & retirement holdings with current values', core: true, plus: true },
      { label: 'Investment performance analytics (returns & benchmarking)', core: false, plus: true },
      { label: 'Cryptocurrency tracking (wallets & exchanges)', core: true, plus: true },
      { label: 'Real estate & property valuation tracking', core: true, plus: true },
      { label: 'Alternative assets (collectibles, private equity, vehicles)', core: true, plus: true },
      { label: 'Equity compensation & stock options tracking', core: true, plus: true },
      { label: 'Dividend tracker', core: false, plus: true },
      { label: 'Portfolio diversification & exposure analysis', core: false, plus: true },
      { label: 'Portfolio benchmarking', core: false, plus: true },
      { label: 'Investment fee & cost analysis', core: false, plus: true },
      { label: 'Realized & unrealized gains and cost basis reporting', core: false, plus: true },
      { label: 'Insider transaction monitoring', core: true, plus: true },
      { label: 'News & sentiment', core: true, plus: true },
      { label: 'Watchlist to follow assets', core: false, plus: true },
      { label: 'Earnings calendar', core: true, plus: true },
      { label: 'Celebrity portfolio tracking', core: false, plus: true },
      { label: 'Custom price alerts', core: false, plus: true },
    ],
  },
  {
    title: 'AI & automation',
    rows: [
      { label: 'AI-driven transaction categorization', core: 'Partial', plus: 'Partial' },
      { label: 'AI chat assistant for financial Q&A', core: true, plus: true },
      { label: 'AI Build Mode', core: true, plus: true },
      { label: 'AI Crypto Assistant', core: false, plus: true },
      { label: 'AI Stock Assistant', core: false, plus: true },
      { label: 'Voice-to-voice for the whole app and your financial data', core: true, plus: true },
      { label: 'Voice-to-action for goal planning and budgeting', core: false, plus: true },
    ],
  },
  {
    title: 'Planning & advice',
    rows: [
      { label: 'Retirement & scenario forecasting tool', core: false, plus: true },
      { label: 'Goal planning', core: true, plus: true },
      { label: 'Invite your own outside advisor or accountant as a guest', core: true, plus: true },
      { label: 'Tax tools for individual income tax', core: false, plus: true },
      { label: 'Cancel subscriptions within the app', core: true, plus: true },
      { label: 'Reports section', core: true, plus: true },
    ],
  },
  {
    title: 'Collaboration',
    rows: [
      { label: 'Couples & household dashboard under one subscription, no per-person fee', core: true, plus: true },
      { label: 'Family sharing for more than 2 people', core: true, plus: true },
      { label: 'Multi-asset tracking & valuation', core: true, plus: true },
    ],
  },
  {
    title: 'Platform & access',
    rows: [
      { label: 'Native iOS app', core: true, plus: true },
      { label: 'Native Android app', core: true, plus: true },
      { label: 'Full-featured web app', core: true, plus: true },
      { label: 'Direct CSV import tool (including Mint exports)', core: true, plus: true },
    ],
  },
  {
    title: 'Privacy, trust & security',
    rows: [
      { label: 'We never sell your financial data', core: true, plus: true },
    ],
  },
];
