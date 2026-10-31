import App from '@/src/page-components/main.jsx';
import Script from 'next/script';
import { homeFaqs } from '@/src/page-components/homeFaqs';

export const metadata = {
  title: 'AI Powered Personal Finance App for Your Wealth | WealthNX',
  description: 'AI powered personal finance app for your spending, bills, investments and crypto. Ask WealthNX AI about your money and get clear, simple answers.',
  alternates: {
    canonical: 'https://www.wealthnx.ai/',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.wealthnx.ai/#website',
  name: 'WealthNX',
  url: 'https://www.wealthnx.ai',
  description: 'AI-powered wealth management — track stocks, crypto, budgets, and net worth in one place.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.wealthnx.ai/blog/?s={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
  publisher: {
    '@id': 'https://www.wealthnx.ai/#organization',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homeFaqs.map(([name, text]) => ({
    '@type': 'Question',
    name,
    acceptedAnswer: { '@type': 'Answer', text },
  })),
};

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'WealthNX',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'iOS, Android, Web',
  description: 'AI powered personal finance app that brings accounts, spending, bills, investments and crypto together, with the Wealth Genie AI assistant.',
  offers: [
    { '@type': 'Offer', name: 'Core', price: '8.99', priceCurrency: 'USD', description: 'Billed annually ($107.94/year). Includes a 7-day free trial.' },
    { '@type': 'Offer', name: 'Plus', price: '14.99', priceCurrency: 'USD', description: 'Billed annually ($179.94/year). Includes a 7-day free trial.' },
  ],
};

function HomeSchemas() {
  return (
    <>
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        strategy="beforeInteractive"
      />
      <Script
        id="schema-software-app"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
        strategy="beforeInteractive"
      />
      <Script
        id="schema-faq-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="beforeInteractive"
      />
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <HomeSchemas />
      <main><App /></main>
    </>
  );
}
