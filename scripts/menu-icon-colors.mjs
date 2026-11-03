/* Finds the main colour of every menu icon (public/assets/menu-icons-v2) and writes app/features/menuIconColors.json:
   { "/assets/menu-icons-v2/x.webp": "#rrggbb" }. The /features/ arc fills each badge with this colour and draws the icon in white.
   Re-run after replacing an icon:  node scripts/menu-icon-colors.mjs */
import sharp from 'sharp';
import fs from 'fs';

sharp.cache(false);
const dir = 'public/assets/menu-icons-v2';
const FALLBACK = { 'transactions.webp': '#6cb4f5' }; // pale icons the saturation filter skips
const out = {};
for (const f of fs.readdirSync(dir).filter((n) => n.endsWith('.webp')).sort()) {
  const { data, info } = await sharp(fs.readFileSync(`${dir}/${f}`)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const bins = new Map();
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    if (a < 200) continue;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    if (max > 235 && min > 215) continue; // white
    const sat = max === 0 ? 0 : (max - min) / max;
    if (sat < 0.25) continue; // black / grey outlines
    const key = `${r >> 4},${g >> 4},${b >> 4}`;
    const e = bins.get(key) || { n: 0, r: 0, g: 0, b: 0 };
    e.n++; e.r += r; e.g += g; e.b += b;
    bins.set(key, e);
  }
  const top = [...bins.values()].sort((x, y) => y.n - x.n)[0];
  const hex = top ? `#${[top.r, top.g, top.b].map((v) => Math.round(v / top.n).toString(16).padStart(2, '0')).join('')}` : null;
  out[`/assets/menu-icons-v2/${f}`] = hex || FALLBACK[f] || null;
}
fs.writeFileSync('app/features/menuIconColors.json', `${JSON.stringify(out, null, 1)}\n`);
console.log(Object.keys(out).length, 'icons; no colour for:', Object.entries(out).filter(([, v]) => !v).map(([k]) => k));
