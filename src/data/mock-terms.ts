// ─── Hero ───────────────────────────────────────────────────

export const termsHero = {
  badge: "Legal",
  headline: "Terms and Conditions",
  lastUpdated: "Last Updated: January 1, 2026",
};

// ─── Introduction ───────────────────────────────────────────

export const termsIntro =
  'These Terms and Conditions ("Terms") govern your access to and use of the Unlocked AEO platform, website, software, tools, dashboards, APIs, reports, and related services (collectively, the "Services") operated by Unlocked AEO Inc., a corporation incorporated under the laws of Canada ("Unlocked AEO," "we," "us," or "our"). By accessing or using the Services, creating an account, purchasing a subscription, or otherwise interacting with the platform, you agree to be legally bound by these Terms. If you do not agree, you must not access or use the Services.';

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
    title: "Eligibility and Authority",
    tocLabel: "1. Eligibility",
    paragraphs: [
      "You must be at least 18 years old and have the legal authority to enter into a binding agreement to use the Services.",
      "If you are using the Services on behalf of a company, agency, or other entity, you represent and warrant that you have the authority to bind that entity to these Terms.",
    ],
  },
  {
    number: "02",
    title: "Description of Services",
    tocLabel: "2. Services",
    paragraphs: [
      "Unlocked AEO provides software and analytical tools designed to measure, analyze, and report on brand visibility, accuracy, sentiment, and representation across artificial intelligence systems and AI-powered search and answer engines.",
      "The Services may include, but are not limited to: AI visibility scans, prompt testing and analysis, competitive benchmarking, hallucination detection, reporting, dashboards, and recommendations, and APIs and integrations, where applicable.",
      "Unlocked AEO does not control, operate, own, train, or modify any third-party AI models, search engines, or platforms referenced or analyzed through the Services.",
    ],
  },
  {
    number: "03",
    title: "No Professional Advice",
    tocLabel: "3. No Professional Advice",
    paragraphs: [
      "All information provided through the Services is for informational and analytical purposes only.",
      "Unlocked AEO does not provide legal, financial, investment, medical, or regulatory advice. You are solely responsible for evaluating the accuracy, completeness, and suitability of any outputs, insights, or recommendations before acting on them.",
    ],
  },
  {
    number: "04",
    title: "Account Registration and Security",
    tocLabel: "4. Account Security",
    paragraphs: [
      "You are responsible for: providing accurate and complete registration information, maintaining the confidentiality of your login credentials, and all activity that occurs under your account.",
      "You agree to notify us immediately of any unauthorized access or security breach involving your account.",
      "Unlocked AEO is not liable for losses resulting from unauthorized account access caused by your failure to safeguard credentials.",
    ],
  },
  {
    number: "05",
    title: "Subscription Plans, Billing, and Payments",
    tocLabel: "5. Billing & Payments",
    paragraphs: [
      "Certain features require a paid subscription. Subscription terms, usage limits, and pricing are disclosed at the time of purchase and may vary by plan.",
      "Subscriptions are billed in advance on a recurring basis. Fees are non-refundable unless expressly stated otherwise. Taxes may be applied where required by law.",
      "We reserve the right to change pricing, plan features, or usage limits with reasonable prior notice.",
    ],
  },
  {
    number: "06",
    title: "Acceptable Use",
    tocLabel: "6. Acceptable Use",
    paragraphs: [
      "You agree not to: use the Services for unlawful, deceptive, or harmful purposes; attempt to reverse engineer, scrape, or interfere with the platform; use the Services to misrepresent, impersonate, or defraud others; circumvent usage limits, security measures, or access controls; or resell, sublicense, or provide access to the Services without authorization.",
      "We reserve the right to suspend or terminate accounts that violate these Terms.",
    ],
  },
  {
    number: "07",
    title: "AI-Specific Disclaimers",
    tocLabel: "7. AI Disclaimers",
    paragraphs: [
      "You acknowledge and agree that: AI outputs may be incomplete, inaccurate, outdated, or inconsistent; AI engines may hallucinate, omit information, or change behavior without notice; results may vary over time and across platforms; and no outcome, ranking, citation, visibility level, or competitor displacement is guaranteed.",
      "Unlocked AEO does not guarantee that: your brand will appear in AI answers, any AI system will adopt or reflect recommended changes, or AI representations will remain stable or consistent.",
      "AEO Assistant (AI Chat) — The AEO Assistant is an AI-powered chat feature that provides general information about Answer Engine Optimization. You acknowledge and agree that: all responses are produced by third-party artificial intelligence and are not reviewed, verified, or endorsed by Unlocked AEO staff; responses do not constitute professional advice, guarantees, or promises of any kind; the views and information provided do not reflect the official positions of Unlocked AEO Inc., its employees, officers, or affiliates; and you should independently verify any information before relying on it.",
      "Unlocked AEO expressly disclaims all liability for any decisions made or actions taken based on AEO Assistant responses.",
    ],
  },
  {
    number: "08",
    title: "Data, Inputs, and Outputs",
    tocLabel: "8. Data & Outputs",
    paragraphs: [
      'You retain ownership of all data, content, URLs, prompts, and inputs you submit to the Services ("Customer Data"). You grant Unlocked AEO a limited, non-exclusive license to process Customer Data solely to provide and improve the Services.',
      'Reports, scores, analytics, and insights generated by the platform are provided "as is" and may not be relied upon as definitive or authoritative representations of third-party AI systems.',
    ],
  },
  {
    number: "09",
    title: "Intellectual Property",
    tocLabel: "9. Intellectual Property",
    paragraphs: [
      "All intellectual property rights in the Services, including software, algorithms, workflows, scoring methodologies, dashboards, branding, and documentation, are owned by Unlocked AEO Inc. or its licensors.",
      "You may not copy, modify, distribute, or create derivative works without prior written consent.",
    ],
  },
  {
    number: "10",
    title: "Confidentiality",
    tocLabel: "10. Confidentiality",
    paragraphs: [
      "Each party agrees to keep confidential any non-public business, technical, or proprietary information disclosed in connection with the Services.",
      "This obligation survives termination of these Terms.",
    ],
  },
  {
    number: "11",
    title: "Third-Party Services",
    tocLabel: "11. Third-Party Services",
    paragraphs: [
      "The Services may reference or integrate with third-party platforms, tools, or AI systems.",
      "Unlocked AEO is not responsible for: availability or accuracy of third-party services, changes to third-party behavior or APIs, or content, outputs, or decisions made by third-party AI systems.",
      "Your use of third-party services is governed by their respective terms.",
    ],
  },
  {
    number: "12",
    title: "Termination",
    tocLabel: "12. Termination",
    paragraphs: [
      "We may suspend or terminate your access: for violation of these Terms, for non-payment, for misuse or abuse of the Services, or to comply with legal obligations.",
      "You may cancel your subscription at any time. Cancellation does not entitle you to a refund for unused periods unless required by law.",
    ],
  },
  {
    number: "13",
    title: "Disclaimer of Warranties",
    tocLabel: "13. Disclaimers",
    paragraphs: [
      'THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE."',
      "TO THE MAXIMUM EXTENT PERMITTED BY LAW, UNLOCKED AEO DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.",
    ],
  },
  {
    number: "14",
    title: "Limitation of Liability",
    tocLabel: "14. Liability",
    paragraphs: [
      "TO THE MAXIMUM EXTENT PERMITTED BY LAW: UNLOCKED AEO SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES. TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU TO UNLOCKED AEO IN THE TWELVE MONTHS PRECEDING THE CLAIM.",
      "This limitation applies regardless of theory of liability.",
    ],
  },
  {
    number: "15",
    title: "Indemnification",
    tocLabel: "15. Indemnification",
    paragraphs: [
      "You agree to indemnify and hold harmless Unlocked AEO Inc., its officers, directors, employees, and affiliates from any claims, damages, losses, or expenses arising from: your use of the Services, your violation of these Terms, your misuse of AI outputs or reports, or your Customer Data or content.",
    ],
  },
  {
    number: "16",
    title: "Governing Law and Jurisdiction",
    tocLabel: "16. Governing Law",
    paragraphs: [
      "These Terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein.",
      "You agree that any dispute shall be brought exclusively in the courts located in Ontario, Canada.",
    ],
  },
  {
    number: "17",
    title: "Changes to These Terms",
    tocLabel: "17. Changes",
    paragraphs: [
      "We may update these Terms from time to time. Continued use of the Services after changes take effect constitutes acceptance of the updated Terms.",
    ],
  },
  {
    number: "18",
    title: "Contact Information",
    tocLabel: "18. Contact",
    paragraphs: [
      "If you have questions about these Terms, please contact:",
    ],
  },
];

// ─── Contact Info ───────────────────────────────────────────

export const termsContact = {
  company: "Unlocked AEO Inc.",
  email: "contact@unlockedaeo.com",
  location: "Canada",
};
