import ContactLanding from '@/src/page-components/ContactLanding.jsx';
import { contactFaqs } from '@/src/page-components/contactFaqs';

export const metadata = {
  title: 'Contact WealthNX Support and Customer Service | WealthNX',
  description: 'Reach WealthNX support by email at support@wealthnx.ai, by phone at +1 407-600-4801 or through the contact form. The WealthNX office is in Orlando, Florida.',
  alternates: {
    canonical: 'https://www.wealthnx.ai/contact/',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: contactFaqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact WealthNX Support and Customer Service',
  url: 'https://www.wealthnx.ai/contact/',
  mainEntity: {
    '@type': 'Organization',
    name: 'WealthNX',
    email: 'support@wealthnx.ai',
    telephone: '+1 407-600-4801',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '424 E Central Blvd, Ste 248',
      addressLocality: 'Orlando',
      addressRegion: 'FL',
      postalCode: '32801',
      addressCountry: 'US',
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([contactSchema, faqSchema]) }} />
      <ContactLanding />
    </>
  );
}

