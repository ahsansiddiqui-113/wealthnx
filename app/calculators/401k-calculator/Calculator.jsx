'use client';

import { useMemo, useState } from 'react';
import {
  InputCard, Fields, NumField, ResultHero, Tiles, DetailCard, Panel, DataTable,
  UnlockGate, CtaBand, Disclaimer, lightStyles, usd0, toNum, clamp,
} from '../_shared/lightParts';

const DEFAULTS = {
  age: '32', retire: '65', salary: '120,000', balance: '65,000',
  contrib: '8', match: '100', cap: '4', ret: '7', growth: '3',
};

/* Convention (calibrated to the design numbers): the existing balance compounds annually at the
   entered return; each year's contributions (employee + employer, based on that year's salary)
   are deposited in 12 equal monthly installments at month end, growing at the equivalent monthly
   rate (1+r)^(1/12)-1. Salary steps up by the growth rate each year. Employer match =
   min(contribution%, match cap%) x salary x match%. */
function project(p, contribPct, matchPct) {
  const mr = Math.pow(1 + p.ret, 1 / 12) - 1;
  let bal = p.balance;
  let sal = p.salary;
  const path = [];
  for (let y = 0; y < p.years; y++) {
    const emp = sal * contribPct / 100;
    const er = Math.min(contribPct, p.cap) / 100 * sal * matchPct / 100;
    const monthly = (emp + er) / 12;
    bal *= 1 + p.ret;
    for (let k = 0; k < 12; k++) bal += monthly * Math.pow(1 + mr, 11 - k);
    sal *= 1 + p.growth;
    path.push(bal);
  }
  return path;
}

function normalize(d) {
  const age = clamp(Math.round(toNum(d.age, 32)), 16, 100);
  const retire = clamp(Math.round(toNum(d.retire, 65)), age + 1, 110);
  return {
    age, retire, years: retire - age,
    salary: Math.max(0, toNum(d.salary)),
    balance: Math.max(0, toNum(d.balance)),
    contrib: clamp(toNum(d.contrib), 0, 100),
    match: clamp(toNum(d.match), 0, 100),
    cap: clamp(toNum(d.cap), 0, 100),
    ret: clamp(toNum(d.ret), -50, 50) / 100,
    growth: clamp(toNum(d.growth), -50, 50) / 100,
  };
}

const finalOf = (path, p) => (path.length ? path[path.length - 1] : p.balance);

export default function Calculator() {
  const [draft, setDraft] = useState(DEFAULTS);
  const [applied, setApplied] = useState(DEFAULTS);
  const set = (k) => (v) => setDraft((d) => ({ ...d, [k]: v }));

  const r = useMemo(() => {
    const p = normalize(applied);
    const path = project(p, p.contrib, p.match);
    const noMatch = project(p, p.contrib, 0);
    const final = finalOf(path, p);
    const empY1 = p.salary * p.contrib / 100;
    const erY1 = Math.min(p.contrib, p.cap) / 100 * p.salary * p.match / 100;
    const limit = p.age >= 50 ? 32000 : 24500;
    const scenarios = [0, 1, 3, 5].map((add) => {
      const pct = Math.min(100, p.contrib + add);
      return { pct, add, value: add === 0 ? final : finalOf(project(p, pct, p.match), p) };
    });
    const idx = new Set();
    for (let y = 1; y <= p.years; y++) if (y <= 4 || (p.age + y) % 5 === 0 || y === p.years) idx.add(y);
    const milestones = [...idx].map((y) => [String(p.age + y), usd0.format(path[y - 1])]);
    return { p, final, matchImpact: final - finalOf(noMatch, p), empY1, erY1, limit, scenarios, milestones };
  }, [applied]);

  const { p } = r;
  const below = r.empY1 < r.limit;

  return (
    <>
      <InputCard
        tag="401(k) growth + employer match"
        submitLabel="Project my 401(k)"
        onSubmit={() => setApplied(draft)}
        note="Projection assumes contributions occur monthly and your entered return/salary growth continues. Plan rules, vesting and future IRS limits may change."
      >
        <Fields cols={3}>
          <NumField label="Current age" value={draft.age} onChange={set('age')} />
          <NumField label="Target retirement age" value={draft.retire} onChange={set('retire')} />
          <NumField label="Annual salary" prefix="$" value={draft.salary} onChange={set('salary')} />
          <NumField label="Current 401(k) balance" prefix="$" value={draft.balance} onChange={set('balance')} />
          <NumField label="Your contribution (% of salary)" suffix="%" value={draft.contrib} onChange={set('contrib')} />
          <NumField label="Employer match (% of your contribution)" suffix="%" value={draft.match} onChange={set('match')} />
          <NumField label="Match applies up to (% of salary)" suffix="%" value={draft.cap} onChange={set('cap')} />
          <NumField label="Expected annual return" suffix="%" value={draft.ret} onChange={set('ret')} />
          <NumField label="Expected salary growth" suffix="%" value={draft.growth} onChange={set('growth')} />
        </Fields>
      </InputCard>

      <ResultHero
        label="Illustrative balance at retirement age"
        value={usd0.format(r.final)}
        text={`Using your entered assumptions, ${usd0.format(p.balance)} today plus ongoing contributions grows to about ${usd0.format(r.final)} by age ${p.retire}.`}
      />

      <Tiles items={[
        { label: 'Year-one employee contribution', value: usd0.format(r.empY1) },
        { label: 'Year-one employer match', value: usd0.format(r.erY1) },
        { label: 'Illustrative match impact', value: usd0.format(r.matchImpact), sub: 'Difference vs. same projection with no employer match.' },
      ]} />

      <DetailCard
        title="Current-year contribution check"
        rows={[{
          title: '2026 employee-deferral reference',
          sub: 'For orientation only; plan eligibility and limits vary by age and situation.',
          value: usd0.format(r.limit),
        }]}
        note={`Your entered year-one employee contribution is ${usd0.format(r.empY1)}, ${below ? 'below' : 'at or above'} this simplified 2026 age-based reference.`}
      />

      <UnlockGate
        title="Unlock contribution scenarios"
        sub="See the effect of increasing your contribution rate and a year-by-year milestone table."
        buttonLabel="Unlock analysis"
      >
        <div className={lightStyles.cols2}>
          <Panel title="Contribution-rate scenarios">
            <DataTable
              columns={['Scenario', 'Projected balance']}
              rows={r.scenarios.map((s) => [
                {
                  main: s.add === 0 ? 'Current rate' : `${s.pct.toFixed(1).replace(/\.0$/, '')}% contribution`,
                  sub: `${s.pct.toFixed(1)}% employee + employer match · same salary and return assumptions`,
                },
                usd0.format(s.value),
              ])}
            />
          </Panel>
          <Panel title="Milestones">
            <DataTable columns={['Age', 'Projected balance']} rows={r.milestones} />
          </Panel>
        </div>
      </UnlockGate>

      <CtaBand
        title="Your 401(k) is only one piece of retirement."
        body="WealthNX can place retirement accounts beside brokerage, cash, debt and goals so the user sees the broader financial picture instead of one plan in isolation."
        label="Explore WealthNX"
      />
      <Disclaimer>Educational illustration only. Uses user-selected assumptions. Contribution limits and eligibility depend on applicable IRS rules and individual circumstances. Not tax or investment advice.</Disclaimer>
    </>
  );
}
