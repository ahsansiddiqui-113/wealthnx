'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { api, isYoutubeUrl, youtubeId } from './api';
import { Banner, Empty, Field, ImageField, Modal, Pagination, Spinner, useAdmin } from './ui';

const LIMIT = 20;
const BLANK = { title: '', url: '', thumbnail: '', description: '', duration: '', is_featured: false, sort_order: '0', status: 'draft' };

function VideoModal({ video, onClose, onSaved }) {
  const { toast } = useAdmin();
  const [f, setF] = useState(() => (video ? {
    title: video.title || '', url: video.url || '', thumbnail: video.thumbnail || '', description: video.description || '',
    duration: video.duration || '', is_featured: !!video.is_featured, sort_order: String(video.sort_order ?? 0), status: video.status === 'published' ? 'published' : 'draft',
  } : BLANK));
  const [errors, setErrors] = useState({});
  const [banner, setBanner] = useState('');
  const [saving, setSaving] = useState(false);
  const savingRef = useRef(false);
  const set = (patch) => setF((x) => ({ ...x, ...patch }));
  const setThumb = useCallback((thumbnail) => setF((x) => ({ ...x, thumbnail })), []);

  const autoThumb = () => {
    const id = youtubeId(f.url);
    if (!id) { setErrors((e) => ({ ...e, url: 'Enter a valid YouTube URL first.' })); return; }
    set({ thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg` });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (savingRef.current) return;
    const errs = {};
    if (!f.title.trim()) errs.title = 'Title is required.';
    if (!isYoutubeUrl(f.url)) errs.url = 'Enter a YouTube link (youtube.com, youtu.be or youtube-nocookie.com).';
    if (f.duration && !/^(\d{1,2}:)?\d{1,2}:\d{2}$/.test(f.duration.trim())) errs.duration = 'Use a format like 5:24 or 1:02:10.';
    if (f.sort_order && !/^-?\d+$/.test(f.sort_order.trim())) errs.sort_order = 'Whole number only.';
    if (f.description.length > 1000) errs.description = 'Description must be at most 1000 characters.';
    setErrors(errs);
    if (Object.keys(errs).length) { setBanner('Please fix the highlighted fields.'); return; }
    setBanner('');
    const body = {
      title: f.title.trim(), url: f.url.trim(), thumbnail: f.thumbnail || '', description: f.description.trim(),
      duration: f.duration.trim(), is_featured: f.is_featured, sort_order: parseInt(f.sort_order || '0', 10) || 0, status: f.status,
    };
    savingRef.current = true;
    setSaving(true);
    try {
      if (video) await api.put('/videos', { id: video.id, ...body });
      else await api.post('/videos', body);
      toast(video ? 'Video updated.' : 'Video added.', 'success');
      onSaved();
    } catch (err) {
      if (err.status !== 401) setBanner(err.message);
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  };

  return (
    <Modal title={video ? 'Edit video' : 'New video'} onClose={saving ? () => {} : onClose} wide labelId="ad-video-title">
      <form onSubmit={submit} noValidate>
        <Banner>{banner}</Banner>
        <Field label="Title" htmlFor="ad-v-title" error={errors.title}>
          <input id="ad-v-title" className="ad-input" data-autofocus value={f.title} onChange={(e) => set({ title: e.target.value })} maxLength={200} />
        </Field>
        <Field label="YouTube URL" htmlFor="ad-v-url" error={errors.url}>
          <input id="ad-v-url" className="ad-input" type="url" placeholder="https://www.youtube.com/watch?v=..." value={f.url} onChange={(e) => set({ url: e.target.value })} />
        </Field>
        <div className="ad-field">
          <ImageField id="ad-v-thumb" label="Thumbnail (optional)" value={f.thumbnail} onChange={setThumb} />
          <button type="button" className="ad-btn ad-btn--ghost ad-btn--sm" onClick={autoThumb}>Use YouTube thumbnail</button>
        </div>
        <Field label="Description" htmlFor="ad-v-desc" error={errors.description} hint={`${f.description.length}/1000`}>
          <textarea id="ad-v-desc" className="ad-input ad-textarea" rows={3} maxLength={1000} value={f.description} onChange={(e) => set({ description: e.target.value })} />
        </Field>
        <div className="ad-row3">
          <Field label="Duration" htmlFor="ad-v-dur" error={errors.duration} hint="e.g. 5:24">
            <input id="ad-v-dur" className="ad-input" value={f.duration} onChange={(e) => set({ duration: e.target.value })} maxLength={10} />
          </Field>
          <Field label="Sort order" htmlFor="ad-v-sort" error={errors.sort_order} hint="Lower first">
            <input id="ad-v-sort" className="ad-input" inputMode="numeric" value={f.sort_order} onChange={(e) => set({ sort_order: e.target.value })} />
          </Field>
          <Field label="Status" htmlFor="ad-v-status">
            <select id="ad-v-status" className="ad-input ad-select" value={f.status} onChange={(e) => set({ status: e.target.value })}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>
        </div>
        <label className="ad-check">
          <input type="checkbox" checked={f.is_featured} onChange={(e) => set({ is_featured: e.target.checked })} />
          <span>Featured video (big player, only one)</span>
        </label>
        <div className="ad-modal-actions">
          <button type="button" className="ad-btn ad-btn--ghost" onClick={onClose} disabled={saving}>Cancel</button>
          <button type="submit" className="ad-btn ad-btn--primary" disabled={saving}>{saving ? 'Saving...' : 'Save video'}</button>
        </div>
      </form>
    </Modal>
  );
}

export default function VideosView() {
  const { confirm, toast } = useAdmin();
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // null | 'new' | video
  const reqId = useRef(0);

  const load = useCallback(async () => {
    const id = ++reqId.current;
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/videos', { limit: LIMIT, offset });
      if (id === reqId.current) setData(res);
    } catch (e) {
      if (id === reqId.current && e.status !== 401) setError(e.message);
    } finally {
      if (id === reqId.current) setLoading(false);
    }
  }, [offset]);

  useEffect(() => { load(); }, [load]);

  const remove = async (v) => {
    const ok = await confirm({ title: 'Delete video?', message: `"${v.title}" will be permanently deleted.`, confirmLabel: 'Delete', danger: true });
    if (!ok) return;
    try {
      await api.del('/videos', { id: v.id });
      toast('Video deleted.', 'success');
      if (data && data.items.length === 1 && offset > 0) setOffset(Math.max(0, offset - LIMIT));
      else load();
    } catch (e) {
      if (e.status !== 401) toast(e.message, 'error');
    }
  };

  const items = data ? data.items : [];

  return (
    <section aria-labelledby="ad-h-videos">
      <div className="ad-head">
        <h1 id="ad-h-videos" className="ad-title">Videos</h1>
        <button type="button" className="ad-btn ad-btn--primary" onClick={() => setEditing('new')}>New video</button>
      </div>
      <Banner onRetry={load}>{error}</Banner>
      {loading && !data ? <Spinner /> : null}
      {data && !items.length && !error && <Empty>No videos yet. Click "New video" to add a YouTube video.</Empty>}
      {items.length > 0 && (
        <div className={`ad-card ad-tablewrap${loading ? ' is-loading' : ''}`}>
          <table className="ad-table">
            <thead>
              <tr>
                <th scope="col">Video</th>
                <th scope="col">Duration</th>
                <th scope="col">Status</th>
                <th scope="col">Order</th>
                <th scope="col"><span className="ad-sr">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {items.map((v) => (
                <tr key={v.id}>
                  <td data-label="Video" className="ad-td-title">
                    <div className="ad-vrow">
                      {v.thumbnail ? /* eslint-disable-next-line @next/next/no-img-element */ <img className="ad-vthumb" src={v.thumbnail} alt="" /> : <span className="ad-vthumb ad-vthumb--none" aria-hidden="true" />}
                      <div>
                        <button type="button" className="ad-link-btn ad-post-link" onClick={() => setEditing(v)}>{v.title}</button>
                        {v.is_featured && <span className="ad-badge ad-badge--flag">Featured</span>}
                      </div>
                    </div>
                  </td>
                  <td data-label="Duration">{v.duration || '-'}</td>
                  <td data-label="Status"><span className={`ad-badge ad-badge--${v.status === 'published' ? 'published' : 'draft'}`}>{v.status === 'published' ? 'Published' : 'Draft'}</span></td>
                  <td data-label="Order">{v.sort_order}</td>
                  <td className="ad-actions">
                    <button type="button" className="ad-btn ad-btn--ghost ad-btn--sm" onClick={() => setEditing(v)}>Edit</button>
                    <button type="button" className="ad-btn ad-btn--ghost ad-btn--sm ad-btn--dangertxt" onClick={() => remove(v)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {data && <Pagination total={data.total} limit={LIMIT} offset={offset} onChange={setOffset} disabled={loading} />}
      {editing && (
        <VideoModal
          video={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); load(); }}
        />
      )}
    </section>
  );
}
