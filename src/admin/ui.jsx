'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { uploadImage, validateImage } from './api';

export const AdminCtx = createContext(null);
export const useAdmin = () => useContext(AdminCtx);

/* ---------- Toasts ---------- */
export function Toasts({ items, dismiss }) {
  return (
    <div className="ad-toasts" role="status" aria-live="polite" aria-atomic="false">
      {items.map((t) => (
        <div key={t.id} className={`ad-toast ad-toast--${t.type}`}>
          <span>{t.message}</span>
          <button type="button" className="ad-toast-x" aria-label="Dismiss" onClick={() => dismiss(t.id)}>&times;</button>
        </div>
      ))}
    </div>
  );
}

/* ---------- Confirm dialog ---------- */
export function Modal({ title, onClose, children, wide, labelId = 'ad-modal-title' }) {
  const ref = useRef(null);
  const prev = useRef(null);
  useEffect(() => {
    prev.current = document.activeElement;
    const node = ref.current;
    const focusable = node.querySelector('[data-autofocus]') || node.querySelector('input,select,textarea,button');
    if (focusable) focusable.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); onClose(); return; }
      if (e.key === 'Tab') {
        const els = node.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])');
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      if (prev.current && prev.current.focus) prev.current.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="ad-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={ref} className={`ad-modal${wide ? ' ad-modal--wide' : ''}`} role="dialog" aria-modal="true" aria-labelledby={labelId}>
        <h2 id={labelId} className="ad-modal-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export function ConfirmDialog({ opts, onResult }) {
  return (
    <Modal title={opts.title} onClose={() => onResult(false)} labelId="ad-confirm-title">
      <p className="ad-modal-text">{opts.message}</p>
      <div className="ad-modal-actions">
        <button type="button" className="ad-btn ad-btn--ghost" data-autofocus onClick={() => onResult(false)}>{opts.cancelLabel || 'Cancel'}</button>
        <button type="button" className={`ad-btn ${opts.danger ? 'ad-btn--danger' : 'ad-btn--primary'}`} onClick={() => onResult(true)}>{opts.confirmLabel || 'Confirm'}</button>
      </div>
    </Modal>
  );
}

/* ---------- Small pieces ---------- */
export function Spinner({ label = 'Loading' }) {
  return <div className="ad-loading" role="status"><span className="ad-spinner" aria-hidden="true" />{label}...</div>;
}

export function Empty({ children }) {
  return <div className="ad-empty">{children}</div>;
}

export function Banner({ type = 'error', children, onRetry }) {
  if (!children) return null;
  return (
    <div className={`ad-banner ad-banner--${type}`} role={type === 'error' ? 'alert' : 'status'}>
      <span>{children}</span>
      {onRetry && <button type="button" className="ad-link-btn" onClick={onRetry}>Retry</button>}
    </div>
  );
}

export function Pagination({ total, limit, offset, onChange, disabled }) {
  if (!total) return null;
  const page = Math.floor(offset / limit) + 1;
  const pages = Math.max(1, Math.ceil(total / limit));
  const from = offset + 1;
  const to = Math.min(total, offset + limit);
  return (
    <nav className="ad-pager" aria-label="Pagination">
      <span className="ad-pager-info">{from}-{to} of {total}</span>
      <div className="ad-pager-btns">
        <button type="button" className="ad-btn ad-btn--ghost ad-btn--sm" disabled={disabled || page <= 1} onClick={() => onChange(Math.max(0, offset - limit))}>Previous</button>
        <span className="ad-pager-page">Page {page} / {pages}</span>
        <button type="button" className="ad-btn ad-btn--ghost ad-btn--sm" disabled={disabled || page >= pages} onClick={() => onChange(offset + limit)}>Next</button>
      </div>
    </nav>
  );
}

export function Field({ label, htmlFor, hint, error, children, className = '' }) {
  return (
    <div className={`ad-field ${className}`}>
      {label && <label className="ad-label" htmlFor={htmlFor}>{label}</label>}
      {children}
      {hint && !error && <p className="ad-hint">{hint}</p>}
      {error && <p className="ad-field-error" role="alert">{error}</p>}
    </div>
  );
}

export function useDebounced(value, ms = 350) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

/* ---------- Image upload field (file picker + drag & drop) ---------- */
export function ImageField({ id, value, onChange, label = 'Image', hint }) {
  const { toast } = useAdmin();
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState('');
  const input = useRef(null);
  const busyRef = useRef(false);

  const handle = useCallback(async (file) => {
    if (!file || busyRef.current) return;
    const bad = validateImage(file);
    if (bad) { setError(bad); return; }
    setError('');
    busyRef.current = true;
    setBusy(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
      toast('Image uploaded.', 'success');
    } catch (e) {
      if (e.status !== 401) setError(e.message);
    } finally {
      busyRef.current = false;
      setBusy(false);
      if (input.current) input.current.value = '';
    }
  }, [onChange, toast]);

  return (
    <Field label={label} htmlFor={id} hint={hint} error={error}>
      {value ? (
        <div className="ad-img-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" />
          <div className="ad-img-actions">
            <button type="button" className="ad-btn ad-btn--ghost ad-btn--sm" disabled={busy} onClick={() => input.current && input.current.click()}>{busy ? 'Uploading...' : 'Replace'}</button>
            <button type="button" className="ad-btn ad-btn--ghost ad-btn--sm" disabled={busy} onClick={() => onChange('')}>Remove</button>
          </div>
        </div>
      ) : (
        <div
          className={`ad-drop${drag ? ' is-drag' : ''}${busy ? ' is-busy' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files && e.dataTransfer.files[0]); }}
        >
          <span>{busy ? 'Uploading...' : 'Drag an image here or'}</span>
          <button type="button" className="ad-btn ad-btn--ghost ad-btn--sm" disabled={busy} onClick={() => input.current && input.current.click()}>Choose file</button>
          <small>JPEG, PNG, WebP or GIF, max 5 MB</small>
        </div>
      )}
      <input
        id={id}
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="ad-file"
        onChange={(e) => handle(e.target.files && e.target.files[0])}
      />
    </Field>
  );
}
