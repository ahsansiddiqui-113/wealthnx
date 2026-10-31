/* Minimal WordPress WXR (export XML) reader for the blog migration. No dependencies. */
import fs from 'fs';

const decode = (s) => s
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');

/** Text of the first <tag>...</tag> in `xml`, CDATA unwrapped, entities decoded when not CDATA. */
function tag(xml, name) {
  const re = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`);
  const m = xml.match(re);
  if (!m) return '';
  const cd = m[1].match(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/);
  return cd ? cd[1] : decode(m[1].trim());
}

export function parseWxr(path) {
  const xml = fs.readFileSync(path, 'utf8');
  const items = xml.split('<item>').slice(1).map((chunk) => chunk.split('</item>')[0]);
  const posts = [];
  const attachments = new Map();

  for (const it of items) {
    const type = tag(it, 'wp:post_type');
    const id = tag(it, 'wp:post_id');
    if (type === 'attachment') {
      attachments.set(id, { id, url: tag(it, 'wp:attachment_url'), title: tag(it, 'title'), parent: tag(it, 'wp:post_parent') });
      continue;
    }
    const cats = [];
    const tags = [];
    const re = /<category domain="([a-z_]+)" nicename="([^"]*)">([\s\S]*?)<\/category>/g;
    let m;
    while ((m = re.exec(it))) {
      const name = (m[3].match(/<!\[CDATA\[([\s\S]*?)\]\]>/) || [, decode(m[3])])[1];
      if (m[1] === 'category') cats.push({ slug: m[2], name });
      else if (m[1] === 'post_tag') tags.push({ slug: m[2], name });
    }
    const meta = {};
    const mre = /<wp:postmeta>\s*<wp:meta_key>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/wp:meta_key>\s*<wp:meta_value>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/wp:meta_value>\s*<\/wp:postmeta>/g;
    while ((m = mre.exec(it))) meta[m[1]] = m[2];

    posts.push({
      id,
      type,
      status: tag(it, 'wp:status'),
      title: tag(it, 'title'),
      slug: tag(it, 'wp:post_name'),
      link: tag(it, 'link'),
      dateGmt: tag(it, 'wp:post_date_gmt'),
      date: tag(it, 'wp:post_date'),
      author: tag(it, 'dc:creator'),
      content: tag(it, 'content:encoded'),
      excerpt: tag(it, 'excerpt:encoded'),
      categories: cats,
      tags,
      meta,
      thumbnailId: meta._thumbnail_id || '',
    });
  }
  return { posts, attachments };
}
