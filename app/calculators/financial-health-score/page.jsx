import LightShell from '../_shared/LightShell';
import Calculator from './Calculator';

export const metadata = {
  title: 'Financial Health Score - Quick Free Quiz | WealthNX',
  description: 'Build a quick Financial Health Score baseline using WealthNX score bands, then see which areas are doing the most work.',
  alternates: {
    canonical: 'https://www.wealthnx.ai/calculators/financial-health-score/',
  },
};

export default function Page() {
  return (
    <LightShell
      eyebrow="FINANCIAL HEALTH SCORE"
      title="What does your broader financial picture look like?"
      sub="Build a quick baseline using the same top-level Financial Health Score structure and grading bands used by WealthNX, then see which areas are doing the most work."
      chips={['Under 4 minutes', 'No bank login', 'Core result before email', 'Same WealthNX score bands']}
    >
      <Calculator />
    </LightShell>
  );
}
