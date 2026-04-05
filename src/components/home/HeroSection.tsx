import { useNavigate } from "react-router-dom";
import { heroContent } from "@/data/mock-landing";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="relative w-full min-h-[660px] flex items-center overflow-clip bg-white">
      {/* Background gradients */}
      <div className="absolute -right-[60px] -top-10 w-[780px] h-[760px] overflow-clip">
        <div
          className="absolute top-0 right-0 w-[760px] h-[760px] opacity-85 rounded-tl-[50%] rounded-bl-[50%]"
          style={{
            backgroundImage:
              "linear-gradient(in oklab 135deg, oklab(98.9% -0.015 -0.003) 0%, oklab(92.2% -0.068 -0.004) 15%, oklab(77.6% -0.110 -0.017) 30%, oklab(70.7% -0.113 -0.017) 45%, oklab(86% -0.097 -0.008) 55%, oklab(96.8% -0.019 -0.004) 70%, oklab(100% -.0001 0) 85%)",
          }}
        />
        <div
          className="absolute top-20 right-[60px] w-[500px] h-[500px] rounded-full"
          style={{
            backgroundImage:
              "radial-gradient(circle farthest-corner at 40% 40% in oklab, oklab(86.3% 0.022 0.131 / 40%) 0%, oklab(78.8% 0.078 0.125 / 30%) 25%, oklab(0% .0001 .0001 / 0%) 60%)",
          }}
        />
        <div
          className="absolute top-[200px] right-[100px] w-[400px] h-[400px] rounded-full"
          style={{
            backgroundImage:
              "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(77.6% -0.110 -0.017 / 50%) 0%, oklab(69.8% -0.111 -0.014 / 30%) 40%, oklab(0% -.0001 0 / 0%) 70%)",
          }}
        />
        <div
          className="absolute bottom-[100px] right-[50px] w-[350px] h-[350px] rounded-full"
          style={{
            backgroundImage:
              "radial-gradient(circle farthest-corner at 50% 50% in oklab, oklab(68.7% -0.019 -0.163 / 35%) 0%, oklab(62.7% -0.019 -0.173 / 20%) 40%, oklab(0% 0 -.0001 / 0%) 65%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-[640px] pl-[120px] py-20">
        <h1 className="text-[60px] leading-[1.08] tracking-[-0.04em] text-navy font-bold whitespace-pre-wrap m-0">
          {heroContent.headline}
        </h1>
        <p className="text-[17px] leading-[1.65] mt-7 mb-0 max-w-[520px] text-slate-text">
          {heroContent.subtext}
        </p>
        <div className="flex items-center mt-9 gap-3">
          <Button
            variant="primary"
            size="md"
            className="py-[13px] px-6"
            onClick={() => navigate("/signup")}
          >
            {heroContent.primaryCTA}
          </Button>
          <Button
            variant="outline"
            size="md"
            className="gap-2"
            onClick={() => console.log("ACTION: signup_google")}
          >
            <div
              className="rounded-full shrink-0 size-4"
              style={{
                backgroundImage:
                  "linear-gradient(in oklab 135deg, oklab(63% -0.031 -0.177) 0%, oklab(64.8% -0.137 0.084) 33.33%, oklab(62.6% 0.180 0.100) 66.67%, oklab(83% 0.018 0.169) 100%)",
              }}
            />
            {heroContent.secondaryCTA}
          </Button>
        </div>
      </div>
    </section>
  );
}
