import FeaturePage from '@/src/page-components/FeaturePage.jsx';
import { featureContent } from '../../features/featureRegistry';

const content = featureContent['voice-to-action'];

export const metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: 'https://www.wealthnx.ai/wealth-genie/voice-to-action/' },
};

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: content.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

/** /wealth-genie/voice-to-action/ : same page template as /features/<slug>/, copy from the feature registry. */
export default function VoiceToActionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, String.fromCharCode(92) + 'u003c') }} />
      <FeaturePage content={content} />
    </>
  );
}
