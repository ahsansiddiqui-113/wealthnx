'use client';

import { useMemo, useState } from 'react';
import {
  InputCard, NumField, SelectField, FormSection, CheckGrid, Tiles, Panel, UnlockGate, CtaBand, Disclaimer,
  lightStyles as ls, usd0, num0, toNum, clamp,
} from '../_shared/lightParts';

/* ---------- static config ---------- */

const DEFAULTS = {
  takeHome: '9000',
  gross: '12000',
  essential: '4800',
  other: '1900',
  debt: '1450',
  saving: '1500',
  liquid: '18000',
  bills: 'consistent',
  /* index 0-1 = goal checks (Savings & Goal), 2-5 = planning/coverage checks */
  checks: [true, true, true, false, true, true],
  clarity: ['partial', 'yes', 'partial', 'partial', 'partial', 'no'],
  apps: '1',
};

const BILLS_OPTIONS = [
  { value: 'consistent', label: 'Consistently' },
  { value: 'mostly', label: 'Mostly' },
  { value: 'sometimes', label: 'Sometimes late' },
  { value: 'often', label: 'Often late' },
];
const BILLS_SCORE = { consistent: 100, mostly: 75, sometimes: 45, often: 15 };

const CHECK_ITEMS = [
  'I am actively working toward at least one financial goal.',
  'I can tell whether that goal is ahead, on track, or behind.',
  'I plan for large irregular or annual expenses.',
  'I have reviewed whether my current insurance/protection coverage still fits my needs.',
  'I know how I would cover a meaningful unexpected expense.',
  'Important financial dates or renewals are visible in one place.',
];

const CLARITY_QS = [
  { q: 'Can you work out your current net worth without opening several apps?', area: 'Net worth' },
  { q: 'Do you know roughly what comes in, goes out and remains each month?', area: 'Monthly cash flow' },
  { q: 'Do you know your recurring bills, subscriptions and recurring charges?', area: 'Recurring costs' },
  { q: 'Can you identify where all meaningful financial accounts are held?', area: 'Account locations' },
  { q: 'Can you explain the main reasons your financial position changed recently?', area: 'Recent change drivers' },
  { q: 'Are important financial dates and obligations visible in one place?', area: 'Financial dates' },
];
const CLARITY_OPTIONS = [
  { value: 'yes', label: 'Yes, confidently' },
  { value: 'partial', label: 'Roughly / after checking' },
  { value: 'no', label: 'Not really' },
];
const CLARITY_VALUE = { yes: 1, partial: 0.5, no: 0 };

const DIMENSIONS = [
  { key: 'cash', name: 'Cash Flow & Daily Control', weight: 0.3 },
  { key: 'liquidity', name: 'Liquidity & Resilience', weight: 0.25 },
  { key: 'savings', name: 'Savings & Goal Progress', weight: 0.25 },
  { key: 'planning', name: 'Planning & Coverage', weight: 0.2 },
];

/* Grading bands (read from the design: Excellent 80-100, Fair 40-79, Needs Review 0-39) */
const gradeOf = (s) => (s >= 80 ? 'Excellent' : s >= 40 ? 'Fair' : 'Needs Review');

/* SCORE-START
   Scoring model (documented):
   - Cash Flow & Daily Control (30%): 50% monthly surplus as a share of GROSS income (take-home - spending),
     full marks at 20%; 50% bills-on-time (100/75/45/15).
   - Liquidity & Resilience (25%): 70% emergency runway (liquid savings / essential spending, full marks at 6 months)
     + 30% debt-payment burden (debt payments / gross income; 0 pts at 62.5%, 100 pts at 0%).
   - Savings & Goal Progress (25%): 65% savings rate (saving+investing / take-home, full marks at 20%)
     + 35% from the two goal checks (50 each).
   - Planning & Coverage (20%): the four planning/coverage checks (25 each).
   - Overall = weighted average, rounded. */
