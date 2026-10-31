# Blog article page: the 5 layout styles (spec)

Source: five full-page Figma exports of the article detail page, 2050 px wide JPGs (frame = 1920 px desktop + ~64 px margin each side). No mobile frames were supplied. All measurements below are read off the raster (1 px of a 1500-wide preview = 1.367 design px) so treat sizes as "about" and confirm in Figma Inspect before pixel-polishing. Colours were sampled from pixels.

| Style | File (in `Downloads\FOR AHSAN`) | Height | One-line description |
|---|---|---|---|
| Style 1 | `WealthNX article detail.jpg` | 8220 | Centered title, wide cover, **sidebar** (contents + share + trial card) + 880 px body |
| Style 2 | `WealthNX article detail-1.jpg` | 7429 | Same hero as 1, **no sidebar**, single 1440 px text column |
| Style 3 | `WealthNX article detail-2.jpg` | 6613 | **Split hero** (title left, cover right) on grey band, sidebar as style 1, video + tip + author box |
| Style 4 | `WealthNX article detail-3.jpg` | 5328 | **No cover image**; title + body left, **"Related Articles"** column right |
| Style 5 | `WealthNX article detail-4.jpg` | 7184 | Split hero as 3, single 1440 px text column as 2 |

The two sample articles: article A (styles 1, 2, 5) "Stop Juggling Multiple Finance Apps..." with 5 H2s; article B (styles 3, 4) the same title, shorter, with a bullet list, Tip and (style 3) a video. Body text is sample content, not design chrome.

## 1. Shared by all 5 (design chrome, identical text)

- **TopBar**: existing component; "Blogs" item teal (active). Buttons "Login" (outlined) and "Get Started" (black). Nav text: Features, Wealth Genie, Blogs, Pricing, Contact, How it works?
- **Breadcrumb** under the nav: `<- All articles  /  Business` (arrow icon + "All articles" dark link, "/" and the category in grey). About 18 px. Category = the post's category.
- **Category pill**: lime `#C3EE58`, dark text, fully rounded. Size: style 1/2 about 34 px high / 15 px text (centered); style 3/4/5 about 42 px high / 20 px text (left-aligned).
- **Title** (H1): Inter, regular/medium, about 72 px / 85 px line, tight tracking, `#111`. Centered in 1/2, left in 3/4/5. Sample: "Stop Juggling Multiple Finance Apps. Here Is the One That Does It All".
- **Meta row** under the title: `WealthNX Team · Oct 2, 2026 · 10 min read`, about 19 px, grey `#6b6b6b`, middle-dot separators. NOTE: no "By " prefix (the current reader prints "By {author}").
- **Body typography**: Inter. Lead (first paragraph) about 24 px, near black; following paragraphs about 22 px / 36 px line, grey-dark (`#3d3d3d`-ish); H2 about 36 px semibold `#111`, about 80 px space above; paragraph gap about 20 px. Links/teal accent `#17A79A` (already `#17a79a`/`#0f8f84` in code).
- **Inline banner images** (they are images with baked-in text): max about 878 px wide x ~267 px high (3.3:1), radius ~24. Two kinds: teal "Your Financial Clarity / Starts 7-Day Free Trial" (with "Download Now", Google Play + App Store badges) and dark "Your Financial Clarity / Starts Here" (sub-line "Connect accounts, track net worth, analyze stocks and crypto, and get clear answers from AI, all in one place." + Google Play / App Store badges). Centered in the 1440 column (styles 2, 5), left-aligned in narrower columns (1, 3, 4).
- **Callout blocks inside the body** (see section 3 for the markup): "short version" box (light teal `#E6F6F5`, radius ~24, large 24 px text), plain callout (same box without label), "Tip" box (same teal, smaller 18 px text, bold teal label), all in styles that use them.
- **"Keep reading"** (all 5, after the article): heading "Keep reading" (about 45 px semibold, left), link "View all articles >" (right, ~20 px), then 3 cards in a row, each card: grey `#F7F7F7`, radius ~32, 14 px padding, cover (about 512 x 361, radius ~24), lime category pill, title (28 px regular, up to 3 lines) with a top-right "up-right arrow" icon, date in grey ("Sep 15, 2025"). Cards are top-aligned (a 3-line title card is taller). Container is 1727 px wide (wider than the 1440 article column). Reuse `BlogsCard`.
- **Subscribe band** (all 5): light teal `#E2F5F3`, radius ~32, 1727 x ~220. Left: envelope illustration, "Subscribe to our blog" (36 px semibold), "Get the latest posts in your inbox.". Right: label "Email address", input placeholder "Enter your email address" (white, thin border), button "Subscribe" (dark teal `#014747`, white text, radius ~8), note "Unsubscribe anytime. Privacy Policy" (Privacy Policy underlined teal). This is the existing `BlogsSubscribe` footer variant.
- **Footer**: existing `SiteFooter` (logo, "Know where you stand" with "where" teal, columns Explore: About Us / Features / Pricing / Contact; Others: Blog / Privacy Policy / Terms of Service / FAQ; Contact us: +1 407-600-4801, support@wealthnx.ai, "424 E Central Blvd, Ste 248, Orlando FL 32801-1923 United States"; 4 round social icons; "(c) 2026 WealthNX. All rights reserved."; "Privacy Policy | Terms of service"). Verify it matches the live footer; not part of this work.

