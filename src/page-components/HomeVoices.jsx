import React from 'react';
import HvScroller from './HvScroller';

/* "What Early Users Are Saying" + "Who This Platform Is Built For" home sections (hv- styles in HomeVoices.css).
   Static Server Component. Both rows bleed off the left / right edges of the panel exactly as in the Figma frame;
   cut-off words stay cut off (text lines are nowrap and clipped by the panel edge). */

const Star = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m12 1.6 3.2 6.6 7.2 1-5.2 5.1 1.3 7.2L12 18.1 5.5 21.500l1.3-7.200L1.6 9.200l7.2-1Z" fill="currentColor" />
  </svg>
);

const Person = () => (
  <svg viewBox="0 0 12 12" aria-hidden="true">
    <circle cx="6" cy="3.3" r="2.5" fill="currentColor" />
    <path d="M1.4 11.300c0-2.8 1.9-4.3 4.6-4.300s4.6 1.5 4.6 4.300Z" fill="currentColor" />
  </svg>
);

/* Verbatim lines from the design (typos kept). Lines marked cut are clipped by the right edge of the frame. */
const voices = [
  {
    key: 'luis', tone: 'green', portrait: 'home-voices-portrait-1.webp', video: 'home-voices-3.webm', name: 'Luis Camacho',
    title: ['Helpful AI Guidance'],
    quote: [
      'I’ve been using WealthNx for a few months now and it',
      'really helps me navigate through my finances. The AI',
      'features help me make smarter financial decisions on',
      'a daily basis. Within less then a minute it found my',
      'money leaks and helped me save $2,000 in',
      'subscriptions I didn’t know about. I use it to analyze',
      'my portfolio risks, very easy to use and has become',
      'my go to for financial life.',
    ],
  },
  {
    key: 'maurit', tone: 'pink', portrait: 'home-voices-portrait-2.webp', video: 'home-voices-2.webm', name: 'Maurit23',
    title: ['Simple Financial Control'],
    quote: [
      'This app has allowed me to get a better',
      'understanding and control over my finances.',
      'It’s easy to use and understand and the user',
      'friendly aspect of it is something that can',
      'enable people of all age groups to understand',
      'it.',
    ],
  },
  {
    key: 'omertar', tone: 'yellow', portrait: 'home-voices-portrait-3.webp', video: 'home-voices-1.webm', name: 'Omertar',
    title: ['Clear Financial Confidence'],
    quote: [
      'I have been using Wealthnx for some time',
      'now. It connects all my data and provides',
      'me the analytics and intelligence to take',
      'smarter financial understanding across my',
      'financial life. I no longer feel financial',
      'stressed.',
    ],
  },
];

const audience = [
  { key: 'p1', kind: 'photo', img: 'home-aud-1.webp' },
  { key: 't1', kind: 'text', tone: 'everyday', href: '/features/budgeting/', title: 'Everyday Savers', body: ['Understand your spending, cash','flow and savings goals.'] },
  { key: 'p2', kind: 'photo', img: 'home-aud-2.webp' },
  { key: 't2', kind: 'text', tone: 'active', href: '/features/net-worth/', title: 'Active investors', body: ['See your investments and net','worth together.'] },
  { key: 'p3', kind: 'photo', img: 'home-aud-3.webp' },
  { key: 't3', kind: 'text', tone: 'couples', href: '/features/members/', title: 'Couples and families', body: ['Understand your household','financial picture.'] },
  { key: 'p4', kind: 'photo', img: 'home-aud-4.webp' },
  { key: 't4', kind: 'text', tone: 'retire', href: '/features/financial-forecasting/', title: 'Retirement Planners', body: ['See where you stand and plan','for your financial future.'] },
  { key: 'p5', kind: 'photo', img: 'home-aud-5.webp' },
  { key: 't5', kind: 'text', tone: 'crypto', href: '/features/crypto/', title: 'Crypto Investors', body: ['Track your crypto holdings and','explore market trends.'] },
  { key: 'p6', kind: 'photo', img: 'home-aud-6.webp' },
  { key: 't6', kind: 'text', tone: 'first', href: '/features/goals/', title: 'First-Time Savers', body: ['Build savings habits and track','your progress.'] },
  { key: 'p7', kind: 'photo', img: 'home-aud-7.webp' },
  { key: 't7', kind: 'text', tone: 'founders', href: '/features/business-expense-tracking/', title: 'Founders', body: ['Stay on top of your business','expenses and cash flow.'] },
  { key: 'p8', kind: 'photo', img: 'home-aud-8.webp' },
  { key: 't8', kind: 'text', tone: 'solo', href: '/features/cash-flow/', title: 'Solopreneurs', body: ['Track your income, expenses and','financial progress.'] },
];

const Lines = ({ lines }) => lines.map((l) => <span className="hv-ln" key={l}>{l}</span>);

export default function HomeVoices() {
  return (
    <div className="hv">
      <div className="hv-bg" aria-hidden="true" />
      <div className="hv-inner">
        <div className="hv-stage">
          <section className="hv-sec" aria-labelledby="hv-say-title">
            <h2 id="hv-say-title" className="hv-title hv-title--say" data-reveal>What Early Users Are Loving About WealthNX</h2>
            <p className="hv-lead">Early users use WealthNX to understand their money, portfolio and markets more clearly.</p>
            <HvScroller className="hv-scroll--voices" start={64} label="Early user reviews">
              {voices.map((v) => (
                <figure key={v.key} className={`hv-vc hv-vc--${v.key}`}>
                  <div className={`hv-vc__tile hv-vc__tile--${v.tone}`}>
                    <video data-lazy-video loop muted playsInline preload="none" disablePictureInPicture aria-hidden="true" poster={`/assets/${v.portrait}`}><source src={`/assets/${v.video}`} type="video/webm" /></video>
                  </div>
                  <div className="hv-vc__body">
                    <div className="hv-vc__stars" aria-label="5 out of 5 stars">
                      <Star /><Star /><Star /><Star /><Star />
                    </div>
                    <h3 className="hv-vc__title"><Lines lines={v.title} /></h3>
                    <blockquote className="hv-vc__quote"><Lines lines={v.quote} /></blockquote>
                    <figcaption className="hv-vc__who">
                      <span className="hv-vc__avatar"><Person /></span>
                      <span className="hv-vc__name">{v.name}</span>
                    </figcaption>
                  </div>
                </figure>
              ))}
            </HvScroller>
          </section>

          <section className="hv-sec" aria-labelledby="hv-aud-title">
            <h2 id="hv-aud-title" className="hv-title hv-title--aud" data-reveal>Who this platform is built for</h2>
            <HvScroller className="hv-scroll--aud" start={57.4} nav label="Who this platform is built for">
              {audience.map((c, i) => (
                c.kind === 'photo' ? (
                  <div key={c.key} className={`hv-ac hv-ac--photo hv-ac--${i + 1}`}>
                    <img src={`/assets/${c.img}`} alt="" loading="lazy" decoding="async" />
                  </div>
                ) : (
                  <article key={c.key} className={`hv-ac hv-ac--text hv-ac--${c.tone} hv-ac--${i + 1}${c.title.length > 22 ? ' hv-ac--long' : ''}`}>
                    <h3 className="hv-ac__title">{c.title}</h3>
                    <p className="hv-ac__copy"><Lines lines={c.body} /></p>
                    <a className="hv-ac__more" href={c.href}>Learn More →</a>
                  </article>
                )
              ))}
            </HvScroller>
          </section>
        </div>
      </div>
    </div>
  );
}
