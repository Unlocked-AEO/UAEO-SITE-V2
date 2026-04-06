import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { heroContent } from "@/data/mock-landing";
import { Button } from "@/components/ui/Button";
import { HeroOrbs } from "@/components/home/HeroOrbs";

export function HeroSection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split headline into words
      if (headlineRef.current) {
        const text = headlineRef.current.innerText;
        headlineRef.current.innerHTML = text
          .split(/(\s+)/)
          .map((word) =>
            word.trim()
              ? `<span class="inline-block overflow-hidden pb-2"><span class="hero-word inline-block">${word}</span></span>`
              : " "
          )
          .join("");

        gsap.from(".hero-word", {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.06,
          delay: 0.2,
        });
      }

      gsap.from(subtextRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.7,
      });

      gsap.from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.9,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[660px] flex items-center overflow-hidden bg-white"
    >
      {/* Animated orbs visualization */}
      <HeroOrbs />

      {/* Soft ambient glow behind the orbs */}
      <div className="absolute right-[100px] top-[80px] w-[500px] h-[500px] rounded-full pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 50% 50%, rgba(78, 205, 196, 0.08) 0%, transparent 70%)",
      }} />

      {/* Content — left aligned */}
      <div className="relative max-w-[640px] pl-[120px] py-20">
        <h1
          ref={headlineRef}
          className="text-[60px] leading-[1.08] tracking-[-0.04em] text-navy font-bold whitespace-pre-wrap m-0"
        >
          {heroContent.headline}
        </h1>
        <p
          ref={subtextRef}
          className="text-[17px] leading-[1.65] mt-7 mb-0 max-w-[520px] text-slate-text"
        >
          {heroContent.subtext}
        </p>
        <div
          ref={ctaRef}
          className="flex items-center mt-9 gap-3"
        >
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
