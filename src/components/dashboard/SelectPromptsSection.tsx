import { PromptBankSection } from "@/components/dashboard/PromptBankSection";
import { CustomPromptsCard } from "@/components/dashboard/CustomPromptsCard";

export function SelectPromptsSection() {
  return (
    <div className="flex flex-col rounded-[14px] overflow-clip bg-white border border-border-light">
      {/* Section header */}
      <div className="pt-5 pb-4 border-b border-[#F0F4F8] px-6">
        <h2 className="text-navy font-sans text-sm/[18px] m-0">
          Select the Prompts for Your Scan
        </h2>
        <p className="mt-0.5 text-[#94A3B8] font-sans text-xs/4 m-0">
          Choose from the prompt bank and add your own custom prompts
        </p>
      </div>

      {/* Prompt Bank */}
      <PromptBankSection />

      {/* Divider */}
      <div className="mx-6 border-t border-[#F0F4F8]" />

      {/* Custom Prompts */}
      <CustomPromptsCard />
    </div>
  );
}
