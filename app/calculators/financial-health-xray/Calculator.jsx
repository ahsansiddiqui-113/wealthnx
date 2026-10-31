'use client';

import { useMemo, useState } from 'react';
import {
  CtaBand, Disclaimer, Fields, InputCard, NumField, Panel, SelectField, Tiles,
  clamp, lightStyles, toNum, usd0,
} from '../_shared/lightParts';

const AGE_MULT_AGES = [22, 25, 30, 35, 40, 45, 50, 55, 60, 65, 67];
const AGE_MULT_VALUES = [0.1, 0.3, 0.5, 1, 2, 3, 4.5, 6, 7.5, 9, 10];

function investingMultiple(age) {
  if (age <= AGE_MULT_AGES[0]) return AGE_MULT_VALUES[0];
  if (age >= AGE_MULT_AGES[AGE_MULT_AGES.length - 1]) return AGE_MULT_VALUES[AGE_MULT_VALUES.length - 1];
  for (let i = 0; i < AGE_MULT_AGES.length - 1; i++) {
    if (age >= AGE_MULT_AGES[i] && age <= AGE_MULT_AGES[i + 1]) {
      const span = AGE_MULT_AGES[i + 1] - AGE_MULT_AGES[i];
      const frac = span > 0 ? (age - AGE_MULT_AGES[i]) / span : 0;
      return AGE_MULT_VALUES[i] + frac * (AGE_MULT_VALUES[i + 1] - AGE_MULT_VALUES[i]);
    }
  }
  return AGE_MULT_VALUES[AGE_MULT_VALUES.length - 1];
}

const gradeFor = (score) => {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Fair';
  if (score >= 30) return 'Needs work';
  return 'At risk';
};

function compute(f, protection) {
  const age = toNum(f.age, 30);
  const income = toNum(f.income, 0);
  const expenses = toNum(f.expenses, 0);
  const savings = toNum(f.savings, 0);
  const debt = toNum(f.debt, 0);
  const invMonthly = toNum(f.invMonthly, 0);
  const retirement = toNum(f.retirement, 0);
  const netWorth = toNum(f.netWorth, 0);
  const annualIncome = income * 12;

  const emergencyMonths = expenses > 0 ? savings / expenses : 0;
  const emergencyScore = 20 * clamp(emergencyMonths / 6, 0, 1);

  const debtRatio = annualIncome > 0 ? debt / annualIncome : (debt > 0 ? 1 : 0);
  const debtScore = debt <= 0 ? 15 : 15 * clamp(1 - debtRatio / 0.25, 0, 1);

  const savingsRatePct = income > 0 ? (invMonthly / income) * 100 : 0;
  const savingsScore = 20 * clamp(savingsRatePct / 20, 0, 1);

  const netWorthTarget = 0.5 * annualIncome;
  const netWorthScore = netWorthTarget > 0 ? 15 * clamp(netWorth / netWorthTarget, 0, 1) : (netWorth > 0 ? 15 : 0);

  const investBenchmark = investingMultiple(age) * annualIncome;
  const investingScore = investBenchmark > 0 ? 15 * clamp(retirement / investBenchmark, 0, 1) : (retirement > 0 ? 15 : 0);

  const protectionScore = [0, 8, 15][protection];
  const total = emergencyScore + debtScore + savingsScore + netWorthScore + investingScore + protectionScore;

  const surplus = income - expenses - invMonthly;
  const emergencyGap = Math.max(0, 6 * expenses - savings);
  const savingsGap = Math.max(0, income * 0.2 - invMonthly);
  const netWorthGap = Math.max(0, netWorthTarget - netWorth);
  const investGap = Math.max(0, investBenchmark - retirement);

  const rows = [
    { name: 'Emergency buffer', pts: emergencyScore, weight: 20,
      tip: emergencyScore < 14 ? `Add ${usd0.format(emergencyGap)} to reach 6 months of expenses in savings.` : '' },
    { name: 'Debt', pts: debtScore, weight: 15,
      tip: debtScore < 11 ? `You carry ${usd0.format(debt)} in high-interest debt — paying it down usually beats any investment return.` : '' },
    { name: 'Savings rate', pts: savingsScore, weight: 20,
      tip: savingsScore < 14 ? `Save ${usd0.format(savingsGap)} more per month to reach a 20% rate.` : '' },
    { name: 'Net worth', pts: netWorthScore, weight: 15,
      tip: netWorthScore < 11 ? `You're ${usd0.format(netWorthGap)} from a solid net-worth baseline for your income.` : '' },
    { name: 'Long-term investing', pts: investingScore, weight: 15,
      tip: investingScore < 11 ? `You're ${usd0.format(investGap)} behind the typical benchmark for age ${Math.round(age)}.` : '' },
    { name: 'Protection', pts: protectionScore, weight: 15,
      tip: protectionScore < 11 ? 'Income protection or disability cover would close a real gap here.' : '' },
  ];

  return { total, emergencyMonths, savingsRatePct, debtRatio, surplus, rows };
}

