// ─── Hero ──────────────────────────────────────────────────

export const scheduleHero = {
  badge: "Book a Demo",
  headline: "See Unlocked AEO in action.",
  subtext:
    "Get a personalized walkthrough of the platform with one of our product specialists. We'll show you exactly how to improve your AI visibility.",
};

// ─── What to Expect ────────────────────────────────────────

export interface ExpectItem {
  title: string;
  description: string;
  icon: "scan" | "chart" | "lightbulb" | "clock";
}

export const expectItems: ExpectItem[] = [
  {
    title: "Live AEO scan of your site",
    description: "We'll run a real-time scan of your domain across all 5 AI engines so you can see your current visibility.",
    icon: "scan",
  },
  {
    title: "Score breakdown & analysis",
    description: "Walk through your AI Visibility, Brand Accuracy, Sentiment, Schema, Freshness, and EEAT scores in detail.",
    icon: "chart",
  },
  {
    title: "Personalized recommendations",
    description: "Get actionable next steps tailored to your brand, prioritized by impact on AI citation rates.",
    icon: "lightbulb",
  },
  {
    title: "Q&A with our product team",
    description: "Ask anything about AEO strategy, platform features, pricing, or implementation timelines.",
    icon: "clock",
  },
];

// ─── Time Slots ────────────────────────────────────────────

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DayColumn {
  day: string;
  date: string;
  slots: TimeSlot[];
}

export const scheduleWeek: DayColumn[] = [
  {
    day: "Mon",
    date: "Apr 7",
    slots: [
      { time: "9:00 AM", available: true },
      { time: "10:00 AM", available: false },
      { time: "11:00 AM", available: true },
      { time: "1:00 PM", available: true },
      { time: "2:00 PM", available: false },
      { time: "3:00 PM", available: true },
    ],
  },
  {
    day: "Tue",
    date: "Apr 8",
    slots: [
      { time: "9:00 AM", available: true },
      { time: "10:00 AM", available: true },
      { time: "11:00 AM", available: false },
      { time: "1:00 PM", available: true },
      { time: "2:00 PM", available: true },
      { time: "3:00 PM", available: false },
    ],
  },
  {
    day: "Wed",
    date: "Apr 9",
    slots: [
      { time: "9:00 AM", available: false },
      { time: "10:00 AM", available: true },
      { time: "11:00 AM", available: true },
      { time: "1:00 PM", available: false },
      { time: "2:00 PM", available: true },
      { time: "3:00 PM", available: true },
    ],
  },
  {
    day: "Thu",
    date: "Apr 10",
    slots: [
      { time: "9:00 AM", available: true },
      { time: "10:00 AM", available: true },
      { time: "11:00 AM", available: true },
      { time: "1:00 PM", available: true },
      { time: "2:00 PM", available: false },
      { time: "3:00 PM", available: true },
    ],
  },
  {
    day: "Fri",
    date: "Apr 11",
    slots: [
      { time: "9:00 AM", available: true },
      { time: "10:00 AM", available: false },
      { time: "11:00 AM", available: true },
      { time: "1:00 PM", available: false },
      { time: "2:00 PM", available: true },
      { time: "3:00 PM", available: false },
    ],
  },
];

// ─── Booking Form ──────────────────────────────────────────

export const bookingFormFields = [
  { label: "Full Name", placeholder: "Jane Smith", type: "text" as const, required: true, halfWidth: true },
  { label: "Work Email", placeholder: "jane@company.com", type: "email" as const, required: true, halfWidth: true },
  { label: "Company", placeholder: "Acme Corp", type: "text" as const, required: true, halfWidth: true },
  { label: "Team Size", placeholder: "Select team size", type: "select" as const, required: true, halfWidth: true },
  { label: "Anything specific you'd like to cover?", placeholder: "E.g. hallucination detection, competitor tracking, enterprise pricing...", type: "textarea" as const, required: false },
];
