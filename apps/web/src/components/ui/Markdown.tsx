// Shared markdown renderer used by ReviewStage and OutputStage.
// Maps every markdown element to Tailwind classes that match the rest
// of the dashboard design system. GFM plugin enables tables,
// strikethrough, task lists, autolinks.

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownProps {
  children: string;
  /** Optional extra className applied to the outer wrapper. */
  className?: string;
}

export function Markdown({ children, className = "" }: MarkdownProps) {
  return (
    <div className={`text-slate-body text-[14px]/7 ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // ─── Headers ─────────────────────────────────────────────
          h1: (p) => (
            <h1 className="mt-2 mb-4 text-navy font-semibold text-[26px]/9 tracking-[-0.5px] first:mt-0" {...p} />
          ),
          h2: (p) => (
            <h2 className="mt-10 mb-3 pb-2 border-b border-border-light text-navy font-semibold text-[20px]/7 tracking-[-0.3px]" {...p} />
          ),
          h3: (p) => (
            <h3 className="mt-7 mb-2 text-navy font-semibold text-[16px]/6" {...p} />
          ),
          h4: (p) => (
            <h4 className="mt-5 mb-2 text-navy font-semibold text-[14px]/5" {...p} />
          ),

          // ─── Prose ───────────────────────────────────────────────
          p: (p) => <p className="my-3 text-slate-body text-[14px]/7" {...p} />,
          strong: (p) => <strong className="text-navy font-semibold" {...p} />,
          em: (p) => <em className="italic" {...p} />,

          // ─── Lists ───────────────────────────────────────────────
          // Marker colouring via `marker:` pseudo — teal dots for ul,
          // teal numbers for ol. Extra left padding so nested content
          // doesn't crash into the marker.
          ul: (p) => (
            <ul
              className="my-4 pl-6 list-disc marker:text-teal flex flex-col gap-2 [&_ul]:my-2 [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:pl-5"
              {...p}
            />
          ),
          ol: (p) => (
            <ol
              className="my-4 pl-6 list-decimal marker:text-teal marker:font-semibold flex flex-col gap-2 [&_ul]:my-2 [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:pl-5"
              {...p}
            />
          ),
          li: (p) => <li className="text-slate-body text-[14px]/6 pl-1 [&>p]:my-0" {...p} />,

          // ─── Links + citation chips ──────────────────────────────
          // Plain markdown links (`[text](url)`) are styled teal with
          // an underline. Post-processed citations use the pattern
          // `[[1]](url)` — the link text `[1]` renders as-is and
          // reads like a compact chip thanks to the styling.
          a: ({ href, children, ...rest }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal font-semibold no-underline hover:underline underline-offset-2"
              {...rest}
            >
              {children}
            </a>
          ),

          blockquote: (p) => (
            <blockquote
              className="my-4 pl-4 border-l-4 border-teal/50 bg-teal/5 text-slate-body italic py-2.5 pr-3 rounded-r"
              {...p}
            />
          ),
          hr: () => <hr className="my-8 border-0 border-t border-border-light" />,

          // ─── Code ────────────────────────────────────────────────
          code: ({ className: cls, children, ...rest }) => {
            const isBlock = typeof cls === "string" && cls.startsWith("language-");
            if (isBlock) {
              return (
                <code className="block font-mono text-[12.5px]/6 text-slate-text" {...rest}>
                  {children}
                </code>
              );
            }
            return (
              <code
                className="rounded px-1.5 py-0.5 bg-[#F5F8FB] border border-border-light text-navy font-mono text-[12.5px]"
                {...rest}
              >
                {children}
              </code>
            );
          },
          pre: (p) => (
            <pre
              className="my-4 p-4 rounded-lg bg-[#0A2540] text-white overflow-x-auto text-[12.5px]/6"
              {...p}
            />
          ),

          // ─── Tables (GFM) ────────────────────────────────────────
          // Wrapped in a scrollable card so wide tables don't blow up
          // the layout. Header row has a distinctive tint, rows
          // alternate subtly, and column gaps are generous.
          table: (p) => (
            <div className="my-5 overflow-x-auto rounded-lg border border-border-light shadow-[0px_1px_3px_#0A254008]">
              <table className="w-full text-left border-collapse" {...p} />
            </div>
          ),
          thead: (p) => <thead className="bg-navy/[0.04] border-b-2 border-border-light" {...p} />,
          tbody: (p) => <tbody className="[&>tr:nth-child(even)]:bg-[#FAFBFC]" {...p} />,
          tr: (p) => <tr className="border-b border-border-light last:border-0" {...p} />,
          th: (p) => (
            <th
              className="text-left px-4 py-3 text-navy font-semibold text-[12px]/4 uppercase tracking-[0.4px]"
              {...p}
            />
          ),
          td: (p) => (
            <td className="px-4 py-3 text-slate-body text-[13.5px]/5 align-top [&>strong]:text-navy" {...p} />
          ),

          // ─── Task-list checkboxes (GFM) ──────────────────────────
          input: (p) => {
            if (p.type === "checkbox") {
              return (
                <input
                  type="checkbox"
                  disabled
                  checked={p.checked}
                  className="mr-2 accent-teal"
                />
              );
            }
            return <input {...p} />;
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
