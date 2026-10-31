import CompareLanding from '@/src/page-components/CompareLanding.jsx';

export const metadata = {
  title: 'Compare WealthNX with Monarch Money, Rocket Money, YNAB & Copilot Money',
  description: 'Compare WealthNX with Monarch Money, Rocket Money, YNAB and Copilot Money by what you need: budgeting, bills and subscriptions, investments, crypto, market information and AI.',
  alternates: {
    canonical: 'https://www.wealthnx.ai/compare/',
  },
};

export default function ComparePage() {
  return <main><CompareLanding /></main>;
}
