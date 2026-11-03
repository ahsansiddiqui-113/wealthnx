import { comparePages, comparePageHref } from '@/app/compare/comparePages';

const byName = Object.fromEntries(comparePages.map((p) => [p.name, p]));

export const heroPills = [
  { key: 'ynab', brand: byName['YNAB'] },
  { key: 'copilot', brand: byName['Copilot Money'] },
  { key: 'monarch', brand: byName['Monarch Money'] },
  { key: 'wealthnx', brand: null },
  { key: 'rocket', brand: byName['Rocket Money'] },
];

/* Copy for /comparison/ (supplied; plain data only: edit text here, not in the layout). */
export const hero = {
  title: ['Find the Finance App That ', 'Fits How You Use Money'],
  text: 'Not every finance app fits everyone. YNAB, Monarch, Rocket Money, Copilot and WealthNX each do something different. The right app is the one that handles your everyday money needs. See which one fits you.',
};

export const quick = {
  title: 'Which Finance App Fits Your Main Goal? Match Your Priority to the Right App',
  subtitle: 'Many apps share the same features. What differs is the job each app is built to do first.',
  priorityTitle: 'If your main priority is...',
  priorities: [
    'A hands-on, every-dollar budget',
    'Help with subscriptions and bills',
    'Budgeting together as a household',
    'Automated tracking on Apple devices',
    'Money, investments, crypto, market research and AI',
  ],
  startTitle: 'Start by comparing...',
  starts: [
    { label: 'YNAB', href: comparePageHref('ynab'), brand: byName['YNAB'] },
    { label: 'Rocket Money', href: comparePageHref('rocket-money'), brand: byName['Rocket Money'] },
    { label: 'Monarch Money', href: comparePageHref('monarch-money'), brand: byName['Monarch Money'] },
    { label: 'Copilot Money', href: comparePageHref('copilot-money'), brand: byName['Copilot Money'] },
    { label: 'WealthNX' },
  ],
};

const standUpCopy = {
  'monarch-money': 'Monarch Money brings accounts, flexible budgets, investments, goals and an AI Assistant into one view, with household logins at no extra cost. WealthNX covers spending, bills and net worth too, and adds stock research and Wealth Genie assistants on the Plus plan.',
  'rocket-money': 'Rocket Money finds subscriptions, offers a team that cancels them for Premium members, negotiates bills on Premium+ and shows your credit score. WealthNX identifies recurring charges in your linked accounts and tracks investments and crypto in the same app.',
  ynab: 'YNAB is built on one method: give every dollar a job before you spend it, with one subscription shared by up to six people. WealthNX offers budgets as one part of a wider view that adds stocks, crypto, home value and market research.',
  'copilot-money': 'Copilot Money runs on iPhone, iPad, Mac and the web, with AI that sorts transactions and a Money Assistant that suggests changes. WealthNX also runs on Android and adds earnings dates, insider trades from SEC filings and Wealth Genie assistants for stocks and crypto.',
};

export const standUp = {
  title: ['How ', 'WealthNX', ' Stands Up'],
  rows: ['monarch-money', 'rocket-money', 'ynab', 'copilot-money'].map((slug) => ({
    slug,
    brand: comparePages.find((p) => p.slug === slug),
    href: comparePageHref(slug),
    description: standUpCopy[slug],
  })),
};

export const compareTopics = {
  title: ['What Should You Compare in a ', 'Personal Finance App?'],
  cards: [
    { key: 'everyday', title: 'Everyday Money', items: ['Spending by category', 'Cash flow each month', 'A budget style that fits', 'Net worth in one number'] },
    { key: 'recurring', title: 'Recurring Charges', items: ['Subscription detection', 'Bill due dates', 'Price increase alerts', 'Cancellation help'] },
    { key: 'invest', title: 'Investments', items: ['Stocks and ETFs', 'Crypto in the same view', '401(k) and IRA accounts', 'Gains, losses and benchmarks'] },
    { key: 'ai', title: 'AI & Insights', items: ['Answers from your own data', 'Questions by voice', 'Stock and market research', 'Net worth projections'] },
  ],
};

export const faqTitle = 'What People Ask Before Switching Apps';

export const faqs = [
  {
    q: 'Which personal finance app is best for me?',
    a: 'It depends on the job you need done first. YNAB centers on hands-on budgeting, Rocket Money on subscriptions and bills, Monarch Money on household budgets, and Copilot Money on automated tracking. WealthNX brings everyday money, investments, crypto and market research into one app.',
  },
  {
    q: 'Can one app track both everyday money and investments?',
    a: 'Yes. WealthNX shows spending, bills and budgets next to stocks, ETFs, crypto and retirement accounts from 12,000+ institutions through Plaid. Your net worth combines the latest available balances, and Wealth Genie can explain what changed.',
  },
  {
    q: 'Can WealthNX cancel subscriptions like Rocket Money?',
    a: 'No. WealthNX identifies recurring charges in your linked accounts, helping you keep track of subscriptions and other regular payments. Any cancellations must be completed directly with the merchant.',
  },
  {
    q: 'Does WealthNX replace my bank or brokerage?',
    a: 'No. Your accounts stay with your bank and brokerage. WealthNX connects with read-only access through Plaid, so it can show your balances and transactions but cannot move money.',
  },
  {
    q: 'Is this comparison financial advice?',
    a: 'No. This page compares features each company describes on its own website as of November 2026. Features and prices change, so check each app’s site before you choose.',
  },
];

export const download = {
  title: ['Your Money and Investments,', 'Finally in ', 'One App'],
  text: 'Connect your accounts, see your net worth, research stocks and crypto, and get simple answers about your money from Wealth Genie.',
};
