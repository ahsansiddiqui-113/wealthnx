import SiteFooter from './SiteFooter';

/**
 * Legacy entry point. Pages that still `import Footer from '@/app/components/Footer'`
 * now render the one shared footer (see SiteFooter.jsx).
 */
export default function Footer() {
  return <SiteFooter />;
}
