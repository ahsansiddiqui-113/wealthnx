# Blogs page + Admin panel — plan & API contract

Source design: the owner's full-page Figma screenshot of the Blogs page (472 px wide, very small — body text unreadable, titles/headings readable). Owner request: build the page section by section, and add an admin panel so that posts uploaded from it appear on the site automatically.

## 1. Key architecture decisions

| Question | Decision | Why |
|---|---|---|
| Static export vs dynamic content | `/blogs/` is a static HTML shell that **fetches posts from the PHP API at runtime** | `output:'export'` can't know about posts created later; client fetch means "upload in admin → live immediately", no rebuild/redeploy |
| Route | New `/blogs/` (list) and `/blogs/<slug>/` (post). The existing WordPress at `/blog/` is left untouched | The nav/footer currently link to `/blog/` (WordPress); the new design replaces it later by pointing nav/footer to `/blogs/` (done in this work) |
| Post URLs for unknown slugs | One static shell `app/blogs/read/page.jsx` (client). Apache rewrites `/blogs/<slug>/` → `/blogs/read/index.html`; the shell reads the slug from `location.pathname` | Next can't pre-generate unknown slugs |
| Content freshness / SEO | Shell + client fetch. Googlebot renders JS, acceptable for now. Phase 5 (optional): PHP renders `<title>`/OG tags + JSON-LD for `/blogs/<slug>/` | keeps v1 simple |
| Offline/dev (no PHP locally) | Frontend falls back to a small **seed** (`src/page-components/blogSeed.js`) when the API is unreachable; the seed contains ONLY titles/categories/dates/authors visible in the design | local development works; no invented article copy |
| Admin | `/admin/` = static client SPA page (noindex) talking to the PHP API with cookie auth | no separate server |
| Auth | Single admin account from `.env.php`: `ADMIN_EMAIL` (note: `config.php` already uses this constant as a support address with a default, so set it explicitly), `ADMIN_PASSWORD_HASH` (`password_hash`; empty/missing → every admin route answers 503, there is no default password). Login → random 64-hex token stored (hashed) in `admin_sessions` with 12 h expiry, sent as `HttpOnly; Secure; SameSite=Strict` cookie `wnx_admin`; every write also needs header `X-CSRF-Token` equal to the value returned by login/me. Login rate limit 5 failed / 15 min per IP; same-origin `Origin` check on writes | simple, no third-party deps |
| Images | Admin uploads to `/uploads/blog/` (random names, jpeg/png/webp/gif only, ≤ 5 MB, verified with `finfo`/`getimagesize`), DB stores the public path | files exist → Apache serves them directly |
| Content format | `content` = HTML string, sanitised server-side with an allow-list (p, h2–h4, ul/ol/li, a[href], strong, em, blockquote, img[src,alt], br, code, pre); no scripts/inline handlers | admin-authored but defence in depth |
| Secrets | `.env.php` only; never committed/copied; docs tell the owner how to generate the hash | |

## 2. Database (add to `database.sql`, idempotent `CREATE TABLE IF NOT EXISTS`)

- `blog_posts`: `id` CHAR(36) PK (UUID like the other tables), `slug` VARCHAR(190) UNIQUE, `title`, `excerpt` TEXT, `content` MEDIUMTEXT, `category` VARCHAR(60), `cover_image` VARCHAR(255), `author` VARCHAR(100) DEFAULT 'WealthNX Team', `read_minutes` SMALLINT, `status` ENUM('draft','published') , `is_trending` TINYINT(1), `is_featured` TINYINT(1) (the big "Trending Now" card), `published_at` DATETIME, `created_at`, `updated_at`; indexes on (status, published_at), category.
- `blog_videos`: `id`, `title`, `url` (YouTube), `thumbnail`, `description` TEXT, `duration` VARCHAR(10), `is_featured` TINYINT(1), `sort_order` INT, `status`, timestamps.
- `blog_subscribers`: `id`, `email` UNIQUE, `source` VARCHAR(30) ('hero'|'footer-form'), `created_at`, `unsubscribed_at` NULL.
- `admin_sessions`: `token_hash` CHAR(64) PK, `csrf` CHAR(32), `expires_at`, `ip`, `created_at`.
- `admin_login_attempts`: `id` AUTO_INCREMENT PK, `ip`, `created_at` (failed logins only, for rate limiting).
- `blog_subscribers` also stores `ip_address` (needed for the 5/hour/IP limit).
- Implementation notes: ids are 32-hex UUIDs generated in PHP (no `DEFAULT (UUID())`, so it also works on MySQL 5.7/MariaDB); datetimes are written by PHP in UTC (never `NOW()`) so the MySQL server timezone cannot shift publishing times.

## 3. API contract (all JSON; routes under `/api/…`, handled in `api.php`'s switch like `contact-message`)

Public:
- `GET  /api/blog/posts?category=&q=&sort=newest|oldest&limit=9&offset=0` → `{ items:[Post], total, categories:[string] }` (published only, `published_at <= NOW()`; list responses omit `content`)
- `GET  /api/blog/posts/trending` → `{ featured: Post|null, items:[Post(≤3)] }` (featured = `is_featured`, items = `is_trending` newest, the featured post is excluded from items)
- `GET  /api/blog/post?slug=` → `Post` incl. `content` (404 if not published)
- `GET  /api/blog/videos` → `{ featured: Video|null, items:[Video] }` (published only, by `sort_order`; the featured video is not repeated in `items`)
- `POST /api/blog/subscribe` `{ email, source, website }` (`website` honeypot) → 201 `{ok:true}` (duplicates ALSO answer 201 `{ok:true}`: a different status would let anyone probe which emails are subscribed), 400 invalid, 429 > 5 new sign-ups/hour/IP

