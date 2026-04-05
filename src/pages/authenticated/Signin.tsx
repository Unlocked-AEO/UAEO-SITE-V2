import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignupSidebar } from "@/components/home/SignupSidebar";
import { SigninForm } from "@/components/home/SigninForm";
import { IS_LOGGED_IN } from "@/lib/mock-auth";

export default function Signin() {
  const navigate = useNavigate();

  useEffect(() => {
    if (IS_LOGGED_IN) navigate("/dashboard", { replace: true });
  }, [navigate]);

  if (IS_LOGGED_IN) return null;

  return (
    <div className="font-['Inter',system-ui,sans-serif] antialiased flex overflow-clip min-h-screen bg-[#F4F6F9] text-xs/4">
      <SignupSidebar />
      <SigninForm />
    </div>
  );
}
