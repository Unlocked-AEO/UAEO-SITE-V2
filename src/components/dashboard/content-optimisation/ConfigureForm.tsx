import { useRef, useState } from "react";
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

interface ConfigureFormProps {
  mode: ContentMode;
  onBack: () => void;
  onSubmit: (config: ContentConfig) => void;
}

const inputClass =
  "w-full rounded-lg border border-border-input bg-white px-3.5 py-2.5 text-[13px]/5 text-slate-text placeholder:text-slate-muted focus:outline-none focus:border-teal";
const labelClass = "block mb-1.5 text-navy font-semibold text-[13px]/4";
const hintClass = "mt-1 text-slate-muted text-[11px]/4";

export function ConfigureForm({ mode, onBack, onSubmit }: ConfigureFormProps) {
  const [brief, setBrief] = useState(
    mode === "generate"
      ? "We want to rank in Perplexity for 'best CRM for mid-market SaaS'"
      : "",
  );
  const [audience, setAudience] = useState(
    mode === "generate" ? "VP Sales at B2B SaaS companies, 50–500 employees" : "",
  );
  const [sources, setSources] = useState("");
  const [keywords, setKeywords] = useState("CRM, mid-market, B2B SaaS, sales pipeline");
  const [format, setFormat] = useState<ContentFormat>("pillar-page");
  const [tone, setTone] = useState<ContentTone>("authoritative");
  const [existingContent, setExistingContent] = useState("");
  const [optimizationGoal, setOptimizationGoal] = useState("");
  const [sourceFiles, setSourceFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = ".md,.pdf,.markdown,application/pdf,text/markdown";

  const addFiles = (files: FileList | File[]) => {
    const arr = Array.from(files).filter((f) => {
      const name = f.name.toLowerCase();
      return name.endsWith(".md") || name.endsWith(".markdown") || name.endsWith(".pdf");
    });
    if (arr.length === 0) return;
    console.log("ACTION: content_upload_sources", { files: arr.map((f) => f.name) });
    setSourceFiles((prev) => [...prev, ...arr]);
  };

  const removeFile = (idx: number) => {
    setSourceFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const formatBytes = (b: number) => {
    if (b < 1024) return `${b} B`;
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
    return `${(b / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSubmit = () => {
    const config: ContentConfig = {
      mode,
      brief,
      audience,
      sources,
      keywords,
      format,
      tone,
      ...(mode === "optimize" && { existingContent, optimizationGoal }),
    };
    console.log("ACTION: content_configure_submit", config);
    onSubmit(config);
  };

  return (
    <div className="rounded-xl py-7 px-8 bg-white border border-border-light shadow-[0px_1px_4px_#0A25400F]">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="inline-flex items-center rounded-full px-2.5 py-1 mb-2 bg-teal/10 text-teal text-[10px] uppercase tracking-[0.4px] font-semibold">
            {mode === "generate" ? "Generate New" : "Optimize Existing"}
          </div>
          <div className="text-navy font-semibold text-lg/6">Configure your content</div>
          <p className="mt-1 text-slate-muted text-[13px]/5">
            The more specific you are, the more targeted the AEO output.
          </p>
        </div>
        <BackButton label="Change mode" onClick={onBack} />
      </div>

      <div className="grid grid-cols-2 gap-5">
        {mode === "optimize" && (
          <>
            <div className="col-span-2">
              <label className={labelClass}>Existing content</label>
              <textarea
                className={`${inputClass} min-h-36 resize-y`}
                placeholder="Paste your current content, or provide a URL..."
                value={existingContent}
                onChange={(e) => setExistingContent(e.target.value)}
              />
              <div className={hintClass}>Supports pasted text, .docx/.md upload, or URL (coming soon).</div>
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Optimization goal</label>
              <input
                className={inputClass}
                placeholder="e.g. get cited for queries about mid-market CRM selection"
                value={optimizationGoal}
                onChange={(e) => setOptimizationGoal(e.target.value)}
              />
            </div>
          </>
        )}

        {mode === "generate" && (
          <div className="col-span-2">
            <label className={labelClass}>Content brief / topic goal</label>
            <textarea
              className={`${inputClass} min-h-24 resize-y`}
              placeholder="What topic should this content target? Which AI query should it rank for?"
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
            />
          </div>
        )}

        <div className="col-span-2">
          <label className={labelClass}>Target audience</label>
          <input
            className={inputClass}
            placeholder="e.g. VP Sales at B2B SaaS companies, 50–500 employees"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          />
        </div>

        <div className="col-span-2">
          <label className={labelClass}>Target keywords & entities</label>
          <input
            className={inputClass}
            placeholder="Comma-separated"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>

        <div className="col-span-2">
          <label className={labelClass}>Source materials (optional)</label>
          <input
            className={inputClass}
            placeholder="URLs or references (comma-separated)"
            value={sources}
            onChange={(e) => setSources(e.target.value)}
          />
          <div className={hintClass}>Add links to existing blog posts, product pages, or competitor articles the engine should reference.</div>

          {/* File upload */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`mt-3 flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-7 cursor-pointer transition-colors ${
              dragActive
                ? "border-teal bg-teal/5"
                : "border-border-input bg-[#FAFBFC] hover:border-teal hover:bg-teal/5"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedTypes}
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.length) addFiles(e.target.files);
                e.target.value = "";
              }}
            />
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-2 text-teal"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <div className="text-navy font-semibold text-[13px]/4">
              Drop files here or <span className="text-teal">browse</span>
            </div>
            <div className="mt-1 text-slate-muted text-[11px]/4">
              Supports .md and .pdf · up to 10MB each
            </div>
          </div>

          {sourceFiles.length > 0 && (
            <div className="mt-3 flex flex-col gap-2">
              {sourceFiles.map((file, i) => {
                const isPdf = file.name.toLowerCase().endsWith(".pdf");
                return (
                  <div
                    key={`${file.name}-${i}`}
                    className="flex items-center gap-3 rounded-lg border border-border-light bg-white px-3 py-2"
                  >
                    <div className={`flex items-center justify-center shrink-0 rounded-md size-8 ${isPdf ? "bg-[#FFF0F0] text-danger" : "bg-teal/10 text-teal"}`}>
                      <span className="text-[10px] font-semibold uppercase">
                        {isPdf ? "PDF" : "MD"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-navy text-[13px]/4 font-semibold truncate">
                        {file.name}
                      </div>
                      <div className="text-slate-muted text-[11px]/4">
                        {formatBytes(file.size)}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(i);
                      }}
                      aria-label="Remove file"
                      className="flex items-center justify-center size-7 rounded-md bg-transparent border-none cursor-pointer text-slate-muted hover:bg-[#F5F8FB] hover:text-danger transition-colors text-base/4"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <label className={labelClass}>Content format</label>
          <div className="grid grid-cols-1 gap-1.5">
            {formatOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFormat(opt.value)}
                className={`text-left rounded-md px-3 py-2 border cursor-pointer transition-colors ${
                  format === opt.value
                    ? "border-teal bg-teal/5"
                    : "border-border-light bg-white hover:border-border-input"
                }`}
              >
                <div className="text-navy font-semibold text-[13px]/4">{opt.label}</div>
                <div className="text-slate-muted text-[11px]/4">{opt.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>Tone</label>
          <div className="flex flex-col gap-1.5">
            {toneOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTone(opt.value)}
                className={`text-left rounded-md px-3 py-2 border cursor-pointer transition-colors ${
                  tone === opt.value
                    ? "border-teal bg-teal/5 text-navy font-semibold"
                    : "border-border-light bg-white text-slate-body hover:border-border-input"
                } text-[13px]/4`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 mt-7 pt-5 border-t border-border-light">
        <BackButton label="Back" onClick={onBack} />
        <Button variant="primary" size="md" onClick={handleSubmit}>
          Generate Draft →
        </Button>
      </div>
    </div>
  );
}