function computeScore(i) {
  const takeHome = Math.max(0, toNum(i.takeHome));
  const gross = Math.max(0, toNum(i.gross));
  const essential = Math.max(0, toNum(i.essential));
  const other = Math.max(0, toNum(i.other));
  const debt = Math.max(0, toNum(i.debt));
  const saving = Math.max(0, toNum(i.saving));
  const liquid = Math.max(0, toNum(i.liquid));

  const surplus = takeHome - essential - other;
  const incomeBase = gross > 0 ? gross : takeHome; /* fall back if gross is blank */
  const surplusRate = incomeBase > 0 ? surplus / incomeBase : 0;
  const runway = essential > 0 ? liquid / essential : liquid > 0 ? 12 : 0;
  const debtRatio = incomeBase > 0 ? debt / incomeBase : 0;
  const savingsRate = takeHome > 0 ? saving / takeHome : 0;

  const cash = 0.5 * clamp((surplusRate / 0.2) * 100, 0, 100) + 0.5 * (BILLS_SCORE[i.bills] ?? 100);
  const liquidity = 0.7 * clamp((runway / 6) * 100, 0, 100) + 0.3 * clamp(100 - 160 * debtRatio * 1, 0, 100);
  const goalScore = (i.checks[0] ? 50 : 0) + (i.checks[1] ? 50 : 0);
  const savings = 0.65 * clamp((savingsRate / 0.2) * 100, 0, 100) + 0.35 * goalScore;
  const planning = [2, 3, 4, 5].reduce((s, k) => s + (i.checks[k] ? 25 : 0), 0);

  const dims = { cash, liquidity, savings, planning };
  const overall = DIMENSIONS.reduce((s, d) => s + dims[d.key] * d.weight, 0);
  return { surplus, surplusRate, runway, debtRatio, savingsRate, dims, overall: Math.round(clamp(overall, 0, 100)) };
}
/* SCORE-END */

const withInputs = (base, patch) => ({ ...base, ...patch });
const plural = (n, one, many) => (n === 1 ? one : many);

