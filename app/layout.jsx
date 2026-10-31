import './globals.css';
import './motion.css';
import MotionRoot from './components/MotionRoot';
import '@/src/page-components/MobileSwipe.css';
import Script from 'next/script';

export const metadata = {
  title: 'WealthNX - AI-Powered Wealth Intelligence',
  description: 'WealthNX: Your AI-powered wealth intelligence platform for smarter financial decisions',
  icons: {
    icon: '/favicon.ico',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.wealthnx.ai/#organization',
  name: 'WealthNX',
  url: 'https://www.wealthnx.ai',
  logo: 'https://www.wealthnx.ai/logo.png', // 512x512 PNG in /public (crawlable, square, > 112px)
  description: 'AI-powered wealth management and financial intelligence platform.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '424 E Central Blvd, Ste 248',
    addressLocality: 'Orlando',
    addressRegion: 'FL',
    postalCode: '32801',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-407-600-4801',
    email: 'support@wealthnx.ai',
    contactType: 'Customer Support',
    availableLanguage: 'English',
  },
  sameAs: [
    'https://x.com/wealthnxai',
    'https://www.facebook.com/wealthnxai',
    'https://www.instagram.com/wealthnx.ai',
    'https://www.linkedin.com/company/wealthnxai/',
    'https://www.youtube.com/@Wealthnxai',
    'https://apps.apple.com/us/app/wealthnx-ai/id6753972698',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

        {/* Organization schema — global, all pages */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* Preload only the logo — used in the header on every page */}
        <link rel="preload" as="image" href="/assets/Group.png" />
      </head>
      <body suppressHydrationWarning>
        <div>
          {children}
        </div>
        <MotionRoot />

        {/* Google Analytics — loaded after the page is interactive so it never blocks first paint */}
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-BD55WGWDED"
        />
        <Script id="ga-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BD55WGWDED');
          `}
        </Script>
      </body>
    </html>
  );
}
