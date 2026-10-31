// Content for every /compare/<slug>/ page (CompareDetail.jsx). Plain data only: edit text here, not in the layout.
// See docs/COMPARE_PAGES.md. `shared` = identical on every page; `competitors[slug]` = the per-competitor strings.
//
// Conventions
//  - 'TBD'            -> text not supplied / unreadable; renders as a grey "TBD".
//  - { tbd: N }       -> a body paragraph of about N lines still to be supplied; renders as N skeleton lines.
//  - Apparent typos from the design are kept exactly as drawn and marked "(sic)" in comments.

const shared = {
  hero: {
    offer: 'Get 50% Off - Limited Time Offer',
    titleTeal: 'Two All-in-One Ideas.',
    titleBlack: 'Different Areas of Focus.',
    text: 'No single finance app fits everyone. WealthNX brings everyday money, investments, crypto, market insights, and AI together in one smarter financial platform.',
    cta: { label: 'Explore WealthNX', href: '/' }, // href is not in the design: neutral default (home)
    image: '/assets/compare-monarch-hero-new.webp', // stand-in: the same picture on all four pages until per-app art exists
    imageWidth: 1400,
    imageHeight: 1012,
  },
  fitWealthnx: [
    'You want everyday finances and investments together.',
    'Stocks and crypto are an important part of your financial picture.',
    'You want market information closer to your portfolio.',
    'You want specialized AI experiences across everyday finances, stocks and crypto within the same financial platform.',
  ],
  table: {
    title: 'What Each App Puts Front And Center',
    footnote: 'This is not a scorecard. It is a difference in product emphasis.',
    rows: [
      { area: 'Financial tracking', wealthnx: 'Major focus' },
      { area: 'Budgeting', wealthnx: 'Included' },
      { area: 'Net worth', wealthnx: 'Included' },
      { area: 'Goals', wealthnx: 'Included' },
      { area: 'Household collaboration', wealthnx: 'Not a core positioning' },
      { area: 'Investment tracking', wealthnx: 'Major focus' },
      { area: 'AI', wealthnx: 'Specialized Wealth Genie experiences' },
      { area: 'Market information', wealthnx: 'Portfolio + broader stock/crypto market information' },
    ],
  },
  // Card 1 title is generic; its body is per-competitor. Cards 2 and 3 are fully shared.
  cardShared: { key: 'shared', icon: 'hand', title: ['If Your Financial', 'Life Is Shared'] },
  cardsAfter: [
    {
      key: 'markets',
      icon: 'candles',
      title: ['If Your Financial Life', 'Includes Markets'],
      blocks: [
        { p: 'WealthNX takes a different path. Your personal finance dashboard can sit closer to your stock holdings, crypto holdings, broader portfolio, market information, net worth and everyday financial information.' },
        { p: ['That matters if ', { b: '“How much did I spend?”' }, ' is only one of the questions you regularly ask.'] },
      ],
    },
    {
      key: 'genie',
      icon: 'sparkle',
      title: ['Wealth Genie Changes', 'the Experience'],
      blocks: [
        { p: 'Traditional financial dashboards make you find the chart first. Wealth Genie adds another way to explore available information.' },
        { ul: ['Ask supported questions about spending.', 'Ask about cash flow.', 'Ask about your connected portfolio.', 'Explore stock information.', 'Explore crypto information.'] },
        { p: 'The information available to Wealth Genie depends on your connected accounts, available data and the question you ask. It is designed to help explain information - not make financial decisions for you.' },
      ],
    },
  ],
  ask: {
    title: ['Budgeting App Or', 'Broader Financial', 'Information App?'],
    subtitle: 'This is where the comparison gets simpler',
    leftCaption: 'If your ideal app starts with',
    rightCaption: 'If it starts with',
    leftQuestion: 'How should we organize and plan our household money?',
    right: {
      question: 'Can I bring more of my money and investments together and ask questions about what I see?',
      note: 'WealthNX may be the better product to explore ', // small verdict line under the divider (illegible)
    },
  },
  security: {
    title: 'What About Security?',
    text: 'Connecting a financial account should never feel like a vague permission request. WealthNX uses read-only access for supported connected financial information.',
    caption: 'That access cannot be used to:',
    items: ['Transfer money', 'Make purchases', 'Execute trades', 'Change your connected accounts'],
  },
  faq: {
    title: 'Frequently Asked Questions',
    openIndex: 1, // design: the second row is open
    items: [
      { q: 'Can one finance app track both money and investments?', a: 'TBD' },
      {
        q: 'Does WealthNX replace my bank or brokerage?',
        a: 'No. WealthNX does not replace the financial institutions where your accounts are held. It organizes available information from supported connections so that more of your financial picture can be viewed together.',
      },
      { q: 'Is this comparison finanical advice?', a: 'TBD' }, // "finanical" (sic) as drawn
      { q: 'Can one finance app track both money and investments?', a: 'TBD' }, // repeated row as drawn
      { q: 'Is this comparison finanical advice?', a: 'TBD' }, // "finanical" (sic) and repeated as drawn
    ],
  },
};

