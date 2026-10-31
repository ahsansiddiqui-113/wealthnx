import GenieLanding from '@/src/page-components/GenieLanding';
import Script from 'next/script';
import { genieAgents, GENIE_AGENT_ORDER } from '@/src/page-components/genieAgents';

export const metadata = {
  title: 'AI Wealth Assistant for Your Money and Markets | WealthNX',
  description: 'Wealth Genie is an AI wealth assistant that answers questions about your spending, stocks, crypto and net worth from your own accounts, by text or voice.',
  alternates: {
    canonical: 'https://www.wealthnx.ai/wealth-genie/',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.wealthnx.ai/' },
    { '@type': 'ListItem', position: 2, name: 'Wealth Genie', item: 'https://www.wealthnx.ai/wealth-genie/' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: GENIE_AGENT_ORDER.flatMap((key) => genieAgents[key].faq).map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function WealthGenieRoute() {
  return (
    <>
      <Script
        id="schema-breadcrumb-wealth-genie"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="beforeInteractive"
      />
      <Script
        id="schema-faq-wealth-genie"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="beforeInteractive"
      />
      <main><GenieLanding /></main>
    </>
  );
}

