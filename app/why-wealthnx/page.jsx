import WhyPage from '@/src/page-components/WhyPage';

export const metadata = {
  title: 'Why WealthNX',
  description: 'WealthNX brings everyday money, investments, crypto, market insights, and AI together in one smarter financial platform.',
  alternates: { canonical: 'https://www.wealthnx.ai/why-wealthnx/' },
  robots: { index: false, follow: true }, // keep noindex until the owner approves the page
};

export default function Page() {
  return <WhyPage />;
}
