# WordPress blog -> new blog: migration runbook

The old blog lives on WordPress at `https://www.wealthnx.ai/blog/<slug>/`. The new blog is `/blogs/` (PHP API + MySQL + `/admin/`).
The export `wealthnxblog.WordPress.2026-10-30.xml` contained **105 published posts** (+ 1 draft duplicate and 1 trashed Elementor item, both skipped).
Every post keeps its slug and publish date: `/blog/<slug>/` becomes `/blogs/<slug>/` with a one-to-one 301 redirect.

## What the tooling does (all in `scripts/blog-import/`)

| Script | Purpose |
|---|---|
| `report.mjs <xml>` | Read-only dry run: counts, problem content, duplicates. |
| `build.mjs <xml>` | Builds everything into `blog-import-out/` (git-ignored): `posts-1..3.sql`, `uploads/blog/*.webp` (105 featured images, downloaded from the live site and converted to WebP), `redirects.htaccess`, `REPORT.md`, `posts.json`. Re-runnable. Category fixes go in `category-overrides.json` (`{"slug": "Category"}`). |
| `apply-redirects.mjs` | Writes the generated redirects into `.htaccess` (between `>>> / <<< wordpress-blog-redirects` markers; re-runnable). |

What `build.mjs` does to each post: keeps only the tags the blog allows (plus **tables**, which 71 posts use), removes WordPress block comments / figure wrappers / inline styles / empty paragraphs, turns `h1` into `h2`, rewrites internal links `/blog/...` to `/blogs/...`, generates an excerpt when WordPress had none (96 posts), computes reading time, carries over the Yoast SEO title + description (42 posts), and re-categorises (WordPress had 95 of 105 posts in "Business"; now 7 topical categories, see `REPORT.md`).

## Code changes that go with it

- `database.sql`: `meta_title`, `meta_description` columns on `blog_posts` (idempotent migration block).
- `api.php`: meta fields in the post JSON and admin save; **table tags allowed** by the sanitiser (`src/admin/sanitize.js` mirrors it).
- `blog-post.php` (new): `/blogs/<slug>/` now goes through it. It writes the post's real `<title>`, description, canonical, Open Graph and Article JSON-LD into the reader shell and adds a server-rendered copy of the article for crawlers without JavaScript; unknown slugs return 404 + `noindex`.
- `blog-sitemap.php` (new): `/sitemap-blog.xml` lists every published post; referenced in `robots.txt`.
- `.htaccess`: per-post redirects, rules 4a/4b. `robots.txt`: sitemap line + `Disallow: /blogs/read/`.
- `app/blogs/read/page.jsx`: the `noindex` was removed from the shell (it would have been inherited by every post).
- `BlogPostPage`: uses the SEO title/description, table styling, removes the crawler copy once the article has rendered.

## Go-live checklist (GoDaddy) — order matters

Do not upload the new `.htaccess` before steps 1-4, or old links will redirect to posts that do not exist yet.

1. **Back up** the database (phpMyAdmin -> Export) and the `blog/` WordPress folder.
2. **Database:** phpMyAdmin -> `wealthnx_db` -> SQL -> run the new "SEO title / description columns" block from `database.sql` (blog_posts must already exist, see `ADMIN_GUIDE.md`).
3. **Import posts:** run `blog-import-out/posts-1.sql`, then `posts-2.sql`, then `posts-3.sql` (SQL tab, one at a time). Safe to run twice.
4. **Images:** upload the contents of `blog-import-out/uploads/blog/` into the server's `uploads/blog/` folder (File Manager or FTP). Do not delete anything already there.
5. **Upload the site:** `api.php`, `blog-post.php`, `blog-sitemap.php`, `robots.txt`, the new `out/` folder (after `npm run build`), and last the new `.htaccess`.
6. **Check** (see below). Then in Google Search Console: submit `https://www.wealthnx.ai/sitemap-blog.xml`.
7. Keep WordPress installed under `/blog/` for a few weeks (its admin, `wp-json`, `wp-content` stay reachable; the redirect block lets them through). When you are sure nothing is missing, delete the `blog/` folder and remove the one `wp-admin|wp-login...` line from the redirect block (or re-run `build.mjs` after deleting it from the script).

## Checks after going live

- `https://www.wealthnx.ai/blog/how-to-track-net-worth-across-multiple-accounts/` -> 301 -> `/blogs/how-to-track-net-worth-across-multiple-accounts/` and the article shows (with images, tables, cover).
- View source of any `/blogs/<slug>/`: real `<title>`, `<meta name="description">`, `rel="canonical"`, JSON-LD, no `noindex`, and an `id="wnx-ssr"` block with the article text.
- `/blogs/does-not-exist/` -> 404 and `X-Robots-Tag: noindex`.
- `/blogs/` lists the posts, categories filter works, `/sitemap-blog.xml` shows 105 URLs.
- `/blog/` and `/blog/category/anything/` -> `/blogs/`.
- Search Console -> Pages / Crawl stats for 404s over the next 2-4 weeks; keep the redirects at least a year.

## Editorial follow-ups (not automatic)

- **Duplicates / overlapping posts** (8 pairs, listed in `REPORT.md`, e.g. the `-2` slugs): decide keep, merge or retire. Retire = delete in `/admin/` and add a 301 to the surviving post.
- **Off-topic posts** (cloud computing, web development, major tournaments): consider retiring.
- Featured/trending: the newest post is "Featured" and the next three "Trending" by default; change in `/admin/`.
- The admin editor has no fields for SEO title/description yet (the API accepts `meta_title` / `meta_description`; imported values are kept when a post is edited).
