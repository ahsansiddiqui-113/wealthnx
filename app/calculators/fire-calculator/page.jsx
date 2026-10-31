import LightShell from '../_shared/LightShell';
import Calculator from './Calculator';

export const metadata = {
  title: 'FIRE Calculator - FIRE Number, Years to Retire & Coast FIRE | WealthNX',
  description: 'Calculate your FIRE number, how many years to financial independence, and your Coast FIRE number, with Lean and Fat FIRE presets.',
  alternates: {
    canonical: 'https://www.wealthnx.ai/calculators/fire-calculator/',
  },
};

export default function Page() {
  return (
    <LightShell
      eyebrow="FINANCIAL INDEPENDENCE CALCULATOR"
      title="What does financial independence look like with your actual spending?"
      sub="Calculate an illustrative target from your spending, then see how contributions, return assumptions and spending changes move the timeline."
    >
      <Calculator />
    </LightShell>
  );
}
