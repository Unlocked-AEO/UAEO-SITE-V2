import { brandHero } from "@/data/mock-brand-guidelines";

function LogoIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M9 2L11 7H16L12 10.5L13.5 16L9 13L4.5 16L6 10.5L2 7H7L9 2Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export { LogoIcon };

export function BrandGuidelinesHero() {
  return (
    <section className="relative flex flex-col justify-center min-h-80 py-20 px-6 md:px-12 lg:px-30 overflow-clip bg-navy">
      {/* Logo lockup */}
      <div className="flex items-center mb-8 gap-3.5">
        <div
          className="flex items-center justify-center rounded-[10px] shrink-0 size-10"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #4ECDC4 0%, #3DBDB5 100%)",
          }}
        >
          <LogoIcon />
        </div>
        <span className="tracking-[-0.3px] text-white font-sans font-bold text-xl/6">
          Unlocked AEO
        </span>
      </div>

      {/* Title */}
      <h1 className="text-[40px] md:text-[56px] tracking-[-2.5px] leading-[1.05] text-white font-sans font-extrabold m-0 mb-4">
        {brandHero.title}
      </h1>

      {/* Subtitle */}
      <p className="text-lg max-w-[520px] leading-[1.6] text-white/50 font-sans m-0">
        {brandHero.subtitle}
      </p>

      {/* Decorative radial glow */}
      <div
        className="absolute -right-20 -top-20 w-120 h-120 rounded-full pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(78, 205, 196, 0.18) 0%, rgba(78, 205, 196, 0) 70%)",
        }}
      />
    </section>
  );
}
