'use client';

import { useMemo, useState } from 'react';
import {
  InputCard, Fields, NumField, ResultHero, Tiles, DetailCard, Panel, DataTable,
  UnlockGate, CtaBand, Disclaimer, lightStyles, usd0, num0, toNum, clamp,
} from '../_shared/lightParts';

const DEFAULTS = { age: '35', spend: '60000', assets: '250000', invest: '30000', ret: '5', wr: '4' };
const MAX_YEARS = 80;

function normalize(d) {
  return {
    age: clamp(toNum(d.age, 35), 0, 120),
    spend: Math.max(0, toNum(d.spend, 0)),
    assets: Math.max(0, toNum(d.assets, 0)),
    invest: Math.max(0, toNum(d.invest, 0)),
    ret: clamp(toNum(d.ret, 0), -20, 30) / 100,
    wr: clamp(toNum(d.wr, 4), 0.1, 100) / 100,
  };
}

/* Annual steps; returns whole years to target (null if not reached within cap). */
function yearsTo(target, assets, invest, ret) {
  if (assets >= target) return 0;
  let b = assets;
  for (let n = 1; n <= MAX_YEARS; n++) {
    b = b * (1 + ret) + invest;
    if (b >= target) return n;
  }
  return null;
}

const yrs = (n) => (n === null ? `${MAX_YEARS}+ yrs` : n === 0 ? 'Reached' : `${n} yr${n === 1 ? '' : 's'}`);
const pct1 = (x) => `${(x * 100).toFixed(1)}%`;

export default function Calculator() {
  const [draft, setDraft] = useState(DEFAULTS);
  const [applied, setApplied] = useState(DEFAULTS);
  const set = (k) => (v) => setDraft((d) => ({ ...d, [k]: v }));

  const r = useMemo(() => {
    const p = normalize(applied);
    const target = p.spend / p.wr;
    const progress = target > 0 ? (p.assets / target) * 100 : 100;
    const years = yearsTo(target, p.assets, p.invest, p.ret);

    const sens = (label, spend, invest, ret) => {
      const t = spend / p.wr;
      return {
        title: label,
        sub: `${usd0.format(invest)}/yr invested · ${pct1(ret)} real return · ${usd0.format(spend)} spending`,
        value: yrs(yearsTo(t, p.assets, invest, ret)),
      };
    };
    const sensitivity = [
      sens('Current inputs', p.spend, p.invest, p.ret),
      sens('Invest $500 more / month', p.spend, p.invest + 6000, p.ret),
      sens('Spend 10% less', p.spend * 0.9, p.invest, p.ret),
      sens('Real return 2 points lower', p.spend, p.invest, p.ret - 0.02),
      sens('Real return 2 points higher', p.spend, p.invest, p.ret + 0.02),
    ];

    const horizon = years === null ? MAX_YEARS : years;
    const marks = [1, 2, 3, 4, 5, 10, 15].filter((y) => y < horizon);
    if (horizon > 0) marks.push(horizon);
    const rows = [];
    let b = p.assets;
    for (let n = 1; n <= horizon; n++) {
      b = b * (1 + p.ret) + p.invest;
      if (marks.includes(n)) {
        rows.push([String(n), num0.format(Math.round(p.age + n)), Number.isFinite(b) ? usd0.format(b) : '—']);
      }
    }
    return { p, target, progress, years, sensitivity, rows };
  }, [applied]);

  const { p, target, progress, years } = r;

  return (
    <>
      <InputCard
        tag="Financial independence timeline"
        submitLabel="Calculate my FIRE path"
        onSubmit={() => setApplied(draft)}
        note="This is a deterministic illustration. Real returns vary, and a withdrawal-rate assumption is not a guarantee that assets will last."
      >
        <Fields cols={3}>
          <NumField label="Current age" value={draft.age} onChange={set('age')} />
          <NumField label="Annual spending" prefix="$" value={draft.spend} onChange={set('spend')} />
          <NumField label="Current invested assets" prefix="$" value={draft.assets} onChange={set('assets')} />
          <NumField label="Annual new investing" prefix="$" value={draft.invest} onChange={set('invest')} />
          <NumField label="Expected real annual return" suffix="%" value={draft.ret} onChange={set('ret')} />
          <NumField label="Illustrative withdrawal rate" suffix="%" value={draft.wr} onChange={set('wr')} />
        </Fields>
      </InputCard>

      <ResultHero
        label="Illustrative FIRE number"
        value={usd0.format(target)}
        text={`At ${usd0.format(p.spend)} of annual spending and a ${(p.wr * 100).toFixed(1)}% withdrawal-rate assumption, the target is ${usd0.format(target)}.`}
      />

      <Tiles
        items={[
          { label: 'Current progress', value: `${Math.round(clamp(progress, 0, 999))}%` },
          { label: 'Illustrative time to target', value: yrs(years) },
          { label: 'Illustrative age', value: years === null ? '—' : num0.format(Math.round(p.age + years)) },
        ]}
      />

      <DetailCard
        title="What changes the target?"
        rows={[
          { title: 'Spend 10% less', sub: 'Same withdrawal-rate assumption', value: usd0.format((p.spend * 0.9) / p.wr) },
          { title: 'Spend 10% more', sub: 'Same withdrawal-rate assumption', value: usd0.format((p.spend * 1.1) / p.wr) },
        ]}
      />

      <UnlockGate
        title="Unlock the FIRE sensitivity X-Ray"
        sub="See how different return assumptions, spending levels and contribution amounts change the timeline."
        buttonLabel="Unlock analysis"
      >
        <div className={lightStyles.cols2}>
          <DetailCard title="Timeline sensitivity" rows={r.sensitivity} />
          <Panel title="Illustrative milestones">
            <DataTable columns={['Year', 'Age', 'Projected invested assets']} rows={r.rows} />
          </Panel>
        </div>
      </UnlockGate>

      <CtaBand
        title="A FIRE calculator sees one goal. WealthNX sees the surrounding picture."
        body="Bring the target together with your actual cash flow, retirement accounts, brokerage assets, debt and net worth instead of rebuilding the plan manually each time."
        label="Explore WealthNX"
      />

      <Disclaimer>
        Educational illustration only. Assumptions are user-entered and results are not predictions or financial, tax, legal or investment advice.
      </Disclaimer>
    </>
  );
}
