'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import BlogsCard from './BlogsCard';
import { getPosts } from './blogApi';

const PAGE = 9;
const Search = () => <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>;

export default function BlogsArticles() {
  const [category, setCategory] = useState('');
  const [input, setInput] = useState('');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('newest');
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const reqId = useRef(0);

  useEffect(() => { const t = setTimeout(() => setQ(input.trim()), 250); return () => clearTimeout(t); }, [input]);

  useEffect(() => {
    const id = ++reqId.current;
    getPosts({ category, q, sort, limit: PAGE, offset: 0 }).then((d) => {
      if (id !== reqId.current) return;
      setItems(d.items); setTotal(d.total); setLoaded(true);
      if (Array.isArray(d.categories)) setCategories(d.categories);
    });
  }, [category, q, sort]);

  const more = useCallback(() => {
    const id = ++reqId.current;
    getPosts({ category, q, sort, limit: PAGE, offset: items.length }).then((d) => {
      if (id !== reqId.current) return;
      setItems((cur) => [...cur, ...d.items]); setTotal(d.total);
    });
  }, [category, q, sort, items.length]);

  const chips = ['', ...(categories || [])];
  return (
    <section className="bl-art" aria-labelledby="bl-art-title">
      <div className="bl-c">
        <h2 id="bl-art-title" className="bl-h2">All articles</h2>
        <p className="bl-art__sub">Guides on budgeting, net worth, investing and staying in control of your money.</p>
        <div className="bl-art__bar">
          <div className="bl-chips">
            {chips.map((c) => (
              <button key={c || 'all'} type="button" className={`bl-fchip${category === c ? ' is-on' : ''}`} aria-pressed={category === c} onClick={() => setCategory(c)}>{c || 'All'}</button>
            ))}
          </div>
          <div className="bl-tools">
            <label className="bl-search"><Search /><input type="search" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search articles" aria-label="Search articles" /></label>
            <select className="bl-sort" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort articles">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
        {loaded && (total > 0 || category || q) && <p className="bl-art__count" aria-live="polite">Showing {items.length} of {total} articles</p>}
        <div className="bl-grid bl-row">
          {items.map((p) => <BlogsCard key={p.id} post={p} />)}
        </div>
        {loaded && items.length === 0 && <p className="bl-empty">{category || q ? 'No articles found.' : 'No articles yet.'}</p>}
        {items.length < total && <div className="bl-more"><button type="button" className="bl-btn" onClick={more}>Load More</button></div>}
      </div>
    </section>
  );
}
