import type { SourceRef } from "@/lib/api/sse";

interface SourcesCardProps {
  sources: SourceRef[];
}

/**
 * Compact provenance panel for Review/Output sidebars. Surfaces which
 * URLs loaded, which failed (and why), and which the draft actually
 * cited. Mirrors the Sources section inside the draft itself but lets
 * the user verify provenance without scrolling.
 */
export function SourcesCard({ sources }: SourcesCardProps) {
  if (sources.length === 0) {
    return (
      <div className="rounded-xl py-4 px-5 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
        <div className="text-navy text-[13px]/4 font-semibold mb-1">Sources</div>
        <div className="text-slate-muted text-[12px]/4">
          No sources were provided for this draft.
        </div>
      </div>
    );
  }

  const loaded = sources.filter((s) => s.loaded);
  const cited = loaded.filter((s) => s.cited);
  const failed = sources.filter((s) => !s.loaded);

  return (
    <div className="rounded-xl py-4 px-5 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      <div className="flex items-center justify-between mb-3">
        <div className="text-navy text-[13px]/4 font-semibold">Sources</div>
        <div className="text-slate-muted text-[11px]/4">
          {cited.length} cited · {loaded.length - cited.length} unused · {failed.length} failed
        </div>
      </div>

      <ol className="flex flex-col gap-2">
        {sources.map((s, i) => {
          const status = !s.loaded
            ? ("failed" as const)
            : s.cited
            ? ("cited" as const)
            : ("loaded" as const);

          const dot = {
            cited: "bg-teal",
            loaded: "bg-warning",
            failed: "bg-danger",
          }[status];

          const label =
            s.title?.trim() ||
            (s.type === "url" ? prettyDomain(s.origin) ?? s.origin : s.origin);

          return (
            <li key={s.id} className="flex items-start gap-2.5 text-[12px]/5">
              <span className="mt-1.5 text-slate-muted text-[10px]/3 tabular-nums min-w-4">
                {i + 1}.
              </span>
              <span className={`mt-1.5 size-1.5 rounded-full shrink-0 ${dot}`} />
              <div className="flex-1 min-w-0">
                {s.type === "url" && s.loaded ? (
                  <a
                    href={s.origin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy font-semibold hover:text-teal transition-colors truncate block"
                    title={s.origin}
                  >
                    {label}
                  </a>
                ) : (
                  <div className="text-navy font-semibold truncate" title={s.origin}>
                    {label}
                    {s.type === "upload" && (
                      <span className="ml-1 text-slate-muted font-normal">(file)</span>
                    )}
                  </div>
                )}
                {s.type === "url" && s.loaded && (
                  <div className="text-slate-muted text-[11px]/4 truncate">{prettyDomain(s.origin) ?? s.origin}</div>
                )}
                {!s.loaded && s.error && (
                  <div className="text-danger text-[11px]/4" title={s.error}>
                    {s.error}
                  </div>
                )}
              </div>
              {status === "cited" && (
                <span className="text-teal text-[10px] uppercase tracking-[0.4px] font-semibold">cited</span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function prettyDomain(url: string): string | undefined {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}
