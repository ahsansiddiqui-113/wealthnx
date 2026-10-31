/*
 * Wealth Genie agent content (/wealth-genie/). Each agent is its own fully written-out object so it can be
 * edited independently. `useCases` icon values are string keys mapped to inline SVGs in GenieTeam.jsx.
 */

export const GENIE_AGENT_ORDER = ["accountant","stock","crypto","build-mode","general"];

export const genieAgents = {
  'accountant': {
    label: 'Accountant Assistant',
    title: 'Accountant Assistant',
    aboutDesc: 'The Accountant Assistant is the AI spending analysis app inside WealthNX. It works from the transactions in your linked accounts and explains where your money went, how your budgets are holding up and what changed since last month.',
    aboutImg: '/assets/genie-accountant-about.webp',
    faq: [
      { q: 'Is the Accountant Assistant an accountant?', a: 'No. It is AI expense analysis for your personal spending, budgets and cash flow. It does not do bookkeeping, taxes or filing.' },
      { q: 'Can AI analyze my bank transactions?', a: 'Yes. The Accountant Assistant is AI that analyzes your bank transactions from linked accounts, by category and merchant. Transfers it identifies between your own accounts are left out of spending totals.' },
      { q: 'Can it set up a budget for me?', a: 'Yes. As an AI budgeting assistant, it can guide you through the steps and create or change a budget inside WealthNX with "Do it for me". Limits by category are set in AI budgeting.' },
      { q: 'Can an AI app explain my spending?', a: 'Yes. Questions such as "Why did I spend more in March?" get an answer built from your categorized transactions, with the categories and merchants behind the change.' },
    ],
    useCases: [
      { icon: 'Trend', title: 'Spending jumped', desc: 'Which categories drove a more expensive month.' },
      { icon: 'GoalProgress', title: 'Budget check-in', desc: 'How much is left in each budget this month.' },
      { icon: 'SpendingBreakdown', title: 'This month against last', desc: 'What changed in your spending, category by category.' },
      { icon: 'CrossAccount', title: 'A store you visit often', desc: 'How much one merchant received this year.' },
      { icon: 'Dashboard', title: 'A new budget', desc: 'Wealth Genie walks through the steps and creates it with "Do it for me".' },
      { icon: 'SpendIncome', title: 'Side income', desc: 'Income and costs tagged to a side gig, added up and explained.' },
    ],
    disclaimer: 'Disclaimer: The Accountant Assistant is AI expense analysis for personal spending. It does not do bookkeeping, taxes or filing, and WealthNX does not provide personalized financial, tax or legal advice.',
  },
  'stock': {
    label: 'Stock Assistant',
    title: 'Stock Assistant',
    aboutDesc: 'The Stock Assistant is AI stock analysis for the companies you own and follow. It explains price moves and earnings in plain words, using your holdings and market data, and points to the news and events that may lie behind a move.',
    aboutImg: '/assets/genie-stock-about.webp',
    faq: [
      { q: 'What is AI stock analysis?', a: 'Using AI to read a company\'s price history, financials, news and technical indicators, and explain them in plain words. In WealthNX, the Stock Assistant does this from market data and your linked holdings.' },
      { q: 'Can the Stock Assistant analyze my portfolio risk?', a: 'It can explain how your holdings are spread across companies and sectors, and what a heavy weight in one stock means. It describes risk factors; it doesn\'t judge whether your portfolio is right for you.' },
      { q: 'How do I get details about a stock I hold?', a: 'By asking about it by name or ticker. The Stock Assistant returns price history, fundamentals, recent news and technical indicators such as RSI and MACD.' },
      { q: 'Does the Stock Assistant give buy or sell signals?', a: 'No. It explains information about stocks, as an AI stock research assistant. WealthNX does not give personalized buy, sell or hold recommendations.' },
    ],
    useCases: [
      { icon: 'PriceMovement', title: 'Why did it move?', desc: 'A stock jumped or dropped, and the reason isn\'t clear.' },
      { icon: 'Earnings', title: 'Before earnings', desc: 'What\'s expected from a company\'s next report.' },
      { icon: 'Portfolio', title: 'One holding in context', desc: 'How a single stock fits the rest of your portfolio.' },
      { icon: 'SectorCompare', title: 'Two companies, side by side', desc: 'Revenue, margins and debt compared in one answer.' },
      { icon: 'Technical', title: 'Reading the chart', desc: 'RSI, MACD and moving averages, explained plainly.' },
      { icon: 'TopInvestor', title: 'What big investors hold', desc: 'Positions large funds reported in their latest 13F filings.' },
    ],
    disclaimer: 'Disclaimer: The Stock Assistant explains information about stocks. WealthNX does not give personalized buy, sell or hold recommendations.',
  },
  'crypto': {
    label: 'Crypto Assistant',
    title: 'Crypto Assistant',
    aboutDesc: 'The Crypto Assistant is an AI crypto assistant for the coins you hold and the ones you\'re watching. It explains price swings, market sentiment and your own crypto holdings, using CoinGecko market data and your linked accounts.',
    aboutImg: '/assets/genie-crypto-about.webp',
    faq: [
      { q: 'What can an AI crypto assistant do?', a: 'Answer questions about crypto prices, trends and your own holdings in everyday language. It explains the market; it does not place trades.' },
      { q: 'Can it analyze my crypto portfolio?', a: 'Yes. AI crypto portfolio analysis covers the value of your coins, how they\'re split and how that changed over time, from the crypto accounts you link or add by hand.' },
      { q: 'Which coins does it cover?', a: 'Crypto assets in CoinGecko\'s coverage, which spans 5M+ assets.' },
      { q: 'Does it tell me which crypto to buy?', a: 'No. It explains price data and sentiment. WealthNX does not give personalized buy, sell or hold recommendations.' },
    ],
    useCases: [
      { icon: 'PriceMovement', title: 'A sudden swing', desc: 'Why a coin rose or fell sharply.' },
      { icon: 'Portfolio', title: 'Your crypto in total', desc: 'What your coins are worth across linked accounts.' },
      { icon: 'Exposure', title: 'Crypto in your net worth', desc: 'What share of everything you track is in crypto.' },
      { icon: 'Technical', title: 'Reading the indicators', desc: 'RSI, MACD and support and resistance levels, explained simply.' },
      { icon: 'Sentiment', title: 'Market mood', desc: 'The sentiment around a coin and what\'s driving it.' },
      { icon: 'Concept', title: 'A coin you\'re curious about', desc: 'What it is and how its price has moved.' },
    ],
    disclaimer: 'Disclaimer: The Crypto Assistant explains price data and sentiment and does not place trades. WealthNX does not give personalized buy, sell or hold recommendations.',
  },
  'build-mode': {
    label: 'Build Mode',
    title: 'Build Mode',
    aboutDesc: 'Build Mode turns a description into a custom finance dashboard. You describe the chart or view you want, by text or voice, and Wealth Genie builds it from your linked account data, laid out around the numbers you care about.',
    aboutImg: '/assets/genie-build-mode-about.webp',
    faq: [
      { q: 'What is a custom finance dashboard?', a: 'A set of charts built around the numbers you choose, instead of a fixed screen. In WealthNX, Build Mode creates one from a plain description.' },
      { q: 'Can I build my own finance dashboard without coding?', a: 'Yes. A request such as "Show my spending by category for the last year" is enough. Build Mode turns it into a chart you can keep.' },
      { q: 'Is WealthNX a personal finance dashboard app?', a: 'Yes. The standard WealthNX dashboard shows net worth, spending and investments, and Build Mode adds custom personal finance dashboard views on top.' },
      { q: 'Where does Build Mode get its numbers?', a: 'From your linked accounts, any accounts or assets you added by hand, and market data for your investments.' },
    ],
    useCases: [
      { icon: 'Trend', title: 'A year of spending', desc: 'Spending by category, month by month, in one chart.' },
      { icon: 'Dashboard', title: 'Net worth over time', desc: 'Assets and debts behind the trend line.' },
      { icon: 'Portfolio', title: 'Stocks and crypto together', desc: 'Both on one view, with their share of the total.' },
      { icon: 'MonthlyReport', title: 'Bills by month', desc: 'Recurring bills laid out across the year.' },
      { icon: 'GoalProgress', title: 'Goal progress', desc: 'Each savings goal and how far along it is.' },
      { icon: 'SpendIncome', title: 'Income against spending', desc: 'The last six months side by side.' },
    ],
    disclaimer: 'Disclaimer: Build Mode shows your own financial data in custom views. Information and explanations only. WealthNX does not provide personalized financial advice.',
  },
  'general': {
    label: 'General Assistant',
    title: 'General Assistant',
    aboutDesc: 'The General Assistant is an AI finance chatbot for money and market questions that aren\'t about one account. It explains terms, ideas and how things work, and needs none of your data to answer.',
    aboutImg: '/assets/genie-general-about.webp',
    faq: [
      { q: 'What is an AI finance chatbot?', a: 'A chat assistant that answers money and market questions in a conversation. The General Assistant covers concepts and how things work.' },
      { q: 'Does the General Assistant use my account data?', a: 'No. It answers general questions without your data. Questions about your own numbers go to the other assistants, which work from your linked accounts.' },
      { q: 'Can I ask AI about my finances here?', a: 'For general questions, yes. To ask AI about your own finances, such as your spending or holdings, the Accountant, Stock and Crypto Assistants use your data.' },
      { q: 'Does it give financial advice?', a: 'No. It explains concepts and general information. WealthNX does not provide personalized financial advice.' },
    ],
    useCases: [
      { icon: 'Concept', title: 'A term you don\'t know', desc: 'What an expense ratio or APR means.' },
      { icon: 'InvestBasics', title: 'How something works', desc: 'Compound interest or a 401(k) match, explained.' },
      { icon: 'Technical', title: 'Market basics', desc: 'What moves interest rates, and why markets react.' },
      { icon: 'SpendIncome', title: 'Side income questions', desc: 'How people usually keep side-gig money apart.' },
      { icon: 'Dashboard', title: 'Budget basics', desc: 'What a monthly budget usually includes.' },
      { icon: 'CrossAccount', title: 'Comparing account types', desc: 'How a Roth IRA differs from a traditional IRA.' },
    ],
    disclaimer: 'Disclaimer: The General Assistant explains concepts and general information. WealthNX does not provide personalized financial advice.',
  },
};
