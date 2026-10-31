'use client';

import React, { useEffect, useState } from 'react';
import { SubscribeForm } from './BlogsSubscribe';
import { getPosts } from './blogApi';

/* Hero: tilted article cards = the latest (up to 5) posts from the API (cover_image + title); hidden when there are none.
   Slots are in design px (cx = offset of the card centre from the page centre, cy = card centre from the top of the
   472px frame); with fewer than 5 posts the centre-most slots are used. */
const slots = [
  { cx: 1, cy: 92, r: 0 },
  { cx: -96, cy: 100, r: -12 },
  { cx: 94, cy: 103, r: 12 },
  { cx: -183, cy: 143, r: -26 },
  { cx: 182, cy: 138, r: 26 },
];

export const socials = [
  ['Facebook', 'M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.6V3.4c-.3 0-1.2-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.4H7.6V13h2.7v8z'],
  ['LinkedIn', 'M5.2 9.2h3V19h-3zM6.7 4.6a1.7 1.7 0 1 1 0 3.5 1.7 1.7 0 0 1 0-3.5zM10.3 9.2h2.9v1.3c.4-.8 1.4-1.5 2.9-1.5 3.1 0 3.7 2 3.7 4.7V19h-3v-4.7c0-1.1 0-2.5-1.6-2.5s-1.8 1.2-1.8 2.4V19h-3z'],
  ['Instagram', null],
  ['X', 'M17.5 4h2.9l-6.3 7.2L21.5 20h-5.8l-4.5-5.9L6 20H3.1l6.7-7.7L2.7 4h5.9l4.1 5.4zm-1 14.3h1.6L7.7 5.6H6z'],
];

export const SocialIcon = ({ d }) => (d ? <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={d} /></svg>
  : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4.5" /><circle cx="12" cy="12" r="3.6" /><circle cx="16.8" cy="7.2" r=".6" fill="currentColor" /></svg>);

export default function BlogsHero() {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    let on = true;
    getPosts({ sort: 'newest', limit: 5 }).then((d) => on && setPosts(d.items.filter((p) => p.cover_image)));
    return () => { on = false; };
  }, []);
  const noFan = posts !== null && posts.length === 0;
  return (
    <section className={`bl-hero${noFan ? ' bl-hero--nofan' : ''}`} aria-labelledby="bl-hero-title">
      <div className="bl-hero__fan" aria-hidden="true">
        {(posts || []).slice(0, 5).map((p, i) => {
          const c = slots[i];
          return (
            <div key={p.id} className="bl-hcard" style={{ '--cx': c.cx, '--cy': c.cy, '--r': `${c.r}deg` }}>
              <img src={p.cover_image} alt="" width="480" height="360" />
              <span>{p.title}</span>
            </div>
          );
        })}
      </div>
      <div className="bl-hero__body">
        <span className="bl-chip-w">Blogs</span>
        <h1 id="bl-hero-title" className="bl-hero__title">Stay updated with the trending articles</h1>
        <div className="bl-hero__nl">
          <div className="bl-hero__nlcopy">
            <h2 className="bl-hero__nltitle">Stay in the know with WealthNX.</h2>
            <p className="bl-hero__nltext">Get new articles, product updates and offers in your inbox.</p>
          </div>
          <SubscribeForm variant="hero" source="hero" />
        </div>
        <div className="bl-hero__follow">
          <span>Follow us on:</span>
          {socials.map(([n, d]) => (
            <span key={n} className="bl-soc" role="img" aria-label={n}><SocialIcon d={d} /></span>
          ))}
        </div>
      </div>
    </section>
  );
}
