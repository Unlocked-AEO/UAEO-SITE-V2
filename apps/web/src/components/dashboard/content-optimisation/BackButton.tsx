interface BackButtonProps {
  label: string;
  onClick: () => void;
  variant?: "default" | "subtle";
}

export function BackButton({ label, onClick, variant = "default" }: BackButtonProps) {
  const base =
    "group inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px]/4 font-semibold cursor-pointer transition-all duration-200 border";

  const styles =
    variant === "subtle"
      ? "bg-transparent border-transparent text-slate-muted hover:bg-[#F5F8FB] hover:text-navy hover:border-border-light"
      : "bg-white border-border-light text-slate-body hover:border-teal hover:text-teal hover:shadow-[0px_2px_6px_#0A254012]";

  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-200 group-hover:-translate-x-0.5"
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      {label}
    </button>
  );
}
