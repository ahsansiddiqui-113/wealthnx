import "./HowItWorksSections.css";

const stroke = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const icons = {
  link: (
    <svg {...stroke}>
      <path d="M21 27a7 7 0 0 0 10 0l6-6a7 7 0 0 0-10-10l-2 2" />
      <path d="M27 21a7 7 0 0 0-10 0l-6 6a7 7 0 0 0 10 10l2-2" />
      <path d="M30 36l4 4 8-9" />
    </svg>
  ),
  eye: (
    <svg {...stroke}>
      <path d="M4 24s7.5-13 20-13 20 13 20 13-7.5 13-20 13S4 24 4 24z" />
      <circle cx="24" cy="24" r="6" />
    </svg>
  ),
  cash: (
    <svg {...stroke}>
      <rect x="4" y="12" width="40" height="24" rx="3" />
      <circle cx="24" cy="24" r="5" />
      <path d="M10 18v.01M38 30v.01" />
      <path d="M6 42L42 6" />
    </svg>
  ),
  shield: (
    <svg {...stroke}>
      <path d="M24 5l16 6v11c0 10-6.5 17-16 21C14.5 39 8 32 8 22V11l16-6z" />
      <circle cx="24" cy="21" r="4" />
      <path d="M24 25v8" />
    </svg>
  ),
};

const cards = [
  ["link", "You choose what connects", "You sign in to your bank, brokerage or crypto account through Plaid and pick the accounts to link"],
  ["eye", "Read-only means view only", "Your balances and transactions appear in your WealthNX view. The connection cannot change anything in the account"],
  ["cash", "No money moves", "The connection cannot move or withdraw money, make payments or place trades"],
  ["shield", "Your login stays out of WealthNX", "WealthNX does not store your connected-account login credentials on its servers."],
];

export default function HowItWorksPlaid() {
  return (
    <section className="hiws-plaid" aria-labelledby="hiws-plaid-h">
      <div className="hiws-plaid__glow" aria-hidden="true" />
      <div className="hiws-plaid__inner">
        <div className="hiws-plaid__text">
          <h2 id="hiws-plaid-h">
            What Plaid Read-Only
            <br />
            Access Means
          </h2>
          <h3>Your data is protected</h3>
          <p>
            Data is encrypted in transit and at rest, and WealthNX is{" "}
            <span>ISO 27001 certified.</span>
          </p>
        </div>
        <div className="hiws-plaid__cards">
          {[[0, 2], [1, 3]].map((col, ci) => (
            <div key={ci} className="hiws-plaid__col">
              {col.map((n) => {
                const [ic, t, d] = cards[n];
                return (
                  <article key={t} className="hiws-plaid__card">
                    <span className="hiws-plaid__icon">{icons[ic]}</span>
                    <h4>{t}</h4>
                    <p>{d}</p>
                  </article>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
