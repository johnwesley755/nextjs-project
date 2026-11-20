import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { PageTransitions } from "@/components/animations/PageTransitions";

export default function Home() {
  return (
    <main id="top" className="relative w-full flex flex-col min-h-screen bg-[#101010] text-[#F2F0E9]">
      {/* Navigation */}
      <Navbar />

      {/* Section 01: Hero */}
      <HeroSection />

      {/* Section 02: Services */}
      <ServicesSection />

      {/* Section 03: Selected Work / Portfolio */}
      <PortfolioSection />

      {/* Section 04: Contact */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* GSAP ScrollTrigger Multi-Section Transition Manager */}
      <PageTransitions />
    </main>
  );
}
