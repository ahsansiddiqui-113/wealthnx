'use client';

import React, { useEffect, useState } from 'react';
import BlogsCard from './BlogsCard';
import { getTrending, formatDate } from './blogApi';

const Arrow = () => <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

export default function BlogsTrending() {
  const [data, setData] = useState(null);
  useEffect(() => { let on = true; getTrending().then((d) => on && setData(d)); return () => { on = false; }; }, []);
  const f = data && data.featured;
  if (!data || (!f && !data.items.length)) return null; /* nothing to show (loading or no trending posts) */
  return (
    <section className="bl-trend" aria-labelledby="bl-trend-title">
      <div className="bl-c">
        <h2 id="bl-trend-title" className="bl-h2">Trending Now</h2>
        {data && (
          <>
            {f && (
              <a className="bl-feat" href={`/blogs/${f.slug}/`}>
                <span className="bl-feat__img"><img src={f.cover_image} alt="" /><i className="bl-feat__arrow"><Arrow /></i></span>
                <span className="bl-feat__body">
                  <span className="bl-tag">{f.category}</span>
                  <h3 className="bl-feat__title">{f.title}</h3>
                  <span className="bl-feat__text">{f.excerpt}</span>
                  <span className="bl-feat__meta"><time>{formatDate(f.published_at)}</time>{f.read_minutes ? <><b aria-hidden="true" /><span>{f.read_minutes} min read</span></> : null}</span>
                </span>
              </a>
            )}
            <div className="bl-row bl-row--cards">
              {data.items.slice(0, 3).map((p) => <BlogsCard key={p.id} post={p} />)}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
