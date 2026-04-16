import { useEffect, useRef } from "react";
import gsap from "gsap";

export interface RowTab {
  key: string;
  label: string;
  count?: number;
}

interface RowTabsProps {
  tabs: RowTab[];
  active: string;
  onChange: (key: string) => void;
}

export function RowTabs({ tabs, active, onChange }: RowTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const underline = underlineRef.current;
    if (!container || !underline) return;
    const activeBtn = container.querySelector<HTMLButtonElement>(
      `button[data-tab="${active}"]`
    );
    if (!activeBtn) return;
    const { offsetLeft, offsetWidth } = activeBtn;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    gsap.to(underline, {
      x: offsetLeft,
      width: offsetWidth,
      duration: mq.matches ? 0 : 0.28,
      ease: "power3.inOut",
    });
  }, [active, tabs]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-end gap-0.5 border-b border-[#E2E8F0]"
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            data-tab={tab.key}
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
            className={`inline-flex items-center gap-1.5 bg-transparent border-none cursor-pointer py-2.5 px-3.5 text-[12px]/4 font-semibold transition-colors ${
              isActive ? "text-navy" : "text-[#64748B] hover:text-[#475569]"
            }`}
          >
            {tab.label}
            {typeof tab.count === "number" && (
              <span
                className={`inline-flex items-center justify-center min-w-[18px] h-[16px] px-1 rounded-full text-[9px]/3 font-bold ${
                  isActive
                    ? "bg-navy text-white"
                    : "bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
      <div
        ref={underlineRef}
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] bg-navy pointer-events-none"
        style={{ width: 0 }}
      />
    </div>
  );
}
