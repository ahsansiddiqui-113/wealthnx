'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './admin.css';
import { login, logout, me, setCsrf, setUnauthorizedHandler } from './api';
import { AdminCtx, ConfirmDialog, Spinner, Toasts } from './ui';
import PostsView from './PostsView';
import PostEditor from './PostEditor';
import VideosView from './VideosView';
import SubscribersView from './SubscribersView';

const NAV = [
  { name: 'posts', label: 'Posts' },
  { name: 'videos', label: 'Videos' },
  { name: 'subscribers', label: 'Subscribers' },
];

function LoginScreen({ notice, onLoggedIn, mock, initialEmail }) {
  const [email, setEmail] = useState(initialEmail || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  useEffect(() => {
    const el = initialEmail ? passRef.current : emailRef.current;
    if (el) el.focus();
  }, [initialEmail]);

  const submit = async (e) => {
    e.preventDefault();
    if (busyRef.current) return;
    setError('');
    if (!email.trim() || !password) { setError('Enter your email and password.'); return; }
    busyRef.current = true;
    setBusy(true);
    try {
      const res = await login(email.trim(), password);
      setPassword('');
      onLoggedIn(res.email || email.trim());
    } catch (err) {
      setError(err.message);
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  };

  return (
    <div className="ad-login">
      <form className="ad-login-card" onSubmit={submit} noValidate>
        <div className="ad-brand">WealthNX <span>Admin</span></div>
        <h1 className="ad-login-h">Sign in</h1>
        {notice && !error && <div className="ad-banner ad-banner--info" role="status">{notice}</div>}
        {error && <div className="ad-banner ad-banner--error" role="alert">{error}</div>}
        <div className="ad-field">
          <label className="ad-label" htmlFor="ad-login-email">Email</label>
          <input id="ad-login-email" ref={emailRef} className="ad-input" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="ad-field">
          <label className="ad-label" htmlFor="ad-login-pass">Password</label>
          <input id="ad-login-pass" ref={passRef} className="ad-input" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="ad-btn ad-btn--primary ad-btn--block" disabled={busy}>{busy ? 'Signing in...' : 'Sign in'}</button>
        {mock && <p className="ad-hint ad-mock-hint">Dev mock API: use any email and the password "demo".</p>}
      </form>
    </div>
  );
}

export default function AdminApp() {
  const [boot, setBoot] = useState('loading'); // loading | ready | unreachable
  const [mock, setMock] = useState(false);
  const [auth, setAuth] = useState({ email: '', loggedIn: false });
  const [notice, setNotice] = useState('');
  const [view, setView] = useState({ name: 'posts', id: null, key: 0 });
  const [toasts, setToasts] = useState([]);
  const [confirmState, setConfirmState] = useState(null);
  const [dirty, setDirtyState] = useState(false);
  const dirtyRef = useRef(false);
  const toastId = useRef(0);
  const keyRef = useRef(1);

  const setDirty = useCallback((v) => { dirtyRef.current = v; setDirtyState(v); }, []);

  const dismiss = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const toast = useCallback((message, type = 'info') => {
    const id = ++toastId.current;
    setToasts((t) => [...t.slice(-3), { id, message, type }]);
    setTimeout(() => dismiss(id), type === 'error' ? 7000 : 3500);
  }, [dismiss]);

  const confirm = useCallback((opts) => new Promise((resolve) => setConfirmState({ opts, resolve })), []);
  const settleConfirm = (v) => {
    if (confirmState) confirmState.resolve(v);
    setConfirmState(null);
  };

  // Bootstrap: dev-only mock detection, then restore the session.
  useEffect(() => {
    let alive = true;
    (async () => {
      const probe = async () => {
        try {
          const res = await fetch('/api/admin/me', { credentials: 'same-origin' });
          const json = (res.headers.get('content-type') || '').includes('application/json');
          return { res, json };
        } catch {
          return { res: null, json: false };
        }
      };
      let p = await probe();
      if (process.env.NODE_ENV !== 'production') {
        if (!p.json) {
          const m = await import('./devMock');
          m.install();
          if (alive) setMock(true);
          p = await probe();
        }
      }
      if (!alive) return;
      if (!p.res || !p.json) { setBoot('unreachable'); return; }
      if (p.res.status === 200) {
        try {
          const data = await p.res.json();
          setCsrf(data.csrf);
          setAuth({ email: data.email || '', loggedIn: true });
        } catch { /* fall through to login */ }
      } else if (p.res.status === 503) {
        setNotice('Admin is not configured.');
      }
      setBoot('ready');
    })();
    return () => { alive = false; };
  }, []);

  // Any 401 from an API call returns to the login screen (the editor stays mounted underneath so no work is lost).
  useEffect(() => {
    setUnauthorizedHandler(() => {
      setCsrf('');
      setNotice('Session expired.');
      setAuth((a) => ({ ...a, loggedIn: false }));
    });
    return () => setUnauthorizedHandler(null);
  }, []);

  // Warn before leaving the page with unsaved edits.
  useEffect(() => {
    if (!dirty) return undefined;
    const h = (e) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [dirty]);

  const navigate = useCallback(async (next) => {
    if (dirtyRef.current) {
      const ok = await confirm({
        title: 'Discard unsaved changes?',
        message: 'You have unsaved changes in this post. If you leave now they will be lost.',
        confirmLabel: 'Discard changes',
        cancelLabel: 'Keep editing',
        danger: true,
      });
      if (!ok) return;
      setDirty(false);
    }
    setView({ name: next.name, id: next.id || null, key: keyRef.current++ });
    window.scrollTo(0, 0);
  }, [confirm, setDirty]);

  const signOut = async () => {
    if (dirtyRef.current) {
      const ok = await confirm({ title: 'Sign out?', message: 'You have unsaved changes that will be lost.', confirmLabel: 'Sign out', danger: true });
      if (!ok) return;
      setDirty(false);
    }
    await logout();
    setNotice('');
    setAuth({ email: '', loggedIn: false });
    setView({ name: 'posts', id: null, key: keyRef.current++ });
  };

  const ctx = useMemo(() => ({ toast, confirm, navigate, setDirty }), [toast, confirm, navigate, setDirty]);

  const hasShell = !!auth.email; // keeps editor state alive underneath the login after "Session expired."

  return (
    <AdminCtx.Provider value={ctx}>
      <div className="ad-root">
        {boot === 'loading' && <div className="ad-center"><Spinner /></div>}

        {boot === 'unreachable' && (
          <div className="ad-center">
            <div className="ad-login-card">
              <div className="ad-brand">WealthNX <span>Admin</span></div>
              <div className="ad-banner ad-banner--error" role="alert">Cannot reach the admin API. Check your connection or that the server is configured, then reload.</div>
              <button type="button" className="ad-btn ad-btn--primary ad-btn--block" onClick={() => window.location.reload()}>Reload</button>
            </div>
          </div>
        )}

        {boot === 'ready' && (
          <>
            {mock && <div className="ad-mockbar" role="note">Dev mock API (no PHP) - data is in memory only</div>}

            {!auth.loggedIn && (
              <LoginScreen
                key={auth.email || 'fresh'}
                notice={notice}
                mock={mock}
                initialEmail={auth.email}
                onLoggedIn={(email) => { setNotice(''); setAuth({ email, loggedIn: true }); }}
              />
            )}

            {hasShell && (
              <div className="ad-shell" hidden={!auth.loggedIn}>
                <aside className="ad-side" aria-label="Admin navigation">
                  <div className="ad-brand ad-brand--side">WealthNX <span>Admin</span></div>
                  <nav className="ad-nav">
                    {NAV.map((n) => {
                      const on = view.name === n.name || (n.name === 'posts' && view.name === 'post');
                      return (
                        <button key={n.name} type="button" className={`ad-nav-item${on ? ' is-on' : ''}`} aria-current={on ? 'page' : undefined} onClick={() => navigate({ name: n.name })}>{n.label}</button>
                      );
                    })}
                    <button type="button" className="ad-nav-item ad-nav-item--out" onClick={signOut}>Sign out</button>
                  </nav>
                </aside>
                <div className="ad-main">
                  <header className="ad-top">
                    <span className="ad-top-label">Signed in as</span>
                    <strong className="ad-top-email">{auth.email}</strong>
                  </header>
                  <div className="ad-content">
                    {view.name === 'posts' && <PostsView key={view.key} />}
                    {view.name === 'post' && <PostEditor key={view.key} id={view.id} />}
                    {view.name === 'videos' && <VideosView key={view.key} />}
                    {view.name === 'subscribers' && <SubscribersView key={view.key} />}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {confirmState && <ConfirmDialog opts={confirmState.opts} onResult={settleConfirm} />}
        <Toasts items={toasts} dismiss={dismiss} />
      </div>
    </AdminCtx.Provider>
  );
}
