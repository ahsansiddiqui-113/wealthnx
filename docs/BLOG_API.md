# Blog + Admin API (as implemented in `api.php`)

Base URL: `https://www.wealthnx.ai/api`. All responses are JSON (`Content-Type: application/json`), except the subscribers CSV export. Errors always look like `{ "error": "message" }`. Unknown route: 404. Wrong method: 405 with an `Allow` header.

Conventions
- Datetimes: ISO 8601 UTC, e.g. `2026-10-08T09:30:00Z`. Stored in UTC. Send `published_at` the same way (a value without a zone is read as UTC).
- Booleans (`is_trending`, `is_featured`) are real JSON booleans in responses; requests accept `true/false/1/0/"1"/"0"`.
- `limit` is clamped to 1–50, `offset` to >= 0. `q` search escapes `%` and `_`.
- Public GET responses send `Cache-Control: public, max-age=60`. Admin responses send `no-store`, `X-Robots-Tag: noindex` and have no CORS headers (same-origin only).
- Titles, excerpts, authors etc. are returned as plain text (NOT HTML-escaped): the frontend must render them as text (React does by default; never `dangerouslySetInnerHTML` them). Only `content` is HTML, already sanitised on save.

Objects
```
Post  = { id, slug, title, excerpt, category, layout (style1..style5), cover_image|null, author, read_minutes,
          published_at|null, is_trending, is_featured, status, content? }   // admin adds created_at, updated_at
Video = { id, title, url, thumbnail|null, description, duration, is_featured }   // admin adds sort_order, status, created_at, updated_at
```

## Public

| Method + path | Params / body | Success | Errors |
|---|---|---|---|
| `GET /blog/posts` | `category`, `q`, `sort=newest\|oldest`, `limit` (9), `offset` | `200 { items:[Post], total, categories:[string] }` (no `content`) | 405 |
| `GET /blog/posts/trending` | – | `200 { featured: Post\|null, items:[Post] }` (<= 3 trending, featured post excluded) | 405 |
| `GET /blog/post` | `slug` | `200 Post` (with `content`) | 404 not published / unknown |
| `GET /blog/videos` | – | `200 { featured: Video\|null, items:[Video] }` | 405 |
| `POST /blog/subscribe` | `{ email, source: "hero"\|"footer-form", website }` | `201 { ok:true }` (also for duplicates and for honeypot hits) | 400 invalid email, 429 more than 5 new sign-ups/hour/IP |

Only `status='published' AND published_at <= now` posts are ever returned.

Example
```
curl -s "https://www.wealthnx.ai/api/blog/posts?category=Insights&limit=3"
{"items":[{"id":"…","slug":"my-first-post","title":"My first post","excerpt":"…","category":"Insights","cover_image":"/uploads/blog/ab12….jpg","author":"WealthNX Team","read_minutes":4,"published_at":"2026-10-08T09:30:00Z","is_trending":false,"is_featured":false,"status":"published"}],"total":1,"categories":["Insights"]}
```

## Admin auth flow

Needs `ADMIN_EMAIL` + `ADMIN_PASSWORD_HASH` (see checklist). Without them every admin route returns `503 {"error":"Admin is not configured"}`.

1. `POST /admin/login` `{ "email": "...", "password": "..." }` → `200 { ok:true, email, csrf }` and `Set-Cookie: wnx_admin=<64 hex>; Path=/; HttpOnly; Secure; SameSite=Strict` (12 h). The server stores only `sha256(token)`.
   - 401 wrong credentials (same message for wrong email or password), 429 after 5 failed attempts in 15 min from one IP (`Retry-After: 900`), 503 not configured.
2. Every later request sends the cookie automatically (`fetch(..., { credentials: 'same-origin' })`).
3. Every non-GET request must also send header `X-CSRF-Token: <csrf from login / me>` → otherwise `403 Invalid CSRF token`. A browser `Origin` header from another host is rejected with 403.
4. `GET /admin/me` → `200 { ok, email, csrf }` or `401` (use it on page load to restore the session and get the csrf token).
5. `POST /admin/logout` (needs CSRF) → `200 { ok:true }`, cookie cleared, session deleted.

Missing/expired cookie → `401 { error:"Not authenticated" }`.

## Admin endpoints (all need the cookie; non-GET also need `X-CSRF-Token`)

