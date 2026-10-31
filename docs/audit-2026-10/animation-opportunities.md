# WealthNX animation audit (code + live)

Scope: read-only. Live checks on http://localhost:3333 (own tab, now closed; viewport reset). The Browser pane was hidden, so no screenshots, CLS or LCP could be captured (marked "unverified" below). Measurements are DOM/computed-style based.

Note: one early JS call ran without a tabId and hit the owner's fronted tab (/compare/). It only read data (document.getAnimations, computed styles). Nothing was changed.

---

## 1. Inventory: what motion exists

### 1.1 Libraries
| Lib | package.json | Actually used? |
|---|---|---|
| framer-motion ^12.40 | yes | Only via `components/MotionComponents.tsx`. Root layout imports `ScrollProgress` from it, so framer ships on EVERY page (chunk 78 in the stale `out/` build is 135 kB raw / 44 kB gzip; estimate, that build is from Sep 10). Other exports (`Reveal`, `StaggeredChildren`, `HoverTilt`, `BlurReveal`, `FloatingElement`, `GlowPulse`, `ParallaxElement`) are used ONLY by `/motion-demo`. `LayeredCard` is used via `PremiumCard` (legacy pages: support, SupportFaqList). |
| gsap ^3.15 | yes | NOT used anywhere in app/src/components/lib (0 imports). Dead dependency. |
| lenis ^1.3.23 | yes | NOT used. Verified live: `window.lenis` undefined, no lenis script, `<html>` has no `lenis` class, no `.lenis` CSS rule, no `new Lenis` in code. **docs/AI_WORKFLOW.md (lines 134, 168) says Lenis is on; that is wrong.** Scrolling is native, so `window.scrollTo` works. Only mention in code is a marketing string in `app/motion-demo/page.jsx:111`. |
| tailwind | in devDeps | No `tailwind.config`, no `postcss.config`, no `@tailwind` directive. Tailwind classes in code do not exist (see 1.4 ScrollProgress). |

### 1.2 Existing animations by place (live-verified where noted)
| Where | What | File | Reduced motion |
|---|---|---|---|
| Home hero phone | Intro: translateY(60vh)->0 plus rotateY 0->360, 1.6s, `backwards` fill (home: `HomeRedesign.css:131`; /features/: `FeatureMobile.css:111`; /features/<slug>/: `FeaturePage.css:103`). Three copies of the same keyframes. | css | off (all three) |
| PartnerStrip marquee | transform translateX, 10s linear infinite, 6 copies x 4 logos = 24 imgs. Only infinite animation on home (verified: 1). No pause on hover. | `PartnerStrip.module.css` | off |
| Why WealthNX tabs (home) | Auto-advance setTimeout 6s, only while section >=30% visible and not focused. Panel swap is a hard cut (no transition, no key, no progress indicator). Pause only on focus (`onFocus`/`onBlur`), not on hover or touch. | `HomeWhy.jsx:35-45` | JS check, stops |
| /features/ carousel | Auto-rotate **every 1000 ms desktop / 2000 ms mobile** (`FeatureDetailTemplate.jsx:26-27`). Verified live at 390px: slide counter changed at 1.3s, 3.5s, 5.5s; the carousel was at top=1350px (below the fold of a 844px viewport) and still rotating. Badges transition `left/right/top` .48s + opacity/transform (layout properties). Heading/img re-mount animation .28-.5s each tick. Paused only on mouse enter / focus. | `FeatureOrbitRail.css:19`, `FeatureArcFinal.css:46`, `FeatureCarousel.css:20-24`, `FeatureMobile.css:87-91` | JS check, stops; CSS off |
| Home Frag section | Card hover/focus/tap swaps a stacked phone image (opacity .3s). Good pattern. | `HomeFrag.css:73,114,123` | killed by `.home-redesign *` rule |
| Home Portfolio | Active-card colour/opacity transitions .3s. | `HomePortfolio.css` | killed |
| TopBar mega menu | `menuIn` .18s fade+8px slide. | `TopBar.module.css:164` | off |
| /how-it-works/ blobs | `hw-float` 7s alternate infinite on 2 blobs (inside `no-preference` media query: correct pattern). | `HowItWorksLanding.css:379` | correct |
| /contact/ bubble | `ct-float` 7s infinite. | `ContactLanding.css:212` | off |
| Genie page | Scroll-spy via IntersectionObserver + rAF-throttled scroll progress bar under active sidebar item (a good existing pattern); mobile accordion fades; smooth scrollTo respects reduce. | `GenieTeam.jsx`, `GenieMobile.css` | respected |
| FAQ/accordions (Pricing, Compare, Why) | CSS collapse/chevron transitions. | `PricingRedesign.css`, `CompareDetail.css`, `WhyFaq.css` | off |
| Blog post | Skeleton shimmer; TOC IntersectionObserver. | `BlogPostPage.css:133`, `BlogPostPage.jsx:163` | off |
| HvScroller (Voices rows) | Mouse drag-scroll, `scrollBy smooth` for arrows (no reduce check). | `HvScroller.jsx:44` | not respected (low) |
| `html { scroll-behavior: smooth }` | `globals.css` ~10448 (and several media blocks 553, 8578, 9277, 9323). | | only `.home-redesign *` resets it; elsewhere not |