## 2. Per-style block list (top to bottom)

### Style 1 (`WealthNX article detail.jpg`)
1. TopBar. Page background: vertical gradient `#E4E4E4` (top) to white by about y=740.
2. Breadcrumb (x about 236, y about 185).
3. Pill "Business" centered (y about 259).
4. Title, 2 lines centered (y about 310-480).
5. Meta row centered (y about 520).
6. **Cover**: image 1440 x ~690, radius ~40 (sample is the dark dashboard collage), y about 586-1275.
7. Two columns from y about 1360, container 1440: **left sidebar 386 px** (inset ~30 px from the container edge), gap ~120 px, **body 880 px**.
   - Sidebar: label "In this article" (semibold ~19 px); list of 5 H2 titles as links, each with a 2 px vertical bar on the left: active item teal text + teal bar, others grey text + light grey bar (items: "The hidden work of switching apps" (active), "Start with the picture you want to see", "What to look for in a single home base", "Make the switch without losing the details", "Build a calmer money routine"); thin divider; "Share this article" (~19 px); 4 round 40 px buttons (facebook "f", LinkedIn "in", Instagram, X); "Copy link" with link icon; then **trial card** 386 x ~276, radius ~24, dark-teal-to-black gradient with a faint WealthNX "W" watermark bottom right: "7-Day Free Trial" (white, ~36 px semibold), "Open WealthNX instantly." / "No signup. No credit card." (white, ~22 px light), lime `#9FFD5E` pill button "Get Started" + white circle with black arrow. Whether the sidebar is sticky is not visible in a static export: TBD.
   - Body (880): lead; "short version" callout (label "THE SHORT VERSION" teal caps ~15 px, text "Consolidate the view, not necessarily the accounts. Choose tools around the questions you need to answer-and keep the details easy to verify."); H2 sections; teal banner after the first section; dark banner before the last section; last: **checklist card** (grey `#F7F7F7`, radius ~24, shield icon + heading "Before you connect an account", three items with a check mark: "Understand what access you are granting and whether it is read-only." / "Review how your data is used, stored, and shared." / "Check how to revoke access and export or delete your information."); small grey disclaimer "Illustrative editorial guidance for general information only. This is not financial advice. Review a service's current terms and permissions before connecting your accounts." (~15 px); thin divider; row "<- Back to all articles" (left) and "Back to top (up arrow)" (right).
8. "Keep reading" row, 9. Subscribe band, 10. Footer.

### Style 2 (`...-1.jpg`)
Identical to style 1 steps 1-6 (same gradient background, centered pill/title/meta, 1440 cover), then **no sidebar, no contents list, no share, no trial card**. Body is one column **1440 px wide** (lead 24 px wraps in two lines), callouts/checklist/disclaimer/divider/back row are 1440 wide; banners stay ~878 px and are centered. Back row as style 1. Then Keep reading, Subscribe, Footer.

