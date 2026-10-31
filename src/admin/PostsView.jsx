'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { api, fmtDate } from './api';
import { Banner, Empty, Pagination, Spinner, useAdmin, useDebounced } from './ui';

const LIMIT = 20;

export function statusLabel(p) {
  if (p.status === 'published') {
    return p.published_at && new Date(p.published_at) > new Date() ? 'Scheduled' : 'Published';
  }
  return 'Draft';
}

export default function PostsView() {
  const { navigate, confirm, toast } = useAdmin();
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const dq = useDebounced(q);
  const reqId = useRef(0);

  const load = useCallback(async () => {
    const id = ++reqId.current;
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/posts', { q: dq.trim(), status, limit: LIMIT, offset });
      if (id !== reqId.current) return;
      setData(res);
    } catch (e) {
      if (id !== reqId.current || e.status === 401) return;
      setError(e.message);
    } finally {
      if (id === reqId.current) setLoading(false);
    }
  }, [dq, status, offset]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setOffset(0); }, [dq, status]);

  const remove = async (p) => {
    const ok = await confirm({
      title: 'Delete post?',
      message: `"${p.title}" will be permanently deleted. This cannot be undone.`,
      confirmLabel: 'Delete',
      danger: true,
    });
    if (!ok) return;
    try {
      await api.del('/posts', { id: p.id });
      toast('Post deleted.', 'success');
      if (data && data.items.length === 1 && offset > 0) setOffset(Math.max(0, offset - LIMIT));
      else load();
    } catch (e) {
      if (e.status !== 401) toast(e.message, 'error');
    }
  };

  const items = data ? data.items : [];

  return (
    <section aria-labelledby="ad-h-posts">
      <div className="ad-head">
        <h1 id="ad-h-posts" className="ad-title">Posts</h1>
        <button type="button" className="ad-btn ad-btn--primary" onClick={() => navigate({ name: 'post', id: null })}>New post</button>
      </div>

      <div className="ad-filters">
        <label className="ad-sr" htmlFor="ad-post-search">Search posts</label>
        <input id="ad-post-search" className="ad-input" type="search" placeholder="Search by title or text" value={q} onChange={(e) => setQ(e.target.value)} />
        <label className="ad-sr" htmlFor="ad-post-status">Filter by status</label>
        <select id="ad-post-status" className="ad-input ad-select" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <Banner onRetry={load}>{error}</Banner>

      {loading && !data ? <Spinner /> : null}

      {data && !items.length && !error && (
        <Empty>{dq || status ? 'No posts match your filters.' : 'No posts yet. Click "New post" to write your first one.'}</Empty>
      )}

      {items.length > 0 && (
        <div className={`ad-card ad-tablewrap${loading ? ' is-loading' : ''}`}>
          <table className="ad-table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Category</th>
                <th scope="col">Layout</th>
                <th scope="col">Status</th>
                <th scope="col">Flags</th>
                <th scope="col">Published</th>
                <th scope="col"><span className="ad-sr">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id}>
                  <td data-label="Title" className="ad-td-title">
                    <button type="button" className="ad-link-btn ad-post-link" onClick={() => navigate({ name: 'post', id: p.id })}>{p.title}</button>
                    <span className="ad-slug">/{p.slug}</span>
                  </td>
                  <td data-label="Category">{p.category}</td>
                  <td data-label="Layout">Style {(p.layout || 'style1').slice(5)}</td>
                  <td data-label="Status"><span className={`ad-badge ad-badge--${statusLabel(p).toLowerCase()}`}>{statusLabel(p)}</span></td>
                  <td data-label="Flags">
                    {p.is_featured && <span className="ad-badge ad-badge--flag">Featured</span>}{' '}
                    {p.is_trending && <span className="ad-badge ad-badge--flag">Trending</span>}
                    {!p.is_featured && !p.is_trending && <span className="ad-muted">-</span>}
                  </td>
                  <td data-label="Published">{fmtDate(p.published_at)}</td>
                  <td className="ad-actions">
                    <button type="button" className="ad-btn ad-btn--ghost ad-btn--sm" onClick={() => navigate({ name: 'post', id: p.id })}>Edit</button>
                    {p.status === 'published' && (
                      <a className="ad-btn ad-btn--ghost ad-btn--sm" href={`/blogs/${encodeURIComponent(p.slug)}/`} target="_blank" rel="noopener noreferrer">View</a>
                    )}
                    <button type="button" className="ad-btn ad-btn--ghost ad-btn--sm ad-btn--dangertxt" onClick={() => remove(p)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data && <Pagination total={data.total} limit={LIMIT} offset={offset} onChange={setOffset} disabled={loading} />}
    </section>
  );
}