| Method + path | Params / body | Success | Errors |
|---|---|---|---|
| `GET /admin/posts` | `status=draft\|published`, `q`, `limit` (20), `offset` | `200 { items:[Post], total, limit, offset }` (no content) | |
| `GET /admin/post` | `id` | `200 Post` with `content` | 400, 404 |
| `POST /admin/posts` | post fields (below) | `201 Post` | 400 validation, 409 slug taken |
| `PUT /admin/posts` | `{ id, ...fields to change }` (partial update) | `200 Post` | 400, 404, 409 slug taken |
| `DELETE /admin/posts?id=` | – | `200 { ok:true }` | 400, 404 |
| `GET /admin/videos` | `limit`, `offset` | `200 { items:[Video], total, limit, offset }` | |
| `GET /admin/video` | `id` | `200 Video` | 400, 404 |
| `POST /admin/videos` | video fields (below) | `201 Video` | 400 |
| `PUT /admin/videos` | `{ id, ...fields }` | `200 Video` | 400, 404 |
| `DELETE /admin/videos?id=` | – | `200 { ok:true }` | 400, 404 |
| `POST /admin/upload` | multipart, field `file` | `201 { url:"/uploads/blog/<24 hex>.<jpg\|png\|webp\|gif>" }` | 400, 413 > 5 MB, 415 not a JPEG/PNG/WebP/GIF |
| `GET /admin/subscribers` | `limit` (50), `offset`; `format=csv` downloads all | `200 { items:[{id,email,source,created_at,unsubscribed_at}], total, limit, offset }` or a CSV file | |
| `DELETE /admin/subscribers?id=` | – | `200 { ok:true }` | 400, 404 |

