import LightShell from '../_shared/LightShell';
import Calculator from './Calculator';

export const metadata = {
  title: 'Savings Goal Calculator - How Long to Reach Your Goal | WealthNX',
  description: 'See your projected savings balance, deposits versus growth, time to your goal, and the monthly amount required under your assumptions.',
  alternates: {
    canonical: 'https://www.wealthnx.ai/calculators/savings-goal-calculator/',
  },
};

export default function Page() {
  return (
    <LightShell
      eyebrow="SAVINGS GOAL CALCULATOR"
      title="How long until your savings goal becomes real?"
      sub="See your projected balance, how much comes from your deposits versus growth, the estimated time to your goal, and what monthly amount would be required under your assumptions."
    >
      <Calculator />
    </LightShell>
  );
}
