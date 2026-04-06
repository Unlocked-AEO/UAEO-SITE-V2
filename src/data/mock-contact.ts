// ─── Hero ──────────────────────────────────────────────────

export const contactHero = {
  badge: "Contact Us",
  headline: "Let's talk about your\nAI visibility.",
  subtext:
    "Whether you're exploring Unlocked AEO for the first time or ready to scale — we'd love to hear from you.",
};

// ─── Contact Form ──────────────────────────────────────────

export interface ContactFormField {
  label: string;
  placeholder: string;
  type: "text" | "email" | "select" | "textarea";
  required: boolean;
  halfWidth?: boolean;
}

export const contactFormFields: ContactFormField[] = [
  { label: "First Name", placeholder: "Jane", type: "text", required: true, halfWidth: true },
  { label: "Last Name", placeholder: "Smith", type: "text", required: true, halfWidth: true },
  { label: "Work Email", placeholder: "jane@company.com", type: "email", required: true, halfWidth: true },
  { label: "Company", placeholder: "Acme Corp", type: "text", required: true, halfWidth: true },
  { label: "Topic", placeholder: "Select a topic", type: "select", required: true },
  { label: "Message", placeholder: "Tell us about your goals, questions, or how we can help...", type: "textarea", required: true },
];

export const contactFormTopics = [
  "General inquiry",
  "Product demo",
  "Enterprise pricing",
  "Agency partnership",
  "Technical support",
  "Press & media",
];

// ─── Info Cards ────────────────────────────────────────────

export interface ContactInfoCard {
  title: string;
  description: string;
  cta: string;
  ctaAction: string;
  icon: "mail" | "chat" | "calendar";
}

export const contactInfoCards: ContactInfoCard[] = [
  {
    title: "Email us",
    description: "For general inquiries and support questions. We typically respond within 24 hours.",
    cta: "hello@unlockedaeo.com",
    ctaAction: "email_contact",
    icon: "mail",
  },
  {
    title: "Live chat",
    description: "Chat with our team in real time during business hours (Mon–Fri, 9am–6pm ET).",
    cta: "Start a conversation",
    ctaAction: "open_live_chat",
    icon: "chat",
  },
  {
    title: "Book a demo",
    description: "See Unlocked AEO in action with a personalized walkthrough from our product team.",
    cta: "Schedule a call",
    ctaAction: "book_demo",
    icon: "calendar",
  },
];

// ─── FAQ Preview ───────────────────────────────────────────

export interface ContactFAQ {
  question: string;
  answer: string;
}

export const contactFAQs: ContactFAQ[] = [
  {
    question: "How quickly can I see results?",
    answer: "Most brands see measurable improvements in AI visibility within 30–60 days of implementing our recommendations.",
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes — our Starter plan includes a 14-day free trial with full access to all scanning and reporting features.",
  },
  {
    question: "What AI engines do you monitor?",
    answer: "We currently monitor ChatGPT, Perplexity, Gemini, Grok, and Claude, with more engines being added regularly.",
  },
  {
    question: "Can I use Unlocked AEO for multiple brands?",
    answer: "Absolutely. Our Pro plan supports up to 5 brands, and Agency/Enterprise plans offer unlimited brand tracking.",
  },
];