### 1.3 Dead or unused motion
- `components/MotionShowcase.tsx`, `app/motion-demo/page.jsx` (noindex demo route; ships framer demos, and its copy claims Lenis/GSAP that are not used).
- `components/MotionComponents.tsx`: 8 of 9 exports unused outside the demo. `lib/motionConfig.ts` is imported but never read (no `motionConfig.` usage in the component file; verified by reading it). Its easings (`smooth: [.34,1.56,.64,1]` overshoot, `bouncy`) are the same overshoot curve that causes problems in 1.4.
- `app/components/PageContainer.jsx`: IntersectionObserver adds `.is-visible` to `.testimonial-card, [data-animate], .premium-card ...`. Only used by legacy pages (support, seo-landing, ShowcasePage, motion-demo). Not used by any rebuilt page. It also has two overlapping scroll listeners and a timer that is cleared but the observer is never disconnected (leak on unmount, low).
- ~55 `@keyframes` in `globals.css` (lines 35-530 and 9369-10180) and ~55 again duplicated in `src/page-components/app.css` (10759 reduce rule etc.). Most (`checkmarkDraw`, `ripple`, `countUp`, `parallaxShift`, `layerReveal`, `glassBlur`, `textShimmer`...) are referenced by nothing on rebuilt pages. Needs a grep-per-name pass before deleting (unverified per keyframe).
- `.reveal-on-scroll`, `.reveal-children`, `[data-animate]` classes exist in CSS (`globals.css:651,663`) but no rebuilt component adds the `is-visible` trigger. Home has ZERO scroll-reveal.

### 1.4 Findings: risky / wrong existing motion (ranked)

**H1. Global CSS animates every heading, list item, image and SVG on every page.** (`app/globals.css`, block starting ~10040-10180; same rules duplicated in `app.css` 10383-10496 for legacy pages.) Verified live on `/` at 1024px:
- `h1..h6 { animation: textReveal .8s overshoot; transition: all .4s overshoot }` (42 headings running)
- `img { animation: fadeIn .6s; transition: all .4s overshoot }` + `img:hover { scale(1.02) brightness }` (72 images running)
- `li { animation: staggerEntrance .6s overshoot (translateX -20px); transition: all .3s overshoot }` + `li:hover { translateX(4px) }` (24 li running)
- `svg { transition: all .4s }` + `svg:hover { drop-shadow filter }`, `h1:hover` drop-shadow filter, `input { transition: all; will-change: box-shadow, border-color }`.
Problems: (a) all of these start at page load for elements that are far below the fold, so by the time the user scrolls there, nothing is seen: cost with zero benefit (139 simultaneous animations on `/` at 390px). (b) The hero `<img>` fadeIn from opacity 0 plus `h1` clip-path reveal delays first paint of the LCP element by up to .6-.8s (LCP impact unverified, pane hidden). (c) `transition: all` with overshoot easing on every img/li/h/svg animates any property that changes: on `/compare/` I saw 150+ CSS transitions running right after load (font-size, letter-spacing, padding, margin-bottom, width on headings/li/img: the late-arriving page CSS changes computed values and the global `transition: all` animates the font-size/padding change). That is a visible "text resizing" jank and a CLS risk (unverified, no paint). (d) Sticky hover on touch: `li:hover`/`img:hover`/`svg:hover` shift or scale content after tap; there is not one `@media (hover:hover)` guard in the whole CSS. (e) `clip-path` animation on 42 headings forces paint, not compositor-only. (f) `/blogs/` already opts out (`BlogsPage.css:11` sets `animation:none; transition:none; filter:none` on `.bl h1..p`), which confirms the rules are a known problem.
Minimal fix (S): delete these rules (img/li/h/svg/input blocks and `:hover` variants) from `globals.css`; if wanted for legacy, scope them under `.legacy-motion`. Then add the shared Reveal (section 3). Check that nothing relies on the `forwards` end state.

