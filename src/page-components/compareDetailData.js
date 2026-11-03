// Content for the /comparison/wealthnx-vs-<app>/ pages (CompareDetail.jsx). Plain data only: edit text here, not in the layout.
// A competitor without an entry here has no page content yet and shows the "coming soon" placeholder (ComparePlaceholder.jsx).

const hero = {
  image: '/assets/compare-monarch-hero-new.webp', // stand-in: the same picture on every page until per-app art exists
  imageWidth: 1400,
  imageHeight: 1012,
};

const competitors = {
  'monarch-money': {
    metadata: {
      title: 'WealthNX vs Monarch Money: Features Compared | WealthNX',
      description: 'Looking at Monarch Money alternatives? See how WealthNX compares on everyday money, investments and AI, with stock research and Wealth Genie built in.',
    },
    hero: {
      ...hero,
      titleBlack: 'A Monarch Money Alternative',
      titleTeal: 'With Stock Research and AI',
      text: 'Both apps bring your money together in one place. The difference comes down to what you need. Monarch focuses on budgeting, net worth tracking, and shared finances, while WealthNX adds stock research and AI assistants to help you understand your investments and explore market information.',
    },
    compare: {
      title: 'How Does WealthNX Compare to Monarch Money?',
      text: 'Here is how each app handles everyday money, investments and AI, based on what each finance offers today.',
      columns: { wealthnx: 'WealthNX', other: 'Monarch' },
      rows: [
        {
          wealthnx: {
            title: 'Everyday Money in One View',
            text: 'See spending, bills, budgets, goals and net worth in one app. WealthNX identifies recurring charges in your linked accounts, helping you keep track of subscriptions and other regular payments.',
          },
          other: {
            title: 'Budgets Built for Households',
            text: 'Monarch offers Flex or category budgets with rollovers, a calendar of recurring bills and bill sync for credit cards and loans. Each household member gets their own login at no extra cost.',
          },
        },
        {
          wealthnx: {
            title: 'Portfolio Tracking Plus Stock Research',
            text: 'WealthNX covers 70,000+ stocks and ETFs and 5M+ crypto assets next to your 401(k) and IRA. Market research adds earnings dates, insider trades from SEC filings and news sentiment by ticker.',
          },
          other: {
            title: 'Portfolio Tracking and Analysis',
            text: 'Monarch pulls in holdings from brokerage, IRA and 401(k) accounts, shows asset allocation and compares your return with the S&P 500. Monarch Plus adds Gains & Losses and Fund Analysis from Morningstar',
          },
        },
        {
          wealthnx: {
            title: 'Wealth Genie AI Assistants',
            text: 'Ask Wealth Genie by text or voice about your money. Its Stock and Crypto Assistants explain what you hold in easy wording, and Build Mode turns a request into a custom chart. On Plus and the free trial.',
          },
          other: {
            title: 'AI Assistant and Weekly Recap',
            text: 'Monarch’s AI Assistant answers questions about spending, cash flow and net worth from your data. AI Insights explain changes on key screens, and a Weekly Recap summarizes your week’s finances.',
          },
        },
      ],
    },
    download: {
      titleLines: ['See Your Money and Your Investments', 'Side by Side'],
      textLines: ['Spending, investments and market research in one place,', 'with clear answers from AI when you need them.'],
    },
  },
  'rocket-money': {
    metadata: {
      title: 'WealthNX vs Rocket Money: Bills, Investing and AI',
      description: 'Compare WealthNX and Rocket Money side by side. See how each handles subscriptions, bills, investments and AI, and which one fits the way you use your money.',
    },
    hero: {
      ...hero,
      titleBlack: 'A Rocket Money Alternative',
      titleTeal: 'With Stock Research and AI Built In',
      text: 'Rocket Money and WealthNX both track your spending, subscriptions and net worth. Rocket Money is built to cut bills and cancel charges for you. WealthNX is built to help you understand your money and investments.',
    },
    compare: {
      title: 'How Does WealthNX Compare to Rocket Money?',
      text: 'Here is how each app handles subscriptions and bills, investments and AI, based on what each finance app offers.',
      columns: { wealthnx: 'WealthNX', other: 'Rocket Money' },
      rows: [
        {
          wealthnx: {
            title: 'Bills and Subscriptions in View',
            text: 'WealthNX identifies monthly and yearly recurring charges in your linked accounts and helps you keep track of bills and subscriptions in one place. You stay in control of what you keep or cancel.',
          },
          other: {
            title: 'Subscriptions, Bills and Credit',
            text: 'Rocket Money finds your subscriptions, and its team can cancel them for Premium members. Premium+ adds bill negotiation with no success fee. Free and paid plans include a FICO Score 2.',
          },
        },
        {
          wealthnx: {
            title: 'Portfolio Tracking Plus Stock Research',
            text: 'WealthNX covers 70,000+ stocks and ETFs and 5M+ crypto assets next to your bank and retirement accounts. Market research adds earnings dates, insider trades from SEC filings and news sentiment by ticker.',
          },
          other: {
            title: 'Net Worth and Automatic Savings',
            text: 'Premium members see net worth across checking, savings, brokerage, retirement and crypto accounts. Financial Goals moves small amounts from checking into savings on its own, based on your cash flow.',
          },
        },
        {
          wealthnx: {
            title: 'Wealth Genie AI Assistants',
            text: 'Ask Wealth Genie in the app by text or voice. Stock and Crypto Assistants explain your holdings in plain English, and Build Mode turns a request into a chart. On Plus and the trial.',
          },
          other: {
            title: 'Rowan, an AI You Text',
            text: 'Rowan works through text messages on Premium+ ($15/month). It answers spending questions, adjusts budgets and sends weekly recaps. With your approval, it can start cancellations, bill negotiations and refund requests.',
          },
        },
      ],
    },
    download: {
      titleLines: ['Your Bills, Budget and', 'Investments in One App'],
      textLines: ['Connect your accounts, keep an eye on recurring charges', 'and follow your investments, with plain answers from Wealth Genie.'],
    },
  },
  ynab: {
    metadata: {
      title: 'YNAB Alternative With Investment Tracking | WealthNX',
      description: 'Looking at YNAB alternatives? See how WealthNX compares on budgeting, investments and AI, with stock research and Wealth Genie answers built into the app.',
    },
    hero: {
      ...hero,
      titleBlack: 'A YNAB Alternative',
      titleTeal: 'That Also Tracks Your Investments',
      text: 'If a strict budgeting method is what you want, YNAB is built for that. If you also want to follow your investments and ask questions about your money, WealthNX brings both into one app.',
    },
    compare: {
      title: 'How Does WealthNX Compare to YNAB?',
      text: 'Three areas show the biggest differences: how you budget, how investments show up and where you get answers.',
      columns: { wealthnx: 'WealthNX', other: 'YNAB' },
      rows: [
        {
          wealthnx: {
            title: 'Budgets Linked to Your Accounts',
            text: 'WealthNX sorts spending into categories and picks up bills and recurring charges from your linked accounts. Fixed and flexible budgets show what is left to spend, and goals track what you save.',
          },
          other: {
            title: 'Give Every Dollar a Job',
            text: 'YNAB’s method has you assign each dollar you already have to a category. Targets plan for bills and non-monthly costs, and one subscription can be shared with up to six people.',
          },
        },
        {
          wealthnx: {
            title: 'Portfolio Tracking Plus Stock Research',
            text: 'WealthNX shows stocks, ETFs, crypto and your home value next to your budget, with data from FMP, CoinGecko and ATTOM. Market research adds earnings dates, insider trades from SEC filings and news sentiment.',
          },
          other: {
            title: 'Net Worth From Tracking Accounts',
            text: 'YNAB adds investments, a home or a loan as tracking accounts that stay outside your budget. Their balances feed a net worth report, and YNAB notes manual updates are often more reliable.',
          },
        },
        {
          wealthnx: {
            title: 'Wealth Genie AI Assistants',
            text: 'Ask Wealth Genie about your money by text or voice. It answers from your accounts, explains stocks and crypto you hold, and helps you set up a budget. On Plus and the trial.',
          },
          other: {
            title: 'Workshops, Guides and an API',
            text: 'YNAB teaches its budgeting method through workshops, guides and educational resources. Auto-Assign helps allocate money to categories, while its API supports integrations with third-party tools.',
          },
        },
      ],
    },
    download: {
      titleLines: ['Plan Your Spending and Follow', 'Your Portfolio in One App'],
      textLines: ['Connect your accounts, see your budget update as transactions sync', 'and follow your investments, with easy to understand answers from Wealth Genie.'],
    },
  },
  'copilot-money': {
    metadata: {
      title: 'WealthNX vs Copilot Money: Features Compared | WealthNX',
      description: 'Comparing WealthNX and Copilot Money? See where each app runs, how each one handles your investments, and which helps you plan your money further ahead',
    },
    hero: {
      ...hero,
      titleBlack: 'Looking for a Copilot Money Alternative',
      titleTeal: 'on Android?',
      text: 'Copilot Money helps you see this month clearly. WealthNX adds a longer view, with estimated net worth projections years ahead and a way to explore how a big purchase could affect them.',
    },
    compare: {
      title: 'Is WealthNX or Copilot Money the Better Fit for You?',
      text: 'Both apps cover budgets, spending and net worth. The differences show up in where you can use them, how deep they go on stocks and how far ahead they look.',
      columns: { wealthnx: 'WealthNX', other: 'Copilot Money' },
      rows: [
        {
          wealthnx: {
            title: 'On iPhone, Android and the Web',
            text: 'WealthNX has apps for iPhone and Android plus a web app, so it works on the phone you already own. It connects to 12,000+ institutions through Plaid with read-only access.',
          },
          other: {
            title: 'Built for Apple Devices',
            text: 'Copilot Money runs on iPhone, iPad, Mac and the web, with direct Apple Card, Apple Cash, Venmo and Amazon connections. It supports US accounts at 16,000+ financial institutions, with a 1-month free trial.',
          },
        },
        {
          wealthnx: {
            title: 'Research on the Stocks You Own',
            text: 'Next to your holdings, WealthNX shows earnings dates, insider trades from SEC Form 4 filings, investor holdings from 13F filings and news sentiment by ticker. For information only, with no buy or sell calls.',
          },
          other: {
            title: 'Portfolio Tracking With Intraday Estimates',
            text: 'Copilot Money tracks stocks, crypto and retirement accounts and compares returns with market benchmarks. It offers intraday balance estimates and shows average cost when your institution sends it.',
          },
        },
        {
          wealthnx: {
            title: 'Net Worth Projections and Before You Buy',
            text: 'Forecasting uses your financial data and assumptions to estimate how your net worth could change over time, including different savings scenarios. Before You Buy, on Plus, estimates how a major purchase, such as a car or home, could affect your projected net worth.',
          },
          other: {
            title: 'Savings Goals With Suggestions',
            text: 'Copilot Intelligence suggests savings goals from your cash flow and yearly bills, then estimates how long each goal will take. Goals link to specific accounts, so savings stay separate from spending.',
          },
        },
      ],
    },
    download: {
      titleLines: ['One App on Any Phone for', 'Money, Stocks and Plans'],
      textLines: ['Connect your accounts on iPhone, Android or the web,', 'research the stocks you own and see where your net worth may be headed.'],
    },
  },
};

/** Page data for one competitor, or null while its content has not been supplied. */
export function getCompareDetail(slug) {
  return competitors[slug] || null;
}
