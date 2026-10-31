# Layout / misplacement audit, desktop (1440, 1920; spot 1280, 1024)

Method: live DOM measurement (bounding boxes, computed styles, image natural vs rendered size) in my own Browser tab, same-origin iframes for other widths, plus headless-Edge full-page screenshots (the Browser pane screenshot times out). Screenshots: `scratchpad/audit/shots/*.jpg` (e.g. h1440_*, h1920_*, feat1440_*, nw1440_*, wl1440_*, vv1440_*, gl1440_*, ct1440_*, pr1440_*, hw1440_*, cp1440_*, mm1440_*, yn1440_*, bl1440_*, wy1440_*, h1024_*).
Nothing in the repo was edited. Dev server not touched. My tab was reset to desktop and closed.

## Global results (verified)
- No horizontal overflow on any covered page at 1920 / 1440 / 1280 / 1024 (`scrollWidth == innerWidth`, no element outside viewport without a clipping ancestor).
- No 404 / failed resources (resource-timing `responseStatus >= 400`: none) and no broken `<img>` (all lazy images forced eager, 73 images on home, 0 broken).
- No image distorted (all `object-fit` fill images keep aspect). Only upscaled raster: `hd-glow-2.webp` 512px shown at 707px (1440) / 943px (1920), a blurred glow so harmless (low). Logo SVG scaling is vector, fine.
- No clipped text (the only `scrollWidth>clientWidth` hits are intentional sr-only labels `.ct-sr`, `.pr-sr`).
- Content does NOT jump on tab changes: home Why-WealthNX 5 tabs: section height constant 979px, doc height constant; /features/ 4 category tabs: `.fdt-product` 806px / `.fdt-orbit` 590px constant, doc height 2893 constant.
- Correction to the brief: Inter IS loaded (Google Fonts `<link>` in app/layout.jsx:61, 7 Inter faces `loaded`); Montserrat is declared but never used so stays `unloaded`. Text renders in Inter everywhere except one page (finding F1).

## Findings

### HIGH

**H1. Feature heroes using `herosection.png` render a black rectangle on the white hero** (voice-to-voice, proactive-ai, general-assistant, voice-and-action, build-mode; confirmed visually on /features/voice-to-voice/ 1440).
Evidence: `app/features/registry/ai.js` lines 97,126,155,188,210 use `/assets/herosection.png` (1600x1354, fully opaque near-black background, no alpha). Hero is `.fdt-hero` background #fff, art box 652x552. Result: a hard-edged black slab (with dark blurred shadow wings) under the dashboard, ~400px wide, bottom edge flat at the hero art box; reads as a bug against the other feature heroes (phone mockups on transparent PNG).
Fix (smallest): owner exports a transparent PNG/WebP of the dashboard+phone (same file name, per stand-in rule). Interim CSS-only option: none clean; a dark rounded tile (`border-radius:24px; background:#050707; overflow:hidden`) around the img for those slugs would at least look intentional.

**H2. Other feature hero art is hard-cropped flat at the bottom** (net-worth 765-987 phone, watchlist `stocksfeature.png`; seen in nw1440_00, wl1440_00): phone mockups end with a flat horizontal edge about 70px above the hero's bottom edge, on white. Net-worth also shows the "Assets" card cut by the "Liabilities" card (intended overlap) but the phone bottom is cut mid-screen.
Evidence: `.fdt-hero__visual{height:415px}`, `.fdt-hero-phone{max-height:440px;object-fit:contain}`; art files are crops (`*feature.png`). Fix: needs full-height exports from the owner (stand-ins), or fade the bottom with `mask-image:linear-gradient(#000 85%,transparent)` on `.fdt-hero-phone` (one CSS line).

**H3. Wealth Genie hero: "Stock" pill overlaps the subtitle paragraph below 1440** (verified with rects in iframes). 1440: pill right edge 989 vs paragraph left 990 (touching, y overlap 535-575 vs 551-611). 1280: overlap 18x24px. 1024: pill x paragraph 49x24 and Crypto pill x H1 1x24.
Evidence: `.gl-pill` absolutely positioned (src/page-components/GenieLanding.css) while paragraph sits in grid column 3. Fix: add a clamp or hide/reposition pill 3 (e.g. `left` in `%` of the phone box) or give `.fdt-hero__aside` `padding-left` growth at <1400px; at minimum `z-index` so text stays on top.

