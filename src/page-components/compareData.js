import { comparePages, comparePageHref } from '@/app/compare/comparePages';

const byName = Object.fromEntries(comparePages.map((p) => [p.name, p]));

export const heroPills = [
  { key: 'ynab', brand: byName['YNAB'] },
  { key: 'copilot', brand: byName['Copilot Money'] },
  { key: 'monarch', brand: byName['Monarch Money'] },
  { key: 'wealthnx', brand: null },
  { key: 'rocket', brand: byName['Rocket Money'] },
];

export const quick = {
  title: 'The Quick Comparison',
  subtitle: 'A feature may exist in more than one app. The difference is often where each product puts its focus.',
  priorityTitle: 'If your main priority is…',
  priorities: [
    'Structured, active budgeting',
    'Subscriptions and bill management',
    'Budgeting, goals and household collaboration',
    'Modern personal finance tracking',
    'Money + investments + crypto + market information + AI',
  ],
  startTitle: 'Starting by comparing…',
  starts: [
    { label: 'YNAB', href: comparePageHref('ynab'), brand: byName['YNAB'] },
    { label: 'Rocket Money', href: comparePageHref('rocket-money'), brand: byName['Rocket Money'] },
    { label: 'Monarch Money', href: comparePageHref('monarch-money'), brand: byName['Monarch Money'] },
    { label: 'Copilot Money', href: comparePageHref('copilot-money'), brand: byName['Copilot Money'] },
    { label: 'WealthNX', badge: 'RECOMMENDED' },
  ],
};

// TODO(user): the row descriptions in the mockup are illegible at 579px wide (about 3px text).
// Supply approved, factual comparison copy for each competitor; nothing is invented here.
export const TBD_COPY = 'TBD – supply approved comparison copy';

export const standUp = {
  title: ['How ', 'WealthNX', ' Stand Up'], // sic: transcribed from the mockup ("Stand"); possible typo for "Stands"
  rows: ['monarch-money', 'rocket-money', 'ynab', 'copilot-money'].map((slug) => ({
    slug,
    brand: comparePages.find((p) => p.slug === slug),
    href: comparePageHref(slug),
    description: TBD_COPY, // TODO(user): approved comparison copy for this row
  })),
};

export const compareTopics = {
  title: ['What Should You Compare in a ', 'Money Financial App?'],
  cards: [
    { key: 'everyday', title: 'Everyday Money', items: ['Transaction tracking', 'Cash-flow visibility', 'Envelope or zero-based budgets', 'Net worth tracking'] },
    { key: 'recurring', title: 'Recurring Money', items: ['Active subscriptions found', 'Bill negotiation triggers', 'Calendar scheduling', 'Autopay tracking'] },
    { key: 'invest', title: 'Investments', items: ['Multi-brokerage sync', 'Crypto wallet tracking', 'Asset allocation metrics', 'Real-time stock prices'] },
    { key: 'ai', title: 'Information & AI', items: ['Interactive query assistance', 'Automated tag classification', 'Custom notifications', 'Portfolio forecasting'] },
  ],
};

// The mockup repeats two questions; this is the de-duplicated set. All start collapsed.
export const faqs = [
  {
    q: 'Can one finance app track both money and investments?',
    // drafted (not in mockup)
    a: 'Some apps focus mainly on everyday money, such as budgets, bills and subscriptions, while others focus on investments. WealthNX is built to bring everyday money, investments and crypto into one view, so it is worth checking which of these areas matters most to you when you compare apps.',
  },
  {
    q: 'Does WealthNX replace my bank or brokerage?',
    // from the mockup
    a: 'No. WealthNX does not replace the financial institutions where your accounts are held. It organizes available information from supported connections so that more of your financial picture can be viewed together.',
  },
  {
    q: 'Is this comparison financial advice?',
    // drafted (not in mockup)
    a: 'No. This page is for general information only and is not financial, investment or tax advice. Features and pricing can change, so please check each provider’s own website before you decide.',
  },
  {
    q: 'How do I choose between finance apps?',
    // drafted question and answer (not in mockup)
    a: 'Start with what you want the app to do most, such as budgeting, tracking bills, following investments or seeing everything in one place. Then compare how each app handles that area, which accounts it supports and how it is priced.',
  },
];
