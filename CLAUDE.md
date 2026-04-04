# Unlocked AEO — Frontend Design Repo

This is a **design-only** repo. There is no backend, no auth, no API calls. You are building the visual frontend for Unlocked AEO so that an integration developer can take these pages and wire them into the real app later.

Your job: make every page **look and feel exactly like the design**. Use fake data. Make buttons clickable but not functional. That's it.

## The Non-Negotiables

These are the only hard requirements. Everything else is your call.

- **React** with **TypeScript** — the main app uses React, so this must too
- **Vite** — the build tool
- **Tailwind CSS** — all styling must use Tailwind utility classes, not custom CSS files. This is critical for migration.
- **`@/` import alias** — use `@/` to import from `src/` (e.g., `import { Button } from "@/components/ui/button"`)

Beyond these, use whatever libraries or components make the design look best. Need a specific animation library? Use it. Want a particular chart library? Go for it. Need a component library for dropdowns or modals? Your choice. Just `npm install` it and use it.

The integration developer will adapt to whatever you pick — don't hold back on the design because of library constraints.

## Where to Put Things

This structure is important — the integration developer navigates by it.

```
src/
├── components/
│   ├── ui/           # Reusable building blocks (buttons, cards, inputs, dropdowns, etc.)
│   ├── dashboard/    # Pieces specific to the dashboard
│   ├── home/         # Pieces specific to the landing/marketing pages
│   └── layout/       # Things on every page (header, footer, sidebar)
├── pages/
│   ├── landing/      # Public-facing pages (homepage, pricing, etc.)
│   ├── dashboard/    # Pages inside the dashboard (overview, scans, settings, etc.)
│   └── authenticated/# Logged-in pages that aren't part of the dashboard
├── hooks/            # Reusable behaviors (like detecting mobile screens)
├── lib/              # Small helper functions
├── data/             # Fake/placeholder data files
└── assets/           # Images, logos, SVGs
```

### Asset Files

- Use descriptive names: `hero-background.webp`, `logo-dark.svg` — not `image1.png` or `Screenshot 2026-04-01.png`
- Prefer **SVG** for icons, logos, and illustrations
- Prefer **WebP** or **PNG** for photos and complex images
- Keep all assets in `src/assets/` — don't scatter them across component folders

### Naming

- **Pages and components**: PascalCase — `Overview.tsx`, `ScanResults.tsx`, `KPICard.tsx`
- **Data files**: kebab-case — `mock-dashboard.ts`, `mock-scans.ts`
- **Hooks**: Start with `use` — `useMobile.tsx`, `useTheme.tsx`

### The `@/` Import Alias

Both `tsconfig.app.json` and `vite.config.ts` must be configured for this:

**tsconfig.app.json** (inside `compilerOptions`):
```json
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```

**vite.config.ts**:
```ts
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // ...
});
```

## How to Handle Fake Data

There's no backend, so everything uses placeholder data.

- **Put mock data in `src/data/`** in its own file — don't hardcode fake numbers in your components. This is the #1 thing that makes migration easy: the integration developer just swaps the import.
- **Make it realistic** — real-looking URLs, reasonable scores, actual AI engine names (ChatGPT, Perplexity, Google AI Overview, etc.)
- **Type your data** — define a TypeScript interface for each data shape. This tells the integration developer exactly what the component expects.

```tsx
// src/data/mock-scans.ts
export interface Scan {
  id: string;
  url: string;
  score: number;
  status: "pending" | "running" | "complete" | "failed";
  date: string;
}

export const mockScans: Scan[] = [
  { id: "1", url: "https://example.com/pricing", score: 78, status: "complete", date: "2026-03-15" },
  // ...
];
```

## How to Handle Buttons and Actions

Make everything clickable. Log what it *should* do:

```tsx
<button onClick={() => console.log("ACTION: start_scan", { url: inputValue })}>
  Start Scan
</button>
```

This tells the integration developer exactly what each interaction needs to trigger.

## Design All Versions of Each Page

Every page needs these states:

1. **Loading** — skeleton/shimmer or spinner while data loads
2. **With data** — the normal happy path
3. **Empty** — brand new user, nothing to show yet. Friendly message + call to action.
4. **Error** — data failed to load. Helpful message + retry button.

Use a toggle at the top of the page file to switch between them:

```tsx
// Change this to see different versions: "loading" | "success" | "empty" | "error"
const DEMO_STATE = "success";
```

## After You Finish a Page

Run **`/page-complete`**. It walks you through documenting what's on the page, what buttons do, and what data it needs. This creates a spec file in `specs/` that the integration developer relies on.

## After You Update a Page

Run **`/page-updated`**. It asks what changed and updates the spec file.

## Quick Tips

- Pages should be responsive — desktop and mobile
- Keep fonts, colors, and spacing consistent across pages
- If you're unsure about a design decision, leave a code comment explaining your thinking
- Commit after every completed page (page + spec file together)
- When you install a new library, make sure it's saved to `package.json` (it will be by default with `npm install`)
