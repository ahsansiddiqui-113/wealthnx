// Every feature entry, concatenated. Array position only matters for entries without `menu` / `carousel`;
// dropdown and carousel order come from `menu.order` and `carousel.order`.
// Plain ES modules with explicit `.js` extensions so scripts/check-features.mjs can import them in plain Node.
import { money } from './money.js';
import { portfolio } from './portfolio.js';
import { markets } from './markets.js';
import { ai } from './ai.js';

export const featureEntries = [...money, ...portfolio, ...markets, ...ai];
