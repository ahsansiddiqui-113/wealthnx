'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { sanitizeHtml, safeUrl } from './sanitize';
import { uploadImage, validateImage } from './api';
import { useAdmin } from './ui';

const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const PREVIEW_CSS = `
body{margin:0;padding:24px;font:16px/1.7 Arial,Helvetica,sans-serif;color:#1a1a1a;background:#fff;word-wrap:break-word}
h2{font-size:26px;line-height:1.25;margin:1.4em 0 .5em}h3{font-size:21px;margin:1.2em 0 .4em}h4{font-size:18px}
p{margin:0 0 1em}a{color:#0f8f80}img{max-width:100%;height:auto;border-radius:10px}
blockquote{margin:1em 0;padding:.4em 1em;border-left:4px solid #1fb9a6;background:#f3fbf9;color:#355}
pre{background:#0b0b0b;color:#e8e8e8;padding:14px;border-radius:10px;overflow:auto}code{background:#eef2f1;padding:1px 5px;border-radius:4px}pre code{background:none;padding:0}
ul,ol{padding-left:1.4em}
.wx-callout,.wx-tip{background:#e6f6f5;border:0;border-radius:14px;padding:14px 18px}.wx-check,.wx-author{background:#f7f7f7;border:0;border-radius:14px;padding:14px 18px;color:#1a1a1a}
blockquote h4{margin:0 0 6px;color:#0f8f80}.wx-callout h4{text-transform:uppercase;font-size:13px;letter-spacing:.06em}.wx-author h4{color:#111}
p.wx-note{font-size:13px;color:#777}a.wx-video{display:block;position:relative}a.wx-video:after{content:"\\25B6  Video " attr(data-duration);position:absolute;right:10px;top:10px;background:#000a;color:#fff;font-size:12px;padding:3px 9px;border-radius:99px}`;

const TOOLS = [
  { id: 'bold', label: 'B', title: 'Bold', cls: 'ad-tb-b' },
  { id: 'italic', label: 'I', title: 'Italic', cls: 'ad-tb-i' },
  { id: 'h2', label: 'H2', title: 'Heading 2' },
  { id: 'h3', label: 'H3', title: 'Heading 3' },
  { id: 'ul', label: '• List', title: 'Bulleted list' },
  { id: 'ol', label: '1. List', title: 'Numbered list' },
  { id: 'link', label: 'Link', title: 'Insert link' },
  { id: 'quote', label: 'Quote', title: 'Blockquote' },
  { id: 'image', label: 'Image', title: 'Insert image' },
  { id: 'clear', label: 'Clear', title: 'Clear formatting' },
];

const BLOCKS = {
  callout: ['Callout ("short version")', '<blockquote class="wx-callout"><h4>The short version</h4><p>Type your summary here.</p></blockquote>'],
  tip: ['Tip box', '<blockquote class="wx-tip"><h4>Tip</h4><p>Type your tip here.</p></blockquote>'],
  check: ['Checklist card', '<blockquote class="wx-check"><h4>Before you start</h4><ul><li>First item</li><li>Second item</li><li>Third item</li></ul></blockquote>'],
  author: ['Author box', '<blockquote class="wx-author"><h4>WealthNX Team</h4><p>Short bio of the author.</p></blockquote>'],
  note: ['Note / disclaimer', '<p class="wx-note">For general information only. This is not financial advice.</p>'],
};

function videoBlock(url, duration) {
  const m = url.match(/(?:youtu\.be\/|[?&]v=|\/embed\/)([\w-]{11})/);
  const inner = m ? `<img src="https://img.youtube.com/vi/${m[1]}/hqdefault.jpg" alt="Video thumbnail">` : 'Watch the video';
  const d = /^\d{1,2}(:\d{2}){1,2}$/.test(duration) ? ` data-duration="${duration}"` : '';
  return `<p><a class="wx-video" href="${escapeHtml(url)}"${d}>${inner}</a></p>`;
}

