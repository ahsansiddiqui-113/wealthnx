import LightShell from '../_shared/LightShell';
import Calculator from './Calculator';

export const metadata = {
  title: '401(k) Calculator - Retirement Balance Projection | WealthNX',
  description: 'See how your contributions and employer match grow into a retirement balance with the free WealthNX 401(k) calculator.',
  alternates: {
    canonical: 'https://www.wealthnx.ai/calculators/401k-calculator/',
  },
};

export default function Page() {
  return (
    <LightShell
      eyebrow="401(K) GROWTH CALCULATOR"
      title="What could your 401(k) become — and how much does the match change it?"
      sub="Model your current balance, contribution rate, employer match, salary growth and return assumption. Then see the result as a trajectory, not just one retirement number."
    >
      <Calculator />
    </LightShell>
  );
}
