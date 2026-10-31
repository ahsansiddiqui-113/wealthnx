/* Build the blog import from a WordPress export.
 *
 *   node scripts/blog-import/build.mjs <export.xml> [--no-images]
 *
 * Writes only into ./blog-import-out/ (nothing touches the site or the database):
 *   posts-1.sql ...        INSERTs for the blog_posts table (run in phpMyAdmin, in order)
 *   uploads/blog/*.webp    featured images, to upload to the server's /uploads/blog/ folder
 *   redirects.htaccess     301 rules /blog/<slug>/ -> /blogs/<slug>/ (pasted into .htaccess)
 *   REPORT.md              what was imported, what to review
 *   posts.json             the cleaned data (for review)
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';
import { parseWxr } from './wxr.mjs';

const file = process.argv[2];
const skipImages = process.argv.includes('--no-images');
if (!file) { console.error('usage: node scripts/blog-import/build.mjs <export.xml> [--no-images]'); process.exit(1); }

const OUT = path.resolve('blog-import-out');
fs.mkdirSync(path.join(OUT, 'uploads', 'blog'), { recursive: true });

const decode = (s) => s
  .replace(/&nbsp;/g, ' ').replace(/&#8217;|&rsquo;/g, '’').replace(/&#8216;|&lsquo;/g, '‘')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;|&apos;/g, "'").replace(/&amp;/g, '&');
const plain = (html) => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

/* ---------- HTML cleaning: only tags the blog sanitiser keeps (plus tables) ---------- */
const ALLOWED = new Set(['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'blockquote', 'img', 'br', 'code', 'pre', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td']);
const MAP = { b: 'strong', i: 'em', h1: 'h2', h5: 'h4', h6: 'h4' };

function fixHref(href) {
  let h = href.trim();
  h = h.replace(/^https?:\/\/(?:www\.)?wealthnx\.ai/i, '');
  if (/^\/blog\/category\//i.test(h) || /^\/blog\/(author|tag)\//i.test(h) || /^\/blog\/?(\?.*)?$/i.test(h)) return '/blogs/';
  h = h.replace(/^\/blog\//i, '/blogs/');
  return h;
}

function cleanHtml(html) {
  let s = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
    .replace(/ /g, ' ');
  const anchors = []; // true = a kept link; false = an anchor without a usable href (dropped, so its closing tag goes too)
  s = s.replace(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:\s[^>]*)?)>/g, (m, close, rawName, attrs) => {
    let name = rawName.toLowerCase();
    name = MAP[name] || name;
    if (!ALLOWED.has(name)) return '';
    if (close) return name === 'a' ? (anchors.pop() ? '</a>' : '') : `</${name}>`;
    if (name === 'br') return '<br>';
    if (name === 'a') {
      const href = (attrs.match(/\shref\s*=\s*"([^"]*)"/i) || attrs.match(/\shref\s*=\s*'([^']*)'/i) || [])[1];
      if (!href || /^\s*(javascript|data|vbscript):/i.test(href)) { anchors.push(false); return ''; }
      anchors.push(true);
      return `<a href="${fixHref(href).replace(/"/g, '&quot;')}">`;
    }
    if (name === 'img') {
      const src = (attrs.match(/\ssrc\s*=\s*"([^"]*)"/i) || [])[1] || '';
      if (!src || /placeholder\.png/i.test(src)) return '';
      const alt = (attrs.match(/\salt\s*=\s*"([^"]*)"/i) || [])[1] || '';
      return `<img src="${src}" alt="${alt}">`;
    }
    return `<${name}>`;
  });
  // unwrap orphaned closers of dropped tags is not needed (closers of dropped tags are removed too)
  s = s
    .replace(/<p>\s*(?:<br>\s*)*<\/p>/g, '')
    .replace(/<(strong|em)>\s*<\/\1>/g, '')
    .replace(/<a href="[^"]*">\s*<\/a>/g, '')
    .replace(/(<\/(?:p|h2|h3|h4|ul|ol|li|table|tr|td|th|blockquote|pre)>)\s*(<(?:p|h2|h3|h4|ul|ol|table|blockquote|pre)>)/g, '$1\n$2')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
  return s;
}