**H4. Visible TBD / dummy placeholders on live pages** (verified in DOM):
- /compare/ : 4x "TBD – supply approved comparison copy" (`span.cp-row__desc`, y 1794-2154 at 1440), always visible.
- /compare/monarch-money/: 7x `span.mc-tbd` "TBD" (y 928-962 inside the open "Fit" card, 4079, 4340, 4426, 4512 FAQ).
- /compare/ynab/: 16x `span.mc-tbd`, whole competitor column of the comparison table reads TBD, plus skeleton bars in the 1st card (yn1440_01).
- /pricing/: 32x `th.pr-cmp__label` "TBD – replace with real feature name", hidden inside the collapsed "Find the right WealthNX plan for you" accordion (pr-cmp h=215 collapsed) but appear on expand.
- /blogs/ : "No articles yet." (expected locally, no PHP/API; confirm on production). /blogs/read/?slug=x: "Something went wrong. Please try again." error state.
Fix: owner supplies copy; interim ponytail option: hide `.mc-tbd` rows / the compare-row description when text is `TBD` (single CSS/JS guard) so nothing shows "TBD" in production.

### MEDIUM

**M1. Blog post page: footer does not reach the viewport bottom, black strip underneath.** /blogs/read/?slug=x at 1440x900: footer bottom 800, viewport 900, so 100px of `body` (#030405) shows under the white footer; 1920x1080: 801 vs 1080 = 279px strip (error/short-content state; also real for short posts).
Evidence: `.bl` wrapper in BlogsPage/BlogPostPage has no min-height; `main.bp-main` h=165. Fix: `.bl{min-height:100vh;display:flex;flex-direction:column}` + `.bl .sf-footer{margin-top:auto}` (3 lines), or give `.bp-main{min-height:60vh}`.

**M2. Hero vertical rhythm is inconsistent between pages** (measured, 1440): void between hero top and first content: home ~260px (phone starts y~380 after header; H1 at y=655), net-worth 273, wealth-genie 177, compare 70, pricing 44. Hero heights: home/feature 778, genie 650, compare 660, pricing 1058, how-it-works 470, contact 490, blogs 628. On feature pages the left text block is bottom-anchored (`.fdt-hero{align-items:end;padding:160px ...}`): heading at y~453, subtitle 120px lower (net-worth: heading bottom y~551 vs subtitle top ~655 in page coords; screenshot nw1440_00 shows 130px gap) so heading and subtitle read as disconnected; subtitle+CTA are also indented ~14px relative to heading/badge (x=90 vs 79 in screenshot scale; `.fdt-hero__aside{padding:0 0 38px 15px}` and `.fdt-hero__copy` vs `__aside` are separate grid columns).
Fix: for pages with a short H1, set `.fdt-hero__copy{align-self:center}` or reduce top padding to 120px; `padding-left:0` on aside at >1000px if left aligned layout intended (only where subtitle sits under heading).

**M3. H1 / H2 sizes differ between sibling pages and sections** (computed font-size, weights vary 300/400/500/700):
- H1 @1440: home 47.5, features/net-worth/genie 47.5, contact 49, pricing 49, how-it-works 53.3, compare 53.3, blogs 51.9, why-wealthnx 48 (weight 400 vs 500 elsewhere).
- H1 @1920: 59 (home/features/genie), 62 contact, 52 pricing, 54 how-it-works, 58 compare, 69 blogs, 64 why. Pricing and how-it-works do not scale up at all; blogs jumps to 69.
- Home H2 @1440: Ask 49, Protect 49.7, Data 51, Why 49, Fragmented 44.2, Portfolio 48.4, Insights 56 (fixed), Voices 51.6, Download 38. @1920: 50 / 56 / 64 / 55 / 59 / 64.5 / 56 (fixed) / 68.8 / 50.8: the Ask (50) and Insights (56) H2 do not scale with the rest, so at 1920 section titles range 50 to 69px.
- Download section H2 (38px/700 "Know where you stand" footer and 38.07/500 "Your Financial clarity starts here") are consistent across pages.
Fix: one H1 token (e.g. `clamp(40px,3.3vw,59px)`) applied to hero H1s of pricing/how-it-works/compare/blogs/why; home H2 sections already use `--u` scaling, so just align `ha-` and `hr-insights` to the same `--u` scaling (they use clamp/fixed px).

**M4. Home Insights section (`.hr-insights`, "Get investment insights") does not scale and is off-centre at 1920.** Height fixed 760px (other sections scale: 1440 -> 1920 hf 1056 -> 1408, hpf 1026 -> 1368). At 1920 content spans ~x260-1518 (left margin 260, right margin 402), headline 56px unchanged, art small (h1920_05.jpg). Section `overflow: visible` while all siblings are `overflow: clip`.
Fix: wrap in the same `container-type:inline-size; --u: calc(100cqw/1440)` pattern the other sections use.

**M5. Baked-in artifacts in the Ask-card stand-ins** (home, "Ask About Your Money" grid): `home-ask-stock-card-sq.webp` (720x656, alpha) contains semi-transparent dark rectangles and a horizontal seam at y~95/165 (visible as dark blocks left of the chart at 1440 x 130-250, y 475-515 in h1440_01; also at 1024/1920), `home-ask-proactive-card-sq.webp` has a seam line and a notch at the left edge, and its subtitle floats ~85px below the title; Crypto card subtitle also far below title. Row-2 Stock card visually 5px narrower at the left than row-1 cards. Rendered size vs natural is fine (no upscale), so this is purely art quality.
Fix: owner re-exports (stand-in list already tracks `home-ask-*`); until then nothing cheap in CSS.

**M6. Header nav not centred and logo not on the page grid.** `.headerInner{grid-template-columns:190px minmax(0,1fr) 310px}` (TopBar.module.css:15-18). Link group centre = 660 @1440 and 900 @1920 vs page centre 720 / 960: 60px left of centre. Logo left edge x=36 (1440) / 105 (1920, header max 1710) while page content starts at 102 (hero), ~120 footer bottom bar, 170-210 elsewhere, so logo and buttons align to nothing.
Fix: `grid-template-columns:1fr auto 1fr` + `justify-self:end` on the action cell centres the nav; align `.headerInner` width to the common container if desired.

**M7. Inconsistent container widths / gutters across and within pages** (left edge of main content @1440):
- home hero 102, Ask grid 170, Protect cards 160, Connectivity 245, Why 232, Fragmented 187, Portfolio 266, Download 186, footer columns 256 (bar 121).
- /compare/: hero 86, "Quick comparison" heading 86 but its cards 210, "How WealthNX Stand Up" panel 100, FAQ 220 (cp-qcard L=210, cp-faq__item L=220, cp-panel h2 L=100).
- Monarch/YNAB: hero 102, fit accordion 218, comparison table 88 (wide, 1267px), 3 info cards 147, rest 195-196.
- /blogs/: promo card 236-1204, download banner and subscribe card 120-1320, newsletter row 207-1233: three different widths stacked.
Fix: not urgent per-section (Figma-driven), but pick 2 container widths (e.g. 1200 and 960) as tokens for the new pages (compare, monarch, blogs).

**M8. Why-WealthNX: text font falls back to Arial.** `.wp-mid` in src/page-components/WhyMid.css:2 sets `font-family: Arial, Helvetica, sans-serif` (computed on `.wp-mid-txt h2/p`), the 3 teal spans too; every other element on the page is Inter. Visible: the three mid sections' headings and paragraphs look different from hero, FAQ and footer.
Fix: change that declaration to `font-family: inherit` (1-line).

**M9. Why-WealthNX swirl crosses the text.** `.wp-top-one__swirl` 430,968-998,1258 overlaps H2 (460,984-980,1100) and paragraph (450,1120-990,1216); the ellipse stroke runs through "One Place For More Of" and the paragraph lines at left/right (wy1440_00). `pointer-events:none`, z auto. Probably the design's hand-drawn ring, unverified; if kept, make the ring larger (+60px each side) or place it behind with lower contrast.

**M10. Repeated identical art in three consecutive panels (why-wealthnx).** `why-mid-art-a/b/c.webp` show the same phone-cluster composition in 3 stacked sections (wy1440_01-02) and the same cluster again on home "insights"; looks like copy paste.
Fix: owner supplies per-panel art (stand-ins list).

**M11. Compare/Monarch/YNAB FAQ shows duplicate and misspelled items.** Monarch/YNAB FAQ lists 5 questions where "Can one finance app track both money and investments?" and "Is this comparison finanical advice?" ("finanical" typo) each appear twice (y 4005/4352 and 4266/4438). Mixed answers: only one open. Per the Figma-exact rule: flag to owner; if they are placeholders, remove the dup pair.

### LOW

- L1. Contact: 1px visible seam between hero and form section at y=490 (`.ct-hero` has `border-bottom:1px`, `.ct-hero__bg` height 489, bg #0e0e0e vs section #070707). Fix: drop the border or extend `.ct-hero__bg` by 1px.
- L2. Home colour seams between dark sections: Protect/Why are inset white cards (margin 6px sides, 16px bottom) over `#071011` host; Ask #000, Connectivity #090909, Fragmented/Portfolio/Insights #0c0c0c, Voices #071011, Download #0b0b0b, partner strip #000. Tonal steps of 4-12 RGB levels, visible as faint bands between Ask/Connect and Download/footer (compare mm1440_03: FAQ #0b0b0b vs download gradient start). Fix: unify to two tokens.
- L3. How-it-works: grey CTA-wrapper gradient ends in a hard edge against the white footer at y~3175 (`.hw-cta-wrap` to `.sf-footer`); the footer's rounded top corners are invisible on a white page. Hero decoration asymmetric (left arch cut by the viewport edge, right arch fully visible; hw1440_00).
- L4. Mega menu (Features): 1100px wide, centred, rows 191x40 uniform, `max-height:calc(100vh - 124px); overflow-y:auto` handles short screens. No problem found; opacity was 0 in my background tab (hover not exercised), geometry read only (L170-R1270, T100-B750 @1440).
- L5. Heading levels: feature card titles are `H2` at 15px (net-worth "Live Net Worth" etc.), genie list items `H3` at 11px, how-it-works `H3` 13px: semantic only (a11y), size is fine.
- L6. Pricing: Plus card is 7px taller/raised (Most Popular) vs Core: intentional; plans, FAQ and "Designed to help" panel widths are consistent (1000 / 960 / 860: three widths, low).
- L7. Footer: the four link columns (256-844 at 1100px scale) are narrower and not aligned with the bottom bar (121-980) and logo/tagline; same on every page (consistent, so cosmetic).
- L8. Voices avatars are halftone dither stand-ins (low quality, `home-voices-*`); Download phones `home-download-phones.webp` on /blogs/ banner looks soft at 1440 (stand-in). Blogs banner store buttons ("Google Play" first, white pills with grey bar icon) differ from home/feature Download buttons ("Download for iphone" first). Duplicate newsletter forms on /blogs/ ("Stay in the know" at top and "Subscribe to our blog" at the bottom).
- L9. /features/ carousel: the "Learn more" button box (y 1712-1751) overlaps the slide image box (1418-1731) by ~19px at 1440, so the lower edge of the phone art is covered (feat1440_01). Fix: `.fdt-orbit>img{bottom:132px}` or button `bottom:50px`.
- L10. Portfolio section on home repeats the sub-heading "See your everyday finances clearly / Connect your bank, brokerage ..." that already appears in the Fragmented section (H3 y=4867 and y=5896 @1440); also stock list row "Apple Inc. / BTC" mismatch (ticker). Compare to design before changing.
- L11. Home page height is 9883 at 1440 once images are loaded, 9696 in an early measurement: I saw section heights grow after image load (ha 1182 -> 1216, hp 738 -> 789, hf 1016 -> 1056) in one run but could not reproduce on a clean reload (stable 9883 for 10s). Unverified layout shift; check CLS (give the lazy images explicit width/height or aspect-ratio).

## Things checked and OK
Footer (identical, white, rounded top, same links on all pages); partner strip (logos keep ratio 185x100 etc., seamless marquee); no sticky/z-index overlaps found in header vs hero (header z 1000, mega menu z via fixed); cards equal size in rows (Ask grid, Connectivity 3 cards, Protect 4 cards, pricing, Monarch info cards all equal heights); no console-error check done here (not in scope of this agent).

## Not verified
Hover state of the mega menu visually; screenshots of 1280 pages beyond overflow numbers; anything below 1024; /admin/ (out of scope).
