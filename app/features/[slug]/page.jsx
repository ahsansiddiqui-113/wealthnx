import { notFound } from 'next/navigation';
import FeaturePage from '@/src/page-components/FeaturePage.jsx';
import GenieLanding from '@/src/page-components/GenieLanding.jsx';
import { genieAgents } from '@/src/page-components/genieAgents';
import { featureRouteSlugs, featureContent } from '../featureRegistry';

export const dynamicParams = false;

/* The Wealth Genie assistants open the Wealth Genie page (assistant tabs) with their own assistant selected. */
const GENIE_AGENT_BY_SLUG = {
  accountant: 'accountant',
  stocks: 'stock',
  crypto: 'crypto',
  'build-mode': 'build-mode',
  'general-assistant': 'general',
};

export function generateStaticParams() {
  return featureRouteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const content = featureContent[slug];
  if (!content) return {};
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: `https://www.wealthnx.ai/features/${slug}/` },
  };
}

export default async function FeatureRoute({ params }) {
  const { slug } = await params;
  const content = featureContent[slug];
  if (!content) notFound();
  const agentKey = GENIE_AGENT_BY_SLUG[slug];
  if (agentKey) {
    const faqLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: genieAgents[agentKey].faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    };
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, String.fromCharCode(92) + 'u003c') }} />
        <GenieLanding agent={agentKey} hero={content.hero} />
      </>
    );
  }
  const faqLd = content.faqs?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  } : null;
  return (
    <>
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, String.fromCharCode(92) + 'u003c') }} />}
      <FeaturePage content={content} />
    </>
  );
}
