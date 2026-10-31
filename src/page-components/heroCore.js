import cores from './heroCores.json';

/* Props for a hero phone <img>: marks it for HeroCore.css and hands it the measured "core" of the picture
   (see scripts/hero-cores.mjs) so the phone is drawn at the Figma size on every page. Unknown pictures get no props
   and keep the page's own sizing. */
const DESKTOP_CORE = 629; // phone group height in the 1593px desktop frame
const MOBILE_CORE = 404.01; // phone group height in the 390px mobile frame

export function heroCoreProps(src) {
  const c = cores[src];
  if (!c) return {};
  return {
    'data-core': '',
    style: { '--iw': c.w, '--cx': c.cx, '--cy': c.cy, '--ch': c.ch, '--vw': c.vw, '--s': +(DESKTOP_CORE / c.ch).toFixed(4), '--sm': +(MOBILE_CORE / c.ch).toFixed(4) },
  };
}