const DEFAULTS = {
  age: '34', income: '6200', expenses: '3800', savings: '9000', debt: '4200',
  invMonthly: '700', retirement: '52000', netWorth: '68000', protection: '1',
};

const PROTECTION_OPTIONS = [
  { value: '0', label: 'Not protected' },
  { value: '1', label: 'Partial' },
  { value: '2', label: 'Fully' },
];

export default function Calculator() {
  const [draft, setDraft] = useState(DEFAULTS);
  const [applied, setApplied] = useState(DEFAULTS);
  const set = (key) => (v) => setDraft((prev) => ({ ...prev, [key]: v }));

  const r = useMemo(() => {
    const p = Math.round(toNum(applied.protection, 1));
    return compute(applied, clamp(p, 0, 2));
  }, [applied]);

  const score = Math.round(r.total);

  return (
    <>
      <InputCard tag="Real-numbers scan" submitLabel="Run my X-ray" onSubmit={() => setApplied({ ...draft })}>
        <Fields cols={3}>
          <NumField label="Current age" value={draft.age} onChange={set('age')} inputMode="numeric" />
          <NumField label="Monthly take-home income" prefix="$" value={draft.income} onChange={set('income')} />
          <NumField label="Monthly essential expenses" prefix="$" value={draft.expenses} onChange={set('expenses')} />
          <NumField label="Liquid emergency savings" prefix="$" value={draft.savings} onChange={set('savings')} />
          <NumField label="High-interest debt balance" prefix="$" hint="cards, personal loans — not mortgage" value={draft.debt} onChange={set('debt')} />
          <NumField label="Saved or invested each month" prefix="$" value={draft.invMonthly} onChange={set('invMonthly')} />
          <NumField label="Retirement & long-term investment balance" prefix="$" value={draft.retirement} onChange={set('retirement')} />
          <NumField label="Net worth" prefix="$" hint="assets minus all debts" value={draft.netWorth} onChange={set('netWorth')} />
          <SelectField label="Income protection" value={draft.protection} onChange={set('protection')} options={PROTECTION_OPTIONS} />
        </Fields>
      </InputCard>

      <section className={lightStyles.hero} aria-live="polite">
        <div className={lightStyles.heroRow}>
          <div className={lightStyles.heroScore}>{score}<small style={{ fontSize: '0.35em', fontWeight: 600, opacity: 0.7 }}>/100</small></div>
          <div className={lightStyles.heroGrade}>{gradeFor(r.total)}</div>
        </div>
      </section>

      <Tiles
        cols={4}
        items={[
          { label: 'Emergency runway', value: `${r.emergencyMonths.toFixed(1)} mo` },
          { label: 'Savings rate', value: `${r.savingsRatePct.toFixed(0)}%` },
          { label: 'Debt vs. income', value: `${(r.debtRatio * 100).toFixed(0)}%` },
          { label: 'Monthly surplus', value: `${r.surplus < 0 ? '-' : ''}${usd0.format(Math.abs(r.surplus))}` },
        ]}
      />

      <Panel title="Breakdown & next steps">
        {r.rows.map((row) => (
          <div key={row.name} style={{ padding: '10px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
              <span>{row.name}</span>
              <span>{Math.round(row.pts)} / {row.weight}</span>
            </div>
            <div className={lightStyles.bar}>
              <div className={lightStyles.barFill} style={{ width: `${clamp((row.pts / row.weight) * 100, 0, 100)}%` }} />
            </div>
            {row.tip && <p style={{ margin: '6px 0 0', fontSize: 12, lineHeight: 1.45, color: '#6b7373' }}>{row.tip}</p>}
          </div>
        ))}
      </Panel>

      <CtaBand
        title="You scanned this manually once."
        body="WealthNX can keep these numbers current from your connected accounts, so your score updates without re-entering anything."
        label="Explore WealthNX"
      />

      <Disclaimer>Educational illustration only. Scores are simplified estimates based on user-entered figures and are not financial advice.</Disclaimer>
    </>
  );
}
