import {
  promptBankSection,
  promptFocusAreas,
  promptCategories,
} from "@/data/mock-advanced-scan";
import type {
  PromptFocus,
  PromptCategory,
  PromptItem,
} from "@/data/mock-advanced-scan";

// ─── Focus Area Icons ──────────────────────────────────────

function DiscoveryIcon({ active }: { active: boolean }) {
  const stroke = active ? "#0D9488" : "#64748B";
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <circle cx="8" cy="8" r="6" stroke={stroke} strokeWidth="1.4" />
      <path d="M5 8.5l2 2 4-4" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EmployerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M8 2C5.24 2 3 4.24 3 7c0 1.7.85 3.2 2.15 4.1L8 14l2.85-2.9C12.15 10.2 13 8.7 13 7c0-2.76-2.24-5-5-5z" stroke="#64748B" strokeWidth="1.4" />
      <circle cx="8" cy="7" r="1.5" stroke="#64748B" strokeWidth="1.2" />
    </svg>
  );
}

function BuyerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <rect x="2" y="4" width="5" height="9" rx="1" stroke="#64748B" strokeWidth="1.3" />
      <rect x="9" y="2" width="5" height="11" rx="1" stroke="#64748B" strokeWidth="1.3" />
    </svg>
  );
}

function ThoughtIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5l3.5-.5L8 2z" stroke="#64748B" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

const focusIconMap: Record<string, React.FC<{ active?: boolean }>> = {
  discovery: DiscoveryIcon,
  employer: EmployerIcon,
  buyer: BuyerIcon,
  thought: ThoughtIcon,
};

// ─── Chevron Icons ─────────────────────────────────────────

function ChevronUp() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M3.5 8.75L7 5.25L10.5 8.75" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDown({ muted }: { muted?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke={muted ? "#CBD5E1" : "#94A3B8"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Focus Card ────────────────────────────────────────────

