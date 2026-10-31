import React from 'react';

export default function BlogsPromo() {
  return (
    <section className="bl-promo" aria-labelledby="bl-promo-title">
      <div className="bl-c">
        <div className="bl-promo__card">
          <img className="bl-promo__img" src="/assets/blog-promo-phone-ribbon.webp" alt="" width="589" height="267" />
          <div className="bl-promo__copy">
            <h2 id="bl-promo-title" className="bl-promo__title">Your <em>accounts</em> hold <br />different parts of the <em>story.</em></h2>
            <p className="bl-promo__sub"><b>WealthNX AI</b> brings the available information together.</p>
            <a className="bl-btn" href="https://app.wealthnx.ai/signup">Start your 7-day free trial now</a>
          </div>
        </div>
      </div>
    </section>
  );
}
