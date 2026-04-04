import { trustedLabel, featuredTeams } from "@/data/mock-teams";

export function TeamsShowcase() {
  return (
    <section className="w-full flex flex-col items-center shrink-0 pt-20 pb-25 min-h-90 bg-white px-30">
      <div className="uppercase tracking-[1.2px] mb-16 text-slate-muted font-sans text-xs/4">
        {trustedLabel}
      </div>

      <div className="flex items-center justify-center w-full">
        {featuredTeams.map((team, i) => (
          <div
            key={team.name}
            className={`grow shrink basis-0 flex flex-col items-center px-15 gap-5 ${
              i < featuredTeams.length - 1
                ? "border-r border-border-light"
                : ""
            }`}
          >
            {/* Logo */}
            <div
              className="w-22 h-22 flex items-center justify-center rounded-[22px] shrink-0"
              style={{
                backgroundImage: team.gradient,
                boxShadow: team.shadow,
              }}
            >
              <span className="tracking-[-1px] text-white font-sans text-3xl/9">
                {team.initials}
              </span>
            </div>

            {/* Info */}
            <div className="flex flex-col items-center gap-1.5 w-55">
              <span className="text-center text-navy font-sans font-bold text-lg/5.5">
                {team.name}
              </span>
              <span className="uppercase tracking-[0.6px] text-center text-slate-muted font-sans text-xs/4">
                {team.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