export default function RichEditor({ value, onChange, invalid, describedBy }) {
  const { toast } = useAdmin();
  const [tab, setTab] = useState('visual');
  const [uploading, setUploading] = useState(false);
  const ed = useRef(null);
  const fileRef = useRef(null);
  const lastEmit = useRef(null);
  const savedRange = useRef(null);

  // Push external value changes (load, tab switch) into the DOM without clobbering typing.
  useLayoutEffect(() => {
    if (tab !== 'visual' || !ed.current) return;
    if (value !== lastEmit.current) {
      ed.current.innerHTML = sanitizeHtml(value);
      lastEmit.current = value;
    }
  }, [value, tab]);

  useEffect(() => {
    try { document.execCommand('defaultParagraphSeparator', false, 'p'); } catch { /* ignore */ }
  }, []);

  const emit = useCallback(() => {
    if (!ed.current) return;
    const html = sanitizeHtml(ed.current.innerHTML);
    if (html === lastEmit.current) return;
    lastEmit.current = html;
    onChange(html);
  }, [onChange]);

  const saveRange = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount && ed.current && ed.current.contains(sel.anchorNode)) {
      savedRange.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const focusEditor = () => {
    const node = ed.current;
    node.focus();
    const sel = window.getSelection();
    if (savedRange.current) {
      sel.removeAllRanges();
      sel.addRange(savedRange.current);
    } else if (!sel.rangeCount || !node.contains(sel.anchorNode)) {
      const r = document.createRange();
      r.selectNodeContents(node);
      r.collapse(false);
      sel.removeAllRanges();
      sel.addRange(r);
    }
  };

  const exec = (cmd, arg) => {
    focusEditor();
    try { document.execCommand(cmd, false, arg); } catch { /* ignore */ }
    saveRange();
    emit();
  };

  const toggleBlock = (tag) => {
    focusEditor();
    const cur = String(document.queryCommandValue('formatBlock') || '').toLowerCase().replace(/[<>]/g, '');
    exec('formatBlock', cur === tag ? 'p' : tag);
  };

  const addLink = () => {
    focusEditor();
    saveRange();
    const sel = window.getSelection();
    const hasText = sel && !sel.isCollapsed;
    let url = window.prompt('Link URL (https://..., http://... or mailto:...)', 'https://');
    if (url === null) return;
    url = url.trim();
    if (/^www\./i.test(url)) url = 'https://' + url;
    const ok = /^(https?:\/\/|mailto:)/i.test(url) && safeUrl(url, { mailto: true });
    if (!ok) { toast('Only http, https and mailto links are allowed.', 'error'); return; }
    focusEditor();
    if (hasText) exec('createLink', url);
    else exec('insertHTML', `<a href="${escapeHtml(url)}">${escapeHtml(url)}</a>`);
  };

  const insertBlock = (key) => {
    let html = BLOCKS[key] && BLOCKS[key][1];
    if (key === 'video') {
      const url = (window.prompt('YouTube link (https://youtu.be/... or https://www.youtube.com/watch?v=...)', 'https://') || '').trim();
      if (!url) return;
      if (!/^https?:\/\/(www\.|m\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\//i.test(url)) { toast('Only YouTube links are allowed.', 'error'); return; }
      const dur = (window.prompt('Video length shown on the card, like 3:24 (optional)', '') || '').trim();
      html = videoBlock(url, dur);
    }
    if (!html) return;
    if (tab === 'html') { onChange(`${value}\n${html}`); return; }
    focusEditor();
    document.execCommand('insertHTML', false, html);
    saveRange();
    emit();
  };

  const pickImage = () => { saveRange(); if (fileRef.current) fileRef.current.click(); };

  const onImageFile = async (file) => {
    if (!file) return;
    const bad = validateImage(file);
    if (bad) { toast(bad, 'error'); return; }
    setUploading(true);
    try {
      const url = await uploadImage(file);
      const alt = window.prompt('Image description (alt text, optional)', '') || '';
      focusEditor();
      document.execCommand('insertHTML', false, `<img src="${escapeHtml(url)}" alt="${escapeHtml(alt)}">`);
      saveRange();
      emit();
    } catch (e) {
      if (e.status !== 401) toast(e.message, 'error');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const run = (id) => {
    switch (id) {
      case 'bold': return exec('bold');
      case 'italic': return exec('italic');
      case 'h2': return toggleBlock('h2');
      case 'h3': return toggleBlock('h3');
      case 'ul': return exec('insertUnorderedList');
      case 'ol': return exec('insertOrderedList');
      case 'quote': return toggleBlock('blockquote');
      case 'link': return addLink();
      case 'image': return pickImage();
      case 'clear':
        focusEditor();
        document.execCommand('removeFormat');
        document.execCommand('unlink');
        document.execCommand('formatBlock', false, 'p');
        saveRange();
        emit();
        return undefined;
      default: return undefined;
    }
  };

  const onPaste = (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text/plain');
    if (!text) return;
    const paras = text.replace(/\r/g, '').split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
    if (paras.length <= 1 && !text.includes('\n')) {
      document.execCommand('insertText', false, text);
    } else {
      const html = paras.map((p) => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`).join('');
      document.execCommand('insertHTML', false, html);
    }
    emit();
  };

  const onKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
      const k = e.key.toLowerCase();
      if (k === 'k') { e.preventDefault(); addLink(); }
    }
  };

  const previewDoc = useMemo(() => {
    if (tab !== 'preview') return '';
    return `<!doctype html><html><head><meta charset="utf-8"><base target="_blank"><style>${PREVIEW_CSS}</style></head><body>${sanitizeHtml(value) || '<p style="color:#888">Nothing to preview yet.</p>'}</body></html>`;
  }, [tab, value]);

  return (
    <div className={`ad-editor${invalid ? ' is-invalid' : ''}`}>
      <div className="ad-editor-tabs" role="tablist" aria-label="Content editor mode">
        {[['visual', 'Visual'], ['html', 'HTML'], ['preview', 'Preview']].map(([k, l]) => (
          <button key={k} type="button" role="tab" aria-selected={tab === k} className={`ad-etab${tab === k ? ' is-on' : ''}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab !== 'preview' && (
        <div className="ad-toolbar" role="toolbar" aria-label="Formatting">
          <select
            className="ad-input ad-tb-block"
            aria-label="Insert block"
            value=""
            onMouseDown={saveRange}
            onChange={(e) => insertBlock(e.target.value)}
          >
            <option value="">+ Insert block</option>
            {Object.entries(BLOCKS).map(([k, [label]]) => <option key={k} value={k}>{label}</option>)}
            <option value="video">YouTube video card</option>
          </select>
          {tab === 'visual' && TOOLS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`ad-tb ${t.cls || ''}`}
              title={t.title}
              aria-label={t.title}
              disabled={uploading && t.id === 'image'}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => run(t.id)}
            >{t.id === 'image' && uploading ? '...' : t.label}</button>
          ))}
        </div>
      )}

      <div
        ref={ed}
        className="ad-wysiwyg"
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        aria-label="Post content"
        aria-describedby={describedBy}
        data-placeholder="Start writing..."
        hidden={tab !== 'visual'}
        onInput={emit}
        onBlur={saveRange}
        onKeyUp={saveRange}
        onMouseUp={saveRange}
        onPaste={onPaste}
        onKeyDown={onKeyDown}
      />

      {tab === 'html' && (
        <textarea
          className="ad-html"
          aria-label="Post content HTML"
          spellCheck={false}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {tab === 'preview' && (
        <iframe className="ad-preview" title="Post preview" sandbox="" srcDoc={previewDoc} />
      )}

      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="ad-file" onChange={(e) => onImageFile(e.target.files && e.target.files[0])} />
    </div>
  );
}
