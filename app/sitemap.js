import { featurePages, featurePageHref } from './features/featureRegistry';

export const dynamic = 'force-static';

const BASE_URL = 'https://www.wealthnx.ai';

const routes = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/features/', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/wealth-genie/', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/how-it-works/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/pricing/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/stocks/', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/crypto/', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/net-worth-tracker/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/cash-flow-tracker/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/download/', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/compare/', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/founder/', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/about-us/', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/calculators/', priority: 0.7, changeFrequency: 'monthly' },
  ...['financial-health-score', 'financial-health-xray', '401k-calculator', 'savings-goal-calculator', 'fire-calculator', 'mortgage-calculator'].map((slug) => ({ path: `/calculators/${slug}/`, priority: 0.6, changeFrequency: 'monthly' })),
  { path: '/blogs/', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/why-wealthnx/', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact/', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/support/', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/privacy-policy/', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms-and-conditions/', priority: 0.3, changeFrequency: 'yearly' },
  ...featurePages.map(({ slug }) => ({ path: featurePageHref(slug), priority: 0.7, changeFrequency: 'monthly' })),
];

export default function sitemap() {
  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
