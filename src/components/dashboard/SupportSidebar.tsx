import { resourceLinks, liveChatBanner } from "@/data/mock-support";
import type { ResourceLink, ResourceIconColor } from "@/data/mock-support";

// ─── Icons ─────────────────────────────────────────────────

function VideoIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FF9F43"
      strokeWidth="2"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill="#FF9F43" stroke="none" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0D9488"
      strokeWidth="2"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function DocsIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4F6EF6"
      strokeWidth="2"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#CBD5E1"
      strokeWidth="2"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

const iconMap = {
  video: VideoIcon,
  book: BookIcon,
  docs: DocsIcon,
};

const iconBgMap: Record<ResourceIconColor, string> = {
  orange: "bg-[#FFF8EE]",
  teal: "bg-[#E6FAF9]",
  blue: "bg-[#F0F4FF]",
};

// ─── Resource Link Row ─────────────────────────────────────

function ResourceLinkRow({ resource }: { resource: ResourceLink }) {
  const Icon = iconMap[resource.icon];

  return (
    <button
      className="flex items-center rounded-xl py-4.5 px-5 gap-3.5 bg-white border border-border-light cursor-pointer w-full text-left hover:bg-[#FAFBFC] transition-colors"
      onClick={() =>
        console.log(`ACTION: ${resource.action}`, { id: resource.id })
      }
    >
      <div
        className={`flex items-center justify-center shrink-0 rounded-[10px] size-10 ${
          iconBgMap[resource.iconColor]
        }`}
      >
        <Icon />
      </div>
      <div className="grow">
        <div className="text-navy font-sans text-[13px]/4">
          {resource.title}
        </div>
        <div className="mt-0.5 text-[#94A3B8] font-sans text-[11px]/3.5">
          {resource.subtitle}
        </div>
      </div>
      <ChevronRightIcon />
    </button>
  );
}

// ─── Sidebar ─────��─────────────────────────────────────────

export function SupportSidebar() {
  return (
    <div className="w-80 flex flex-col gap-3 shrink-0">
      {/* Section label */}
      <div className="tracking-[0.07em] uppercase text-[#94A3B8] font-sans text-[11px]/3.5 px-1">
        Resources
      </div>

      {/* Resource links */}
      {resourceLinks.map((resource) => (
        <ResourceLinkRow key={resource.id} resource={resource} />
      ))}

      {/* Live chat banner */}
      <button
        className="rounded-xl p-5 bg-teal border-none cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => console.log("ACTION: open_live_chat")}
      >
        <div className="text-center text-white font-sans text-[13px]/4">
          {liveChatBanner.title}
        </div>
        <div className="mt-0.75 text-center text-white/75 font-sans text-[11px]/3.5">
          {liveChatBanner.subtitle}
        </div>
      </button>
    </div>
  );
}
