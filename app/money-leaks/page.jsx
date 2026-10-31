import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Recurring Expense Tracker - Subscriptions & Bills | WealthNX',
  description: 'Find recurring charges, subscriptions and bills across connected accounts, review payment timing and see monthly changes in one place.',
  alternates: {
    canonical: 'https://www.wealthnx.ai/recurring-expense-tracker/',
  },
};

export default function MoneyLeaksRedirect() {
  redirect('/recurring-expense-tracker/');
}