Post fields (anything else in the body is ignored): `title` (required, <= 200), `slug` (optional; auto from the title, lowercase ASCII, hyphens, `-2`/`-3` suffix on clash; an explicit clashing slug returns 409; `read` is reserved), `excerpt` (<= 1000; auto-filled from the content on create if empty), `content` (HTML, sanitised: allowed tags `p h2 h3 h4 ul ol li a strong em blockquote img br code pre`, `b/i/h1/h5/h6` are mapped, everything else is stripped keeping its text; only `href` on links and `src`,`alt` on images; only `http(s):`, `mailto:` (links) and relative URLs; external links get `rel="noopener noreferrer" target="_blank"`; one extra attribute, `class`, kept ONLY for these exact values: `blockquote.wx-callout|wx-tip|wx-check|wx-author`, `p.wx-note`, `a.wx-video` (needs a YouTube href, plus optional `data-duration` like `3:24` matching `^d{1,2}(:d{2}){1,2}# Blog + Admin API (as implemented in `api.php`)

Base URL: `https://www.wealthnx.ai/api`. All responses are JSON (`Content-Type: application/json`), except the subscribers CSV export. Errors always look like `{ "error": "message" }`. Unknown route: 404. Wrong method: 405 with an `Allow` header.

Conventions
- Datetimes: ISO 8601 UTC, e.g. `2026-10-08T09:30:00Z`. Stored in UTC. Send `published_at` the same way (a value without a zone is read as UTC).
- Booleans (`is_trending`, `is_featured`) are real JSON booleans in responses; requests accept `true/false/1/0/"1"/"0"`.
- `limit` is clamped to 1–50, `offset` to >= 0. `q` search escapes `%` and `_`.
- Public GET responses send `Cache-Control: public, max-age=60`. Admin responses send `no-store`, `X-Robots-Tag: noindex` and have no CORS headers (same-origin only).
- Titles, excerpts, authors etc. are returned as plain text (NOT HTML-escaped): the frontend must render them as text (React does by default; never `dangerouslySetInnerHTML` them). Only `content` is HTML, already sanitised on save.

Objects
```
Post  = { id, slug, title, excerpt, category, layout (style1..style5), cover_image|null, author, read_minutes,
          published_at|null, is_trending, is_featured, status, content? }   // admin adds created_at, updated_at
Video = { id, title, url, thumbnail|null, description, duration, is_featured }   // admin adds sort_order, status, created_at, updated_at
```

## Public

| Method + path | Params / body | Success | Errors |
|---|---|---|---|
| `GET /blog/posts` | `category`, `q`, `sort=newest\|oldest`, `limit` (9), `offset` | `200 { items:[Post], total, categories:[string] }` (no `content`) | 405 |
| `GET /blog/posts/trending` | – | `200 { featured: Post\|null, items:[Post] }` (<= 3 trending, featured post excluded) | 405 |
| `GET /blog/post` | `slug` | `200 Post` (with `content`) | 404 not published / unknown |
| `GET /blog/videos` | – | `200 { featured: Video\|null, items:[Video] }` | 405 |
| `POST /blog/subscribe` | `{ email, source: "hero"\|"footer-form", website }` | `201 { ok:true }` (also for duplicates and for honeypot hits) | 400 invalid email, 429 more than 5 new sign-ups/hour/IP |

Only `status='published' AND published_at <= now` posts are ever returned.

Example
```
curl -s "https://www.wealthnx.ai/api/blog/posts?category=Insights&limit=3"
{"items":[{"id":"…","slug":"my-first-post","title":"My first post","excerpt":"…","category":"Insights","cover_image":"/uploads/blog/ab12….jpg","author":"WealthNX Team","read_minutes":4,"published_at":"2026-10-08T09:30:00Z","is_trending":false,"is_featured":false,"status":"published"}],"total":1,"categories":["Insights"]}
```

## Admin auth flow

Needs `ADMIN_EMAIL` + `ADMIN_PASSWORD_HASH` (see checklist). Without them every admin route returns `503 {"error":"Admin is not configured"}`.

1. `POST /admin/login` `{ "email": "...", "password": "..." }` → `200 { ok:true, email, csrf }` and `Set-Cookie: wnx_admin=<64 hex>; Path=/; HttpOnly; Secure; SameSite=Strict` (12 h). The server stores only `sha256(token)`.
   - 401 wrong credentials (same message for wrong email or password), 429 after 5 failed attempts in 15 min from one IP (`Retry-After: 900`), 503 not configured.
2. Every later request sends the cookie automatically (`fetch(..., { credentials: 'same-origin' })`).
3. Every non-GET request must also send header `X-CSRF-Token: <csrf from login / me>` → otherwise `403 Invalid CSRF token`. A browser `Origin` header from another host is rejected with 403.
4. `GET /admin/me` → `200 { ok, email, csrf }` or `401` (use it on page load to restore the session and get the csrf token).
5. `POST /admin/logout` (needs CSRF) → `200 { ok:true }`, cookie cleared, session deleted.

Missing/expired cookie → `401 { error:"Not authenticated" }`.

## Admin endpoints (all need the cookie; non-GET also need `X-CSRF-Token`)

| Method + path | Params / body | Success | Errors |
|---|---|---|---|
| `GET /admin/posts` | `status=draft\|published`, `q`, `limit` (20), `offset` | `200 { items:[Post], total, limit, offset }` (no content) | |
| `GET /admin/post` | `id` | `200 Post` with `content` | 400, 404 |
| `POST /admin/posts` | post fields (below) | `201 Post` | 400 validation, 409 slug taken |
| `PUT /admin/posts` | `{ id, ...fields to change }` (partial update) | `200 Post` | 400, 404, 409 slug taken |
| `DELETE /admin/posts?id=` | – | `200 { ok:true }` | 400, 404 |
| `GET /admin/videos` | `limit`, `offset` | `200 { items:[Video], total, limit, offset }` | |
| `GET /admin/video` | `id` | `200 Video` | 400, 404 |
| `POST /admin/videos` | video fields (below) | `201 Video` | 400 |
| `PUT /admin/videos` | `{ id, ...fields }` | `200 Video` | 400, 404 |
| `DELETE /admin/videos?id=` | – | `200 { ok:true }` | 400, 404 |
| `POST /admin/upload` | multipart, field `file` | `201 { url:"/uploads/blog/<24 hex>.<jpg\|png\|webp\|gif>" }` | 400, 413 > 5 MB, 415 not a JPEG/PNG/WebP/GIF |
| `GET /admin/subscribers` | `limit` (50), `offset`; `format=csv` downloads all | `200 { items:[{id,email,source,created_at,unsubscribed_at}], total, limit, offset }` or a CSV file | |
| `DELETE /admin/subscribers?id=` | – | `200 { ok:true }` | 400, 404 |

Post fields (anything else in the body is ignored): `title` (required, <= 200), `slug` (optional; auto from the title, lowercase ASCII, hyphens, `-2`/`-3` suffix on clash; an explicit clashing slug returns 409; `read` is reserved), `excerpt` (<= 1000; auto-filled from the content on create if empty), `content` (HTML, sanitised: allowed tags `p h2 h3 h4 ul ol li a strong em blockquote img br code pre`, `b/i/h1/h5/h6` are mapped, everything else is stripped keeping its text; only `href` on links and `src`,`alt` on images; only `http(s):`, `mailto:` (links) and relative URLs; ); any other class is dropped. Mirrored in `src/admin/sanitize.js`), `category` (<= 60, default `General`), `layout` (`style1`..`style5`, default `style1`; anything else = 400 "layout must be one of style1, style2, style3, style4, style5"; on update only changed when sent; old rows read as `style1`), `cover_image` (`/uploads/blog/...`, `/assets/...` or an `https://` URL), `author` (default `WealthNX Team`), `read_minutes` (1–999; auto ~200 wpm, min 1, when missing), `status` (`draft` default | `published`), `is_trending`, `is_featured` (exclusive: setting it clears it on every other post), `published_at` (ISO date; defaults to now when publishing; a future date = scheduled). Publishing requires non-empty content.

Video fields: `title` (required), `url` (required, a YouTube link: youtube.com, youtu.be, youtube-nocookie.com), `thumbnail` (same rules as cover_image), `description` (<= 1000), `duration` (`4:32` / `1:02:10`), `is_featured` (exclusive), `sort_order` (int), `status` (`draft` default | `published`).

CSV: columns `id,email,source,subscribed_at,unsubscribed_at`; values starting with `= + - @` (or tab/CR) are prefixed with `'` to block spreadsheet formula injection.

## Owner deployment checklist (GoDaddy)

1. Database: open phpMyAdmin → select `wealthnx_db` → SQL tab → paste/run the blog section of `database.sql` (this includes the idempotent "layout" column migration; run it BEFORE uploading the new `api.php`) (`blog_posts`, `blog_videos`, `blog_subscribers`, `admin_sessions`, `admin_login_attempts`). It is idempotent (`CREATE TABLE IF NOT EXISTS`), safe to run twice.
2. Create the admin password hash. The plain password must never be put in a file. Easiest options:
   - cPanel → Terminal (or SSH), then: `php -r "echo password_hash('YOUR_PASSWORD', PASSWORD_DEFAULT);"` (use single quotes around the password; if it contains `'` ask for help). Copy the output (starts with `$2y$`).
   - Or ask the developer to generate it for you (send the password through a private channel, then change it).
   Do not create a temporary web page to do this.
3. Add these two lines to `.env.php` on the server (this file is never committed or uploaded by deploys; keep the single quotes because the hash contains `$`):
   ```php
   define('ADMIN_EMAIL', 'you@example.com');
   define('ADMIN_PASSWORD_HASH', '$2y$10$PASTE_THE_FULL_HASH_HERE');
   ```
   The `define`s must be above any `require` of config.php (the file is loaded first by `api.php`, so just append them). `ADMIN_EMAIL` is also the support address used elsewhere; use an address you control.
4. Upload: `api.php`, `config.php`, `.htaccess`, `uploads/.htaccess`, and the new `out/` build. Do NOT delete `uploads/` when redeploying `out/` (it holds the uploaded images).
5. Create `uploads/blog/` (the code also tries to create it) with permissions 755 (775 if uploads fail with "Could not store the file"). Check `uploads/.htaccess` is present: it disables PHP execution there.
6. PHP needs >= 7.3 (cookie options), plus the `fileinfo`, `dom`, `mbstring` extensions (all on by default on GoDaddy; check cPanel → Select PHP Version if upload or posts fail). `upload_max_filesize` / `post_max_size` should be >= 5 MB (the default 2 MB would reject larger images with 413).
7. Test on a staging path first (see smoke test), then `/admin/`.

### curl smoke test (replace the placeholders; `-k` not needed on real HTTPS)

```bash
B=https://www.wealthnx.ai/api
JAR=/tmp/wnx.jar

# 0. not configured / health
curl -s $B/health

# 1. login (saves cookie, returns csrf)
curl -s -c $JAR -X POST $B/admin/login -H 'Content-Type: application/json' \
  -d '{"email":"you@example.com","password":"YOUR_PASSWORD"}'
CSRF=PASTE_CSRF_FROM_RESPONSE

# 2. who am I
curl -s -b $JAR $B/admin/me

# 3. create a post (published)
curl -s -b $JAR -X POST $B/admin/posts -H 'Content-Type: application/json' -H "X-CSRF-Token: $CSRF" \
  -d '{"title":"Smoke test post","category":"Insights","status":"published","content":"<p>Hello <strong>world</strong></p><script>alert(1)</script>"}'
#   -> 201, content has no <script>

# 4. public list + single
curl -s "$B/blog/posts?limit=3"
curl -s "$B/blog/post?slug=smoke-test-post"

# 5. upload an image
curl -s -b $JAR -X POST $B/admin/upload -H "X-CSRF-Token: $CSRF" -F 'file=@/path/to/photo.jpg'
#   -> {"url":"/uploads/blog/<24 hex>.jpg"}   (open https://www.wealthnx.ai<url> to confirm it loads)

# 6. missing CSRF must fail (expect 403)
curl -s -b $JAR -X DELETE "$B/admin/posts?id=POST_ID"

# 7. delete the test post
curl -s -b $JAR -X DELETE "$B/admin/posts?id=POST_ID" -H "X-CSRF-Token: $CSRF"

# 8. subscribe + CSV
curl -s -X POST $B/blog/subscribe -H 'Content-Type: application/json' -d '{"email":"test@example.com","source":"hero"}'
curl -s -b $JAR "$B/admin/subscribers?format=csv"

# 9. logout (then /admin/me must be 401)
curl -s -b $JAR -c $JAR -X POST $B/admin/logout -H "X-CSRF-Token: $CSRF"
curl -s -b $JAR $B/admin/me

# 10. reader rewrite: should return the reader shell HTML for any slug
curl -sI https://www.wealthnx.ai/blogs/smoke-test-post/ | head -1
```

If `/admin/*` returns `503 Admin is not configured`, step 3 was not applied (or the hash was pasted without the single quotes, which breaks the `$` characters).
