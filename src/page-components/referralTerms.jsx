import './app.css';
import ScrollToTop from '@/app/components/ScrollToTop';

const LINK = { color: '#2EADA5', textDecoration: 'none' };

const H2 = {
  color: '#ffffffff',
  fontSize: '24px',
  marginTop: '40px',
  marginBottom: '16px',
  fontWeight: '600',
};

const H3 = {
  color: '#ffffffff',
  fontSize: '20px',
  marginTop: '30px',
  marginBottom: '12px',
  fontWeight: '600',
};

const H4 = {
  color: '#ffffffff',
  fontSize: '17px',
  marginTop: '22px',
  marginBottom: '10px',
  fontWeight: '600',
};

const P = {
  lineHeight: '1.8',
  fontSize: '14px',
  marginBottom: '14px',
  color: '#d4d4d4',
};

const P_LAST = { ...P, marginBottom: '30px' };

const UL = {
  paddingLeft: '20px',
  marginTop: '10px',
  marginBottom: '14px',
};

const UL_LAST = { ...UL, marginBottom: '30px' };

const LI = { marginBottom: '8px', color: '#d4d4d4', lineHeight: '1.8', fontSize: '14px' };

const ReferralTerms = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative'
    }}>
      <style>{`
        .privacy-title {
          display: block;
        }

        @media (max-width: 768px) {
          .privacy-title {
            display: none !important;
          }
          .privacy-main {
            padding: 40px 16px 30px !important;
          }
          .privacy-h2 {
            font-size: 20px !important;
            margin-top: 32px !important;
            margin-bottom: 12px !important;
          }
          .privacy-h3 {
            font-size: 18px !important;
            margin-top: 24px !important;
            margin-bottom: 10px !important;
          }
          .privacy-h4 {
            font-size: 15px !important;
            margin-top: 18px !important;
          }
          .privacy-text {
            font-size: 13px !important;
            line-height: 1.7 !important;
          }
          .privacy-intro {
            font-size: 14px !important;
          }
          .privacy-notice {
            padding: 14px 16px !important;
            font-size: 13px !important;
          }
          .privacy-ul, .privacy-ol {
            padding-left: 18px !important;
            font-size: 13px !important;
          }
          .privacy-contact-box {
            padding: 14px 16px !important;
            font-size: 13px !important;
          }
          .privacy-footer {
            padding: 20px 16px !important;
            font-size: 12px !important;
          }
          .privacy-effective {
            font-size: 12px !important;
          }
        }

        @media (max-width: 480px) {
          .privacy-main {
            padding: 30px 14px 25px !important;
          }
          .privacy-h2 {
            font-size: 18px !important;
            margin-top: 28px !important;
          }
          .privacy-h3 {
            font-size: 16px !important;
            margin-top: 20px !important;
          }
          .privacy-text {
            font-size: 12px !important;
            line-height: 1.6 !important;
          }
          .privacy-intro {
            font-size: 13px !important;
          }
          .privacy-notice {
            font-size: 12px !important;
          }
          .privacy-ul, .privacy-ol {
            font-size: 12px !important;
          }
        }
      `}</style>

      <ScrollToTop />

      <main className="privacy-main" style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px 40px' }}>
        <h1 className="privacy-title" style={{ color: '#ffffff', fontSize: '36px', fontWeight: '700', marginBottom: '12px', textAlign: 'center' }}>
          WealthNX Share &amp; Earn Referral Program Terms
        </h1>
        <p className="privacy-title privacy-effective" style={{ textAlign: 'center', color: '#8a8a8a', fontSize: '13px', marginBottom: '40px' }}>
          Effective Date: 1st November 2026
        </p>

        <p className="privacy-text" style={P}>These Share &amp; Earn Referral Program Terms (“Referral Terms”) govern participation in the WealthNX Share &amp; Earn Referral Program (the “Program”), offered by Inexor Inc. (“WealthNX,” “we,” “us,” or “our”).</p>
        <p className="privacy-text" style={P}>By enrolling in or participating in the Program, you agree to be bound by these Referral Terms, together with the WealthNX Terms &amp; Conditions and Privacy Policy.</p>
        <h2 className="privacy-h2" style={H2}>1. Program Overview</h2>
        <p className="privacy-text" style={P}>The WealthNX Share &amp; Earn Referral Program (the “Program”) allows eligible WealthNX users to earn rewards by referring new users who purchase a qualifying WealthNX subscription through a valid referral link.</p>
        <p className="privacy-text" style={P}>Eligible referrers may receive a reward of USD $30 for each successful referral, subject to the eligibility requirements, qualifying conditions, and annual reward limit set out in these Referral Terms.</p>
        <p className="privacy-text" style={P}>Participation in the Program is voluntary. Sharing a referral link or receiving clicks does not, by itself, qualify a referrer for a reward.</p>
        <h2 className="privacy-h2" style={H2}>2. Eligibility</h2>
        <p className="privacy-text" style={P}>To participate in the Program, you must:</p>
        <ul className="privacy-ul" style={UL}>
          <li style={LI}>Be at least eighteen (18) years of age;</li>
          <li style={LI}>Have an active, paid WealthNX subscription and maintain it throughout your participation in the Program;</li>
          <li style={LI}>Maintain a WealthNX account in good standing;</li>
          <li style={LI}>Comply with these Referral Terms and all applicable laws and regulations; and</li>
          <li style={LI}>Provide accurate and complete information reasonably requested by WealthNX to verify eligibility and facilitate reward payments.</li>
        </ul>
        <p className="privacy-text" style={P}>WealthNX reserves the right to restrict or prohibit participation in jurisdictions where the Program is prohibited by law or cannot reasonably be administered in compliance with applicable legal requirements.</p>
        <p className="privacy-text" style={P}>WealthNX may exclude employees, contractors, affiliates, or other persons associated with WealthNX from participating in the Program to prevent conflicts of interest, misuse, or abuse.</p>
        <h2 className="privacy-h2" style={H2}>3. Qualifying Referrals</h2>
        <p className="privacy-text" style={P}>A referral qualifies for a reward only when all of the following conditions are satisfied:</p>
        <ul className="privacy-ul" style={UL}>
          <li style={LI}>The referred person is a new WealthNX user who has not previously registered for a WealthNX account;</li>
          <li style={LI}>The referred person accesses WealthNX through the referrer's valid referral link;</li>
          <li style={LI}>The referred person registers and purchases a qualifying monthly or annual paid subscription within thirty (30) days of the first referral-link click;</li>
          <li style={LI}>WealthNX successfully receives payment for the qualifying subscription;</li>
          <li style={LI}>The subscription remains active for the initial thirty (30) days and is not cancelled, refunded, reversed, charged back, or otherwise invalidated during that period; and</li>
          <li style={LI}>The referral successfully passes WealthNX's eligibility, attribution, verification, and fraud-prevention checks.</li>
        </ul>
        <p className="privacy-text" style={P}>Free registrations, free trials that do not result in a qualifying paid subscription, previously registered users, duplicate accounts, and self-referrals are not eligible for rewards.</p>
        <p className="privacy-text" style={P}>Each qualifying referral is eligible for one reward only, regardless of the subscription plan selected. Subscription renewals, recurring payments, and subsequent purchases do not generate additional referral rewards under the Program.</p>
        <h2 className="privacy-h2" style={H2}>4. Referral Tracking and Attribution</h2>
        <p className="privacy-text" style={P}>Referral activity will be tracked through unique referral links and associated tracking information.</p>
        <p className="privacy-text" style={P}>The referral attribution window is thirty (30) days, beginning on the date of the referred person's first qualifying click on a valid referral link.</p>
        <p className="privacy-text" style={P}>To qualify for a reward, the referred person must complete registration and purchase a qualifying paid subscription within this thirty (30) day period.</p>
        <p className="privacy-text" style={P}>Referrals that cannot be reliably attributed to a valid referral link may be deemed ineligible for rewards.</p>
        <p className="privacy-text" style={P}>WealthNX's referral tracking records will be used to determine attribution and eligibility, subject to review and correction of verified errors.</p>
        <h2 className="privacy-h2" style={H2}>5. Rewards and Annual Limit</h2>
        <p className="privacy-text" style={P}>Eligible referrers will receive USD $30 for each successful referral, subject to the conditions set out in these Referral Terms.</p>
        <p className="privacy-text" style={P}>The maximum total reward payable to any referrer is USD $480 per calendar year, regardless of the number of successful referrals generated.</p>
        <p className="privacy-text" style={P}>Once a referrer reaches the annual reward limit, additional referrals will not generate further rewards during that calendar year.</p>
        <p className="privacy-text" style={P}>Unused reward capacity does not carry forward to subsequent calendar years.</p>
        <p className="privacy-text" style={P}>No referrer is entitled to receive rewards exceeding the applicable annual limit.</p>
        <h2 className="privacy-h2" style={H2}>6. Reward Verification and Payment</h2>
        <p className="privacy-text" style={P}>Referral rewards become payable only after WealthNX has received the applicable subscription payment and verified that all Program requirements have been satisfied, including completion of the initial thirty (30) day subscription period.</p>
        <p className="privacy-text" style={P}>Once a reward has been verified and approved, WealthNX will initiate payment or reward distribution within fifteen (15) business days.</p>
        <p className="privacy-text" style={P}>Rewards may be distributed through third-party reward and payment service providers, including Tremendous, using available payment or redemption options such as gift cards, PayPal, or Venmo, subject to provider availability and requirements.</p>
        <p className="privacy-text" style={P}>Available reward methods may vary depending on the participant's location, payment-provider restrictions, and applicable law.</p>
        <p className="privacy-text" style={P}>Participants may be required to provide accurate payment, identity verification, or other information reasonably necessary to process or redeem rewards.</p>
        <p className="privacy-text" style={P}>WealthNX is not responsible for delays resulting from inaccurate payment information, incomplete verification, third-party payment processing, or circumstances beyond its reasonable control.</p>
        <p className="privacy-text" style={P}>No reward will be payable for any referral that is invalid, fraudulent, refunded, reversed, charged back, or otherwise fails to satisfy these Referral Terms.</p>
        <h2 className="privacy-h2" style={H2}>7. Taxes</h2>
        <p className="privacy-text" style={P}>Participants are responsible for determining and fulfilling any tax obligations arising from rewards received through the Program.</p>
        <p className="privacy-text" style={P}>Referral rewards may constitute taxable income, even where the total amount received falls below an applicable tax reporting threshold.</p>
        <p className="privacy-text" style={P}>WealthNX may request relevant tax information, withhold taxes where legally required, and issue applicable tax forms or documentation in accordance with applicable law.</p>
        <p className="privacy-text" style={P}>The annual reward limit of USD $480 does not exempt participants from any applicable tax obligations.</p>
        <h2 className="privacy-h2" style={H2}>8. Referral Conduct and Promotional Disclosures</h2>
        <p className="privacy-text" style={P}>Participants must promote WealthNX truthfully, responsibly, and in compliance with applicable laws.</p>
        <p className="privacy-text" style={P}>Participants must not:</p>
        <ul className="privacy-ul" style={UL}>
          <li style={LI}>Make false, misleading, or unsubstantiated statements about WealthNX, its features, pricing, subscriptions, security, or services;</li>
          <li style={LI}>Claim that WealthNX guarantees financial outcomes or provides personalized investment advice or recommendations;</li>
          <li style={LI}>Engage in spam, unsolicited mass communications, deceptive advertising, or misleading referral practices;</li>
          <li style={LI}>Impersonate WealthNX or falsely represent themselves as employees, agents, or authorized representatives of WealthNX;</li>
          <li style={LI}>Create fake or duplicate accounts, engage in self-referrals, manipulate referral tracking systems, or otherwise attempt to obtain unearned rewards; or</li>
          <li style={LI}>Violate applicable advertising, consumer protection, privacy, or other laws and regulations.</li>
        </ul>
        <p className="privacy-text" style={P}>Where participants endorse or recommend WealthNX in connection with a referral, they must clearly and conspicuously disclose any financial incentive they may receive, as required by applicable law.</p>
        <p className="privacy-text" style={P}>For example, participants may state:</p>
        <p className="privacy-text" style={{ ...P, color: '#ffffff', fontWeight: 600 }}>“I may earn a $30 reward if you subscribe through my link.”</p>
        <p className="privacy-text" style={P}>Participants are responsible for ensuring that their disclosures are clear, easily noticeable, and appropriately placed within their referral communications.</p>
        <h2 className="privacy-h2" style={H2}>9. Fraud Prevention and Disqualification</h2>
        <p className="privacy-text" style={P}>WealthNX reserves the right to review referral activity to identify suspected fraud, misuse, duplicate accounts, referral manipulation, or violations of these Referral Terms.</p>
        <p className="privacy-text" style={P}>Where reasonably supported by evidence, WealthNX may withhold rewards pending investigation, reject invalid referrals, suspend or terminate participation in the Program, or recover rewards obtained through fraud or material violations of these Referral Terms.</p>
        <p className="privacy-text" style={P}>Participants may contact WealthNX at <strong><a href="mailto:support@wealthnx.ai" style={LINK}>support@wealthnx.ai</a></strong> to request a review of any referral eligibility, disqualification, or reward payment determination.</p>
        <h2 className="privacy-h2" style={H2}>10. Program Changes, Suspension, and Termination</h2>
        <p className="privacy-text" style={P}>WealthNX may modify, suspend, or discontinue the Program for legitimate business, operational, legal, or regulatory reasons.</p>
        <p className="privacy-text" style={P}>Material changes to reward amounts, eligibility requirements, or other Program conditions will be communicated through the WealthNX app, website, or another reasonable method before taking effect.</p>
        <p className="privacy-text" style={P}>Changes will apply prospectively and will not affect rewards already earned through qualifying referrals under the Referral Terms applicable at the time, except where required by law or where the rewards are subsequently determined to be invalid or fraudulent.</p>
        <p className="privacy-text" style={P}>WealthNX may immediately suspend participation where reasonably necessary to address suspected fraud, security threats, legal requirements, or material violations of these Referral Terms.</p>
        <p className="privacy-text" style={P}>Termination or discontinuation of the Program will not eliminate WealthNX's obligation to pay valid rewards already earned, subject to verification and applicable law.</p>
        <h2 className="privacy-h2" style={H2}>11. Privacy and Data Processing</h2>
        <p className="privacy-text" style={P}>WealthNX may collect and process information relating to referral links, account registrations, subscription activity, reward eligibility, payment status, and participation in the Program.</p>
        <p className="privacy-text" style={P}>Information may be shared with authorized third-party service providers involved in referral tracking, payment processing, reward distribution, fraud prevention, and compliance with applicable legal obligations.</p>
        <p className="privacy-text" style={P}>Personal information will be collected, used, shared, and protected in accordance with the WealthNX Privacy Policy and applicable data protection and privacy laws.</p>
        <h2 className="privacy-h2" style={H2}>12. No Employment or Agency Relationship</h2>
        <p className="privacy-text" style={P}>Participation in the Program does not create an employment, partnership, joint venture, franchise, or agency relationship between a participant and WealthNX.</p>
        <p className="privacy-text" style={P}>Participants act independently and are not authorized to represent WealthNX, enter into agreements, make commitments, or assume obligations on behalf of WealthNX.</p>
        <h2 className="privacy-h2" style={H2}>13. Relationship to Other WealthNX Terms</h2>
        <p className="privacy-text" style={P}>These Referral Terms supplement the WealthNX Terms &amp; Conditions and apply specifically to participation in the Program.</p>
        <p className="privacy-text" style={P}>In the event of any conflict between these Referral Terms and the WealthNX Terms &amp; Conditions concerning the Program, these Referral Terms will prevail to the extent of that conflict.</p>
        <p className="privacy-text" style={P}>Separate influencer, affiliate, or promotional agreements entered into directly with WealthNX will govern the arrangements expressly covered by those agreements. In the event of a conflict, the applicable separate agreement will prevail with respect to those arrangements.</p>
        <h2 className="privacy-h2" style={H2}>14. Limitation of Liability</h2>
        <p className="privacy-text" style={P}>To the maximum extent permitted by applicable law, WealthNX will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to participation in the Program.</p>
        <p className="privacy-text" style={P}>Nothing in these Referral Terms excludes or limits any liability that cannot lawfully be excluded or restricted under applicable law.</p>
        <h2 className="privacy-h2" style={H2}>15. Governing Law and Disputes</h2>
        <p className="privacy-text" style={P}>These Referral Terms are governed by the governing law and applicable dispute resolution provisions set out in the WealthNX Terms &amp; Conditions, to the extent permitted by applicable law.</p>
        <h2 className="privacy-h2" style={H2}>16. Contact</h2>
        <p className="privacy-text" style={P}>For questions regarding the Program, referral eligibility, reward payments, or these Referral Terms, participants may contact WealthNX at:</p>
        <div className="privacy-contact-box" style={{ lineHeight: '1.8', fontSize: '14px', padding: '16px 20px', backgroundColor: '#1a1a1a', borderRadius: '8px', border: '1px solid #2a2a2a', marginBottom: '40px' }}>
          <p style={{ margin: '0 0 8px', color: '#ffffff', fontWeight: 600 }}>WealthNX</p>
          <p style={{ margin: 0, color: '#d4d4d4' }}>Email: <a href="mailto:support@wealthnx.ai" style={LINK}>support@wealthnx.ai</a></p>
        </div>
      </main>

      <footer className="privacy-footer" style={{ padding: '30px 20px', borderTop: '1px solid #2a2a2a', textAlign: 'center', fontSize: '13px', color: '#666' }}>
        <p style={{ margin: 0 }}>© 2026 WealthNX. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ReferralTerms;
