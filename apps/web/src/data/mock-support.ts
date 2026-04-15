// ─── Contact Support Form ────────────────��─────────────────

export const contactSupportSection = {
  title: "Contact Support",
  subtitle: "We typically respond within 2 business hours",
};

export interface SupportTopic {
  label: string;
  value: string;
}

export const supportTopics: SupportTopic[] = [
  { label: "Billing & Payments", value: "billing" },
  { label: "Account Issues", value: "account" },
  { label: "Scan Problems", value: "scans" },
  { label: "Feature Request", value: "feature" },
  { label: "Bug Report", value: "bug" },
  { label: "Other", value: "other" },
];

// ─── FAQ ───────────────────────────────────────────────────

export interface SupportFAQ {
  id: string;
  question: string;
}

export const supportFAQs: SupportFAQ[] = [
  { id: "1", question: "How does the AEO score get calculated?" },
  { id: "2", question: "How often should I run a scan?" },
  { id: "3", question: "Can I add team members to my account?" },
  { id: "4", question: "What AI models does Unlocked AEO test against?" },
];

// ─── Resource Links ───────────────���────────────────────────

export type ResourceIconColor = "orange" | "teal" | "blue";

export interface ResourceLink {
  id: string;
  title: string;
  subtitle: string;
  iconColor: ResourceIconColor;
  icon: "video" | "book" | "docs";
  action: string;
}

export const resourceLinks: ResourceLink[] = [
  {
    id: "video-tutorials",
    title: "Video Tutorials",
    subtitle: "Watch how-to guides",
    iconColor: "orange",
    icon: "video",
    action: "open_video_tutorials",
  },
  {
    id: "get-to-know-aeo",
    title: "Get to Know AEO",
    subtitle: "Beginner's guide to AEO",
    iconColor: "teal",
    icon: "book",
    action: "open_aeo_guide",
  },
  {
    id: "documentation",
    title: "Documentation",
    subtitle: "Full API and platform docs",
    iconColor: "blue",
    icon: "docs",
    action: "open_documentation",
  },
];

// ─── Live Chat Banner ──────────────────────────────────────

export const liveChatBanner = {
  title: "Chat with us live",
  subtitle: "Available Mon–Fri, 9am–6pm EST",
};
