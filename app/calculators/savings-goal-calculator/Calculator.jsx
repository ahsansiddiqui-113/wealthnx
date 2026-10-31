'use client';

import { useMemo, useState } from 'react';
import {
  InputCard, Fields, NumField, ResultHero, Tiles, DetailCard, Panel, DataTable,
  UnlockGate, CtaBand, Disclaimer, lightStyles,
  usd0, usd2, toNum, clamp, fmtYM,
} from '../_shared/lightParts';

const DEFAULTS = { start: '5000', monthly: '500', apy: '4', years: '5', goal: '40000' };
const MAX_MONTHS = 1200;

/* APY is an effective annual yield, so the monthly rate is (1+APY)^(1/12) - 1. Deposits land at month end. */
const monthlyRate = (apy) => Math.pow(1 + apy / 100, 1 / 12) - 1;
function balanceAt(start, deposit, apy, n) {
  const i = monthlyRate(apy);
  if (i <= 1e-12) return start + deposit * n;
  const g = Math.pow(1 + i, n);
  return start * g + deposit * ((g - 1) / i);
}

function compute(f) {
  const start = Math.max(0, toNum(f.start, 0));
  const monthly = Math.max(0, toNum(f.monthly, 0));
  const apy = clamp(toNum(f.apy, 0), 0, 100);
  const years = clamp(toNum(f.years, 0), 0, 100);
  const goal = Math.max(0, toNum(f.goal, 0));
  const months = Math.round(years * 12);

  const finalBalance = balanceAt(start, monthly, apy, months);
  const deposits = start + monthly * months;
  const growth = Math.max(0, finalBalance - deposits);

  let monthsToGoal = null; // null = not within 100 years
  if (start >= goal) monthsToGoal = 0;
  else if (monthly > 0 || apy > 0) {
    for (let n = 1; n <= MAX_MONTHS; n++) {
      if (balanceAt(start, monthly, apy, n) >= goal) { monthsToGoal = n; break; }
    }
  }

  let needed = 0;
  if (start < goal && months > 0) {
    const i = monthlyRate(apy);
    if (i <= 1e-12) needed = (goal - start) / months;
    else {
      const g = Math.pow(1 + i, months);
      needed = Math.max(0, ((goal - start * g) * i) / (g - 1));
    }
  }
  const needNow = start < goal && months === 0;

  const rows = [];
  for (let y = 1; y <= Math.min(10, Math.ceil(months / 12)); y++) {
    rows.push([`Year ${y}`, usd0.format(balanceAt(start, monthly, apy, Math.min(y * 12, months)))]);
  }

  const scen = (label, d, a) => ({
    label,
    sub: `${usd0.format(d)}/mo · ${a.toFixed(1)}% APY`,
    value: balanceAt(start, d, a, months),
  });
  const scenarios = [
    scen('Current inputs', monthly, apy),
    scen('+$100/month', monthly + 100, apy),
    scen('+$250/month', monthly + 250, apy),
    scen('APY 1 point lower', monthly, Math.max(0, apy - 1)),
    scen('APY 1 point higher', monthly, apy + 1),
  ];

  return { start, monthly, apy, years, goal, months, finalBalance, deposits, growth, monthsToGoal, needed, needNow, rows, scenarios };
}

export default function Calculator() {
  const [draft, setDraft] = useState(DEFAULTS);
  const [applied, setApplied] = useState(DEFAULTS);
  const set = (k) => (v) => setDraft((d) => ({ ...d, [k]: v }));
  const r = useMemo(() => compute(applied), [applied]);

  const yrsText = `${Number.isInteger(r.years) ? r.years : r.years.toFixed(1)} year${r.years === 1 ? '' : 's'}`;
  const timeToGoal = r.goal <= 0 || r.monthsToGoal === 0
    ? 'Reached'
    : r.monthsToGoal === null ? '100+ yrs' : fmtYM(r.monthsToGoal);
  const progress = r.goal > 0 ? `${Math.round((r.finalBalance / r.goal) * 100)}%` : '100%';
  const neededText = r.needNow ? usd0.format(r.goal - r.start) : `${usd2.format(r.needed)}/mo`;

  return (
    <>
      <InputCard tag="Growth + goal timeline" submitLabel="Calculate my savings path" onSubmit={() => setApplied({ ...draft })}>
        <Fields cols={3}>
          <NumField label="Starting savings" prefix="$" value={draft.start} onChange={set('start')} />
          <NumField label="Monthly deposit" prefix="$" value={draft.monthly} onChange={set('monthly')} />
          <NumField label="APY / annual return assumption" suffix="%" value={draft.apy} onChange={set('apy')} />
          <NumField label="Time horizon (years)" value={draft.years} onChange={set('years')} />
          <NumField label="Savings goal" prefix="$" value={draft.goal} onChange={set('goal')} />
        </Fields>
      </InputCard>

      <ResultHero
        label="Projected balance"
        value={usd0.format(r.finalBalance)}
        text={`At ${usd0.format(r.monthly)} per month and an entered ${r.apy.toFixed(1)}% APY, your illustration reaches ${usd0.format(r.finalBalance)} after ${yrsText}.`}
      />

      <Tiles items={[
        { label: 'Your deposits', value: usd0.format(r.deposits) },
        { label: 'Illustrative growth', value: usd0.format(r.growth) },
        { label: 'Time to goal', value: timeToGoal },
      ]} />

      <DetailCard
        title="Goal math"
        rows={[
          {
            title: 'Monthly amount needed for this goal',
            sub: `To target ${usd0.format(r.goal)} in ${yrsText} under the ${r.apy.toFixed(1)}% APY assumption.`,
            value: neededText,
          },
          { title: 'Progress after your selected horizon', sub: 'Projected balance ÷ entered goal', value: progress },
        ]}
      />

      <UnlockGate
        title="Unlock your scenario X-Ray"
        sub="Compare higher monthly saving and different APY assumptions, plus see milestone balances."
        buttonLabel="Unlock analysis"
      >
        <div className={lightStyles.cols2}>
          <DetailCard
            title="Scenario comparison"
            rows={r.scenarios.map((s) => ({ title: s.label, sub: s.sub, value: usd0.format(s.value) }))}
          />
          <Panel title="Balance milestones">
            <DataTable columns={['Year', 'Projected balance']} rows={r.rows.length ? r.rows : [['-', usd0.format(r.finalBalance)]]} />
          </Panel>
        </div>
      </UnlockGate>

      <CtaBand
        title="You calculated this manually once."
        body="WealthNX can bring savings goals into the same picture as cash flow, net worth and other accounts, with manual entry or optional account connections."
        label="Explore WealthNX"
      />
      <Disclaimer>Educational illustration only. Assumptions are user-entered and results are not predictions or financial, tax, legal or investment advice.</Disclaimer>
    </>
  );
}
