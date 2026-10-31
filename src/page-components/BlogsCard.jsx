import React from 'react';
import { formatDate } from './blogApi';

const GoIcon = () => (
  <svg className="bl-card__go" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M4.5 11.5l7-7M5.5 4.5h6v6" /></svg>
);

/* variant: undefined = /blogs/ list card; 'read' = article page "Keep reading" (arrow, no author);
   'mini' = article page "Related Articles" column (arrow, no category pill, no author). */
export default function BlogsCard({ post, variant }) {
  const title = <h3 className="bl-card__title">{post.title}</h3>;
  return (
    <a data-reveal className={`bl-card${variant ? ` bl-card--${variant}` : ''}`} href={`/blogs/${post.slug}/`}>
      <span className="bl-card__img"><img src={post.cover_image} alt="" loading="lazy" /></span>
      {variant !== 'mini' && <span className="bl-tag">{post.category}</span>}
      {variant ? <div className="bl-card__row">{title}<GoIcon /></div> : title}
      <span className="bl-card__meta"><time>{formatDate(post.published_at, variant && 'Sep')}</time>{!variant && <span>By {post.author}</span>}</span>
    </a>
  );
}
