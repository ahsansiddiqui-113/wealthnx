// Client-side allow-list sanitiser mirroring the server (BLOG_PLAN section 1).
// Allowed tags: p h2 h3 h4 ul ol li a strong em blockquote img br code pre table thead tbody tfoot tr th td
// (b/i/h1/h5/h6 are mapped, div becomes p). Everything else is unwrapped, keeping its text.
// Only class values listed in CLASSES (and data-duration on a.wx-video) survive.
const MAP = { b: 'strong', i: 'em', h1: 'h2', h5: 'h4', h6: 'h4', div: 'p' };
const ALLOWED = new Set(['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'blockquote', 'img', 'br', 'code', 'pre', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td']);
const DROP = new Set(['script', 'style', 'iframe', 'object', 'embed', 'noscript', 'template', 'svg', 'math', 'form', 'textarea', 'select', 'button', 'head', 'title', 'meta', 'link']);

// Exact-match class allow-list (keep in sync with blogSanitizeChildren in api.php)
const CLASSES = { p: ['wx-note'], blockquote: ['wx-callout', 'wx-tip', 'wx-check', 'wx-author'], a: ['wx-video'] };
const YT_HOSTS = ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be', 'youtube-nocookie.com', 'www.youtube-nocookie.com'];
function isYoutube(u) {
  try { return /^https?:$/.test(new URL(u).protocol) && YT_HOSTS.includes(new URL(u).hostname.toLowerCase()); } catch { return false; }
}

export function safeUrl(v, { mailto = false, img = false } = {}) {
  const s = String(v || '').trim();
  if (!s) return '';
  // dev mock uploads come back as data: URLs; real uploads are always /uploads/blog/... paths
  if (img && typeof window !== 'undefined' && window.__wnxAdminMock && /^data:image\/(png|jpe?g|gif|webp);base64,[a-z0-9+/=]+$/i.test(s)) return s;
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith('//')) return '';
  if (mailto && /^mailto:/i.test(s)) return s;
  if (/^[a-z][a-z0-9+.-]*:/i.test(s)) return ''; // javascript:, data:, ...
  return s;
}

function clean(node, out, doc) {
  node.childNodes.forEach((child) => {
    if (child.nodeType === 3) {
      out.appendChild(doc.createTextNode(child.nodeValue));
      return;
    }
    if (child.nodeType !== 1) return;
    let tag = child.tagName.toLowerCase();
    if (DROP.has(tag)) return;
    tag = MAP[tag] || tag;
    if (!ALLOWED.has(tag)) {
      clean(child, out, doc); // unwrap, keep text
      return;
    }
    const el = doc.createElement(tag);
    const cls = child.getAttribute('class');
    if (cls && CLASSES[tag] && CLASSES[tag].includes(cls)) el.setAttribute('class', cls);
    if (tag === 'a') {
      const href = safeUrl(child.getAttribute('href'), { mailto: true });
      if (!href) { clean(child, out, doc); return; }
      el.setAttribute('href', href);
      if (/^https?:/i.test(href)) {
        el.setAttribute('rel', 'noopener noreferrer');
        el.setAttribute('target', '_blank');
      }
      if (el.getAttribute('class') === 'wx-video') {
        const dur = child.getAttribute('data-duration');
        if (!isYoutube(href)) el.removeAttribute('class');
        else if (dur && /^\d{1,2}(:\d{2}){1,2}$/.test(dur)) el.setAttribute('data-duration', dur);
      }
    } else if (tag === 'img') {
      const src = safeUrl(child.getAttribute('src'), { img: true });
      if (!src) return;
      el.setAttribute('src', src);
      el.setAttribute('alt', child.getAttribute('alt') || '');
    }
    if (tag !== 'img' && tag !== 'br') clean(child, el, doc);
    out.appendChild(el);
  });
}

export function sanitizeHtml(html) {
  if (typeof window === 'undefined' || !html) return '';
  // DOMParser never executes scripts or loads resources from the parsed document.
  const parsed = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html');
  const doc = document.implementation.createHTMLDocument('');
  const root = doc.createElement('div');
  clean(parsed.body, root, doc);
  // wrap stray top-level text / inline runs into paragraphs
  const wrapped = doc.createElement('div');
  const BLOCK = new Set(['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'blockquote', 'pre']);
  let para = null;
  Array.from(root.childNodes).forEach((n) => {
    if (n.nodeType === 1 && BLOCK.has(n.tagName.toLowerCase())) {
      para = null;
      wrapped.appendChild(n);
    } else if (n.nodeType === 3 && !n.nodeValue.trim() && !para) {
      // whitespace between blocks
    } else {
      if (!para) { para = doc.createElement('p'); wrapped.appendChild(para); }
      para.appendChild(n);
    }
  });
  Array.from(wrapped.querySelectorAll('p')).forEach((p) => {
    if (!p.textContent.trim() && !p.querySelector('img')) p.remove();
  });
  return wrapped.innerHTML;
}

export function plainTextLength(html) {
  if (typeof window === 'undefined') return 0;
  const d = new DOMParser().parseFromString(`<body>${html || ''}</body>`, 'text/html');
  return d.body.textContent.trim().length + (d.body.querySelector('img') ? 1 : 0);
}