### Style 3 (`...-2.jpg`)
1. TopBar on white.
2. **Hero band**: full frame width (1920), about 623 px high (y 182-805), colour `#F0F4F5`. Left column (x about 182): breadcrumb, large pill "Business" (42 px), 3-line title (left-aligned), meta row. Right: cover 700 x ~394 (16:9), radius ~20, x about 1040-1740.
3. Two columns (386 sidebar + 880 body) as style 1, starting about 120 px under the band. Sidebar: "In this article" with only 3 items: "Why one view matters" (active), "What to look for in an app", "Getting started" (note: the H2 "The hidden work of switching apps" is in the body but NOT in this list, see typos/inconsistencies); divider; "Share this article" + icons + "Copy link"; trial card (same as style 1).
4. Body: lead ("Many people keep banking in one app, investments in another and a budget in a spreadsheet. Each one is useful alone. The trouble is that no single screen shows how they fit together, so small leaks and big trends are easy to miss."); H2 "Why one view matters"; paragraph; **bullet list** (teal dot bullets: "One net worth figure that adds up your accounts", "Spending grouped by category and merchant", "Bills and subscriptions with their due dates"); plain **callout** "The goal is not more data. It is one place where the numbers agree with each other."; H2 "The hidden work of switching apps" + 3 paragraphs; **video card** 880 x ~495 (16:9, radius ~32): thumbnail "COMBINED FINANCE / SHARED CLARITY / Introducing Family Accounts" with WealthNX logo and two people at a laptop, centered white circle with black play triangle, top-right pill "3:24" (translucent dark), bottom-right pill "Watch on" + YouTube logo; H2 "What to look for in an app" + paragraph; dark banner; H2 "Getting started" + paragraph; **Tip** box (label "Tip" bold teal ~15 px, text "Start with the account you use most. It gives you the quickest sense of whether the app's categories fit your life."); thin divider; **author box** (grey card, radius ~24): "WealthNX Team" (semibold) + "Writing about budgeting, net worth and staying in control of your money. Content is for information only and is not financial advice."; teal banner as the last element. No disclaimer line, no "Back to all articles / Back to top" row.
5. Keep reading, Subscribe, Footer.

### Style 4 (`...-3.jpg`)
1. TopBar on white. Breadcrumb (x about 182).
2. **No cover image and no hero band.** Left article column (x about 182, width **~1009 px**): large pill, 3-line title, meta, then the body directly (lead, H2 "Why one view matters", paragraph, bullet list (same 3 bullets), callout, H2 "The hidden work of switching apps", 3 paragraphs, H2 "What to look for in an app", paragraph, dark banner (left-aligned, 878 px), H2 "Getting started", paragraph, Tip, divider, author box). No video, no teal banner, no disclaimer, no back row.
3. Right column (x about 1344, width **~394**, top aligned with the pill): heading "Related Articles" (~44-48 px semibold) then 3 stacked cards (grey `#F7F7F7`, radius ~28; cover 366 x ~257; title "What Does Read-Only Account Access Mean?" / "Money Leaks: How AI Can Help Identify Spending Patterns" / "How to Calculate Your Total Assets" with up-right arrow; small date "Sep 15, 2025" / "Sep 9, 2025" / "Aug 3, 2025"; NO category pill in these small cards). Sticky or not: TBD.
4. Keep reading (the same 3 posts again), Subscribe, Footer.

### Style 5 (`...-4.jpg`)
Hero band exactly as style 3 (breadcrumb, pill, 3-line title, meta, right cover 700 x 394). Then the body exactly as style 2: single 1440 column, lead + second paragraph, "short version" callout, article A sections, banners centered, checklist card, disclaimer, divider, back row. No sidebar. Then Keep reading, Subscribe, Footer.

### Typos / inconsistencies found (no spelling typos in design chrome)
- Contents list in style 3 omits the H2 "The hidden work of switching apps" (3 of 4 headings). Style 1 lists all 5 H2s.
- Related cards show "Sep"; the current `formatDate` writes "Sept" (it was drawn "Sept" on the Blogs list page). Reader cards in this design say "Sep 15, 2025".
- Footer: "Terms of Service" (Others column) vs "Terms of service" (bottom row): casing differs in the design (existing footer behaviour, verify).
- Style 4 shows the same 3 posts twice (Related Articles + Keep reading).
- Meta row has no "By ", unlike the current reader.
- Unreadable/TBD: tiny text inside the banner images and the dashboard cover (baked into images, owner supplies the images); sidebar/related stickiness; hover/active states; every mobile layout.

## 3. Comparison

