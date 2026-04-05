// ─── Account Settings Tabs ─────────────────────────────────

export interface SettingsTab {
  label: string;
  slug: string;
}

export const settingsTabs: SettingsTab[] = [
  { label: "Profile", slug: "profile" },
  { label: "Security", slug: "security" },
  { label: "Preferences", slug: "preferences" },
  { label: "Billing", slug: "billing" },
  { label: "Support", slug: "support" },
];

// ─── Company Profile Form ──────────────────────────────────

export interface FormField {
  label: string;
  value: string;
  name: string;
  locked: boolean;
  type: "text" | "select";
}

export const companyProfileFields: FormField[] = [
  {
    label: "Company Name",
    value: "Acme Corp",
    name: "companyName",
    locked: false,
    type: "text",
  },
  {
    label: "Domain",
    value: "acmecorp.com",
    name: "domain",
    locked: true,
    type: "text",
  },
  {
    label: "Industry",
    value: "SaaS / B2B Software",
    name: "industry",
    locked: false,
    type: "select",
  },
  {
    label: "Account Email",
    value: "gabe@acmecorp.com",
    name: "accountEmail",
    locked: true,
    type: "text",
  },
];

// ─── Page Header ───────────────────────────────────────────

export const profilePageHeader = {
  title: "Account Settings",
  subtitle: "Manage your profile, security and billing",
};

export const companyProfileSection = {
  title: "Company Profile",
  subtitle: "Basic information about your company account",
};

export const deleteAccountSection = {
  title: "Delete Account",
  subtitle:
    "Permanently remove your account and all associated data. This cannot be undone.",
};
