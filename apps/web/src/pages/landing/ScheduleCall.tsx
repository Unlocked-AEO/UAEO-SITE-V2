import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScheduleHero } from "@/components/home/ScheduleHero";
import { ScheduleCalendar } from "@/components/home/ScheduleCalendar";

export default function ScheduleCall() {
  return (
    <div className="font-sans antialiased flex flex-col min-h-screen">
      <Header />
      <ScheduleHero />
      <ScheduleCalendar />

      {/* Friendly reassurance banner */}
      <section className="py-16 px-10 bg-white">
        <div className="max-w-[680px] mx-auto flex flex-col items-center text-center">
          <div
            className="flex items-center justify-center mb-5 rounded-xl size-12"
            style={{ backgroundImage: 'linear-gradient(in oklab 135deg, oklab(77.6% -0.110 -0.017) 0%, oklab(71.6% -0.102 -0.015) 100%)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: '0' }}>
              <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-[28px] tracking-[-1px] leading-[115%] mb-3 text-[#0A2540] font-sans font-bold">
            We're happy to help — no pressure.
          </h2>
          <p className="text-[16px] leading-[170%] max-w-[480px] text-[#64748B] font-sans m-0">
            Whether you're just exploring or ready to get started, our team is here to answer your questions and help you find the right fit. No hard sells, no commitments — just a friendly conversation.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
