import { useNavigate } from "react-router-dom";
import { ctaSection } from "@/data/mock-landing";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center relative py-24 px-20 overflow-clip bg-surface">
      <span className="tracking-[0.06em] uppercase mb-5 text-center text-teal font-semibold text-[13px]/4">
        {ctaSection.label}
      </span>
      <h2 className="text-[48px] leading-[1.1] tracking-[-0.04em] mb-5 max-w-[680px] text-center text-navy font-extrabold m-0">
        {ctaSection.headline}
      </h2>
      <p className="text-[18px] leading-[1.6] mb-10 max-w-[520px] text-center text-slate-body m-0">
        {ctaSection.description}
      </p>
      <div className="flex items-center gap-3">
        <Button
          variant="primary"
          size="lg"
          className="shadow-[0_4px_16px_#635BFF59]"
          onClick={() => navigate("/signup")}
        >
          {ctaSection.primaryCTA}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-[#D6DCE3]"
          onClick={() => console.log("ACTION: contact_sales")}
        >
          {ctaSection.secondaryCTA}
        </Button>
      </div>
      <p className="mt-5 text-center text-slate-muted text-[13px]/4 m-0">
        {ctaSection.disclaimer}
      </p>

      {/* Decorative glow */}
      <div
        className="absolute -top-20 left-1/2 w-[600px] h-[400px]"
        style={{
          backgroundImage:
            "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(77.6% -0.110 -0.017 / 12%) 0%, oklab(0% -.0001 0 / 0%) 65%)",
          translate: "-50%",
        }}
      />
    </section>
  );
}
