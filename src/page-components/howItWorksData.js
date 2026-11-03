/* Store link used by the page CTAs (same as APPLE_STORE_URL in app/components/useStoreUrl; duplicated here because this page is a server component). */
export const SIGNUP_URL = 'https://wealthnx.ai/get';

/* Hero copy */
export const hero = {
  title: ['One Simple Setup To Better', 'Understand Your Wealth'],
  text: [
    "You connect your bank, brokerage and crypto accounts through Plaid's read-only",
    'sign-in or manually. WealthNX then turns that scattered financial data into clear',
    'insights, so you understand your money and can plan with more confidence.',
  ],
};

/**
 * Copy for the five "How it works" steps. `body` may contain a bold run via `{ bold }`.
 * `art`: padded design art (crop + 80css px of blended glow on every side) in public/assets/hiw2-stepN.webp.
 * `crop`: where the unpadded crop sits on the 1920 design (css px: x from page left, y from the row top).
 * `top`: offset of the text block from the row top (design px).
 */
export const steps = [
  {
    id: 'connect',
    title: 'Connect Your Accounts',
    lead: ['Bank, brokerage and crypto', 'accounts, linked through Plaid'],
    body: [
      'Connect supported checking, savings, credit card, loan, brokerage and crypto accounts through Plaid, which supports ',
      { bold: '12,000+ financial institutions' },
    ],
    bullets: [],
    art: { src: '/assets/hiw2-step1.webp', w: 1620, h: 1470, x: 1000, y: 13, alt: 'WealthNX at the centre of an orbit of bank and brokerage logos, with a Connect Securely button and "and many more" below' },
    top: 192,
  },
  {
    id: 'overview',
    title: 'See the Big Picture',
    lead: ['Where you stand, on one screen'],
    body: ["Net worth, income, spending, debts and investments appear in one place, so there's no switching between bank and brokerage apps."],
    bullets: [
      'Net worth changes, based on your latest available financial data',
      'Spending sorted into categories automatically',
      'Trends in your spending and net worth over time',
    ],
    art: { src: '/assets/hiw2-step2.webp', w: 1460, h: 1060, x: 260, y: 101, alt: 'Your Financial Overview card: $11,815.15 net worth with a rising chart and balances for cash, investments, credit cards, loans and other assets' },
    top: 152,
  },
  {
    id: 'insights',
    title: 'Get AI-Powered Insights',
    lead: ['Wealth Genie explains your numbers in plain words'],
    body: ['Wealth Genie answers questions about your own accounts, using your data and market data. AI Insights give timely information about upcoming bills, spending patterns and budgets, based on available financial data.'],
    bullets: [
      'Categories where spending is higher than usual',
      'Upcoming bills and recurring charges',
      'Answers by text or by voice',
    ],
    art: { src: '/assets/hiw2-step3.webp', w: 1280, h: 1170, x: 1090, y: 114, alt: 'Wealth Genie panel showing three insights: dining spend up 40%, 3 recurring subscriptions and consistent investment contributions' },
    top: 148,
  },
  {
    id: 'future',
    title: 'Explore Your Future',
    lead: ['Estimates for the years ahead'],
    body: ['Forecasting estimates your future balances and net worth from your income, spending and the assumptions you set. Changing an input shows how the estimate moves.'],
    bullets: [
      'Projected net worth and retirement savings',
      'Scenarios such as buying a home or retiring earlier',
      'The assumptions behind each estimate, shown with it',
    ],
    note: 'Compare different assumptions and see how they affect your projection.',
    art: { src: '/assets/hiw2-step4-v3.webp', w: 1687, h: 1174, x: 314, y: 172, pad: 172, alt: 'Projected Net Worth chart comparing higher monthly contribution, current assumptions and lower return scenarios' },
    top: 116,
  },
  {
    id: 'control',
    title: 'Stay in Control',
    lead: ['Your goals and your progress'],
    body: ['Savings goals show your progress as your linked balances update. Wealth Genie can explain the calculations behind a goal, and what to do next stays your decision.'],
    bullets: [
      'Savings goals with target amounts',
      'Progress based on your latest available balances',
    ],
    button: { label: 'Start Your 7-Day Free Trial', arrow: true },
    art: { src: '/assets/hiw2-step5.webp', w: 1430, h: 1010, x: 1075, y: 140, alt: 'Explore Scenarios panel with three scenario cards: monthly contribution, emergency savings and withholding' },
    top: 152,
  },
];
