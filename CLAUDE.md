# Unlocked AEO — Frontend Design Repo

This repo is for designing the frontend pages of Unlocked AEO. The pages you build here will be handed off to another developer who will wire them into the real app with real data and real functionality. Your job is to make everything **look and feel right** using fake/placeholder data.

## What You're Building With

These are the tools and libraries you should use. Stick to these so the pages transfer smoothly into the main app:

- **React** with **TypeScript** — the core framework
- **Vite** — the build tool (runs the dev server, bundles the app)
- **Tailwind CSS** — for styling (use utility classes like `bg-blue-500`, `p-4`, `rounded-lg`)
- **lucide-react** — for icons (search "lucide icons" to browse them)
- **recharts** — for any charts or graphs
- **framer-motion** — for animations and transitions
- **React Router** — for page navigation
- Use the `@/` shortcut to import from the `src/` folder (e.g., `import { Button } from "@/components/ui/button"`)

## Where to Put Things

Follow this folder structure so the other developer knows exactly where everything is:

```
src/
├── components/
│   ├── ui/           # Reusable building blocks (buttons, cards, inputs, dropdowns, etc.)
│   ├── dashboard/    # Pieces that are specific to the dashboard
│   ├── home/         # Pieces that are specific to the landing/marketing pages
│   └── layout/       # Things that appear on every page (header, footer, sidebar)
├── pages/
│   ├── landing/      # Public-facing pages (homepage, pricing, etc.)
│   ├── dashboard/    # Pages inside the dashboard (overview, scans, settings, etc.)
│   └── authenticated/# Pages for logged-in users that aren't part of the dashboard
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

### The `@/` Import Alias

This repo uses `@/` as a shortcut for `src/`. Make sure both `tsconfig.json` and `vite.config.ts` are configured for this:

**tsconfig.json** (inside `compilerOptions`):
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

### Naming

- **Pages and components**: Use PascalCase — `Overview.tsx`, `ScanResults.tsx`, `KPICard.tsx`
- **Data files**: Use kebab-case — `mock-dashboard.ts`, `mock-scans.ts`
- **Hooks**: Start with `use` — `useMobile.tsx`, `useTheme.tsx`

## How to Handle Fake Data

Since there's no real backend, you'll use placeholder data for everything:

- **Create data files** in `src/data/` with made-up but realistic values. For example, a mock scan might have a score of 78, a status of "Complete", and a date of "March 15, 2026".
- **Keep the data in separate files** — don't hardcode fake numbers directly in your page components. This makes it easy for the other developer to swap in real data later.
- **Make the data realistic** — use real-looking URLs, reasonable scores, actual AI engine names (ChatGPT, Perplexity, Google AI Overview, etc.)

## How to Handle Buttons and Actions

You can't actually make buttons do real things (like starting a scan or saving settings), but you should still make them clickable. When a button is clicked, log what it *should* do:

```tsx
<Button onClick={() => console.log("ACTION: start_scan", { url: inputValue })}>
  Start Scan
</Button>
```

This tells the integration developer exactly what each button needs to do.

## Design All Versions of Each Page

Every page should handle these scenarios — think of them as "what if" situations:

1. **Loading** — What does the page look like while data is being fetched? (usually a skeleton/shimmer effect or a spinner)
2. **With data** — The normal, happy path. Everything loaded and there's data to show.
3. **Empty** — The user is new or hasn't done anything yet. No scans, no results. Maybe show a friendly message encouraging them to get started.
4. **Something went wrong** — The data failed to load. Show a helpful error message, maybe a retry button.

You can use a simple toggle at the top of your page file to switch between these:

```tsx
// Change this to see different versions: "loading" | "success" | "empty" | "error"
const DEMO_STATE = "success";
```

## After You Finish a Page

Run the **`/page-complete`** command. It will walk you through a few simple questions about what's on the page, what buttons do, and what changes dynamically. This creates a spec file that the integration developer needs.

## After You Update a Page

Run the **`/page-updated`** command. It will ask what you changed and update the spec file.

## Quick Tips

- Keep things responsive — pages should look good on both desktop and mobile
- Use the same fonts, colors, spacing consistently across pages
- If you're not sure about a design decision, leave a comment in the code explaining what you were thinking
- Commit your work often so nothing gets lost
