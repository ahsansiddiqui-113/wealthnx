'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { api, isoToLocalInput, localInputToIso, slugify } from './api';
import { plainTextLength } from './sanitize';
import RichEditor from './RichEditor';
import { Banner, Field, ImageField, Spinner, useAdmin } from './ui';

const EMPTY = {
  layout: 'style1', title: '', slug: '', excerpt: '', category: '', author: 'WealthNX Team', read_minutes: '',
  status: 'draft', published_at: '', is_featured: false, is_trending: false, cover_image: '', content: '',
};

// hero: c = centered + wide cover, s = split header, n = none. side: toc = contents sidebar, rel = related column.
const LAYOUTS = [
  { id: 'style1', name: 'Style 1 - Cover + contents sidebar', hero: 'c', side: 'toc', cover: 'Wide image about 2:1 (e.g. 2880 x 1380). A 16:9 image is cropped at top and bottom.', hint: 'The "In this article" list is built from your H2 headings. Share buttons and the trial card appear automatically.' },
  { id: 'style2', name: 'Style 2 - Cover, single column', hero: 'c', side: null, cover: 'Wide image about 2:1 (e.g. 2880 x 1380). A 16:9 image is cropped at top and bottom.', hint: 'No sidebar: the text uses the full width.' },
  { id: 'style3', name: 'Style 3 - Split header + contents sidebar', hero: 's', side: 'toc', cover: '16:9 image (1600 x 900).', hint: 'The "In this article" list is built from your H2 headings. Good for posts with a video, tip and author box.' },
  { id: 'style4', name: 'Style 4 - Text + related articles', hero: 'n', side: 'rel', cover: 'Not shown on the article page in this layout. Still used on blog cards and social previews.', hint: 'No cover on the page. Related articles appear on the right automatically.' },
  { id: 'style5', name: 'Style 5 - Split header, single column', hero: 's', side: null, cover: '16:9 image (1600 x 900).', hint: 'No sidebar: the text uses the full width.' },
];

function LayoutThumb({ hero, side }) {
  const y = hero === 'c' ? 27 : hero === 's' ? 23 : 17;
  return (
    <svg viewBox="0 0 60 44" width="60" height="44" aria-hidden="true" focusable="false">
      <rect width="60" height="44" rx="3" fill="#fff" stroke="#d8e2df" />
      {hero === 'c' && <><rect x="18" y="4" width="24" height="2" fill="#555" /><rect x="14" y="8" width="32" height="2" fill="#555" /><rect x="6" y="13" width="48" height="10" rx="2" fill="#1fb9a6" /></>}
      {hero === 's' && <><rect x="1" y="1" width="58" height="19" fill="#e9eff0" /><rect x="5" y="5" width="22" height="2" fill="#555" /><rect x="5" y="9" width="26" height="2" fill="#555" /><rect x="5" y="13" width="18" height="2" fill="#555" /><rect x="34" y="4" width="22" height="12" rx="2" fill="#1fb9a6" /></>}
      {hero === 'n' && <><rect x="5" y="4" width="30" height="2" fill="#555" /><rect x="5" y="8" width="36" height="2" fill="#555" /><rect x="5" y="12" width="22" height="2" fill="#555" /></>}
      {side === 'toc' && <rect x="5" y={y} width="12" height="14" rx="2" fill="#b5e5df" />}
      {side === 'rel' && <rect x="43" y="4" width="12" height="36" rx="2" fill="#b5e5df" />}
      {[0, 4, 8, 12].map((d) => <rect key={d} x={side === 'toc' ? 21 : 5} y={y + d} width={side === 'toc' ? 33 : side === 'rel' ? 34 : 50} height="2" fill="#bbb" />)}
    </svg>
  );
}

function toForm(p) {
  return {
    layout: LAYOUTS.some((l) => l.id === p.layout) ? p.layout : 'style1',
    title: p.title || '',
    slug: p.slug || '',
    excerpt: p.excerpt || '',
    category: p.category || '',
    author: p.author || 'WealthNX Team',
    read_minutes: p.read_minutes ? String(p.read_minutes) : '',
    status: p.status === 'published' ? 'published' : 'draft',
    published_at: isoToLocalInput(p.published_at),
    is_featured: !!p.is_featured,
    is_trending: !!p.is_trending,
    cover_image: p.cover_image || '',
    content: p.content || '',
  };
}