**H2. `/features/` carousel auto-rotates every 1 s (desktop) / 2 s (mobile).** `FeatureDetailTemplate.jsx:26-27`, verified live. Issues: far faster than a readable pace (heading text swaps while the .28-.5s entrance is still playing), WCAG 2.2.2 (auto-updating content >5s needs a pause control; touch has no hover so mobile users cannot pause except by focusing), keeps re-rendering the whole client template every tick even when the carousel is off-screen (no IntersectionObserver, unlike Why tabs), and the badge arc animates `left/top` (layout, main-thread) each tick. Fix (S): raise to ~5000 ms desktop / 5000 mobile, gate with the same IntersectionObserver as `HomeWhy.jsx:35`, pause on pointerdown/touch, and visibly pause on hover. Confirm with owner that 1000 ms is not intentional (it looks like a debug value).

**H3. `ScrollProgress` in `app/layout.jsx` is invisible and costs bundle.** It uses Tailwind classes (`fixed top-0 h-1 bg-gradient-to-r via-accent z-50`), but there is no Tailwind build. Verified live: computed `position: static`, `height: 0px`, no background. Yet it loads framer-motion on every page and runs `useScroll`. Fix (S): either delete it from the layout (drops framer from all pages unless Reveal uses it), or give it plain CSS (`position:fixed;top:0;left:0;right:0;height:2px;background:var(--aqua);transform-origin:0 0;z-index:60`) and drive `scaleX` with a 10-line rAF scroll handler or CSS `animation-timeline: scroll()`. Note the site hides the scrollbar globally (`scrollbar-width:none`), so a progress hint has real value on long pages (/how-it-works/ is 192 KB HTML, `/` is ~7.9k px desktop, ~9.9k px at 390).

**H4. Reduced-motion coverage is inconsistent.**
- Global rule (`globals.css:10433`) sets durations to .01ms and iteration to 1 (adequate for CSS), but `html{scroll-behavior:smooth}` stays on and framer components ignore it (`MotionConfig reducedMotion="user"` not used; only matters if framer stays).
- `HomeRedesign.css:4` is `.home-redesign * { transition:none!important; animation:none!important }`: heavy-handed (kills the harmless opacity crossfades of Frag/Portfolio) but safe.
- `HvScroller.jsx:44` `scrollBy({behavior:'smooth'})` ignores reduce (low).
- Marquee, hero intro, carousel autoplay, Why autoplay, mega menu: handled (verified in code).

**M1. Hero phone intro (rotateY 360 + translateY 60vh) copy-pasted 3 times** (`HomeRedesign.css:131`, `FeatureMobile.css:111`, `FeaturePage.css:103`; keyframes differ in name only). Plays on every load, including mobile, uses 3D rotate on a 900x1031 webp (decode+composite cost on low-end phones), no `will-change`. It is fine as a signature moment but should be one shared keyframe, play once, and on mobile (<=700px) use a simple opacity/translateY(24px) (drop rotateY 360 and 60vh travel). Effort S.

