// Privacy Policy page mock data

export interface PolicySection {
  id: string;
  number: string;
  tocLabel: string;
  title: string;
  paragraphs: string[];
}

export interface ContactInfo {
  company: string;
  email: string;
  location: string;
}

// ── Hero ────────────────────────────────────────────────────────────────

export const privacyHero = {
  badge: "Legal",
  headline: "Privacy Policy",
  lastUpdated: "Effective Date: January 1, 2026 · Last Updated: January 1, 2026",
};

// ── Intro callout ───────────────────────────────────────────────────────

export const privacyIntro =
  'Unlocked AEO Inc. ("Unlocked AEO," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, store, and protect personal information when you access or use our website, platform, products, and services (collectively, the "Services"). This Privacy Policy applies to all visitors, users, customers, and business representatives who interact with the Services. By accessing or using the Services, you consent to the collection, use, and disclosure of information in accordance with this Privacy Policy.';

// ── Sections ────────────────────────────────────────────────────────────

export const policySections: PolicySection[] = [
  {
    id: "company-information",
    number: "01",
    tocLabel: "1. Company Information",
    title: "Company Information",
    paragraphs: [
      "Unlocked AEO Inc. is a corporation incorporated in Canada.",
      "Contact Email: contact@unlockedaeo.com",
      "We comply with applicable Canadian privacy laws, including the Personal Information Protection and Electronic Documents Act (PIPEDA), and where applicable, other international privacy regulations.",
    ],
  },
  {
    id: "information-we-collect",
    number: "02",
    tocLabel: "2. Information We Collect",
    title: "Information We Collect",
    paragraphs: [
      "We collect information in the following categories.",
      "Information You Provide Directly — We may collect personal information you voluntarily provide, including: name, email address, company name, job title, account credentials, billing and payment information, communications with us (including emails, demo requests, and support inquiries), and information submitted through forms, surveys, onboarding, or account settings. You are responsible for ensuring the accuracy of information you provide.",
      "Information Collected Automatically — When you access or use the Services, we may automatically collect certain technical and usage information, including: IP address, browser type and version, device type and operating system, pages viewed and interactions, date and time of access, referring and exit URLs, and log files and diagnostic data. This information is used for security, analytics, performance monitoring, and platform improvement.",
      "Website, Business, and Analysis Data — When you use Unlocked AEO's analysis, scanning, or AI visibility features, you may submit or authorize access to: website URLs and domain information, publicly available business information, website content and metadata, brand, competitor, and industry data, and prompts, queries, and configuration inputs. This data may include publicly available information about third parties. You represent that you have the authority to submit or authorize the processing of such data.",
    ],
  },
  {
    id: "how-we-use-information",
    number: "03",
    tocLabel: "3. How We Use Information",
    title: "How We Use Information",
    paragraphs: [
      "We use collected information for the following purposes: to provide, operate, and maintain the Services; to create, authenticate, and manage user accounts; to process subscriptions, payments, and billing; to generate reports, analytics, and insights; to provide customer support and respond to inquiries; to improve platform accuracy, performance, and security; to monitor for fraud, abuse, or misuse; and to comply with legal and regulatory obligations.",
    ],
  },
  {
    id: "marketing",
    number: "04",
    tocLabel: "4. Marketing Communications",
    title: "Marketing and Promotional Communications",
    paragraphs: [
      "We may use your contact information, including your email address, to send marketing, promotional, and informational communications related to Unlocked AEO Inc., including: product updates and feature announcements, educational content, insights, and resources, marketing campaigns and promotional offers, invitations to webinars, events, or demonstrations, and company announcements and newsletters.",
      "You may receive such communications when you: create an account, request a demo, scan, or consultation, subscribe to updates or content, provide your contact information through the Services, or provide express or implied consent as permitted by law. We do not send marketing communications without a lawful basis to do so.",
      "By providing your contact information, you consent to receiving electronic communications from Unlocked AEO Inc. in accordance with applicable laws, including Canada's Anti-Spam Legislation (CASL). You may withdraw your consent at any time by: clicking the unsubscribe link in our emails, adjusting communication preferences within your account (if available), or contacting us at contact@unlockedaeo.com. Opt-out requests will be processed promptly and within legally required timeframes.",
      "Service-related or transactional communications, including account notices, billing messages, and security alerts, may still be sent even if you opt out of marketing communications.",
    ],
  },
  {
    id: "ai-processing",
    number: "05",
    tocLabel: "5. AI and Automated Processing",
    title: "AI and Automated Processing",
    paragraphs: [
      "Unlocked AEO uses automated systems, including artificial intelligence and machine learning technologies, to analyze data and generate insights.",
      "Key disclosures: AI systems process user-provided inputs and publicly available information. Outputs are informational and analytical only. Outputs may contain inaccuracies or limitations inherent to AI technologies. We do not train proprietary foundation models using your confidential data.",
      "Users are responsible for reviewing and validating outputs before relying on them.",
    ],
  },
  {
    id: "legal-basis",
    number: "06",
    tocLabel: "6. Legal Basis for Processing",
    title: "Legal Basis for Processing",
    paragraphs: [
      "We process personal information based on one or more of the following legal grounds: your consent, performance of a contract, compliance with legal obligations, and legitimate business interests, including platform improvement and security.",
      "You may withdraw consent at any time, subject to legal and contractual restrictions.",
    ],
  },
  {
    id: "sharing",
    number: "07",
    tocLabel: "7. Sharing and Disclosure",
    title: "Sharing and Disclosure of Information",
    paragraphs: [
      "We may share information in limited circumstances.",
      "Service Providers — We may share information with trusted third-party service providers that assist with: hosting and infrastructure, payment processing, analytics and monitoring, customer support, and security and fraud prevention. Service providers are contractually obligated to protect information and use it only for authorized purposes.",
      "Legal Requirements — We may disclose information if required by law, regulation, court order, or governmental authority.",
      "Business Transactions — If Unlocked AEO Inc. is involved in a merger, acquisition, financing, or sale of assets, information may be transferred as part of that transaction, subject to confidentiality obligations.",
    ],
  },
  {
    id: "international-transfers",
    number: "08",
    tocLabel: "8. International Data Transfers",
    title: "International Data Transfers",
    paragraphs: [
      "Your information may be processed or stored outside of Canada, including in jurisdictions with different data protection laws.",
      "We take reasonable steps to ensure appropriate safeguards are in place for cross-border data transfers.",
    ],
  },
  {
    id: "data-retention",
    number: "09",
    tocLabel: "9. Data Retention",
    title: "Data Retention",
    paragraphs: [
      "We retain personal information only for as long as necessary to: fulfill the purposes described in this Privacy Policy, meet legal, accounting, and regulatory requirements, resolve disputes, and enforce agreements.",
      "Retention periods vary based on the nature of the information and applicable laws.",
    ],
  },
  {
    id: "security",
    number: "10",
    tocLabel: "10. Security Measures",
    title: "Security Measures",
    paragraphs: [
      "We implement reasonable administrative, technical, and organizational safeguards to protect information against unauthorized access, disclosure, alteration, or destruction.",
      "No system is completely secure. You acknowledge that we cannot guarantee absolute security.",
    ],
  },
  {
    id: "your-rights",
    number: "11",
    tocLabel: "11. Your Rights",
    title: "Your Rights",
    paragraphs: [
      "Depending on your jurisdiction, you may have the right to: access personal information we hold about you, request correction of inaccurate or incomplete information, withdraw consent, request deletion of personal information (subject to legal obligations), and object to certain processing activities.",
      "Requests can be submitted to contact@unlockedaeo.com. We may require verification of identity before responding.",
    ],
  },
  {
    id: "cookies",
    number: "12",
    tocLabel: "12. Cookies and Tracking",
    title: "Cookies and Tracking Technologies",
    paragraphs: [
      "We use cookies and similar technologies to: enable core website functionality, analyze usage and performance, and improve user experience.",
      "You may control cookies through your browser settings. Disabling cookies may affect functionality.",
    ],
  },
  {
    id: "third-party-links",
    number: "13",
    tocLabel: "13. Third-Party Links",
    title: "Third-Party Links",
    paragraphs: [
      "The Services may contain links to third-party websites or services. We are not responsible for their privacy practices or content.",
    ],
  },
  {
    id: "children",
    number: "14",
    tocLabel: "14. Children's Privacy",
    title: "Children's Privacy",
    paragraphs: [
      "The Services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children.",
      "If you believe a child has provided personal information, please contact us.",
    ],
  },
  {
    id: "changes",
    number: "15",
    tocLabel: "15. Changes",
    title: "Changes to This Privacy Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. Updates will be posted with a revised effective date.",
      "Continued use of the Services after changes constitutes acceptance of the updated Privacy Policy.",
    ],
  },
  {
    id: "contact-us",
    number: "16",
    tocLabel: "16. Contact Us",
    title: "Contact Us",
    paragraphs: [
      "If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact:",
    ],
  },
];

// ── Contact card ────────────────────────────────────────────────────────

export const privacyContact: ContactInfo = {
  company: "Unlocked AEO Inc.",
  email: "contact@unlockedaeo.com",
  location: "Canada",
};