/* ---------- categories (WordPress had 95 of 105 posts in "Business") ---------- */
const RULES = [
  ['Crypto', /crypto|bitcoin|defi\b|wallet|blockchain|airdrop|impermanent|exchanges?\b/i],
  ['Security & Privacy', /\bsafe\b|safety|security|encryption|2fa|two-factor|password|privacy|zero-knowledge|read-only|data protection|protect|acquired|out of business/i],
  ['Comparisons & Reviews', /\bvs\b|alternative|compar|best .*apps?|what to look for|key features|beginner'?s guide to the best/i],
  ['Investing & Stocks', /stock|earnings|p\/e|valuation|insider|analyst|sector|short interest|moat|balance sheet|rebalanc|dividend|consensus|supply chain|alternative data|growth vs value|pre-earnings|portfolio/i],
  ['Net Worth & Tracking', /net worth|assets|liabilities|aggregation|multiple accounts|total assets|dashboard/i],
  ['Budgeting & Cash Flow', /budget|cash.?flow|expenses?|spending|subscription|recurring|money leak|goal|seasonal|financial anxiety/i],
];
function categoryFor(p, overrides) {
  if (overrides[p.slug]) return overrides[p.slug];
  const t = `${p.title} ${p.slug.replace(/-/g, ' ')}`;
  for (const [name, re] of RULES) if (re.test(t)) return name;
  return 'AI Finance Apps';
}
let overrides = {};
try { overrides = JSON.parse(fs.readFileSync(path.join('scripts', 'blog-import', 'category-overrides.json'), 'utf8')); } catch { /* optional */ }

/* ---------- read export ---------- */
const { posts, attachments } = parseWxr(file);
const published = posts.filter((p) => p.type === 'post' && p.status === 'publish' && p.slug)
  .sort((a, b) => a.dateGmt.localeCompare(b.dateGmt));

const authorName = (login) => (/asif/i.test(login) ? 'Asif Ali' : 'WealthNX Team');
const uuid32 = (slug) => crypto.createHash('md5').update(`wealthnx-blog:${slug}`).digest('hex');
const fileSafe = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

/* ---------- images ---------- */
async function fetchBuf(url) {
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return Buffer.from(await res.arrayBuffer());
    } catch { /* retry */ }
    await new Promise((r) => setTimeout(r, 500 * (i + 1)));
  }
  return null;
}
const imageFailures = [];
async function coverFor(p) {
  const att = attachments.get(p.thumbnailId);
  if (!att || !att.url) return null;
  const name = `${p.thumbnailId}-${fileSafe(p.slug)}.webp`;
  const dest = path.join(OUT, 'uploads', 'blog', name);
  if (skipImages) return `/uploads/blog/${name}`;
  if (!fs.existsSync(dest)) {
    const buf = await fetchBuf(att.url);
    if (!buf) { imageFailures.push([p.slug, att.url]); return null; }
    try {
      await sharp(buf).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toFile(dest);
    } catch (e) { imageFailures.push([p.slug, `${att.url} (${e.message})`]); return null; }
  }
  return `/uploads/blog/${name}`;
}

