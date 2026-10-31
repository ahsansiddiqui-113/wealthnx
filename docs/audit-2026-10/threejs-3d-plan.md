# Three.js / 3D feasibility and plan (read-only; no installs, no repo edits)

Method: static inspection of package.json, node_modules, next.config.js, app/page.jsx, HomeRedesign.jsx/.css, FeatureDetailTemplate.jsx, public/assets sizes. No browser measurements were taken for this report (3D plan is code-level). Bundle numbers for three/R3F/drei are ESTIMATES (not installed).

## 1. Installed inventory (verified)
| Package | Installed | Actually used by shipped pages |
|---|---|---|
| framer-motion | 12.40.0 (5.4 MB on disk) | only components/MotionComponents.tsx -> /motion-demo (noindex). Not by home/features |
| gsap | ^3.15.0 | same: only motion-demo path (unverified for runtime use elsewhere; grep found no import in src/ or app/ except components/) |
| lenis | ^1.3.23 | grep finds no import in app/src/components. Owner says Lenis is on; where it is wired is UNVERIFIED (maybe a script/layout I did not find) |
| three, @react-three/fiber, @react-three/drei, @splinetool/*, lottie-*, @rive-app/*, ogl | NOT installed | n/a |

Consequence: zero 3D tooling today. Anything 3D = new dependency, so by ponytail rules it must be justified; Phase 0 below needs none.

## 2. Next 15 static export constraints (verified from next.config.js)
- `output: 'export'` in production, `trailingSlash: true`, `images.unoptimized`. No server runtime: all WebGL is client-only.
- three touches `window`/`document`/WebGL: must live in a `'use client'` component loaded with `next/dynamic(() => import('./Scene'), { ssr: false })` (ssr:false is only allowed inside a Client Component in Next 15). HomeRedesign.jsx is already `'use client'`, so a wrapper can be imported there directly.
- Assets (GLB, HDR, KTX2, Draco decoder) must be static files under `public/` (served from Apache); no route handlers. Draco/Basis decoders need explicit `/draco/` paths (drei `useGLTF.setDecoderPath`) because there is no CDN fallback you should rely on.
- Apache/GoDaddy: .glb/.ktx2/.wasm may need MIME types in .htaccess (`model/gltf-binary`, `application/wasm`) - UNVERIFIED, check when adding.
- Bundle: dynamic import makes a separate chunk, so it does NOT touch first-load JS of other pages. Chunk loads only on pages that import it.
- Do not run `next build` while dev server runs (AI_WORKFLOW rule); validate chunk size only after owner OK.

## 3. Findings that matter before any 3D (existing weight, verified)
1. HIGH (perf, cheaper than any 3D): app/page.jsx:102-104 preloads `/assets/herosection.png` (165 KB), `herosection_1.webm` (773 KB) and `mobileherosection.webm` (598 KB), but the hero now renders `/assets/home-hero-phone.webp` (HomeRedesign.jsx:100) and grep finds NO `<video>` anywhere in app/src/components. The two webm preloads (~1.37 MB, media-gated so only one fires per device ~0.6-0.77 MB) plus the png are likely wasted bandwidth competing with the real LCP image. Fix: delete these three `<link rel="preload">` lines and preload `/assets/home-hero-phone.webp` (208 KB) instead. Verify the browser network panel first (not done).
2. MEDIUM: heavy unused/oversize assets in public/assets (62 MB total, 163 files): homeinvestment.png 1.27 MB, wealthnx-icon.svg 1.1 MB, Ellipse 5829.png 0.84 MB (also a non-ASCII-safe name with spaces, breaks the "ASCII file names only" rule), `Background → Background.svg` 0.6 MB (non-ASCII arrow in name). Not 3D, but any "add 3D, keep it fast" story needs this cleaned first. Other agents' asset audit may cover it.
3. Existing 3D-ish effects already in CSS: hero phone does `translateY(60vh) rotateY(0->360deg)` entrance with `perspective:1400px` (HomeRedesign.css:125,132; same in FeaturePage.css:99-107 and FeatureMobile.css:106-112). So the "phone spin" the owner may want is ALREADY there as a CSS animation. It runs once on load and stops; there is no pointer/scroll response.

## 4. Candidate assessment
Legend: value = visible gain for marketing; cost = bundle + asset + maintenance risk.

### A. Home hero phone (HomeRedesign.jsx:98-101, `.fdt-hero-phone`) 
- Current: flat WebP (208 KB, 900x1031) with floating cards baked into the artwork; one-time CSS spin.
- Concept: pointer-tilt on desktop (+ gyroscope/touch-drag or slight scroll parallax on mobile) so the phone feels solid.
- Cheapest: CSS 3D tilt (Phase 0): one tiny client hook sets `--rx/--ry` from pointermove (rAF-throttled) on `.fdt-hero__visual`; `.fdt-hero-phone{transform:rotateX(var(--rx)) rotateY(var(--ry))}` with `transition`. Already has `perspective:1400px`. ~25 lines, 0 KB deps. Floating cards cannot get separate depth because they are baked into one image (limit; would need layered export from Figma = owner-supplied images only).
- R3F true 3D phone: needs a GLB phone (device frame + screen texture). Source: owner/Figma designer or a licensed model; a screen-only plane with the existing UI screenshot as texture; budget <=400 KB Draco GLB + 1 texture <=200 KB (KTX2/WebP). Floating cards as textured planes at different Z. Risk: the "exact Figma design" rule - the hero is a pixel-matched artwork; a 3D re-render will not be pixel identical (lighting/phone bezel will differ). Recommendation: NOT worth it for the hero in Phase 1; CSS tilt gives ~80% of the perceived effect.
- LCP: hero image is the LCP candidate; must stay a static `<img>`; any canvas mounts after `requestIdleCallback` and fades in over the image.

### B. Wealth Genie / Voice-to-Voice orb (/wealth-genie/, WhyVoiceToVoice.jsx)
- Concept: glowing sphere reacting to a fake audio level (noise-displaced icosphere / shader).
- Best 3D candidate: no model needed (procedural), tiny asset, big "AI voice" metaphor value, decorative (aria-hidden), single draw call.
- Tech: raw three OR R3F with a custom ShaderMaterial; no drei needed. Cheaper fallback: pre-rendered looping WebM/WebP-animated orb (~100-250 KB, alpha via VP9 is not supported on iOS Safari: use HEVC-alpha mov for Safari or opaque on dark bg), or pure CSS (layered radial-gradients + blur + keyframes) which is usually 90% of the look. 
- Bundle: ~170 KB gz (three) + ~50 KB (R3F) = ~220 KB gz for one orb: marginal unless reused on 2+ places (Genie page + home Why panel + Voice-to-Voice feature). Reuse across them is what justifies it.
- Verdict: Phase 1 pick IF the owner wants real 3D. First try the CSS/Lottie-free gradient orb.

### C. Data Connectivity (HomeConnect, `hc-` section, diagram = home-connect-diagram.png 193 KB)
- Concept: Plaid-like network of nodes with connection lines/pulses.
- Better as SVG/CSS: nodes + animated `stroke-dashoffset` lines; 2D is the correct representation (it is a diagram, readability matters). 3D adds nothing and hurts the Figma match. Verdict: NO 3D; optional SVG line pulse (Phase 0).

### D. /features/ orbit carousel (FeatureDetailTemplate.jsx:88-101, `.fdt-orbit` with slot classes, swipe, keyboard, aria-live)
- Concept: true 3D ring rotating with swipe.
- Already an accessible, keyboard/pointer-driven carousel with slot-based positions and ~6 CSS files of arc/overlap fixes (FeatureArc*.css, FeatureOrbitOverlapFix.css, FeatureResponsiveFix.css). Converting to a WebGL ring would discard that a11y and fixed layout work and re-open responsive bugs. If a 3D feel is wanted: CSS `perspective` + `rotateY`/`translateZ` per slot class (transition on `transform`), no WebGL. Verdict: CSS 3D only, low priority, risk of regression in the very fragile orbit CSS (medium).

### E. Background particle / glow field
- Cheap alternative: existing `.fdt-hero__glow` and `.hc-glow` blurred gradients; add slow CSS drift. WebGL particles (~2-3k points, one draw call) look nice but add 220 KB gz for decoration and cost battery; the dark theme with glows already conveys it. Verdict: skip; if ever, a 2D canvas (no dependency, ~1 KB) with 40-60 dots, paused offscreen.

### F. Protect section 3D illustrations (home-protect-iso.webp 32 KB, encrypted/privacy/readonly ~10-14 KB each)
- These are small pre-rendered isometric images. Pre-rendered is the right tool: tiny and exact to Figma. Add a CSS hover lift/tilt (Phase 0). Real 3D = overkill. Verdict: NO WebGL.

### G. Others worth noting (not in the candidate list)
- HomeDownload phones (hd-phone-left/centre/right PNG/WebP): CSS parallax fan on scroll (translateY by scroll progress) = good Phase 0 candidate with IntersectionObserver.
- Pricing/Compare/Blog: no 3D.

## 5. Does CSS 3D + existing images deliver 80%? 
Yes for hero, Protect, Download phones, orbit: pointer tilt, layered parallax and hover lift on the existing flat artwork cover most of the "alive" feel. What CSS cannot do: real lighting/reflections, a phone you can rotate to show the back, per-card depth inside a flattened image, procedural voice-reactive orb. Only the orb (B) truly needs WebGL; everything else is a design-fidelity risk for little gain.

## 6. Recommended phases (smallest effective)
- Phase 0 (0 dependencies, ~1 day): (1) `useTilt` hook + CSS vars on hero phone (desktop pointer; reduced-motion off; touch devices: tiny auto-float keyframes only). (2) Hover lift/tilt on Protect cards. (3) Scroll-linked parallax for Download phones via IntersectionObserver + CSS var. (4) Remove wasted hero preloads (finding 1). Replace the ONE-TIME `rotateY(360)` with a shorter entrance if LCP suffers: it starts at opacity 0 -> LCP is delayed until the animation makes it visible (UNVERIFIED: measure LCP; Chrome counts only painted/visible frames so a 0->1 fade 1.6 s with 35% ramp may push LCP ~0.5 s).
- Phase 1 (only if owner approves new deps): ONE R3F scene = procedural voice orb (B), lazy loaded on /wealth-genie/ and the Voice-to-Voice panel only. Add `three` + `@react-three/fiber` (skip drei). Pin versions (three 0.17x, R3F 8.x for React 18; R3F 9 requires React 19: project is on React ^18.3.1, so use @react-three/fiber@8).
- Phase 2 (optional): real GLB phone for the hero only after Figma-exact approval; keep static image as poster.

## 7. Bundle cost (ESTIMATES, not measured; nothing installed)
- three core, tree-shaken in a small scene: ~150-170 KB gz (r150+ ESM, not tree-shakeable below ~120 KB gz).
- @react-three/fiber 8: ~35-50 KB gz (+ react-reconciler included).
- @react-three/drei: highly variable 20-150+ KB gz depending on imports; avoid or import single helpers.
- Draco decoder wasm ~ 70-150 KB (only if compressed GLB), KTX2/basis transcoder ~ 200-300 KB wasm: avoid unless GLB used.
- Total Phase 1: ~220-250 KB gz chunk, off the critical path. For comparison existing first-load chunks are in out/_next/static/chunks (framework, main, etc.); framer-motion/gsap are already paid for only on motion-demo.
- Alternatives: Lottie (lottie-web light ~60 KB gz + JSON 20-100 KB), Rive runtime ~150 KB wasm, pre-rendered WebM/MP4 100-300 KB, ogl ~ 30 KB gz (a legitimate lighter pick for one orb shader instead of three: ~1/5 the size, no React binding needed). If Phase 1 happens, consider `ogl` or raw WebGL for the orb to save ~150 KB; only choose three if Phase 2 GLB is likely.

## 8. Runtime budget on mid-range phones
- Canvas: `dpr={[1, 1.5]}` (cap 1.5 on mobile, 2 desktop), `antialias:false`, `powerPreference:'low-power'`, `alpha:true`, no shadows, no postprocessing.
- `frameloop="demand"` when static; `"always"` only while visible AND tab visible AND not reduced-motion. Orb: ~1 draw call, <=20k tris (icosahedron detail 4-5), target 60 fps at <=3 ms GPU/frame.
- Pause: IntersectionObserver (rootMargin 100px) + `document.visibilitychange`; dispose renderer (`renderer.dispose()`, `forceContextLoss`) on unmount. One WebGL context per page max (mobile Safari limit ~8-16, Android lower).
- Texture memory: no textures for orb; for GLB phone cap textures at 1024 px.

## 9. Fallbacks and gate
Render a static poster (the existing image/CSS orb) when ANY of: no WebGL2/WebGL (try `canvas.getContext('webgl2')`), `prefers-reduced-motion: reduce`, `navigator.connection.saveData`, `effectiveType` 2g/3g, `navigator.deviceMemory <= 2` or `hardwareConcurrency <= 4` on mobile (heuristic), `matchMedia('(pointer:coarse)')` + small width (optional: skip on phones entirely in Phase 1). Poster stays in DOM always (it is the LCP/SEO image); canvas fades in over it after `requestIdleCallback` (+ IntersectionObserver first-visible).

## 10. Accessibility / SEO
- Canvas wrapper `aria-hidden="true"`, no tabindex, `pointer-events:none` (so it never traps scroll/touch; Lenis + touch scroll must pass through). Keep real text in DOM (already the case).
- Respect reduced-motion (existing code already has one media query for the hero phone, HomeRedesign.css:133; mirror it).
- SEO: static export HTML contains only the poster `<img>`; no content lives in WebGL. LCP image unchanged; canvas chunk never loaded before idle.
- CLS: reserve the box with the same width/height/aspect-ratio as the poster.

## 11. Component architecture (proposed, minimal)
```
src/page-components/three/
  useCanDo3D.js        // client hook: returns {ok, reason}; the capability gate in section 9 (WebGL2, reduced motion, saveData, memory/cores, coarse pointer)
  useInView.js         // IntersectionObserver + visibilitychange -> boolean `active`
  useTilt.js           // Phase 0 CSS tilt: pointermove -> --rx/--ry on a ref, rAF throttled, no re-render
  LazyScene.jsx        // 'use client'; poster <img> always rendered; when gate ok + idle + inView, mounts dynamic(() => import('./VoiceOrbScene'), { ssr:false })
  VoiceOrbScene.jsx    // Canvas dpr [1,1.5], frameloop = active ? 'always' : 'never', orb mesh + ShaderMaterial
```
Usage: `<LazyScene poster="/assets/genie-orb.webp" width height><!--scene--></LazyScene>` inside GenieLanding / WhyVoiceToVoice; poster/CSS orb is the "exact Figma" source of truth. File names are proposals; no files were created.

## 12. Risks
- "Exact Figma design" rule: WebGL renders will not match pixel-for-pixel; keep it decorative over the same artwork, and only where the owner approves. Models/HDRIs are assets the owner must supply (rule: AI supplies only stand-in images; a GLB is an asset, so owner/designer should provide or approve it).
- Dev/prod parity: Next dev (HMR) + R3F strict mode double-mount can leak contexts: test with `next start`/export `out/` served statically.
- Lenis (where wired is unverified) + a full-bleed canvas can swallow wheel/touch events: always `pointer-events:none` on decorative canvases.
- R3F v9 needs React 19: stick to fiber@8 with React 18.3.

## 13. Mobile test plan
1. Real devices: one mid Android (e.g. Pixel 6a / Galaxy A-series) and one iPhone (Safari), plus Chrome DevTools 6x CPU throttle + 4G.
2. Metrics: Lighthouse mobile before/after (LCP, TBT, CLS must not regress >0), chunk size check from `out/_next/static/chunks`, FPS via DevTools Performance (>=50 fps average, no frame >50 ms), memory (no growth over 2 min scroll), battery/thermal spot check 2 min.
3. Behavior: scroll past scene and back (pauses/resumes), background the tab (frameloop stops), rotate device, resize 320/375/390/768/1024/1281, reduced-motion on, data-saver on, WebGL disabled (chrome://flags) -> poster shows, no console errors, no horizontal overflow (`scrollWidth <= innerWidth`), tab/keyboard order unchanged.
4. Regression: run feature carousel keyboard/swipe test; verify Lenis scroll still smooth over the canvas area.

## 14. Not verified / skipped
- No runtime measurement (FPS, real LCP, network) was done; the preload-waste claim (finding 1) is from source only. Lenis location, .htaccess MIME types, three/R3F sizes are unverified/estimates.