**M2. PartnerStrip marquee**: 24 `<img>` in a 4200px-wide track (6 copies). Only transform animates (GPU-friendly) but no `will-change: transform`, no pause on hover/offscreen, and the global `img:hover` scale(1.02)+`transition: all` also hits it. Fix (S): `will-change: transform`, `@media (hover:hover){.strip:hover .track{animation-play-state:paused}}`, nothing else. Do not add more copies.

**M3. Why tabs**: hard cut on panel change, no indicator of the 6s timer, pause only on focus (hover/touch do not pause) (`HomeWhy.jsx:79-91, 42`). See section 2.

**L1. `transition: all`** appears in `globals.css` input/modal/page rules and sub-pixel changes during resize animate; prefer explicit properties.
**L2.** `PageContainer` observer leak and duplicate scroll listeners (legacy only).

---

## 2. Opportunities by page/section (ranked later in section 4)

Legend: Lib = tech to use. Perf = cost. Mobile = behaviour. RM = reduced-motion fallback. Effort S/M/L.
Standard primitives referenced: **Reveal** = new shared `data-reveal` (IntersectionObserver + CSS), **Count** = tiny count-up island, **Stagger** = `--i` index var on Reveal children. Defined in section 3.

### Home `/` (client monolith `HomeRedesign.jsx`)
| # | Section | Technique | Lib | Perf | Mobile | RM | Effort |
|---|---|---|---|---|---|---|---|
| 1 | All sections | Scroll-reveal for section titles + cards (fade + 16-24px rise, once) | Reveal (IO + CSS transform/opacity) | compositor only; ~0.5 kB JS | same, distance 12px | no motion, visible | S |
| 2 | Hero | Keep phone intro, add stagger of copy: offer pill, h1, aside, buttons (150 ms steps) via CSS delays; play phone only once | CSS only | trivial | simplify phone to opacity+translate (no rotateY) | none | S |
| 3 | Ask (`ha-`) | Stagger 6 cards (`--i*70ms`); bar chips pop in sequence; optional caret/placeholder typing loop on `ha-bar__placeholder` when in view | Reveal + CSS; typing: IO + ~25 lines JS | cheap; typing = text node updates (throttle, stop offscreen) | cards swipe row: reveal first 2 only; skip typing | static text | S (cards), M (typing) |
| 4 | Protect (`hp-`) | Stagger 4 cards; hover lift already exists (`hp-card` transition): add `@media(hover:hover)` guard; stars fill sequentially (5 stars, scale/opacity 60ms each) | CSS + Reveal | trivial | no hover on touch | none | S |
| 5 | Protect stats | Count-up "3000+" Downloads and "(5.0)" when in view | Count island (rAF, ease-out, 900 ms) | main thread, 1 text node | same; skip if low-power (`navigator.hardwareConcurrency<=4` is a weak signal, just keep it 800ms) | show final value | S |
| 6 | Connect (`hc-`) | Chips (`hc-chip`, 6) stagger in; diagram image: draw-in of connector lines if the diagram is split into SVG (current asset is a flat PNG, so only fade/scale); drop zone: subtle dashed-border dash-offset animation on hover | Reveal, CSS | cheap | chips wrap; keep stagger <=40ms | none | S |
| 7 | Why tabs (`hw2-`) | (a) crossfade/slide between panels (key the `<Panel/>`, 250 ms opacity+8px); (b) progress bar under the active tab that fills over 6s = the autoplay timer (CSS animation on `::after`, restart on tab change, paused on hover/touch); (c) pause on hover/pointerdown | CSS keyframe + `key` on Panel | cheap; need reserved panel height to avoid CLS (panels differ in height, check) | tabs row scrollIntoView already; progress under dots | no autoplay (already), no fade | S-M |
| 8 | Why swirl/dashed connector SVGs (`hw3-svg` in WhyAllInOne/WhyMultiAssistants, shown >=breakpoint at `HomeWhyPanels2.css:133`) | Path draw: `pathLength="1"` + `stroke-dasharray:1; stroke-dashoffset:1 -> 0` when panel mounts. Existing dashed style `3 3` conflicts with draw: animate a mask or overlay path, or draw only the solid arrows (`M558.7 17.4C...` arrow paths) | CSS only | stroke-dashoffset repaints SVG each frame; paths are tiny | SVG hidden below breakpoint anyway | static | S-M |
| 9 | Frag (`hf-`) | Cards stagger in from right; active card teal highlight already crossfades; add auto-cycle of `fragActive` every 3s while in view and not hovered (so touch users see the phone images change) | Reveal + 10-line IO/timer | cheap | on touch there is no hover: autoplay is the only way pictures change (tap works) | no autoplay | S |
| 10 | Portfolio (`hpf-`) | Same pattern as Frag (active card changes picture, opacity transitions exist). Add stagger of list items | Reveal | cheap | as above | static | S |
| 11 | Insights | Stat rows count-up; image slight parallax glow (translateY ±16px by scroll) | Count; parallax via CSS `animation-timeline:view()` progressive enhancement, else none | scroll-driven animations are compositor-run in Chromium, not supported in Firefox: acceptable | disable parallax <900px | none | S/M |
| 12 | Voices (`hv-`) | Rows already scrollable; add edge fade masks and a very slow auto-marquee only if owner wants; otherwise nothing | CSS mask | trivial | native swipe | none | S |
| 13 | Download (`hd-`) | Button press feedback (`:active scale(.97)`, exists partially `HomeDownload.css:88`), subtle phone float | CSS | trivial | keep | none | S |
| 14 | Glows (`ha-glow`, `hc-glow`) | Slow parallax drift of the blurred glows | CSS animation-timeline or tiny scroll rAF | blur layers are expensive: only transform them, never animate blur/filter; mark `will-change: transform` only while in view | **disable on mobile** (fixed blur layers on phones are the main GPU risk) | none | S |

