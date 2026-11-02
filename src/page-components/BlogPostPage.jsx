'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import TopBar from '@/app/components/TopBar';
import SiteFooter from '@/app/components/SiteFooter';
import BlogsCard from './BlogsCard';
import BlogsSubscribe from './BlogsSubscribe';
import { socials, SocialIcon } from './BlogsHero';
import { getPost, getPosts, formatDate } from './blogApi';
import { sanitizeHtml } from '@/src/admin/sanitize';
import './BlogsPage.css';
import './BlogPostPage.css';

/* Non-design strings: NOT_FOUND, ERROR, COPIED. Everything else is the design text. */
const NOT_FOUND = 'Article not found.';
const ERROR = 'Something went wrong. Please try again.';
const COPIED = 'Copied';
const SITE = 'https://www.wealthnx.ai';

function readSlug() {
  const qs = new URLSearchParams(window.location.search).get('slug');
  if (qs) return qs;
  const m = /^\/blogs\/([^/]+)\/?$/.exec(window.location.pathname);
  return m && m[1] !== 'read' ? decodeURIComponent(m[1]) : '';
}

function setMeta(selector, attrs, content) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

const abs = (u) => (/^https?:/i.test(u || '') ? u : u ? SITE + (u.startsWith('/') ? '' : '/') + u : '');

function applyHead(post) {
  const title = post.meta_title || `${post.title} - WealthNX`;
  document.title = title;
  setMeta('meta[name="description"]', { name: 'description' }, post.meta_description || post.excerpt || '');
  setMeta('meta[property="og:title"]', { property: 'og:title' }, title);
  if (post.cover_image) setMeta('meta[property="og:image"]', { property: 'og:image' }, abs(post.cover_image));
  const old = document.getElementById('bp-jsonld');
  if (old) old.remove();
  const s = document.createElement('script');
  s.id = 'bp-jsonld';
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || undefined,
    image: post.cover_image ? [abs(post.cover_image)] : undefined,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.published_at || undefined,
    mainEntityOfPage: `${SITE}/blogs/${post.slug}/`,
    publisher: { '@type': 'Organization', name: 'WealthNX' },
  }).replace(/</g, '\\u003c');
  document.head.appendChild(s);
}

const Arrow = ({ up }) => (
  <svg className={up ? 'bp-ico bp-ico--up' : 'bp-ico'} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 8H3M7 4L3 8l4 4" /></svg>
);

/* Layout table: hero = center | split | none; aside = toc (contents + share + trial) | related | none;
   wide = 1440 text column (set by absence of an aside); back = disclaimer divider + back row. Unknown/missing layout = style1. */
const LAYOUTS = {
  style1: { hero: 'center', aside: 'toc', back: true },
  style2: { hero: 'center', back: true },
  style3: { hero: 'split', aside: 'toc' },
  style4: { hero: 'none', aside: 'related' },
  style5: { hero: 'split', back: true },
};

/* YouTube card furniture (play circle, duration pill, "Watch on" pill) is added here, it is not stored in the content. */
const VIDEO_UI = (dur) => `${dur ? `<span class="bp-vd">${dur}</span>` : ''}<span class="bp-vp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="#111"/></svg></span><span class="bp-vy">Watch on <svg viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" rx="5" fill="#fff"/><path d="M11 5.5v9l8-4.5z" fill="#222"/></svg><b>YouTube</b></span>`;

/* sanitize, give each H2 an id (contents list) and decorate video cards */
function prepare(raw) {
  const html = sanitizeHtml(raw);
  if (!html) return { html: '', heads: [] };
  const box = document.createElement('div');
  box.innerHTML = html;
  const heads = Array.from(box.querySelectorAll('h2')).map((h, i) => { h.id = `bp-h${i}`; return { id: h.id, text: h.textContent }; });
  box.querySelectorAll('a.wx-video').forEach((a) => a.insertAdjacentHTML('beforeend', VIDEO_UI(a.getAttribute('data-duration'))));
  return { html: box.innerHTML, heads };
}

const shareHref = (name, u, t) => ({
  Facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
  LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
  X: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
  Instagram: 'https://www.instagram.com/wealthnx.ai', /* no web share URL exists: links to the company profile */
}[name]);

function Skeleton() {
  return (
    <div className="bp-skel" aria-busy="true">
      <i className="bp-skel__tag" /><i className="bp-skel__t1" /><i className="bp-skel__t2" /><i className="bp-skel__meta" /><i className="bp-skel__img" />
      <i className="bp-skel__p" /><i className="bp-skel__p" /><i className="bp-skel__p bp-skel__p--s" />
    </div>
  );
}

function Side({ post, heads, active }) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE}/blogs/${post.slug}/`;
  const u = encodeURIComponent(url);
  const copy = () => navigator.clipboard && navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }, () => {});
  const go = (e, id) => { e.preventDefault(); const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  return (
    <aside className="bp-side">
      {heads.length > 0 && (
        <nav className="bp-toc" aria-labelledby="bp-toc-t">
          <p id="bp-toc-t" className="bp-side__h">In this article</p>
          <ul>{heads.map((h) => <li key={h.id}><a href={`#${h.id}`} className={h.id === active ? 'is-on' : ''} aria-current={h.id === active ? 'location' : undefined} onClick={(e) => go(e, h.id)}>{h.text}</a></li>)}</ul>
        </nav>
      )}
      <div className="bp-share">
        <p className="bp-side__h">Share this article</p>
        <div className="bp-share__ico">
          {socials.map(([n, d]) => <a key={n} href={shareHref(n, u, encodeURIComponent(post.title))} target="_blank" rel="noopener noreferrer" aria-label={n}><SocialIcon d={d} /></a>)}
        </div>
        <button type="button" className="bp-share__copy" onClick={copy}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" /></svg>
          {copied ? COPIED : 'Copy link'}
        </button>
      </div>
      <div className="bp-trial">
        <p className="bp-trial__t">7-Day Free Trial</p>
        <p className="bp-trial__s">Open WealthNX instantly.<br />No signup. No credit card.</p>
        <a className="bp-trial__btn" href="https://wealthnx.ai/get">Get Started<i><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg></i></a>
      </div>
    </aside>
  );
}

