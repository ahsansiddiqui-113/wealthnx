// DEV ONLY. In-memory fake of the admin API for local work without PHP.
// Loaded via dynamic import() from AdminApp inside a `process.env.NODE_ENV !== 'production'`
// branch, so it is never part of the production export. Login: any email + password "demo".
// All lists start empty (no dummy content).
import { sanitizeHtml } from './sanitize';

const CSRF = 'dev-mock-csrf';
const db = { posts: [], videos: [], subscribers: [] };
let session = null;
let seq = 1;

const json = (status, body, headers = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...headers } });
const err = (status, message) => json(status, { error: message });
const uid = () => (seq++).toString(16).padStart(8, '0') + Math.random().toString(16).slice(2, 26).padEnd(24, '0');
const nowIso = () => new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');

function slugify(s) {
  return String(s || '').normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
function plain(html) {
  return new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html').body.textContent.trim();
}
function uniqueSlug(base, selfId) {
  let s = base || 'post';
  let n = 1;
  while (db.posts.some((p) => p.slug === s && p.id !== selfId)) { n += 1; s = `${base}-${n}`; }
  return s;
}
const bool = (v) => v === true || v === 1 || v === '1' || v === 'true';
const stripContent = (p) => { const { content, ...rest } = p; return rest; };

function page(items, q) {
  const limit = Math.min(50, Math.max(1, parseInt(q.get('limit') || '20', 10)));
  const offset = Math.max(0, parseInt(q.get('offset') || '0', 10));
  return { items: items.slice(offset, offset + limit), total: items.length, limit, offset };
}

function buildPost(data, existing) {
  const isNew = !existing;
  const p = existing ? { ...existing } : { id: uid(), created_at: nowIso(), content: '', excerpt: '', cover_image: null, is_trending: false, is_featured: false, published_at: null };
  if (isNew || 'title' in data) {
    const t = String(data.title || '').trim();
    if (!t || t.length > 200) return [null, 'Title is required (max 200 characters)'];
    p.title = t;
  }
  if ('content' in data) p.content = sanitizeHtml(String(data.content || ''));
  if ('excerpt' in data) {
    if (String(data.excerpt).length > 1000) return [null, 'Excerpt must be at most 1000 characters'];
    p.excerpt = String(data.excerpt).trim();
  }
  if (isNew && !p.excerpt && p.content) p.excerpt = plain(p.content).slice(0, 200);
  if (isNew || 'category' in data) p.category = String(data.category || '').trim() || 'General';
  if (isNew || 'author' in data) p.author = String(data.author || '').trim() || 'WealthNX Team';
  if (isNew || 'layout' in data) {
    const l = String(data.layout || '') || 'style1';
    if (!/^style[1-5]$/.test(l)) return [null, 'layout must be one of style1, style2, style3, style4, style5'];
    p.layout = l;
  }
  if ('cover_image' in data) p.cover_image = data.cover_image ? String(data.cover_image) : null;
  if (isNew || 'status' in data) {
    const s = data.status || (isNew ? 'draft' : p.status);
    if (s !== 'draft' && s !== 'published') return [null, 'Status must be "draft" or "published"'];
    p.status = s;
  }
  if ('is_trending' in data) p.is_trending = bool(data.is_trending);
  if ('is_featured' in data) p.is_featured = bool(data.is_featured);
  if (data.published_at) {
    const d = new Date(data.published_at);
    if (isNaN(d)) return [null, 'published_at must be a valid ISO 8601 date'];
    p.published_at = d.toISOString().replace(/\.\d{3}Z$/, 'Z');
  }
  if (data.read_minutes !== undefined && data.read_minutes !== '' && data.read_minutes !== null) {
    const n = Number(data.read_minutes);
    if (!Number.isInteger(n) || n < 1 || n > 999) return [null, 'read_minutes must be a whole number between 1 and 999'];
    p.read_minutes = n;
  } else if (isNew || 'content' in data) {
    p.read_minutes = Math.max(1, Math.round(plain(p.content).split(/\s+/).filter(Boolean).length / 200));
  }
  if (p.status === 'published') {
    if (!plain(p.content) && !/<img/i.test(p.content)) return [null, 'Content is required to publish a post'];
    if (!p.published_at) p.published_at = nowIso();
  }
  const wanted = data.slug ? slugify(data.slug) : '';
  if (wanted) {
    if (wanted === 'read') return [null, 'That slug is reserved'];
    if (db.posts.some((x) => x.slug === wanted && x.id !== p.id)) return [null, 'Slug already in use', 409];
    p.slug = wanted;
  } else if (isNew) {
    p.slug = uniqueSlug(slugify(p.title) || 'post', p.id);
  }
  p.updated_at = nowIso();
  return [p, null];
}

function clearExclusive(field, keepId) {
  db.posts.forEach((x) => { if (x.id !== keepId) x[field] = false; });
}

async function handle(url, init) {
  const method = (init.method || 'GET').toUpperCase();
  const u = new URL(url, location.origin);
  const route = u.pathname.replace(/^\/api\/admin\/?/, '').replace(/\/$/, '');
  const q = u.searchParams;
  const headers = new Headers(init.headers || {});

  if (route === 'login' && method === 'POST') {
    let b = {};
    try { b = JSON.parse(init.body); } catch { /* ignore */ }
    if (!b.email || b.password !== 'demo') return err(401, 'Invalid email or password');
    session = { email: String(b.email) };
    return json(200, { ok: true, email: session.email, csrf: CSRF });
  }
  if (!session) return err(401, 'Not authenticated');
  if (route === 'me') return json(200, { ok: true, email: session.email, csrf: CSRF });
  if (method !== 'GET' && headers.get('X-CSRF-Token') !== CSRF) return err(403, 'Invalid CSRF token');
  if (route === 'logout') { session = null; return json(200, { ok: true }); }

  let body = {};
  if (init.body && typeof init.body === 'string') {
    try { body = JSON.parse(init.body); } catch { return err(400, 'Invalid JSON'); }
  }

  if (route === 'upload' && method === 'POST') {
    const file = init.body instanceof FormData ? init.body.get('file') : null;
    if (!file) return err(400, 'No file uploaded');
    if (file.size > 5 * 1024 * 1024) return err(413, 'File is too large');
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) return err(415, 'Unsupported image type');
    const url2 = await new Promise((resolve) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.readAsDataURL(file);
    });
    return json(201, { url: url2 });
  }

  if (route === 'posts' || route === 'post') {
    if (method === 'GET' && route === 'post') {
      const p = db.posts.find((x) => x.id === q.get('id'));
      return p ? json(200, p) : err(404, 'Post not found');
    }
    if (method === 'GET') {
      let items = [...db.posts].sort((a, b) => String(b.updated_at).localeCompare(String(a.updated_at)));
      if (q.get('status')) items = items.filter((p) => p.status === q.get('status'));
      const s = (q.get('q') || '').toLowerCase();
      if (s) items = items.filter((p) => (p.title + ' ' + p.excerpt).toLowerCase().includes(s));
      const r = page(items, q);
      r.items = r.items.map(stripContent);
      return json(200, r);
    }
    if (method === 'POST') {
      const [p, e, code] = buildPost(body, null);
      if (e) return err(code || 400, e);
      if (p.is_featured) clearExclusive('is_featured', p.id);
      db.posts.push(p);
      return json(201, p);
    }
    if (method === 'PUT') {
      const cur = db.posts.find((x) => x.id === body.id);
      if (!cur) return err(404, 'Post not found');
      const [p, e, code] = buildPost(body, cur);
      if (e) return err(code || 400, e);
      if (p.is_featured) clearExclusive('is_featured', p.id);
      Object.assign(cur, p);
      return json(200, cur);
    }
    if (method === 'DELETE') {
      const i = db.posts.findIndex((x) => x.id === q.get('id'));
      if (i < 0) return err(404, 'Post not found');
      db.posts.splice(i, 1);
      return json(200, { ok: true });
    }
  }

  if (route === 'videos' || route === 'video') {
    const mk = (data, cur) => {
      const v = cur ? { ...cur } : { id: uid(), created_at: nowIso(), thumbnail: null, description: '', duration: '', is_featured: false, sort_order: 0, status: 'draft' };
      if (!cur || 'title' in data) { if (!String(data.title || '').trim()) return [null, 'Title is required']; v.title = String(data.title).trim(); }
      if (!cur || 'url' in data) {
        if (!/^https?:\/\/(www\.|m\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\//i.test(String(data.url || ''))) return [null, 'URL must be a YouTube link'];
        v.url = String(data.url).trim();
      }
      if ('thumbnail' in data) v.thumbnail = data.thumbnail || null;
      if ('description' in data) v.description = String(data.description || '');
      if ('duration' in data) v.duration = String(data.duration || '');
      if ('is_featured' in data) v.is_featured = bool(data.is_featured);
      if ('sort_order' in data) v.sort_order = parseInt(data.sort_order, 10) || 0;
      if ('status' in data) v.status = data.status === 'published' ? 'published' : 'draft';
      v.updated_at = nowIso();
      return [v, null];
    };
    if (method === 'GET' && route === 'video') {
      const v = db.videos.find((x) => x.id === q.get('id'));
      return v ? json(200, v) : err(404, 'Video not found');
    }
    if (method === 'GET') return json(200, page([...db.videos].sort((a, b) => a.sort_order - b.sort_order), q));
    if (method === 'POST') {
      const [v, e] = mk(body, null);
      if (e) return err(400, e);
      if (v.is_featured) db.videos.forEach((x) => { x.is_featured = false; });
      db.videos.push(v);
      return json(201, v);
    }
    if (method === 'PUT') {
      const cur = db.videos.find((x) => x.id === body.id);
      if (!cur) return err(404, 'Video not found');
      const [v, e] = mk(body, cur);
      if (e) return err(400, e);
      if (v.is_featured) db.videos.forEach((x) => { x.is_featured = false; });
      Object.assign(cur, v);
      return json(200, cur);
    }
    if (method === 'DELETE') {
      const i = db.videos.findIndex((x) => x.id === q.get('id'));
      if (i < 0) return err(404, 'Video not found');
      db.videos.splice(i, 1);
      return json(200, { ok: true });
    }
  }

  if (route === 'subscribers') {
    if (method === 'GET') {
      if (q.get('format') === 'csv') {
        const rows = ['id,email,source,subscribed_at,unsubscribed_at', ...db.subscribers.map((s) => [s.id, s.email, s.source, s.created_at, s.unsubscribed_at || ''].join(','))];
        return new Response(rows.join('\n'), { status: 200, headers: { 'Content-Type': 'text/csv' } });
      }
      return json(200, page(db.subscribers, q));
    }
    if (method === 'DELETE') {
      const i = db.subscribers.findIndex((x) => x.id === q.get('id'));
      if (i < 0) return err(404, 'Subscriber not found');
      db.subscribers.splice(i, 1);
      return json(200, { ok: true });
    }
  }

  return err(404, 'Not found');
}

export function install() {
  if (window.__wnxAdminMock) return;
  window.__wnxAdminMock = true;
  const real = window.fetch.bind(window);
  window.fetch = (input, init = {}) => {
    const url = typeof input === 'string' ? input : input.url;
    if (/^(https?:\/\/[^/]+)?\/api\/admin(\/|$|\?)/.test(url)) {
      return new Promise((resolve) => setTimeout(resolve, 120)).then(() => handle(url, init));
    }
    return real(input, init);
  };
}
