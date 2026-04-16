import type { Persona } from "@/data/mock-risk-insights";

export type PersonaFilterValue = "all" | Persona;

interface PersonaFilterProps {
  value: PersonaFilterValue;
  onChange: (v: PersonaFilterValue) => void;
}

const OPTIONS: { key: PersonaFilterValue; label: string }[] = [
  { key: "all", label: "All" },
  { key: "cmo", label: "CMO" },
  { key: "cro", label: "CRO" },
  { key: "both", label: "Shared" },
];

export function PersonaFilter({ value, onChange }: PersonaFilterProps) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[11px]/4 uppercase tracking-[0.08em] text-navy font-bold">
        Persona
      </span>
      {OPTIONS.map((o) => {
        const active = o.key === value;
        return (
          <button
            key={o.key}
            type="button"
            onClick={() => onChange(o.key)}
            className={`rounded-full py-1 px-2.5 border text-[11px]/4 font-semibold cursor-pointer transition-colors ${
              active
                ? "bg-navy text-white border-navy"
                : "bg-white text-[#475569] border-[#E2E8F0] hover:border-[#64748B]"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