function FocusCard({ focus }: { focus: PromptFocus }) {
  const Icon = focusIconMap[focus.icon];

  return (
    <button
      className={`grow shrink basis-0 flex flex-col rounded-xl gap-2 p-4 text-left cursor-pointer transition-colors ${
        focus.selected
          ? "bg-[#F7FEFE] border-[1.5px] border-teal"
          : "bg-[#FAFBFC] border border-border-light hover:bg-[#F0F4F8]"
      }`}
      onClick={() =>
        console.log("ACTION: toggle_prompt_focus", { id: focus.id })
      }
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex items-center justify-center rounded-lg shrink-0 size-8 ${
            focus.selected ? "bg-[#E6FAF9]" : "bg-[#F0F4F8]"
          }`}
        >
          {Icon && <Icon active={focus.selected} />}
        </div>
        {focus.selected ? (
          <div className="flex items-center justify-center rounded-full bg-teal shrink-0 size-4">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M1.5 4l2 2 3-3" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ) : (
          <div className="rounded-full bg-white border-[1.5px] border-border-light shrink-0 size-4" />
        )}
      </div>
      <span className="text-[12px]/[140%] text-navy font-sans">
        {focus.title}
      </span>
      <span className="text-[11px]/[150%] text-[#64748B] font-sans">
        {focus.description}
      </span>
    </button>
  );
}

// ─── Category Badge ────────────────────────────────────────

function CategoryBadge({
  selected,
  total,
}: {
  selected: number;
  total: number;
}) {
  const hasSelections = selected > 0;
  return (
    <span
      className={`rounded-md py-0.5 px-2 border ${
        hasSelections
          ? "bg-[#E6FAF9] border-[#A8E9E4]"
          : "bg-[#F0F4F8] border-[#E2E8F0]"
      }`}
    >
      <span
        className={`font-sans text-[11px]/3.5 ${
          hasSelections ? "text-teal" : "text-[#94A3B8]"
        }`}
      >
        {selected} / {total} selected
      </span>
    </span>
  );
}

// ─── Prompt Checkbox ───────────────────────────────────────

function PromptCheckbox({ prompt }: { prompt: PromptItem }) {
  return (
    <button
      className={`flex items-start pr-4 pl-10.5 gap-3 border-t border-[#F0F4F8] py-3 w-full text-left cursor-pointer bg-transparent hover:bg-[#FAFBFC] transition-colors ${
        !prompt.selected ? "bg-[#FAFBFC]" : "bg-white"
      }`}
      onClick={() =>
        console.log("ACTION: toggle_prompt", { id: prompt.id })
      }
    >
      {prompt.selected ? (
        <div className="flex items-center justify-center shrink-0 mt-px rounded-sm bg-teal size-4">
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <path d="M1.5 4.5l2 2 4-4" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ) : (
        <div className="shrink-0 mt-px rounded-sm bg-white border-[1.5px] border-[#CBD5E1] size-4" />
      )}
      <span
        className={`text-[13px]/[150%] grow font-sans ${
          prompt.selected ? "text-navy" : "text-[#64748B]"
        }`}
      >
        {prompt.text}
      </span>
    </button>
  );
}

// ─── Category Accordion ────────────────────────────────────

function CategoryRow({ category }: { category: PromptCategory }) {
  const hasSelections = category.selected > 0;
  const isMuted = !hasSelections;

  return (
    <div className="border-b border-border-light last:border-b-0">
      <button
        className={`flex items-center py-3.5 px-4 gap-3 w-full text-left cursor-pointer bg-transparent border-none hover:bg-[#FAFBFC] transition-colors ${
          category.expanded ? "bg-[#F7FEFE]" : isMuted ? "bg-[#FAFBFC]" : "bg-white"
        }`}
        onClick={() =>
          console.log("ACTION: toggle_category", { id: category.id })
        }
      >
        {category.expanded ? (
          <ChevronUp />
        ) : (
          <ChevronDown muted={isMuted} />
        )}
        <span
          className={`grow font-sans text-[13px]/4 ${
            isMuted ? "text-[#94A3B8]" : "text-navy"
          }`}
        >
          {category.name}
        </span>
        <CategoryBadge selected={category.selected} total={category.total} />
      </button>

      {/* Expanded prompts */}
      {category.expanded && category.prompts.length > 0 && (
        <div className="flex flex-col bg-white">
          {category.prompts.map((prompt) => (
            <PromptCheckbox key={prompt.id} prompt={prompt} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Section ──────────────────────────────────────────

export function PromptBankSection() {
  return (
    <div className="flex flex-col">
      {/* Sub-header */}
      <div className="flex items-center justify-between pt-5 pb-4 border-b border-[#F0F4F8] px-6">
        <div>
          <span className="tracking-[0.08em] uppercase text-[#64748B] font-sans text-[11px]/3.5">
            {promptBankSection.title}
          </span>
          <p className="mt-0.75 text-[#94A3B8] font-sans text-xs/4 m-0">
            {promptBankSection.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="flex items-center rounded-lg py-1.5 px-3 gap-1.5 bg-[#FFF8EE] border border-[#FFD699]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <circle cx="6" cy="6" r="5" stroke="#FF9F43" strokeWidth="1.2" />
              <path d="M6 4v2.5L7.5 8" stroke="#FF9F43" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="text-[#FF9F43] font-sans text-xs/4">
              {promptBankSection.totalSelected} / {promptBankSection.totalRequired} selected
            </span>
          </span>
        </div>
      </div>

      {/* Prompt Focus */}
      <div className="pt-5 pb-4 border-b border-[#F0F4F8] px-6">
        <span className="tracking-[0.7px] uppercase mb-3 block text-[#64748B] font-sans text-[11px]/3.5">
          Prompt Focus
        </span>
        <div className="flex gap-3 flex-col sm:flex-row">
          {promptFocusAreas.map((focus) => (
            <FocusCard key={focus.id} focus={focus} />
          ))}
        </div>
      </div>

      {/* Category prompts */}
      <div className="flex flex-col py-5 px-6 gap-3.5">
        <span className="tracking-[0.7px] uppercase text-[#64748B] font-sans text-[11px]/3.5">
          {promptFocusAreas.find((f) => f.selected)?.title ?? "Prompts"} — Prompts
        </span>
        <div className="flex flex-col rounded-[10px] overflow-clip border border-border-light">
          {promptCategories.map((category) => (
            <CategoryRow key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
