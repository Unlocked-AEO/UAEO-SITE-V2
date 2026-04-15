// ─── Display & Region ─────────────────────────────────────

export interface TimezoneOption {
  label: string;
  value: string;
}

export const selectedTimezone: TimezoneOption = {
  label: "America/New_York (UTC-5)",
  value: "America/New_York",
};

export type ThemeOption = "light" | "dark" | "system";

export const selectedTheme: ThemeOption = "light";

export const displayRegionSection = {
  title: "Display & Region",
  subtitle: "Localization and appearance settings",
};

// ─── Notification Preferences ─────────────────────────────

export interface NotificationPref {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export const notificationPrefs: NotificationPref[] = [
  {
    id: "weekly_report",
    title: "Weekly Report",
    description: "A summary of your AEO performance every Monday",
    enabled: true,
  },
  {
    id: "scan_complete",
    title: "Scan Complete",
    description: "Notify me when a scan finishes and results are ready",
    enabled: true,
  },
  {
    id: "product_updates",
    title: "Product & Company Updates",
    description: "New features, announcements and tips from the team",
    enabled: true,
  },
];

export const notificationSection = {
  title: "Notification Preferences",
  subtitle: "Choose what updates you receive by email",
};
