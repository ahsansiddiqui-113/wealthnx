'use client';

import { useId, useState } from 'react';
import styles from './light.module.css';

export const usd0 = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
export const usd2 = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
export const num0 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
export const toNum = (v, fallback = 0) => {
  const n = parseFloat(String(v).replace(/,/g, ''));
  return Number.isFinite(n) ? n : fallback;
};
export const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/* 21 yrs 2 mo / 27 yrs / 5 mo */
export function fmtYM(totalMonthsRaw) {
  const total = Math.max(0, Math.round(totalMonthsRaw));
  const y = Math.floor(total / 12);
  const m = total % 12;
  const parts = [];
  if (y > 0) parts.push(`${y} yr${y === 1 ? '' : 's'}`);
  if (m > 0 || y === 0) parts.push(`${m} mo`);
  return parts.join(' ');
}

/* ---- input card ---- */

/* Wrap fields in <InputCard>; onSubmit fires on button click or Enter. Use `cols={2}` for a 2-col grid. */
export function InputCard({ tag, submitLabel, onSubmit, note, children }) {
  return (
    <form className={styles.inputCard} onSubmit={(e) => { e.preventDefault(); onSubmit?.(); }}>
      {tag && <span className={styles.tag}>{tag}</span>}
      {children}
      <button type="submit" className={styles.submit}>{submitLabel}</button>
      {note && <p className={styles.note}>{note}</p>}
    </form>
  );
}

export function Fields({ cols = 3, children }) {
  return <div className={`${styles.fields} ${cols === 2 ? styles.fields2 : ''}`.trim()}>{children}</div>;
}

/* prefix="$" or suffix="%" decorate the input; value/onChange are strings (controlled). */
export function NumField({ label, value, onChange, prefix, suffix, hint, full, ...rest }) {
  const id = useId();
  return (
    <div className={`${styles.field} ${full ? styles.fieldsFull : ''}`.trim()}>
      <label htmlFor={id}>{label}</label>
      <div className={`${styles.inputWrap} ${prefix ? styles.withPrefix : ''} ${suffix ? styles.withSuffix : ''}`.trim()}>
        {prefix && <span className={`${styles.affix} ${styles.prefix}`}>{prefix}</span>}
        <input id={id} className={styles.input} type="text" inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} {...rest} />
        {suffix && <span className={`${styles.affix} ${styles.suffix}`}>{suffix}</span>}
      </div>
      {hint && <span className={styles.hint}>{hint}</span>}
    </div>
  );
}

/* options: [{ value, label }] */
export function SelectField({ label, value, onChange, options, hint, full }) {
  const id = useId();
  return (
    <div className={`${styles.field} ${full ? styles.fieldsFull : ''}`.trim()}>
      <label htmlFor={id}>{label}</label>
      <select id={id} className={styles.select} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {hint && <span className={styles.hint}>{hint}</span>}
    </div>
  );
}

export function FormSection({ title, sub, children }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {sub && <p className={styles.sectionSub}>{sub}</p>}
      {children}
    </section>
  );
}

export function CheckGrid({ items, checked, onToggle }) {
  return (
    <div className={styles.checks}>
      {items.map((label, i) => (
        <label className={styles.check} key={label}>
          <input type="checkbox" checked={!!checked[i]} onChange={() => onToggle(i)} />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );
}

/* ---- results ---- */

export function ResultHero({ label, value, text }) {
  return (
    <section className={styles.hero} aria-live="polite">
      <p className={styles.heroLabel}>{label}</p>
      <p className={styles.heroValue}>{value}</p>
      {text && <p className={styles.heroText}>{text}</p>}
    </section>
  );
}

export function Tiles({ items, cols = 3 }) {
  return (
    <div className={`${styles.tiles} ${cols === 4 ? styles.tiles4 : ''}`.trim()}>
      {items.map((t) => (
        <div className={styles.tile} key={t.label}>
          <div className={styles.tileLabel}>{t.label}</div>
          <div className={styles.tileValue}>{t.value}</div>
          {t.sub && <div className={styles.tileSub}>{t.sub}</div>}
        </div>
      ))}
    </div>
  );
}

/* rows: [{ title, sub, value }] */
export function DetailCard({ title, rows, note }) {
  return (
    <section className={styles.panel}>
      <h2 className={styles.panelTitle}>{title}</h2>
      {rows.map((r) => (
        <div className={styles.row} key={r.title}>
          <div>
            <div className={styles.rowTitle}>{r.title}</div>
            {r.sub && <div className={styles.rowSub}>{r.sub}</div>}
          </div>
          <div className={styles.rowValue}>{r.value}</div>
        </div>
      ))}
      {note && <p className={styles.rowNote}>{note}</p>}
    </section>
  );
}

export function Panel({ title, children }) {
  return (
    <section className={styles.panel}>
      {title && <h2 className={styles.panelTitle}>{title}</h2>}
      {children}
    </section>
  );
}

/* Table with the shared look. columns: ['Age', 'Projected balance']; rows: [[a, b] | [{ main, sub }, b]] */
export function DataTable({ columns, rows }) {
  return (
    <table className={styles.table}>
      <thead><tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr></thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((cell, j) => (
              <td key={j}>
                {cell && typeof cell === 'object' && 'main' in cell
                  ? <>{cell.main}{cell.sub && <small>{cell.sub}</small>}</>
                  : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* Dashed email card + the blurred "locked" content below it. Submitting a valid email reveals the
   content in the browser only. NOTE: no email is sent or stored anywhere (no backend wired). */
export function UnlockGate({ title, sub, buttonLabel = 'Unlock analysis', children }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) { setError('Enter a valid email address.'); return; }
    setError('');
    setOpen(true);
  };
  return (
    <>
      {!open && (
        <section className={styles.gate}>
          <h2 className={styles.gateTitle}>{title}</h2>
          <p className={styles.gateSub}>{sub}</p>
          <form className={styles.gateForm} onSubmit={submit} noValidate>
            <input className={styles.gateInput} type="email" placeholder="you@email.com" aria-label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            <button type="submit" className={styles.btn}>{buttonLabel}</button>
          </form>
          {error && <p className={styles.gateError} role="alert">{error}</p>}
        </section>
      )}
      <div className={`${styles.locked} ${open ? styles.lockedOpen : ''}`.trim()} aria-hidden={!open}>
        <div className={styles.lockedInner}>{children}</div>
        <div className={styles.lockedFade} />
      </div>
    </>
  );
}

export function CtaBand({ title, body, href = '/features/', label = 'Explore WealthNX' }) {
  return (
    <section className={styles.cta}>
      <h2 className={styles.ctaTitle}>{title}</h2>
      <p className={styles.ctaBody}>{body}</p>
      <a className={styles.ctaBtn} href={href}>{label}</a>
    </section>
  );
}

export function Disclaimer({ children }) {
  return <p className={styles.disclaimer}>{children}</p>;
}

export { styles as lightStyles };
