# Mobile / tablet adaptive audit (read-only)

Method: 15 routes x widths 320/375/414/600/768/820/1000 loaded in same-origin iframes (media queries respond to iframe width) and measured (scrollWidth, off-viewport elements not inside a clipping/scrolling ancestor, font sizes, tap targets). Real-tab checks at 375x667 and 667x375 (menu, rows), screenshots at 768. Landscape 812x375 not run separately (667x375 only). Not tested on real touch devices.

## Verified OK
- **No horizontal page overflow** on any of the 15 routes at any of the 7 widths (0 of 105 runs; scrollWidth == width). 667x375 home: also none.
- Swipe rows (MobileSwipe.css, <=700px) work on home: .ha-grid/.hp-grid/.hc-grid/.hv-scroll are overflow-x:auto + scroll-snap, next card peeks (82vw/340px), dots rendered (3 sets).
- Why WealthNX tabs (.hw2-tabs-wrap) scroll horizontally on mobile (sw 585 inside 343), so tabs 4/5 are reachable. (My clip detector flagged them: false positive; same for hv-ln, cp-panel, mc-th = content inside scrollers.)
- Hamburger menu (<=1280): opens, 48px rows, Features expands to 30 links at 54px rows, scrolls internally (max-height 594 at 375x667), Escape closes, no overflow.
- Hover-only cards: Fragmented (.hf-card) and Portfolio (.hpf-card) both also select on onClick/onFocus, so touch works.
- Autoplay respects prefers-reduced-motion (FeatureDetailTemplate.jsx:47, HomeWhy.jsx:42, GenieTeam.jsx); PartnerStrip and TopBar have reduced-motion blocks.
- Pricing/compare tables scroll in wrappers (.pr-cmp__scroll min-width 560, .mc-tablewrap overflow-x:auto).
- Landscape 667x375: hero is 816px tall (scrolls, fine); menu 292px tall with 493px content scrolls internally.

## Findings

### 1. [MEDIUM-HIGH] 701-1000px (tablet portrait) shrinks the desktop frame instead of reflowing: body text 8-10px
Evidence (computed font-size): /why-wealthnx/ at 768: .wp-top-hero__copy p 9.1px, .wp-top-one__in p 8.0px, .wp-mid-txt 8.5px; at 1000: 11.8 / 10.4 / 11.1. Cause: pure `calc(N * var(--u))` absolute layout, mobile layout only <=760px (WhyTop.css:19, WhyMid.css:24; p at WhyTop.css:9,17). /compare/ynab/ at 768: .mc-cell 9.3-9.6px, .mc-card__p 9.8px at 1000 (`--t: min(1px,100cqw/1326)`, CompareDetail.css:100; mobile only <=760/900 at :394-407). Home /: .ha-card__head p 9.8px at 768 (HomeAsk.css:122, clamp floor 9.5px). /how-it-works/ .hw-bank__name 8.5px at 768-1000, .hw-orbit__pill 9.5px. /wealth-genie/ .gl-case 10px, /pricing/ .pr-kicker 10px, captions 11px, /blogs/ .bl-pill 10.4px, .bl-hero__nltext 10.2px at 1000. Screenshot at 768 of /why-wealthnx/ confirms tiny, hard-to-read copy.
Fix (smallest): raise the switch-to-mobile breakpoint of Why/Compare detail (760 -> 1000, `--t`/`--u` floors) or add a floor with `max(13px, calc(N*var(--u)))` on body copy; for HomeAsk lift clamp floor 9.5px -> 12px.

### 2. [MEDIUM] /features/ hero at 701-1000: headline squeezed into ~190px column
Evidence: at 768 `.fdt-hero h1` width 188px, 36px font, wraps to 6 lines ("Powerful / Features for / a / Brighter / Financial / you") with a big empty gutter; phone centred, side text tiny (screenshot). Rule: FeatureResponsiveFix.css:3 (max-width:340px; 36px) combined with the grid at FeatureMobile.css:103-105 (min-width:701px, `grid-row: 1/3`).
Fix: below ~1000px let `.fdt-features .fdt-hero__copy` span wider (grid-column 1 / -1) or use the <=700 stacked layout up to 1000.

### 3. [MEDIUM] Orbit carousel on 701-1000 has tiny tap targets and no touch-action
Evidence: /features/ at 768, 820, 1000: `.fdt-orbit__badge` 23x23 (35x35 for the active), `.fdt-orbit__dots button` 5x5 (FeatureCarousel.css:27). The 40x40 pager and `touch-action: pan-y` exist only <=700 (FeatureMobile.css:45, 94), but swipe uses pointer capture (FeatureDetailTemplate.jsx:~55) so on an iPad a vertical page scroll that starts on the orbit may be cancelled (unverified on device).
Fix: extend the pager/`touch-action: pan-y` media query to max-width:1000px (or just add `touch-action: pan-y` to `.fdt-orbit` globally); enlarge badges' hit area with padding/::after.

