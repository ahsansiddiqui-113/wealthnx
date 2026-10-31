/* Client for /api/blog/* (contract: docs/BLOG_PLAN.md §3). Any failure yields empty data (sections hide themselves). */

async function getJson(url, options) {
  /* next dev has no PHP: skip the request (avoids 500s in the console) unless NEXT_PUBLIC_BLOG_API=1 */
  if (process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_BLOG_API !== '1') throw new Error('dev: no api');
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const type = res.headers.get('content-type') || '';
  if (!type.includes('json')) throw new Error('not json');
  return res.json();
}

export async function getPosts({ category = '', q = '', sort = 'newest', limit = 9, offset = 0 } = {}) {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (q) params.set('q', q);
  params.set('sort', sort);
  params.set('limit', String(limit));
  params.set('offset', String(offset));
  try {
    const data = await getJson(`/api/blog/posts?${params}`);
    if (!data || !Array.isArray(data.items)) throw new Error('bad shape');
    return data;
  } catch {
    return { items: [], total: 0, categories: [] };
  }
}

/* Single post (with HTML `content`). Returns { post } | { notFound: true } | { error: true }.
   */
export async function getPost(slug) {
  if (!slug) return { notFound: true };
  try {
    const data = await getJson(`/api/blog/post?slug=${encodeURIComponent(slug)}`);
    if (!data || typeof data.slug !== 'string') throw new Error('bad shape');
    return { post: data };
  } catch (err) {
    return /HTTP 404/.test(String(err && err.message)) ? { notFound: true } : { error: true };
  }
}

export async function getTrending() {
  try {
    const data = await getJson('/api/blog/posts/trending');
    if (!data || !Array.isArray(data.items)) throw new Error('bad shape');
    return data;
  } catch {
    return { featured: null, items: [] };
  }
}

export async function getVideos() {
  try {
    const data = await getJson('/api/blog/videos');
    if (!data || !Array.isArray(data.items)) throw new Error('bad shape');
    return data;
  } catch {
    return { featured: null, items: [] };
  }
}

/* Non-design string: generic error message. */
export const SUBSCRIBE_ERROR = 'Something went wrong. Please try again.';

export async function subscribe({ email, source, website = '' }) {
  try {
    await getJson('/api/blog/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source, website }),
    });
    return { ok: true };
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') return { ok: true, local: true };
    return { ok: false, error: SUBSCRIBE_ERROR };
  }
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
/* "Oct 2, 2026" (September is "Sept" as drawn on /blogs/; the article pages draw "Sep": pass sep='Sep') */
export function formatDate(value, sep = 'Sept') {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value || '');
  if (!m) return '';
  return `${m[2] === '09' ? sep : MONTHS[+m[2] - 1]} ${+m[3]}, ${m[1]}`;
}
