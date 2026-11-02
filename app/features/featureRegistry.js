/*
 * FEATURE REGISTRY - the single source of truth for every /features/<slug>/ page.
 *
 * How to add a feature
 *   1. Open the file in ./registry/ for the dropdown group it belongs to (money.js, portfolio.js, markets.js, ai.js),
 *      copy an existing entry and set:
 *        slug      kebab-case, unique; becomes /features/<slug>/
 *        label     name shown in the dropdown and on the page
 *        menu      { group, order, icon } - dropdown placement. `group` must be one of MENU_GROUPS below,
 *                  `order` sorts inside the group (use gaps: 10, 20, 30...). Omit `menu` to keep it out of the dropdown.
 *        hero      { headline, accent, blurb, image }
 *        carouselImage  optional: the /features slide image when it differs from hero.image
 *        cards     exactly 6 x { icon, title, text }; `icon` is a key from FeatureIcons.jsx
 *        metaTitle / metaDescription
 *   2. Optional: `carousel: { order, image, icon, color, description, name? }` overrides the auto-built /features slide
 *      (4 tabs built from the groups; slides follow `menu.order`).
 *   3. Run `npm run check:features`.
 *
 * Everything else (static params, metadata, sitemap, dropdown, carousel, "Learn more" links) is derived here.
 * A brand-new dropdown group: add its title to MENU_GROUPS (the order here is the dropdown column order).
 *
 * Keep this file and ./registry/* free of JSX and the `@` alias so plain Node can import them.
 */
import { featureEntries } from './registry/index.js';
import { CAROUSEL_COPY, HIDDEN_SLIDES } from './carouselCopy.js';

export const MENU_GROUPS = ['Money', 'Portfolio', 'Markets', 'Wealth Genie AI'];

// A few pages live elsewhere (entry.path, e.g. /wealth-genie/voice-to-voice/); everything else is /features/<slug>/.
const PATH_BY_SLUG = Object.fromEntries(featureEntries.filter((entry) => entry.path).map((entry) => [entry.slug, entry.path]));

export const featurePageHref = (slug) => PATH_BY_SLUG[slug] || `/features/${slug}/`;

/** Slugs rendered by app/features/[slug] (the ones with their own route are excluded). */
export const featureRouteSlugs = () => featureEntries.filter((entry) => !entry.path).map((entry) => entry.slug);

const byOrder = (a, b) => a.order - b.order;
const groupRank = (group) => {
  const rank = MENU_GROUPS.indexOf(group);
  return rank === -1 ? MENU_GROUPS.length : rank;
};

// Entries in dropdown order (menu entries by group then order, then any entries without a menu).
const orderedEntries = [
  ...featureEntries
    .filter((entry) => entry.menu)
    .sort((a, b) => groupRank(a.menu.group) - groupRank(b.menu.group) || byOrder(a.menu, b.menu)),
  ...featureEntries.filter((entry) => !entry.menu),
];

/** Every feature page, `{ slug, label }`, in dropdown order. */
export const featurePages = orderedEntries.map(({ slug, label }) => ({ slug, label }));

/** Page copy by slug: `{ label, metaTitle, metaDescription, hero, cards }`. */
export const featureContent = Object.fromEntries(
  orderedEntries.map(({ slug, menu, carousel, carouselImage, ...content }) => [slug, content]),
);

/** Dropdown columns: `[{ title, items: [{ slug, label, href, icon }] }]`. */
export const featureMenuGroups = MENU_GROUPS.map((title) => ({
  title,
  items: orderedEntries
    .filter((entry) => entry.menu && entry.menu.group === title)
    .map(({ slug, label, menu }) => ({ slug, label, href: featurePageHref(slug), icon: menu.icon })),
})).filter((group) => group.items.length > 0);

/** /features carousel tabs, in display order. `group` is the registry MENU_GROUPS title; `color` is the default slide accent. */
const TABS = [
  { id: 'ai', label: 'Wealth Genie AI', group: 'Wealth Genie AI', color: '#ee5fa7' },
  { id: 'money', label: 'Money', group: 'Money', color: '#27c98e' },
  { id: 'portfolio', label: 'Portfolio', group: 'Portfolio', color: '#8155dc' },
  { id: 'market', label: 'Market', group: 'Markets', color: '#3e97ec' },
];

// First sentence of the meta description when it fits in 120 chars, else the hero blurb.
const shortText = ({ metaDescription = '', hero }) => {
  const first = (metaDescription.match(/^.*?[.!?](?=\s|$)/) || [metaDescription])[0];
  return first && first.length <= 120 ? first : hero.blurb;
};

/**
 * /features carousel: `[{ id, label, slides }]`. Each tab lists its group's dropdown features by `menu.order`; a feature
 * without `carousel` gets image/icon/description from its hero/menu/meta and the tab colour. Carousel-only entries
 * (no `menu`, e.g. the old Portfolio and Markets pages) are appended to the tab of the group their slug belongs to.
 */
/** Slide badge colours: neighbours on the arc always differ, and each tab starts on its own hue. */
const SLIDE_COLORS = ['#27c98e', '#ee5fa7', '#f5a524', '#3e97ec', '#8155dc', '#e5484d', '#17c3d6', '#b6cf2e'];
const SLIDE_COLOR_START = { ai: 1, money: 0, portfolio: 4, market: 3 };

export const featureTabs = TABS.map(({ id, label, group, color }) => {
  const toSlide = ({ slug, label: name, menu, hero, carousel, carouselImage, ...rest }) => ({
    slug, href: featurePageHref(slug),
    ...(carousel
      ? { name: carousel.name || name, image: carousel.image, icon: menu ? menu.icon : carousel.icon, color, description: carousel.description }
      : { name, image: carouselImage || hero.image, icon: menu.icon, color, description: shortText({ hero, ...rest }) }),
  });
  const inGroup = featureEntries.filter((entry) => entry.menu && entry.menu.group === group).sort((a, b) => byOrder(a.menu, b.menu));
  const legacy = featureEntries.filter((entry) => !entry.menu && entry.carousel && entry.slug === group.toLowerCase());
  const copyOrder = Object.keys(CAROUSEL_COPY);
  const rank = (slug) => { const i = copyOrder.indexOf(slug); return i < 0 ? copyOrder.length : i; };
  const slides = [...inGroup, ...legacy]
    .filter((entry) => !HIDDEN_SLIDES.includes(entry.slug))
    .map((entry) => ({ ...toSlide(entry), ...(CAROUSEL_COPY[entry.slug] || {}) }))
    .sort((a, b) => rank(a.slug) - rank(b.slug))
    .map((slide, i) => ({ ...slide, color: SLIDE_COLORS[(i + (SLIDE_COLOR_START[id] || 0)) % SLIDE_COLORS.length] }));
  return { id, label, slides };
});

/** Every carousel slide, all tabs (kept for callers that want one flat list). */
export const featureSlides = featureTabs.flatMap((tab) => tab.slides);
