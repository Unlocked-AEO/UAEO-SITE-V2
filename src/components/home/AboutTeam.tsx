import { teamSection, teamMembers } from "@/data/mock-about";
import { useInView } from "@/hooks/useInView";

export function AboutTeam() {
  const [ref, inView] = useInView(0.15);

  return (
    <section ref={ref} className={`w-full shrink-0 py-20 px-30 min-h-115 bg-white transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {/* Header */}
      <div className="flex flex-col items-start mb-12">
        <div className="inline-flex items-center mb-4 rounded-[20px] py-1.25 px-3.5 bg-[#F0FDFA] border border-teal/35">
          <span className="uppercase tracking-[0.8px] text-teal font-sans text-[11px]/3.5">
            {teamSection.badge}
          </span>
        </div>
        <h2 className="text-[38px] tracking-[-1px] leading-[1.15] text-navy font-bold m-0">
          {teamSection.headline}
        </h2>
      </div>

      {/* Cards */}
      <div className="flex gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="grow shrink basis-0 rounded-2xl overflow-clip min-w-0 bg-surface border border-border-light"
          >
            {/* Gradient header with avatar */}
            <div
              className="h-28 flex items-center justify-center"
              style={{ backgroundImage: member.gradient }}
            >
              <div className="w-15 h-15 flex items-center justify-center rounded-full bg-white shrink-0">
                <span className="text-navy font-sans text-xl/6">
                  {member.initials}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-5">
              <div className="mb-0.5 text-navy font-sans text-base/5">
                {member.name}
              </div>
              <div className="mb-2.5 text-teal font-sans text-xs/4">
                {member.role}
              </div>
              <p className="text-[13px] leading-[1.55] text-[#64748B] m-0">
                {member.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
