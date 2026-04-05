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
  lastUpdated: "Last updated: April 4, 2026 · Effective: April 4, 2026",
};

// ── Intro callout ───────────────────────────────────────────────────────

export const privacyIntro =
  "Your privacy matters to us. This Privacy Policy explains what information we collect, how we use it, and the choices you have. By using Unlocked AEO, you agree to the collection and use of information as described here.";

// ── Sections ────────────────────────────────────────────────────────────

export const policySections: PolicySection[] = [
  {
    id: "information-we-collect",
    number: "01",
    tocLabel: "1. Information We Collect",
    title: "Information We Collect",
    paragraphs: [
      "We collect information you provide directly: account registration details (name, email, company), payment information (processed securely by Stripe), and any content or brand data you submit for scanning.",
      "We also collect information automatically: usage data (pages visited, features used, scan frequency), device and browser information, IP addresses, and referral sources. This helps us understand how our platform is used and improve it over time.",
    ],
  },
  {
    id: "how-we-use-it",
    number: "02",
    tocLabel: "2. How We Use It",
    title: "How We Use It",
    paragraphs: [
      "We use your information to provide and improve our services; process payments and manage your account; send transactional emails (scan results, billing receipts, product updates); respond to support requests; prevent fraud and abuse; and comply with legal obligations.",
      "We may use aggregated, anonymized data to improve our scoring models and publish industry insights. This data cannot be used to identify individual users or organizations.",
    ],
  },
  {
    id: "sharing",
    number: "03",
    tocLabel: "3. Sharing",
    title: "Sharing Your Information",
    paragraphs: [
      "We do not sell your personal information. We share data only with trusted service providers who help us operate our platform (e.g. Stripe for payments, AWS for infrastructure, Intercom for support), and only as necessary for them to perform services on our behalf under confidentiality agreements.",
      "We may disclose information if required by law, to protect rights and safety, or in connection with a merger, acquisition, or sale of assets (with advance notice to affected users).",
    ],
  },
  {
    id: "cookies-tracking",
    number: "04",
    tocLabel: "4. Cookies & Tracking",
    title: "Cookies & Tracking",
    paragraphs: [
      "We use cookies and similar technologies to keep you logged in, remember preferences, and understand how you use our platform. We use analytics tools (such as PostHog) that collect anonymized behavioral data. You can control cookie preferences through our cookie settings banner or your browser settings.",
    ],
  },
  {
    id: "data-retention",
    number: "05",
    tocLabel: "5. Data Retention",
    title: "Data Retention",
    paragraphs: [
      "We retain your personal information for as long as your account is active or as needed to provide services. If you cancel your account, we will delete or anonymize your personal data within 90 days, except where we're required by law to retain it longer (e.g. billing records for 7 years).",
    ],
  },
  {
    id: "security",
    number: "06",
    tocLabel: "6. Security",
    title: "Security",
    paragraphs: [
      "We use industry-standard security measures including encryption in transit (TLS), encryption at rest, access controls, and regular security audits. However, no system is completely secure. We encourage you to use a strong, unique password and notify us immediately of any suspected breach.",
    ],
  },
  {
    id: "your-rights",
    number: "07",
    tocLabel: "7. Your Rights",
    title: "Your Rights",
    paragraphs: [
      "Depending on your location, you may have rights to: access the personal information we hold about you; correct inaccurate data; request deletion of your data; object to or restrict processing; and data portability. To exercise any of these rights, contact us at privacy@unlockedaeo.com. We will respond within 30 days.",
      "If you are located in the EU or UK, you have additional rights under GDPR. If you are a California resident, you have rights under the CCPA/CPRA. We honour all applicable regional privacy rights.",
    ],
  },
  {
    id: "children",
    number: "08",
    tocLabel: "8. Children",
    title: "Children",
    paragraphs: [
      "Our services are not directed to children under 16. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child, we will delete it promptly. If you believe a child has provided us with personal information, please contact us.",
    ],
  },
  {
    id: "international-transfers",
    number: "09",
    tocLabel: "9. International Transfers",
    title: "International Transfers",
    paragraphs: [
      "Our platform is operated from Canada and your data may be processed on servers in Canada and the United States. By using our services, you consent to the transfer of your information to these jurisdictions. We use appropriate safeguards (such as standard contractual clauses) for transfers out of the EEA.",
    ],
  },
  {
    id: "changes",
    number: "10",
    tocLabel: "10. Changes",
    title: "Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. We will notify you of significant changes by email or in-app notice at least 14 days before changes take effect. The updated policy will always be available at unlockedaeo.com/privacy.",
    ],
  },
  {
    id: "contact-us",
    number: "11",
    tocLabel: "11. Contact Us",
    title: "Contact Us",
    paragraphs: [
      "For privacy-related questions or to exercise your rights, contact our privacy team:",
    ],
  },
];

// ── Contact card ────────────────────────────────────────────────────────

export const privacyContact: ContactInfo = {
  company: "Unlocked AEO, Inc.",
  email: "privacy@unlockedaeo.com",
  location: "Toronto, Ontario, Canada",
};
