import { aiEngines, logoBarHeadline } from "@/data/mock-landing";
import { EngineIcon } from "@/components/home/EngineIcon";

export function LogoBar() {
  return (
    <section className="flex flex-col items-center py-10 px-20 bg-white border-b border-border-light">
      <p className="tracking-[0.06em] uppercase mb-7 text-slate-muted font-medium text-[13px]/4">
        {logoBarHeadline}
      </p>
      <div className="flex items-center flex-wrap justify-center gap-[52px]">
        {aiEngines.map((engine) => (
          <div
            key={engine.slug}
            className="flex items-center opacity-55 gap-2"
          >
            <EngineIcon slug={engine.slug} size={20} />
            <span className="tracking-[-0.01em] text-navy font-bold text-base/5">
              {engine.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