export default function PostEditor({ id }) {
  const { navigate, toast, setDirty } = useAdmin();
  const [postId, setPostId] = useState(id);
  const [form, setForm] = useState(EMPTY);
  const [snapshot, setSnapshot] = useState(JSON.stringify(EMPTY));
  const [loading, setLoading] = useState(!!id);
  const [loadError, setLoadError] = useState('');
  const [saving, setSaving] = useState(false);
  const [banner, setBanner] = useState('');
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const savingRef = useRef(false);

  const set = useCallback((patch) => setForm((f) => ({ ...f, ...patch })), []);
  const setContent = useCallback((content) => setForm((f) => ({ ...f, content })), []);
  const setCover = useCallback((cover_image) => setForm((f) => ({ ...f, cover_image })), []);

  const loadPost = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setLoadError('');
    try {
      const p = await api.get('/post', { id });
      const f = toForm(p);
      setForm(f);
      setSnapshot(JSON.stringify(f));
    } catch (e) {
      if (e.status !== 401) setLoadError(e.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { loadPost(); }, [loadPost]);

  useEffect(() => {
    let alive = true;
    api.get('/posts', { limit: 50 }).then((r) => {
      if (!alive) return;
      setCategories([...new Set(r.items.map((p) => p.category).filter(Boolean))].sort());
    }).catch(() => {});
    return () => { alive = false; };
  }, []);

  const dirty = JSON.stringify(form) !== snapshot;
  useEffect(() => { setDirty(dirty); }, [dirty, setDirty]);
  useEffect(() => () => setDirty(false), [setDirty]);

  const slugPreview = form.slug || slugify(form.title);
  const words = useMemo(() => form.content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length, [form.content]);

  const save = async (status) => {
    if (savingRef.current) return; // block duplicate saves
    setBanner('');
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required.';
    if (form.title.length > 200) errs.title = 'Title must be at most 200 characters.';
    if (form.excerpt.length > 1000) errs.excerpt = 'Excerpt must be at most 1000 characters.';
    if (form.category.length > 60) errs.category = 'Category must be at most 60 characters.';
    if (form.read_minutes && !/^\d{1,3}$/.test(form.read_minutes)) errs.read_minutes = 'Use a whole number between 1 and 999.';
    if (status === 'published' && plainTextLength(form.content) === 0) errs.content = 'Write some content before publishing.';
    setErrors(errs);
    if (Object.keys(errs).length) {
      setBanner('Please fix the highlighted fields.');
      return;
    }
    const body = {
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content,
      category: form.category.trim(),
      layout: form.layout,
      author: form.author.trim(),
      cover_image: form.cover_image || '',
      read_minutes: form.read_minutes || '',
      status,
      is_featured: form.is_featured,
      is_trending: form.is_trending,
    };
    const slug = slugify(form.slug);
    if (slug) body.slug = slug;
    const iso = localInputToIso(form.published_at);
    if (iso) body.published_at = iso;

    savingRef.current = true;
    setSaving(true);
    try {
      const res = postId ? await api.put('/posts', { id: postId, ...body }) : await api.post('/posts', body);
      const f = toForm(res);
      setForm(f);
      setSnapshot(JSON.stringify(f));
      setPostId(res.id);
      setErrors({});
      toast(status === 'published' ? 'Post published.' : 'Draft saved.', 'success');
    } catch (e) {
      if (e.status === 401) return;
      if (e.status === 409) setErrors({ slug: e.message });
      else if (/^title/i.test(e.message)) setErrors({ title: e.message });
      else if (/^excerpt/i.test(e.message)) setErrors({ excerpt: e.message });
      else if (/^category/i.test(e.message)) setErrors({ category: e.message });
      else if (/^read_minutes/i.test(e.message)) setErrors({ read_minutes: e.message });
      else if (/^cover/i.test(e.message)) setErrors({ cover: e.message });
      setBanner(e.message);
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  };

  if (loading) return <Spinner label="Loading post" />;
  if (loadError) {
    return (
      <div>
        <Banner onRetry={loadPost}>{loadError}</Banner>
        <button type="button" className="ad-btn ad-btn--ghost" onClick={() => navigate({ name: 'posts' })}>Back to posts</button>
      </div>
    );
  }

  const isPublished = form.status === 'published';
  const lay = LAYOUTS.find((l) => l.id === form.layout) || LAYOUTS[0];

  return (
    <form className="ad-editor-page" onSubmit={(e) => { e.preventDefault(); save(isPublished ? 'published' : 'draft'); }} noValidate>
      <div className="ad-head ad-head--sticky">
        <div className="ad-head-l">
          <button type="button" className="ad-btn ad-btn--ghost ad-btn--sm" onClick={() => navigate({ name: 'posts' })}>&larr; Posts</button>
          <h1 className="ad-title">{postId ? 'Edit post' : 'New post'}{dirty && <span className="ad-dirty" title="Unsaved changes"> (unsaved)</span>}</h1>
        </div>
        <div className="ad-head-r">
          {isPublished ? (
            <>
              <button type="button" className="ad-btn ad-btn--ghost" disabled={saving} onClick={() => save('draft')}>Revert to draft</button>
              <button type="button" className="ad-btn ad-btn--primary" disabled={saving} onClick={() => save('published')}>{saving ? 'Saving...' : 'Update'}</button>
            </>
          ) : (
            <>
              <button type="button" className="ad-btn ad-btn--ghost" disabled={saving} onClick={() => save('draft')}>{saving ? 'Saving...' : 'Save draft'}</button>
              <button type="button" className="ad-btn ad-btn--primary" disabled={saving} onClick={() => save('published')}>Publish</button>
            </>
          )}
        </div>
      </div>

      <Banner>{banner}</Banner>

      <div className="ad-edit-grid">
        <div className="ad-edit-main">
          <div className="ad-card ad-card--pad">
            <Field label="Title" htmlFor="ad-f-title" error={errors.title}>
              <input id="ad-f-title" className="ad-input ad-input--lg" type="text" maxLength={200} value={form.title} onChange={(e) => set({ title: e.target.value })} aria-invalid={!!errors.title} required />
            </Field>
            <Field label="Slug" htmlFor="ad-f-slug" error={errors.slug} hint={`Public URL: /blogs/${slugPreview || '...'}/ (leave empty to generate from the title)`}>
              <input id="ad-f-slug" className="ad-input" type="text" value={form.slug} placeholder={slugify(form.title) || 'auto-generated'} onChange={(e) => set({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-') })} />
            </Field>
            <Field label="Excerpt" htmlFor="ad-f-excerpt" error={errors.excerpt} hint={`${form.excerpt.length}/1000 characters. Shown on cards; if empty it is created from the content on first save.`}>
              <textarea id="ad-f-excerpt" className="ad-input ad-textarea" rows={3} maxLength={1000} value={form.excerpt} onChange={(e) => set({ excerpt: e.target.value })} />
            </Field>
          </div>

          <div className="ad-card ad-card--pad">
            <span className="ad-label" id="ad-f-content-l">Content <small className="ad-muted">({words} words)</small></span>
            <RichEditor value={form.content} onChange={setContent} invalid={!!errors.content} describedBy="ad-f-content-l" />
            {errors.content && <p className="ad-field-error" role="alert">{errors.content}</p>}
          </div>
        </div>

        <aside className="ad-edit-side">
          <div className="ad-card ad-card--pad">
            <h2 className="ad-side-h">Layout / Style</h2>
            <div className="ad-layouts" role="radiogroup" aria-label="Article layout">
              {LAYOUTS.map((l) => (
                <label key={l.id} className={`ad-layout${form.layout === l.id ? ' is-on' : ''}`}>
                  <input type="radio" name="ad-layout" className="ad-sr" checked={form.layout === l.id} onChange={() => set({ layout: l.id })} />
                  <LayoutThumb hero={l.hero} side={l.side} />
                  <span>{l.name}</span>
                </label>
              ))}
            </div>
            <p className="ad-hint">{lay.hint}</p>
            <p className="ad-hint">Tip: put the author name in an Author box (Insert block) if you want one shown in the article.</p>
          </div>

          <div className="ad-card ad-card--pad">
            <h2 className="ad-side-h">Publishing</h2>
            <div className="ad-field">
              <span className="ad-label">Status</span>
              <div><span className={`ad-badge ad-badge--${isPublished ? 'published' : 'draft'}`}>{isPublished ? 'Published' : 'Draft'}</span></div>
            </div>
            <Field label="Publish date" htmlFor="ad-f-date" hint="Your local time. Empty = now when you publish. A future date schedules the post.">
              <input id="ad-f-date" className="ad-input" type="datetime-local" value={form.published_at} onChange={(e) => set({ published_at: e.target.value })} />
            </Field>
            <label className="ad-check">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => set({ is_featured: e.target.checked })} />
              <span>Featured (big Trending card, only one)</span>
            </label>
            <label className="ad-check">
              <input type="checkbox" checked={form.is_trending} onChange={(e) => set({ is_trending: e.target.checked })} />
              <span>Trending</span>
            </label>
            <p className="ad-hint">Use the buttons at the top: Save draft keeps the post private, Publish / Update makes it live on /blogs/.</p>
          </div>

          <div className="ad-card ad-card--pad">
            <h2 className="ad-side-h">Details</h2>
            <Field label="Category" htmlFor="ad-f-cat" error={errors.category}>
              <input id="ad-f-cat" className="ad-input" type="text" list="ad-cats" maxLength={60} value={form.category} placeholder="General" onChange={(e) => set({ category: e.target.value })} />
              <datalist id="ad-cats">{categories.map((c) => <option key={c} value={c} />)}</datalist>
            </Field>
            <Field label="Author" htmlFor="ad-f-author">
              <input id="ad-f-author" className="ad-input" type="text" maxLength={100} value={form.author} onChange={(e) => set({ author: e.target.value })} />
            </Field>
            <Field label="Read minutes" htmlFor="ad-f-read" error={errors.read_minutes} hint="Auto if empty.">
              <input id="ad-f-read" className="ad-input" type="number" inputMode="numeric" min="1" max="999" value={form.read_minutes} onChange={(e) => set({ read_minutes: e.target.value })} />
            </Field>
          </div>

          <div className="ad-card ad-card--pad">
            <h2 className="ad-side-h">Cover image</h2>
            <ImageField id="ad-f-cover" label="" value={form.cover_image} onChange={setCover} hint={lay.cover} />
            {errors.cover && <p className="ad-field-error" role="alert">{errors.cover}</p>}
          </div>
        </aside>
      </div>
    </form>
  );
}
