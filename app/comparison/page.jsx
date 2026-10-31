import { redirect } from 'next/navigation';

export const metadata = {
  title: 'WealthNX vs Other Wealth Management Apps - Comparison',
  description: 'See how WealthNX compares to other wealth management and budgeting apps on AI insights, account aggregation, security, and pricing.',
  alternates: {
    canonical: 'https://www.wealthnx.ai/comparison/',
  },
};

export default function ComparisonRedirect() {
  redirect('/compare/');
}
