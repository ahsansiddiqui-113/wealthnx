/* /features carousel copy: slide title, description and CTA per feature, in the order of the content document.
   A slug that is not listed keeps its auto-built slide ("Learn more") and sorts after the listed ones; slugs in HIDDEN_SLIDES have no slide. */
export const CAROUSEL_COPY = {
  // Wealth Genie AI
  accountant: { name: 'Accountant Assistant', description: 'Wealth Genie explains why spending went up, with the categories and stores behind the change.', cta: 'Meet the Spending Assistant' },
  'ai-insights': { name: 'AI Insights', description: 'Timely information about upcoming bills, spending patterns and budgets, based on available financial data.', cta: 'See AI insights' },
  stocks: { name: 'Stock Assistant', description: 'Questions about a stock get plain answers on its price trend, earnings and key ratios.', cta: 'Meet the Stock Assistant' },
  crypto: { name: 'Crypto Assistant', description: 'Answers about the coins you hold or follow, based on CoinGecko market data.', cta: 'Meet the Crypto Assistant' },
  'build-mode': { name: 'Build Mode', description: 'Wealth Genie builds the chart or view you describe, using your own account data.', cta: 'See Build Mode' },
  'voice-to-voice': { name: 'Voice To Voice', description: 'You can ask Wealth Genie out loud and hear the answer back.', cta: 'Speak to Wealth Genie' },
  // Money
  'net-worth': { name: 'Net Worth', description: 'An estimated net worth from your linked balances and manual entries, tracked over time.', cta: 'Track your net worth' },
  'multi-assets': { name: 'Assets', description: 'Home, car and other assets count toward net worth, with home value estimates from ATTOM.', cta: 'Track your assets' },
  'cash-flow': { name: 'Cash Flow', description: 'Money in and money out each month, with identified transfers between your own accounts left out.', cta: 'Track your cash flow' },
  transactions: { name: 'Transactions', description: 'Purchases from your connected accounts show in one list, sorted into categories.', cta: 'See Transactions' },
  'spending-by-merchant': { name: 'Merchants', description: 'The stores and services that take the most of your money, month by month.', cta: 'Explore merchants' },
  'business-expense-tracking': { name: 'Business', description: 'Side income and its spending get their own group, apart from personal money.', cta: 'Track Your Business' },
  members: { name: 'Members', description: 'Share selected accounts, budgets and goals with partners or family members, based on the sharing permissions you choose. Each member uses their own login.', cta: 'Set up a shared budget' },
  budgeting: { name: 'Budgets', description: 'Budgets start from your real spending and show what’s left in each category.', cta: 'See budgeting' },
  bills: { name: 'Bills', description: 'Upcoming bills on one calendar, with a reminder before each due date.', cta: 'See bill tracking' },
  'subscription-tracker': { name: 'Subscriptions', description: 'Recurring charges in one place, with merchant cancellation links where available.', cta: 'Track your subscriptions' },
  goals: { name: 'Goals', description: 'Progress toward a trip, emergency fund or other goal, based on your account balances.', cta: 'Track Goals' },
  'financial-forecasting': { name: 'Forecasting', description: 'Explore estimates of how your finances may change over time, based on available financial information and selected assumptions. Projections are estimates, not guarantees.', cta: 'See Forecasting' },
  'savings-rate-calculator': { name: 'Savings Rate', description: 'The share of your income you save each month, calculated for you.', cta: 'Check your savings rate' },
  'financial-health-score': { name: 'Financial Health Score', description: 'An informational overview of your financial health, based on available connected account data and the factors used in WealthNX’s scoring methodology.', cta: 'See financial health score' },
  'compare-spending': { name: 'Period Comparison', description: 'Spending by category for two periods, with each difference in dollars and percent.', cta: 'Compare your spending' },
  // Portfolio
  portfolio: { name: 'Portfolio', description: 'Stocks, ETFs, crypto and 401(k) or IRA accounts together in one portfolio view.', cta: 'See portfolio tracking' },
  'portfolio-performance-tracker': { name: 'Gains and Losses', description: 'Unrealized gains and losses for each current holding and for your whole portfolio.', cta: 'Track portfolio performance' },
  'portfolio-exposure-analysis': { name: 'Exposure', description: 'How much of your portfolio is in each sector, asset type and holding.', cta: 'Check your portfolio exposure' },
  'dividend-tracker': { name: 'Dividends', description: 'Dividend income across linked brokerages, with upcoming payments marked as estimated.', cta: 'Track dividend income' },
  'portfolio-benchmark-comparison': { name: 'Benchmarks', description: 'Your portfolio’s returns next to the S&P 500 and a Nasdaq benchmark.', cta: 'Compare your portfolio to the S&P 500' },
  'investment-decision-analysis': { name: 'Decision Analysis', description: 'Scores how each current holding has performed since entry, compared with a benchmark.', cta: 'Explore Decision Analysis' },
  // Markets
  'stock-watchlist': { name: 'Watchlist', description: 'Stocks and crypto you want to follow, in one list with the market prices.', cta: 'Build a watchlist' },
  'earnings-calendar': { name: 'Earnings Calendar', description: 'Upcoming earnings dates for the stocks you own and the ones you watch.', cta: 'See your earnings calendar' },
  'insider-trading-data': { name: 'Insider Trades', description: 'Insider buys and sells from SEC Form 4 filings, for the stocks you follow.', cta: 'Track insider trades' },
  'stock-news-sentiment': { name: 'News Sentiment', description: 'Market news from Benzinga and Nasdaq, with a sentiment score for the stocks you follow.', cta: 'See stock news sentiment' },
  'celebrity-portfolio-tracking': { name: 'Celebrities Portfolio Tracking', description: 'Publicly disclosed investment holdings and transactions from regulatory filings, subject to reporting delays.', cta: 'See famous investor portfolios' },
};

/* Not in the content document: no carousel slide (the page itself stays up). */
export const HIDDEN_SLIDES = ['markets'];