`Post` = `{ id, slug, title, excerpt, category, cover_image, author, read_minutes, published_at, is_trending, is_featured, status, content? }` — `is_trending`/`is_featured` are JSON booleans, `read_minutes` an int, `published_at` an ISO-8601 UTC string (`2026-10-08T09:30:00Z`); admin responses also carry `created_at`/`updated_at`. All blog datetimes are stored in UTC.
`Video` = `{ id, title, url, thumbnail, description, duration, is_featured }`

Admin (cookie + `X-CSRF-Token` for non-GET):
- `POST /api/admin/login` `{email,password}` → `{ok, csrf}` (+Set-Cookie) · `POST /api/admin/logout` · `GET /api/admin/me` → `{ok, email, csrf}` or 401
- `GET /api/admin/posts?status=&q=&limit=&offset=` · `GET /api/admin/post?id=` · `POST /api/admin/posts` (create) · `PUT /api/admin/posts` (update, body has `id`) · `DELETE /api/admin/posts?id=`
- same CRUD for `/api/admin/videos`
- `POST /api/admin/upload` multipart `file` → `{ url:'/uploads/blog/<random>.<ext>' }`
- `GET /api/admin/subscribers?limit=&offset=` (+ `?format=csv`) · `DELETE /api/admin/subscribers?id=`
- Slugs: auto-generated from the title if omitted (lowercase, hyphens, unique suffix on clash).

Standard error shape: `{ error: "message" }` with the right HTTP status. CORS not needed (same origin).

## 4. Frontend sections of `/blogs/` (top → bottom in the design)

1. TopBar (existing; "Blogs" item highlighted) + **hero**: five tilted article-cover cards fanning across the top (stand-in images), chip "Blogs", heading "Stay updated with the trending articles", newsletter block "Stay in the know with WealthNX." / "Get new articles, product updates and offers in your inbox." with email input ("Enter your email") + black "Subscribe" button, "Follow us on:" + 4 round social icons.
2. **Promo banner**: teal-gradient rounded banner, phone image left, "Your accounts hold different parts of the story." (accounts in green), small teal line "WealthNX AI brings the available information together.", black button "Start your 7-day free trial now".
3. **Trending Now**: big featured card (cover left, green category tag, title, excerpt, date • read time, arrow button) + row of 3 post cards.
4. **Dark banner** "See your financial world in one place" with Google Play / App Store buttons and the floating-pill phone composition (reuse HomeDownload style).
5. **All articles**: heading, sub-line, category filter chips (All + categories), search box, sort dropdown, "Showing X of N articles", 3-column grid of cards, **Load More** button (fetches next page).
6. **Watch & Learn** (light-blue panel): chip, "Money explained, one video at a time", sub-line, big featured video (play button, caption title + desc) + 4 list items with thumbnails, "Watch More" button.
7. **Subscribe to our blog**: envelope icon, "Subscribe to our blog", "Get latest posts in your inbox", email field + Subscribe, "Unsubscribe anytime. Privacy Policy" note.
8. Footer (existing SiteFooter).

On phones, card groups become horizontal swipe rows (site-wide convention).

## 5. Phases (supervisor runs these with sub-agents; one agent per shared file / Browser pane)

| Phase | Work | Agent(s) | Parallel? |
|---|---|---|---|
| 1a | Frontend `/blogs/` page, 8 sections, `lib`/`blogApi.js` fetch client + seed fallback | FE agent | yes, with 1b |
| 1b | Backend: SQL, API handlers, auth, upload, `.htaccess` rewrite for `/blogs/<slug>/` + `/uploads/`, deploy notes | BE agent | yes, with 1a (disjoint files; no browser) |
| 2 | Admin panel `/admin/` SPA (login, posts list/editor with image upload + preview, videos, subscribers) | FE agent #2 | after 1 |
| 3 | Post reader `/blogs/read/` — **needs the owner's design for the article page**; build a neutral reader using the same visual language until supplied | FE agent #3 | after 1 |
| 4 | Wire nav/footer "Blogs" → `/blogs/`, sitemap entry for `/blogs/`, review/QA, replace stand-in images | supervisor | after 2–3 |
| 5 (optional) | PHP-rendered meta tags/JSON-LD per post for SEO; sitemap including post URLs from the API; WordPress `/blog/` → migration/redirects | later | |

## 6. Owner to-do on GoDaddy (after delivery)
1. Run the new `CREATE TABLE`s from `database.sql` on `wealthnx_db`.
2. Add to `.env.php`: `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` (generated with the command in the docs).
3. Upload `api.php`, updated `.htaccess`, create writable `uploads/blog/` (chmod 755/775), upload the new `out/`.
4. Open `/admin/`, log in, add the first post.
Backend cannot be run locally (no PHP) → code is reviewed, not executed; test on a staging path first.
