import React from 'react';
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

const NOTICE = {
  padding: '16px 20px',
  backgroundColor: '#1a1a1a',
  borderRadius: '8px',
  border: '1px solid #2a2a2a',
  marginBottom: '14px',
};

const NOTICE_LAST = { ...NOTICE, marginBottom: '30px' };

const NOTICE_TITLE = { ...H3, marginTop: '0', marginBottom: '12px' };

const NOTICE_TEXT = { ...P, marginBottom: '0' };

const TermsAndConditions = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative'
    }}>
      <style>{`
        .terms-title {
          display: block;
        }

        @media (max-width: 768px) {
          .terms-title {
            display: none !important;
          }
          .terms-main {
            padding: 40px 16px 30px !important;
          }
          .terms-h2 {
            font-size: 20px !important;
            margin-top: 32px !important;
            margin-bottom: 12px !important;
          }
          .terms-h3 {
            font-size: 18px !important;
            margin-top: 24px !important;
            margin-bottom: 10px !important;
          }
          .terms-h4 {
            font-size: 15px !important;
            margin-top: 18px !important;
          }
          .terms-text {
            font-size: 13px !important;
            line-height: 1.7 !important;
          }
          .terms-intro {
            font-size: 14px !important;
          }
          .terms-notice {
            padding: 14px 16px !important;
            font-size: 13px !important;
          }
          .terms-ul, .terms-ol {
            padding-left: 18px !important;
            font-size: 13px !important;
          }
          .terms-contact-box {
            padding: 14px 16px !important;
            font-size: 13px !important;
          }
          .terms-footer {
            padding: 20px 16px !important;
            font-size: 12px !important;
          }
        }

        @media (max-width: 480px) {
          .terms-main {
            padding: 30px 14px 25px !important;
          }
          .terms-h2 {
            font-size: 18px !important;
            margin-top: 28px !important;
          }
          .terms-h3 {
            font-size: 16px !important;
            margin-top: 20px !important;
          }
          .terms-text {
            font-size: 12px !important;
            line-height: 1.6 !important;
          }
          .terms-intro {
            font-size: 13px !important;
          }
          .terms-notice {
            font-size: 12px !important;
          }
          .terms-ul, .terms-ol {
            font-size: 12px !important;
          }
        }
      `}</style>

      <ScrollToTop />

      <main className="terms-main" style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '60px 20px 40px'
      }}>
        <h1 className="terms-title" style={{
          color: '#ffffff',
          fontSize: '36px',
          fontWeight: '700',
          marginBottom: '12px',
          textAlign: 'center'
        }}>
          Terms and Conditions
        </h1>
        <p className="terms-title" style={{
          textAlign: 'center',
          color: '#8a8a8a',
          fontSize: '13px',
          marginBottom: '40px'
        }}>
          Last Updated: August 20, 2026
        </p>

        {/* ── Intro ── */}
        <div className="terms-intro" style={P}>
          <p style={{ marginBottom: '14px' }}>
            Welcome to WealthNX.ai (the "<strong>Platform</strong>"), an AI-enabled financial information, analytics, and money-management software platform made available by Inexor Inc. The Platform provides users with various tools and features (collectively, the "<strong>Services</strong>") designed to help users independently organize, view, track, analyze, and better understand financial and related information.
          </p>
          <p style={{ marginBottom: '10px' }}>
            Depending on feature availability, user eligibility, location, and applicable third-party services, the Services may allow users to:
          </p>
          <ul className="terms-ul" style={UL}>
            <li style={LI}>analyze market data and obtain informational and educational insights from publicly available and third-party data sources;</li>
            <li style={LI}>connect supported banking, brokerage, digital asset exchange, cryptocurrency wallet, and other financial accounts to view, organize, track, and analyze available balances, transactions, holdings, positions, investment performance, spending, cash flow, net worth, and other financial information;</li>
            <li style={LI}>manually enter, import, upload, organize, track, and analyze financial information, including information relating to assets, liabilities, income, expenses, investments, property, real estate, alternative assets, equity compensation, and other financial interests;</li>
            <li style={LI}>upload or import receipts, invoices, documents, images, files, and other supported materials and use available tools to organize, extract, categorize, or analyze information contained in such materials;</li>
            <li style={LI}>establish and track financial goals, budgets, spending information, and other user-defined financial preferences or information;</li>
            <li style={LI}>access informational tools relating to retirement forecasting, financial scenarios, projections, estimates, simulations, and other forward-looking financial analyses based on information, assumptions, and parameters available to or provided through the Services;</li>
            <li style={LI}>access tax-related informational tools, including tax estimates, calculations, simulations, or other tax-related functionality, where available;</li>
            <li style={LI}>access credit-related information or functionality, including credit scores, credit-score factors, credit-monitoring information, or related information obtained from authorized third-party providers, where available;</li>
            <li style={LI}>use artificial intelligence, machine learning, and automated analytical functionality, including Wealth Genie and other AI-enabled assistants, to interact with, organize, summarize, explain, or analyze information available through the Services;</li>
            <li style={LI}>interact with certain Services through supported voice-enabled functionality, where available;</li>
            <li style={LI}>use household, couples, family-sharing, or similar collaborative functionality to share or access information with other authorized users, subject to applicable permissions and feature availability;</li>
            <li style={LI}>authorize an accountant, financial adviser, or other third party to access specified information through the Services, subject to the permissions established by the user and functionality made available by WealthNX; and</li>
            <li style={LI}>use "Build Mode" or similar functionality to create custom no-code dashboards and interact with supported information, analytics, and other Platform features.</li>
          </ul>
          <p style={{ marginBottom: '14px' }}>
            The Services are provided as software tools for informational, educational, organizational, and analytical purposes. Unless expressly stated otherwise, the availability of any particular Service or feature may vary based on location, jurisdiction, user eligibility, subscription level, technical availability, applicable law, and the availability or requirements of Third-Party Providers. Not all Services or features are available to all users or in all jurisdictions.
          </p>
          <p style={{ marginBottom: '14px' }}>
            The Platform and the Services are made available to users ("<strong>you</strong>" or "<strong>your</strong>") by Inexor Inc. (including its operators and affiliates, "<strong>we</strong>," "<strong>our</strong>," or "<strong>us</strong>") subject to these Terms and Conditions (these "<strong>Terms</strong>") and the limited license granted under these Terms.
          </p>
          <p style={{ marginBottom: '14px' }}>
            By creating an account, accessing, or using the Platform or the Services, you acknowledge that you have read and understood these Terms and agree to be bound by them. If you do not agree to these Terms, you must not access or use the Platform or the Services.
          </p>
          <p style={{ marginBottom: '0' }}>
            If you access or use the Platform or the Services on behalf of another person or legal entity, you represent and warrant that you have the legal authority to act on behalf of and bind that person or entity to these Terms.
          </p>
        </div>

        {/* ═══════════ 1. Use of the Services ═══════════ */}
        <h2 className="terms-h2" style={H2}>1. Use of the Services</h2>

        <h3 className="terms-h3" style={H3}>1.1 Permitted Uses</h3>
        <p className="terms-text" style={P}>
          Subject to these Terms and the limited, non-transferable, non-sublicensable license granted to you, you may access and use the Platform, the Services, and outputs made available through the Services for your personal or internal business use and for the informational, educational, organizational, and analytical purposes described in these Terms.
        </p>
        <p className="terms-text" style={P}>
          You may use the Services to enter, upload, import, connect, organize, view, track, and analyze information that you own, control, or are otherwise authorized to provide or access, and to interact with the features made available to you. Your use of particular Services or features may be subject to eligibility requirements, subscription limitations, geographic restrictions, Third-Party Provider requirements, or other conditions disclosed through the Platform or these Terms.
        </p>
        <p className="terms-text" style={P}>
          You are responsible for your use of the Platform and the Services and for independently evaluating information and outputs provided through the Services. Your permitted use of the Services does not include obtaining or relying upon WealthNX as a provider of investment, financial, legal, tax, accounting, or other regulated professional advice or services, except to the extent expressly stated otherwise by WealthNX in separate applicable terms.
        </p>
        <p className="terms-text" style={P_LAST}>
          If you do not agree to these Terms, you must not access or use the Platform or the Services and, if applicable, must terminate or cancel your account in accordance with these Terms.
        </p>

        <h3 className="terms-h3" style={H3}>1.2 Prohibited Conduct</h3>
        <p className="terms-text" style={{ ...P, marginBottom: '10px' }}>You shall not use or engage with the Platform or the Services to:</p>
        <ol className="terms-ol" style={UL_LAST}>
          <li style={LI}>submit, upload, transmit, distribute, or otherwise make available any content or information that violates applicable law, infringes or misappropriates the rights of another person, or compromises the security, integrity, or operation of the Platform or the Services;</li>
          <li style={LI}>submit, upload, connect, import, access, or share financial, personal, confidential, proprietary, or other information that you do not own, control, or have the lawful authority or appropriate permission to provide, access, or share;</li>
          <li style={LI}>deploy bots, scrapers, crawlers, automated scripts, or other automated means to access, extract information from, or interact with the Platform or the Services except where expressly authorized by WealthNX;</li>
          <li style={LI}>reverse engineer, decompile, disassemble, attempt to derive source code from, circumvent, interfere with, or otherwise attempt to gain unauthorized access to any software, model, system, security measure, technical restriction, or other component of the Platform or the Services, except to the extent such restriction is prohibited by applicable law;</li>
          <li style={LI}>interfere with, disrupt, overload, damage, impair, test without authorization, or attempt to circumvent the security, integrity, availability, authentication, access controls, usage limitations, or other protections of the Platform or the Services;</li>
          <li style={LI}>use the Platform or the Services to impersonate another person, misrepresent your identity or authority, engage in fraud or deceptive activity, or misrepresent the nature, source, accuracy, or authorship of outputs generated through the Services;</li>
          <li style={LI}>represent or use any output generated through the Platform or the Services as professional investment, financial, legal, tax, accounting, or other regulated advice provided by WealthNX, or represent WealthNX as providing a regulated service that it does not provide;</li>
          <li style={LI}>use the Platform or the Services to execute, facilitate, or provide regulated investment, brokerage, trading, custody, money-transmission, tax, legal, or other professional or financial services in a manner not expressly authorized by WealthNX;</li>
          <li style={LI}>upload, transmit, introduce, or distribute malware, malicious code, viruses, harmful instructions, or other materials designed to interfere with, damage, obtain unauthorized access to, or compromise the Platform, the Services, another user's account, or any related systems;</li>
          <li style={LI}>use a virtual private network (VPN), false location information, or other means for the purpose of circumventing geographic, jurisdictional, eligibility, sanctions-related, or feature-specific restrictions imposed by WealthNX or an authorized Third-Party Provider;</li>
          <li style={LI}>attempt to access or use Services or features that are not available or authorized for your account, location, jurisdiction, subscription, or eligibility status;</li>
          <li style={LI}>use the Platform, the Services, or any information or output obtained through them in violation of applicable law, regulation, sanctions requirement, third-party right, contractual obligation, or these Terms; or</li>
          <li style={LI}>assist, encourage, permit, or enable another person to engage in any conduct prohibited by this Section.</li>
        </ol>

        <h3 className="terms-h3" style={H3}>1.3 Third-Party Interactions</h3>
        <p className="terms-text" style={P}>
          If you choose to connect, access, or use any third-party financial institution, account, platform, application, data provider, or other third-party service in connection with the Platform or the Services (collectively, "<strong>Third-Party Services</strong>"), including banks, brokerages, digital asset exchanges, cryptocurrency wallets, credit-related providers, account connectivity providers, or other financial services, you authorize the exchange of information with the applicable Third-Party Service to the extent necessary to establish, maintain, and support the connection and provide the Services you request.
        </p>
        <p className="terms-text" style={P}>
          Your use of any Third-Party Service is subject to the applicable third party's own terms, privacy policies, permissions, eligibility requirements, and other conditions. You are responsible for reviewing and complying with those requirements and for ensuring that you are authorized to connect or provide information from the applicable Third-Party Service.
        </p>
        <p className="terms-text" style={P}>
          We do not own or control Third-Party Services and do not guarantee their availability, security, functionality, accuracy, completeness, or continued compatibility with the Platform or the Services. Third-Party Services may modify or discontinue their services, APIs, data access, functionality, policies, or terms at any time, which may affect the availability or functionality of certain WealthNX Services.
        </p>
        <p className="terms-text" style={P}>
          Information obtained from Third-Party Services, including balances, transactions, holdings, positions, market information, credit-related information, and other financial data, may be incomplete, delayed, unavailable, inaccurate, or outdated. You should independently verify information with the applicable Third-Party Service where appropriate.
        </p>
        <p className="terms-text" style={P_LAST}>
          To the extent permitted by applicable law, WealthNX is not responsible for acts or omissions of Third-Party Services or for interruptions, limitations, inaccuracies, changes, or failures attributable to such Third-Party Services. WealthNX's collection, use, disclosure, and processing of information received through Third-Party Services will be governed by the WealthNX Privacy Policy and applicable law.
        </p>

        <h3 className="terms-h3" style={H3}>1.4 Sanctions Compliance</h3>
        <p className="terms-text" style={P}>
          You may access and use the Platform and the Services only in compliance with applicable economic and trade sanctions, export controls, and similar restrictions administered or enforced by the United States government, including by the U.S. Department of the Treasury's Office of Foreign Assets Control ("<strong>OFAC</strong>"), and any other sanctions or trade restrictions applicable to WealthNX or your use of the Services (collectively, "<strong>Applicable Sanctions</strong>").
        </p>
        <p className="terms-text" style={P}>
          By accessing or using the Platform or the Services, you represent and warrant that: (a) you are not a person or entity that is the subject or target of Applicable Sanctions or otherwise designated on an applicable restricted-party list; (b) you are not located, organized, or ordinarily resident in a country, territory, or jurisdiction where your access to or use of the Services would be prohibited by Applicable Sanctions; (c) you will not use the Platform or the Services for the benefit of, or make the Platform or the Services available to, any person or entity where doing so would violate Applicable Sanctions; and (d) your use of the Platform and the Services will not otherwise cause WealthNX to violate Applicable Sanctions.
        </p>
        <p className="terms-text" style={P}>
          You may not use a virtual private network (VPN), false location information, or other means for the purpose of circumventing sanctions-related restrictions or controls implemented by WealthNX or an authorized Third-Party Provider.
        </p>
        <p className="terms-text" style={P}>
          WealthNX may screen users, accounts, transactions, or other relevant information where reasonably necessary for sanctions compliance and may restrict, suspend, refuse, or terminate access to some or all of the Platform or the Services where we reasonably determine that access may violate Applicable Sanctions or expose WealthNX or a Third-Party Provider to sanctions-related legal or regulatory risk.
        </p>
        <p className="terms-text" style={P_LAST}>
          You remain responsible for complying with Applicable Sanctions applicable to your use of the Platform and the Services.
        </p>

        <h3 className="terms-h3" style={H3}>1.5 Availability; Geographical Restrictions</h3>
        <p className="terms-text" style={P}>
          The availability of the Platform, the Services, and individual features may vary depending on a user's country, state, territory, or other jurisdiction. WealthNX may make certain Services or features available internationally while restricting other Services or features based on applicable law, regulatory requirements, Third-Party Provider availability, contractual restrictions, technical capabilities, or other considerations.
        </p>
        <p className="terms-text" style={P}>
          <strong>United States.</strong> Users located or domiciled within any of the 50 states of the United States or the District of Columbia may access those Services and features that WealthNX makes available in their jurisdiction, subject to these Terms and any applicable eligibility, subscription, feature-specific, or Third-Party Provider requirements. Certain Services or features may not be available in every U.S. state or the District of Columbia and may be subject to additional requirements, disclosures, restrictions, or limitations under applicable federal, state, or District of Columbia law.
        </p>
        <p className="terms-text" style={P}>
          <strong>Outside the United States.</strong> WealthNX may make certain Services or features available to users located outside the United States, including functionality that allows users to manually enter, organize, track, or analyze financial information. The availability of such functionality does not mean that all Services or features are available in that jurisdiction. Connected financial accounts, third-party financial data integrations, market data, credit-related functionality, tax-related functionality, or other Services or features may remain limited to the United States or other specifically supported jurisdictions.
        </p>
        <p className="terms-text" style={P}>
          WealthNX does not represent that every Service or feature is available, appropriate, or legally permitted in every jurisdiction. We may restrict, modify, suspend, or discontinue access to particular Services or features based on a user's location or jurisdiction, applicable law, regulatory requirements, sanctions restrictions, Third-Party Provider requirements, contractual restrictions, or technical availability.
        </p>
        <p className="terms-text" style={P}>
          Where geographic or jurisdictional restrictions apply to a particular Service or feature, you must not use a virtual private network (VPN), false location information, or other means for the purpose of circumventing those restrictions.
        </p>
        <p className="terms-text" style={P_LAST}>
          You are responsible for complying with laws applicable to your access to and use of the Platform and the Services in your jurisdiction. Nothing in the availability of the Platform, the Services, or any particular feature in a jurisdiction constitutes a representation that all Services or features are legally available or appropriate for use in that jurisdiction.
        </p>

        <h3 className="terms-h3" style={H3}>1.6 No Advice, Brokering, or Execution</h3>
        <p className="terms-text" style={P}>
          The Platform and the Services are made available as software tools to help users independently view, organize, track, understand, and analyze information and generate informational, educational, and analytical outputs. The Services do not constitute and may not be relied upon as investment, financial, legal, tax, accounting, or other professional advice.
        </p>
        <p className="terms-text" style={P_LAST}>
          The Services do not effect, execute, route, clear, or settle orders or transactions involving securities, cryptocurrencies, digital assets, or other financial instruments, and do not send, receive, hold, safeguard, custody, or otherwise transmit money, cryptocurrencies, digital assets, or other value on behalf of users. WealthNX does not accept or exercise authority or discretion to make financial, investment, trading, transfer, or other asset-related decisions or take such actions on behalf of users. Information displayed or generated through the Services, including balances, transactions, holdings, positions, investment performance, financial analyses, forecasts, projections, scenarios, simulations, estimates, tax-related calculations, credit-related information, and AI-generated outputs, is provided for informational, educational, and analytical purposes only. Users remain responsible for independently evaluating such information and making their own financial and other decisions.
        </p>

        <h4 className="terms-h4" style={H4}>1.6.1 No Investment or Financial Advice</h4>
        <p className="terms-text" style={P}>
          WealthNX does not provide personalized investment advice, investment recommendations, securities recommendations, digital asset recommendations, trading signals, buy/sell/hold recommendations, suitability determinations, portfolio management, discretionary account management, or recommendations concerning the purchase, sale, holding, allocation, rebalancing, or selection of securities, cryptocurrencies, digital assets, or other financial instruments.
        </p>
        <p className="terms-text" style={P_LAST}>
          Financial goals, budgeting tools, retirement forecasts, projections, scenario analyses, simulations, and other financial-planning-related functionality are informational and analytical tools only and do not constitute personalized financial planning, investment advice, or a recommendation that a user take or refrain from taking any particular financial or investment action.
        </p>

        <h4 className="terms-h4" style={H4}>1.6.2 Tax, Legal, Accounting, and Credit Information</h4>
        <p className="terms-text" style={P}>
          Any tax estimates, calculations, simulations, classifications, explanations, or other tax-related outputs made available through the Services are provided for informational purposes only and do not constitute tax, legal, or accounting advice, tax preparation, or a determination of a user's tax liability. Users should consult appropriately qualified professionals regarding their individual circumstances.
        </p>
        <p className="terms-text" style={P_LAST}>
          Any credit score, credit factor, credit-monitoring information, explanation, or other credit-related information made available through the Services is provided for informational purposes and may originate from Third-Party Providers. WealthNX does not guarantee that such information is complete, current, or identical to information used by any particular lender, creditor, or other third party, and does not make lending, credit, eligibility, or underwriting decisions through such informational features.
        </p>

        <h4 className="terms-h4" style={H4}>1.6.3 No Advisory or Fiduciary Relationship</h4>
        <p className="terms-text" style={P_LAST}>
          Nothing in the Platform, the Services, communications with WealthNX, or any output generated through the Services creates a fiduciary, investment advisory, brokerage, financial advisory, legal, tax, accounting, agency, partnership, or similar professional relationship between WealthNX and any user.
        </p>

        <h4 className="terms-h4" style={H4}>1.6.4 Regulatory Status</h4>
        <p className="terms-text" style={P}>
          In connection with the Services described in these Terms, WealthNX does not act as a broker, dealer, investment adviser, commodity trading advisor, custodian, money transmitter, payment institution, or other regulated financial intermediary.
        </p>
        <p className="terms-text" style={P_LAST}>
          WealthNX is not registered with the U.S. Securities and Exchange Commission or any state securities regulator as an investment adviser, broker-dealer, transfer agent, clearing agency, national securities exchange, or other regulated financial intermediary and does not hold itself out as providing services requiring such registration.
        </p>

        <h4 className="terms-h4" style={H4}>1.6.5 User Control and Responsibility</h4>
        <p className="terms-text" style={P}>
          WealthNX does not exercise discretion or control over users' assets, investments, financial accounts, transactions, or financial decisions. Analyses, dashboards, reports, visualizations, insights, forecasts, projections, simulations, and other outputs may be generated using information manually entered, imported, uploaded, connected, selected, authorized, or otherwise made available by users, together with information obtained from supported Third-Party Providers or other data sources.
        </p>
        <p className="terms-text" style={P_LAST}>
          Users remain solely responsible for evaluating information and outputs made available through the Services and for deciding whether and how to act upon them. Where appropriate, users should independently verify information and seek advice from appropriately qualified professionals.
        </p>

        <h4 className="terms-h4" style={H4}>1.6.6 Read-Only Connected Accounts</h4>
        <p className="terms-text" style={P_LAST}>
          Where the Services permit users to connect supported financial accounts, such connections are read-only unless WealthNX expressly introduces a different functionality under separate applicable terms and disclosures. WealthNX does not use such connections to initiate transactions, move funds or assets, modify connected accounts, or submit orders or transfer instructions on behalf of users. Users must initiate any transaction, order, transfer, or other instruction directly through the applicable third-party institution or service.
        </p>

        <h4 className="terms-h4" style={H4}>1.6.7 No Custody, Execution, or Asset Management</h4>
        <p className="terms-text" style={P_LAST}>
          WealthNX does not facilitate, execute, route, clear, settle, custody, hold, safeguard, transmit, exchange, stake, lend, borrow, or otherwise manage securities, cryptocurrencies, digital assets, fiat currency, or other assets on behalf of users through the Services described in these Terms.
        </p>

        <h3 className="terms-h3" style={H3}>1.7 Beta Software; Testing</h3>
        <p className="terms-text" style={P}>
          The Platform and the Services may include features, functionality, tools, models, integrations, data sources, or other services that are designated as beta, pre-release, experimental, pilot, early-access, or testing features (collectively, "<strong>Beta Services</strong>"). Beta Services are made available for evaluation, testing, and development purposes and may be incomplete, contain bugs or errors, produce inaccurate or unexpected results, or experience interruptions, delays, reduced functionality, data loss or corruption, or other performance or availability issues.
        </p>
        <p className="terms-text" style={P}>
          Beta Services may include, without limitation, experimental AI-enabled functionality, financial analytics, forecasts, projections, simulations, tax-related tools, credit-related features, voice-enabled functionality, account integrations, document or data processing features, collaborative features, or other new or developing functionality.
        </p>
        <p className="terms-text" style={P}>
          We may modify, restrict, suspend, discontinue, or change the availability or functionality of any Beta Service at any time, subject to applicable law. Beta Services may differ materially from any final or commercially released version, and WealthNX is not obligated to release, maintain, or continue any Beta Service or particular functionality.
        </p>
        <p className="terms-text" style={P}>
          Beta Services are provided on an "as is" and "as available" basis. Outputs, calculations, analyses, forecasts, projections, estimates, classifications, or other information generated through Beta Services may be incomplete, inaccurate, delayed, outdated, or otherwise unsuitable for a user's particular circumstances. Beta Services remain subject to the limitations, disclaimers, and no-advice provisions contained in these Terms, including Section 1.6.
        </p>
        <p className="terms-text" style={P}>
          The WealthNX Privacy Policy applies to information collected or processed through Beta Services. You should not submit information through a Beta Service unless the functionality expressly permits or requests such information and you are authorized to provide it.
        </p>
        <p className="terms-text" style={P}>
          Any feedback, suggestions, comments, ideas, bug reports, evaluations, or recommendations that you voluntarily provide regarding Beta Services ("<strong>Feedback</strong>") may be used by WealthNX to evaluate, develop, improve, maintain, secure, or otherwise support the Platform and the Services. You represent that you have the right to provide such Feedback and that doing so does not violate any obligation owed to another person or entity.
        </p>
        <p className="terms-text" style={P}>
          Feedback does not include Your Content or Personal Information submitted through the Services, which will remain subject to the applicable provisions of these Terms and the WealthNX Privacy Policy.
        </p>
        <p className="terms-text" style={P_LAST}>
          To the maximum extent permitted by applicable law, WealthNX will not be liable for losses, damages, costs, expenses, or claims arising from the experimental nature of Beta Services, including interruptions, errors, inaccuracies, modifications, suspension, discontinuation, loss of functionality, or unexpected results, subject to the limitations and exclusions of liability contained in these Terms.
        </p>

        {/* ═══════════ 2. Your Information ═══════════ */}
        <h2 className="terms-h2" style={H2}>2. Your Information</h2>

        <h3 className="terms-h3" style={H3}>2.1 Account</h3>
        <p className="terms-text" style={P}>
          To access or use certain features of the Platform or the Services, you may be required to create and maintain an account. You represent and warrant that information you provide in connection with account registration and use of the Services is accurate, complete, and current, and you agree to update such information as reasonably necessary.
        </p>
        <p className="terms-text" style={P}>
          You are responsible for activity conducted through your account, except to the extent resulting from circumstances for which you are not responsible under applicable law.
        </p>
        <p className="terms-text" style={P_LAST}>
          You may not create an account using false or misleading information, impersonate another person or entity, or create or use an account on behalf of another person or entity unless you are authorized to do so.
        </p>

        <h3 className="terms-h3" style={H3}>2.2 Credentials and Account Security</h3>
        <p className="terms-text" style={P}>
          You are responsible for maintaining the confidentiality and security of your login credentials and authentication information and for taking reasonable measures to prevent unauthorized access to your account. You must not knowingly permit another person to use your credentials except through sharing, household, professional-access, or other functionality expressly provided or authorized by WealthNX.
        </p>
        <p className="terms-text" style={P}>
          You agree to notify WealthNX promptly if you know or reasonably suspect that your account, credentials, or information has been accessed or used without authorization.
        </p>
        <p className="terms-text" style={P_LAST}>
          WealthNX may require additional authentication, restrict access, reset credentials, or temporarily suspend an account where reasonably necessary to protect users, information, or the security and integrity of the Platform or the Services.
        </p>

        <h3 className="terms-h3" style={H3}>2.3 Your Content</h3>
        <p className="terms-text" style={P}>
          Your access to and use of the Platform or the Services may involve entering, uploading, importing, transmitting, connecting, or otherwise making information, data, files, documents, images, receipts, financial information, account information, prompts, or other content available through the Services (collectively, "<strong>Your Content</strong>").
        </p>
        <p className="terms-text" style={P}>
          Your Content may include manually entered financial information; information obtained from accounts you authorize for connection; information concerning assets, liabilities, income, expenses, transactions, investments, property, digital assets, financial goals, budgets, retirement assumptions, tax-related inputs, credit-related information, or other financial interests; uploaded documents, receipts, invoices, images, or files; prompts and information submitted through AI-enabled or voice-enabled functionality; and information made available through household, couples, family-sharing, professional-access, or similar collaborative features.
        </p>
        <p className="terms-text" style={P}>
          You retain ownership of Your Content, subject to the limited rights and licenses granted to WealthNX and its authorized service providers under these Terms and the processing described in the WealthNX Privacy Policy. Nothing in these Terms transfers ownership of Your Content to WealthNX.
        </p>
        <p className="terms-text" style={P}>
          You represent and warrant that you own, control, or otherwise have all rights, permissions, consents, and lawful authority necessary to provide, upload, import, connect, disclose, or otherwise make Your Content available through the Services and to authorize WealthNX and its authorized service providers to process Your Content as described in these Terms and the Privacy Policy.
        </p>
        <p className="terms-text" style={P}>
          You must not submit or make available information belonging to another person unless you are authorized to do so. This requirement applies particularly where you use household, couples, family-sharing, professional-access, document-upload, or similar functionality involving information relating to another person.
        </p>
        <p className="terms-text" style={P_LAST}>
          Feedback provided regarding Beta Services will be treated in accordance with Section 1.7 and will not alter your ownership of Your Content or the treatment of Personal Information under the WealthNX Privacy Policy.
        </p>

        {/* ═══════════ 3. Using or Linking Third-Party Accounts ═══════════ */}
        <h2 className="terms-h2" style={H2}>3. Using or Linking Third-Party Accounts</h2>

        <h3 className="terms-h3" style={H3}>3.1 Authorization</h3>
        <p className="terms-text" style={P}>
          Where the Services allow you to connect or link an external account or service, including a bank, brokerage, digital asset exchange, cryptocurrency wallet, credit-related service, or other supported financial account ("<strong>External Account</strong>"), you authorize WealthNX and its applicable Third-Party Providers to establish and maintain the connection and to retrieve, receive, store, process, display, organize, and analyze information made available through that connection, consistent with your authorization, these Terms, and the WealthNX Privacy Policy.
        </p>
        <p className="terms-text" style={P}>
          Information obtained from External Accounts may include available balances, transactions, holdings, positions, investment performance information, account metadata, digital asset information, credit-related information, and other information supported by the applicable connection.
        </p>
        <p className="terms-text" style={P}>
          Connections to External Accounts through the Services are read-only unless WealthNX expressly introduces different functionality under separate applicable terms and disclosures. WealthNX does not use such connections to initiate transactions, move funds or assets, modify External Accounts, or submit trading, payment, or transfer instructions on your behalf.
        </p>
        <p className="terms-text" style={P_LAST}>
          You represent and warrant that you are authorized to connect each External Account and permit the applicable information to be accessed and processed through the Services. You may disconnect an External Account through functionality made available by WealthNX or the applicable Third-Party Provider, subject to any data-retention requirements described in the WealthNX Privacy Policy.
        </p>

        <h3 className="terms-h3" style={H3}>3.2 Third-Party Account and Data Risks</h3>
        <p className="terms-text" style={P}>
          External Accounts and the services used to connect them are operated or controlled by third parties. WealthNX does not control and cannot guarantee the availability, security, functionality, accuracy, completeness, timeliness, or continued compatibility of any External Account or Third-Party Service.
        </p>
        <p className="terms-text" style={P}>
          Information received from External Accounts or Third-Party Providers may be incomplete, delayed, inaccurate, outdated, duplicated, unavailable, or otherwise affected by the applicable provider's systems, data, policies, or technical limitations. You should verify information with the applicable financial institution or Third-Party Provider where appropriate.
        </p>
        <p className="terms-text" style={P_LAST}>
          Third parties may modify, restrict, suspend, or discontinue their services, APIs, integrations, data access, functionality, or policies at any time. Such changes may affect or prevent the operation of features within the Services. To the extent permitted by applicable law, WealthNX will not be responsible for acts or omissions of Third-Party Providers or for interruptions, limitations, inaccuracies, changes, or failures attributable to External Accounts or Third-Party Services.
        </p>

        <h3 className="terms-h3" style={H3}>3.3 Cloud Services and Infrastructure</h3>
        <p className="terms-text" style={P}>
          WealthNX may use authorized third-party infrastructure, hosting, storage, security, communications, artificial intelligence, analytics, data-processing, and other technology providers to operate, maintain, secure, support, and provide the Platform and the Services.
        </p>
        <p className="terms-text" style={P}>
          Accordingly, Your Content and other information processed through the Services may be transmitted to, processed by, or stored on systems operated by authorized Third-Party Providers where reasonably necessary to provide the Services. Such processing will be subject to these Terms, the WealthNX Privacy Policy, applicable contractual arrangements, and applicable law.
        </p>
        <p className="terms-text" style={P_LAST}>
          The use of third-party infrastructure does not transfer ownership of Your Content to the applicable provider or alter the rights in Your Content established under these Terms.
        </p>

        {/* ═══════════ 4. Third-Party Service Providers; Authorization to Share ═══════════ */}
        <h2 className="terms-h2" style={H2}>4. Third-Party Service Providers; Authorization to Share</h2>

        <h3 className="terms-h3" style={H3}>4.1 Use of Third-Party Providers</h3>
        <p className="terms-text" style={P_LAST}>
          WealthNX may engage third-party service providers, vendors, contractors, and technology providers to operate, maintain, secure, support, improve, and provide functionality through the Platform and the Services (each, as applicable, a "<strong>Third-Party Provider</strong>"). Third-Party Providers may perform functions including hosting and infrastructure, data storage and processing, financial-data aggregation and account connectivity, market-data services, artificial intelligence and machine learning processing, analytics, logging and monitoring, security and fraud prevention, communications and notifications, document and receipt processing, voice-enabled functionality, credit-related services, tax-related functionality, and other services necessary to support features made available through the Platform.
        </p>

        <h3 className="terms-h3" style={H3}>4.2 Categories of Third-Party Providers</h3>
        <p className="terms-text" style={{ ...P, marginBottom: '10px' }}>
          Depending on the Services and features made available to you, Third-Party Providers may include:
        </p>
        <ol className="terms-ol" style={UL_LAST}>
          <li style={LI}>cloud infrastructure, hosting, storage, database, and computing providers;</li>
          <li style={LI}>financial-data aggregation and account connectivity providers, including providers used to connect supported banks, brokerages, digital asset exchanges, and other financial accounts;</li>
          <li style={LI}>market, securities, cryptocurrency, financial, property, credit, tax, and other data or information providers;</li>
          <li style={LI}>artificial intelligence, machine learning, large language model, model-inference, and related technology providers;</li>
          <li style={LI}>document, receipt, image, file-processing, extraction, or classification providers;</li>
          <li style={LI}>voice, speech-to-text, transcription, or related technology providers;</li>
          <li style={LI}>communications, email, push-notification, customer-support, and messaging providers;</li>
          <li style={LI}>analytics, performance-monitoring, logging, security, authentication, and fraud-prevention providers;</li>
          <li style={LI}>payment and subscription-processing providers; and</li>
          <li style={LI}>other professional, operational, or technology service providers reasonably necessary to provide, maintain, secure, support, or improve the Platform and the Services.</li>
        </ol>
        <p className="terms-text" style={P_LAST}>
          The particular Third-Party Providers used by WealthNX may change over time. The inclusion of a category of provider in these Terms does not mean that every provider or category is used in connection with every user, Service, or feature.
        </p>

        <h3 className="terms-h3" style={H3}>4.3 Processing and Disclosure of Information to Third-Party Providers</h3>
        <p className="terms-text" style={P}>
          To the extent reasonably necessary to provide, operate, maintain, secure, support, or improve the Services, WealthNX may transmit, disclose, make available, or otherwise permit authorized Third-Party Providers to process Your Content and other information associated with your use of the Services.
        </p>
        <p className="terms-text" style={{ ...P, marginBottom: '10px' }}>
          Depending on the features you use, such processing may include:
        </p>
        <ol className="terms-ol" style={UL}>
          <li style={LI}>transmitting prompts, contextual information, uploaded or imported content, financial information, and other relevant information to artificial intelligence or machine learning providers to generate, support, evaluate, or deliver AI-enabled functionality and outputs;</li>
          <li style={LI}>exchanging information with financial-data connectivity providers to establish and maintain connections to supported External Accounts and retrieve available balances, transactions, holdings, positions, investment information, or other authorized financial data;</li>
          <li style={LI}>transmitting documents, receipts, invoices, images, files, or information contained in them to authorized providers that support extraction, classification, organization, or other document-processing functionality;</li>
          <li style={LI}>processing voice-derived information through authorized providers supporting speech recognition, transcription, or other voice-enabled functionality;</li>
          <li style={LI}>exchanging information with authorized providers supporting credit-related, tax-related, market-data, financial-data, or other features where you choose to use those Services;</li>
          <li style={LI}>storing or processing Your Content and other information through authorized hosting, cloud, database, or infrastructure providers;</li>
          <li style={LI}>transmitting appropriate metadata, usage information, logs, diagnostic information, or security information to providers supporting analytics, monitoring, authentication, security, fraud prevention, or Platform performance; and</li>
          <li style={LI}>processing information through communications, customer-support, payment, subscription, or notification providers as necessary to provide the applicable functionality.</li>
        </ol>
        <p className="terms-text" style={P}>
          Such processing and disclosures will be handled in accordance with the WealthNX Privacy Policy, applicable contractual arrangements, and applicable law.
        </p>
        <p className="terms-text" style={P_LAST}>
          You should not provide Social Security numbers, government-issued identification numbers, financial account passwords, private cryptographic keys, seed phrases, biometric information, health information, or other highly sensitive information through the Services unless the applicable feature expressly requests or permits that information.
        </p>

        <h3 className="terms-h3" style={H3}>4.4 Plaid and Other Account Connectivity Providers</h3>
        <p className="terms-text" style={P}>
          Where you choose to connect a supported External Account, WealthNX may use Plaid or another authorized account connectivity provider to establish and maintain the connection and retrieve information authorized by you. Your use of an account connectivity provider may also be subject to that provider's applicable terms, privacy notices, permissions, and other disclosures.
        </p>
        <p className="terms-text" style={P}>
          Where Plaid is used, information exchanged through the connection may be processed by the applicable Plaid entity in accordance with Plaid's applicable consumer terms and privacy notices (available at <a href="https://plaid.com/legal/#consumers" style={LINK} target="_blank" rel="noopener noreferrer">https://plaid.com/legal/#consumers</a>). WealthNX does not receive authority through such connections to initiate transactions, move assets or funds, or modify your External Account.
        </p>
        <p className="terms-text" style={P_LAST}>
          The availability of Plaid or any other account connectivity provider may vary based on the applicable financial institution, feature, account type, country, or jurisdiction.
        </p>

        <h3 className="terms-h3" style={H3}>4.5 Limits on Third-Party Provider Processing</h3>
        <p className="terms-text" style={P}>
          Where a Third-Party Provider processes Personal Information or Your Content on WealthNX's behalf, WealthNX seeks to use providers subject to contractual, technical, organizational, or other safeguards appropriate to the nature of the services and information involved.
        </p>
        <p className="terms-text" style={P}>
          Except where you independently authorize a connection, disclosure, or relationship with a Third-Party Provider, WealthNX seeks to require service providers processing information on its behalf to process such information only as necessary to provide services to WealthNX or you, or for other purposes permitted by applicable law and applicable contractual arrangements.
        </p>
        <p className="terms-text" style={P_LAST}>
          Nothing in this Section limits any independent terms, privacy notices, or legal obligations that apply directly between you and a Third-Party Provider where you separately establish or authorize that relationship.
        </p>

        <h3 className="terms-h3" style={H3}>4.6 Artificial Intelligence Outputs and Third-Party Data</h3>
        <p className="terms-text" style={{ ...P, marginBottom: '10px' }}>
          Certain Services use artificial intelligence, machine learning, automated analytical technologies, external data, or models provided or supported by Third-Party Providers. You acknowledge and understand that:
        </p>
        <ol className="terms-ol" style={UL_LAST}>
          <li style={LI}>information necessary to provide AI-enabled functionality, including prompts, Your Content, contextual information, and other information made available through the Services, may be processed by authorized Third-Party Providers as described in these Terms and the WealthNX Privacy Policy;</li>
          <li style={LI}>AI-generated and automated outputs are generated using models, algorithms, assumptions, statistical relationships, and available information and may be inaccurate, incomplete, inconsistent, outdated, or otherwise unsuitable for a user's particular circumstances;</li>
          <li style={LI}>outputs may depend on information received from External Accounts, financial institutions, market-data providers, user-entered information, or other third-party sources, and the accuracy or availability of such underlying information may affect the resulting output;</li>
          <li style={LI}>forecasts, projections, estimates, simulations, scenario analyses, tax-related calculations, credit-related information, and other analytical outputs may depend on assumptions or information that may change or prove incorrect;</li>
          <li style={LI}>users should independently evaluate and, where appropriate, verify information and outputs before making financial, investment, tax, legal, business, or other decisions; and</li>
          <li style={LI}>WealthNX does not guarantee the accuracy, completeness, timeliness, reliability, availability, or suitability of information received from Third-Party Providers or outputs generated using such information.</li>
        </ol>
        <p className="terms-text" style={P_LAST}>
          The no-advice and user-responsibility provisions of Section 1.6 apply to all such information and outputs.
        </p>

        <h3 className="terms-h3" style={H3}>4.7 No Endorsement; Third-Party Responsibility</h3>
        <p className="terms-text" style={P}>
          The integration, availability, identification, or use of a Third-Party Provider through the Platform does not constitute an endorsement, recommendation, or guarantee by WealthNX of that provider or its products or services.
        </p>
        <p className="terms-text" style={P_LAST}>
          WealthNX does not control the independent operations, systems, policies, terms, security practices, data accuracy, service availability, or legal and regulatory obligations of Third-Party Providers. To the extent permitted by applicable law, WealthNX is not responsible for acts, omissions, interruptions, errors, failures, or other matters attributable to a Third-Party Provider acting independently of WealthNX.
        </p>

        {/* ═══════════ 5. Our License; Data Use ═══════════ */}
        <h2 className="terms-h2" style={H2}>5. Our License; Data Use</h2>

        <h3 className="terms-h3" style={H3}>5.1 License to WealthNX</h3>
        <p className="terms-text" style={{ ...P, marginBottom: '10px' }}>
          You retain all ownership rights in and to Your Content. Subject to these Terms, you grant WealthNX and its authorized service providers a limited, worldwide, non-exclusive, royalty-free license to access, host, store, reproduce, transmit, process, analyze, organize, modify as technically necessary, display, and otherwise use Your Content solely to the extent reasonably necessary to:
        </p>
        <ol className="terms-ol" style={UL}>
          <li style={LI}>provide, operate, maintain, secure, support, and make the Platform and the Services available to you;</li>
          <li style={LI}>retrieve, receive, display, organize, categorize, and analyze information from External Accounts, manually entered information, uploaded or imported materials, and other data sources authorized or provided by you;</li>
          <li style={LI}>process documents, receipts, invoices, images, files, voice-derived information, prompts, financial information, and other Your Content as necessary to provide features you choose to use;</li>
          <li style={LI}>generate and provide analytics, visualizations, reports, summaries, classifications, categorizations, insights, dashboards, forecasts, projections, estimates, simulations, scenario analyses, tax-related calculations, and other outputs requested or enabled through the Services;</li>
          <li style={LI}>provide household, couples, family-sharing, professional-access, or other collaborative functionality where authorized by you;</li>
          <li style={LI}>monitor, secure, troubleshoot, test, evaluate, maintain, improve, and enhance the functionality, safety, reliability, and performance of the Platform and the Services;</li>
          <li style={LI}>detect, prevent, investigate, and respond to fraud, misuse, security incidents, unlawful activity, or violations of these Terms;</li>
          <li style={LI}>comply with applicable legal, regulatory, audit, security, recordkeeping, and enforcement obligations; and</li>
          <li style={LI}>enforce these Terms and protect the rights, security, and integrity of WealthNX, the Platform, the Services, our users, and others.</li>
        </ol>
        <p className="terms-text" style={P}>
          The license granted under this Section is limited to the purposes described in these Terms and the WealthNX Privacy Policy and does not transfer ownership of Your Content to WealthNX.
        </p>
        <p className="terms-text" style={P_LAST}>
          Except as otherwise described in these Terms or the Privacy Policy, WealthNX does not sell Your Content or use Your Content for purposes unrelated to providing, operating, maintaining, securing, supporting, or improving the Services.
        </p>

        <h3 className="terms-h3" style={H3}>5.2 Artificial Intelligence Processing</h3>
        <p className="terms-text" style={P}>
          Certain features of the Services use artificial intelligence, machine learning, automated analytical systems, large language models, and related technologies operated by WealthNX or authorized service providers. To provide such functionality, Your Content and other information made available through the Services may be processed by these systems as reasonably necessary to generate and deliver the applicable functionality and outputs.
        </p>
        <p className="terms-text" style={P}>
          Such processing may include prompts, contextual information, manually entered or imported financial information, linked-account information, transactions, holdings, documents and information extracted from them, voice-derived information, financial goals and assumptions, tax-related inputs, credit-related information, and other information relevant to the features you choose to use.
        </p>
        <p className="terms-text" style={P}>
          WealthNX may also process such information as reasonably necessary to evaluate, test, monitor, secure, troubleshoot, and improve the quality, safety, reliability, and compliance of AI-enabled functionality, subject to these Terms, the Privacy Policy, applicable contractual arrangements, and applicable law.
        </p>
        <p className="terms-text" style={P_LAST}>
          Unless expressly disclosed and authorized where required, WealthNX does not use user financial information, linked-account information, prompts, uploaded content, or other Personal Information submitted through the Services to train proprietary artificial intelligence models for unrelated commercial purposes.
        </p>

        <h3 className="terms-h3" style={H3}>5.3 Use of Outputs</h3>
        <p className="terms-text" style={{ ...P, marginBottom: '10px' }}>
          The Services may generate or display artificial intelligence outputs, analyses, summaries, classifications, categorizations, insights, dashboards, visualizations, forecasts, projections, estimates, simulations, scenario analyses, tax-related calculations, credit-related information, and other outputs ("<strong>Outputs</strong>") based on Your Content, information received from Third-Party Providers, publicly available information, assumptions, models, algorithms, or other data sources. You acknowledge and understand that Outputs:
        </p>
        <ol className="terms-ol" style={UL}>
          <li style={LI}>are provided for informational, educational, and analytical purposes only and do not constitute investment, financial, legal, tax, accounting, or other professional advice;</li>
          <li style={LI}>may be inaccurate, incomplete, inconsistent, delayed, outdated, or based on assumptions, estimates, models, or underlying information that may prove incorrect;</li>
          <li style={LI}>may vary based on the information provided, connected, imported, uploaded, or otherwise available to the Services;</li>
          <li style={LI}>should be independently evaluated and, where appropriate, verified against authoritative or primary sources before being relied upon;</li>
          <li style={LI}>do not constitute investment recommendations, securities recommendations, trading signals, buy/sell/hold recommendations, suitability determinations, or recommendations regarding portfolio allocation or rebalancing; and</li>
          <li style={LI}>do not guarantee or predict any particular financial, investment, tax, credit, retirement, or other outcome.</li>
        </ol>
        <p className="terms-text" style={P_LAST}>
          You remain responsible for decisions you make based on or in connection with information available through the Services and for obtaining advice from appropriately qualified professionals where appropriate.
        </p>

        <h3 className="terms-h3" style={H3}>5.4 Historical Information; Forecasts; Projections; and Hypothetical Results</h3>
        <p className="terms-text" style={P}>
          Past performance does not guarantee future results. Historical performance, market information, forecasts, retirement projections, financial projections, simulations, scenario analyses, estimated returns, hypothetical results, tax estimates, and other forward-looking or model-based Outputs displayed through the Services may rely on assumptions, methodologies, user-provided information, historical information, market information, or third-party data that may change or prove inaccurate.
        </p>
        <p className="terms-text" style={P}>
          Such Outputs are illustrative and informational in nature and are not guarantees, promises, or assurances of future performance, investment returns, retirement outcomes, tax liabilities, financial condition, or other results. Actual outcomes may differ materially from any forecast, projection, estimate, simulation, scenario, or hypothetical result.
        </p>
        <p className="terms-text" style={P_LAST}>
          Users are responsible for reviewing the assumptions and information underlying such Outputs where made available and should not interpret them as a recommendation to take or refrain from taking any particular financial or investment action.
        </p>

        <h3 className="terms-h3" style={H3}>5.5 Third-Party Data</h3>
        <p className="terms-text" style={P}>
          The Platform, the Services, and Outputs may incorporate or depend upon information supplied by Third-Party Providers, including financial institutions, account connectivity providers, market-data providers, securities or digital-asset data providers, credit-related providers, tax-related providers, property or other data providers, and other external sources.
        </p>
        <p className="terms-text" style={P}>
          Third-party information may be subject to separate terms, licenses, restrictions, methodologies, update schedules, and availability limitations imposed by the applicable Third-Party Provider. WealthNX does not control the underlying information supplied by independent Third-Party Providers and, to the extent permitted by applicable law, does not guarantee its accuracy, completeness, timeliness, reliability, or continued availability.
        </p>
        <p className="terms-text" style={P_LAST}>
          Third-party information may be delayed, incomplete, inaccurate, duplicated, unavailable, or outdated. Users should independently verify information with the applicable financial institution, provider, governmental authority, or other authoritative source where appropriate before relying upon it.
        </p>

        {/* ═══════════ 6. Payments, Subscriptions, and Billing ═══════════ */}
        <h2 className="terms-h2" style={H2}>6. Payments, Subscriptions, and Billing</h2>

        <h3 className="terms-h3" style={H3}>6.1 Plans and Pricing</h3>
        <p className="terms-text" style={P}>
          WealthNX may offer the Platform or the Services through free, trial, promotional, paid, or other subscription plans with different features, functionality, usage limits, eligibility requirements, pricing, and billing periods. The features and pricing applicable to a plan will be disclosed at or before the time you subscribe or make a purchase.
        </p>
        <p className="terms-text" style={P_LAST}>
          We may modify available plans, features, or pricing from time to time. Any change to the price of an existing recurring subscription will take effect in accordance with applicable law and the requirements of the applicable payment provider or app marketplace, including any advance notice or consent required before the change becomes effective.
        </p>

        <h3 className="terms-h3" style={H3}>6.2 Recurring Subscriptions and Payment Authorization</h3>
        <p className="terms-text" style={P}>
          If you purchase a subscription or other recurring paid plan, you authorize the applicable payment provider to charge the payment method associated with your purchase for the subscription price, applicable taxes, and other charges disclosed to you at the time of purchase, at the billing frequency presented to you.
        </p>
        <p className="terms-text" style={P}>
          Your subscription will continue and automatically renew for successive billing periods unless you cancel it before the applicable renewal date, subject to applicable law and the cancellation procedures described in Section 6.3.
        </p>
        <p className="terms-text" style={P}>
          Subscriptions purchased through a third-party platform or app marketplace, including the Apple App Store or Google Play, are billed and processed by the applicable third party and are also subject to that provider's payment, billing, renewal, and subscription terms. WealthNX does not directly control payment processing performed by such third parties.
        </p>
        <p className="terms-text" style={P_LAST}>
          If a payment cannot be completed, we or the applicable payment provider may request that you update your payment information, retry the payment, or take other actions permitted by applicable law. Where payment remains unsuccessful, WealthNX may suspend, limit, downgrade, or terminate access to paid features, subject to applicable law and any applicable third-party marketplace requirements.
        </p>

        <h3 className="terms-h3" style={H3}>6.3 Automatic Renewal and Cancellation</h3>
        <p className="terms-text" style={P}>
          Unless otherwise disclosed at the time of purchase, paid subscriptions automatically renew for successive billing periods until cancelled.
        </p>
        <p className="terms-text" style={P}>
          You may cancel a subscription through the method made available for the applicable purchase. Subscriptions purchased directly from WealthNX may be cancelled through available account or subscription-management functionality or by contacting WealthNX Support at <a href="mailto:support@wealthnx.ai" style={LINK}>support@wealthnx.ai</a>. Subscriptions purchased through the Apple App Store, Google Play, or another third-party marketplace generally must be managed and cancelled through the applicable marketplace account or subscription settings.
        </p>
        <p className="terms-text" style={P}>
          Cancellation stops future renewal charges but does not ordinarily terminate access immediately. Unless otherwise required by applicable law or stated at the time of cancellation, you may continue to access paid features through the end of the billing period for which you have already paid.
        </p>
        <p className="terms-text" style={P_LAST}>
          Cancellation does not automatically delete your WealthNX account or Personal Information. Account closure and information retention or deletion are governed separately by these Terms and the WealthNX Privacy Policy.
        </p>

        <h3 className="terms-h3" style={H3}>6.4 Trials and Promotional Offers</h3>
        <p className="terms-text" style={P}>
          WealthNX may offer free trials, introductory pricing, discounts, or other promotional subscriptions. The duration, eligibility requirements, price following the promotional period, and applicable renewal terms will be disclosed when the offer is presented.
        </p>
        <p className="terms-text" style={P_LAST}>
          Where a trial or promotional subscription automatically converts to a paid subscription, the applicable price and recurring billing terms will be disclosed before enrollment, and any notice or consent required by applicable law or the applicable app marketplace will be provided or obtained.
        </p>

        <h3 className="terms-h3" style={H3}>6.5 Refunds</h3>
        <p className="terms-text" style={P}>
          Except as required by applicable law or expressly stated at the time of purchase, payments are non-refundable and no refunds or credits will be provided for partially used billing periods.
        </p>
        <p className="terms-text" style={P_LAST}>
          For subscriptions or purchases made through the Apple App Store, Google Play, or another third-party marketplace, refund requests may be subject to and processed under the applicable marketplace's refund policies and procedures. Nothing in these Terms limits any refund, cancellation, or other consumer right that cannot lawfully be waived.
        </p>

        <h3 className="terms-h3" style={H3}>6.6 Taxes</h3>
        <p className="terms-text" style={P_LAST}>
          Prices displayed for paid Services may be subject to applicable sales, use, value-added, goods and services, or other taxes depending on your location and the manner in which the Services are purchased. Applicable taxes may be collected by WealthNX or the applicable payment provider or marketplace as required by law.
        </p>

        {/* ═══════════ 7. Security, Privacy, and Compliance ═══════════ */}
        <h2 className="terms-h2" style={H2}>7. Security, Privacy, and Compliance</h2>

        <h3 className="terms-h3" style={H3}>7.1 Security Measures</h3>
        <p className="terms-text" style={P}>
          WealthNX maintains administrative, technical, and physical safeguards designed to protect the confidentiality, integrity, and security of Your Content, Personal Information, linked-account information, and other information processed through the Platform and the Services. Such safeguards may include, as appropriate, access controls, encryption, authentication measures, network and infrastructure security, monitoring and logging, security testing, incident-response procedures, and personnel security and training measures.
        </p>
        <p className="terms-text" style={P}>
          WealthNX maintains an ISO/IEC 27001-certified information security management system, subject to the scope and status of the applicable certification. Such certification and security measures are designed to support information-security risk management but do not guarantee that the Platform, the Services, or information processed through them will be completely secure or free from unauthorized access, loss, misuse, alteration, interruption, or other security incidents.
        </p>
        <p className="terms-text" style={P}>
          No method of transmission over the Internet, electronic storage, or information-security system is completely secure. You are responsible for taking reasonable measures to protect your account and credentials, including maintaining the confidentiality of your login information and promptly notifying WealthNX if you know or suspect that your account has been accessed without authorization.
        </p>
        <p className="terms-text" style={P_LAST}>
          In the event of a suspected or confirmed security incident involving Personal Information or Personal Data, WealthNX will investigate and respond in accordance with its applicable security and incident-response procedures and will provide notifications to affected individuals, regulators, or other parties where and within the timeframes required by applicable law.
        </p>

        <h3 className="terms-h3" style={H3}>7.2 Privacy</h3>
        <p className="terms-text" style={P}>
          WealthNX's collection, use, disclosure, retention, and other processing of Personal Information and Personal Data in connection with the Platform and the Services is described in the WealthNX.ai Privacy Policy.
        </p>
        <p className="terms-text" style={P}>
          The Privacy Policy applies to information processed through the Services, including, where applicable, information manually entered, imported, uploaded, or obtained through connected accounts; financial and transaction information; documents and information extracted from them; prompts and AI-related information; voice-derived information; credit-related information; tax-related information; and information processed through household, couples, family-sharing, professional-access, or similar features.
        </p>
        <p className="terms-text" style={P_LAST}>
          Your use of Third-Party Services may also be subject to the privacy policies, terms, and data practices of the applicable Third-Party Providers.
        </p>

        <h3 className="terms-h3" style={H3}>7.3 Compliance with Applicable Law</h3>
        <p className="terms-text" style={P}>
          You must access and use the Platform and the Services in compliance with laws and regulations applicable to you and your use of the Services, these Terms, and applicable third-party contractual obligations.
        </p>
        <p className="terms-text" style={P}>
          The availability of a Service or feature does not constitute a representation that the Service or feature is legally available or appropriate for every user or in every jurisdiction. Certain Services or features may be restricted, modified, or unavailable based on applicable legal or regulatory requirements, geographic location, user eligibility, sanctions restrictions, or Third-Party Provider requirements.
        </p>
        <p className="terms-text" style={P_LAST}>
          WealthNX may take reasonable measures to comply with laws, regulations, legal processes, governmental requests, sanctions requirements, security obligations, and other legal requirements applicable to WealthNX and the Services, including restricting, suspending, or terminating access where reasonably necessary or legally required.
        </p>

        {/* ═══════════ 8. IMPORTANT DISCLAIMERS ═══════════ */}
        <h2 className="terms-h2" style={H2}>8. IMPORTANT DISCLAIMERS</h2>

        <h3 className="terms-h3" style={H3}>8.1 Risks and Limitations of the Services</h3>
        <p className="terms-text" style={P}>
          The Platform and the Services are designed to provide informational, educational, organizational, and analytical tools. Information and Outputs made available through the Services, including AI-generated insights, analyses, summaries, classifications, forecasts, projections, estimates, simulations, scenario analyses, tax-related calculations, credit-related information, market information, and other Outputs, are not professional advice and should not be treated as a substitute for your own judgment or advice from an appropriately qualified professional.
        </p>
        <p className="terms-text" style={P}>
          The Services use artificial intelligence, machine learning, automated analytical technologies, models, algorithms, assumptions, user-provided information, and information obtained from Third-Party Providers or other sources. As a result, Outputs may be inaccurate, incomplete, inconsistent, delayed, outdated, misleading, based on incorrect assumptions, or otherwise unsuitable for your particular circumstances.
        </p>
        <p className="terms-text" style={P}>
          Financial markets, investment values, tax rules, credit information, economic conditions, and other information may change, and historical information or model-based Outputs may not reflect future events or results. Forecasts, projections, simulations, scenarios, estimates, and hypothetical results are illustrative and informational only and do not constitute guarantees, promises, or assurances of future performance or outcomes.
        </p>
        <p className="terms-text" style={P}>
          You remain responsible for independently evaluating and, where appropriate, verifying information made available through the Services before acting upon it. Any financial, investment, tax, legal, accounting, business, or other decision you make remains your responsibility. Where appropriate, you should consult an appropriately qualified professional regarding your individual circumstances.
        </p>
        <p className="terms-text" style={P_LAST}>
          Nothing in this Section alters or limits the no-advice, no-execution, user-responsibility, historical-performance, or Third-Party Provider provisions contained elsewhere in these Terms.
        </p>

        <div className="terms-notice" style={NOTICE_LAST}>
          <h3 className="terms-h3" style={NOTICE_TITLE}>8.2 Disclaimer of Warranties</h3>
          <p className="terms-text" style={{ ...NOTICE_TEXT, marginBottom: '14px' }}>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE PLATFORM, THE SERVICES, BETA SERVICES, THIRD-PARTY DATA MADE AVAILABLE THROUGH THE SERVICES, AND ALL CONTENT, INFORMATION, FEATURES, FUNCTIONALITY, AND OUTPUTS ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS.
          </p>
          <p className="terms-text" style={{ ...NOTICE_TEXT, marginBottom: '14px' }}>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, WEALTHNX DISCLAIMS ALL WARRANTIES AND REPRESENTATIONS, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, ACCURACY, COMPLETENESS, RELIABILITY, AVAILABILITY, SECURITY, AND QUIET ENJOYMENT.
          </p>
          <p className="terms-text" style={{ ...NOTICE_TEXT, marginBottom: '14px' }}>
            WEALTHNX DOES NOT WARRANT THAT THE PLATFORM OR THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR AVAILABLE AT ALL TIMES; THAT DEFECTS OR ERRORS WILL BE CORRECTED; THAT INFORMATION OR OUTPUTS WILL BE ACCURATE, COMPLETE, CURRENT, OR SUITABLE FOR YOUR PARTICULAR CIRCUMSTANCES; OR THAT ANY PARTICULAR RESULT OR OUTCOME WILL BE ACHIEVED THROUGH USE OF THE PLATFORM OR THE SERVICES.
          </p>
          <p className="terms-text" style={NOTICE_TEXT}>
            Nothing in these Terms excludes or limits any warranty, right, remedy, or protection that cannot lawfully be excluded or limited under applicable law.
          </p>
        </div>

        <h3 className="terms-h3" style={H3}>8.3 No Compliance, Reporting, or Professional-Service Guarantee</h3>
        <p className="terms-text" style={P}>
          WealthNX does not represent or warrant that the Platform, the Services, or any Output will satisfy, discharge, or fulfill any legal, regulatory, tax, accounting, fiduciary, compliance, reporting, filing, disclosure, recordkeeping, audit, investment-policy, or other obligation applicable to you or another person or entity.
        </p>
        <p className="terms-text" style={P}>
          Any tax-related calculations, credit-related information, financial reports, dashboards, documents, records, classifications, or other information generated or displayed through the Services are not substitutes for official records, filings, statements, reports, professional determinations, or information obtained directly from the applicable financial institution, governmental authority, regulator, credit provider, or other authoritative source.
        </p>
        <p className="terms-text" style={P_LAST}>
          You remain responsible for determining and satisfying obligations applicable to you and for obtaining independent professional advice where appropriate.
        </p>

        {/* ═══════════ 9. LIABILITY LIMITATIONS; INDEMNIFICATION ═══════════ */}
        <h2 className="terms-h2" style={H2}>9. LIABILITY LIMITATIONS; INDEMNIFICATION</h2>

        <div className="terms-notice" style={NOTICE}>
          <h3 className="terms-h3" style={NOTICE_TITLE}>9.1 Limitations of Liability</h3>
          <p className="terms-text" style={{ ...NOTICE_TEXT, marginBottom: '14px', fontWeight: 'bold' }}>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, INEXOR INC., WEALTHNX, AND THEIR RESPECTIVE AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND SERVICE PROVIDERS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, BUSINESS OPPORTUNITY, GOODWILL, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO THESE TERMS, THE PLATFORM, THE SERVICES, OR YOUR ACCESS TO OR USE OF, OR INABILITY TO ACCESS OR USE, THE PLATFORM OR THE SERVICES, REGARDLESS OF THE THEORY OF LIABILITY AND EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
          <p className="terms-text" style={{ ...NOTICE_TEXT, marginBottom: '10px' }}>
            Without limiting the foregoing, to the maximum extent permitted by applicable law, WealthNX will not be liable for losses or damages arising out of or relating to:
          </p>
          <ol className="terms-ol" style={{ ...UL, marginBottom: '14px' }}>
            <li style={LI}>inaccurate, incomplete, delayed, outdated, unavailable, or otherwise incorrect information or Outputs;</li>
            <li style={LI}>AI-generated or automated Outputs;</li>
            <li style={LI}>forecasts, projections, estimates, simulations, scenario analyses, tax-related calculations, credit-related information, or hypothetical results;</li>
            <li style={LI}>information provided, entered, uploaded, imported, connected, or authorized by you;</li>
            <li style={LI}>External Accounts, Third-Party Providers, third-party data, or interruptions or changes to third-party services;</li>
            <li style={LI}>unauthorized access resulting from your failure to protect your account credentials; or</li>
            <li style={LI}>financial, investment, tax, legal, business, or other decisions made by you based on or in connection with information made available through the Services.</li>
          </ol>
          <p className="terms-text" style={{ ...NOTICE_TEXT, marginBottom: '14px', fontWeight: 'bold' }}>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE TOTAL AGGREGATE LIABILITY OF INEXOR INC. AND WEALTHNX ARISING OUT OF OR RELATING TO THESE TERMS, THE PLATFORM, OR THE SERVICES WILL NOT EXCEED THE GREATER OF: (A) ONE HUNDRED U.S. DOLLARS (US $100); OR (B) THE AMOUNTS ACTUALLY PAID BY YOU TO WEALTHNX FOR THE SERVICES DURING THE THREE (3) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
          </p>
          <p className="terms-text" style={NOTICE_TEXT}>
            The exclusions and limitations in this Section apply only to the extent permitted by applicable law. Nothing in these Terms excludes or limits liability to the extent such liability cannot lawfully be excluded or limited, including liability arising from fraud, fraudulent misrepresentation, willful misconduct, or any other liability that applicable law prohibits WealthNX from excluding or limiting.
          </p>
        </div>

        <h3 className="terms-h3" style={H3}>9.2 Your Indemnification Obligations</h3>
        <p className="terms-text" style={{ ...P, marginBottom: '10px' }}>
          To the maximum extent permitted by applicable law, you agree to indemnify, defend, and hold harmless Inexor Inc., WealthNX, and their respective affiliates, officers, directors, employees, and agents from and against third-party claims, actions, proceedings, losses, liabilities, damages, judgments, penalties, costs, and reasonable attorneys' fees arising out of or relating to:
        </p>
        <ol className="terms-ol" style={UL}>
          <li style={LI}>your material breach of these Terms;</li>
          <li style={LI}>your unlawful, fraudulent, unauthorized, or prohibited use of the Platform or the Services;</li>
          <li style={LI}>Your Content, including any allegation that Your Content infringes, misappropriates, or otherwise violates another person's intellectual property, privacy, confidentiality, contractual, or other rights;</li>
          <li style={LI}>your submission, uploading, importing, connection, disclosure, or sharing of information that you did not have the lawful authority or necessary permission to provide;</li>
          <li style={LI}>your violation of applicable law, regulation, sanctions requirement, or third-party contractual obligation in connection with your use of the Platform or the Services;</li>
          <li style={LI}>your unauthorized use of another person's External Account, information, or credentials;</li>
          <li style={LI}>your use of household, couples, family-sharing, professional-access, or similar functionality in violation of another person's rights or without required authority or permission; or</li>
          <li style={LI}>your fraud, willful misconduct, or intentional misuse of the Platform or the Services.</li>
        </ol>
        <p className="terms-text" style={P}>
          WealthNX reserves the right, at its expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which case you agree to reasonably cooperate with WealthNX in the defense of that matter.
        </p>
        <p className="terms-text" style={P_LAST}>
          Nothing in this Section requires you to indemnify WealthNX for claims to the extent caused by WealthNX's own fraud, willful misconduct, or other conduct for which indemnification may not lawfully be required.
        </p>

        {/* ═══════════ 10. Termination and Suspension ═══════════ */}
        <h2 className="terms-h2" style={H2}>10. Termination and Suspension</h2>

        <h3 className="terms-h3" style={H3}>10.1 Suspension or Termination by WealthNX</h3>
        <p className="terms-text" style={P}>
          WealthNX may suspend, restrict, limit, revoke, or terminate your access to all or part of the Platform or the Services where reasonably necessary, including if: (a) you violate or are reasonably suspected of violating these Terms or applicable law; (b) your use presents a security, fraud, abuse, legal, regulatory, sanctions, or other material risk to WealthNX, another user, a Third-Party Provider, or another person; (c) required by law, regulation, court order, governmental authority, or other legal process; (d) a Third-Party Provider restricts or discontinues functionality necessary to provide the applicable Service; (e) you fail to pay applicable subscription fees; (f) your account has been inactive for an extended period, subject to applicable law and any notice requirements; or (g) WealthNX modifies, suspends, or discontinues the applicable Service or feature.
        </p>
        <p className="terms-text" style={P_LAST}>
          Where reasonably practicable and required by applicable law, WealthNX will provide notice of termination or material restriction. WealthNX may suspend or restrict access without advance notice where reasonably necessary to address security threats, fraud, misuse, legal or regulatory requirements, sanctions concerns, or other circumstances requiring prompt action.
        </p>

        <h3 className="terms-h3" style={H3}>10.2 Termination by You</h3>
        <p className="terms-text" style={P}>
          You may terminate your account at any time through account-deletion functionality made available through the Platform or by contacting WealthNX Support at <a href="mailto:support@wealthnx.ai" style={LINK}>support@wealthnx.ai</a>.
        </p>
        <p className="terms-text" style={P}>
          Termination of your WealthNX account does not necessarily cancel a paid subscription purchased through the Apple App Store, Google Play, or another Third-Party Provider. You remain responsible for cancelling such subscriptions through the applicable marketplace or provider in accordance with Section 6.
        </p>
        <p className="terms-text" style={P_LAST}>
          Similarly, cancelling a subscription does not automatically terminate or delete your WealthNX account.
        </p>

        <h3 className="terms-h3" style={H3}>10.3 Effect of Termination</h3>
        <p className="terms-text" style={P}>
          Upon termination of your account, your right and license to access and use the Platform and the Services will end, except to the extent WealthNX expressly permits limited access or as otherwise required by applicable law.
        </p>
        <p className="terms-text" style={P}>
          Termination or account deletion does not necessarily result in the immediate deletion of all Your Content or Personal Information. WealthNX may retain information following termination to the extent and for the periods described in the WealthNX Privacy Policy, including where retention is reasonably necessary to comply with legal, regulatory, security, fraud-prevention, dispute-resolution, recordkeeping, or other legitimate obligations permitted by applicable law.
        </p>
        <p className="terms-text" style={P}>
          Termination will not affect rights, obligations, liabilities, payment obligations, or claims that accrued before termination.
        </p>
        <p className="terms-text" style={P_LAST}>
          Any provisions of these Terms that by their nature should survive termination will survive, including Section 1.2 (Prohibited Conduct), Section 1.3 (Third-Party Interactions), Section 1.4 (Sanctions and Restricted Persons), Section 1.6 (No Advice, Brokering, or Execution), Section 2.3 (Your Content), Section 3 (Using or Linking Third-Party Accounts), Section 4 (Third-Party Service Providers; Authorization to Share), Section 5 (Our License; Data Use and Outputs), applicable provisions of Section 6 (Payments, Subscriptions, and Billing), Section 7 (Security, Privacy, and Compliance), Section 8 (Important Disclaimers), Section 9 (Liability Limitations; Indemnification), this Section 10.3, and those provisions of Section 11 that by their nature are intended to survive termination.
        </p>

        {/* ═══════════ 11. Miscellaneous ═══════════ */}
        <h2 className="terms-h2" style={H2}>11. Miscellaneous</h2>

        <h3 className="terms-h3" style={H3}>11.1 License to You</h3>
        <p className="terms-text" style={P}>
          Subject to your compliance with these Terms, WealthNX grants you a limited, revocable, non-exclusive, non-transferable, and non-sublicensable license to access and use the Platform and the Services for the purposes permitted under these Terms.
        </p>
        <p className="terms-text" style={P}>
          Except as expressly permitted by these Terms or applicable law, you may not copy, modify, adapt, translate, reproduce, decompile, disassemble, reverse engineer, sell, distribute, sublicense, rent, lease, lend, pledge, assign, commercially exploit, or otherwise transfer the Platform, the Services, or any underlying software, technology, or related rights without WealthNX's prior written authorization.
        </p>
        <p className="terms-text" style={P_LAST}>
          Nothing in this Section grants you ownership of the Platform, the Services, or any intellectual property owned or licensed by WealthNX.
        </p>

        <h3 className="terms-h3" style={H3}>11.2 Ownership of Intellectual Property</h3>
        <p className="terms-text" style={P}>
          The Platform, the Services, software, source code, object code, interfaces, designs, workflows, databases, analytics engines, artificial intelligence systems, models, algorithms, methodologies, documentation, graphics, trademarks, service marks, trade names, branding, and other technology, materials, and intellectual property made available by WealthNX, together with all associated intellectual property rights, are and will remain the property of WealthNX, its affiliates, or its licensors, as applicable.
        </p>
        <p className="terms-text" style={P}>
          Your Content remains yours as provided in Section 2.3 and Section 5 of these Terms. Nothing in this Section transfers ownership of Your Content to WealthNX.
        </p>
        <p className="terms-text" style={P_LAST}>
          Except for the limited license expressly granted under these Terms, no license or other right in WealthNX intellectual property is granted to you by implication, estoppel, or otherwise.
        </p>

        <h3 className="terms-h3" style={H3}>11.3 Modifications to These Terms</h3>
        <p className="terms-text" style={P}>
          WealthNX may update or modify these Terms from time to time to reflect changes to the Platform or the Services, business practices, technologies, legal or regulatory requirements, or other relevant circumstances.
        </p>
        <p className="terms-text" style={P}>
          When we modify these Terms, we will update the "Last Updated" date displayed with the Terms. Where required by applicable law, or where a modification materially affects your rights or obligations, we will provide additional notice through the Platform, by email, or through other reasonable means and will obtain consent where required by applicable law.
        </p>
        <p className="terms-text" style={P_LAST}>
          Unless otherwise specified, updated Terms will become effective on the date stated in the updated Terms or applicable notice. Your continued use of the Platform or the Services after the updated Terms become effective constitutes acceptance of the updated Terms to the extent permitted by applicable law. If you do not agree to the updated Terms, you must discontinue use of the Platform and the Services and may terminate your account in accordance with Section 10.
        </p>

        <h3 className="terms-h3" style={H3}>11.3 Electronic Communications; Notices</h3>
        <p className="terms-text" style={P}>
          By creating an account or using the Platform or the Services, you agree that WealthNX may provide agreements, disclosures, notices, receipts, confirmations, account information, security notices, service communications, and other communications relating to the Platform or the Services electronically, including by email, in-app notification, push notification, or other electronic means supported by the Services. Electronic communications will satisfy requirements that communications be provided in writing to the extent permitted by applicable law.
        </p>
        <p className="terms-text" style={P}>
          Transactional, administrative, account, security, legal, and other non-marketing communications may be sent where reasonably necessary to operate the Services or satisfy applicable obligations. Marketing communications will be subject to applicable law and available consent, unsubscribe, or opt-out mechanisms.
        </p>
        <p className="terms-text" style={P_LAST}>
          Notices required or permitted to be provided to WealthNX under these Terms may be sent to <a href="mailto:support@wealthnx.ai" style={LINK}>support@wealthnx.ai</a> or through another notice method expressly designated by WealthNX.
        </p>

        <h3 className="terms-h3" style={H3}>11.4 Governing Law</h3>
        <p className="terms-text" style={P_LAST}>
          These Terms and any dispute arising out of or relating to these Terms, the Platform, or the Services will be governed by the laws of the State of Florida, without regard to its conflict-of-laws principles, except to the extent that applicable law in a user's jurisdiction provides mandatory rights or protections that cannot lawfully be waived or displaced by this choice of law.
        </p>

        <div className="terms-notice" style={NOTICE_LAST}>
          <h3 className="terms-h3" style={NOTICE_TITLE}>11.5 Mandatory Individual Arbitration; Agreement to Arbitrate</h3>
          <p className="terms-text" style={{ ...NOTICE_TEXT, fontWeight: 'bold' }}>
            PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS. EXCEPT FOR THE LIMITED MATTERS EXPRESSLY EXCLUDED BELOW, YOU AND WEALTHNX AGREE THAT ANY DISPUTE BETWEEN YOU AND WEALTHNX WILL BE RESOLVED THROUGH FINAL AND BINDING INDIVIDUAL ARBITRATION RATHER THAN IN COURT. YOU AND WEALTHNX ARE EACH WAIVING THE RIGHT TO HAVE SUCH DISPUTES DECIDED BY A JUDGE OR JURY AND, TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, THE RIGHT TO PARTICIPATE IN A CLASS, COLLECTIVE, CONSOLIDATED, OR REPRESENTATIVE ACTION.
          </p>
        </div>

        <h3 className="terms-h3" style={H3}>11.6 Scope of Arbitration Agreement</h3>
        <p className="terms-text" style={P}>
          To the fullest extent permitted by applicable law, you and WealthNX agree that any past, present, or future dispute, claim, controversy, or cause of action arising out of or relating in any way to: (a) these Terms or any prior version of these Terms; (b) the Platform or the Services; (c) your account, subscription, purchase, payment, cancellation, or use or attempted use of the Services; (d) any information, content, communication, advertisement, representation, disclosure, feature, functionality, Output, artificial intelligence or automated functionality, Third-Party Provider integration, or data made available through or relating to the Services; (e) the collection, use, disclosure, processing, security, retention, or deletion of information in connection with the Services; or (f) any aspect of the relationship between you and WealthNX (collectively, a "<strong>Claim</strong>") will be resolved exclusively through final and binding individual arbitration, except as expressly provided in this Section. This Arbitration Agreement is intended to be interpreted broadly and applies regardless of whether a Claim arises under contract, statute, regulation, ordinance, tort (including fraud, misrepresentation, negligence, or any other intentional or unintentional tort), common law, equity, or any other legal theory and regardless of the type of relief sought.
        </p>
        <p className="terms-text" style={P_LAST}>
          For purposes of this Arbitration Agreement, "WealthNX" includes Inexor Inc., WealthNX, their past, present, and future parents, subsidiaries, affiliates, successors, assigns, and, to the extent a Claim relates to their actions on behalf of WealthNX, their respective officers, directors, employees, agents, representatives, and service providers.
        </p>

        <h3 className="terms-h3" style={H3}>11.7 Federal Arbitration Act</h3>
        <p className="terms-text" style={P_LAST}>
          This Arbitration Agreement evidences a transaction involving interstate commerce and will be governed by and enforced under the Federal Arbitration Act, 9 U.S.C. §§ 1–16 ("<strong>FAA</strong>"), to the fullest extent applicable.
        </p>

        <h3 className="terms-h3" style={H3}>11.8 Delegation of Arbitrability</h3>
        <p className="terms-text" style={P_LAST}>
          Except for disputes that applicable law requires a court to determine, you and WealthNX agree that the arbitrator, and not any federal, state, or local court or agency, will have exclusive authority to resolve disputes concerning the interpretation, applicability, enforceability, formation, scope, or validity of this Arbitration Agreement, including any contention that all or any part of this Arbitration Agreement is void or voidable. Notwithstanding the foregoing, any dispute concerning the enforceability, validity, or effect of the Class and Representative Action Waiver in Section 11.14 will be determined by a court of competent jurisdiction and not by an arbitrator.
        </p>

        <h3 className="terms-h3" style={H3}>11.9 Informal Dispute Resolution Required Before Arbitration</h3>
        <p className="terms-text" style={P}>
          Before commencing arbitration, the party asserting a Claim must provide the other party with an individualized written Notice of Dispute containing: (a) the claimant's full name and, where applicable, the email address associated with the WealthNX account; (b) a reasonably detailed description of the nature and factual basis of the Claim; (c) the specific relief sought, including the amount of any monetary relief sought; and (d) sufficient information to permit the receiving party to evaluate the Claim.
        </p>
        <p className="terms-text" style={P}>
          Notices to WealthNX must be sent to the address or dispute-resolution contact designated by WealthNX for legal notices. WealthNX will send any Notice of Dispute to the contact information associated with your account.
        </p>
        <p className="terms-text" style={P_LAST}>
          The parties will have sixty (60) days after receipt of a compliant Notice of Dispute to attempt in good faith to resolve the Claim informally. Neither party may commence arbitration until this period has expired. To the extent permitted by applicable law, applicable limitation periods and filing-fee deadlines will be tolled during this mandatory informal dispute-resolution period.
        </p>

        <h3 className="terms-h3" style={H3}>11.10 Arbitration Procedures</h3>
        <p className="terms-text" style={P}>
          Arbitration will be administered by the American Arbitration Association ("<strong>AAA</strong>") in accordance with the AAA Consumer Arbitration Rules then in effect and, where applicable, the AAA Mass Arbitration Supplementary Rules, except as modified by this Arbitration Agreement.
        </p>
        <p className="terms-text" style={P}>
          The arbitration will be conducted by a single neutral arbitrator. The arbitrator will apply applicable substantive law consistent with the FAA and these Terms and may award any remedy or relief available to the individual claimant that a court of competent jurisdiction could award under applicable law, but only to the extent necessary to resolve that claimant's individual Claim.
        </p>
        <p className="terms-text" style={P_LAST}>
          For U.S. consumers, arbitration may be conducted remotely, by telephone or video conference, on written submissions, or at another location as provided by applicable AAA rules or required by applicable law. Nothing in these Terms requires a consumer to travel to Florida for an arbitration where applicable law or the AAA Consumer Arbitration Rules provide otherwise.
        </p>

        <h3 className="terms-h3" style={H3}>11.11 Limited Exceptions</h3>
        <p className="terms-text" style={P}>
          Notwithstanding this Arbitration Agreement: (a) either party may bring an individual action in small claims court if the Claim qualifies and remains solely within that court's jurisdiction; (b) either party may seek temporary or preliminary injunctive relief from a court where reasonably necessary to preserve the status quo or prevent imminent and irreparable harm pending arbitration, where permitted by applicable law; and (c) nothing in these Terms prevents a user from reporting matters to, communicating with, or filing a complaint with a governmental or regulatory authority where such right cannot lawfully be restricted.
        </p>
        <p className="terms-text" style={P_LAST}>
          The existence of these limited exceptions does not waive arbitration of any other Claim.
        </p>

        <h3 className="terms-h3" style={H3}>11.12 Claims Not Subject to Arbitration</h3>
        <p className="terms-text" style={P}>
          If a particular Claim is finally determined not to be subject to arbitration, then, except where applicable mandatory law provides otherwise, that Claim will be brought exclusively in the appropriate state or federal court located in Orange County, Florida, and you and WealthNX consent to the personal jurisdiction and venue of those courts.
        </p>
        <p className="terms-text" style={P_LAST}>
          If some Claims are arbitrable and others are not, the arbitrable Claims will proceed in arbitration and, to the fullest extent permitted by applicable law, any non-arbitrable judicial proceeding will be stayed pending completion of the arbitration.
        </p>

        <h3 className="terms-h3" style={H3}>11.13 International Users</h3>
        <p className="terms-text" style={P_LAST}>
          For users located outside the United States, this Arbitration Agreement and the Florida forum provisions apply only to the extent permitted by applicable law. Nothing in these Terms eliminates any mandatory consumer right, forum, remedy, or dispute-resolution mechanism that cannot lawfully be waived under the law applicable to that user.
        </p>

        <div className="terms-notice" style={NOTICE_LAST}>
          <h3 className="terms-h3" style={NOTICE_TITLE}>11.14 Class, Collective, Consolidated, and Representative Action Waiver</h3>
          <p className="terms-text" style={{ ...NOTICE_TEXT, marginBottom: '14px', fontWeight: 'bold' }}>
            TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, YOU AND WEALTHNX AGREE THAT EACH PARTY MAY BRING CLAIMS AGAINST THE OTHER ONLY IN AN INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF, CLAIMANT, CLASS MEMBER, CLASS REPRESENTATIVE, PRIVATE ATTORNEY GENERAL, OR PARTICIPANT IN ANY PURPORTED CLASS, COLLECTIVE, CONSOLIDATED, COORDINATED, REPRESENTATIVE, OR SIMILAR PROCEEDING.
          </p>
          <p className="terms-text" style={{ ...NOTICE_TEXT, marginBottom: '14px', fontWeight: 'bold' }}>
            TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, THE ARBITRATOR MAY NOT CONSOLIDATE THE CLAIMS OF MORE THAN ONE PERSON OR PRESIDE OVER ANY FORM OF CLASS, COLLECTIVE, CONSOLIDATED, OR REPRESENTATIVE PROCEEDING, EXCEPT TO THE EXTENT EXPRESSLY REQUIRED BY APPLICABLE AAA RULES GOVERNING PROPERLY FILED MASS ARBITRATIONS OR BY APPLICABLE LAW.
          </p>
          <p className="terms-text" style={{ ...NOTICE_TEXT, marginBottom: '14px' }}>
            Any relief awarded in arbitration may be awarded only in favor of the individual party seeking relief and only to the extent necessary to resolve that party's individual Claim, except where applicable law requires otherwise.
          </p>
          <p className="terms-text" style={{ ...NOTICE_TEXT, marginBottom: '14px' }}>
            If a court of competent jurisdiction finally determines that applicable law prohibits enforcement of this Section with respect to a particular Claim or request for relief, that Claim or request for relief will proceed in court only to the extent required by applicable law, while all remaining arbitrable Claims will remain subject to individual arbitration.
          </p>
          <p className="terms-text" style={NOTICE_TEXT}>
            Nothing in this Section prevents the application of AAA procedures applicable to multiple properly filed individual arbitration demands.
          </p>
        </div>

        <div className="terms-notice" style={NOTICE_LAST}>
          <h3 className="terms-h3" style={NOTICE_TITLE}>11.15 Waiver of Jury Trial</h3>
          <p className="terms-text" style={{ ...NOTICE_TEXT, marginBottom: '14px', fontWeight: 'bold' }}>
            TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, YOU AND WEALTHNX KNOWINGLY, INTENTIONALLY, AND VOLUNTARILY WAIVE ANY RIGHT TO A TRIAL BY JURY WITH RESPECT TO ANY CLAIM ARISING OUT OF OR RELATING TO THESE TERMS, THE PLATFORM, THE SERVICES, OR THE RELATIONSHIP BETWEEN YOU AND WEALTHNX THAT IS PERMITTED OR REQUIRED TO PROCEED IN COURT RATHER THAN ARBITRATION.
          </p>
          <p className="terms-text" style={NOTICE_TEXT}>
            THIS WAIVER DOES NOT APPLY WHERE THE RIGHT TO A JURY TRIAL CANNOT LAWFULLY BE WAIVED.
          </p>
        </div>

        <div className="terms-contact-box" style={{
          lineHeight: '1.8',
          fontSize: '14px',
          padding: '16px 20px',
          backgroundColor: '#1a1a1a',
          borderRadius: '8px',
          border: '1px solid #2a2a2a',
          marginBottom: '40px'
        }}>
          <p style={{ margin: '0 0 8px', color: '#d4d4d4' }}>
            <strong style={{ color: '#ffffffff' }}>Contact Information</strong>
          </p>
          <p style={{ margin: '0', color: '#d4d4d4' }}>
            Support: <a href="mailto:support@wealthnx.ai" style={LINK}>support@wealthnx.ai</a>
          </p>
        </div>
      </main>

      <footer className="terms-footer" style={{
        padding: '30px 20px',
        borderTop: '1px solid #2a2a2a',
        textAlign: 'center',
        fontSize: '13px',
        color: '#666'
      }}>
        <p style={{ margin: 0 }}>
          © 2026 WealthNX. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default TermsAndConditions;
