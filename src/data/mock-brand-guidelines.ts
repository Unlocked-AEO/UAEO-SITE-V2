export interface BrandSection {
  number: string;
  label: string;
  title: string;
  description: string;
}

export interface ColorSwatch {
  name: string;
  description: string;
  hex: string;
  rgb: string;
  hsl: string;
}

export interface TypographyRow {
  style: string;
  preview: string;
  size: string;
  weight: string;
  lineHeight: string;
  usage: string;
}

export interface SpacingStep {
  value: number;
  label: string;
}

export interface GridSpec {
  title: string;
  breakpoint: string;
  columns: string;
  gutters: string;
  columnGap: string;
  maxContentWidth: string;
}

export interface ButtonSpec {
  height: string;
  padding: string;
  borderRadius: string;
  font: string;
}

export const brandHero = {
  title: "Brand Guidelines",
  subtitle:
    "Everything you need to design, communicate, and build on-brand. Version 1.0 — April 2026.",
};

export const sections: Record<string, BrandSection> = {
  logo: {
    number: "01",
    label: "Logo",
    title: "Our Logo",
    description:
      "The Unlocked AEO mark combines a teal gradient icon with a bold wordmark. Always use approved versions — never recreate or modify the logo.",
  },
  colour: {
    number: "02",
    label: "Colour",
    title: "Colour Palette",
    description:
      "Our palette is built around two anchors — deep navy and signal teal. All other tones are derived from them. Use the hex values as the source of truth.",
  },
  typography: {
    number: "03",
    label: "Typography",
    title: "Type System",
    description:
      "We use a single typeface across the entire product and brand: Inter. Its geometric precision and wide weight range make it versatile for headlines, UI, and legal copy alike.",
  },
  spacing: {
    number: "04",
    label: "Spacing & Grid",
    title: "Spacing System",
    description:
      "All spacing is based on a 4px base unit. Use multiples of 4 for all padding, margin, and gap values. The grid is 12 columns with 120px gutters on desktop.",
  },
  components: {
    number: "05",
    label: "Components",
    title: "UI Components",
    description:
      "Core building blocks used across the product and marketing site. Always use these exact specs — do not deviate in size, radius, or colour.",
  },
};

export const primaryColors: ColorSwatch[] = [
  {
    name: "Midnight Navy",
    description: "Primary brand colour. Headlines, navbars, CTAs, dark sections.",
    hex: "#0A2540",
    rgb: "RGB 10 37 64",
    hsl: "HSL 210° 73% 15%",
  },
  {
    name: "Signal Teal",
    description: "Accent colour. CTAs, highlights, icons, active states, badges.",
    hex: "#4ECDC4",
    rgb: "RGB 78 205 196",
    hsl: "HSL 176° 52% 55%",
  },
  {
    name: "Pure White",
    description: "Page backgrounds, cards on navy, reversed text and icons.",
    hex: "#FFFFFF",
    rgb: "RGB 255 255 255",
    hsl: "HSL — 0% 100%",
  },
];

export const secondaryColors: ColorSwatch[] = [
  {
    name: "Teal Mist",
    description: "Hero backgrounds, tint sections, callout boxes.",
    hex: "#F0FDFA",
    rgb: "",
    hsl: "",
  },
  {
    name: "Slate",
    description: "Body copy, secondary text, icons on light backgrounds.",
    hex: "#475569",
    rgb: "",
    hsl: "",
  },
  {
    name: "Muted",
    description: "Captions, placeholders, disabled states, metadata.",
    hex: "#64748B",
    rgb: "",
    hsl: "",
  },
  {
    name: "Border",
    description: "Dividers, card borders, input strokes on white.",
    hex: "#E2E8F0",
    rgb: "",
    hsl: "",
  },
  {
    name: "Surface",
    description: "Alternating section backgrounds, table rows, nav fill.",
    hex: "#F8FAFC",
    rgb: "",
    hsl: "",
  },
];

export const typographyRows: TypographyRow[] = [
  {
    style: "Display",
    preview: "Get started",
    size: "56–64px",
    weight: "800 (ExtraBold)",
    lineHeight: "105%",
    usage: "Hero headlines",
  },
  {
    style: "Heading 1",
    preview: "AI Visibility Score",
    size: "36–40px",
    weight: "700 (Bold)",
    lineHeight: "110%",
    usage: "Section headings",
  },
  {
    style: "Heading 2",
    preview: "Citation Signals",
    size: "24–28px",
    weight: "700 (Bold)",
    lineHeight: "120%",
    usage: "Card titles, subheadings",
  },
  {
    style: "Body",
    preview: "Track how every major AI engine perceives your brand.",
    size: "16px",
    weight: "400 (Regular)",
    lineHeight: "160%",
    usage: "Paragraphs, descriptions",
  },
  {
    style: "Label / UI",
    preview: "Dashboard · Pricing · Settings",
    size: "13–14px",
    weight: "500–600 (Medium)",
    lineHeight: "140%",
    usage: "Nav links, buttons, tabs",
  },
  {
    style: "Caption / Overline",
    preview: "GETTING STARTED",
    size: "11–12px",
    weight: "700 (Bold)",
    lineHeight: "140%",
    usage: "Section labels, badges, tags",
  },
];

export const spacingSteps: SpacingStep[] = [
  { value: 4, label: "xs" },
  { value: 8, label: "sm" },
  { value: 12, label: "—" },
  { value: 16, label: "md" },
  { value: 24, label: "lg" },
  { value: 32, label: "xl" },
  { value: 48, label: "2xl" },
  { value: 64, label: "3xl" },
  { value: 80, label: "4xl" },
  { value: 120, label: "gutter" },
];

export const gridSpecs: GridSpec[] = [
  {
    title: "Desktop Grid",
    breakpoint: "≥ 1440px",
    columns: "12",
    gutters: "120px left + right",
    columnGap: "24px",
    maxContentWidth: "1200px",
  },
  {
    title: "Tablet Grid",
    breakpoint: "768–1439px",
    columns: "8",
    gutters: "48px left + right",
    columnGap: "16px",
    maxContentWidth: "100%",
  },
  {
    title: "Mobile Grid",
    breakpoint: "< 768px",
    columns: "4",
    gutters: "24px left + right",
    columnGap: "16px",
    maxContentWidth: "100%",
  },
];

export const buttonSpecs: ButtonSpec = {
  height: "44px (default) · 36px (sm) · 52px (lg)",
  padding: "14px 28px (default)",
  borderRadius: "8px",
  font: "Inter 600–700, 14–15px",
};
