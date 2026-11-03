import CompareLanding from '@/src/page-components/CompareLanding.jsx';

export const metadata = {
  title: 'Personal Finance App Comparison for 2026 | WealthNX',
  description: 'Which personal finance app fits you? See what YNAB, Monarch, Rocket Money and Copilot focus on, and where WealthNX brings money and investing together.',
  alternates: {
    canonical: 'https://www.wealthnx.ai/comparison/',
  },
};

export default function ComparisonPage() {
  return <main><CompareLanding /></main>;
}