export default function Calculator() {
  const [draft, setDraft] = useState(DEFAULTS);
  const [applied, setApplied] = useState(DEFAULTS);

  const set = (k) => (v) => setDraft((d) => ({ ...d, [k]: v }));
  const toggleCheck = (idx) => setDraft((d) => ({ ...d, checks: d.checks.map((c, k) => (k === idx ? !c : c)) }));
  const setClarity = (idx) => (v) => setDraft((d) => ({ ...d, clarity: d.clarity.map((c, k) => (k === idx ? v : c)) }));
  const submit = () => setApplied({ ...draft, checks: [...draft.checks], clarity: [...draft.clarity] });

  const r = useMemo(() => {
    const base = computeScore(applied);
    const dimList = DIMENSIONS.map((d) => ({ ...d, score: Math.round(base.dims[d.key]) }));
    const sorted = [...dimList].sort((a, b) => a.score - b.score);
    const lowest = sorted[0];
    const strongest = sorted[sorted.length - 1];

    const grade = gradeOf(base.overall);

    /* clarity */
    const values = applied.clarity.map((c) => CLARITY_VALUE[c] ?? 0);
    const clarityTotal = values.reduce((s, v) => s + v, 0);
    const needCheck = applied.clarity.filter((c) => c !== 'yes').length;
    const vis = clarityTotal >= 5 ? 'Full' : clarityTotal < 2 ? 'Limited' : 'Partial';
    const visText =
      vis === 'Full'
        ? 'You can see nearly your whole picture without much digging.'
        : vis === 'Limited'
          ? `Most of the picture is hard to see right now, with ${needCheck} of 6 areas needing checking or manual review.`
          : `You can see parts of the picture, but ${needCheck} of 6 areas still require some checking or manual review.`;

    const numbersEntered = 7;
    const checksCount = applied.checks.length;
    const answers = applied.clarity.length;
    const apps = Math.max(0, Math.round(toNum(applied.apps)));

    /* what-if: save $250 more, cut $200 of other spending, add $5,000 to liquid savings */
    const whatIfs = [
      { label: 'Add to monthly saving', val: '+$250/mo', patch: { saving: String(toNum(applied.saving) + 250) } },
      { label: 'Reduce monthly spending', val: '-$200/mo', patch: { other: String(Math.max(0, toNum(applied.other) - 200)) } },
      { label: 'Add to liquid savings', val: '+$5,000', patch: { liquid: String(toNum(applied.liquid) + 5000) } },
    ].map((w) => ({ ...w, gain: Math.max(0, computeScore(withInputs(applied, w.patch)).overall - base.overall) }));
    const combined = computeScore(withInputs(applied, Object.assign({}, ...whatIfs.map((w) => w.patch)))).overall;
    const projected = Math.max(base.overall, combined);

    const driverSubs = {
      cash: `Monthly surplus of ${usd0.format(base.surplus)} (${(base.surplusRate * 100).toFixed(1)}% of gross); bills paid ${BILLS_OPTIONS.find((o) => o.value === applied.bills)?.label.toLowerCase() ?? 'consistently'}.`,
      liquidity: `Liquid savings cover ${base.runway.toFixed(1)} months of essentials; debt payments are ${(base.debtRatio * 100).toFixed(1)}% of gross income.`,
      savings: `Monthly saving and investing equal about ${(base.savingsRate * 100).toFixed(1)}% of take-home income; goal checks completed: ${applied.checks.slice(0, 2).filter(Boolean).length} of 2.`,
      planning: `You completed ${applied.checks.slice(2).filter(Boolean).length} of 4 planning and coverage checks.`,
    };

    return { base, dimList, sorted, lowest, strongest, grade, vis, visText, needCheck, numbersEntered, checksCount, answers, apps, whatIfs, projected, driverSubs };
  }, [applied]);

  const { base } = r;

  return (
    <>
      <InputCard submitLabel="Reveal my Financial Health Score" onSubmit={submit}>
        <FormSection title="1. Your monthly picture" sub="Use a typical month. Rough numbers are fine for this lead-magnet prototype.">
          <div className={ls.fields} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
            <NumField label="Take-home income" prefix="$" value={draft.takeHome} onChange={set('takeHome')} />
            <NumField label="Gross income" prefix="$" value={draft.gross} onChange={set('gross')} />
            <NumField label="Essential spending" prefix="$" value={draft.essential} onChange={set('essential')} hint="Housing, food, utilities, insurance, transport and other essentials." />
            <NumField label="Other spending" prefix="$" value={draft.other} onChange={set('other')} />
            <NumField label="Required monthly debt payments" prefix="$" value={draft.debt} onChange={set('debt')} hint="Used here to see cash-flow pressure, not to price a loan." />
            <NumField label="Monthly saving + investing" prefix="$" value={draft.saving} onChange={set('saving')} />
            <NumField label="Liquid savings" prefix="$" value={draft.liquid} onChange={set('liquid')} hint="Cash or savings you can readily access." />
            <SelectField label="Bills paid on time" value={draft.bills} onChange={set('bills')} options={BILLS_OPTIONS} />
          </div>
        </FormSection>

        <FormSection title="2. Goals, planning & coverage" sub="These checks help estimate the two app-dependent dimensions that cover goal progress and planning/coverage.">
          <CheckGrid items={CHECK_ITEMS} checked={draft.checks} onToggle={toggleCheck} />
        </FormSection>

        <FormSection title="3. Clarity snapshot" sub="This is a diagnostic, not a second Financial Health Score. It simply shows how much of your financial picture you can see without rebuilding it manually.">
          <div className={ls.fields} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {CLARITY_QS.map((c, idx) => (
              <SelectField key={c.area} label={c.q} value={draft.clarity[idx]} onChange={setClarity(idx)} options={CLARITY_OPTIONS} />
            ))}
          </div>
          <div className={ls.fields} style={{ gridTemplateColumns: 'minmax(0, 1fr)', marginTop: 14 }}>
            <NumField label="How many separate financial apps/sites would you need to open to rebuild your broader picture?" value={draft.apps} onChange={set('apps')} hint="Shown as context only. It does not change the Financial Health Score." />
          </div>
        </FormSection>
      </InputCard>

      <div className={ls.split}>
        <section className={ls.hero} aria-live="polite">
          <p className={ls.heroLabel}>WealthNX Financial Health Score</p>
          <p className={ls.heroScore} style={{ marginTop: 14 }}>{base.overall}</p>
          <p className={ls.heroGrade}>{r.grade}</p>
          <p className={ls.heroText}>Your score sits in WealthNX&apos;s {r.grade} band based on the information entered.</p>
        </section>
        <section className={ls.partial}>
          <p className={ls.heroLabel} style={{ color: '#8a9292' }}>Separate visibility diagnostic</p>
          <h2 className={ls.partialTitle} style={{ marginTop: 6 }}>{r.vis} visibility</h2>
          <p className={ls.partialText}>{r.visText}</p>
          <div className={ls.pillRow}>
            {CLARITY_QS.map((c, idx) => {
              const ok = applied.clarity[idx] === 'yes';
              return (
                <span key={c.area} className={`${ls.pill} ${ok ? ls.pillGood : ''}`.trim()}>
                  {c.area} {ok ? 'clear' : 'check'}
                </span>
              );
            })}
          </div>
        </section>
      </div>

      <Panel title="What is driving your Financial Health Score">
        <div className={ls.drivers} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))' }}>
          {r.dimList.map((d) => (
            <div className={ls.driver} key={d.key}>
              <div className={ls.driverTop}><span>{d.name}</span></div>
              <div style={{ fontSize: 10, color: '#8a9292', marginTop: 2 }}>{Math.round(d.weight * 100)}%</div>
              <div className={ls.driverScore}>{d.score}</div>
              <div className={ls.bar}><div className={ls.barFill} style={{ width: `${d.score}%` }} /></div>
            </div>
          ))}
        </div>
      </Panel>

      <Tiles
        cols={4}
        items={[
          { label: 'Monthly surplus', value: usd0.format(base.surplus) },
          { label: 'Emergency runway', value: `${base.runway.toFixed(1)} mo` },
          { label: 'Debt payment ratio', value: `${(base.debtRatio * 100).toFixed(1)}%` },
          { label: 'Savings rate', value: `${(base.savingsRate * 100).toFixed(1)}%` },
        ]}
      />

      <Panel title="Your immediate read">
        <p className={ls.rowSub} style={{ borderLeft: '2px solid #1bc8bb', paddingLeft: 10, fontSize: 11, color: '#1d2424', margin: '0 0 10px' }}>
          Financial Health&apos;s strongest measured dimension is {r.strongest.name} ({r.strongest.score}/100); lowest is {r.lowest.name} ({r.lowest.score}/100).
        </p>
        <p className={ls.rowSub} style={{ borderLeft: '2px solid #1bc8bb', paddingLeft: 10, fontSize: 11, color: '#1d2424', margin: 0 }}>
          Clarity snapshot: {r.needCheck} of 6 visibility {plural(r.needCheck, 'area requires', 'areas require')} at least some checking. This does not change your Financial Health Score.
        </p>
        <div className={ls.callout}>
          <strong>You rebuilt this snapshot from {r.numbersEntered} numbers, {r.checksCount} planning/goal checks and {r.answers} visibility answers.</strong>
          <div style={{ marginTop: 4, opacity: 0.85 }}>
            You estimated that it takes {r.apps} separate financial {plural(r.apps, 'place', 'places')} to rebuild your broader picture. This fragmentation depends on your context only.
          </div>
        </div>
      </Panel>

      <UnlockGate
        title="Unlock the full X-Ray"
        sub={`Your lowest measured dimension is ${r.lowest.name} (${r.lowest.score}/100). Unlock the full dimension breakdown and what-if preview.`}
        buttonLabel="Unlock my full X-Ray"
      >
        <Panel title="Your biggest Financial Health score drivers">
          {r.sorted.map((d, idx) => (
            <div className={ls.row} key={d.key}>
              <div>
                <div className={ls.rowTitle}>{idx + 1}. {d.name}</div>
                <div className={ls.rowSub}>{r.driverSubs[d.key]}</div>
              </div>
              <div className={ls.rowValue}>{d.score}/100</div>
            </div>
          ))}
        </Panel>
        <Panel title="What-if score preview">
          <p className={ls.rowNote} style={{ marginTop: 0 }}>
            Change one assumption below to see how the Financial Health Score might move. This is illustrative, not a recommendation or forecast.
          </p>
          {r.whatIfs.map((w) => (
            <div className={ls.barRow} key={w.label}>
              <span>{w.label}</span>
              <div className={ls.bar}><div className={ls.barFill} style={{ width: `${clamp(w.gain * 25, 8, 100)}%` }} /></div>
              <span style={{ width: 110, textAlign: 'right', fontWeight: 700 }}>{w.val}</span>
            </div>
          ))}
          <div style={{ marginTop: 16, padding: '14px 16px', background: '#fff', borderRadius: 12 }}>
            <div style={{ fontSize: 10, color: '#8a9292' }}>Projected Financial Health Score</div>
            <div style={{ fontSize: 26, fontWeight: 700 }}>
              {r.projected} <span style={{ fontSize: 11, color: '#0a7a72', fontWeight: 600 }}>+{r.projected - base.overall} {plural(r.projected - base.overall, 'point', 'points')} vs current</span>
            </div>
          </div>
        </Panel>
      </UnlockGate>

      <CtaBand
        title="You assembled this picture manually once."
        body="Inside WealthNX, the Financial Health Score is designed to use financial information reasonably available through your accounts, while the broader product brings balances, cash flow, recurring costs and progress into one place. Manual entry remains available and account connection is optional."
        label="Explore WealthNX"
      />

      <details open className={ls.how}>
        <summary>How is this calculated?</summary>
        <p>WealthNX&apos;s own Financial Health Score methodology is based on financial information reasonably available through your account. In this lead-magnet prototype, the score is estimated from the information you enter manually.</p>
        <p>It is not a credit score, a net-worth measure, or an investment-risk score, and is for informational purposes only — not financial, legal, tax, or investment advice, and not a substitute for professional guidance. A 100/100 in any section is the maximum score for that section only, not a claim that your finances are complete or risk-free.</p>
        <div style={{ margin: '14px 0 6px' }}>
          {DIMENSIONS.map((d) => (
            <div className={ls.row} key={d.key} style={{ padding: '6px 0' }}>
              <div className={ls.rowTitle}>{d.name}</div>
              <div className={ls.rowValue} style={{ fontSize: 11 }}>{Math.round(d.weight * 100)}%</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 14, fontWeight: 600 }}>Score bands</p>
        {[['Excellent', '80-100'], ['Fair', '40-79'], ['Needs Review', '0-39']].map(([n, range]) => (
          <div className={ls.row} key={n} style={{ padding: '6px 0' }}>
            <div className={ls.rowTitle}>{n}</div>
            <div className={ls.rowValue} style={{ fontSize: 11 }}>{range}</div>
          </div>
        ))}
        <p style={{ marginTop: 14 }}>Score bands are aligned to the published benefits of the Financial Health Network&apos;s FinHealth Score model, a widely used framework for measuring financial health on a 0-100 scale. WealthNX uses its own labels for those bands. Only the 0-100 band cutoffs are aligned; which dimensions and metrics make up the score, and their weights, are WealthNX&apos;s own.</p>
        <p>WealthNX uses its own scoring dimensions and weights to provide an informational view of financial health.</p>
      </details>

      <Disclaimer>The Clarity Snapshot is a separate descriptive lead-magnet diagnostic. It does not change, replace, or re-grade the WealthNX Financial Health Score.</Disclaimer>
    </>
  );
}
