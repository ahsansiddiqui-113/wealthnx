# WealthNX Blog Admin - Owner Guide

The admin panel lives at `https://www.wealthnx.ai/admin/`. It is not linked from the public site and search engines are told not to index it. Bookmark it.

## One-time setup on GoDaddy (do these in order)
1. **Update the database.** cPanel -> phpMyAdmin -> click your database (`wealthnx_db`) -> **SQL** tab -> paste the blog part of `database.sql` -> **Go**. If the blog tables already exist, paste only the block that starts with `-- MIGRATION for installs created BEFORE the "layout" column` (it adds the new `layout` column; safe to run twice). Do this BEFORE step 4, otherwise the blog stops loading.
2. **Create your password hash.** cPanel -> Terminal (or SSH) and run (keep the single quotes, replace YOUR_PASSWORD):
   `php -r "echo password_hash('YOUR_PASSWORD', PASSWORD_DEFAULT);"`
   Copy the result (starts with `$2y$10$`). Never save the plain password in any file.
3. **Add your login to `.env.php`** (File Manager -> `.env.php` -> Edit; add these two lines, keep the single quotes):
   `define('ADMIN_EMAIL', 'you@example.com');`
   `define('ADMIN_PASSWORD_HASH', '$2y$10$...paste the whole hash...');`
4. **Upload the files** (File Manager or FTP): `api.php`, `.htaccess`, `uploads/.htaccess`, and the whole new `out/` folder contents. Never delete the `uploads/` folder when you re-upload.
5. **Create the image folder** `uploads/blog/` (right-click -> New Folder) with permissions 755 (775 if uploads say "Could not store the file").
6. **Log in** at `https://www.wealthnx.ai/admin/` with the email and password from steps 2-3.

Files changed for the 5 article styles (developer note): `api.php`, `database.sql`, `src/admin/*` (PostEditor, RichEditor, PostsView, sanitize, devMock, admin.css), `docs/`. Re-upload `api.php` and the new `out/` build.

## Layouts and special blocks (the 5 article styles)
Pick the style in **Layout / Style** (top of the right column in the post editor). Every post has one; old posts are Style 1. The page chrome (breadcrumb, category pill, title, "WealthNX Team - date - 10 min read" line, share buttons, 7-day trial card, "Keep reading", subscribe box, footer) is added automatically. You only supply: Title, Category, Author, Read minutes, Cover image and Content.

| Style | Looks like | Cover image | Good for |
|---|---|---|---|
| 1 | Centered title, wide cover, contents + share + trial card on the left | about 2:1 (2880 x 1380) | long guides with several H2 sections |
| 2 | Same top as 1, no sidebar, text full width | about 2:1 (2880 x 1380) | long reads, wide blocks |
| 3 | Grey header: title left, cover right; contents sidebar | 16:9 (1600 x 900) | posts with a video, tip and author box |
| 4 | No cover on the page; Related articles on the right | not shown on the page (still used on blog cards) | short posts |
| 5 | Grey header like 3, text full width | 16:9 (1600 x 900) | long reads with a nice header |

- **Contents list** (styles 1 and 3) is built from your **H2** headings, so use H2 for each section.
- **Insert block** (drop-down at the left of the editor toolbar; works in Visual and HTML tabs). Click where you want it, then choose:
  - *Callout ("short version")*: teal box with a small caps label; edit the label and text.
  - *Tip box*: teal box labelled "Tip".
  - *Checklist card*: grey card with a heading and tick-marked list items (edit or add list items).
  - *Author box*: grey card, the heading is the author name, then a short bio (styles 3 and 4 show one in the design).
  - *Note / disclaimer*: small grey text, e.g. "This is not financial advice."
  - *YouTube video card*: asks for a YouTube link and the length (like `3:24`); shows a thumbnail with a play button and opens YouTube in a new tab. Only YouTube links work.
- **Banners** (the teal/dark "Your Financial Clarity" pictures) are normal images: use **Image** in the toolbar (about 878 px wide, 3.3:1). Text on them is part of the picture.
- Suggested content per style: Style 1/2/5 = lead paragraph, "short version" callout, H2 sections with banners, Checklist card, Note. Style 3/4 = lead, H2s, bullet list, Callout, Tip, Author box; add a Video card in Style 3.
- Only these blocks are kept when you save; anything else pasted in is cleaned out. The Preview tab shows a simple approximation; the real arrangement is on the live page.
- Changing the Layout later is safe: content stays the same, only the arrangement changes.

## Troubleshooting
- "Admin is not configured." -> step 3 not done, or the hash was pasted without its single quotes / was cut short.
- Blog pages show an error after uploading the new `api.php` -> the migration (step 1) was not run.
- Image upload fails -> `uploads/blog/` missing or not writable (step 5); or the file is over 5 MB.
- Video card shows as a plain link -> the link is not a youtube.com / youtu.be address.
- A post does not appear -> it is still a Draft, or the Publish date is in the future (shows "Scheduled").

