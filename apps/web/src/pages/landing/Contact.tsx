import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactHero } from "@/components/home/ContactHero";
import { ContactInfoCards } from "@/components/home/ContactInfoCards";
import { ContactForm } from "@/components/home/ContactForm";
import { ContactFAQ } from "@/components/home/ContactFAQ";

export default function Contact() {
  return (
    <div className="font-sans antialiased flex flex-col min-h-screen">
      <Header />
      <ContactHero />
      <ContactInfoCards />
      <ContactForm />
      <ContactFAQ />
      <Footer />
    </div>
  );
}
