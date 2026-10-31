// Admin API client. The CSRF token lives in memory only (never localStorage).
const BASE = '/api/admin';

let csrf = '';
let onUnauthorized = null;

export function setCsrf(v) { csrf = v || ''; }
export function setUnauthorizedHandler(fn) { onUnauthorized = fn; }

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function parse(res) {
  const type = res.headers.get('content-type') || '';
  if (type.includes('application/json')) {
    try { return await res.json(); } catch { return null; }
  }
  return null;
}

function friendly(status, data, fallback) {
  if (status === 413) return 'Image too large (max 5 MB).';
  if (data && typeof data.error === 'string' && data.error) return data.error;
  if (status === 415) return 'Unsupported file type. Use JPEG, PNG, WebP or GIF.';
  if (status === 429) return 'Too many attempts. Try again later.';
  if (status === 503) return 'Admin is not configured.';
  if (status === 403) return 'Request rejected (security token). Reload the page and sign in again.';
  return fallback || `Request failed (${status}).`;
}

export async function request(method, path, { query, body, form, skipAuthRedirect } = {}) {
  let url = BASE + path;
  if (query) {
    const qs = new URLSearchParams();
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') qs.set(k, String(v));
    });
    const s = qs.toString();
    if (s) url += '?' + s;
  }
  const init = { method, credentials: 'same-origin', headers: {} };
  if (method !== 'GET') init.headers['X-CSRF-Token'] = csrf;
  if (form) {
    init.body = form; // never set Content-Type manually for multipart
  } else if (body !== undefined) {
    init.headers['Content-Type'] = 'application/json';
    init.body = JSON.stringify(body);
  } else if (method !== 'GET') {
    init.headers['Content-Type'] = 'application/json';
  }
  let res;
  try {
    res = await fetch(url, init);
  } catch {
    throw new ApiError('Network error. Check your connection and try again.', 0);
  }
  const data = await parse(res);
  if (res.status === 401 && !skipAuthRedirect) {
    if (onUnauthorized) onUnauthorized();
    throw new ApiError('Session expired.', 401);
  }
  if (!res.ok) throw new ApiError(friendly(res.status, data), res.status);
  return data;
}

export const api = {
  get: (path, query) => request('GET', path, { query }),
  post: (path, body) => request('POST', path, { body }),
  put: (path, body) => request('PUT', path, { body }),
  del: (path, query) => request('DELETE', path, { query }),
};

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export function validateImage(file) {
  if (!file) return 'No file selected.';
  if (!IMAGE_TYPES.includes(file.type)) return 'Unsupported file type. Use JPEG, PNG, WebP or GIF.';
  if (file.size > MAX_IMAGE_BYTES) return 'Image too large (max 5 MB).';
  return '';
}

export async function uploadImage(file) {
  const err = validateImage(file);
  if (err) throw new ApiError(err, 400);
  const fd = new FormData();
  fd.append('file', file);
  const data = await request('POST', '/upload', { form: fd });
  if (!data || typeof data.url !== 'string') throw new ApiError('Upload failed. Unexpected server response.', 500);
  return data.url;
}

export async function login(email, password) {
  let data;
  try {
    data = await request('POST', '/login', { body: { email, password }, skipAuthRedirect: true });
  } catch (e) {
    if (e.status === 401) throw new ApiError('Invalid email or password.', 401);
    throw e;
  }
  setCsrf(data.csrf);
  return data;
}

export async function me() {
  const data = await request('GET', '/me', { skipAuthRedirect: true });
  setCsrf(data.csrf);
  return data;
}

export async function logout() {
  try { await request('POST', '/logout', { skipAuthRedirect: true }); } catch { /* ignore */ }
  setCsrf('');
}

export async function downloadSubscribersCsv() {
  let res;
  try {
    res = await fetch(`${BASE}/subscribers?format=csv`, { credentials: 'same-origin' });
  } catch {
    throw new ApiError('Network error. Check your connection and try again.', 0);
  }
  if (res.status === 401) {
    if (onUnauthorized) onUnauthorized();
    throw new ApiError('Session expired.', 401);
  }
  if (!res.ok) throw new ApiError(`Export failed (${res.status}).`, res.status);
  const blob = await res.blob();
  const a = document.createElement('a');
  const href = URL.createObjectURL(blob);
  a.href = href;
  a.download = 'wealthnx-subscribers.csv';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(href), 2000);
}

// ---- helpers ----
export function slugify(s) {
  return String(s || '')
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 120);
}

export function youtubeId(url) {
  try {
    const u = new URL(String(url).trim());
    const h = u.hostname.replace(/^www\.|^m\./, '');
    if (h === 'youtu.be') return u.pathname.split('/')[1] || '';
    if (h === 'youtube.com' || h === 'youtube-nocookie.com') {
      if (u.searchParams.get('v')) return u.searchParams.get('v');
      const m = u.pathname.match(/^\/(embed|shorts|live|v)\/([\w-]{6,})/);
      if (m) return m[2];
    }
  } catch { /* not a url */ }
  return '';
}

export function isYoutubeUrl(url) {
  try {
    const u = new URL(String(url).trim());
    if (!/^https?:$/.test(u.protocol)) return false;
    const h = u.hostname.replace(/^www\.|^m\./, '');
    return ['youtube.com', 'youtu.be', 'youtube-nocookie.com'].includes(h);
  } catch { return false; }
}

export function fmtDate(iso) {
  if (!iso) return '-';
  const d = new Date(iso);
  if (isNaN(d)) return '-';
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function isoToLocalInput(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d)) return '';
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

export function localInputToIso(v) {
  if (!v) return '';
  const d = new Date(v);
  return isNaN(d) ? '' : d.toISOString();
}
