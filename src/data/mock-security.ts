// ─── Change Password ───────────────────────────────────────

export interface PasswordField {
  label: string;
  name: string;
  placeholder: string;
}

export const passwordFields: PasswordField[] = [
  {
    label: "Current Password",
    name: "currentPassword",
    placeholder: "••••••••",
  },
  {
    label: "New Password",
    name: "newPassword",
    placeholder: "Enter new password",
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    placeholder: "Confirm new password",
  },
];

export const changePasswordSection = {
  title: "Change Password",
  subtitle: "Update your account password",
};

// ─── Security Feature Rows ─────────────────────────────────

export type BadgeVariant = "muted" | "purple";

export interface SecurityFeature {
  id: string;
  title: string;
  description: string;
  icon: "lock" | "shield" | "key";
  badge: string | null;
  badgeVariant: BadgeVariant;
  buttonLabel: string;
  buttonAction: string;
  buttonVariant: "default" | "purple";
}

export const securityFeatures: SecurityFeature[] = [
  {
    id: "2fa",
    title: "Two-Factor Authentication",
    description:
      "Add an extra layer of security with authenticator app or SMS",
    icon: "lock",
    badge: "COMING SOON",
    badgeVariant: "muted",
    buttonLabel: "Enable 2FA",
    buttonAction: "enable_2fa",
    buttonVariant: "default",
  },
  {
    id: "sso",
    title: "SAML / SSO",
    description:
      "Enterprise single sign-on — connect your identity provider",
    icon: "shield",
    badge: "ENTERPRISE",
    badgeVariant: "purple",
    buttonLabel: "Upgrade to Enterprise",
    buttonAction: "upgrade_to_enterprise",
    buttonVariant: "purple",
  },
  {
    id: "api-keys",
    title: "API Keys",
    description:
      "Manage programmatic API access to your Unlocked AEO data",
    icon: "key",
    badge: "COMING SOON",
    badgeVariant: "muted",
    buttonLabel: "Manage Keys",
    buttonAction: "manage_api_keys",
    buttonVariant: "default",
  },
];
