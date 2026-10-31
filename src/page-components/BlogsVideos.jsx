'use client';

import React, { useEffect, useState } from 'react';
import { getVideos } from './blogApi';

const Play = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6.5v11l9-5.5z" fill="currentColor" /></svg>;

function Wrap({ v, className, children }) {
  /* video URLs open in a new tab; a video without a URL is not clickable */
  return v.url
    ? <a className={className} href={v.url} target="_blank" rel="noopener noreferrer">{children}</a>
    : <div className={className}>{children}</div>;
}

export default function BlogsVideos() {
  const [data, setData] = useState(null);
  useEffect(() => { let on = true; getVideos().then((d) => on && setData(d)); return () => { on = false; }; }, []);
  const f = data && data.featured;
  if (!data || (!f && !data.items.length)) return null; /* nothing to show (loading or no videos) */
  return (
    <section className="bl-wl" aria-labelledby="bl-wl-title">
      <div className="bl-c">
        <span className="bl-chip-b">Watch &amp; Learn</span>
        <h2 id="bl-wl-title" className="bl-h2">Money explained, one video at a time</h2>
        <p className="bl-wl__sub">Product walkthroughs and simple explanations to help you understand your finances.</p>
        {data && (
          <div className="bl-wl__grid">
            {f && (
              <Wrap v={f} className="bl-vfeat">
                <img src={f.thumbnail} alt="" />
                {f.duration && <span className="bl-vfeat__dur">{f.duration}</span>}
                <i className="bl-vfeat__play"><Play /></i>
                <span className="bl-vfeat__cap"><h3>{f.title}</h3><span>{f.description}</span></span>
              </Wrap>
            )}
            <div className="bl-vlist bl-row">
              {data.items.slice(0, 4).map((v) => (
                <Wrap key={v.id} v={v} className="bl-vitem">
                  <span className="bl-vitem__img"><img src={v.thumbnail} alt="" loading="lazy" /><i><Play /></i></span>
                  <span className="bl-vitem__t">{v.title}</span>
                </Wrap>
              ))}
            </div>
          </div>
        )}
        <div className="bl-more"><button type="button" className="bl-btn">Watch More</button></div>
      </div>
    </section>
  );
}