// Per-competitor strings (the name itself comes from app/compare/comparePages.js).
//   fit         3 bullets for the "<Name> May Fit Your Needs If" box
//   col         8 cell values for the competitor column, same order as shared.table.rows
//   sharedCard  body blocks of the "If Your Financial Life Is Shared" card: { p } | { tbd: lines } | { ul } | { ulTbd }
//   askNote     small verdict line in the left chat card
// Anything omitted falls back to dummyEntry (all TBD).
const dummyEntry = {
  fit: ['TBD', 'TBD', 'TBD'],
  col: Array(8).fill('TBD'),
  sharedCard: [{ tbd: 2 }, { tbd: 3 }, { tbd: 2 }],
  askNote: 'TBD',
};
const competitors = {
  'monarch-money': {
    fit: ['TBD', 'TBD', 'TBD'], // content of the closed box is not visible in the design
    col: [
      'Major focus', 'Major focus', 'Included', 'Major focus', 'Prominent focus',
      'Stocks, funds, retirement accounts, ETFs, crypto & more',
      'AI Assistant, AI Insights and recap features',
      'Investment insights and tracking',
    ],
    sharedCard: [
      { p: 'Monarch has a clear advantage for one particular use case: collaboration.' },
      { p: 'Its product specifically supports bringing separate and joint finances into a shared household view and working with a partner, advisor or other professional.' },
      { p: 'If that is the reason you are searching for a money management app, it deserves serious consideration. WealthNX should not pretend otherwise.' },
    ],
    askNote: 'Monarch may fit naturally', // illegible in the design
  },
  // DUMMY entries: the owner has not supplied copy yet. Every competitor-specific value is TBD; no claims are made.
  // Replace the TBDs (see docs/COMPARE_PAGES.md), then delete `dummy: true`.
  'rocket-money': { dummy: true },
  ynab: { dummy: true },
  'copilot-money': { dummy: true },
};

/** Full page data for one competitor: shared copy + that competitor's strings, in the shape CompareDetail renders. */
export function getCompareDetail(slug, name) {
  const c = { ...dummyEntry, ...competitors[slug] };
  const s = shared;
  return {
    hero: s.hero,
    fitBoxes: [
      { id: 'other', title: `${name} May Fit Your Needs If`, open: false, bullets: c.fit },
      { id: 'wealthnx', title: 'WealthNX May Fit Your Needs If', open: true, bullets: s.fitWealthnx },
    ],
    table: {
      title: s.table.title,
      footnote: s.table.footnote,
      columns: { area: 'Area', other: name, wealthnx: 'WealthNX' },
      rows: s.table.rows.map((r, i) => ({ area: r.area, other: c.col[i], wealthnx: r.wealthnx })),
    },
    cards: [{ ...s.cardShared, blocks: c.sharedCard }, ...s.cardsAfter],
    ask: { ...s.ask, left: { question: s.ask.leftQuestion, note: c.askNote }, right: s.ask.right },
    security: s.security,
    faq: s.faq,
    metadata: { title: `${name} vs WealthNX`, description: s.hero.text },
  };
}