### /features/ (carousel `FeatureDetailTemplate`)
- Fix autoplay speed first (H2). Then: progress ring/bar around the active badge filling over the autoplay interval (same CSS progress as Why tabs), pause button (a11y), crossfade of the `<img key=...>` instead of re-mount fade, and animate arc positions using `transform` instead of `left/top` (M effort; or keep and accept at 5s intervals).
- Hero phone intro: shared keyframe (M1).
- Tabs (`fdt-tabs`): sliding active pill via CSS `transform` + measured width, or simple colour transition. S.

### /features/<slug>/ (net-worth, watchlist, voice-to-voice; `FeaturePage`)
- Sections `fdt-hero`, `fp-features`, `hd`. Reveal on feature rows (image slides in from the side opposite the text, 24px). Hero phone intro already exists (`FeaturePage.css:103`). S.
- Stat chips/numbers inside feature rows (e.g. "12,000+" institutions): Count. S.

### /wealth-genie/
- Sidebar progress bars already driven by scroll (good). Add: agent card/avatars Reveal; active panel crossfade when `activeKey` changes (agent switch swaps content: 200 ms opacity); icon micro-animation on hover (`GenieLanding.css:210` transform exists). Mobile accordion already fades. S.

### /contact/
- Hero bubble float exists (keep, add RM already there). Add: form field focus ring transition (exists 0.18s), submit button loading/success feedback state (spinner then check, ~S/M, needs the real form status in `ContactForm.jsx`), error shake only for invalid (S). Reveal for the two columns. S.

### /pricing/
- Reveal plan cards with stagger; price count-up when the monthly/annual toggle flips (tick $17.99 -> $8.99 style), 300 ms; highlight transition on the recommended plan; comparison table rows fade in; FAQ/collapse already animated. Count island reused. S-M. RM: instant swap.

### /how-it-works/
- 3-4 steps with mock dashboards ($11,815.15, 84%, $60,210...). Reveal each step (text from one side, visual from the other, 24px); count-up for the mock dashboard numbers only when it is the focal step; progress line connecting steps that fills with scroll (CSS `animation-timeline: scroll()/view()` or the Genie rAF pattern). Existing blobs float (fine). M. Page is 192 KB HTML: keep it all CSS/IO, no framer.

