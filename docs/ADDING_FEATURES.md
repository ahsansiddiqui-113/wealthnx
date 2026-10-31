# Adding a feature page

Every `/features/<slug>/` page uses one template (`src/page-components/FeaturePage.jsx`). A feature is a single entry in the registry; everything else is derived from it: the page, its metadata, the static route, the sitemap URL, the Features dropdown, the `/features` carousel and its "Learn more" link.

## Steps

1. Open the file in `app/features/registry/` for the dropdown group it belongs to (`money.js`, `portfolio.js`, `markets.js`, `ai.js`) and copy an existing entry to the end of the array.
2. Set `slug` (kebab-case, unique), `label`, `menu`, `metaTitle`, `metaDescription`, `hero` and exactly 6 `cards`.
   - The dropdown has 4 groups, in this order: Money, Portfolio, Markets, Wealth Genie AI. `menu.group` must be one of `MENU_GROUPS` in `app/features/featureRegistry.js`. To add a new dropdown group, add its title to `MENU_GROUPS` (the order there is the dropdown order).
   - `menu.order` sorts items inside the group. Use gaps (10, 20, 30...) so you can insert between items.
   - Leave `menu` out to publish the page without a dropdown link.
   - Card `icon` must be a key of `paths` in `src/page-components/FeatureIcons.jsx`.
3. The `/features` carousel is built automatically: 4 tabs (Wealth Genie AI, Money, Portfolio, Market = the `Markets` group), each listing its group's features by `menu.order`. A feature with a `menu` needs nothing more. Optional `carousel` only overrides the slide's `image`, `icon`, `color`, `description` (and `name`); without it they come from `carouselImage` (optional entry field: the slide image when it must differ from the page-top `hero.image`, e.g. `/assets/feature-<slug>.webp` for the carousel and `/assets/feature-<slug>-hero.webp` for the hero) or else `hero.image`, `menu.icon`, the tab colour and the meta description. A feature with no `menu` and a `carousel` is only listed if its slug is `portfolio` or `markets` (legacy pages).
4. Placeholder pages: build them with `dummyFeature(slug, label, menu, image)` from `registry/dummy.js` (sets `dummy: true`, "Dummy …" copy and 6 cards). To write real content, replace the helper call with a full entry and drop the `dummy` flag. `npm run check:features` lists the pages still flagged as dummy (informational, not a failure).
5. Put any new images in `public/assets/` (hero images: set `hero.width`/`hero.height` to the file size).
6. Run `npm run check:features`. It fails with a readable message on duplicate or non-kebab slugs, missing label/hero fields, a card count other than 6, unknown icon keys, incomplete carousel data, missing image files, and unknown menu groups.

## Example entry

```js
{
  slug: 'tax-planning',
  label: 'Tax Planning',
  menu: { group: 'Money', order: 100, icon: '/assets/budget.png' },
  carousel: {
    order: 120,
    // name: 'Taxes',            // optional, defaults to label
    image: '/assets/feature-net-worth.webp',
    icon: '/assets/budget.png',
    color: '#27c98e',
    description: 'One or two sentences shown under the carousel heading.',
  },
  metaTitle: 'Tax Planning - WealthNX',
  metaDescription: 'Search-result description for the page.',
  hero: {
    headline: 'Plan ahead,',
    accent: 'pay less surprise.',
    blurb: 'One sentence under the hero heading.',
    image: '/assets/feature-net-worth.webp', width: 546, height: 427, // real pixel size of the file
  },
  cards: [
    { icon: 'wallet', title: 'Card title', text: 'Card text.' },
    { icon: 'pie', title: 'Card title', text: 'Card text.' },
    { icon: 'trend-up', title: 'Card title', text: 'Card text.' },
    { icon: 'calendar', title: 'Card title', text: 'Card text.' },
    { icon: 'bell', title: 'Card title', text: 'Card text.' },
    { icon: 'link', title: 'Card title', text: 'Card text.' },
  ],
},
```

## Notes

- The registry files are plain ES modules (no JSX, no `@` alias, explicit `.js` import extensions) so `scripts/check-features.mjs` can import them in plain Node. Keep it that way.
- New pages need a dev-server restart only if Next does not pick up the new static param by itself; `npm run build` always includes them.
