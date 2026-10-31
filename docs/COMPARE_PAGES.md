# Compare pages (`/compare/<slug>/`)

All four pages (Monarch Money, Rocket Money, YNAB, Copilot Money) use ONE template: `src/page-components/CompareDetail.jsx` (+ `CompareDetail.css`, `CompareDetailIslands.jsx`) driven by `src/page-components/compareDetailData.js`. The route is `app/compare/[slug]/page.jsx`. CSS classes keep the `mc-` prefix (`mc-*--monarch` = the competitor column).

## Fill in a competitor
Open `compareDetailData.js`, find `competitors['<slug>']`. Entries marked `dummy: true` are all-TBD placeholders. Replace `{ dummy: true }` with:
- `fit` - 3 bullets for the "<Name> May Fit Your Needs If" box
- `col` - 8 cell values for the competitor table column (same order as `shared.table.rows`)
- `sharedCard` - body blocks of the "If Your Financial Life Is Shared" card (`{ p }`, `{ ul }`, `{ tbd: lines }`)
- `askNote` - small verdict line in the left chat card
Then remove `dummy: true`. Use the literal `'TBD'` for anything still unknown. Pages stay `noindex` (see `generateMetadata` in `[slug]/page.jsx`) until you remove that.

## Shared vs per-competitor
Shared (`shared` object, same on every page): hero text/image/CTA, WealthNX column + fit box, table title/rows/footnote, the "Markets" and "Wealth Genie" cards, chat block captions/questions, security block, FAQ. Per-competitor: the fields above, plus `name` (from `app/compare/comparePages.js`) used in the box title, the column header and the page title (`<Name> vs WealthNX`).

## Add a fifth competitor
1. Add `{ slug, name, short, mark, color }` to `app/compare/comparePages.js` (list page, footer and routes follow).
2. Add `competitors['<slug>']` in `compareDetailData.js` (or `{ dummy: true }`).

## Stand-ins
Hero image `/assets/compare-monarch-hero-new.webp` is used on all four pages; give a competitor its own image by making `hero.image` per-competitor.
