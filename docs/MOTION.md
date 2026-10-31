# Motion system

No animation library. One stylesheet (`app/motion.css`) + one client component (`app/components/MotionRoot.jsx`, mounted once in `app/layout.jsx`). Pages only add attributes, so it works from Server Components.

## Tokens (`:root` in motion.css)
`--dur-micro 120ms` press, `--dur-fast 200ms` hover, `--dur-base 350ms` tilt/crossfade, `--dur-reveal 600ms` scroll reveal (450ms <=700px), `--dur-slow 900ms`.
`--ease-out cubic-bezier(.22,1,.36,1)`, `--ease-in-out cubic-bezier(.65,0,.35,1)`. No overshoot/bounce curves.
`--rv-y 24px` (12px <=700px), `--rv-stagger 70ms` (35ms <=700px).

## `data-reveal` (scroll reveal)
- `data-reveal` (fade-up, default), `data-reveal="fade"`, `data-reveal="scale"`.
- Stagger: `style={{ '--i': n }}` (delay = `min(n, 6) * --rv-stagger`).
- One IntersectionObserver (rootMargin bottom -8%). Reveals once: adds `.is-in`, stops observing, and removes the `data-reveal` attribute after 1.5s so the element's own CSS (hover lifts) takes over.
- Anything already on screen when found (top < 92% of the viewport) is never hidden. Never put it on hero/above-the-fold content.
- Hidden states only exist while `<html>` has `.js-motion` (added by MotionRoot) and only under `prefers-reduced-motion: no-preference`. No JS, before hydration, or reduced motion = content simply visible.
- Uses the individual `translate` / `scale` properties plus `opacity`, so it never clashes with a component's own `transform`. Elements added later (route change, fetched lists) are picked up by a MutationObserver.

## `data-count` (count-up)
On a single-text-node element whose text starts with a number (`<b data-count>12,000+</b>`). The final text is in the HTML; after reveal it counts 0 -> N once (1.2s). Home only (3000+, 12,000+, 5 MILLION+, 70,000+).

## `data-tilt` (phase-0 CSS 3D tilt)
Put `data-tilt` on a wrapper (not on an element that already animates `transform`). Mouse/pen only (`hover:hover` + `pointer:fine`), max 7deg, rAF-throttled, spring back via CSS transition on leave; off for touch and reduced motion. Used on the three hero phone wrappers (`.fdt-hero__visual`, the phone keeps its own intro animation) and `.hd-phones` (Download section). Tilt strength: `MAX` in MotionRoot.jsx. No `preserve-3d` (layers are flat images; add it per element if depth between layers is wanted).

## Hover
Only inside `@media (hover: hover) and (pointer: fine)`: card lift (`translate: 0 -4px`) on Ask/Protect/Connect/Portfolio/Voices/Audience cards, Protect illustration scale, button `:active` press (`scale .97`).

## Rules
1. Animate `transform`/`opacity` only (or `translate`/`scale`); never layout properties, never `transition: all`.
2. Reveal once; never above the fold.
3. Hover effects only under `hover:hover`.
4. Loops/autoplay: pause off-screen, on hover/focus, on touch, tab hidden (see the /features/ carousel in FeatureDetailTemplate.jsx, 1s desktop / 2s mobile interval kept on purpose).
5. Reduced motion: no reveal, no count-up, no tilt, `scroll-behavior` auto.

## Turning it off
Remove `<MotionRoot />` from `app/layout.jsx` (all reveals/count/tilt stop and content stays visible), or delete the `import './motion.css'` line to drop hover lifts too.
