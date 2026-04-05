import { SignupSidebar } from "@/components/home/SignupSidebar";
import { SigninForm } from "@/components/home/SigninForm";

export default function Signin() {
  return (
    <div className="font-['Inter',system-ui,sans-serif] antialiased flex overflow-clip min-h-screen bg-[#F4F6F9] text-xs/4">
      <SignupSidebar />
      <SigninForm />
    </div>
  );
}