export default function BlogPostPage() {
  const [state, setState] = useState({ kind: 'loading' });
  const [more, setMore] = useState([]);
  const [active, setActive] = useState('');
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    getPost(readSlug()).then((res) => {
      if (res.post) {
        setState({ kind: 'ok', post: res.post });
        applyHead(res.post);
        document.getElementById('wnx-ssr')?.remove(); /* server-rendered crawler copy (blog-post.php) is no longer needed */
        getPosts({ limit: 4 }).then((d) => setMore(d.items.filter((p) => p.slug !== res.post.slug).slice(0, 3)));
      } else setState({ kind: res.notFound ? 'notfound' : 'error' });
    });
  }, []);

  const post = state.kind === 'ok' ? state.post : null;
  const { html, heads } = useMemo(() => (post ? prepare(post.content) : { html: '', heads: [] }), [post]);

  useEffect(() => { /* contents list: highlight the H2 nearest the top of the viewport */
    if (!heads.length || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-10% 0px -80% 0px' });
    heads.forEach((h) => { const el = document.getElementById(h.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [heads]);

  const key = post && LAYOUTS[post.layout] ? post.layout : 'style1';
  const L = LAYOUTS[key];

  const intro = post && (
    <>
      <p className="bp-crumb"><a href="/blogs/"><Arrow />All articles</a><i aria-hidden="true">/</i><span>{post.category}</span></p>
      <div className="bp-titles">
        <span className="bl-tag bp-tag">{post.category}</span>
        <h1 className="bp-title">{post.title}</h1>
        <p className="bp-meta">
          <span>{post.author}</span>
          {post.published_at && <><b aria-hidden="true" /><time dateTime={post.published_at}>{formatDate(post.published_at, 'Sep')}</time></>}
          {post.read_minutes ? <><b aria-hidden="true" /><span>{post.read_minutes} min read</span></> : null}
        </p>
      </div>
    </>
  );
  const cover = post && post.cover_image && <img className="bp-cover" src={post.cover_image} alt="" />;
  const col = post && (
    <div className="bp-col">
      {html ? <div className="bp-body" dangerouslySetInnerHTML={{ __html: html }} /> : post.excerpt && <div className="bp-body"><p>{post.excerpt}</p></div>}
      {L.back && (
        <div className="bp-end">
          <a href="/blogs/"><Arrow />Back to all articles</a>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top<Arrow up /></button>
        </div>
      )}
    </div>
  );

  return (
    <div className={`bl bp bp--${key.replace('style', 's')}`}>
      <div className={L.hero === 'center' ? 'bl-top' : ''}><TopBar /></div>
      <main className="bp-main">
        {state.kind === 'loading' && <div className="bp-c bp-wrap"><Skeleton /></div>}
        {state.kind === 'notfound' && <p className="bp-c bp-state" role="status">{NOT_FOUND} <a href="/blogs/">← All articles</a></p>}
        {state.kind === 'error' && <p className="bp-c bp-state" role="alert">{ERROR} <a href="/blogs/">← All articles</a></p>}
        {post && (
          <article>
            {L.hero === 'center' && <header className="bp-c bp-hero">{intro}{cover}</header>}
            {L.hero === 'split' && <header className="bp-band"><div className="bp-c2 bp-band__in"><div>{intro}</div>{cover}</div></header>}
            {L.hero === 'none' ? (
              <div className="bp-c2 bp-s4">
                <div className="bp-s4__main">{intro}{col}</div>
                <aside className="bp-rel">
                  <h2 className="bp-rel__h">Related Articles</h2>
                  <div className="bp-rel__list">{more.map((p) => <BlogsCard key={p.id} post={p} variant="mini" />)}</div>
                </aside>
              </div>
            ) : (
              <div className={`bp-c bp-cols${L.aside ? ' bp-cols--side' : ''}`}>
                {L.aside === 'toc' && <Side post={post} heads={heads} active={active || (heads[0] && heads[0].id)} />}
                {col}
              </div>
            )}
          </article>
        )}
        {post && (
          <>
            {more.length > 0 && (
              <section className="bp-more" aria-labelledby="bp-more-title">
                <div className="bl-c">
                  <div className="bp-more__top">
                    <h2 id="bp-more-title" className="bl-h2">Keep reading</h2>
                    <a href="/blogs/">View all articles<svg viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M2 2l4 4-4 4" /></svg></a>
                  </div>
                  <div className="bl-row bp-more__row">{more.map((p) => <BlogsCard key={p.id} post={p} variant="read" />)}</div>
                </div>
              </section>
            )}
            <BlogsSubscribe text="Get the latest posts in your inbox." />
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
