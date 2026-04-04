export function ChecklistItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5.5 h-5.5 shrink-0 flex items-center justify-center rounded-full bg-[#F0FDFA] border-[1.5px] border-teal">
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          className="shrink-0"
        >
          <path
            d="M1 4L4 7L9 1"
            stroke="#4ECDC4"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="text-navy font-medium text-[15px]/4.5">{label}</span>
    </div>
  );
}
