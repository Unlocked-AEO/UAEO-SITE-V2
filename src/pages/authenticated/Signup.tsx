import { SignupSidebar } from "@/components/home/SignupSidebar";
import { SignupForm } from "@/components/home/SignupForm";

export default function Signup() {
  return (
    <div className="font-['Inter',system-ui,sans-serif] antialiased flex overflow-clip min-h-screen bg-[#F4F6F9] text-xs/4">
      <SignupSidebar />
      <SignupForm />
    </div>
  );
}
