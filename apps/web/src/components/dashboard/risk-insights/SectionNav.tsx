import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export interface SectionNavItem {
  id: string;
  label: string;
}

interface SectionNavProps {
  items: SectionNavItem[];
  /** Offset applied when scrolling into view so the section lands below the sticky nav. */
  scrollOffset?: number;
}

/**
 * Sticky section-anchor nav. Clicking scrolls to the section; scrolling
 * through the page highlights the currently-in-view section via
 * IntersectionObserver rather than swapping content.
 */
export function SectionNav({ items, scrollOffset = 120 }: SectionNavProps) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const containerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  // Observe sections. Whichever is closest to the top of the viewport wins.
  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Collect ratios + top positions so we can pick the "in focus" section.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: `-${scrollOffset}px 0px -60% 0px`,
        threshold: 0,
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items, scrollOffset]);

  // Animate the underline to the active chip.
  useEffect(() => {
    const container = containerRef.current;
    const underline = underlineRef.current;
    if (!container || !underline) return;
    const activeBtn = container.querySelector<HTMLButtonElement>(
      `button[data-anchor="${active}"]`
    );
    if (!activeBtn) return;
    const { offsetLeft, offsetWidth } = activeBtn;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    gsap.to(underline, {
      x: offsetLeft,
      width: offsetWidth,
      duration: mq.matches ? 0 : 0.3,
      ease: "power3.inOut",
    });
  }, [active]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - scrollOffset + 8;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <div className="sticky top-0 z-30 -mx-8 px-8 bg-surface/90 backdrop-blur-md border-b border-[#E2E8F0]">
      <div
        ref={containerRef}
        className="relative flex items-end gap-1"
        role="tablist"
        aria-label="Jump to section"
      >
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              data-anchor={item.id}
              aria-current={isActive ? "true" : undefined}
              onClick={() => scrollTo(item.id)}
              className={`bg-transparent border-none cursor-pointer py-4 px-4 text-[13px]/4 font-semibold transition-colors ${
                isActive
                  ? "text-navy"
                  : "text-[#64748B] hover:text-[#475569]"
              }`}
            >
              {item.label}
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
    </div>
  );
}
