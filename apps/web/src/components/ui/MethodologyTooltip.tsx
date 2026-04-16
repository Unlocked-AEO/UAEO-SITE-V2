import { useId, useState } from "react";

interface MethodologyTooltipProps {
  content: string;
  ariaLabel?: string;
}

export function MethodologyTooltip({
  content,
  ariaLabel = "How this is calculated",
}: MethodologyTooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-full size-4 bg-transparent border border-[#E2E8F0] text-[#64748B] cursor-help hover:border-[#64748B] hover:text-[#475569] transition-colors"
        aria-label={ariaLabel}
        aria-describedby={open ? id : undefined}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path
            d="M4 5.5V3.5M4 2V2.01"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {open && (
        <span
          id={id}
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 rounded-lg py-2.5 px-3.5 bg-navy text-white text-[11px]/[1.5] font-medium shadow-[0_8px_24px_rgba(10,37,64,0.16)] z-50 pointer-events-none"
        >
          {content}
          <span
            aria-hidden="true"
            className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-[5px] border-transparent border-t-navy"
          />
        </span>
      )}
    </span>
  );
}