| Aspect | S1 | S2 | S3 | S4 | S5 |
|---|---|---|---|---|---|
| Breadcrumb, pill, H1, meta | yes | yes | yes | yes | yes |
| Hero | centered, wide cover on grey-to-white gradient | same as S1 | split band, cover right | none | split band, cover right |
| Cover image used | yes (2:1 crop) | yes | yes (16:9) | **no** | yes (16:9) |
| Title alignment / pill size | center / small | center / small | left / large | left / large | left / large |
| Contents ("In this article") | yes | no | yes | no | no |
| Share bar + "Copy link" | yes (sidebar) | no | yes (sidebar) | no | no |
| Trial card ("7-Day Free Trial") | yes | no | yes | no | no |
| Related Articles column | no | no | no | **yes** | no |
| Text column width | 880 | 1440 | 880 | 1009 | 1440 |
| Lead paragraph (dark, larger) | yes | yes | yes | yes | yes |
| Callouts used in sample | short version | short version | plain + Tip | plain + Tip | short version |
| Checklist card | yes | yes | no | no | yes |
| Video card | no | no | yes | no | no |
| Author box | no | no | yes | yes | no |
| Disclaimer + "Back to all articles / Back to top" row | yes | yes | no | no | yes |
| Banners in sample | teal + dark | teal + dark | dark + teal | dark | teal + dark |
| Keep reading, Subscribe, Footer | yes | yes | yes | yes | yes |

Observation: everything inside the text column (lead, callouts, tip, checklist, disclaimer, author box, video, banners) is body content the editor can place anywhere. The layouts differ only in wrapper: hero type (center / split / none), side column (contents+share+trial / related / none), column width, and whether the back row is shown.

## 4. Data model (smallest that covers all five)

**One new column, no JSON column.** Everything else is reused or computed.

| Field | Type | Required | Used by | Where |
|---|---|---|---|---|
| `layout` | string `style1`..`style5` | no (default `style1`) | all | new column `blog_posts.layout` |
| `cover_image` (existing) | path | S1,2,3,5 (ignored by S4) | S1,2,3,5 | existing column |
| `title`, `category`, `author`, `published_at`, `read_minutes` (existing) | | | all | existing columns (meta row, breadcrumb, pill) |
| `content` (existing) | sanitized HTML | yes to publish | all | existing column, extended allow-list below |
| contents list | computed | | S1, S3 | reader builds it from the H2s of `content` after sanitizing (adds `id`s client-side) |
| related / "Keep reading" | computed | | all (Related only S4) | reader: same category first, then newest, excluding this post, max 3 (uses existing `GET /blog/posts`) |
| share, trial card, back row, subscribe, footer | fixed chrome | | per table above | reader code, not data |
| author box (name + bio) | content block | | S3, S4 (any) | `blockquote.wx-author` in `content` (author name is typed into the block; no author_bio column) |
| callouts, tip, checklist, disclaimer, video | content blocks | | any | class-marked blocks in `content` |
| banner images | content images | | any | `<p><a><img></a></p>` or `<p><img></p>` in `content` |

Rejected as unnecessary: subtitle, key-takeaways list, pull quote, CTA text/link fields, `extras` JSON, avatar, hero variant field (the layout fully determines it). Add `extras` only if the owner later asks for something that cannot live in `content`.

### Content allow-list extension (server `blogSanitizeChildren` AND client `src/admin/sanitize.js`, they must match)

Current: p h2 h3 h4 ul ol li a strong em blockquote img br code pre; attrs: `a[href]`, `img[src,alt]`. **No new tags.** Add one attribute with exact-match values (anything else is dropped, never passed through):

| Tag | `class` allowed (exact, single value) | Meaning | Required inner markup |
|---|---|---|---|
| `blockquote` | `wx-callout` | teal callout; optional first `<h4>` = caps label ("The short version" renders as "THE SHORT VERSION" via CSS) | `<h4>` optional + `<p>` |
| `blockquote` | `wx-tip` | teal Tip box | `<h4>Tip</h4><p>..</p>` |
| `blockquote` | `wx-check` | grey checklist card (shield icon on the `h4`, check marks on `li` via CSS) | `<h4>` + `<ul><li>..</li></ul>` |
| `blockquote` | `wx-author` | grey author box (the `h4` is the name) | `<h4>WealthNX Team</h4><p>bio</p>` |
| `p` | `wx-note` | small grey disclaimer | text |
| `a` | `wx-video` | video card; href must be a YouTube URL (youtube.com, youtu.be, youtube-nocookie.com, same rule as admin videos) else the class is dropped | `<a class="wx-video" href="https://youtu.be/ID" data-duration="3:24"><img src alt></a>` inside a `<p>` |

