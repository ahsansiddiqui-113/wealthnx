// Individual comparison pages (placeholders until designs/copy are supplied).
// Single source of truth for the /compare/ list rows, the footer links and the routes.
export const comparePages = [
  { slug: 'monarch-money', logo: '/assets/compare-logo-monarch-money.webp', name: 'Monarch Money', short: 'Monarch', mark: 'M', color: '#ee6a2a' },
  { slug: 'rocket-money', logo: '/assets/compare-logo-rocket-money.webp', name: 'Rocket Money', short: 'Rocket Money', mark: 'R', color: '#d6293e' },
  { slug: 'ynab', logo: '/assets/compare-logo-ynab.webp', name: 'YNAB', short: 'YNAB', mark: 'Y', color: '#3d5bd9' },
  { slug: 'copilot-money', logo: '/assets/compare-logo-copilot-money.webp', name: 'Copilot Money', short: 'Copilot Money', mark: 'C', color: '#1b1b1b' },
];

export const comparePageHref = (slug) => `/compare/${slug}/`;
export const getComparePage = (slug) => comparePages.find((page) => page.slug === slug);
