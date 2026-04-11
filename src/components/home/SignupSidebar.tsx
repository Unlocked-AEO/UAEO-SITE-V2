import { useNavigate } from "react-router-dom";
import { signupSidebar } from "@/data/mock-signup";
import { LogoIcon } from "@/components/ui/LogoIcon";

export function SignupSidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-120 shrink-0 flex flex-col relative overflow-clip bg-[#0A2540] p-12">
      {/* Logo */}
      <button
        className="flex items-center mb-auto gap-2.5 bg-transparent border-none cursor-pointer p-0"
        onClick={() => navigate("/")}
      >
        <LogoIcon size={36} className="rounded-[9px]" />
        <div className="inline-block text-white font-sans font-bold shrink-0 text-base/5">
          Unlocked AEO
        </div>
      </button>

      {/* Headline */}
      <div className="flex flex-col mb-12 gap-5">
        <div className="text-[32px] leading-[round(up,120%,1px)] text-white font-sans font-extrabold m-0">
          {signupSidebar.headline}
        </div>
        <div className="text-[15px] leading-[round(up,165%,1px)] text-[#94A3B8] font-sans m-0">
          {signupSidebar.subtext}
        </div>
      </div>

      {/* Feature list */}
      <div className="flex flex-col mb-12 gap-3.5">
        {signupSidebar.features.map((feature) => (
          <div key={feature} className="flex items-center gap-3">
            <div className="flex items-center justify-center shrink-0 rounded-md bg-[#4ECDC426] size-6">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: '0' }}>
                <path d="M2 6l3 3 5-5" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="inline-block text-[#CBD5E1] font-sans shrink-0 text-sm/4.5">
              {feature}
            </div>
          </div>
        ))}
      </div>

      {/* Trusted by */}
      <div className="pt-6 border-t border-t-solid border-t-[#FFFFFF14]">
        <div className="mt-0 mb-3 text-[#475569] font-sans text-[13px]/4 mx-0">
          {signupSidebar.trustedBy}
        </div>
        <div className="flex gap-2">
          {signupSidebar.logos.map((logo) => (
            <div key={logo} className="h-7 flex items-center rounded-md px-3 bg-[#FFFFFF0F]">
              <div className="inline-block text-[#64748B] font-sans font-medium shrink-0 text-xs/4">
                {logo}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background circles */}
      <div className="absolute -top-20 -right-20 opacity-[0.08] rounded-[50%] bg-[#4ECDC4] size-80" />
      <div className="absolute bottom-15 -left-15 opacity-[0.06] rounded-[50%] bg-[#4ECDC4] size-60" />
    </div>
  );
}