Also allow `data-duration` on `a.wx-video` only, value must match `^\d{1,2}(:\d{2}){1,2}$` (else removed). The reader draws the play circle, the duration pill and the "Watch on YouTube" pill with CSS/inline SVG, and the card opens the YouTube link in a new tab (existing external-link handling: `target=_blank rel="noopener noreferrer"`). No iframe, figure/figcaption, table or div is added (none in the designs; `div` stays mapped to `p` on the client). Keep emitting `<p><a class="wx-video">` (top-level inline elements get wrapped by the client sanitizer). Images keep `src`/`alt` rules (`/uploads/blog/`, `/assets/`, https).

Every new class is rendered only by `.bp-body ...` rules, so unknown/ copied HTML cannot style-hijack the page.

## 5. Admin implications (checklist for the admin agent)

- [ ] Add a **Layout** card at the top of the right column in `PostEditor.jsx`: 5 radio tiles with a small preview thumbnail each (crop from the Figma exports, save as `public/assets/blog-style-1..5.webp`, about 240 px wide), label + one-line help text. Default `style1` for new posts; existing posts without a value load as `style1`.
  Suggested labels: 1 "Cover + contents sidebar", 2 "Cover, single column", 3 "Split header + contents sidebar", 4 "Text + related articles", 5 "Split header, single column".
- [ ] Send `layout` in the save body; show it in `toForm`/`EMPTY` and in the dirty snapshot.
- [ ] Per-layout help under the Cover image field: S1/S2 "Wide image, about 2:1 (e.g. 2880 x 1380); 16:9 is cropped at the top/bottom"; S3/S5 "16:9 (1600 x 900)"; S4 "Not used by this layout (still used on blog cards and social previews)". Keep the field visible for S4 (cards need it).
- [ ] Per-layout hints: S1/S3 "Contents list is built from your H2 headings"; S4 "Related articles appear on the right automatically".
- [ ] Rich editor (`RichEditor.jsx`): toolbar buttons that insert the class-marked blocks above (Callout, Tip, Checklist, Author box, Note, Video link). Minimum viable: an "Insert block" dropdown that inserts a snippet in the HTML tab and a Preview tab that renders it with the reader's `.bp-body` CSS (import `BlogPostPage.css` styles). Update `src/admin/sanitize.js` and the HTML-tab warning text accordingly.
- [ ] Keep the existing excerpt, read minutes, author and category fields (the meta row and pills need them). Add a one-line editor tip: "Put the author name in the author box if you want one (styles 3 and 4 show it in the design)".
- [ ] Preview tab should apply the chosen layout wrapper class so the owner sees the real arrangement (optional, nice to have).
- [ ] Update `docs/ADMIN_GUIDE.md` with a "Layouts and special blocks" section.
- [ ] `devMock.js`: add `layout` to the mock posts.

## 6. Backend implications

- **Column**: `layout VARCHAR(12) NOT NULL DEFAULT 'style1'` on `blog_posts` (VARCHAR instead of ENUM so a style 6 later needs no ALTER).
- **`database.sql`**: add the column to the `CREATE TABLE IF NOT EXISTS blog_posts` for new installs.
- **Existing installs** (MySQL 5.7 has no `ADD COLUMN IF NOT EXISTS`): add this idempotent block to `database.sql` below the table and to the deploy checklist; the owner pastes it in phpMyAdmin (safe to run twice):
  ```sql
  SET @c := (SELECT COUNT(*) FROM information_schema.COLUMNS
             WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'blog_posts' AND COLUMN_NAME = 'layout');
  SET @s := IF(@c = 0,
    "ALTER TABLE blog_posts ADD COLUMN layout VARCHAR(12) NOT NULL DEFAULT 'style1' AFTER category",
    'SELECT 1');
  PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;
  ```
  Deploy order: run the SQL BEFORE uploading the new `api.php` (the new `blogPostColumns` selects `layout`; otherwise every post query fails). Do not run DDL from `api.php` at request time.
- **`api.php`**:
  - `blogPostColumns()`: add `layout`; `blogFormatPost()`: output `'layout' => in_array($r['layout'], ['style1'..'style5'], true) ? $r['layout'] : 'style1'`.
  - Create (`POST /admin/posts`): optional `layout`, default `style1`; unknown value => `400 {"error":"layout must be one of style1, style2, style3, style4, style5"}`. Update (`PUT`): partial, only changed when present. Add `layout` to the INSERT/UPDATE column lists.
  - `blogSanitizeChildren()`: `class`/`data-duration` handling exactly as in section 4 (constants list `$classes = ['p'=>['wx-note'],'blockquote'=>['wx-callout','wx-tip','wx-check','wx-author'],'a'=>['wx-video']]`; the `a.wx-video` YouTube host check reuses the existing YouTube URL validator from the videos code).
