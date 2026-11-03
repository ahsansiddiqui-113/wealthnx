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
      'me with the analytics and intelligence to',
      'make smarter financial decisions',
      'throughout my financial life. I no longer',
      'feel financially stressed.',
    ],
  },
];

const audience = [
  { key: 'everyday', title: 'Everyday Savers', body: 'Understand your spending, cash flow and savings goals.' },
  { key: 'active', title: 'Active investors', body: 'See your investments and net worth together.' },
  { key: 'couples', title: 'Couples and families', body: "Understand your household's financial picture." },
  { key: 'retire', title: 'Retirement Planners', body: 'See where you stand and plan for your financial future.' },
  { key: 'crypto', title: 'Crypto Investors', body: 'Track your crypto holdings and explore market trends.' },
  { key: 'first', title: 'First-Time Savers', body: 'Build savings habits and track your progress.' },
  { key: 'founders', title: 'Founders', body: 'Stay on top of your personal & business expenses and cash flow.' },
  { key: 'solo', title: 'Solopreneurs', body: 'Track your income, expenses and financial progress.' },
];

const Lines = ({ lines }) => lines.map((l) => <span className="hv-ln" key={l}>{l}</span>);

export default function HomeVoices({ sayOnly = false }) {
  return (
    <div className={`hv${sayOnly ? ' hv--say-only' : ''}`}>
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
                    <div className="hv-vc__stars" role="img" aria-label="5 out of 5 stars">
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

          {!sayOnly && <section className="hv-sec" aria-labelledby="hv-aud-title">
            <h2 id="hv-aud-title" className="hv-title hv-title--aud" data-reveal>Who this platform<br className="hv-br" /> is built for</h2>
            <HvScroller className="hv-scroll--aud" start={57.4} nav label="Who this platform is built for">
              {audience.map((c) => (
                <article key={c.key} className={`hv-ac hv-ac--img hv-ac--${c.key}`}>
                  <img className="hv-ac__bg" src={`/assets/home-aud-img-${c.key}.webp`} alt="" width={760} height={921} loading="lazy" decoding="async" />
                  <div className="hv-ac__glass">
                    <h3 className="hv-ac__title">{c.title}</h3>
                    <p className="hv-ac__copy">{c.body}</p>
                  </div>
                </article>
              ))}
            </HvScroller>
          </section>}
        </div>
      </div>
    </div>
  );
}