### /compare/, /compare/monarch-money/, /compare/ynab/
- Landing: `cp-row` hover exists; Reveal rows with 40ms stagger; FAQ icon rotate exists.
- Detail (`mc-compare`): check/cross marks in the comparison table draw in (SVG path `stroke-dashoffset`, ~200 ms, staggered per row) on reveal; WealthNX column gets a subtle highlight sweep once. `mc-fit` score bars fill from 0 to value (transform: scaleX, origin left) when in view. S-M. RM: static.

### /blogs/ and /blogs/read/
- Already opts out of global motion. Add: card hover lift (`@media(hover:hover)`, transform+shadow), image zoom 1.03 inside overflow hidden, skeleton shimmer already exists on post. Reading-progress bar on the post page (CSS scroll timeline or rAF) is the highest-value item there (post TOC already uses IO). S.

### /why-wealthnx/
- Reuses Why panels: same tab crossfade/progress. Hero (`wp-top-hero`): headline word stagger (split by CSS only if text is static; else just line stagger). `wp-mid-sec` rows Reveal. FAQ exists. S-M.

### Shared
- **TopBar**: mega menu has `menuIn` .18s (fine); add scroll-state (compact shadow after 20px: the PageContainer pattern does that, TopBar may not), mobile menu slide/fade (`slideInDown` overshoot exists in global CSS for `.mobile-nav-menu`; verify it is the class TopBar uses, unverified). Link underline slide on hover (`transform:scaleX`). S.
- **SiteFooter**: Reveal columns once; social icon hover lift. S.
- **PartnerStrip**: add pause-on-hover + `will-change` (M2). Optionally edge fade mask (`mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)`). S.
- **Page transitions**: static export + Next App Router: no built-in. Options: View Transitions API (`<meta name="view-transition" content="same-origin">` / CSS `@view-transition { navigation: auto }`) works for full MPA navigations in Chromium 126+ with zero JS; Safari/Firefox ignore it (graceful). It is the cheapest page-transition possible. Caution: the site uses client Link navigation (SPA); `@view-transition` only affects document navigations, so Link clicks will not use it unless `experimental.viewTransition` is enabled in Next 15.2+ (flag, unverified in this project). Verdict: skip, or do only the CSS fade for initial load. S but low value.
- **Button feedback**: global `:active { transform: scale(.97) }` on `a[class*=btn], button` with 120 ms transition; wrap hover effects in `@media (hover:hover)`. S.

---

## 3. Recommended motion system (ponytail: one primitive, no new dependency)

**Decision: do NOT use framer-motion, GSAP or Lenis for the site's reveal motion.**
- Pages are Server Components with small client islands; framer needs `'use client'` wrappers around everything animated and adds ~44 kB gzip (stale-build estimate) to the shared chunk today (only because `ScrollProgress` is in the layout). A CSS+IntersectionObserver Reveal costs ~0.5 kB.
- Remove `gsap` and `lenis` from `package.json` (unused) unless the owner wants smooth-scroll later (then add Lenis deliberately; it conflicts with `html{scroll-behavior:smooth}` and with the sticky Genie sidebar math, see risks).
- Keep framer-motion ONLY if the owner wants spring/layout animations (e.g. shared-layout tab pill, drag carousels). Today nothing needs it. Option: delete `MotionComponents.tsx`, `MotionShowcase.tsx`, `motion-demo`, `motionConfig.ts`, `PremiumCard` (legacy) after confirming the legacy routes stay (needs owner OK: deleting files).

