/* Dry-run report for the WordPress export: node scripts/blog-import/report.mjs <export.xml>
   Reads only. Writes nothing. */
import { parseWxr } from './wxr.mjs';

const file = process.argv[2];
if (!file) { console.error('usage: node scripts/blog-import/report.mjs <export.xml>'); process.exit(1); }
const { posts, attachments } = parseWxr(file);

const count = (arr, f) => arr.reduce((o, x) => { const k = f(x); o[k] = (o[k] || 0) + 1; return o; }, {});
console.log('items by type/status:', count(posts, (p) => `${p.type}/${p.status}`), 'attachments:', attachments.size);

const real = posts.filter((p) => p.type === 'post');
console.log('\nposts:', real.length);
console.log('categories:', count(real.flatMap((p) => (p.categories.length ? p.categories.map((c) => c.name) : ['(none)'])), (x) => x));
console.log('authors:', count(real, (p) => p.author));

const feat = {
  table: /<table/i, iframe: /<iframe/i, shortcode: /\[[a-z_\-]+[^\]]*\]/i, figure: /<figure/i, gutenberg: /<!-- wp:/,
  h1: /<h1/i, video: /<video/i, script: /<script/i, style: /\sstyle="/i, button: /<button|wp-block-button/i, html5: /<(details|summary|aside|section)/i,
};
const feats = {};
for (const [k, re] of Object.entries(feat)) feats[k] = real.filter((p) => re.test(p.content)).map((p) => p.slug);
console.log('\ncontent features (posts containing):');
for (const [k, v] of Object.entries(feats)) console.log(`  ${k}: ${v.length}`);

const imgHosts = {};
let imgTotal = 0;
for (const p of real) {
  for (const m of p.content.matchAll(/<img[^>]+src="([^"]+)"/gi)) {
    imgTotal++;
    try { const h = new URL(m[1], 'https://www.wealthnx.ai').host; imgHosts[h] = (imgHosts[h] || 0) + 1; } catch { imgHosts.invalid = (imgHosts.invalid || 0) + 1; }
  }
}
console.log('\nimages in content:', imgTotal, imgHosts);
console.log('posts without featured image:', real.filter((p) => !p.thumbnailId || !attachments.get(p.thumbnailId)).length);
console.log('posts without excerpt:', real.filter((p) => !p.excerpt.trim()).length);
console.log('posts with Yoast title / description:', real.filter((p) => p.meta._yoast_wpseo_title).length, '/', real.filter((p) => p.meta._yoast_wpseo_metadesc).length);
console.log('meta keys seen:', [...new Set(real.flatMap((p) => Object.keys(p.meta)))].filter((k) => !k.startsWith('_edit')).slice(0, 40));

const words = (h) => h.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
const wc = real.map((p) => words(p.content));
console.log('\nword count: min', Math.min(...wc), 'max', Math.max(...wc), 'avg', Math.round(wc.reduce((a, b) => a + b, 0) / wc.length), '| under 300 words:', wc.filter((n) => n < 300).length);

const slugs = real.map((p) => p.slug);
console.log('empty slugs:', slugs.filter((s) => !s).length, '| duplicate slugs:', slugs.length - new Set(slugs).size, '| slugs over 190 chars:', slugs.filter((s) => s.length > 190).length);
console.log('link patterns:', count(real, (p) => p.link.replace(/https?:\/\/[^/]+/, '').replace(p.slug, ':slug')));

const internal = {};
for (const p of real) for (const m of p.content.matchAll(/href="(https?:\/\/(?:www\.)?wealthnx\.ai[^"]*)"/gi)) { const k = m[1].replace(/https?:\/\/(?:www\.)?wealthnx\.ai/, '').split('/').slice(0, 2).join('/'); internal[k] = (internal[k] || 0) + 1; }
console.log('internal link prefixes:', internal);

const bySlug = new Map(real.map((p) => [p.slug, p]));
const keyOf = (t) => t.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter((w) => w.length > 3).sort().join(' ');
const groups = {};
for (const p of real) (groups[keyOf(p.title)] = groups[keyOf(p.title)] || []).push(p.title);
console.log('identical-title groups:', Object.values(groups).filter((g) => g.length > 1));

console.log('\nnon-published posts:');
for (const p of real.filter((x) => x.status !== 'publish')) console.log(`  [${p.status}] ${p.slug || '(no slug)'} | ${p.title}`);
console.log('\nfirst 5 / last 5 published by date:');
const pub = real.filter((p) => p.status === 'publish').sort((a, b) => a.dateGmt.localeCompare(b.dateGmt));
for (const p of [...pub.slice(0, 5), ...pub.slice(-5)]) console.log(`  ${p.dateGmt} ${p.slug}`);
void bySlug;
