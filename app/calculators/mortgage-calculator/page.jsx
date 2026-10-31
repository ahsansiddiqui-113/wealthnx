import LightShell from '../_shared/LightShell';
import Calculator from './Calculator';

export const metadata = {
  title: 'Mortgage Extra Payment Calculator - Time & Interest Saved | WealthNX',
  description: 'Compare your current mortgage amortization path with monthly, annual or lump-sum extra payments and see the time and interest difference.',
  alternates: {
    canonical: 'https://www.wealthnx.ai/calculators/mortgage-calculator/',
  },
};

export default function Page() {
  return (
    <LightShell
      eyebrow="MORTGAGE CALCULATOR"
      title="How much time and interest could extra mortgage payments change?"
      sub="Compare your current amortization path with monthly, annual or lump-sum extra payments, then see the time and interest difference under the same loan assumptions."
    >
      <Calculator />
    </LightShell>
  );
}