**Primitive (≈25 lines total):**
1. One tiny client component `<RevealRoot />` mounted once in `layout.jsx` (replaces `ScrollProgress`): on mount, one `IntersectionObserver` (`rootMargin: '0px 0px -10% 0px'`, `threshold: 0.12`) over `[data-reveal]`; adds `.is-in` once, then `unobserve`. Handle `prefers-reduced-motion` by adding `.is-in` immediately. Re-scan on route change (`usePathname`) since client navigation mounts new nodes (or use a MutationObserver).
2. CSS (in `globals.css`, replacing the H1 block):
```css
[data-reveal]{opacity:0;transform:translate3d(0,var(--rv-y,20px),0);
  transition:opacity var(--dur-reveal) var(--ease-out) calc(var(--i,0)*var(--stagger)),
             transform var(--dur-reveal) var(--ease-out) calc(var(--i,0)*var(--stagger))}
[data-reveal].is-in{opacity:1;transform:none}
@media (max-width:700px){[data-reveal]{--rv-y:12px}}
@media (prefers-reduced-motion:reduce){[data-reveal]{opacity:1;transform:none;transition:none}}
html:not(.js) [data-reveal]{opacity:1;transform:none} /* no-JS / SEO safe */
```
   Caveat: SSR HTML contains `opacity:0` elements, so a no-JS fallback is needed (a `<noscript><style>` or set `.js` class on `<html>` in a head inline script) to avoid invisible content for crawlers/no-JS users and to avoid a flash if hydration is slow.
3. Usage: `<section data-reveal>`, cards `<article data-reveal style={{'--i': index}}>` (works from Server Components, no wrapper).
4. Count-up island `<CountUp to={3000} suffix="+" />` (~30 lines, rAF, IO-triggered, renders the final value in SSR HTML so SEO/RM/no-JS are correct, then animates from 0 only after hydration when in view and motion allowed).
5. Progress-under-tab CSS keyframe (`@keyframes tab-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}`) reused by Why tabs and /features/ carousel.

**Tokens (put on `:root` in globals.css; delete `lib/motionConfig.ts` or make CSS the single source):**
```
--dur-micro:120ms  /* press, toggle */
--dur-fast:200ms   /* hover, menu */
--dur-base:350ms   /* crossfade, tab */
--dur-reveal:600ms /* scroll reveal */
--dur-slow:900ms   /* count-up, hero */
--ease-out:cubic-bezier(.22,1,.36,1)       /* entrances */
--ease-in-out:cubic-bezier(.65,0,.35,1)    /* position changes */
--stagger:70ms; (cap total stagger <=420ms: max index 6)
```
No overshoot/bouncy easings (`.34,1.56,.64,1` is in 25+ places in global CSS today); overshoot on text and layout looks cheap and causes jitter.

**Rules:**
1. Animate only `transform` and `opacity` (plus `clip-path` once for the hero at most). Never `left/top/width/height/font-size/filter: blur`. Replace `transition: all` with explicit lists.
2. Reveal once, never re-hide on scroll up. No reveal above the fold (hero is CSS-only at load) so LCP and CLS are unaffected. Reveal elements must not change layout size (opacity+transform only, no `display` toggling).
3. Looping animations (marquee, floats, autoplay) must: pause when off-screen (IO), pause on hover/focus/touch, have a stop for >5s autoplay (WCAG 2.2.2), and be disabled under `prefers-reduced-motion`.
4. Hover effects only inside `@media (hover:hover) and (pointer:fine)`.
5. Mobile (<=700px): shorter distance (12px), fewer stagger steps (cap 4), no parallax, no blurred-glow animation, no 3D rotation, no cursor-tilt.
6. One `will-change` only on elements that animate continuously (marquee track). Never globally.
7. Smooth scroll: if kept, keep CSS `scroll-behavior:smooth` and reset it to `auto` under reduced motion globally (not only `.home-redesign`). Sticky/scroll-spy code (Genie) relies on native scroll events: fine today because Lenis is not running.

**Check that scroll animations do not break Lenis / cause jank / CLS:** Lenis is not installed in the runtime (verified), so there is nothing to break today. If Lenis is added later: it would hijack wheel scrolling, so `scroll-behavior:smooth` must be removed, `GenieTeam.jsx` `window.scrollTo(...)` calls (lines ~226) must go through `lenis.scrollTo`, anchor links must use lenis, and sticky `.gl-side` is unaffected. The current CSS-animation-at-load pattern (H1) causes no scroll jank but does create layout/paint work at load (clip-path on 42 headings); CLS from reveals would be zero with the transform/opacity primitive. CLS from the existing system: unverified (pane hidden, `layout-shift` entries empty).