- **API shape**: `Post` gains `layout` (string). Present on `GET /blog/post` (reader) and all admin post responses; list endpoints may include it (harmless) but the reader does not need it. Backwards compatible: old rows and old clients without the field behave as `style1`.
- Update `docs/BLOG_API.md` (Post object, post fields, sanitizer allow-list) and `docs/BLOG_PLAN.md` section 1 content-format row.

## 7. UI implications

- **Structure**: keep ONE `BlogPostPage` (fetch, head/JSON-LD, states, skeleton stay as they are) and drive the arrangement from a const table, no five separate templates:
  `LAYOUTS = { style1:{hero:'center', aside:'toc', back:true}, style2:{hero:'center', aside:null, wide:true, back:true}, style3:{hero:'split', aside:'toc', back:false}, style4:{hero:'none', aside:'related', back:false}, style5:{hero:'split', aside:null, wide:true, back:true} }`; unknown/missing => `style1`. Root gets `data-layout` + modifier classes.
- **Shared pieces** (small components in `src/page-components/`, new files only where needed): `PostHero` (variants center/split/none), `PostToc` (H2 list, scroll-spy active state, `id`s added to the sanitized DOM after render), `PostShare` (facebook/linkedin/x share URLs + Copy link), `PostTrialCard` (fixed card), `PostBody` (sanitized HTML), `PostBackRow`, `KeepReading` (3 `BlogsCard`s, heading "Keep reading", link "View all articles"), `BlogsSubscribe` (existing footer variant), `SiteFooter`. `PostRelated` (style 4 sidebar) reuses a compact card (no pill).
- **CSS**: keep prefix `bp-` in `BlogPostPage.css` (rewrite; the current 720 px neutral reader goes away), layout modifiers `bp--s1..bp--s5`, content blocks `.bp-body .wx-*`. Sizes as `N * var(--u)` against a 1440 container (`--u: calc(100cqw / 1440)`) per `docs/AI_WORKFLOW.md`, with the 1727 px Keep reading/Subscribe container reusing `bl-c`.
- **Mobile**: no design supplied. Proposal to confirm: hero stacks (cover under title), sidebar content moves under the body (share + trial card) with contents list hidden, Related column becomes the Keep-reading swipe row, banners/video scale to 100%.
- **Assets** (stand-in unless noted; owner replaces):
  | Asset | Where | Status |
  |---|---|---|
  | Cover "dashboard collage" (dark UI cards) | cover of the sample post | real (owner-supplied via admin upload); needs 2:1 crop version for S1/S2 |
  | Teal banner "Your Financial Clarity / Starts 7-Day Free Trial" | in article body | owner supplies; check whether `public/assets/financialclarity.png` is it |
  | Dark banner "Your Financial Clarity Starts Here" | in article body | owner supplies |
  | Video thumbnail "Combined Finance / Shared Clarity" (couple + laptop) | S3 video | owner supplies |
  | 3 related/Keep-reading covers (dashboard dark, phone + competitor logos, laptop on desk) | cards | come from real posts' covers; stand-in crops from the designs for now |
  | Trial card background gradient + "W" watermark | sidebar | CSS gradient + existing logo asset; no new image needed |
  | Envelope illustration, social icons, arrows, shield, check, link, YouTube logo | chrome | existing (subscribe) / inline SVG |
  | 5 layout preview thumbnails | admin | crop from the 5 Figma exports (stand-in is final) |

## 8. Open questions for the owner

1. Contents list: auto from all H2s (style 3 design lists 3 of 4 H2s). OK to list every H2?
2. Instagram share icon: there is no web share URL for Instagram. Link to the company Instagram profile, or hide it?
3. Style 4 shows the same 3 posts twice (Related column + Keep reading). Keep both as designed, or drop Keep reading on style 4?
4. Trial card "Get Started": same destination as the top-bar Get Started button? Should the sidebar/related column be sticky while scrolling?
5. Video card: open YouTube in a new tab (proposed), or play inline in the page?
6. Remove "By" before the author (as designed) and use "Sep" (as drawn here) instead of "Sept" in the reader?
7. Cover image: one image per post. Supply 2:1 for styles 1/2 (16:9 will be cropped there). Acceptable?
8. Are there mobile frames for these five pages? Without them the mobile layout follows the proposal in section 7.
9. Existing posts become style 1 automatically. OK?
