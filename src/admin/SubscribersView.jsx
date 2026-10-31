'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { api, downloadSubscribersCsv, fmtDate } from './api';
import { Banner, Empty, Pagination, Spinner, useAdmin } from './ui';

const LIMIT = 50;

export default function SubscribersView() {
  const { confirm, toast } = useAdmin();
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [q, setQ] = useState('');
  const [exporting, setExporting] = useState(false);
  const reqId = useRef(0);

  const load = useCallback(async () => {
    const id = ++reqId.current;
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/subscribers', { limit: LIMIT, offset });
      if (id === reqId.current) setData(res);
    } catch (e) {
      if (id === reqId.current && e.status !== 401) setError(e.message);
    } finally {
      if (id === reqId.current) setLoading(false);
    }
  }, [offset]);

  useEffect(() => { load(); }, [load]);

  const items = useMemo(() => {
    const all = data ? data.items : [];
    const s = q.trim().toLowerCase();
    return s ? all.filter((r) => String(r.email).toLowerCase().includes(s)) : all;
  }, [data, q]);

  const remove = async (r) => {
    const ok = await confirm({ title: 'Delete subscriber?', message: `${r.email} will be removed from the list.`, confirmLabel: 'Delete', danger: true });
    if (!ok) return;
    try {
      await api.del('/subscribers', { id: r.id });
      toast('Subscriber deleted.', 'success');
      if (data && data.items.length === 1 && offset > 0) setOffset(Math.max(0, offset - LIMIT));
      else load();
    } catch (e) {
      if (e.status !== 401) toast(e.message, 'error');
    }
  };

  const exportCsv = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      await downloadSubscribersCsv();
      toast('CSV downloaded.', 'success');
    } catch (e) {
      if (e.status !== 401) toast(e.message, 'error');
    } finally {
      setExporting(false);
    }
  };

  return (
    <section aria-labelledby="ad-h-subs">
      <div className="ad-head">
        <h1 id="ad-h-subs" className="ad-title">Subscribers{data ? <span className="ad-count"> ({data.total})</span> : null}</h1>
        <button type="button" className="ad-btn ad-btn--ghost" onClick={exportCsv} disabled={exporting}>{exporting ? 'Exporting...' : 'Export CSV'}</button>
      </div>
      <div className="ad-filters">
        <label className="ad-sr" htmlFor="ad-sub-search">Search the loaded page by email</label>
        <input id="ad-sub-search" className="ad-input" type="search" placeholder="Search this page by email" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <Banner onRetry={load}>{error}</Banner>
      {loading && !data ? <Spinner /> : null}
      {data && !data.items.length && !error && <Empty>No subscribers yet.</Empty>}
      {data && data.items.length > 0 && !items.length && <Empty>No subscribers on this page match your search.</Empty>}
      {items.length > 0 && (
        <div className={`ad-card ad-tablewrap${loading ? ' is-loading' : ''}`}>
          <table className="ad-table">
            <thead>
              <tr>
                <th scope="col">Email</th>
                <th scope="col">Source</th>
                <th scope="col">Date</th>
                <th scope="col"><span className="ad-sr">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id}>
                  <td data-label="Email" className="ad-td-title">{r.email}{r.unsubscribed_at ? <span className="ad-badge ad-badge--draft">Unsubscribed</span> : null}</td>
                  <td data-label="Source">{r.source || '-'}</td>
                  <td data-label="Date">{fmtDate(r.created_at)}</td>
                  <td className="ad-actions">
                    <button type="button" className="ad-btn ad-btn--ghost ad-btn--sm ad-btn--dangertxt" onClick={() => remove(r)}>Delete</button>
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
