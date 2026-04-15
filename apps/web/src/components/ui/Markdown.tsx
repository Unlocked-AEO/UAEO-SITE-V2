// Shared markdown renderer used by ReviewStage and OutputStage.
// Maps every markdown element to Tailwind classes that match the rest
// of the dashboard design system (text-navy for headers, text-slate-body
// for prose, teal accents, soft borders on tables).
//
// GFM plugin enables tables, strikethrough, task lists, autolinks.

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
          h1: (p) => (
            <h1 className="mt-2 mb-4 text-navy font-semibold text-[24px]/8 tracking-[-0.4px] first:mt-0" {...p} />
          ),
          h2: (p) => (
            <h2 className="mt-8 mb-3 text-navy font-semibold text-[18px]/6 tracking-[-0.2px]" {...p} />
          ),
          h3: (p) => (
            <h3 className="mt-6 mb-2 text-navy font-semibold text-[15px]/5" {...p} />
          ),
          h4: (p) => (
            <h4 className="mt-5 mb-2 text-navy font-semibold text-[14px]/5" {...p} />
          ),
          p: (p) => <p className="my-3 text-slate-body text-[14px]/7" {...p} />,
          strong: (p) => <strong className="text-navy font-semibold" {...p} />,
          em: (p) => <em className="italic" {...p} />,
          ul: (p) => <ul className="my-3 pl-5 list-disc flex flex-col gap-1.5" {...p} />,
          ol: (p) => <ol className="my-3 pl-5 list-decimal flex flex-col gap-1.5" {...p} />,
          li: (p) => <li className="text-slate-body text-[14px]/6 pl-1" {...p} />,
          a: ({ href, ...rest }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal underline underline-offset-2 hover:opacity-80"
              {...rest}
            />
          ),
          blockquote: (p) => (
            <blockquote
              className="my-4 pl-4 border-l-4 border-teal/40 bg-teal/5 text-slate-body italic py-2 pr-3 rounded-r"
              {...p}
            />
          ),
          hr: () => <hr className="my-6 border-0 border-t border-border-light" />,
          code: ({ className: cls, children, ...rest }) => {
            // react-markdown passes block code wrapped in <pre><code>, so the
            // distinction between inline and block is made by `<pre>` context.
            // We style both — inline as a chip, block via the <pre> override below.
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
          // ─── Tables (enabled via remark-gfm) ─────────────────────
          table: (p) => (
            <div className="my-4 overflow-x-auto rounded-lg border border-border-light">
              <table className="w-full text-left border-collapse" {...p} />
            </div>
          ),
          thead: (p) => <thead className="bg-[#FAFBFC]" {...p} />,
          tbody: (p) => <tbody {...p} />,
          tr: (p) => <tr className="border-b border-border-light last:border-0" {...p} />,
          th: (p) => (
            <th
              className="text-left px-3 py-2.5 text-navy font-semibold text-[12px]/4 uppercase tracking-[0.3px]"
              {...p}
            />
          ),
          td: (p) => (
            <td className="px-3 py-2.5 text-slate-body text-[13px]/5 align-top" {...p} />
          ),
          // Task-list checkboxes from GFM
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
