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

const PrivacyPolicy = () => {
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

      <main className="privacy-main" style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '60px 20px 40px'
      }}>
        <h1 className="privacy-title" style={{
          color: '#ffffff',
          fontSize: '36px',
          fontWeight: '700',
          marginBottom: '12px',
          textAlign: 'center'
        }}>
          Privacy Policy
        </h1>
        <p className="privacy-title privacy-effective" style={{
          textAlign: 'center',
          color: '#8a8a8a',
          fontSize: '13px',
          marginBottom: '40px'
        }}>
          Last Updated: August 20, 2026
        </p>

        {/* ── Intro ── */}
        <div className="privacy-intro" style={P}>
          <p style={{ marginBottom: '14px' }}>
            Welcome to Wealth Genie, available through the WealthNX.ai platform, an AI-enabled financial information, analytics, and money-management environment ("<strong>Wealth Genie</strong>" or the "<strong>Platform</strong>") that provides users with various tools and features (the "<strong>Services</strong>"), as further described in the WealthNX.ai Terms and Conditions.
          </p>
          <p style={{ marginBottom: '14px' }}>
            The Platform and the Services are software made available by Inexor Inc. (including its operators and affiliates, "<strong>we</strong>," "<strong>our</strong>," or "<strong>us</strong>") and are subject to the WealthNX.ai Terms and Conditions. This Privacy Policy ("<strong>Policy</strong>") describes how we collect, use, disclose, retain, and otherwise process Personal Information and Personal Data in connection with the Platform and the Services.
          </p>
          <p style={{ marginBottom: '14px' }}>
            This Policy applies to information processed in connection with your access to or use of the Platform and the Services, including through our websites, mobile or desktop applications, application programming interfaces (APIs), integrations, beta or pre-release environments, data feeds, analytics tools, communications, and other digital properties or services operated, maintained, or controlled by us that link to or reference this Policy.
          </p>
          <p style={{ marginBottom: '0' }}>
            The availability of particular Services and features may vary depending on your location, jurisdiction, eligibility, and the availability of applicable third-party services. Certain Services may be available outside the United States, including functionality that permits users to manually enter, organize, track, or analyze financial information, while other Services or features may be limited to the 50 states of the United States and the District of Columbia or other specifically supported jurisdictions, as further described in this Policy.
          </p>
        </div>

        {/* ═══════════ 1. Your Personally Identifiable Information ═══════════ */}
        <h2 className="privacy-h2" style={H2}>1. Your Personally Identifiable Information</h2>

        <h3 className="privacy-h3" style={H3}>1.1 Personal Information Collected</h3>
        <p className="privacy-text" style={P}>
          We collect information that you voluntarily provide via the Platform, when using or accessing the Services, when connecting any third-party accounts, or in connection with your interactions with our partners or suppliers or with Third-Party Providers (as that term is defined under the WealthNX.ai Terms and Conditions). The information you submit might include your name, company information, street address, email address, phone number, and, in some cases as might be collected by Third-Party Providers, social security number or other tax ID number. We consider this information to be your personally identifiable information (your "<strong>PII</strong>"). Unless we have your complete street address or otherwise unless such information can be reasonably linked to you personally, we do not consider your city, state, ZIP code, or general geographic location (including as it might be deduced based on your IP address) to be your PII. We collect information about the devices, software, and networks you use to access the Platform or the Services (including but not limited to IP address, unique device or session identifiers, device type, operating system, browser or client, referral URLs, session timestamps, feature usage metrics, system activity logs, performance data, error reports, audit logs, security events, and crash diagnostics). Certain elements of this information may constitute "Personal Information" or "Personal Data" under applicable state, federal, or international privacy or data protection laws. We also may collect the content of messages, prompts, file attachments, and AI model context that you submit using the Platform or the Services, as well as the outputs provided to you by the Platform or the Services. Users retain ownership of content, prompts, files, account information, and other information submitted through the Platform and Services. WealthNX receives only the limited rights necessary to provide, operate, maintain, secure, support, and improve the Services as described in the Terms and Conditions. We may collect financial account information authorized by users, including account balances, transaction histories, holdings, positions, investment performance information, linked account metadata, and digital asset wallet information. We may also collect information about you from other sources, including from our affiliates, partners, service providers, analytics providers, security and fraud-prevention providers, publicly available sources, and third parties with whom you have authorized a connection, integration, or data sharing arrangement. We may combine such information with information we collect directly from you or automatically through your use of the Platform or the Services.
        </p>
        <p className="privacy-text" style={P}>
          Depending on the features you choose to use, we may also collect, receive, generate, or process additional information that you provide directly, import, upload, or authorize us to access. This may include manually entered or imported financial information; uploaded receipts, invoices, documents, images, and information extracted from such materials; financial goals, budgeting information, and user-defined financial preferences; information used to generate retirement forecasts, financial scenarios, or other projections; information provided for tax estimation or simulation features; property, real estate, alternative asset, equity compensation, and other asset or liability information; and information generated through the use of these features.
        </p>
        <p className="privacy-text" style={P}>
          Where available and enabled by you, the Services may also process credit-related information, including credit scores, credit-score factors, credit-monitoring information, or related data obtained from authorized third-party providers. The availability, source, and scope of such information may vary depending on the applicable feature and provider.
        </p>
        <p className="privacy-text" style={P}>
          If you use household, couples, family-sharing, or similar collaborative features, we may collect and process information relating to the persons you invite, their participation in the shared environment, permissions and access settings, information they choose to share, and financial or other information made available within the shared environment. If you invite an accountant, financial adviser, or other third party to access information through the Services, we may also process information necessary to establish, administer, authenticate, monitor, and terminate that access.
        </p>
        <p className="privacy-text" style={P_LAST}>
          Certain features may allow you to interact with the Services using voice. Where Voice AI is enabled, spoken input may be converted into text for processing by the Services. Information derived from voice interactions, including transcripts, prompts, resulting outputs, and related interaction data, may otherwise be processed in accordance with this Policy.
        </p>

        <h3 className="privacy-h3" style={H3}>1.2 Use of Your Personal Information</h3>
        <p className="privacy-text" style={P}>
          We may use information described in this Policy, including your PII, to provide, operate, maintain, secure, support, personalize, and improve the Platform and the Services; administer your account; fulfill your requests; respond to your questions; communicate with you regarding the Platform, the Services, and other products or services offered by us or our partners or suppliers; and provide features and functionality that you choose to use.
        </p>
        <p className="privacy-text" style={P}>
          Depending on the features you use, we may process information to provide and support account aggregation, transaction analysis and categorization, budgeting, financial goal tracking, asset and liability tracking and valuation, investment and digital asset tracking, retirement and scenario forecasting, tax estimation or simulation, credit-related features, receipt and document processing, artificial intelligence and automated analytics, voice-enabled features, household, couples, or family-sharing functionality, and access that you authorize for accountants, financial advisers, or other third parties.
        </p>
        <p className="privacy-text" style={P}>
          Where the Services generate estimates, classifications, forecasts, projections, scenarios, analyses, insights, or other derived information, we may process information that you provide directly, import or upload, authorize us to obtain through connected accounts or Third-Party Providers, or that is generated through your use of the Services for purposes of producing, displaying, maintaining, and improving such functionality.
        </p>
        <p className="privacy-text" style={P}>
          We may use your contact information, including your email address or phone number, to fulfill your requests, provide administrative or service-related communications, respond to inquiries, and, where permitted by applicable law and subject to applicable choices or consent requirements, communicate with you regarding our products or services or those of our partners or suppliers.
        </p>
        <p className="privacy-text" style={P}>
          We may also aggregate, de-identify, or otherwise process information to produce reports, analytics, research, product and feature improvements, performance measurements, and internal business insights, provided that we handle such information in accordance with applicable law and this Policy. We may use information to monitor and improve the performance, accuracy, reliability, safety, and security of the Platform and the Services, including artificial intelligence and automated features.
        </p>
        <p className="privacy-text" style={P}>
          We may further use information as reasonably necessary to comply with applicable laws, regulations, legal processes, and governmental requests; enforce the WealthNX.ai Terms and Conditions and other agreements; detect, prevent, investigate, and respond to fraud, misuse, security incidents, or other harmful or unlawful activity; maintain appropriate records; and protect the rights, property, safety, and security of WealthNX, our users, our partners and suppliers, and others.
        </p>
        <p className="privacy-text" style={P}>
          Information may be disclosed to Third-Party Providers, partners, suppliers, or other persons or entities as described in this Policy, including where necessary to provide the Services or where you have requested, authorized, or enabled the relevant connection, sharing arrangement, feature, or access.
        </p>
        <p className="privacy-text" style={P_LAST}>
          We do not sell your PII to third parties. We use and disclose PII only for the purposes described in this Policy or as otherwise permitted or required by applicable law.
        </p>

        <h3 className="privacy-h3" style={H3}>1.3 Disclosure of Your Personal Information</h3>
        <p className="privacy-text" style={P}>
          We may disclose information described in this Policy, including your PII, to third parties where reasonably necessary to provide, operate, maintain, secure, support, or improve the Platform and the Services, where you have requested or authorized the disclosure, or as otherwise permitted or required by applicable law.
        </p>
        <p className="privacy-text" style={P}>
          We may disclose such information to: (a) third-party service providers, consultants, advisors, auditors, professional firms, analytics providers, security and fraud-prevention providers, artificial intelligence and technology providers, account connectivity providers, hosting and infrastructure providers, communications providers, document and receipt processing providers, and other partners or suppliers that provide products or services to us or assist us in operating, securing, supporting, or improving the Platform or the Services; (b) a potential acquirer, successor, investor, lender, or other participant in connection with an actual or proposed merger, acquisition, financing, reorganization, bankruptcy, dissolution, sale of assets, or similar corporate transaction; (c) regulators, law enforcement authorities, courts, government agencies, or other persons where disclosure is required or permitted by applicable law, regulation, subpoena, court order, or legal process, or is reasonably necessary to enforce the WealthNX.ai Terms and Conditions or other agreements; and (d) other third parties where reasonably necessary to detect, prevent, investigate, or respond to fraud, misuse, security incidents, unlawful activity, or threats to the rights, property, safety, or security of WealthNX, our users, the Platform, the Services, our partners or suppliers, or others.
        </p>
        <p className="privacy-text" style={P}>
          Where you choose to connect a bank, brokerage, digital asset exchange, credit-related service, or other third-party account or service, information may be transmitted to or received from the applicable Third-Party Provider as necessary to establish, maintain, and support the connection and provide the requested Services. When users connect financial accounts through Plaid or another account connectivity provider, information may be transmitted to and received from such providers for purposes of providing and supporting the Services. Where applicable, WealthNX seeks to process consumer-authorized financial account information in a manner consistent with applicable consumer financial data access requirements.
        </p>
        <p className="privacy-text" style={P}>
          Where you choose to use household, couples, family-sharing, or similar collaborative features, information may be disclosed to persons whom you invite or authorize to participate in the shared environment, subject to the permissions and functionality available through the Services. Similarly, where you choose to invite or authorize an accountant, financial adviser, or other third party to access information through the Services, information may be made available to that person in accordance with the access and permissions you authorize. You are responsible for ensuring that you have the authority to provide or share information made available through such features.
        </p>
        <p className="privacy-text" style={P}>
          We may disclose information to authorized service providers that process information on our behalf, including providers supporting artificial intelligence and machine learning functionality, automated analytics, document or receipt processing, voice-enabled functionality, tax or credit-related features, data aggregation, hosting, infrastructure, security, communications, and other functionality made available through the Services. Such information may include prompts, uploaded or imported content, linked financial account information, transaction information, documents and information extracted from them, voice-derived information, and other contextual information where necessary to provide the applicable functionality. We seek to use service providers subject to appropriate contractual, technical, and organizational safeguards consistent with applicable law and the nature of the information and services involved.
        </p>
        <p className="privacy-text" style={P}>
          We may also disclose PII in an encoded, hashed, aggregated, or de-identified form where appropriate and in accordance with applicable law. Any disclosure to social media, analytics, advertising, or similar providers will be made in accordance with this Policy, applicable law, and the privacy choices available to you.
        </p>
        <p className="privacy-text" style={P}>
          Except where you independently authorize a connection, disclosure, or third-party access arrangement, we seek to require service providers processing PII on our behalf to use such information only as necessary to provide services to WealthNX or you, or for other purposes permitted by applicable law and applicable contractual arrangements.
        </p>
        <p className="privacy-text" style={P_LAST}>
          Where Personal Information is disclosed internationally, such disclosures and transfers will be handled as described in Section 1.10 of this Policy and in accordance with applicable law.
        </p>

        <h3 className="privacy-h3" style={H3}>1.4 Your Geolocation Information</h3>
        <p className="privacy-text" style={P}>
          When you access or use the Platform or the Services, we may collect or derive general geolocation information, such as your city, state, region, or country, from your IP address, device information, cookies, or similar technologies. Unless expressly disclosed and permitted by you, the Services do not collect precise geolocation information from your device.
        </p>
        <p className="privacy-text" style={P}>
          We may use general geolocation information to operate and secure the Platform and the Services, perform analytics, support communications and other business functions, detect or prevent fraud or misuse, comply with applicable legal or regulatory requirements, and determine whether you are accessing the Platform or the Services from a jurisdiction in which access may be restricted under the WealthNX.ai Terms and Conditions.
        </p>
        <p className="privacy-text" style={P}>
          You may be able to limit certain location-related collection through your browser, device, or cookie settings, although some general location information may still be derived from your IP address or other technical information when you access the Services. Limiting such information may affect the availability or functionality of certain features.
        </p>
        <p className="privacy-text" style={P_LAST}>
          We may block, restrict, or otherwise limit access to the Platform or the Services where reasonably necessary to enforce geographic restrictions, comply with applicable law or the WealthNX.ai Terms and Conditions, protect the Platform or the Services, or address suspected fraud, misuse, or circumvention of geographic restrictions. We may also decline or restrict registration or access where we are unable to reasonably determine whether a user satisfies applicable geographic eligibility requirements.
        </p>

        <h3 className="privacy-h3" style={H3}>1.5 Your Responses to Surveys or Emails</h3>
        <p className="privacy-text" style={P}>
          We may from time to time administer, or work with third-party service providers to administer, surveys, questionnaires, feedback requests, or similar communications to users of the Platform or the Services, or to visitors to websites or social media profiles under our control. We may use information voluntarily provided through such communications to understand user experiences and preferences, improve the Platform and the Services, conduct research and analytics, develop or improve products, services, or features, and support our business and marketing activities.
        </p>
        <p className="privacy-text" style={P}>
          We may use your email address, phone number, or other contact information to send administrative, transactional, service-related, security, billing, or other communications relating to your account or use of the Platform or the Services. Where permitted by applicable law, we may also send marketing or promotional communications regarding WealthNX products, services, features, or offers.
        </p>
        <p className="privacy-text" style={P_LAST}>
          You may opt out of receiving marketing or other non-essential communications by using the unsubscribe mechanism provided in the applicable communication or by contacting us at <a href="mailto:support@wealthnx.ai" style={LINK}>support@wealthnx.ai</a>. Opting out of marketing communications will not prevent us from sending administrative, transactional, security, billing, or other service-related communications that are necessary or appropriate in connection with your account or the Services. Where communications are subject to additional consent, opt-out, or other requirements under applicable law, we will process such communications in accordance with those requirements.
        </p>

        <h3 className="privacy-h3" style={H3}>1.6 How Long We Keep Your Information</h3>
        <p className="privacy-text" style={P}>
          We retain Personal Information, including PII, for as long as reasonably necessary to provide, operate, maintain, secure, and support the Platform and the Services; maintain your account and subscriptions; provide features you choose to use; fulfill the purposes described in this Policy; and comply with applicable legal, regulatory, contractual, accounting, tax, security, and recordkeeping obligations.
        </p>
        <p className="privacy-text" style={P}>
          The applicable retention period may vary depending on the nature of the information, the feature or Service through which it was collected or generated, the purposes for which it is processed, whether your account remains active, applicable legal or regulatory requirements, and whether the information is reasonably necessary to establish, exercise, or defend legal claims, investigate or respond to complaints, disputes, fraud, misuse, or security incidents, or enforce our agreements.
        </p>
        <p className="privacy-text" style={P}>
          Information associated with particular features, including linked financial account information, imported or manually entered financial information, uploaded documents or receipts and information extracted from them, AI prompts and outputs, voice-derived transcripts or interaction data, financial goals and budgets, forecasts and simulations, tax-related inputs and estimates, credit-related information, household or family-sharing information, and records relating to authorized third-party access, may be retained in accordance with the applicable retention periods established for those categories of information and the purposes for which they are processed.
        </p>
        <p className="privacy-text" style={P}>
          When you close your account or discontinue a particular Service or feature, we may retain certain information for a reasonable period where necessary for the purposes described above. Where information is no longer reasonably necessary and no longer subject to an applicable retention requirement, we will delete, anonymize, de-identify, or otherwise dispose of it in accordance with our applicable retention and deletion practices and applicable law.
        </p>
        <p className="privacy-text" style={P}>
          Where you request deletion of Personal Information, we will process the request in accordance with applicable law and the rights and exceptions described in this Policy. Certain information may continue to be retained where permitted or required by law, including for legal, regulatory, security, fraud-prevention, dispute-resolution, or recordkeeping purposes.
        </p>
        <p className="privacy-text" style={P_LAST}>
          Information that you voluntarily make publicly available, including through a public website, social media profile, forum, publication, or other public communication, may remain publicly accessible after deletion from our systems due to copies, archives, search-engine indexing, third-party republication, or other circumstances outside our reasonable control.
        </p>

        <h3 className="privacy-h3" style={H3}>1.7 Your Participation in Beta Software Testing</h3>
        <p className="privacy-text" style={P}>
          If you access or use any beta, pilot, pre-release, experimental, or testing version of the Platform, the Services, or any feature, you may be invited to provide bug reports, information regarding actual or suspected errors or defects, evaluations, suggestions, comments, or other feedback regarding your experience (collectively, "<strong>Feedback</strong>") through channels designated by us.
        </p>
        <p className="privacy-text" style={P}>
          You should not include confidential information belonging to you or any third party, Personal Information that is not necessary for the Feedback, financial account credentials, payment information, or other sensitive information in any Feedback you submit. If Feedback contains Personal Information, we will process that information in accordance with this Privacy Policy.
        </p>
        <p className="privacy-text" style={P}>
          We may use Feedback to evaluate, test, develop, maintain, secure, improve, or modify the Platform, the Services, artificial intelligence systems, and existing or future features. Subject to applicable law and the WealthNX.ai Terms and Conditions, Feedback may also be used for internal research, analytics, product development, and other legitimate business purposes.
        </p>
        <p className="privacy-text" style={P}>
          Any use of Feedback in public statements, testimonials, case studies, advertising, or other marketing materials will be subject to applicable law and any consent or authorization required for such use. Providing Feedback does not, by itself, constitute consent for WealthNX to publicly identify you or use your name, likeness, Personal Information, or statements as a testimonial or endorsement.
        </p>
        <p className="privacy-text" style={P_LAST}>
          Any intellectual property rights relating to the Platform, the Services, beta software, features, systems, models, technology, or improvements developed by or on behalf of WealthNX remain governed by the WealthNX.ai Terms and Conditions and applicable law.
        </p>

        <h3 className="privacy-h3" style={H3}>1.8 Contents of Feedback Submitted During Beta Software Testing</h3>
        <p className="privacy-text" style={P}>
          You should not include in Feedback any Personal Information or PII that is not reasonably necessary for the Feedback, including financial account credentials, payment information, government-issued identification numbers, or Personal Information relating to another person without appropriate authorization. You should also avoid submitting confidential or proprietary information belonging to you, your employer, or any third party unless you are authorized to provide such information to us.
        </p>
        <p className="privacy-text" style={P}>
          If you submit Feedback containing Personal Information or other information protected under applicable privacy or data protection laws, we will process such information in accordance with this Privacy Policy and applicable law. The submission of Personal Information as part of Feedback does not remove or limit any rights or protections that apply to such information under applicable law.
        </p>
        <p className="privacy-text" style={P}>
          Feedback may include ideas, suggestions, concepts, comments, bug reports, feature requests, evaluations, or other information relating to the Platform or the Services. Subject to applicable law and the WealthNX.ai Terms and Conditions, you grant WealthNX a non-exclusive, worldwide, royalty-free, perpetual, irrevocable, transferable, and sublicensable license to use, reproduce, modify, adapt, develop, distribute, and otherwise use Feedback for purposes including evaluating, developing, maintaining, securing, supporting, or improving the Platform, the Services, and existing or future products, technologies, and features.
        </p>
        <p className="privacy-text" style={P_LAST}>
          The foregoing license does not authorize WealthNX to publicly disclose your Personal Information or use your name, likeness, identity, statements, or other Personal Information in advertising, testimonials, endorsements, case studies, or other marketing materials except as permitted under this Privacy Policy, with any consent or authorization required by applicable law. Nothing in this Section transfers ownership of your Personal Information to WealthNX or limits any privacy or data protection rights available to you under applicable law.
        </p>

        <h3 className="privacy-h3" style={H3}>1.9 Data Security and Safeguards</h3>
        <p className="privacy-text" style={P}>
          We maintain commercially reasonable administrative, technical, and physical safeguards designed to protect the confidentiality, integrity, availability, and security of Personal Information and Personal Data that we collect, receive, store, transmit, or process. These safeguards may include, as appropriate, access controls, authentication measures, encryption, network and infrastructure security, monitoring and logging, vulnerability and risk management, incident response procedures, data retention and deletion controls, and employee security and privacy training.
        </p>
        <p className="privacy-text" style={P}>
          We maintain an information security management framework designed to identify, assess, and manage risks relating to the security of information processed through the Platform and the Services. WealthNX is ISO/IEC 27001 certified. The scope and applicability of our security controls may vary depending on the systems, Services, information, and third-party providers involved.
        </p>
        <p className="privacy-text" style={P}>
          We also seek to require service providers that process Personal Information or Personal Data on our behalf to maintain appropriate safeguards consistent with the nature of the information processed, the services provided, applicable contractual requirements, and applicable law.
        </p>
        <p className="privacy-text" style={P}>
          No method of transmission over the Internet, electronic storage, or information-processing system is completely secure. Accordingly, while we maintain safeguards designed to protect your information, we cannot guarantee absolute security.
        </p>
        <p className="privacy-text" style={P_LAST}>
          In the event of a suspected or confirmed security incident involving Personal Information or Personal Data, we will investigate and respond to the incident in accordance with our applicable security and incident-response procedures and take reasonable measures to contain, remediate, and mitigate potential harm. Where notification is required by applicable law, we will notify affected individuals, regulators, authorities, or other required parties in accordance with applicable legal requirements.
        </p>

        <h3 className="privacy-h3" style={H3}>1.10 International Data Transfers</h3>
        <p className="privacy-text" style={P}>
          The Platform and the Services are operated from the United States. Personal Information and Personal Data may be transferred to, processed, accessed, or stored in the United States and in other jurisdictions where WealthNX, our partners, suppliers, Third-Party Providers, or service providers operate or maintain facilities.
        </p>
        <p className="privacy-text" style={P}>
          Where Personal Information or Personal Data is transferred across national borders, the laws and data protection standards of the destination jurisdiction may differ from those applicable in your place of residence. We take reasonable steps to protect information transferred internationally in accordance with this Privacy Policy and applicable law.
        </p>
        <p className="privacy-text" style={P}>
          Where required by applicable law, we use appropriate safeguards for international transfers of Personal Information or Personal Data, which may include contractual protections, data processing agreements, standard contractual clauses or other legally recognized transfer mechanisms, as applicable.
        </p>
        <p className="privacy-text" style={P_LAST}>
          Our service providers and Third-Party Providers may process information in jurisdictions other than the jurisdiction in which you reside, subject to applicable contractual requirements, their respective privacy practices where applicable, and applicable law.
        </p>

        <h3 className="privacy-h3" style={H3}>1.11 Automated Processing, AI Outputs, and No Professional Advice</h3>
        <p className="privacy-text" style={P}>
          Certain features of the Platform and the Services rely on automated processing, artificial intelligence models, algorithms, machine learning techniques, and other analytical technologies to generate or support outputs, analyses, insights, classifications, categorizations, forecasts, projections, scenarios, estimates, simulations, valuations, and other informational results.
        </p>
        <p className="privacy-text" style={P}>
          Automated outputs may be generated using information that you provide, manually enter, import, or upload; information obtained through accounts or Third-Party Providers that you authorize us to access; external or third-party data; and information generated through your use of the Platform or the Services. Such outputs may be incomplete, inaccurate, outdated, based on assumptions, or otherwise inappropriate for your particular circumstances.
        </p>
        <p className="privacy-text" style={P}>
          Features involving retirement or other financial forecasting, scenario modelling, tax estimation or simulation, asset or liability valuation, budgeting, financial goal tracking, transaction categorization, credit-related information, or similar analytics may rely on assumptions, estimates, historical information, third-party data, user-provided information, or other variables that may change over time. Any forecast, projection, scenario, simulation, estimate, or valuation is hypothetical or informational in nature and does not represent or guarantee any particular financial, investment, tax, retirement, or other outcome.
        </p>
        <p className="privacy-text" style={P}>
          Outputs provided through the Platform or the Services are for informational, educational, and analytical purposes only and do not constitute legal, financial, investment, tax, accounting, credit, or other professional advice. WealthNX does not act as an investment adviser, broker-dealer, financial planner, tax adviser, accountant, or other licensed professional through the provision of these automated features. Outputs should not be interpreted as personalized investment recommendations, securities recommendations, trading signals, portfolio construction or allocation recommendations, or instructions to buy, sell, or hold any security, digital asset, or other investment.
        </p>
        <p className="privacy-text" style={P}>
          Where the Services provide information relating to financial goals, budgets, retirement scenarios, taxes, credit, investments, or other financial matters, you remain responsible for evaluating the information, assumptions, and outputs and for determining whether to obtain advice from an appropriately qualified professional before making decisions.
        </p>
        <p className="privacy-text" style={P}>
          Automated outputs may change as underlying information, market conditions, assumptions, methodologies, third-party data, or user-provided information changes. Past performance, historical information, forecasts, projections, simulations, estimated returns, or other hypothetical results are not guarantees or reliable indicators of future performance or outcomes.
        </p>
        <p className="privacy-text" style={P_LAST}>
          To the maximum extent permitted by applicable law, WealthNX does not make representations, warranties, or guarantees regarding the accuracy, completeness, timeliness, reliability, availability, or suitability of automated outputs for any particular purpose.
        </p>

        <h3 className="privacy-h3" style={H3}>1.12 Artificial Intelligence Processing</h3>
        <p className="privacy-text" style={P}>
          Certain features of the Platform and the Services rely on artificial intelligence, machine learning technologies, automated analytical systems, and related technologies operated by WealthNX and authorized service providers. Information processed through these systems may include prompts, uploaded or imported content, linked financial account information, transaction data, holdings and investment information, financial goals and budgets, documents and information extracted from them, voice-derived text or transcripts, tax-related inputs, credit-related information, household or shared-account information, and other contextual information necessary to provide the features you choose to use.
        </p>
        <p className="privacy-text" style={P}>
          We may use such information to generate and deliver AI-enabled features, analyses, insights, classifications, categorizations, forecasts, projections, scenarios, estimates, simulations, and other outputs; maintain and improve the performance, reliability, safety, and functionality of the Services; detect and prevent misuse, fraud, or security threats; and evaluate and monitor the quality and compliance of AI-enabled features.
        </p>
        <p className="privacy-text" style={P}>
          Where authorized service providers support artificial intelligence or automated functionality, information may be processed by those providers as necessary to provide the applicable Services, subject to appropriate contractual, technical, and organizational safeguards and applicable law.
        </p>
        <p className="privacy-text" style={P}>
          Unless expressly disclosed to you and authorized where required, WealthNX does not use user financial information, linked account information, prompts, uploaded content, or other Personal Information submitted through the Services to train proprietary artificial intelligence models for unrelated commercial purposes.
        </p>
        <p className="privacy-text" style={P}>
          Where voice-enabled functionality is used, voice-derived information may be processed as described in Section 1.1 of this Policy. Where household, family-sharing, or authorized third-party access features are used, information made available to AI-enabled features will be processed subject to the applicable access and permission settings.
        </p>
        <p className="privacy-text" style={P_LAST}>
          We seek to design, operate, test, monitor, and govern AI-enabled features in accordance with applicable law, this Privacy Policy, the WealthNX.ai Terms and Conditions, and our applicable internal governance and security requirements.
        </p>

        <h3 className="privacy-h3" style={H3}>1.13 Third-Party Websites, Platforms, and Services</h3>
        <p className="privacy-text" style={P}>
          The Platform and the Services may contain links to, integrate with, receive information from, transmit information to, or otherwise enable access to third-party websites, platforms, applications, financial institutions, brokerages, digital asset exchanges, account connectivity providers, credit-related providers, data providers, artificial intelligence providers, tax or financial data providers, and other products, content, or services that are not owned or controlled by WealthNX ("<strong>Third-Party Services</strong>").
        </p>
        <p className="privacy-text" style={P}>
          When you choose to connect, access, or use a Third-Party Service through the Platform or the Services, information may be exchanged between WealthNX and the applicable Third-Party Service as necessary to establish, maintain, and support the connection or provide the functionality you request. Such information may include account information, financial data, transaction information, authentication or connection information, and other information that you authorize or that is necessary to provide the applicable Service.
        </p>
        <p className="privacy-text" style={P}>
          This Policy applies to Personal Information and Personal Data processed by WealthNX. Third-Party Services may independently collect, use, retain, disclose, or otherwise process information in accordance with their own privacy policies, terms, security practices, and legal obligations. WealthNX does not control and, to the extent permitted by applicable law, is not responsible for the independent privacy, security, data-handling, availability, accuracy, or content practices of Third-Party Services.
        </p>
        <p className="privacy-text" style={P}>
          The availability, accuracy, completeness, and timeliness of information obtained from Third-Party Services may depend on the applicable provider and may change, be delayed, become unavailable, or contain errors. WealthNX does not control information maintained by Third-Party Services or changes made by those providers to their systems, services, or data.
        </p>
        <p className="privacy-text" style={P}>
          We encourage you to review the applicable privacy policies, terms, permissions, and other disclosures of any Third-Party Service before connecting an account, enabling an integration, providing information, or otherwise using that Third-Party Service in connection with the Platform or the Services.
        </p>
        <p className="privacy-text" style={P_LAST}>
          Where WealthNX engages a third-party service provider to process Personal Information or Personal Data on our behalf, such processing will be governed by the applicable contractual arrangements and the provisions of this Privacy Policy.
        </p>

        {/* ═══════════ 2. Cookies ═══════════ */}
        <h2 className="privacy-h2" style={H2}>2. Cookies</h2>

        <h3 className="privacy-h3" style={H3}>2.1 What Cookies Are</h3>
        <p className="privacy-text" style={P}>
          We and our partners, suppliers, and authorized service providers may use cookies and similar technologies in connection with the Platform and the Services. Cookies are small text files or other data stored on or accessed through your browser or device when you visit a website or use certain online services. Cookies and similar technologies may collect information about your browser, device, interactions with the Platform or the Services, preferences, and usage activity.
        </p>
        <p className="privacy-text" style={P_LAST}>
          Cookies cannot execute code or independently access files or other content stored on your device. The information collected through cookies and similar technologies may constitute Personal Information or Personal Data under applicable privacy or data protection laws.
        </p>

        <h3 className="privacy-h3" style={H3}>2.2 How We Use Cookies</h3>
        <p className="privacy-text" style={P}>
          We may use cookies and similar technologies for purposes including: (a) providing functionality necessary for the operation of the Platform and the Services; (b) authenticating users and maintaining sessions; (c) remembering settings and preferences; (d) maintaining security and detecting, preventing, or investigating fraud, misuse, or unauthorized activity; (e) measuring and analyzing use, performance, and interactions with the Platform and the Services; and (f) personalization, communications, or marketing where permitted by applicable law.
        </p>
        <p className="privacy-text" style={P_LAST}>
          Some cookies and similar technologies may be necessary for the Platform or the Services to function properly, while others may be optional. Where required by applicable law, we will obtain consent before using non-essential cookies or similar technologies and provide applicable choices regarding their use.
        </p>

        <h3 className="privacy-h3" style={H3}>2.3 Managing, Blocking, or Deleting Cookies</h3>
        <p className="privacy-text" style={P}>
          You may be able to manage, block, or delete cookies through your browser or device settings and, where available, through cookie or privacy controls provided by WealthNX. The methods available for managing cookies may vary depending on the browser, device, and technology you use.
        </p>
        <p className="privacy-text" style={P}>
          If you block or disable cookies or similar technologies that are necessary for core functionality, certain portions of the Platform or the Services may become unavailable or may not function properly. Disabling optional cookies may affect certain personalization, analytics, or other non-essential functionality.
        </p>
        <p className="privacy-text" style={P_LAST}>
          Where required by applicable law, withdrawing consent to optional cookies will not affect the lawfulness of processing that occurred before consent was withdrawn.
        </p>

        <h3 className="privacy-h3" style={H3}>2.4 Do Not Track and Global Privacy Control Signals</h3>
        <p className="privacy-text" style={P}>
          Some browsers and devices allow users to transmit "Do Not Track" signals, Global Privacy Control ("<strong>GPC</strong>") signals, or other privacy preference signals. Because there is not a universally accepted standard for responding to Do Not Track signals, the Platform and the Services may not respond to such signals except where required by applicable law.
        </p>
        <p className="privacy-text" style={P_LAST}>
          Where required by applicable law, including applicable U.S. state privacy laws, WealthNX will recognize and process legally valid GPC or other recognized opt-out preference signals as requests to opt out of the sale or sharing of Personal Information, targeted advertising, or other processing to which such signals legally apply.
        </p>

        {/* ═══════════ 3. Information Collected Through Other Technologies ═══════════ */}
        <h2 className="privacy-h2" style={H2}>3. Information Collected Through Other Technologies</h2>

        <h3 className="privacy-h3" style={H3}>3.1 Web Beacons</h3>
        <p className="privacy-text" style={P}>
          We and our authorized service providers may use web beacons, tracking pixels, clear gifs, and similar technologies in connection with the Platform, the Services, websites, emails, and other electronic communications. These technologies may use unique identifiers to help us understand when a user visits or interacts with the Platform or the Services, views particular content, or opens or interacts with an email or other communication.
        </p>
        <p className="privacy-text" style={P}>
          We may use information collected through these technologies to measure and analyze traffic and usage patterns, understand how users interact with the Platform and the Services, evaluate the effectiveness of communications or campaigns, identify referral sources, improve functionality and performance, maintain security, and support other purposes described in this Policy.
        </p>
        <p className="privacy-text" style={P}>
          Web beacons and similar technologies may operate in conjunction with cookies or other device technologies. Where required by applicable law, we will obtain any required consent before using such technologies for non-essential analytics, marketing, or similar purposes.
        </p>
        <p className="privacy-text" style={P_LAST}>
          You may be able to limit the operation of certain web beacons or similar technologies by managing your cookie preferences, browser or device settings, or communication preferences. Blocking cookies or disabling certain technologies may affect the functionality of web beacons and related features.
        </p>

        <h3 className="privacy-h3" style={H3}>3.2 Local Storage and Similar Technologies</h3>
        <p className="privacy-text" style={P}>
          We and our authorized service providers may use browser-based local storage, device storage, caching technologies, and similar technologies, including HTML5 local storage, IndexedDB, and other storage mechanisms supported by your browser, application, or device. These technologies may store limited information locally to support the operation, security, performance, and functionality of the Platform and the Services.
        </p>
        <p className="privacy-text" style={P}>
          We may use local storage and similar technologies to maintain user sessions, remember settings and preferences, improve performance, support authentication and security, prevent or detect fraud or misuse, maintain certain application functionality, and support other purposes described in this Policy.
        </p>
        <p className="privacy-text" style={P}>
          Information stored through these technologies may constitute Personal Information or Personal Data under applicable privacy or data protection laws and will be handled in accordance with this Policy where applicable.
        </p>
        <p className="privacy-text" style={P_LAST}>
          You may be able to manage or restrict certain local storage technologies through your browser, application, or device settings. Disabling or restricting local storage or similar technologies may affect the availability, functionality, security, or performance of certain features of the Platform or the Services.
        </p>

        <h3 className="privacy-h3" style={H3}>3.3 Targeted Advertising</h3>
        <p className="privacy-text" style={P}>
          We do not enable targeted advertising on, through, or within the Platform or the Services based on Personal Information or Personal Data collected through your use of the Platform or the Services.
        </p>
        <p className="privacy-text" style={P}>
          We may use third-party service providers and technologies to measure the effectiveness of our marketing, understand how users reach or interact with WealthNX, or advertise WealthNX on third-party websites, platforms, or services. Where such activities involve the use or disclosure of Personal Information or Personal Data for targeted advertising, cross-context behavioral advertising, or similar purposes as defined by applicable law, we will provide any notices, consent mechanisms, and opt-out rights required by applicable law.
        </p>
        <p className="privacy-text" style={P_LAST}>
          Where required by applicable law, you may exercise applicable rights to opt out of targeted advertising or related processing as described in this Policy.
        </p>

        {/* ═══════════ 4. Important Restrictions ═══════════ */}
        <h2 className="privacy-h2" style={H2}>4. Important Restrictions</h2>

        <h3 className="privacy-h3" style={H3}>4.1 Geographic Availability</h3>
        <p className="privacy-text" style={P}>
          The availability of the Platform, the Services, and individual features may vary depending on the user's country, state, territory, or other jurisdiction. WealthNX may make certain features available internationally while restricting other features based on applicable law, regulatory requirements, third-party provider availability, contractual restrictions, technical capabilities, or other considerations.
        </p>
        <p className="privacy-text" style={P}>
          <strong>United States.</strong> Users located or domiciled within the 50 states of the United States or the District of Columbia may access those Services and features that WealthNX makes available in their jurisdiction, subject to the WealthNX.ai Terms and Conditions and any feature-specific eligibility requirements or restrictions. Certain Services or features may not be available in every U.S. state or may be subject to additional disclosures, limitations, or requirements under applicable federal or state law.
        </p>
        <p className="privacy-text" style={P}>
          Residents of U.S. states with applicable consumer privacy or data protection laws may have additional rights regarding their Personal Information or Personal Data. Additional U.S. state-specific disclosures and rights are set forth in Section 5 of this Policy.
        </p>
        <p className="privacy-text" style={P}>
          <strong>Outside the United States.</strong> WealthNX may make certain Services or features available to users located outside the United States, including functionality that allows users to manually enter, organize, track, or analyze financial information. The availability of such functionality does not mean that all WealthNX Services or features are available in that jurisdiction. Connected financial accounts, third-party financial data integrations, market data, credit-related features, tax-related features, or other functionality may remain limited to the United States or other specifically supported jurisdictions.
        </p>
        <p className="privacy-text" style={P}>
          Users outside the United States are responsible for determining whether their use of the Platform and the Services is permitted under laws applicable to them. Where WealthNX intentionally makes Services available in a jurisdiction, WealthNX will process Personal Information and Personal Data in accordance with applicable privacy and data protection requirements and the provisions of this Policy.
        </p>
        <p className="privacy-text" style={P}>
          WealthNX does not represent that every Service or feature is available, appropriate, or legally permitted in every jurisdiction. WealthNX may restrict, modify, suspend, or discontinue access to particular Services or features based on location or jurisdiction.
        </p>
        <p className="privacy-text" style={P_LAST}>
          Where geographic restrictions apply to a particular Service or feature, users must not use a virtual private network (VPN), false location information, or other means for the purpose of circumventing those restrictions.
        </p>

        <h3 className="privacy-h3" style={H3}>4.2 Children's Privacy</h3>
        <p className="privacy-text" style={P_LAST}>
          The Platform and the Services are directed to a specific audience but not at children under the age of 18. We do not knowingly collect or solicit personal information from any person under the age of 18 or knowingly allow them to use or interact with the Platform or the Services. If you are under 18, you must not visit, access, or use the Platform or the Services, register an account with us, or participate in or attend any forum, discussion, or event in connection we might host, whether or not hosted in connection with the Platform or the Services. If we obtain actual knowledge that the personal information of a child under age 18 was or is being collected through the Platform or the Services, then we will delete that information as quickly as possible. If you believe we might have collected any information from or about a child under 18, then please contact us immediately by email at <a href="mailto:support@wealthnx.ai" style={LINK}>support@wealthnx.ai</a>.
        </p>

        {/* ═══════════ 5. Supplemental Privacy Notices ═══════════ */}
        <h2 className="privacy-h2" style={H2}>5. Supplemental Privacy Notices</h2>

        <h3 className="privacy-h3" style={H3}>5.1.1 California Residents</h3>
        <p className="privacy-text" style={P}>
          For purposes of this Section 5.1, "<strong>Personal Information</strong>" has the meaning provided under the California Consumer Privacy Act, as amended by the California Privacy Rights Act ("<strong>CCPA</strong>"), and generally includes information that identifies, relates to, describes, is reasonably capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular California consumer or household. Personal Information does not include information excluded from the definition under the CCPA or otherwise exempt from its requirements.
        </p>
        <p className="privacy-text" style={{ ...P, marginBottom: '10px' }}>
          Depending on your use of the Platform and the Services, the categories of Personal Information we may collect or process include:
        </p>
        <ul className="privacy-ul" style={UL}>
          <li style={LI}>identifiers, such as name, postal address, email address, telephone number, IP address, account identifiers, and similar identifiers;</li>
          <li style={LI}>customer-record information, including financial and other information described under applicable California law;</li>
          <li style={LI}>commercial information;</li>
          <li style={LI}>internet, device, and other electronic network activity information;</li>
          <li style={LI}>general geolocation information;</li>
          <li style={LI}>professional or employment-related information;</li>
          <li style={LI}>sensory information, including information associated with voice-enabled features where applicable;</li>
          <li style={LI}>financial information, including account balances, transactions, holdings, positions, investment information, linked-account information, digital asset information, manually entered or imported financial information, and asset and liability information;</li>
          <li style={LI}>information contained in uploaded receipts, documents, images, or files and information extracted from them;</li>
          <li style={LI}>credit-related information where applicable; and</li>
          <li style={LI}>inferences or derived information generated from other Personal Information, including classifications, categorizations, analyses, estimates, forecasts, projections, scenarios, and other information generated through AI or automated features.</li>
        </ul>
        <p className="privacy-text" style={P}>
          We may collect these categories of Personal Information from you directly, automatically through your use of the Platform or the Services, from devices and browsers, from Third-Party Providers or accounts that you authorize us to connect, from our service providers, partners and suppliers, and from other sources described in this Policy.
        </p>
        <p className="privacy-text" style={P}>
          We use and disclose these categories of Personal Information for the business and commercial purposes described in this Policy, including providing, operating, maintaining, securing, supporting, personalizing, and improving the Platform and the Services; providing features requested by users; processing authorized financial information; conducting analytics; maintaining security and preventing fraud or misuse; communicating with users; complying with applicable law; and other purposes described in this Policy.
        </p>
        <p className="privacy-text" style={P}>
          We do not sell Personal Information for monetary consideration. To the extent any disclosure or processing constitutes a "sale" or "sharing" of Personal Information under the CCPA, California residents may exercise applicable opt-out rights as described in this Policy. We retain Personal Information in accordance with Section 1.6 of this Policy and applicable law.
        </p>
        <p className="privacy-text" style={P_LAST}>
          California residents may have the following rights, subject to applicable exceptions and limitations:
        </p>

        <h3 className="privacy-h3" style={H3}>5.1.2 Your Right to Know and Access</h3>
        <p className="privacy-text" style={P_LAST}>
          You may have the right to request that we disclose the categories and specific pieces of Personal Information we have collected about you, the categories of sources from which Personal Information was collected, the business or commercial purposes for collecting, using, selling, or sharing Personal Information, the categories of third parties to whom we disclose Personal Information, and other information required by applicable law.
        </p>

        <h3 className="privacy-h3" style={H3}>5.1.3 Your Right to Request Deletion</h3>
        <p className="privacy-text" style={P_LAST}>
          You may have the right to request deletion of Personal Information that we have collected from you, subject to exceptions permitted by applicable law, including where retention is reasonably necessary to provide the Services, maintain security, prevent fraud, comply with legal obligations, exercise or defend legal claims, or for other purposes permitted under the CCPA.
        </p>

        <h3 className="privacy-h3" style={H3}>5.1.4 Your Right to Correct Inaccurate Personal Information</h3>
        <p className="privacy-text" style={P_LAST}>
          You may have the right to request correction of inaccurate Personal Information that we maintain about you, taking into account the nature of the Personal Information and the purposes for which it is processed.
        </p>

        <h3 className="privacy-h3" style={H3}>5.1.5 Your Right to Opt Out of Sale or Sharing</h3>
        <p className="privacy-text" style={P_LAST}>
          You may have the right to direct us not to sell or share your Personal Information as those terms are defined under the CCPA. We do not sell Personal Information for monetary consideration. If our practices constitute "sharing" or another activity subject to an opt-out right under the CCPA, we will provide the mechanisms required by applicable law. Where required, we will also recognize valid Global Privacy Control signals as described in this Policy.
        </p>

        <h3 className="privacy-h3" style={H3}>5.1.6 Sensitive Personal Information</h3>
        <p className="privacy-text" style={P_LAST}>
          To the extent we collect or process information classified as Sensitive Personal Information under California law, we will process such information in accordance with applicable law. Where California law provides a right to limit certain uses or disclosures of Sensitive Personal Information and that right applies to our processing, we will provide the applicable mechanism for exercising that right.
        </p>

        <h3 className="privacy-h3" style={H3}>5.1.7 Your Right to Non-Discrimination</h3>
        <p className="privacy-text" style={P_LAST}>
          We will not discriminate against you for exercising privacy rights available to you under the CCPA. This includes denying goods or services, charging different prices or rates, or providing a different level or quality of goods or services because you exercised a CCPA right, except where otherwise permitted by applicable law.
        </p>

        <h3 className="privacy-h3" style={H3}>5.2 Residents of Other Applicable U.S. States and the District of Columbia</h3>
        <p className="privacy-text" style={P}>
          Residents of U.S. states or the District of Columbia may have privacy rights under consumer privacy or data protection laws applicable in their jurisdiction. For purposes of this Section, "<strong>Personal Data</strong>" generally means information that is linked or reasonably linkable to an identified or identifiable natural person, subject to exclusions, exemptions, and definitions under applicable law.
        </p>
        <p className="privacy-text" style={P}>
          Depending on your use of the Platform and the Services, Personal Data we collect or process may include identifiers; contact information; commercial information; internet, device, and electronic network activity information; general geolocation information; professional or employment-related information; sensory information; financial information; linked-account information; transaction and investment information; manually entered or imported financial information; information contained in uploaded documents, receipts, images, or files; credit-related information where applicable; information associated with financial goals, budgets, forecasts, simulations, or tax-related features; and inferential or derived information generated through artificial intelligence, automated analytics, or other features.
        </p>
        <p className="privacy-text" style={P}>
          The categories collected, sources of Personal Data, purposes of processing, categories of recipients, and retention practices are described elsewhere in this Policy.
        </p>
        <p className="privacy-text" style={P_LAST}>
          Depending on the law applicable in your state or the District of Columbia, and subject to applicable exceptions, limitations, and eligibility requirements, you may have one or more of the following rights:
        </p>

        <h3 className="privacy-h3" style={H3}>5.2.1 Your Right to Confirm and Access</h3>
        <p className="privacy-text" style={P_LAST}>
          You may have the right to confirm whether we process your Personal Data and to access Personal Data maintained about you.
        </p>

        <h3 className="privacy-h3" style={H3}>5.2.2 Your Right to Request Deletion</h3>
        <p className="privacy-text" style={P_LAST}>
          You may have the right to request deletion of Personal Data provided by or obtained about you, subject to applicable exceptions and retention requirements.
        </p>

        <h3 className="privacy-h3" style={H3}>5.2.3 Your Right to Correct Inaccuracies</h3>
        <p className="privacy-text" style={P_LAST}>
          You may have the right to request correction of inaccuracies in your Personal Data, taking into account the nature of the Personal Data and the purposes of processing.
        </p>

        <h3 className="privacy-h3" style={H3}>5.2.4 Your Right to Opt Out of Targeted Advertising</h3>
        <p className="privacy-text" style={P_LAST}>
          Where applicable, you may have the right to opt out of processing of Personal Data for targeted advertising as defined by the law applicable in your jurisdiction.
        </p>

        <h3 className="privacy-h3" style={H3}>5.2.5 Your Right to Opt Out of Data Sales</h3>
        <p className="privacy-text" style={P_LAST}>
          Where applicable, you may have the right to opt out of the sale of Personal Data as defined under applicable law. We do not sell Personal Data for monetary consideration. To the extent a particular disclosure constitutes a "sale" under an applicable state privacy law, we will provide any opt-out rights required by that law.
        </p>

        <h3 className="privacy-h3" style={H3}>5.2.6 Your Right to Opt Out of Certain Profiling</h3>
        <p className="privacy-text" style={P_LAST}>
          Where applicable, you may have the right to opt out of profiling performed in furtherance of decisions that produce legal or similarly significant effects concerning you. WealthNX's informational and analytical AI functionality is not intended to make decisions producing legal or similarly significant effects concerning users.
        </p>

        <h3 className="privacy-h3" style={H3}>5.2.7 Your Right to Data Portability</h3>
        <p className="privacy-text" style={P_LAST}>
          Where applicable, you may have the right to obtain a portable and, where technically feasible, readily usable copy of Personal Data that you previously provided to us or that is otherwise covered by the portability right available under applicable law.
        </p>

        <h3 className="privacy-h3" style={H3}>5.2.8 Your Right to Non-Discrimination</h3>
        <p className="privacy-text" style={P_LAST}>
          We will not discriminate against you for exercising privacy rights provided by applicable U.S. state or District of Columbia privacy law, except as otherwise permitted by applicable law.
        </p>

        <h3 className="privacy-h3" style={H3}>5.3 Exercising Your U.S. State and District of Columbia Privacy Rights</h3>
        <p className="privacy-text" style={P}>
          To exercise a privacy right available to you under Section 5.1 or 5.2, you may submit a request by contacting us at <a href="mailto:support@wealthnx.ai" style={LINK}>support@wealthnx.ai</a> with the subject line "[State or District of Columbia] Privacy Rights Request" and describing the right you wish to exercise.
        </p>
        <p className="privacy-text" style={P}>
          We may need to verify your identity before processing a request. Verification may include requiring you to authenticate your account or matching information you provide with information maintained in our systems. We will request only information reasonably necessary to verify and process the applicable request.
        </p>
        <p className="privacy-text" style={P}>
          You may use an authorized agent to submit a request on your behalf where permitted by applicable law. We may require appropriate evidence of the agent's authority and may independently verify your identity where permitted or required by law.
        </p>
        <p className="privacy-text" style={P}>
          We will respond to verified requests within the period required by applicable law. We may deny or limit a request where permitted by law, including where we cannot reasonably verify your identity or an applicable exception applies. If we decline to take action on a request, we will provide the information required by applicable law.
        </p>
        <p className="privacy-text" style={P_LAST}>
          Where the law applicable in your jurisdiction provides a right to appeal our decision regarding a privacy request, you may submit an appeal to <a href="mailto:support@wealthnx.ai" style={LINK}>support@wealthnx.ai</a> with the subject line "[State or District of Columbia] Privacy Rights Appeal." We will review and respond to the appeal in accordance with applicable law.
        </p>

        {/* ═══════════ 6. Changes to This Privacy Policy ═══════════ */}
        <h2 className="privacy-h2" style={H2}>6. Changes to This Privacy Policy</h2>
        <p className="privacy-text" style={P}>
          We may update or modify this Privacy Policy from time to time to reflect changes in our practices, technologies, features, Services, data processing activities, legal or regulatory requirements, or other relevant circumstances.
        </p>
        <p className="privacy-text" style={P}>
          When we make changes to this Policy, we will update the "Last Updated" date at the top of the Policy. Where required by applicable law, we will provide additional notice of material changes through the Platform or the Services, by email, or through other appropriate means. Where applicable law requires consent to a material change in how we collect, use, disclose, or otherwise process Personal Information or Personal Data, we will obtain such consent before applying the relevant change.
        </p>
        <p className="privacy-text" style={P}>
          We encourage you to review this Policy periodically to remain informed about our privacy practices. Changes will become effective on the date specified in the updated Policy or in any notice provided to you, subject to applicable legal requirements.
        </p>
        <p className="privacy-text" style={P_LAST}>
          Your continued use of the Platform or the Services after an updated Policy becomes effective constitutes acknowledgment of the updated Policy but will not constitute consent where applicable law requires affirmative consent.
        </p>

        {/* ═══════════ 7. Contact Us ═══════════ */}
        <h2 className="privacy-h2" style={H2}>7. Contact Us</h2>
        <p className="privacy-text" style={P_LAST}>
          If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, you may contact us by email at <a href="mailto:support@wealthnx.ai" style={LINK}>support@wealthnx.ai</a>.
        </p>

        <div className="privacy-contact-box" style={{
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
            Email: <a href="mailto:support@wealthnx.ai" style={LINK}>support@wealthnx.ai</a>
          </p>
        </div>
      </main>

      <footer className="privacy-footer" style={{
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

export default PrivacyPolicy;
