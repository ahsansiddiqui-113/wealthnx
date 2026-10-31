import LightShell from '../_shared/LightShell';
import Calculator from './Calculator';

export const metadata = {
  title: 'Financial Health X-ray - Exact Score With Your Real Numbers | WealthNX',
  description: 'A precise financial health scan using your real numbers: an exact score with dollar-specific gaps across six areas.',
  alternates: {
    canonical: 'https://www.wealthnx.ai/calculators/financial-health-xray/',
  },
};

export default function Page() {
  return (
    <LightShell
      eyebrow="FINANCIAL HEALTH X-RAY"
      title="What does your financial health look like in real numbers?"
      sub="A precise scan using your real numbers — same six areas as the quick score, computed to the dollar instead of estimated."
    >
      <Calculator />
    </LightShell>
  );
}
