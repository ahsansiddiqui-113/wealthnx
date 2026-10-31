'use client';

import { useMemo, useState } from 'react';
import {
  InputCard, Fields, NumField, ResultHero, Tiles, DetailCard, Panel, DataTable,
  UnlockGate, CtaBand, Disclaimer, lightStyles, usd0, usd2, toNum, fmtYM,
} from '../_shared/lightParts';

const DEFAULTS = { balance: '350000', rate: '6.5', years: '27', monthly: '250', once: '0', annual: '0' };
const MAX_MONTHS = 1200; // 100-year cap

/* Convention: the one-time extra is applied at month 0 (reduces the starting balance); the annual extra is
   paid together with the payment at month 12, 24, ... of each year. Each month:
   balance = balance*(1+r) - payment - monthlyExtra (final month limited to what is owed). */
function simulate(balance, ratePct, years, monthly, once, annual) {
  const n = Math.round(years * 12);
  const r = ratePct / 1200;
  const payment = n <= 0 ? 0 : r > 0 ? (balance * r) / (1 - Math.pow(1 + r, -n)) : balance / n;
  let bal = Math.max(0, balance - once);
  let interest = 0;
  let months = 0;
  const yearEnd = [];
  while (bal > 0.005 && months < MAX_MONTHS && (payment + monthly + annual > 0)) {
    const i = bal * r;
    interest += i;
    months += 1;
    let pay = payment + monthly;
    if (months % 12 === 0) pay += annual;
    bal = Math.max(0, bal + i - pay);
    if (months % 12 === 0) yearEnd.push(bal);
  }
  return { payment, months, interest, yearEnd };
}

function analyze(a) {
  const balance = Math.max(0, toNum(a.balance));
  const rate = Math.max(0, toNum(a.rate));
  const years = Math.min(100, Math.max(0, toNum(a.years)));
  const monthly = Math.max(0, toNum(a.monthly));
  const once = Math.max(0, toNum(a.once));
  const annual = Math.max(0, toNum(a.annual));
  const base = simulate(balance, rate, years, 0, 0, 0);
  const scen = simulate(balance, rate, years, monthly, once, annual);
  const baseMonths = Math.round(years * 12);
  const compare = [0, 100, 250, 500, 1000].map((e) => {
    const s = e === 0 ? base : simulate(balance, rate, years, e, 0, 0);
    return { extra: e, months: s.months, saved: Math.max(0, base.interest - s.interest) };
  });
  return {
    monthly, once, annual, baseMonths, base, scen,
    timeSaved: Math.max(0, baseMonths - scen.months),
    interestSaved: Math.max(0, base.interest - scen.interest),
    compare,
  };
}

export default function Calculator() {
  const [draft, setDraft] = useState(DEFAULTS);
  const [applied, setApplied] = useState(DEFAULTS);
  const set = (k) => (v) => setDraft((d) => ({ ...d, [k]: v }));
  const R = useMemo(() => analyze(applied), [applied]);

  const extras = [];
  if (R.monthly > 0) extras.push(`${usd0.format(R.monthly)}/mo extra`);
  if (R.once > 0) extras.push(`${usd0.format(R.once)} one-time`);
  if (R.annual > 0) extras.push(`${usd0.format(R.annual)}/yr extra`);
  const scenSub = extras.length ? extras.join(' + ') : 'No extra payments entered';

  const payoffYear = Math.ceil(R.scen.months / 12);
  const milestoneYears = [];
  [1, 2, 3, 4, 5].forEach((y) => { if (y < payoffYear) milestoneYears.push(y); });
  for (let y = 10; y < payoffYear; y += 5) milestoneYears.push(y);
  if (payoffYear > 0) milestoneYears.push(payoffYear);
  const rows = milestoneYears.map((y) => [
    `Year ${y}`,
    usd0.format(y >= payoffYear ? 0 : R.scen.yearEnd[y - 1] ?? 0),
  ]);

  return (
    <>
      <InputCard
        tag="Extra-payment scenario"
        submitLabel="Compare payoff paths"
        onSubmit={() => setApplied(draft)}
        note="Principal and interest only. Taxes, insurance, PMI, escrow changes, prepayment rules and lender-specific timing are not modeled."
      >
        <Fields cols={3}>
          <NumField label="Current mortgage balance" prefix="$" value={draft.balance} onChange={set('balance')} />
          <NumField label="Interest rate" suffix="%" value={draft.rate} onChange={set('rate')} />
          <NumField label="Years remaining" value={draft.years} onChange={set('years')} />
          <NumField label="Extra payment each month" prefix="$" value={draft.monthly} onChange={set('monthly')} />
          <NumField label="One-time extra payment now" prefix="$" value={draft.once} onChange={set('once')} />
          <NumField label="Extra payment once per year" prefix="$" value={draft.annual} onChange={set('annual')} />
        </Fields>
      </InputCard>

      <ResultHero
        label="Illustrative payoff with your extra payments"
        value={fmtYM(R.scen.months)}
        text={`Under these assumptions, the extra-payment path pays off in about ${fmtYM(R.scen.months)} versus ${fmtYM(R.baseMonths)} on the base schedule.`}
      />

      <Tiles
        items={[
          { label: 'Base principal + interest', value: `${usd2.format(R.base.payment)}/mo` },
          { label: 'Time saved', value: fmtYM(R.timeSaved) },
          { label: 'Interest saved', value: usd0.format(R.interestSaved) },
        ]}
      />

      <DetailCard
        title="Base vs. extra-payment path"
        rows={[
          { title: 'Base schedule', sub: 'No extra payments', value: `${usd0.format(R.base.interest)} interest` },
          { title: 'Your extra-payment scenario', sub: scenSub, value: `${usd0.format(R.scen.interest)} interest` },
        ]}
      />

      <UnlockGate
        title="Unlock payoff scenarios"
        sub="Compare several monthly extra payment amounts and see the declining balance by year."
        buttonLabel="Unlock analysis"
      >
        <div className={lightStyles.cols2}>
          <Panel title="Extra-payment comparison">
            <DataTable
              columns={['Scenario', 'Result']}
              rows={R.compare.map((c) => [
                { main: c.extra === 0 ? 'No monthly extra' : `${usd0.format(c.extra)}/mo extra`, sub: 'Same balance, rate and term' },
                `${fmtYM(c.months)} · ${usd0.format(c.saved)} saved`,
              ])}
            />
          </Panel>
          <Panel title="Illustrative balance milestones">
            <DataTable columns={['Year', 'Balance with entered extras']} rows={rows} />
          </Panel>
        </div>
      </UnlockGate>

      <CtaBand
        title="A mortgage affects more than a payoff date."
        body="WealthNX can help place housing debt beside cash flow, net worth and other accounts so the user sees how one liability fits into the broader picture."
        label="Explore WealthNX"
      />
      <Disclaimer>Educational illustration only. Assumptions are user-entered and results are not predictions or financial, tax, legal or investment advice.</Disclaimer>
    </>
  );
}