### 4. [MEDIUM] Footer links are 18px high tap targets on every page
Evidence: `.sf-footer__columns a` 153x18 at 375 (SiteFooter.css:54-60, 13px, gap 12px); footer bottom links similar; /blogs/ `.bl-sub__note a` 79x15.
Fix: at <=700 give footer links `display:block; padding:12px 0` (keep visual gap by reducing grid gap).

### 5. [MEDIUM] Swipe dots are 6x6 (active 18x6)
Evidence: .swipe-dots button 6px (MobileSwipe.css:98-106), 3 sets on home, also pricing/genie/compare. Fix: transparent padding via `::before{inset:-12px}` or wrap button in a 24px hit area.

### 6. [MEDIUM] Contact form inputs are 15px: iOS Safari zooms the page on focus
Evidence: `.ct-form input, textarea { font: 400 15px ... }` ContactLanding.css:249-262. Fix: `font-size: 16px` at <=700. Placeholder-only fields (no visible labels) in ContactForm.jsx:124-142 (a11y, low).

### 7. [MEDIUM] Other tap targets under 44px (mobile)
/pricing/ `.pr-card__select` 66x22 / 62x22 at 375 (75x26 at 600-1000); `.pr-toggle__badge` 11px; /how-it-works/ `.hw-btn` 103x34 and 170x35; /features/ category tabs 75x35 and 127x36 at 600; home `.hw2-tab` 36px high; Voices `.hv-nav__btn` 30x30; /blogs/ `.bl-fchip` 48x34; /wealth-genie/ `.gl-item--*` 34px, `.gl-chip` 25px at 1000. Fix: min-height:44px on these at <=1000.

### 8. [LOW-MEDIUM] Small text on phones (<12px, real copy; counted at 375/320)
- Home: .ha-card__head p 9.5px (HomeAsk.css:122), .hc-chip 10px, .hc-card__foot 10.2px, .hc-drop__* 9.8px, .hc-plaid__copy 7.8px at 320 (HomeConnect scaled mock-ups: decorative but readable text), .fdt-offer pill 11px everywhere.
- /how-it-works/ .hw-bank__name 7.5px, .hw-orbit__pill 8.5px, .hw-orbit__more 9px.
- /compare/ .cp-qcard__wx 9px, .cp-row__desc 11px; /compare/ynab/ .mc-cell 11.5-11.9px.
- /pricing/ captions/badges 11px, .pr-kicker 10px; /blogs/ .bl-chip-w 5.9px at 375.
- hd-pill 8.8px in the Download phone mock is part of an image-like mockup (acceptable).
Fix: set a 12px floor (`max(12px, ...)`) on the listed selectors.

### 9. [LOW-MEDIUM] Mobile menu uses `100vh` (not `100dvh`)
Evidence: TopBar.module.css:162, 350 (`max-height: calc(100vh - 83px)`), 445 (`- 73px`); mega menu :162. On iOS/Android with a collapsing URL bar, `100vh` is taller than the visible area so the bottom (Login / Get Started) can sit below the fold. Landscape 667x375: only 292px visible. Fix: add `max-height: calc(100dvh - 83px)` after the vh line. No scroll lock on body while menu is open and the header is not sticky (menu scrolls away with the page): low.

### 10. [LOW] Viewport meta / safe area
app/layout.jsx:58: `width=device-width, initial-scale=1.0`, no `viewport-fit=cover`, no `env(safe-area-inset-*)` anywhere. Without viewport-fit=cover iOS insets content itself in landscape, so nothing breaks today; add only if full-bleed bars are wanted. No `themeColor` set.

### 11. [LOW] Features mega menu is hover-driven above 1280px
TopBar.jsx:50-52 (onMouseEnter/Leave; trigger is a `<Link>`). Touch laptops / iPad Pro landscape (1366) rely on emulated mouse events: first tap likely opens, second navigates (unverified). Hamburger takes over at <=1280, so iPad landscape 1024/1180 is fine.

### 12. [LOW] Orbit autoplay pauses on `mouseenter` (FeatureDetailTemplate.jsx:~88)
On touch, the emulated mouseenter after a tap may leave it paused until tapping elsewhere (unverified).

### 13. [LOW] Animation without reduced-motion override
FeatureCarousel.css:20-24 (fdt-feature-in / fdt-heading-in), SupportChat.css (out of scope). Short fades only.

### 14. [INFO] Legacy `100vh` blocks
app.css:6539, 6572, 11146 and globals.css:6235, 6268 (`height:100vh`, `!important` at app.css:11146) belong to older unused/legacy pages; not checked on routes in scope.

## Not verified / skipped
- Real-device touch, iOS Safari behaviours, 100vh with live URL bar (inferred from CSS).
- Landscape 812x375 specifically (667x375 only); scroll-position visuals at 320/414 beyond metrics.
- Per-image upscaling/blur, Lenis (Lenis is only imported in app/motion-demo/page.jsx; smooth scroll elsewhere is CSS `scroll-behavior`).
- Next dev badge ("N") visible in screenshots is dev-only.