**Performance/mobile budget:** reveal uses 1 observer for the whole page; marquee is the only infinite animation on `/` (verified); keep it so. Keep total simultaneous running animations on any viewport under ~20 (today 139 at load on `/` at 390px).

---

## 4. Ranking by impact / cost

| Rank | Item | Impact | Cost |
|---|---|---|---|
| 1 | Delete global img/li/h/svg/input animation+transition rules (H1) | High (perf, no flicker, no sticky hover, LCP) | S, negative code |
| 2 | Fix /features/ autoplay 1s->~5s, add off-screen/touch pause (H2) | High (a11y, jank, battery) | S |
| 3 | Shared Reveal primitive + apply to all home sections and page heroes/cards | High (perceived polish everywhere) | M (primitive S, applying is a pass over ~10 pages) |
| 4 | Fix or remove `ScrollProgress` (H3); remove framer from the shared bundle | High (44 kB gz estimate off every page) | S |
| 5 | Why tabs: crossfade + timer progress + pause on hover/touch | Medium-high (clarity of autoplay) | S-M |
| 6 | Count-ups (home 3000+/5.0, pricing prices, how-it-works mock dashboard, Insights stats) | Medium | S (one island) |
| 7 | `@media(hover:hover)` guards + button `:active` feedback + card hover lifts on Ask/Connect/Voices/blog cards | Medium | S |
| 8 | Hero stagger + single shared phone keyframe, simplified on mobile | Medium | S |
| 9 | Frag/Portfolio autocycle for touch | Medium (mobile can't hover) | S |
| 10 | Comparison table check draw-in, score bars fill (compare detail) | Medium | S-M |
| 11 | Why swirl/arrow SVG path draw | Low-medium (wow, small) | S-M |
| 12 | Parallax glows (desktop only), reading progress bar on blog posts | Low-medium | S |
| 13 | Page transitions (View Transitions) | Low | S, uncertain with Next Link |
| 14 | Carousel arc positions to transform; progress ring | Low | M |

## 5. Risky existing animations to simplify (summary)
1. Global `img/li/h1-h6/svg` animation+`transition:all` with overshoot (H1): delete.
2. /features/ autoplay 1s/2s (H2): slow down, gate by visibility, add pause.
3. Hero phone `rotateY(360deg)` + 60vh travel, copied 3x (M1): one shared keyframe, no rotate on mobile.
4. `ScrollProgress` dead + framer in root layout (H3).
5. Overshoot easing `cubic-bezier(.34,1.56,.64,1)` in 25+ places in `globals.css`/`app.css`; remove.
6. `h1:hover/h2:hover/h3:hover` drop-shadow filter and `svg:hover` drop-shadow filter: paint cost, accidental on touch.
7. `.mobile-nav-menu { backdrop-filter: blur(20px) }`, `.modal-card`, `.cookie-consent` `backdrop-filter: blur(20px)`: expensive on low-end mobile (cookie banner is always present first visit). Replace with a solid/translucent background on <=700px.
8. Duplicate keyframe/animation blocks in `app.css` (11k lines) and `globals.css` (10.7k lines): legacy; prune only with owner OK.
9. `html{scroll-behavior:smooth}` without a reduced-motion reset outside the home.
10. Autoplay lacking pause on touch (Why tabs, features carousel).

## 6. Not verified
- CLS/LCP/FPS: Browser pane hidden, no paint, `layout-shift`/`largest-contentful-paint` entries empty.
- Per-keyframe usage of the ~55 legacy keyframes (not individually grepped).
- Framer bundle size is from a stale `out/` build (Sep 10), not the current dev build.
- Whether `TopBar` mobile menu uses the global `.mobile-nav-menu` class.
- Whether Next 15 `experimental.viewTransition` works with this static export.
