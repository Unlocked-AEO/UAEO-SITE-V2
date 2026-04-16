import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  width?: string; // e.g. "40vw"
  ariaLabel?: string;
}

export function Drawer({
  open,
  onClose,
  title,
  children,
  width = "40vw",
  ariaLabel,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocus.current = document.activeElement as HTMLElement | null;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduced = mq.matches;

    if (!reduced) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: "power2.out" }
      );
      gsap.fromTo(
        panelRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.3, ease: "power3.out" }
      );
    } else {
      gsap.set(backdropRef.current, { opacity: 1 });
      gsap.set(panelRef.current, { x: "0%" });
    }

    // Move focus into the drawer
    requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
      if (e.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;
        const focusable = panel.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", onKey);

    // Prevent body scroll while drawer open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
      previousFocus.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        ref={backdropRef}
        onClick={onClose}
        className="fixed inset-0 bg-[#0A254073] backdrop-blur-[2px] z-40"
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel ?? title ?? "Detail drawer"}
        className="fixed top-0 right-0 h-screen flex flex-col bg-white shadow-[-12px_0_32px_rgba(15,23,42,0.08)] z-50 max-w-full"
        style={{ width }}
      >
        {(title !== undefined) && (
          <div className="flex items-center justify-between shrink-0 h-14 px-7 border-b border-[#E2E8F0]">
            <h2 className="text-navy font-bold text-base/5 m-0 tracking-[-0.3px]">{title}</h2>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center size-9 rounded-lg bg-transparent border-none cursor-pointer hover:bg-[#F8FAFC] transition-colors"
              aria-label="Close drawer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 3L11 11M11 3L3 11"
                  stroke="#475569"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        )}
        <div className="grow overflow-y-auto">{children}</div>
      </div>
    </>
  );
}
