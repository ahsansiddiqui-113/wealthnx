/* Measures the "core" of every hero picture (the phone itself, ignoring the soft shadow / glow padding of the export)
   and writes src/page-components/heroCores.json:  { "/assets/x.webp": { w, h, cx, cy, ch } }
     w,h  = file size in px            cx = horizontal centre of the core   cy = top of the core   ch = core height
   vw   = width of everything visible (floating cards included), so the CSS can keep wide pictures out of the text columns
   The hero CSS (HeroCore.css) scales every picture so its core is the Figma size (629px tall on the 1593px desktop frame,
   404px tall on the 390px mobile frame). Re-run after adding or replacing a hero picture:  node scripts/hero-cores.mjs */
import sharp from 'sharp';
import fs from 'fs';

sharp.cache(false);
const dir = 'public/assets';
const files = fs.readdirSync(dir).filter((f) => f === 'features-hero.webp' || f === 'home-hero-phone.webp' || /^feature-(?!genie-phone).*-(phone|hero)\.webp$/.test(f));
const out = {};
for (const f of files.sort()) {
  const { data, info } = await sharp(fs.readFileSync(`${dir}/${f}`)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const box = (th) => {
    let x0 = info.width, x1 = 0, y0 = info.height, y1 = 0;
    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        if (data[(y * info.width + x) * 4 + 3] > th) {
          if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
        }
      }
    }
    return { x0, x1, y0, y1 };
  };
  const c = box(120);
  const v = box(24);
  out[`/assets/${f}`] = { w: info.width, h: info.height, cx: Math.round((c.x0 + c.x1) / 2), cy: c.y0, ch: c.y1 - c.y0, vw: v.x1 - v.x0 };
}
fs.writeFileSync('src/page-components/heroCores.json', `${JSON.stringify(out, null, 1)}\n`);
console.log(Object.keys(out).length, 'hero pictures measured');
