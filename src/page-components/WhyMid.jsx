import React from 'react';
import './WhyMid.css';

const Panel = ({ cls, img, children }) => (
  <section className={`wp-mid-sec ${cls}`}>
    <img className="wp-mid-art" src={`/assets/${img}.webp`} alt="" loading="lazy" />
    <div className="wp-mid-txt">{children}</div>
  </section>
);

export default function WhyMid() {
  return (
    <div className="wp-mid">
      <Panel cls="wp-mid-white wp-mid-a" img="why-mid-art-a">
        <h2 data-reveal><span className="wp-mid-teal">Less Switching.</span><br />More Understanding.</h2>
        <p>A personal finance dashboard app should make the numbers easier to understand, not just collect them. Move from a balance to the transactions behind it, or from a holding to the available research.</p>
      </Panel>
      <Panel cls="wp-mid-dark wp-mid-b" img="why-mid-art-b">
        <h2 data-reveal>Ask better questions about <span className="wp-mid-teal">your money</span>.</h2>
        <p>As an ai personal finance app, WealthNX combines financial views with Wealth Genie explanations. Ask about the figures available to you, explore what changed and check the information behind an answer.</p>
      </Panel>
      <Panel cls="wp-mid-white wp-mid-c" img="why-mid-art-c">
        <h2 data-reveal><span className="wp-mid-teal">Connected</span> doesn’t mean controlled.</h2>
        <p>WealthNX uses read-only access for connected financial accounts. It cannot move money, place trades or change those accounts. Your financial data stays yours.</p>
      </Panel>
    </div>
  );
}
