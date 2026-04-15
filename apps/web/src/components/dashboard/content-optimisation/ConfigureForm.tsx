import { useEffect, useRef, useState } from "react";
import {
  formatOptions,
  toneOptions,
  type ContentMode,
  type ContentConfig,
  type ContentFormat,
  type ContentTone,
} from "@/data/mock-content-optimisation";
import { Button } from "@/components/ui/Button";
import { BackButton } from "./BackButton";
import { uploadFile } from "@/lib/api/client";

interface UploadedFile {
  file: File;
  uploadId?: string;
  error?: string;
  uploading: boolean;
}

interface ConfigureFormProps {
  mode: ContentMode;
  onBack: () => void;
  onSubmit: (config: ContentConfig, uploadIds: string[]) => void;
}

export function ConfigureForm({ mode, onBack, onSubmit }: ConfigureFormProps) {
  const [brief, setBrief] = useState(
    mode === "generate"
      ? "We want to rank in Perplexity for 'best CRM for mid-market SaaS'"
      : "",
  );
  const [audience, setAudience] = useState(
    mode === "generate" ? "VP Sales at B2B SaaS companies, 50–500 employees" : "",
  );
  const [keywordList, setKeywordList] = useState<string[]>([
    "CRM",
    "mid-market",
    "B2B SaaS",
    "sales pipeline",
  ]);
  const [keywordDraft, setKeywordDraft] = useState("");
  const [sourceUrls, setSourceUrls] = useState<string[]>([]);
  const [sourceDraft, setSourceDraft] = useState("");
  const [format, setFormat] = useState<ContentFormat>("pillar-page");
  const [tone, setTone] = useState<ContentTone>("authoritative");
  const [existingContent, setExistingContent] = useState("");
  const [optimizationGoal, setOptimizationGoal] = useState("");
  const [sourceFiles, setSourceFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const briefRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    briefRef.current?.focus();
  }, []);

  const anyUploading = sourceFiles.some((f) => f.uploading);

  const addFiles = (files: FileList | File[]) => {
    const accepted = [".md", ".markdown", ".pdf", ".txt", ".html", ".htm", ".docx"];
    const arr = Array.from(files).filter((f) => {
      const name = f.name.toLowerCase();
      return accepted.some((ext) => name.endsWith(ext));
    });
    if (arr.length === 0) return;
    const startIdx = sourceFiles.length;
    setSourceFiles((prev) => [...prev, ...arr.map((file) => ({ file, uploading: true }))]);

    arr.forEach((file, i) => {
      const targetIdx = startIdx + i;
      uploadFile(file)
        .then((res) =>
          setSourceFiles((prev) =>
            prev.map((f, j) => (j === targetIdx ? { ...f, uploading: false, uploadId: res.uploadId } : f)),
          ),
        )
        .catch((err) =>
          setSourceFiles((prev) =>
            prev.map((f, j) =>
              j === targetIdx ? { ...f, uploading: false, error: err?.message ?? "Upload failed" } : f,
            ),
          ),
        );
    });
  };

  const removeFile = (idx: number) =>
    setSourceFiles((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = () => {
    if (submitting) return;
    setSubmitting(true);
    // Include any in-progress draft URL/keyword that the user hasn't yet "Enter"-committed.
    const committedUrls = sourceDraft.trim() ? [...sourceUrls, sourceDraft.trim()] : sourceUrls;
    const committedKw = keywordDraft.trim() ? [...keywordList, keywordDraft.trim()] : keywordList;
    const config: ContentConfig = {
      mode,
      brief,
      audience,
      sources: committedUrls.join(", "),
      keywords: committedKw.join(", "),
      format,
      tone,
      ...(mode === "optimize" && { existingContent, optimizationGoal }),
    };
    const uploadIds = sourceFiles
      .map((f) => f.uploadId)
      .filter((id): id is string => !!id);
    onSubmit(config, uploadIds);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={(e) => {
        if ((e.currentTarget as Node).contains(e.relatedTarget as Node)) return;
        setDragActive(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
      }}
      className={`rounded-xl py-6 px-7 bg-white border shadow-[0px_1px_4px_#0A25400F] transition-colors ${
        dragActive ? "border-teal bg-teal/5" : "border-border-light"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="inline-flex items-center rounded-full px-2.5 py-1 bg-teal/10 text-teal text-[10px] uppercase tracking-[0.4px] font-semibold">
          {mode === "generate" ? "Generate New" : "Optimize Existing"}
        </div>
        <BackButton label="Change mode" onClick={onBack} />
      </div>

      {/* Optimize-mode substrate */}
      {mode === "optimize" && (
        <div className="mb-5 grid grid-cols-2 gap-3">
          <div>
            <Label>Existing content</Label>
            <textarea
              value={existingContent}
              onChange={(e) => setExistingContent(e.target.value)}
              placeholder="Paste the content to optimize, or a URL…"
              className="w-full rounded-md border border-border-input bg-white px-3 py-2 text-[13px]/5 text-slate-text placeholder:text-slate-muted focus:outline-none focus:border-teal min-h-24 resize-y"
            />
          </div>
          <div>
            <Label>Optimization goal</Label>
            <input
              value={optimizationGoal}
              onChange={(e) => setOptimizationGoal(e.target.value)}
              placeholder="e.g. get cited for 'mid-market CRM selection'"
              className="w-full rounded-md border border-border-input bg-white px-3 py-2 text-[13px]/5 text-slate-text placeholder:text-slate-muted focus:outline-none focus:border-teal"
            />
          </div>
        </div>
      )}

      {/* Hero brief */}
      <Label>
        {mode === "optimize" ? "Additional direction" : "What should we write about?"}
      </Label>
      <textarea
        ref={briefRef}
        value={brief}
        onChange={(e) => setBrief(e.target.value)}
        placeholder={
          mode === "optimize"
            ? "Optional — any extra notes for the engine."
            : "Describe the topic, the query you want to rank for, or the question the content should answer."
        }
        className="w-full rounded-lg border border-border-input bg-white px-3.5 py-3 text-[14px]/6 text-slate-text placeholder:text-slate-muted focus:outline-none focus:border-teal resize-y min-h-[96px]"
      />

      {/* Audience + Keywords side by side */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <Label>Audience</Label>
          <input
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="Who is this for?"
            className="w-full rounded-md border border-border-input bg-white px-3 py-2 text-[13px]/5 text-slate-text placeholder:text-slate-muted focus:outline-none focus:border-teal"
          />
        </div>
        <div>
          <Label>Keywords & entities</Label>
          <div className="flex flex-wrap items-center gap-1.5 rounded-md border border-border-input bg-white px-2 py-1.5 focus-within:border-teal transition-colors">
            {keywordList.map((kw, i) => (
              <span
                key={`${kw}-${i}`}
                className="inline-flex items-center gap-1.5 rounded-full pl-2.5 pr-1 py-0.5 bg-teal/10 border border-teal/30 text-teal text-[11px]/4"
                title={kw}
              >
                <span className="truncate max-w-40">{kw}</span>
                <button
                  type="button"
                  onClick={() =>
                    setKeywordList((prev) => prev.filter((_, j) => j !== i))
                  }
                  aria-label="Remove keyword"
                  className="flex items-center justify-center size-4 rounded-full bg-transparent border-none cursor-pointer text-teal hover:text-danger transition-colors text-[11px]/3"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              value={keywordDraft}
              onChange={(e) => setKeywordDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === ",") {
                  e.preventDefault();
                  const v = keywordDraft.trim().replace(/,$/, "");
                  if (v) {
                    setKeywordList((prev) => [...prev, v]);
                    setKeywordDraft("");
                  }
                } else if (
                  e.key === "Backspace" &&
                  keywordDraft === "" &&
                  keywordList.length > 0
                ) {
                  e.preventDefault();
                  setKeywordList((prev) => prev.slice(0, -1));
                }
              }}
              onBlur={() => {
                const v = keywordDraft.trim();
                if (v) {
                  setKeywordList((prev) => [...prev, v]);
                  setKeywordDraft("");
                }
              }}
              placeholder={keywordList.length === 0 ? "Type a keyword…" : "Add another…"}
              className="flex-1 min-w-28 bg-transparent border-none outline-none px-1 py-1 text-[13px]/5 text-slate-text placeholder:text-slate-muted"
            />
          </div>
          <div className="mt-1 text-slate-muted text-[11px]/4">
            Press <kbd className="inline-flex items-center rounded px-1 py-0.5 bg-[#F5F8FB] border border-border-light text-[10px] text-slate-body font-semibold">Enter</kbd> to add another
          </div>
        </div>
      </div>

      {/* Format + Tone — side by side */}
      <div className="mt-4 flex flex-wrap items-stretch gap-x-5 gap-y-4">
        <div>
          <Label>Format</Label>
          <div className="flex flex-wrap gap-1.5">
            {formatOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setFormat(opt.value)}
                title={opt.description}
                className={`rounded-md px-3 py-1.5 border text-[12px]/4 font-semibold cursor-pointer transition-colors ${
                  format === opt.value
                    ? "border-teal bg-teal/10 text-teal"
                    : "border-border-input bg-white text-slate-body hover:border-teal hover:text-teal"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div aria-hidden className="self-stretch w-px bg-border-light" />
        <div>
          <Label>Tone</Label>
          <div className="flex flex-wrap gap-1.5">
            {toneOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setTone(opt.value)}
                className={`rounded-md px-3 py-1.5 border text-[12px]/4 font-semibold cursor-pointer transition-colors ${
                  tone === opt.value
                    ? "border-teal bg-teal/10 text-teal"
                    : "border-border-input bg-white text-slate-body hover:border-teal hover:text-teal"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sources — tag-style input with Upload button below */}
      <div className="mt-4">
        <Label>Sources <span className="text-slate-muted font-normal">(optional)</span></Label>
        <div className="flex flex-wrap items-center gap-1.5 rounded-md border border-border-input bg-white px-2 py-1.5 focus-within:border-teal transition-colors">
          {sourceUrls.map((url, i) => (
            <span
              key={`${url}-${i}`}
              className="inline-flex items-center gap-1.5 rounded-full pl-2.5 pr-1 py-0.5 bg-teal/10 border border-teal/30 text-teal text-[11px]/4"
              title={url}
            >
              <span className="truncate max-w-60">{url}</span>
              <button
                type="button"
                onClick={() =>
                  setSourceUrls((prev) => prev.filter((_, j) => j !== i))
                }
                aria-label="Remove URL"
                className="flex items-center justify-center size-4 rounded-full bg-transparent border-none cursor-pointer text-teal hover:text-danger transition-colors text-[11px]/3"
              >
                ×
              </button>
            </span>
          ))}
          <input
            value={sourceDraft}
            onChange={(e) => setSourceDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                const v = sourceDraft.trim().replace(/,$/, "");
                if (v) {
                  setSourceUrls((prev) => [...prev, v]);
                  setSourceDraft("");
                }
              } else if (e.key === "Backspace" && sourceDraft === "" && sourceUrls.length > 0) {
                e.preventDefault();
                setSourceUrls((prev) => prev.slice(0, -1));
              }
            }}
            onBlur={() => {
              const v = sourceDraft.trim();
              if (v) {
                setSourceUrls((prev) => [...prev, v]);
                setSourceDraft("");
              }
            }}
            placeholder={sourceUrls.length === 0 ? "Paste a source URL…" : "Add another…"}
            className="flex-1 min-w-40 bg-transparent border-none outline-none px-1 py-1 text-[13px]/5 text-slate-text placeholder:text-slate-muted"
          />
        </div>
        <div className="mt-1 text-slate-muted text-[11px]/4">
          Press <kbd className="inline-flex items-center rounded px-1 py-0.5 bg-[#F5F8FB] border border-border-light text-[10px] text-slate-body font-semibold">Enter</kbd> to add another
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".md,.markdown,.pdf,.txt,.html,.htm,.docx"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-2 w-full flex flex-col items-center justify-center gap-1.5 rounded-lg px-6 py-5 border-2 border-dashed border-teal/50 bg-teal/5 text-teal cursor-pointer hover:bg-teal/10 hover:border-teal transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span className="text-[14px]/5 font-semibold">Upload files</span>
          <span className="text-[11px]/4 text-teal/70 font-normal">
            Drop here or click · .md, .pdf, .docx, .txt, .html
          </span>
        </button>
        {sourceFiles.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {sourceFiles.map((row, i) => {
              const ext = row.file.name.toLowerCase().split(".").pop()?.toUpperCase() ?? "";
              return (
                <span
                  key={`${row.file.name}-${i}`}
                  className={`inline-flex items-center gap-1.5 rounded-full pl-2 pr-1 py-0.5 text-[11px]/4 border ${
                    row.error
                      ? "border-danger/40 bg-danger/5 text-danger"
                      : "border-border-light bg-white text-slate-body"
                  }`}
                  title={row.error ?? row.file.name}
                >
                  <span
                    className={`inline-block size-1.5 rounded-full ${
                      row.error ? "bg-danger" : row.uploading ? "bg-warning animate-pulse" : "bg-teal"
                    }`}
                  />
                  <span className="truncate max-w-40">
                    {ext} · {row.file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="flex items-center justify-center size-4 rounded-full bg-transparent border-none cursor-pointer text-slate-muted hover:text-danger transition-colors text-[11px]/3"
                    aria-label="Remove file"
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="mt-6 flex items-center justify-end gap-3">
        {anyUploading && (
          <span className="text-slate-muted text-[12px]/4">Waiting for uploads…</span>
        )}
        <Button
          variant="primary"
          size="md"
          onClick={handleSubmit}
          disabled={anyUploading || submitting || (mode === "generate" && !brief.trim())}
        >
          {submitting ? "Starting…" : "Generate Draft →"}
        </Button>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="mb-1 text-navy font-semibold text-[12px]/4">{children}</div>;
}
