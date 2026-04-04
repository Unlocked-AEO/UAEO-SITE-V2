// ─── Hero ───────────────────────────────────────────────────

export const termsHero = {
  badge: "Legal",
  headline: "Terms of Service",
  lastUpdated: "Last updated: April 4, 2026 · Effective: April 4, 2026",
};

// ─── Introduction ───────────────────────────────────────────

export const termsIntro =
  "These Terms of Service govern your access to and use of Unlocked AEO's platform, products, and services. By creating an account or using our services, you agree to be bound by these terms. Please read them carefully.";

// ─── Sections ───────────────────────────────────────────────

export interface TermsSection {
  number: string;
  title: string;
  tocLabel: string;
  paragraphs: string[];
}

export const termsSections: TermsSection[] = [
  {
    number: "01",
    title: "Agreement to Terms",
    tocLabel: "1. Agreement",
    paragraphs: [
      'By accessing or using Unlocked AEO ("we," "us," or "our") services, you agree to be bound by these Terms of Service and our Privacy Policy. If you are entering into these terms on behalf of an organization, you represent that you have authority to bind that organization.',
      "If you do not agree to these terms, you may not access or use our services. We reserve the right to update these terms at any time. Continued use following notice of changes constitutes acceptance of the updated terms.",
    ],
  },
  {
    number: "02",
    title: "Services",
    tocLabel: "2. Services",
    paragraphs: [
      "Unlocked AEO provides an AI visibility intelligence platform that allows users to measure, track, and improve their brand's presence across AI answer engines including ChatGPT, Perplexity, Gemini, Grok, Claude, and Copilot. Our services include AEO scanning, scoring, competitive intelligence, content recommendations, and API access.",
      "We reserve the right to modify, suspend, or discontinue any part of the service at any time with reasonable notice. We will not be liable for any modification, suspension, or discontinuation of services.",
    ],
  },
  {
    number: "03",
    title: "Your Account",
    tocLabel: "3. Your Account",
    paragraphs: [
      "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account. We cannot and will not be liable for any loss resulting from unauthorized use of your account.",
      "You must be at least 18 years old and capable of entering a binding contract to use our services. Accounts registered by bots or automated methods are not permitted.",
    ],
  },
  {
    number: "04",
    title: "Acceptable Use",
    tocLabel: "4. Acceptable Use",
    paragraphs: [
      "You agree not to misuse our services. Prohibited conduct includes: attempting to reverse engineer our platform; using our services to harm, defraud, or harass others; scraping or systematically extracting data from our platform without authorization; using our services for any unlawful purpose; or interfering with or disrupting the integrity or performance of our services.",
    ],
  },
  {
    number: "05",
    title: "Intellectual Property",
    tocLabel: "5. Intellectual Property",
    paragraphs: [
      "The Unlocked AEO platform, including all software, algorithms, designs, text, and data (excluding your content), is owned by Unlocked AEO, Inc. and protected by copyright, trademark, and other laws. You may not copy, modify, or distribute our intellectual property without prior written consent.",
      "You retain ownership of any data, content, or materials you submit to our platform. By submitting content, you grant us a limited, non-exclusive license to use it solely to provide and improve the services.",
    ],
  },
  {
    number: "06",
    title: "Payment & Billing",
    tocLabel: "6. Payment & Billing",
    paragraphs: [
      "Paid plans are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law or as expressly stated in these terms. We reserve the right to change our pricing with 30 days' notice. Failure to pay may result in suspension or termination of your account.",
    ],
  },
  {
    number: "07",
    title: "Termination",
    tocLabel: "7. Termination",
    paragraphs: [
      "Either party may terminate the agreement at any time. You may cancel your account from your settings at any time. We may suspend or terminate your access for violation of these terms, non-payment, or for any reason with 30 days' notice. Upon termination, your right to use the services ceases immediately.",
    ],
  },
  {
    number: "08",
    title: "Disclaimers",
    tocLabel: "8. Disclaimers",
    paragraphs: [
      'Our services are provided "as is" and "as available" without warranty of any kind. We disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the services will be uninterrupted, error-free, or that defects will be corrected.',
    ],
  },
  {
    number: "09",
    title: "Limitation of Liability",
    tocLabel: "9. Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by law, Unlocked AEO shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising out of or in connection with these terms or your use of our services, even if advised of the possibility of such damages.",
    ],
  },
  {
    number: "10",
    title: "Governing Law",
    tocLabel: "10. Governing Law",
    paragraphs: [
      "These terms are governed by the laws of the Province of Ontario and the federal laws of Canada. Any disputes shall be resolved in the courts of Ontario. If you are located outside Canada, local mandatory consumer protection laws may also apply.",
    ],
  },
  {
    number: "11",
    title: "Changes to Terms",
    tocLabel: "11. Changes to Terms",
    paragraphs: [
      "We may revise these terms from time to time. We will notify you of material changes by email or by posting a notice in our platform at least 14 days before the changes take effect. Your continued use after the effective date constitutes acceptance of the revised terms.",
    ],
  },
  {
    number: "12",
    title: "Contact Us",
    tocLabel: "12. Contact Us",
    paragraphs: [
      "If you have questions about these Terms of Service, please contact us at:",
    ],
  },
];

// ─── Contact Info ───────────────────────────────────────────

export const termsContact = {
  company: "Unlocked AEO, Inc.",
  email: "legal@unlockedaeo.com",
  location: "Toronto, Ontario, Canada",
};
