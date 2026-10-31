// Validates the feature registry (app/features/registry/*). Run: npm run check:features
// Plain Node ESM, no dependencies.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// The registry files are typeless-package ES modules; silence Node's harmless MODULE_TYPELESS_PACKAGE_JSON notice.
process.removeAllListeners('warning');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { featureEntries } = await import(pathToFileURL(path.join(root, 'app/features/registry/index.js')).href);
const { MENU_GROUPS } = await import(pathToFileURL(path.join(root, 'app/features/featureRegistry.js')).href);

// Valid icon keys = the keys of `paths` in FeatureIcons.jsx (single source of truth, parsed from the file).
const iconSource = fs.readFileSync(path.join(root, 'src/page-components/FeatureIcons.jsx'), 'utf8');
const pathsBlock = iconSource.match(/const paths = \{([\s\S]*?)\n\};/);
if (!pathsBlock) { console.error('check-features: could not find `const paths = {...}` in src/page-components/FeatureIcons.jsx'); process.exit(1); }
const iconKeys = new Set([...pathsBlock[1].matchAll(/^  (?:'([\w-]+)'|([\w-]+)):/gm)].map((m) => m[1] || m[2]));
if (iconKeys.size === 0) { console.error('check-features: parsed no icon keys from FeatureIcons.jsx'); process.exit(1); }

const errors = [];
const kebab = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const hex = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const isText = (v) => typeof v === 'string' && v.trim() !== '';

function checkAsset(where, value) {
  if (!isText(value)) { errors.push(`${where}: missing`); return; }
  if (value.startsWith('/assets/') && !fs.existsSync(path.join(root, 'public', value))) {
    errors.push(`${where}: file not found in public/ -> ${value}`);
  }
}

const seen = new Map();
const menuSlots = new Map();
const carouselOrders = new Map();

featureEntries.forEach((entry, index) => {
  const id = isText(entry.slug) ? `"${entry.slug}"` : `entry #${index + 1}`;
  const err = (msg) => errors.push(`${id}: ${msg}`);

  if (!isText(entry.slug)) err('slug is missing');
  else {
    if (!kebab.test(entry.slug)) err(`slug must be kebab-case (lowercase letters, digits, hyphens), got "${entry.slug}"`);
    if (seen.has(entry.slug)) err(`duplicate slug (also entry #${seen.get(entry.slug) + 1})`);
    else seen.set(entry.slug, index);
  }
  if (!isText(entry.label)) err('label is missing');
  if (!isText(entry.metaTitle)) err('metaTitle is missing');
  if (!isText(entry.metaDescription)) err('metaDescription is missing');

  const hero = entry.hero;
  if (!hero || typeof hero !== 'object') err('hero is missing');
  else {
    for (const field of ['headline', 'accent', 'blurb']) if (!isText(hero[field])) err(`hero.${field} is missing`);
    checkAsset(`${id}: hero.image`, hero.image);
  }

  if (!Array.isArray(entry.cards)) err('cards must be an array of exactly 6 cards');
  else {
    if (entry.cards.length !== 6) err(`cards must have exactly 6 entries, found ${entry.cards.length}`);
    entry.cards.forEach((card, i) => {
      for (const field of ['title', 'text']) if (!isText(card?.[field])) err(`cards[${i}].${field} is missing`);
      if (!iconKeys.has(card?.icon)) err(`cards[${i}].icon "${card?.icon}" is not a FeatureIcons.jsx key (valid: ${[...iconKeys].join(', ')})`);
    });
  }

  if (entry.menu !== undefined) {
    const { menu } = entry;
    if (!MENU_GROUPS.includes(menu.group)) err(`menu.group "${menu.group}" must be one of: ${MENU_GROUPS.join(', ')} (add new groups to MENU_GROUPS in featureRegistry.js)`);
    if (typeof menu.order !== 'number' || Number.isNaN(menu.order)) err('menu.order must be a number');
    else {
      const slot = `${menu.group}#${menu.order}`;
      if (menuSlots.has(slot)) err(`menu.order ${menu.order} in "${menu.group}" is already used by "${menuSlots.get(slot)}"`);
      else menuSlots.set(slot, entry.slug);
    }
    checkAsset(`${id}: menu.icon`, menu.icon);
  }

  if (entry.carouselImage !== undefined) checkAsset(`${id}: carouselImage`, entry.carouselImage);

  if (entry.carousel !== undefined) {
    const c = entry.carousel;
    if (typeof c.order !== 'number' || Number.isNaN(c.order)) err('carousel.order must be a number');
    else if (carouselOrders.has(c.order)) err(`carousel.order ${c.order} is already used by "${carouselOrders.get(c.order)}"`);
    else carouselOrders.set(c.order, entry.slug);
    checkAsset(`${id}: carousel.image`, c.image);
    checkAsset(`${id}: carousel.icon`, c.icon);
    if (!isText(c.color)) err('carousel.color is missing');
    else if (!hex.test(c.color)) err(`carousel.color must be a hex colour like #27c98e, got "${c.color}"`);
    if (!isText(c.description)) err('carousel.description is missing');
    if (c.name !== undefined && !isText(c.name)) err('carousel.name, when set, must be non-empty');
  }
});

if (errors.length) {
  console.error(`\nFeature registry check FAILED (${errors.length} problem${errors.length === 1 ? '' : 's'}):\n`);
  for (const message of errors) console.error(`  - ${message}`);
  console.error('\nFix the entries in app/features/registry/ (see docs/ADDING_FEATURES.md).\n');
  process.exit(1);
}
const withMenu = featureEntries.filter((e) => e.menu).length;
const withCarousel = featureEntries.filter((e) => e.carousel).length;
console.log(`Feature registry OK: ${featureEntries.length} features (${withMenu} in dropdown, ${withCarousel} in carousel).`);
const dummies = featureEntries.filter((e) => e.dummy).map((e) => e.slug);
if (dummies.length) console.log(`${dummies.length} features still use dummy content: ${dummies.join(', ')}`);
