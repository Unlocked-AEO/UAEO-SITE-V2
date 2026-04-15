import {
  customPromptsSection,
  customPrompts,
} from "@/data/mock-advanced-scan";
import type { CustomPrompt } from "@/data/mock-advanced-scan";

function CheckIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M1.5 5l2.5 2.5 5-5"
        stroke="#27AE60"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RemoveIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M2 2l7 7M9 2l-7 7"
        stroke="#EF4444"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M6.5 1v11M1 6.5h11"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EditBadge() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#27AE60"
      strokeWidth="2.5"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function PromptRow({ prompt }: { prompt: CustomPrompt }) {
  return (
    <div className="flex items-start py-3.5 px-6 gap-3 bg-white border-b border-[#F0F4F8] last:border-b-0">
      <div className="flex items-center justify-center size-5.5 shrink-0 mt-px rounded-md bg-[#EEF9F4] border border-[#BDECD3]">
        <CheckIcon />
      </div>
      <span className="grow text-[13px]/[160%] text-navy font-sans">
        {prompt.text}
      </span>
      <button
        className="flex items-center justify-center size-6.5 shrink-0 mt-px rounded-md bg-[#FEF2F2] border border-[#FECACA] cursor-pointer hover:bg-[#FEE2E2] transition-colors"
        onClick={() =>
          console.log("ACTION: remove_custom_prompt", { id: prompt.id })
        }
      >
        <RemoveIcon />
      </button>
    </div>
  );
}

export function CustomPromptsCard() {
  return (
    <div>
      {/* Sub-header */}
      <div className="flex items-center justify-between pt-5 pb-4 border-b border-[#F0F4F8] px-6">
        <div>
          <span className="tracking-[0.08em] uppercase text-[#64748B] font-sans text-[11px]/3.5">
            {customPromptsSection.title}
          </span>
          <p className="mt-0.75 text-[#94A3B8] font-sans text-xs/4 m-0">
            {customPromptsSection.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center rounded-[20px] py-0.75 px-2.5 gap-1.5 bg-[#E8F8F2] border border-[#BDECD3]">
            <EditBadge />
            <span className="text-[#27AE60] font-sans text-[11px]/3.5 whitespace-nowrap">
              {customPrompts.length} custom
            </span>
          </span>
        </div>
      </div>

      {/* New prompt input */}
      <div className="flex flex-col pt-5 pb-4 gap-2.5 border-b border-[#F0F4F8] px-6">
        <label className="text-slate-body font-sans text-xs/4">
          New Prompt
        </label>
        <div className="flex items-start gap-2.5">
          <div className="grow min-h-[52px] flex items-start rounded-[10px] py-3 px-3.5 bg-white border-[1.5px] border-teal">
            <span className="text-[13px]/[160%] text-[#94A3B8] font-sans">
              {customPromptsSection.inputPlaceholder}
            </span>
          </div>
          <button
            className="flex items-center justify-center shrink-0 rounded-[10px] py-3 px-4.5 gap-1.5 bg-teal border-none cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => console.log("ACTION: add_custom_prompt")}
          >
            <PlusIcon />
            <span className="text-white font-sans text-[13px]/4">Add</span>
          </button>
        </div>
        <span className="text-[#94A3B8] font-sans text-[11px]/3.5">
          {customPromptsSection.variableHint}
        </span>
      </div>

      {/* Existing prompts */}
      <div className="flex flex-col">
        {customPrompts.map((prompt) => (
          <PromptRow key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </div>
  );
}