const rows = [];
const queue = [...published];
async function worker() {
  while (queue.length) {
    const p = queue.shift();
    const content = cleanHtml(p.content);
    const text = plain(content);
    const words = text.split(/\s+/).filter(Boolean).length;
    const rawExcerpt = plain(p.excerpt);
    let excerpt = rawExcerpt || (text.length > 200 ? `${text.slice(0, 200).replace(/\s+\S*$/, '')}...` : text);
    excerpt = excerpt.slice(0, 1000);
    const yTitle = (p.meta._yoast_wpseo_title || '').trim();
    const yDesc = (p.meta._yoast_wpseo_metadesc || '').trim();
    const unresolved = (s) => /%%/.test(s);
    rows.push({
      id: uuid32(p.slug),
      slug: p.slug,
      title: decode(p.title).replace(/\s+/g, ' ').trim().slice(0, 200),
      excerpt,
      content,
      category: categoryFor({ ...p, title: decode(p.title) }, overrides),
      wpCategory: p.categories.map((c) => decode(c.name)).join(', '),
      cover_image: await coverFor(p),
      author: authorName(p.author),
      read_minutes: Math.max(1, Math.ceil(words / 200)),
      published_at: p.dateGmt,
      meta_title: yTitle && !unresolved(yTitle) ? decode(yTitle).slice(0, 255) : null,
      meta_description: yDesc && !unresolved(yDesc) ? decode(yDesc).slice(0, 320) : null,
      words,
      tables: (content.match(/<table>/g) || []).length,
      yoastUnresolved: unresolved(yTitle) || unresolved(yDesc),
    });
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
rows.sort((a, b) => a.published_at.localeCompare(b.published_at));

/* ---------- SQL ---------- */
const q = (v) => (v === null || v === undefined ? 'NULL' : `'${String(v).replace(/\\/g, '\\\\').replace(/'/g, "''").replace(/\0/g, '').replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\x1a/g, '')}'`);
const latest = rows.map((r) => r.slug).slice(-4).reverse(); // newest = featured, next 3 = trending
const stmt = (r) => {
  const featured = r.slug === latest[0] ? 1 : 0;
  const trending = latest.slice(1).includes(r.slug) ? 1 : 0;
  return `INSERT INTO blog_posts (id, slug, title, excerpt, content, category, layout, cover_image, author, read_minutes, status, is_trending, is_featured, published_at, created_at, updated_at, meta_title, meta_description) VALUES (${q(r.id)}, ${q(r.slug)}, ${q(r.title)}, ${q(r.excerpt)}, ${q(r.content)}, ${q(r.category)}, 'style1', ${q(r.cover_image)}, ${q(r.author)}, ${r.read_minutes}, 'published', ${trending}, ${featured}, ${q(r.published_at)}, ${q(r.published_at)}, ${q(r.published_at)}, ${q(r.meta_title)}, ${q(r.meta_description)}) ON DUPLICATE KEY UPDATE title = VALUES(title), excerpt = VALUES(excerpt), content = VALUES(content), category = VALUES(category), cover_image = VALUES(cover_image), author = VALUES(author), read_minutes = VALUES(read_minutes), published_at = VALUES(published_at), meta_title = VALUES(meta_title), meta_description = VALUES(meta_description);`;
};
const PER_FILE = 40;
for (const f of fs.readdirSync(OUT)) if (/^posts-\d+\.sql$/.test(f)) fs.unlinkSync(path.join(OUT, f));
for (let i = 0, n = 1; i < rows.length; i += PER_FILE, n++) {
  const chunk = rows.slice(i, i + PER_FILE);
  fs.writeFileSync(path.join(OUT, `posts-${n}.sql`), `-- WealthNX blog import, part ${n}: posts ${i + 1}-${i + chunk.length} of ${rows.length}. Safe to run twice (updates by slug).\nSET NAMES utf8mb4;\n\n${chunk.map(stmt).join('\n\n')}\n`);
}

/* ---------- redirects ---------- */
const esc = (s) => s.replace(/[.+*?^${}()|[\]\\]/g, '\\$&');
const redirects = [
  '    # >>> wordpress-blog-redirects (generated by scripts/blog-import/build.mjs; do not edit by hand)',
  '    # Old WordPress blog (/blog/...) -> new blog (/blogs/...). One 301 per post, then catch-alls.',
  '    # The WordPress back end stays reachable while WordPress is still installed under /blog/; remove this line when it is retired.',
  '    RewriteRule ^blog/(wp-admin|wp-login\\.php|wp-json|wp-content|wp-includes|wp-cron\\.php|xmlrpc\\.php)(/|$) - [L]',
  ...rows.map((r) => `    RewriteRule ^blog/${esc(r.slug)}/?$ /blogs/${r.slug}/ [R=301,L]`),
  '    # listing pages, categories, authors, tags, feeds and anything else under /blog/',
  '    RewriteRule ^blog(/.*)?$ /blogs/ [R=301,L]',
  '    # <<< wordpress-blog-redirects',
  '',
];
fs.writeFileSync(path.join(OUT, 'redirects.htaccess'), redirects.join('\n'));

/* ---------- report ---------- */
const norm = (t) => t.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\b(a|an|the|to|of|and|for|in|your|with)\b/g, ' ').split(/\s+/).filter(Boolean).sort().join(' ');
const groups = {};
for (const r of rows) (groups[norm(r.title)] = groups[norm(r.title)] || []).push(r);
const dups = Object.values(groups).filter((g) => g.length > 1);
const byCat = {};
for (const r of rows) byCat[r.category] = (byCat[r.category] || 0) + 1;
const skipped = posts.filter((p) => p.type === 'post' && p.status !== 'publish');
const md = [];
md.push('# Blog import report', '', `Export: ${path.basename(file)}`, '',
  `- Published posts imported: **${rows.length}**`,
  `- Not imported: ${skipped.map((p) => `${p.status} "${decode(p.title).trim()}"`).join('; ') || 'none'}`,
  `- Featured images downloaded: ${rows.filter((r) => r.cover_image).length} of ${rows.length}${skipImages ? ' (image download skipped)' : ''}`,
  `- Posts with tables (needs the table allow-list + CSS): ${rows.filter((r) => r.tables).length}`,
  `- SEO title/description carried over from Yoast: ${rows.filter((r) => r.meta_title).length} / ${rows.filter((r) => r.meta_description).length}`,
  `- Yoast values using unresolved template variables (ignored): ${rows.filter((r) => r.yoastUnresolved).length}`,
  `- Excerpts generated from the text: ${posts.filter((p) => p.status === 'publish' && !p.excerpt.trim()).length}`,
  `- Posts under 800 words: ${rows.filter((r) => r.words < 800).length}`, '',
  '## Categories assigned (WordPress had almost everything in "Business")', '',
  ...Object.entries(byCat).sort((a, b) => b[1] - a[1]).map(([k, v]) => `- ${k}: ${v}`), '',
  '## Overlapping / duplicate topics (decide keep, merge or retire)', '',
  ...dups.map((g) => `- ${g.map((r) => `${r.published_at.slice(0, 10)} \`${r.slug}\``).join('  |  ')}`), '',
  '## Image download failures', '', ...(imageFailures.length ? imageFailures.map(([s, u]) => `- ${s}: ${u}`) : ['none']), '',
  '## Category for every post (override in scripts/blog-import/category-overrides.json as {"slug":"Category"})', '',
  ...rows.map((r) => `- ${r.category} <- (${r.wpCategory}) ${r.slug}`), '');
fs.writeFileSync(path.join(OUT, 'REPORT.md'), md.join('\n'));
fs.writeFileSync(path.join(OUT, 'posts.json'), JSON.stringify(rows, null, 1));

console.log(`posts: ${rows.length}, sql files: ${Math.ceil(rows.length / PER_FILE)}, covers: ${rows.filter((r) => r.cover_image).length}, image failures: ${imageFailures.length}`);
console.log('categories:', byCat);
console.log('duplicate-topic groups:', dups.length);