## Signing in
1. Open `/admin/`, enter the admin email and password, click **Sign in**.
2. The session lasts 12 hours. If it runs out you will see "Session expired." and the sign-in form; whatever you were editing stays on screen and is still there after you sign in again.
3. After 5 wrong attempts within 15 minutes from the same network you are blocked for a while ("Too many attempts. Try again later.").
4. "Admin is not configured." means the email/password hash has not been added to `.env.php` on the server yet (see docs/BLOG_API.md, deployment checklist).
5. Use **Sign out** in the left menu when you are on a shared computer.

## Writing and publishing a post
1. **Posts -> New post**.
2. Fill in the **Title** (required). The **Slug** (the web address of the post) is created from the title; you can type your own (lowercase letters, numbers, hyphens). Do not change the slug of a live post unless you must: old links would break.
3. **Excerpt**: the short text shown on cards. If you leave it empty it is created from the start of the article the first time you save.
4. **Content**: write in the Visual tab (toolbar: Insert block, Bold, Italic, H2, H3, lists, Link, Quote, Image, Clear formatting). The **HTML** tab shows the raw code, **Preview** shows how it will look. Pasted text is always pasted as plain text, so formatting from Word or websites does not leak in; re-apply bold/headings with the toolbar.
5. Choose the **Layout / Style** (see below), a **Category** (pick an existing one from the suggestions to keep the filter chips tidy), **Author**, and optionally **Read minutes** (leave empty to calculate it automatically).
6. Add a **Cover image** (see below).
7. Click **Save draft** to keep it private, or **Publish** to make it live. You stay on the page after saving. The browser warns you if you try to leave with unsaved changes.

### Draft vs Published, and the date
- **Draft**: visible only in the admin.
- **Published**: appears on `/blogs/` right away (no rebuild or upload needed), as long as the **Publish date** is not in the future.
- **Publish date**: leave it empty to use "now" when you publish. Set a future date/time to schedule the post: it shows as "Scheduled" in the list and appears on the site automatically when that time arrives. The date is shown in your local time and stored in UTC.
- To take a post down use **Revert to draft** on the edit page. **Delete** in the list removes it permanently.
- Publishing needs some content (text or an image).

### Featured and Trending
- **Featured** = the one big card at the top of "Trending Now". Only one post can be featured; ticking it on another post un-features the previous one.
- **Trending** = the small cards next to it (the 3 newest trending posts are shown).

## Images
- Cover image and in-article images: click **Choose file** or drag a file onto the box. Allowed: JPEG, PNG, WebP, GIF, up to 5 MB.
- Tips: cover image size depends on the style (2:1 for styles 1-2, 16:9 for 3 and 5); keep files under about 500 KB (use JPEG/WebP and compress them first, for example with squoosh.app); give article images a short description (alt text) when asked, it helps accessibility and search.
- Uploaded files are stored on the server in `/uploads/blog/` and are never deleted when you remove them from a post. Do not delete the `uploads/` folder when you re-upload the website.
- "Image too large (max 5 MB)" means the file is over the limit (or the hosting's PHP upload limit is lower than 5 MB, ask your host to raise `upload_max_filesize`/`post_max_size`).

## Videos ("Watch & Learn")
**Videos -> New video**: title, YouTube link (youtube.com / youtu.be), optional thumbnail (upload one or click **Use YouTube thumbnail**), description, duration like `5:24`, sort order (lower numbers first), status (Draft/Published), and **Featured** for the big video (only one). Only Published videos appear on the site.

## Subscribers
**Subscribers** lists email, source (hero or footer form) and date, 50 per page. The search box filters the page you are looking at. **Export CSV** downloads the full list (open it in Excel/Sheets). **Delete** removes a person from the list.

## Resetting the admin password
There is no "forgot password" page. To change it:
1. In cPanel -> Terminal (or SSH) run: `php -r "echo password_hash('NEW_PASSWORD', PASSWORD_DEFAULT);"` and copy the output (starts with `$2y$`).
2. Edit `.env.php` on the server and replace the value of `ADMIN_PASSWORD_HASH` (keep the single quotes around it, the hash contains `$`):
   `define('ADMIN_PASSWORD_HASH', '$2y$10$...');`
3. Save. The new password works immediately; sessions already signed in stay valid until they expire (to force everyone out, clear the `admin_sessions` table in phpMyAdmin).
Never type the real password into any file or chat.

## Notes for developers
- Source: `app/admin/page.jsx`, `src/admin/*` (CSS prefix `ad-`). It talks to `/api/admin/*` (see docs/BLOG_API.md).
- Local development has no PHP: when `/api/admin/me` is not a JSON API response, the app loads `src/admin/devMock.js` (only in `next dev`, never in the production build) and shows a yellow "Dev mock API" bar. Sign in with any email and the password `demo`; data lives in memory and is lost on reload.
